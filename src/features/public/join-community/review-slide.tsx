import type { ReviewSlideProps } from "./types";

const ReviewSlide: React.FC<ReviewSlideProps> = ({ questions, answers, onSubmit }) => {
  return (
    <div className="w-full flex flex-col max-w-xl mx-auto p-4">
      <h2 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 text-center mb-8">
        Review Your Answers
      </h2>

      <div className="bg-white/50 dark:bg-black/40 p-6 rounded-xl shadow-xl space-y-4 text-left">
        {questions
          .slice(1, questions.length - 1) // skip first (community) and last (review)
          .map(([label], index) => (
            <div
              key={index}
              className="border-b border-gray-500/20 pb-4 last:border-b-0 last:pb-0"
            >
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                {label}
              </p>
              <p className="text-gray-900 dark:text-gray-100 text-base italic">
                {answers[index + 1] ?? "No answer provided"}
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
};

export default ReviewSlide;
