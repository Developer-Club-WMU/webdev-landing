import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { CommunityName } from "@prisma/client";

const communityNameEnum = z.nativeEnum(CommunityName);

export const communityRouter = createTRPCRouter({
  grabAll: protectedProcedure.query(async ({ ctx }) => {
    const communities = await ctx.db.community.findMany({
      orderBy: { createdAt: "desc" },
    });

    return communities;
  }),

  // in communityRouter.ts
  createCommunity: protectedProcedure
    .input(
      z.object({
        name: communityNameEnum,
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.community.findUnique({
        where: { name: input.name },
      });

      if (existing) throw new Error("Community already exists");

      const created = await ctx.db.community.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });

      return created;
    }),
});
