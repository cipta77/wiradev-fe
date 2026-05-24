"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { quizData } from "./quizData";
import { QuizHeader } from "./quiz-components/QuizHeader";
import { SectionTabs } from "./quiz-components/SectionTabs";
import { SectionIntroCard } from "./quiz-components/SectionIntroCard";
import { TaskCard } from "./quiz-components/TaskCard";
import { MultipleChoiceTask } from "./quiz-components/MultipleChoiceTask";
import { PracticalTask } from "./quiz-components/PracticalTask";
import { EssayTask } from "./quiz-components/EssayTask";
import { cn } from "@/lib/utils";

interface QuizViewProps {
  onComplete: (answers: Record<number, string>, time: number) => void;
  onBack?: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onComplete, onBack }) => {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const currentSection = quizData[activeSectionIdx];
  
  const totalTasks = quizData.reduce((acc, s) => acc + s.tasks.length, 0);
  const completedCount = Object.keys(answers).length;

  useEffect(() => {
    const scrollEl = document.getElementById("readiness-scroll");
    if (scrollEl) {
      scrollEl.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSectionIdx]);

  const handleNextSection = () => {
    if (activeSectionIdx < quizData.length - 1) {
      setActiveSectionIdx((p) => p + 1);
    } else {
      onComplete(answers, elapsed);
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIdx > 0) {
      setActiveSectionIdx((p) => p - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const handleOptionSelect = (taskId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [taskId]: optionId }));
  };

  const progressPercentage = ((activeSectionIdx + 1) / quizData.length) * 100;
  
  const barColors: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-[#A855F7]",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="w-full max-w-[850px] mx-auto animate-in fade-in duration-500 pb-12">
      <QuizHeader 
        onBack={handlePrevSection} 
        elapsedTime={formatTime(elapsed)} 
        progress={`${completedCount}/${totalTasks}`} 
        activeColor={currentSection.color}
      />

      <SectionTabs 
        sections={quizData} 
        activeSectionId={currentSection.id} 
        onTabClick={(idx) => setActiveSectionIdx(idx)}
      />

      <div className="w-full h-[2px] md:h-[3.5px] bg-slate-100 rounded-full mb-5 overflow-hidden">
        <div
          className={cn("h-full transition-all duration-700 ease-in-out", barColors[currentSection.color])}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <SectionIntroCard section={currentSection} />

      <div className="flex flex-col gap-2.5">
        {currentSection.tasks.map((task, idx) => (
          <TaskCard 
            key={task.id} 
            index={idx + 1} 
            type={task.type === "Practical Test" ? "File Upload" : task.type} 
            activeColor={currentSection.color}
          >
            {task.type === "Multiple Choice" && (
              <MultipleChoiceTask 
                question={task.question} 
                options={task.options || []} 
                selectedOption={answers[task.id]} 
                onSelect={(optId) => handleOptionSelect(task.id, optId)}
                activeColor={currentSection.color}
              />
            )}
            {task.type === "Practical Test" && (
              <PracticalTask 
                title={task.question} 
                instructions={task.instructions || []} 
                activeColor={currentSection.color}
              />
            )}
            {task.type === "Essay" && (
              <EssayTask 
                question={task.question} 
                placeholder={task.placeholder || ""} 
                minWords={task.minWords || 0} 
              />
            )}
          </TaskCard>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {activeSectionIdx > 0 && (
          <button
            onClick={handlePrevSection}
            className="flex-1 bg-[#F8FAFC] text-slate-400 py-3 rounded-[16px] font-semibold text-[14px] flex items-center justify-center gap-2 border border-slate-100 hover:bg-slate-50 transition-all active:scale-[0.98] cursor-pointer"
          >
            Previous Section
          </button>
        )}
        <button
          onClick={handleNextSection}
          className={cn(
            "bg-[#066EFF] text-white py-3 rounded-[16px] font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#0052cc] transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20 cursor-pointer",
            activeSectionIdx > 0 ? "flex-1" : "w-full"
          )}
        >
          <span>
            {activeSectionIdx === quizData.length - 1
              ? "Finish Assessment"
              : "Next Section"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuizView;
