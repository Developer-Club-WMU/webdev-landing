import type { ProgressBarProps } from "./types";

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

export default ProgressBar;
