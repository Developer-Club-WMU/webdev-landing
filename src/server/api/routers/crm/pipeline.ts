// import { PipelineCreateInputSchema } from "@zod/index";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

/**
 * Schema for pipeline creation input
 */
export const PipelineCreateInputSchema = z.object({
  name: z.string().min(1, "Pipeline name is required"),
  description: z.string().optional(),
  segments: z
    .array(z.string().min(1, "Segment name cannot be empty"))
    .min(1, "At least one segment is required"),
});

export const pipelineRouter = createTRPCRouter({
  /**
   * Create a new pipeline
   */
  create: protectedProcedure
    .input(PipelineCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const now = new Date();
      const userId = ctx.session.user.id;
      console.log("useID:", userId);

      return ctx.db.pipeline.create({
        data: {
          name: input.name,
          createdAt: now,
          updatedAt: now,
          createdBy: {
            connect: { id: userId },
          },
          segments: {
            create: input.segments.map((segmentName) => ({
              name: segmentName,
            })),
          },
        },
        include: {
          segments: true,
          createdBy: true,
        },
      });
    }),

  grabAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.pipeline.findMany({
      take: 100,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
      },
    });
  }),

  /**
   * Delete a pipeline by ID
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Delete pipeline with authorization check
      // Cascade will handle segments and segment data
      return ctx.db.pipeline.delete({
        where: {
          id: input.id,
          createdById: ctx.session.user.id, // Only allow deleting own pipelines
        },
      });
    }),

  /**
   * Get a pipeline by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.pipeline.findUnique({
        where: {
          id: input.id,
        },
        include: {
          createdBy: true,
          segments: {
            orderBy: {
              id: "asc",
            },
          },
          segmentData: {
            include: {
              segment: true,
            },
          },
        },
      });
    }),
});
