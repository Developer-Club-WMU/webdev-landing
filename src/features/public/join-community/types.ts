export interface QuestionInputSlideProps {
  question: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOptional?: boolean;
}

export interface ReviewSlideProps {
  questions: string[];
  answers: string[];
  onSubmit: () => void;
}

export interface ProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isNextDisabled: boolean;
}
