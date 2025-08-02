import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { QuestionType } from "@prisma/client";

const questionTypeEnum = z.nativeEnum(QuestionType);

export const communityQuestionsRouter = createTRPCRouter({
  createQuestion: protectedProcedure
    .input(
      z.object({
        communityId: z.string().cuid(),
        label: z.string().min(1),
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
          type: input.type,
          options: input.options ?? [],
          required: input.required ?? false,
          order: input.order ?? 0,
          communityId: input.communityId,
          createdById: userId,
        },
      });

      return created;
    }),
});
