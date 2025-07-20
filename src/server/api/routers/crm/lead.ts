import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

/**
 * Schema for lead creation input
 */
export const LeadCreateInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  capitalValue: z.number().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  companyName: z.string().min(1, "Company name is required"),
  avatarURL: z.string().url().optional().or(z.literal("")),
  dueDate: z.string().datetime().optional(),
  status: z.string().default("new"),
  leadType: z.string().default("customer"),
  pipelineStage: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).default([]),
  pipelineId: z.string().optional(),
  segmentId: z.number().optional(),
});

/**
 * Schema for lead update input
 */
export const LeadUpdateInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  capitalValue: z.number().optional(),
  contactName: z.string().min(1, "Contact name is required").optional(),
  companyName: z.string().min(1, "Company name is required").optional(),
  avatarURL: z.string().url().optional().or(z.literal("")),
  dueDate: z.string().datetime().optional(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  pipelineId: z.string().optional(),
  segmentId: z.number().optional(),
  isArchived: z.boolean().optional(),
});

export const leadRouter = createTRPCRouter({
  /**
   * Create a new lead
   */
  create: protectedProcedure
    .input(LeadCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { pipelineId, segmentId, ...createData } = input;

      return ctx.db.lead.create({
        data: {
          ...createData,
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
          createdBy: {
            connect: { id: userId },
          },
          pipeline: pipelineId
            ? {
                connect: { id: pipelineId },
              }
            : undefined,
          segment: segmentId
            ? {
                connect: { id: segmentId },
              }
            : undefined,
        },
        include: {
          createdBy: true,
          pipeline: true,
          segment: true,
        },
      });
    }),

  /**
   * Get all leads for the current user
   */
  getAll: protectedProcedure
    .input(
      z.object({
        pipelineId: z.string().optional(),
        segmentId: z.number().optional(),
        status: z.string().optional(),
        includeArchived: z.boolean().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where = {
        createdById: ctx.session.user.id,
        isArchived: input.includeArchived ? undefined : false,
        pipelineId: input.pipelineId,
        segmentId: input.segmentId,
        status: input.status,
      };

      // Remove undefined values
      Object.keys(where).forEach(
        (key) =>
          where[key as keyof typeof where] === undefined &&
          delete where[key as keyof typeof where],
      );

      return ctx.db.lead.findMany({
        where,
        include: {
          createdBy: true,
          pipeline: true,
          segment: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  /**
   * Get a lead by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.lead.findUnique({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
        include: {
          createdBy: true,
          pipeline: true,
          segment: true,
        },
      });
    }),

  /**
   * Update a lead
   */
  update: protectedProcedure
    .input(LeadUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, pipelineId, segmentId, ...updateData } = input;

      return ctx.db.lead.update({
        where: {
          id,
          createdById: ctx.session.user.id,
        },
        data: {
          ...updateData,
          dueDate: updateData.dueDate
            ? new Date(updateData.dueDate)
            : undefined,
          pipeline: pipelineId
            ? {
                connect: { id: pipelineId },
              }
            : pipelineId === null
              ? {
                  disconnect: true,
                }
              : undefined,
          segment: segmentId
            ? {
                connect: { id: segmentId },
              }
            : segmentId === null
              ? {
                  disconnect: true,
                }
              : undefined,
        },
        include: {
          createdBy: true,
          pipeline: true,
          segment: true,
        },
      });
    }),

  /**
   * Delete a lead
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lead.delete({
        where: {
          id: input.id,
          createdById: ctx.session.user.id,
        },
      });
    }),

  /**
   * Move a lead to a different segment
   */
  moveToSegment: protectedProcedure
    .input(
      z.object({
        leadId: z.string(),
        segmentId: z.number(),
        status: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.lead.update({
        where: {
          id: input.leadId,
          createdById: ctx.session.user.id,
        },
        data: {
          segmentId: input.segmentId,
          status: input.status,
        },
        include: {
          createdBy: true,
          pipeline: true,
          segment: true,
        },
      });
    }),

  /**
   * Get leads by pipeline ID
   */
  getByPipelineId: protectedProcedure
    .input(z.object({ pipelineId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.lead.findMany({
        where: {
          pipelineId: input.pipelineId,
          createdById: ctx.session.user.id,
          isArchived: false,
        },
        include: {
          createdBy: true,
          pipeline: true,
          segment: true,
        },
        orderBy: [{ segmentId: "asc" }, { createdAt: "desc" }],
      });
    }),
});
