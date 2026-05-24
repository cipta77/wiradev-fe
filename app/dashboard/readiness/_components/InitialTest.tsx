"use client";

import React, { useState } from "react";
import { IntroView } from "./initial-test/IntroView";
import { AssessmentView } from "./initial-test/AssessmentView";
import QuizView from "./initial-test/QuizView";
import ResultView from "./initial-test/ResultView";

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
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeTaken, setTimeTaken] = useState(0);

  const handleQuizComplete = (userAnswers: Record<number, string>, time: number) => {
    setAnswers(userAnswers);
    setTimeTaken(time);
    setIsQuizRunning(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return <ResultView answers={answers} timeTaken={timeTaken} onTabChange={onTabChange} />;
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
