"use client";

import { useCachedSession } from "@/hooks/userCachedSession";
import { api } from "@/trpc/react";
import { type QuestionType, type CommunityName } from "@prisma/client";
import React, { useState } from "react";

// --- Types ---

type QuestionTypeUI = "text" | "select" | "multiselect";

interface CommunityFormQuestion {
  id: string;
  label: string;
  type: QuestionTypeUI;
  options?: string[];
  order: number;
  required: boolean;
}

interface QuestionInputSlideProps {
  question: CommunityFormQuestion;
  value: string | string[];
  onChange: (e: { target: { value: string | string[] } }) => void;
  isOptional: boolean;
}

interface ChoiceInputProps {
  question: CommunityFormQuestion;
  value: string | string[];
  onChange: (e: { target: { value: string | string[] } }) => void;
}

interface ReviewSlideProps {
  questions: CommunityFormQuestion[];
  answers: Record<string, string | string[]>;
  onSubmit: () => void;
}

interface CommunitySelectionProps {
  communities: CommunityName[];
  onSelect: (tag: CommunityName) => void;
}

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isNextDisabled: boolean;
}

interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

// --- Sub-Components ---

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestionIndex,
  totalQuestions,
}) => {
  const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  return (
    <div className="mb-8 w-full">
      <div className="h-2 rounded-full bg-gray-500/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <p className="mt-2 text-right text-sm text-gray-800 dark:text-gray-200">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
};

const CommunitySelection: React.FC<CommunitySelectionProps> = ({
  communities,
  onSelect,
}) => (
  <div className="flex w-full flex-col p-4 text-center">
    <h2 className="mb-8 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-4xl font-black [letter-spacing:-.05em] text-transparent uppercase md:text-6xl lg:text-7xl xl:text-8xl">
      Choose a Community
    </h2>
    <div className="flex flex-col space-y-4">
      {communities.map((communityTag) => (
        <button
          key={communityTag}
          onClick={() => onSelect(communityTag)}
          className={`text-text-text-inverted w-full transform rounded-lg bg-black px-6 py-4 font-extrabold uppercase shadow-md transition duration-300 hover:scale-105 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100`}
        >
          {communityTag}
        </button>
      ))}
    </div>
  </div>
);

const ChoiceInput: React.FC<ChoiceInputProps> = ({
  question,
  value,
  onChange,
}) => {
  const selectedOptions = Array.isArray(value) ? value : [value];

  const handleSelectChange = (option: string) => {
    if (question.type === "multiselect") {
      const newSelection = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      onChange({ target: { value: newSelection } });
    } else {
      onChange({ target: { value: option } });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {question.options?.map((option, i) => {
        const isSelected = selectedOptions.includes(option);
        const selectedClasses = isSelected
          ? "bg-blue-500 text-white shadow-lg transform scale-105"
          : "bg-white/50 dark:bg-black/40 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700";

        return (
          <button
            key={i}
            onClick={() => handleSelectChange(option)}
            className={`rounded-lg p-4 shadow-md transition duration-300 ease-in-out ${selectedClasses} font-semibold`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

const QuestionInputSlide: React.FC<QuestionInputSlideProps> = ({
  question,
  value,
  onChange,
  isOptional,
}) => (
  <div className="flex w-full flex-col p-4 text-center">
    <h2 className="mb-8 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-4xl font-black [letter-spacing:-.05em] text-transparent uppercase md:text-6xl lg:text-7xl xl:text-8xl">
      {question.label}{" "}
      {isOptional && <span className="text-sm text-gray-500">(Optional)</span>}
    </h2>
    {question.type === "select" || question.type === "multiselect" ? (
      <ChoiceInput question={question} value={value} onChange={onChange} />
    ) : (
      <input
        type="text"
        className="w-full rounded-lg border border-gray-500/20 bg-white p-4 text-lg text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-500/20 dark:bg-black/40 dark:text-gray-100"
        value={value ?? ""}
        onChange={(e) => onChange({ target: { value: e.target.value } })}
        placeholder="Type your answer here..."
      />
    )}
  </div>
);

const ReviewSlide: React.FC<ReviewSlideProps> = ({
  questions = [],
  answers = {},
  onSubmit,
}) => (
  <div className="mx-auto flex w-full max-w-xl flex-col p-4">
    <h2 className="mb-8 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-center text-4xl font-black [letter-spacing:-.05em] text-transparent uppercase md:text-6xl lg:text-7xl xl:text-8xl">
      Review Your Answers
    </h2>
    <div className="space-y-4 rounded-xl bg-white/50 p-6 text-left shadow-xl dark:bg-black/40">
      {questions.map((q) => (
        <div
          key={q.id}
          className="border-b border-gray-500/20 pb-4 last:border-b-0 last:pb-0"
        >
          <p className="mb-1 text-lg font-medium text-gray-800 dark:text-gray-200">
            {q.label}
          </p>
          <p className="text-base text-gray-900 italic dark:text-gray-100">
            {(() => {
              const answer = answers[q.id];
              if (Array.isArray(answer)) return answer.join(", ");
              return answer ?? "No answer provided";
            })()}
          </p>
        </div>
      ))}
    </div>
    <button
      onClick={onSubmit}
      className="focus:ring-opacity-75 mt-8 w-full transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-extrabold text-white uppercase shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-cyan-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      Submit All Answers
    </button>
  </div>
);

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  isNextDisabled,
}) => (
  <div className="mt-8 flex w-full max-w-xl justify-between space-x-4">
    <button
      onClick={onPrevious}
      disabled={isFirstQuestion}
      className={`focus:ring-opacity-75 flex-1 transform rounded px-6 py-3 font-extrabold text-white uppercase transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:outline-none ${
        isFirstQuestion
          ? "cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      Previous
    </button>

    <button
      onClick={onNext}
      disabled={isLastQuestion || isNextDisabled}
      className={`focus:ring-opacity-75 flex-1 transform rounded px-6 py-3 font-extrabold text-white uppercase transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        isLastQuestion || isNextDisabled
          ? "cursor-not-allowed bg-blue-300 text-white"
          : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-700"
      }`}
    >
      {isLastQuestion ? "Review & Submit" : "Next"}
    </button>
  </div>
);

const mapQuestionTypeToUI = (
  type: QuestionType
): "text" | "select" | "multiselect" => {
  switch (type) {
    case "TEXT":
    case "TEXTAREA":
    case "NUMBER":
    case "DATE":
    case "BOOLEAN":
      return "text"; // Treat all these as text inputs for now
    case "SELECT":
      return "select";
    case "MULTISELECT":
      return "multiselect";
    default:
      return "text"; // fallback
  }
};

// --- Main Component ---

const JoinCommunityForm: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedCommunity, setSelectedCommunity] =
    useState<CommunityName | null>(null);
  const session = useCachedSession();
  const { data: forms, isLoading } =
    api.communityForms.getLatestPerCommunity.useQuery();
  const attachMembershipToUserByID =
    api.membership.attachMembershipToUserByID.useMutation();

  if (!session?.data?.user) return <div>... You must be logged in</div>;
  const userId = session.data.user.id;

  const selectedForm = forms?.find(
    (form) => form.communityTag === selectedCommunity
  );
  const questions: CommunityFormQuestion[] = selectedForm
    ? [...selectedForm.questions]
        .sort((a, b) => a.order - b.order)
        .map((q) => ({
          id: q.id,
          label: q.label,
          required: q.required,
          options: q.options,
          type: mapQuestionTypeToUI(q.type),
          order: q.order,
        }))
    : [];

  const totalQuestions = questions.length + 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const currentQuestionId = currentQuestion?.id;
  const isOptionalQuestion = currentQuestion?.required === false;

  const handleAnswerChange = (e: { target: { value: string | string[] } }) => {
    const value = e.target.value;
    if (currentQuestionId) {
      setAnswers({ ...answers, [currentQuestionId]: value });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedCommunity) return;

    attachMembershipToUserByID.mutate(
      {
        userId: userId,
        communityName: selectedCommunity,
      },
      {
        onSuccess: () => {
          // Redirect only on success
          window.location.href = "/member";
        },
        onError: (error) => {
          console.error("Failed to attach membership:", error);
          alert("There was a problem joining the community. Please try again.");
        },
      }
    );
  };

  const renderContent = () => {
    if (isLoading)
      return <div className="text-center text-lg">Loading forms...</div>;

    if (!selectedCommunity) {
      return (
        <CommunitySelection
          communities={forms?.map((form) => form.communityTag) ?? []}
          onSelect={setSelectedCommunity}
        />
      );
    }

    if (isLastQuestion) {
      return (
        <ReviewSlide
          questions={questions}
          answers={answers}
          onSubmit={handleSubmit}
        />
      );
    }

    if (currentQuestion) {
      const currentAnswer =
        answers[currentQuestion.id] ??
        (currentQuestion.type === "multiselect" ? [] : "");
      return (
        <QuestionInputSlide
          question={currentQuestion}
          value={currentAnswer}
          onChange={handleAnswerChange}
          isOptional={isOptionalQuestion}
        />
      );
    }

    return null;
  };

  const isNextDisabled =
    !isOptionalQuestion &&
    (!currentQuestionId ||
      !answers[currentQuestionId] ||
      (Array.isArray(answers[currentQuestionId]) &&
        answers[currentQuestionId].length === 0));

  return (
    <main className="bg-bg dark:bg-bg-inverted flex h-screen w-full items-center justify-center p-4 text-white">
      <div className="flex w-full max-w-4xl flex-col items-center rounded-xl bg-white/50 p-8 shadow-xl shadow-gray-500/20 dark:bg-black/40">
        {selectedCommunity && (
          <ProgressBar
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
        )}
        {renderContent()}
        {selectedCommunity && !isLastQuestion && (
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            isNextDisabled={isNextDisabled}
          />
        )}
      </div>
    </main>
  );
};

export default JoinCommunityForm;
