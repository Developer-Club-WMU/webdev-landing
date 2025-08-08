import { QuestionType } from "@prisma/client";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  order: number;
}

export const inputTypes = Object.values(QuestionType);

export interface QuestionItemProps {
  question: Question;
  onUpdate: (
    id: string,
    field: "text" | "type" | "options",
    value: string | string[]
  ) => void;
  onRemove: (id: string) => void;
  onDragStart: (questionId: string) => void;
  onDragEnter: (
    e: React.DragEvent<HTMLDivElement>,
    targetQuestionId: string
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
  isDragged: boolean;
}
