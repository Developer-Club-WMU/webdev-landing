import { useEffect, useState } from "react";
import { type QuestionItemProps } from "./types";

interface Props {
  question: QuestionItemProps["question"];
  onUpdate: QuestionItemProps["onUpdate"];
}

export default function QuestionOptions({ question, onUpdate }: Props) {
  const [localOptions, setLocalOptions] = useState<string[]>(question.options ?? [""]);

  // Sync local options if question.options change externally
  useEffect(() => {
    setLocalOptions(question.options ?? [""]);
  }, [question.options]);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...localOptions];
    updated[index] = value;
    setLocalOptions(updated);
  };

  const handleOptionBlur = () => {
    // Only update if the local value differs from the question's value
    if (JSON.stringify(localOptions) !== JSON.stringify(question.options)) {
      onUpdate(question.id, "options", localOptions);
    }
  };

  const handleRemoveOption = (index: number) => {
    const updated = localOptions.filter((_, i) => i !== index);
    setLocalOptions(updated);
    onUpdate(question.id, "options", updated);
  };

  const handleAddOption = () => {
    const updated = [...localOptions, ""];
    setLocalOptions(updated);
    // Do not call `onUpdate` until the user finishes editing the new option
  };

  return (
    <div className="flex-1 w-full">
      <label className="block text-sm font-medium mb-2">Options</label>
      <div className="space-y-2">
        {localOptions.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              onBlur={handleOptionBlur}
              className="flex-1 p-2 rounded-md border"
              placeholder={`Option ${index + 1}`}
            />
            <button
              onClick={() => handleRemoveOption(index)}
              className="p-2 bg-red-500 text-white rounded-md"
              disabled={localOptions.length <= 1}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={handleAddOption}
          className="w-full p-2 bg-green-500 text-white rounded-md"
        >
          + Add Option
        </button>
      </div>
    </div>
  );
}
