import { TaskCreateInputSchema, TaskWhereUniqueInputSchema, TaskUpdateInputSchema } from "@zod/index";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { z } from "zod";

export const tasksRouter = createTRPCRouter({
  /**
   * Create a new task
   */
  create: publicProcedure
    .input(TaskCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: input
      });
    }),

  list: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.task.findMany({
        where: {
          createdById: input.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  /**
   * Get a single task by ID
   */
  get: publicProcedure
    .input(TaskWhereUniqueInputSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.task.findUnique({
        where: input,
      });
    }),

  /**
   * Update a task
   */
  update: publicProcedure
    .input(
      z.object({
        where: TaskWhereUniqueInputSchema,
        data: TaskUpdateInputSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.update({
        where: input.where,
        data: input.data,
      });
    }),

  /**
   * Delete a task
   */
  delete: publicProcedure
    .input(TaskWhereUniqueInputSchema)
    .mutation(async ({ ctx,input }) => {
      return await ctx.db.task.delete({
        where: input,
      });
    }),
});
