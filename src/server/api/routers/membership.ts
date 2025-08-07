// server/api/routers/membership.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { MembershipRole } from "@prisma/client";
import { communityNamesEnum } from "@/api/apis";

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
    .input(z.string().cuid())
    .query(async ({ ctx, input }) => {
      return ctx.db.communityMembership.findMany({
        where: { userId: input },
        include: { community: true },
      });
    }),

  attachMembershipToUser: protectedProcedure
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

      return membership;
    }),

  getRelevantMembers: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // Step 1: Get all communityIds where the user is an OFFICER
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

    // Step 2: Find MEMBERS in those communities (excluding the current user)
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
