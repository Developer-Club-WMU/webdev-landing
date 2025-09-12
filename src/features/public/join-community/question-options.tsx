import type { QuestionOptionsSlideProps } from "./types";

const QuestionOptionsSlide: React.FC<QuestionOptionsSlideProps> = ({
  question,
  options,
  value,
  onChange,
  type,
}) => {
  const isMulti = type === "multi-select";

  const handleToggle = (option: string) => {
    if (isMulti) {
      const newValue = Array.isArray(value)
        ? value.includes(option)
          ? value.filter((v) => v !== option)
          : [...value, option]
        : [option];
      onChange(newValue);
    } else {
      console.log("TEST: option", option);
      onChange(option);
    }
  };

  const isSelected = (option: string) => {
    return isMulti ? Array.isArray(value) && value.includes(option) : value === option;
  };

  // console.log("TEST: inputSlide data", question, value, options, type);

  return (
    <div className="w-full flex flex-col max-w-2xl mx-auto text-center p-4">
      <h2 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-8">
        {question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleToggle(option)}
            className={`w-full p-6 rounded-xl border transition duration-300 ease-in-out
              ${
                isSelected(option)
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:border-blue-400 text-blue-800 dark:text-white"
                  : "border-gray-300 bg-white dark:bg-black/20 text-gray-700 dark:text-gray-200 hover:border-blue-500"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <span className="block font-semibold text-lg">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionOptionsSlide;
