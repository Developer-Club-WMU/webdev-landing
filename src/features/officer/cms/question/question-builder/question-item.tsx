"use client";
import React from "react";
import { type QuestionItemProps } from "./types";
import QuestionHeader from "./question-header";
import QuestionOptions from "./question-options";
import QuestionPreview from "./question-preview";

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onUpdate,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragEnd,
  isDragged,
}) => {
  const isChoiceType = question.type === "SELECT" || question.type === "MULTISELECT";

  return (
    <div
      draggable
      onDragStart={() => onDragStart(question.id)}
      onDragEnter={(e) => onDragEnter(e, question.id)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`bg-white/50 dark:bg-black/40 rounded-lg p-6 shadow-md flex flex-col space-y-6 cursor-grab ${
        isDragged ? "opacity-50 border-2 border-dashed border-blue-500" : ""
      }`}
    >
      {/* Question Index Label */}
      <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
        #{question.order + 1} (drag me)
      </div>

      {/* Header (Text + Type + Remove Button) */}
      <QuestionHeader question={question} onUpdate={onUpdate} onRemove={onRemove} />

      {/* Conditional Options Input */}
      {isChoiceType && (
        <QuestionOptions question={question} onUpdate={onUpdate} />
      )}

      {/* Always place preview last */}
      <QuestionPreview question={question} />
    </div>
  );
};

export default QuestionItem;
