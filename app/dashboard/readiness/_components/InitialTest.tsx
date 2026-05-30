"use client";

import React, { useState } from "react";
import { IntroView } from "./initial-test/IntroView";
import { AssessmentView } from "./initial-test/AssessmentView";
import QuizView from "./initial-test/QuizView";
import ResultView from "./initial-test/ResultView";

interface AssessmentSubmitResult {
  assessment_id: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
}

interface InitialTestProps {
  onStart?: () => void;
  isStarted?: boolean;
  onBack?: () => void;
  onTabChange?: (tab: string) => void;
}

export const InitialTest = ({
  onStart,
  isStarted,
  onBack,
  onTabChange,
}: InitialTestProps) => {
  const [isQuizRunning, setIsQuizRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeTaken, setTimeTaken] = useState(0);
  const [responseResult, setResponseResult] = useState<AssessmentSubmitResult | undefined>(undefined);

  const handleQuizComplete = (userAnswers: Record<string, string>, time: number, resResult?: AssessmentSubmitResult) => {
    setAnswers(userAnswers);
    setTimeTaken(time);
    setResponseResult(resResult);
    setIsQuizRunning(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return <ResultView answers={answers} timeTaken={timeTaken} onTabChange={onTabChange} responseResult={responseResult} />;
  }

  if (isQuizRunning) {
    return <QuizView onComplete={handleQuizComplete} onBack={() => setIsQuizRunning(false)} />;
  }

  if (isStarted) {
    return (
      <AssessmentView onStart={() => setIsQuizRunning(true)} onBack={onBack} />
    );
  }

  return <IntroView onStart={onStart} />;
};
