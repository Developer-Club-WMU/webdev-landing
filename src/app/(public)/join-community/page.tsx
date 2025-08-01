"use client";
import NavigationButtons from "@/features/public/join-community/navigation-buttons";
import ProgressBar from "@/features/public/join-community/progress-bar";
import QuestionInputSlide from "@/features/public/join-community/question-input-slide";
import ReviewSlide from "@/features/public/join-community/review-slide";
import React, { useState } from "react";

// Define the questions for the form
const questions = [
  "What's your name?",
  "This is something else",
  "What are you interested in?",
  "What do you hope to gain?",
  "Share a portfolio or link (optional)",
  "Review & Submit",
];

const JoinCommunityPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length - 1).fill('')); // -1 because the last step is review

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isOptionalQuestion = currentQuestionIndex === questions.length -2;

  // Handle input changes for the form
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  // Handle the final submission
  const handleSubmit = () => {
    console.log("Form submitted with answers:", answers);
    alert("Form Submitted! Check console for answers.");
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
      <main className="bg-bg dark:bg-bg-inverted text-white h-screen flex items-center justify-center p-4 w-full">
        <div className="bg-white/50 dark:bg-black/40 shadow-xl shadow-gray-500/20 rounded-xl p-8 w-full max-w-4xl flex flex-col items-center">
        <ProgressBar
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />

        {isLastQuestion ? (
          <ReviewSlide
            questions={questions}
            answers={answers}
            onSubmit={handleSubmit}
          />
        ) : (
          <QuestionInputSlide
            question={questions[currentQuestionIndex]!}
            value={answers[currentQuestionIndex] ?? ""}
            onChange={handleAnswerChange}
            isOptional={isOptionalQuestion}
          />
        )}

        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
          isNextDisabled={!answers[currentQuestionIndex] && !isOptionalQuestion}
        />
      </div>
    </main>
  );
};

export default JoinCommunityPage;
