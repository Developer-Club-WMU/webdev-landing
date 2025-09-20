// server/api/routers/membership.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { MembershipRole, type Prisma, type PrismaClient } from "@prisma/client";
import { communityNamesEnum } from "@/api/apis";
import { membershipRoleEnum } from "./api";

const CommunityNameInputSchema = z
  .union([z.literal("ALL"), z.array(communityNamesEnum).nonempty()])
  .optional();

export const membershipRouter = createTRPCRouter({
  createMembership: protectedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        communityId: z.string().cuid(),
        role: z.nativeEnum(MembershipRole).default(MembershipRole.MEMBER),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, communityId, role } = input;

      // Prevent duplicates since @@unique([userId, communityId])
      const existing = await ctx.db.communityMembership.findFirst({
        where: {
          userId,
          communityId,
        },
      });

      if (existing) {
        throw new Error("User is already a member of this community.");
      }

      const membership = await ctx.db.communityMembership.create({
        data: {
          userId,
          communityId,
          roles: {
            create: [{ role }],
          },
        },
      });

      return membership;
    }),

  findUserMemberships: publicProcedure
    .input(
      z.object({
        id: z.string().cuid().nullable().optional(),
        type: z
          .union([
            z.literal("ALL"),
            z.array(membershipRoleEnum).nonempty(), // one or more roles
          ])
          .optional(),
        communityName: CommunityNameInputSchema,
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, type, communityName } = input;
      if (!id) return [];

      const where: Prisma.CommunityMembershipWhereInput = {
        userId: id,
        ...(type && type !== "ALL"
          ? { roles: { some: { role: { in: type } } } }
          : {}),
        ...(communityName && communityName !== "ALL"
          ? { community: { name: { in: communityName } } }
          : {}),
      };

      return ctx.db.communityMembership.findMany({
        where,
        include: { community: true, roles: true },
        orderBy: { joinedAt: "desc" },
      });
    }),

  /**
   * Creates a membership to a community, if the user has a memberhsip,
   * it will look to see if it can add the role for the membership
   * otherwise, it will create a membership with the given role
   */
  attachMembershipToUserByEmail: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        communityName: communityNamesEnum,
        role: membershipRoleEnum,
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Load user + community
      const [member, community] = await Promise.all([
        ctx.db.user.findUnique({
          where: { email: input.email },
          select: { id: true },
        }),
        ctx.db.community.findUnique({
          where: { name: input.communityName },
          select: { id: true },
        }),
      ]);

      if (!member) {
        return { ok: false, data: "User was not found" };
      }
      if (!community) {
        // throw new Error("Community not found");
        return { ok: false, data: "Community not found" };
      }

      // Upsert membership, then upsert role, atomically
      const result = await ctx.db.$transaction(async (tx) => {
        const membership = await tx.communityMembership.upsert({
          where: {
            userId_communityId: {
              userId: member.id,
              communityId: community.id,
            },
          },
          update: {},
          create: { userId: member.id, communityId: community.id },
          select: { id: true },
        });

        await tx.communityRole.upsert({
          where: {
            membershipId_role: {
              membershipId: membership.id,
              role: input.role,
            },
          },
          update: {},
          create: { membershipId: membership.id, role: input.role },
        });

        return membership.id;
      });

      return { ok: true, membershipId: result };
    }),

  attachMembershipToUserByID: protectedProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        communityName: communityNamesEnum,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session;
      if (!session) return;

      const user = session.user;
      if (!user) return;

      const community = await ctx.db.community.findFirst({
        where: { name: input.communityName },
      });

      if (!community) return;

      // Check for existing membership
      const existingMembership = await ctx.db.communityMembership.findFirst({
        where: {
          userId: user.id,
          communityId: community.id,
        },
      });

      if (existingMembership) {
        return existingMembership; // or throw error, or silently return null
      }

      // Create new membership
      const membership = await ctx.db.communityMembership.create({
        data: {
          userId: user.id,
          communityId: community.id,
        },
      });

      // Attach a role to the created membership
      await ctx.db.communityRole.create({
        data: {
          membershipId: membership.id,
          role: "MEMBER",
        },
      });

      return membership;
    }),

  getRelevantMembers: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Get all communityIds where the user is an OFFICER
    const officerMemberships = await ctx.db.communityMembership.findMany({
      where: {
        userId,
        roles: {
          some: {
            role: MembershipRole.OFFICER,
          },
        },
      },
      select: {
        communityId: true,
      },
    });

    const officerCommunityIds = officerMemberships.map((m) => m.communityId);

    if (officerCommunityIds.length === 0) return [];

    // Find MEMBERS in those communities (excluding the current user)
    const memberMemberships = await ctx.db.communityMembership.findMany({
      where: {
        communityId: { in: officerCommunityIds },
        roles: {
          some: {
            role: MembershipRole.MEMBER,
          },
        },
        userId: {
          not: userId,
        },
      },
      include: {
        user: true,
        community: true,
      },
    });

    // Return list of user + community pairs
    return memberMemberships.map((m) => ({
      user: m.user,
      community: m.community,
    }));
  }),
});

export const createMembership = async (
  input: { userId: string; communityId: string; role: MembershipRole },
  db: PrismaClient
) => {
  const { userId, communityId, role } = input;

  // Prevent duplicates since @@unique([userId, communityId])
  const existing = await db.communityMembership.findFirst({
    where: {
      userId,
      communityId,
    },
  });

  if (existing) {
    throw new Error("User is already a member of this community.");
  }

  const membership = await db.communityMembership.create({
    data: {
      userId,
      communityId,
      roles: {
        create: [{ role }],
      },
    },
  });

  return membership;
  return;
};
