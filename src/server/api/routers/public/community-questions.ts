import z from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  // publicProcedure,
} from "../../trpc";
import { CommunityName, QuestionType } from "@prisma/client";
import { fail, ok, type Result } from "../../types";

const questionTypeEnum = z.nativeEnum(QuestionType);

// const communityNameEnum = z.nativeEnum(CommunityName);

export const communityQuestionsRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(
      z.object({
        label: z.string().min(1),
        formId: z.string(),
        type: questionTypeEnum,
        options: z.array(z.string()).optional(),
        required: z.boolean().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const created = await ctx.db.communityQuestion.create({
        data: {
          label: input.label,
          formId: input.formId,
          type: input.type,
          options: input.options ?? [],
          required: input.required ?? false,
          order: input.order ?? 0,
          createdById: userId,
        },
      });

      return created;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        field: z.enum(["text", "type", "options", "order"]),
        value: z.union([z.string(), z.array(z.string()), z.number()]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Prepare update data object with explicit types
      const data: {
        label?: string;
        type?: QuestionType;
        options?: string[];
        order?: number;
      } = {};

      // Map the field to the correct database column
      switch (input.field) {
        case "text":
          data.label = input.value as string;
          break;
        case "type":
          data.type = input.value as QuestionType;
          break;
        case "options":
          data.options = input.value as string[];
          break;
        case "order":
          data.order = input.value as number;
          break;
      }

      const updated = await ctx.db.communityQuestion.update({
        where: { id: input.id },
        data,
      });

      return ok(updated);
    }),

  getFormsByCommunityTag: protectedProcedure
    .input(z.object({ tag: z.nativeEnum(CommunityName) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.communityForm.findMany({
        where: { communityTag: input.tag },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.communityQuestion.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getByFormId: protectedProcedure
    .input(z.string()) // formId
    .query(async ({ ctx, input }) => {
      return ctx.db.communityQuestion.findMany({
        where: { formId: input },
        orderBy: { order: "asc" },
      });
    }),

  delete: protectedProcedure
    .input(z.string()) // question ID
    .mutation(async ({ ctx, input }): Promise<Result<"deleted">> => {
      if (ctx.session.user.role !== "OFFICER") {
        return fail("You do not have permission to delete this question.");
      }

      try {
        await ctx.db.communityQuestion.delete({
          where: { id: input },
        });
        return ok("deleted");
      } catch (error) {
        console.error("Delete error:", error);
        return fail("Failed to delete question. Please try again later.");
      }
    }),
});
