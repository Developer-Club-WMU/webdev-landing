import type { QuestionInputSlideProps } from "./types";

const QuestionInputSlide: React.FC<QuestionInputSlideProps> = ({ question, value, onChange }) => {
  return (
      <div className="w-full flex flex-col max-w-2xl mx-auto text-center p-4">
        <h2 className="font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-8">
          {question}
        </h2>
        <input
          type="text"
          className="w-full p-4 text-lg text-gray-900 bg-white border border-gray-500/20 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black/40 dark:text-gray-100 dark:border-gray-500/20"
          value={value}
          onChange={onChange}
          placeholder="Type your answer here..."
        />
      </div>
  );
};

export default QuestionInputSlide;
