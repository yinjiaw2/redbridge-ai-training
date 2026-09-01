export type Role = "admin" | "learner";
export type Question = {
  id: number;
  type?: "choice" | "essay";
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  wordLimit?: number;
  image?: string;
  referenceImage?: string;
};
export type QuestionBank = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
export type Quiz = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  passingScore: number;
  timeLimit: number;
  maxAttempts: number;
  status: "Published" | "Draft";
  questions: Question[];
  showScore: boolean;
  answerRelease: "immediate" | "deadline" | "never";
  resultsReleased: boolean;
  requireFullscreen: boolean;
  detectTabSwitch: boolean;
  detectFullscreenExit: boolean;
  maxViolations: number;
  autoSubmit: boolean;
};
export type Attempt = {
  id: string;
  quizId: string;
  learner: string;
  date: string;
  score: number;
  correct: number;
  total: number;
  timeUsed: number;
  answers: Record<number, number | string>;
  questionOrder?: number[];
  optionOrders?: Record<number, number[]>;
  questionSnapshot?: Question[];
  passingScoreSnapshot?: number;
  essayGrades?: Record<number, "Excellent" | "Passed" | "Failed">;
  essayComments?: Record<number, string>;
  essayGraders?: Record<number, string>;
  status: "Passed" | "Failed" | "Pending";
  tabSwitches: number;
  fullscreenExits: number;
};

export type CustomerProfile = {
  id: string;
  displayName: string;
  industry: string;
  occupation: string;
  visaType: string;
  location: string;
  customerType: string;
  intentLevel: "低" | "中" | "高";
  difficulty: "简单" | "中等" | "困难";
};

export type Scenario = {
  id: string;
  customerId: string;
  title: string;
  objective: string;
  customerType: string;
  industry: string;
  visa: string;
  difficulty: "简单" | "中等" | "困难";
  estimatedMinutes: number;
  openingMessage: string;
};

export type TrainingMessage = {
  id: string;
  sender: "CUSTOMER" | "STUDENT" | "SYSTEM";
  content: string;
  time: string;
};
