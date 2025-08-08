import { db } from "@/server/db";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import z from "zod";
import { CommunityName, type CommunityForm } from "@prisma/client";
import { fail, ok, type Result } from "../../types";

const communityNameEnum = z.nativeEnum(CommunityName);

export const joinCommunityFormRouter = createTRPCRouter({
  grabAll: protectedProcedure.query(async () => {
    return await db.communityForm.findMany();
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.communityForm.findUnique({
        where: { id: input.id },
        include: { questions: true },
      });
    }),

  findByCommunityName: protectedProcedure
    .input(
      z.object({
        name: communityNameEnum,
      })
    )
    .query(async ({ input }) => {
      const form = await db.communityForm.findMany({
        where: { communityTag: input.name },
      });

      return form;
    }),

  getLatestPerCommunity: publicProcedure.query(async ({ ctx }) => {
    const communityTags = Object.values(CommunityName);

    const results = await Promise.all(
      communityTags.map(async (tag) => {
        try {
          const form = await ctx.db.communityForm.findFirst({
            where: {
              communityTag: tag,
              isActive: true,
            },
            orderBy: {
              createAt: "desc",
            },
            include: {
              questions: true,
            },
          });
          return form ?? null;
        } catch (err) {
          console.error(`Error loading form for tag ${tag}:`, err);
          return null;
        }
      })
    );

    const filtered = results.filter(
      (form): form is NonNullable<typeof form> => !!form
    );

    return filtered;
  }),

  // communityFormsRouter.ts
  updateMeta: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentForm = await ctx.db.communityForm.findUnique({
        where: { id: input.id },
      });

      if (!currentForm) {
        throw new Error("Form not found");
      }

      // Deactivate other forms in same community
      await ctx.db.communityForm.updateMany({
        where: {
          communityId: currentForm.communityId,
          NOT: { id: input.id },
        },
        data: { isActive: false },
      });

      // Activate and update this form
      await ctx.db.communityForm.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          isActive: true,
        },
      });

      return { success: true };
    }),

  getLatest: protectedProcedure
    .input(communityNameEnum)
    .query(async ({ ctx, input }) => {
      const form = await ctx.db.communityForm.findFirst({
        where: { communityTag: input, isActive: true },
        include: { questions: true },
      });

      return form ?? null;
    }),

  createForm: protectedProcedure
    .input(
      z.object({
        for: communityNameEnum,
        createdById: z.string(),
        isActive: z.boolean(),
        title: z.string().min(1),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Result<CommunityForm>> => {
      const createdBy = await ctx.db.user.findUnique({
        where: { id: input.createdById },
        select: { name: true },
      });

      const community = await ctx.db.community.findUnique({
        where: { name: input.for },
      });

      if (!community) return fail("Community not found");

      const form = await ctx.db.communityForm.create({
        data: {
          title: input.title,
          communityId: community.id,
          description: input.description ?? null,
          isActive: input.isActive ?? false,
          communityTag: input.for,
          createdById: input.createdById,
          createdByName: createdBy?.name ?? "Unknown",
        },
      });

      return ok(form);
    }),
});
