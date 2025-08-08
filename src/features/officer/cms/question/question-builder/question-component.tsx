"use client";

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

const ProgressBar: React.FC<ProgressBarProps> = ({ currentQuestionIndex, totalQuestions }) => {
  const progressWidth = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  return (
    <div className="w-full mb-8">
      <div className="h-2 bg-gray-500/20 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-800 dark:text-gray-200 mt-2 text-right">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
};

const CommunitySelection: React.FC<CommunitySelectionProps> = ({ communities, onSelect }) => (
  <div className="w-full flex flex-col text-center p-4">
    <h2 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-8">
      Choose a Community
    </h2>
    <div className="flex flex-col space-y-4">
      {communities.map((communityTag) => (
        <button
          key={communityTag}
          onClick={() => onSelect(communityTag)}
          className={`w-full dark:bg-white bg-black hover:bg-gray-900 dark:hover:bg-gray-100 text-text-text-inverted dark:text-black uppercase font-extrabold py-4 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105`}
        >
          {communityTag}
        </button>
      ))}
    </div>
  </div>
);

const ChoiceInput: React.FC<ChoiceInputProps> = ({ question, value, onChange }) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {question.options?.map((option, i) => {
        const isSelected = selectedOptions.includes(option);
        const selectedClasses = isSelected
          ? "bg-blue-500 text-white shadow-lg transform scale-105"
          : "bg-white/50 dark:bg-black/40 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700";

        return (
          <button
            key={i}
            onClick={() => handleSelectChange(option)}
            className={`p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${selectedClasses} font-semibold`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

const QuestionInputSlide: React.FC<QuestionInputSlideProps> = ({ question, value, onChange, isOptional }) => (
  <div className="w-full flex flex-col text-center p-4">
    <h2 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-8">
      {question.label} {isOptional && <span className="text-sm text-gray-500">(Optional)</span>}
    </h2>
    {question.type === "select" || question.type === "multiselect" ? (
      <ChoiceInput question={question} value={value} onChange={onChange} />
    ) : (
      <input
        type="text"
        className="w-full p-4 text-lg text-gray-900 bg-white border border-gray-500/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black/40 dark:text-gray-100 dark:border-gray-500/20"
        value={value ?? ""}
        onChange={(e) => onChange({ target: { value: e.target.value } })}
        placeholder="Type your answer here..."
      />
    )}
  </div>
);

const ReviewSlide: React.FC<ReviewSlideProps> = ({ questions = [], answers = {}, onSubmit }) => (
  <div className="w-full flex flex-col max-w-xl mx-auto p-4">
    <h2 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 text-center mb-8">
      Review Your Answers
    </h2>
    <div className="bg-white/50 dark:bg-black/40 p-6 rounded-xl shadow-xl space-y-4 text-left">
      {questions.map((q) => (
        <div key={q.id} className="border-b border-gray-500/20 pb-4 last:border-b-0 last:pb-0">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">{q.label}</p>
          <p className="text-gray-900 dark:text-gray-100 text-base italic">
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
      className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-700 text-white uppercase font-extrabold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
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
  <div className="flex justify-between w-full max-w-xl mt-8 space-x-4">
    <button
      onClick={onPrevious}
      disabled={isFirstQuestion}
      className={`flex-1 py-3 px-6 rounded text-white uppercase font-extrabold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 ${
        isFirstQuestion
          ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
          : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
      }`}
    >
      Previous
    </button>

    <button
      onClick={onNext}
      disabled={isLastQuestion || isNextDisabled}
      className={`flex-1 py-3 px-6 rounded text-white uppercase font-extrabold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
        isLastQuestion || isNextDisabled
          ? "bg-blue-300 text-white cursor-not-allowed"
          : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-700"
      }`}
    >
      {isLastQuestion ? "Review & Submit" : "Next"}
    </button>
  </div>
);


const mapQuestionTypeToUI = (type: QuestionType): "text" | "select" | "multiselect" => {
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
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityName | null>(null);
  const { data: forms, isLoading } = api.communityForms.getLatestPerCommunity.useQuery();

  const selectedForm = forms?.find((form) => form.communityTag === selectedCommunity);
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
    location.href = "/member"
  };

  const renderContent = () => {
    if (isLoading) return <div className="text-center text-lg">Loading forms...</div>;

    if (!selectedCommunity) {
      return (
        <CommunitySelection
          communities={forms?.map((form) => form.communityTag) ?? []}
          onSelect={setSelectedCommunity}
        />
      );
    }

    if (isLastQuestion) {
      return <ReviewSlide questions={questions} answers={answers} onSubmit={handleSubmit} />;
    }

    if (currentQuestion) {
      const currentAnswer = answers[currentQuestion.id] ?? (currentQuestion.type === "multiselect" ? [] : "");
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

  const isNextDisabled = !isOptionalQuestion && (
    !currentQuestionId ||
    !answers[currentQuestionId] ||
    (Array.isArray(answers[currentQuestionId]) && answers[currentQuestionId].length === 0)
  );

  return (
    <main className="bg-bg dark:bg-bg-inverted text-white h-screen flex items-center justify-center p-4 w-full">
      <div className="bg-white/50 dark:bg-black/40 shadow-xl shadow-gray-500/20 rounded-xl p-8 w-full max-w-4xl flex flex-col items-center">
        {selectedCommunity && (
          <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />
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
