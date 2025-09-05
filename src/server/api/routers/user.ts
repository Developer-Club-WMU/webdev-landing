import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  grabAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  toggleAdmin: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      // Check if user exists
      const user = await ctx.db.user.findUnique({
        where: { email },
        select: { id: true, userRole: true },
      });

      if (!user) {
        return {
          ok: false,
          message: `User not found: ${email}`,
        };
      }

      // Flip between ADMIN and MEMBER (or whatever your base role is)
      const newRole = user.userRole === "ADMIN" ? "STANDARD" : "ADMIN";

      const updated = await ctx.db.user.update({
        where: { email },
        data: { userRole: newRole },
        select: { id: true, email: true, userRole: true },
      });

      return {
        ok: true,
        message: `User ${email} role updated to ${updated.userRole}`,
        user: updated,
      };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }),
});
