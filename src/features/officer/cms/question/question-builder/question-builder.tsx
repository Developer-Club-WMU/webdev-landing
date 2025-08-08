"use client";

import { useEffect, useState } from "react";
import type { Question } from "./types";
import type { CommunityForm, CommunityQuestion } from "@prisma/client";
import { TextUtils } from "@/lib/text.utils";
import { api } from "@/trpc/react";
import QuestionItem from "./question-item";

type Props = {
  form: CommunityForm & { questions: CommunityQuestion[] };
};

/**
 * Houses the question builder components
 */
const QuestionBuilder: React.FC<Props> = ({ form }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [title, setTitle] = useState(form.title);
  const [description, setDescription] = useState(form.description ?? "");

  useEffect(() => {
    const mapped = form.questions
      .sort((a, b) => a.order - b.order)
      .map((q) => ({
        id: q.id,
        text: q.label,
        type: q.type,
        options: q.options,
        order: q.order,
      }));
    setQuestions(mapped);
  }, [form]);

  const createQuestionMutation = api.communityQuestions.createQuestion.useMutation({
    onSuccess: (created) => {
      const newQuestion: Question = {
        id: created.id,
        text: created.label,
        type: created.type,
        options: created.options,
        order: created.order,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    },
  });

  const handleAddQuestion = () => {
    createQuestionMutation.mutate({
      label: "New Question",
      type: "TEXT",
      formId: form.id,
      options: [],
      required: false,
      order: questions.length,
    });
  };

  const updateQuestionMutation = api.communityQuestions.update.useMutation();

  const handleUpdateQuestion = async (
    id: string,
    field: "text" | "type" | "options" | "order",
    value: string | string[] | number
  ) => {
    const result = await updateQuestionMutation.mutateAsync({ id, field, value });

    if (result.failure) {
      console.error("Failed to update:", result.failure);
      alert(result.failure);
      return;
    }

    // Success: update local state
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;

        const updated = { ...q, [field]: value };

        if (field === "type") {
          if (value === "SELECT" || value === "MULTISELECT") {
            updated.options = updated.options?.length ? updated.options : [""];
          } else {
            updated.options = [];
          }
        }

        return updated;
      })
    );
  };

  const deleteQuestionMutation = api.communityQuestions.delete.useMutation();

  const handleRemoveQuestion = async (id: string) => {
    const result = await deleteQuestionMutation.mutateAsync(id);

    if (result.failure) {
      // Show error to user
      console.error("Delete failed:", result.failure);
      alert(result.failure); // or use toast/error state
      return;
    }

    // Only update local state if deletion succeeded
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSaveForm = () => {
    updateFormMeta.mutate({
      id: form.id,
      title,
      description,
    });
  };

  const handleDragStart = (questionId: string) => {
    setDraggedItem(questionId);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetQuestionId: string) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === targetQuestionId) return;

    const draggedIndex = questions.findIndex(q => q.id === draggedItem);
    const targetIndex = questions.findIndex(q => q.id === targetQuestionId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const reordered = [...questions];
    const [moved] = reordered.splice(draggedIndex, 1);
    if (!moved) return;
    reordered.splice(targetIndex, 0, moved);

    // Update order values for all affected questions
    const updatedQuestions = reordered.map((q, index) => ({
      ...q,
      order: index
    }));

    setQuestions(updatedQuestions);
  };

  const updateFormMeta = api.communityForms.updateMeta.useMutation({
    onSuccess: () => {
      // alert("Form saved successfully!");
      console.log("TEST: success")
    },
    onError: (err) => {
      console.error(err);
      // alert("Failed to save form metadata");
    },
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = async () => {
   if (draggedItem) {
      const updatePromises = questions.map((q, newIndex) => {
          return handleUpdateQuestion(q.id, "order", newIndex);
      });

      try {
        await Promise.all(updatePromises);
      } catch (error) {
        console.error("Error saving reordered questions:", error);
      }

      setDraggedItem(null);
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-4xl">
        <h1 className="font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-8 uppercase text-center">
          Build Your Form{" "}
          <span className={TextUtils.resolveClubTextColor(form.communityTag)}>
            {form.communityTag}
          </span>
        </h1>

        <div className="mb-6 text-center flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter form title..."
            className="w-full text-4xl font-black bg-transparent text-center mb-2 border-b border-gray-400 dark:border-gray-600 focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
            className="w-full text-lg bg-transparent text-center border-b border-gray-400 dark:border-gray-600 focus:outline-none resize-none"
          />
        </div>

        <div className="space-y-6 mb-8">
          {questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onUpdate={handleUpdateQuestion}
              onRemove={handleRemoveQuestion}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              isDragged={draggedItem === question.id}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={handleAddQuestion}
            className="flex-1 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 uppercase font-extrabold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Add Question
          </button>
          <button
            onClick={handleSaveForm}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-700 text-white uppercase font-extrabold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBuilder;
