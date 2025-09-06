import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const pipelineSegmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        pipelineId: z.string(),
        name: z.string().min(1, "Segment name is required"),
        position: z.number().optional(), // Position to insert at, defaults to end
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { pipelineId, name, position } = input;

      // Get existing segments to determine order and check for duplicates
      const existingSegments = await ctx.db.pipelineSegment.findMany({
        where: { pipelineId },
        orderBy: { order: "asc" },
      });

      // Check if segment name already exists in this pipeline
      const nameExists = existingSegments.some(
        (segment) => segment.name.toLowerCase() === name.toLowerCase()
      );

      if (nameExists) {
        throw new Error(
          "A segment with this name already exists in this pipeline"
        );
      }

      // Determine the order for the new segment
      const newOrder = position ?? existingSegments.length;

      return await ctx.db.$transaction(async (tx) => {
        // If inserting at a specific position, shift existing segments
        if (position !== undefined && position < existingSegments.length) {
          // Update order for segments that come after the insertion point
          await tx.pipelineSegment.updateMany({
            where: {
              pipelineId,
              order: { gte: position },
            },
            data: {
              order: { increment: 1 },
            },
          });
        }

        // Create the new segment
        return await tx.pipelineSegment.create({
          data: {
            name,
            pipelineId,
            order: newOrder,
          },
        });
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        segmentId: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pipelineSegment.update({
        where: { id: input.segmentId },
        data: {
          name: input.name,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        segmentId: z.string(),
        pipelineId: z.string(),
        transferOption: z.enum([
          "delete_all",
          "transfer_previous",
          "transfer_next",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { segmentId, pipelineId, transferOption } = input;

      // Get all segments in the pipeline, ordered by order
      const allSegments = await ctx.db.pipelineSegment.findMany({
        where: { pipelineId },
        orderBy: { order: "asc" },
      });

      // Find the segment to delete and its position
      const segmentToDelete = allSegments.find((seg) => seg.id === segmentId);
      if (!segmentToDelete) {
        throw new Error("Segment not found");
      }

      const segmentIndex = allSegments.findIndex((seg) => seg.id === segmentId);
      let targetSegmentId: string | null = null;

      // Determine target segment based on transfer option
      if (transferOption === "transfer_previous") {
        if (segmentIndex > 0) {
          targetSegmentId = allSegments[segmentIndex - 1]!.id;
        } else {
          throw new Error("No previous segment available for transfer");
        }
      } else if (transferOption === "transfer_next") {
        if (segmentIndex < allSegments.length - 1) {
          targetSegmentId = allSegments[segmentIndex + 1]!.id;
        } else {
          throw new Error("No next segment available for transfer");
        }
      }

      return await ctx.db.$transaction(async (tx) => {
        // Handle leads based on transfer option
        if (transferOption === "delete_all") {
          // Delete all leads in this segment
          await tx.lead.deleteMany({
            where: { segmentId },
          });
        } else if (targetSegmentId) {
          // Transfer leads to target segment
          await tx.lead.updateMany({
            where: { segmentId },
            data: { segmentId: targetSegmentId },
          });
        }

        // Delete segment data
        await tx.pipelineSegmentData.deleteMany({
          where: { segmentId },
        });

        // Delete segment
        await tx.pipelineSegment.delete({
          where: { id: segmentId },
        });

        // Reorder remaining segments to fill the gap
        const remainingSegments = allSegments.filter(
          (seg) => seg.id !== segmentId
        );
        for (let i = 0; i < remainingSegments.length; i++) {
          await tx.pipelineSegment.update({
            where: { id: remainingSegments[i]!.id },
            data: { order: i },
          });
        }

        return { success: true, transferredTo: targetSegmentId };
      });
    }),
});
