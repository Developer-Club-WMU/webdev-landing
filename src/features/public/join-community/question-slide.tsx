"use client";
import { useState } from "react";
// import { animated } from "@react-spring/web";

interface QuestionSlideProps {
  index: number;
}

const questions = [
  "What’s your name?",
  "What are you interested in?",
  "What do you hope to gain?",
  "Share a portfolio or link (optional)",
  "Review & Submit",
];

export function QuestionSlide({ index }: QuestionSlideProps) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full flex flex-col max-w-xl mx-auto text-center bg-bg dark:bg-bg-inverted">
      <h2 className="text-3xl font-semibold mb-4">{questions[index]}</h2>
      {index < questions.length - 1 ? (
        <input
          type="text"
          className="w-full p-3 dark:text-text text-text-inverted rounded bg-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <button className="bg-white px-6 py-3 rounded text-white">
          Submit
        </button>
      )}
    </div>
  );
}
