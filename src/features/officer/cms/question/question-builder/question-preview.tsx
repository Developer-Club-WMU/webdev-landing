import { type QuestionItemProps } from "./types";

interface Props {
  question: QuestionItemProps["question"];
}

export default function QuestionPreview({ question }: Props) {
  const options = question.options ?? [];

  return (
    <div className="w-full mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border-l-4 border-blue-500">
      <h4 className="text-sm font-medium mb-2">Preview:</h4>
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          {question.text || "Question text will appear here"}
        </label>

        {question.type === "TEXT" && <input type="text" disabled className="w-full p-2 border rounded-md bg-gray-100" placeholder="User will enter text here" />}
        {question.type === "TEXTAREA" && <textarea disabled rows={3} className="w-full p-2 border rounded-md bg-gray-100" placeholder="User will enter longer text" />}
        {question.type === "NUMBER" && <input type="number" disabled className="w-full p-2 border rounded-md bg-gray-100" placeholder="User will enter a number" />}
        {question.type === "DATE" && <input type="date" disabled className="w-full p-2 border rounded-md bg-gray-100" />}
        {question.type === "BOOLEAN" && (
          <label className="flex items-center space-x-2">
            <input type="checkbox" disabled />
            <span className="text-sm">Yes/No checkbox</span>
          </label>
        )}
        {question.type === "SELECT" && (
          <select disabled className="w-full p-2 border rounded-md bg-gray-100">
            <option>Select an option...</option>
            {options.map((o, i) => (
              <option key={i} value={o}>{o || `Option ${i + 1}`}</option>
            ))}
          </select>
        )}
        {question.type === "MULTISELECT" && (
          <div className="space-y-1">
            {options.map((o, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input type="checkbox" disabled />
                <span className="text-sm">{o || `Option ${i + 1}`}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
