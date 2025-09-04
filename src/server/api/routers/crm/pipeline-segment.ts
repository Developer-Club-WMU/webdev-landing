import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const pipelineSegmentRouter = createTRPCRouter({
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
