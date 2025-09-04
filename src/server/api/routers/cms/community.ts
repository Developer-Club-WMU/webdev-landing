import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { CommunityName, type PrismaClient } from "@prisma/client";

const communityNameEnum = z.nativeEnum(CommunityName);

export const communityRouter = createTRPCRouter({
  grabAll: protectedProcedure
    .input(z.object({ isVisible: z.enum(["all", "visible", "hidden"]) }))
    .query(async ({ ctx, input }) => {
      return await grabAllCommunities(input, ctx.db);
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

export type IsVisible = "all" | "visible" | "hidden";

export const grabAllCommunities = async (
  input: { isVisible: IsVisible },
  prisma: PrismaClient
) => {
  return prisma.community.findMany({
    orderBy: { createdAt: "desc" },
    where:
      input.isVisible === "all"
        ? {}
        : { visible: input.isVisible === "visible" },
  });
};
