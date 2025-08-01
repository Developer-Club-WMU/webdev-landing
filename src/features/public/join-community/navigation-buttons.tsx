import React from 'react';
import type { NavigationButtonsProps } from './types';

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
  isNextDisabled,
}) => {
  return (
    <div className="flex justify-between w-full max-w-xl mt-8 space-x-4">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`flex-1 py-3 px-6 rounded text-white uppercase font-extrabold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75
          ${isFirstQuestion
            ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
            : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
          }`}
      >
        Previous
      </button>

      {/* Next/Submit Button */}
      <button
        onClick={onNext}
        disabled={isLastQuestion || isNextDisabled}
        className={`flex-1 py-3 px-6 rounded text-white uppercase font-extrabold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
          ${isLastQuestion || isNextDisabled
            ? 'bg-blue-300 text-white cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-700'
          }`}
      >
        {isLastQuestion ? 'Review & Submit' : 'Next'}
      </button>
    </div>
  );
};

export default NavigationButtons;
