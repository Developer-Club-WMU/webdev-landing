export interface QuestionInputSlideProps {
  question: string;
  value: string | string[];
  isOptions: boolean;
  options?: string[];
  type?: "single-select" | "multi-select";
  isOptional?: boolean;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOption?: (val: string | string[]) => void;
}

export interface ReviewSlideProps {
  questions: [string, string[] | null][];
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

export type QuestionOptionsSlideProps = {
  question: string;
  options: string[];
  value: string | string[]; // single or multi select
  onChange: (val: string | string[]) => void;
  type: "single-select" | "multi-select";
  isOptional?: boolean;
};
