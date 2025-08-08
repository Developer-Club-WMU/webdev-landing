import { useState, useEffect } from "react";
import { type QuestionItemProps } from "./types";
import { inputTypes } from "./types";

interface Props {
  question: QuestionItemProps["question"];
  onUpdate: QuestionItemProps["onUpdate"];
  onRemove: QuestionItemProps["onRemove"];
}

export default function QuestionHeader({ question, onUpdate, onRemove }: Props) {
  const [localText, setLocalText] = useState(question.text);

  // Keep localText in sync when question.text changes externally
  useEffect(() => {
    setLocalText(question.text);
  }, [question.text]);

  return (
    <div className="w-full flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium mb-1">Question Text</label>
        <input
          type="text"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onBlur={() => onUpdate(question.id, "text", localText)}
          className="w-full p-3 rounded-md border"
          placeholder="e.g., What is your name?"
        />
      </div>

      <div className="w-full md:w-auto">
        <label className="block text-sm font-medium mb-1">Input Type</label>
        <select
          value={question.type}
          onChange={(e) => onUpdate(question.id, "type", e.target.value)}
          className="w-full md:min-w-[150px] p-3 rounded-md border"
        >
          {inputTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-auto mt-2 md:mt-0">
        <button
          onClick={() => onRemove(question.id)}
          className="w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
