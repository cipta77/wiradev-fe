"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { AssessmentCategory } from "./quizData";
import { QuizHeader } from "./quiz-components/QuizHeader";
import { SectionTabs } from "./quiz-components/SectionTabs";
import { SectionIntroCard } from "./quiz-components/SectionIntroCard";
import { TaskCard } from "./quiz-components/TaskCard";
import { MultipleChoiceTask } from "./quiz-components/MultipleChoiceTask";
import { YesNoTask } from "./quiz-components/YesNoTask";
import { useAssessment } from "@/hooks/useAssessment";
import { cn } from "@/lib/utils";

interface AssessmentSubmitResult {
  assessment_id: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
}

interface QuizViewProps {
  onComplete: (answers: Record<string, string>, time: number, responseResult?: AssessmentSubmitResult) => void;
  onBack?: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onComplete, onBack }) => {
  const { getQuestions, submitAssessment, loading } = useAssessment();
  const [categories, setCategories] = useState<AssessmentCategory[]>([]);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const [fetching, setFetching] = useState(true);

interface GetQuestionsResponse {
  success: boolean;
  result?: AssessmentCategory[];
}

// Inside the QuizView component
  useEffect(() => {
    async function loadData() {
      const data = await getQuestions();
      // Handle standard and nested response wrapper without 'any' type assertions
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        const responseWrap = data as unknown as GetQuestionsResponse;
        setCategories(responseWrap?.result || []);
      }
      setFetching(false);
    }
    loadData();
  }, [getQuestions]);

  useEffect(() => {
    if (fetching) return;
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [fetching]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#066EFF] animate-spin mb-4" />
        <p className="text-[14px] text-slate-400 font-medium font-poppins">Loading assessment tasks...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center p-20 bg-white rounded-[24px] border border-slate-100 shadow-sm">
        <p className="text-[15px] text-slate-500 font-medium font-poppins mb-4">No assessments available for your current role profile.</p>
        <button onClick={onBack} className="bg-[#066EFF] text-white px-6 py-3 rounded-[12px] font-semibold text-[14px]">
          Go Back
        </button>
      </div>
    );
  }

  const currentSection = categories[activeSectionIdx];
  const totalTasks = categories.reduce((acc, s) => acc + (s.questions?.length || 0), 0);
  const completedCount = Object.keys(answers).length;

  const handleNextSection = async () => {
    if (activeSectionIdx < categories.length - 1) {
      setActiveSectionIdx((p) => p + 1);
      const scrollEl = document.getElementById("readiness-scroll");
      if (scrollEl) {
        scrollEl.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Process submission
      const formattedAnswers = Object.entries(answers).map(([qid, val]) => ({
        question_id: qid,
        user_answer: val,
      }));

      try {
        const responseData = await submitAssessment(formattedAnswers, elapsed);
        const result = responseData?.result || responseData;
        onComplete(answers, elapsed, result);
      } catch (err) {
        console.error("Submission failed:", err);
      }
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIdx > 0) {
      setActiveSectionIdx((p) => p - 1);
      const scrollEl = document.getElementById("readiness-scroll");
      if (scrollEl) {
        scrollEl.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (onBack) {
      onBack();
    }
  };

  const handleOptionSelect = (taskId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [taskId]: optionId }));
  };

  const progressPercentage = ((activeSectionIdx + 1) / categories.length) * 100;
  const activeColor = currentSection.color || "blue";
  
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
        activeColor={activeColor}
      />

      <SectionTabs 
        sections={categories} 
        activeSectionId={currentSection.id} 
        onTabClick={(idx) => setActiveSectionIdx(idx)}
        answers={answers}
      />

      <div className="w-full h-[2px] md:h-[3.5px] bg-slate-100 rounded-full mb-3 overflow-hidden">
        <div
          className={cn("h-full transition-all duration-700 ease-in-out", barColors[activeColor])}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-5 px-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-poppins">
          Section {activeSectionIdx + 1} of {categories.length}
        </span>
        <span className="text-[11px] font-bold text-[#066EFF] uppercase tracking-wider font-poppins bg-[#066EFF]/10 px-2.5 py-1 rounded-full">
          {currentSection.questions?.filter(q => answers[q.id] !== undefined).length || 0} / {currentSection.questions?.length || 0} Questions Answered
        </span>
      </div>

      <SectionIntroCard section={currentSection} />

      <div className="flex flex-col gap-2.5">
        {(currentSection.questions || []).map((task, idx) => (
          <TaskCard 
            key={task.id} 
            index={idx + 1} 
            type={task.question_type === "multiple_choice" ? "Multiple Choice" : "Yes / No"} 
            activeColor={activeColor}
          >
            {task.question_type === "multiple_choice" && (
              <MultipleChoiceTask 
                question={task.question_text} 
                options={task.options || []} 
                selectedOption={answers[task.id]} 
                onSelect={(optId) => handleOptionSelect(task.id, optId)}
                activeColor={activeColor}
              />
            )}
            {task.question_type === "yes_no" && (
              <YesNoTask 
                question={task.question_text} 
                selectedOption={answers[task.id]} 
                onSelect={(optId) => handleOptionSelect(task.id, optId)}
                activeColor={activeColor}
              />
            )}
          </TaskCard>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        {activeSectionIdx > 0 && (
          <button
            onClick={handlePrevSection}
            disabled={loading}
            className="flex-1 bg-[#F8FAFC] text-slate-400 py-3 rounded-[16px] font-semibold text-[14px] flex items-center justify-center gap-2 border border-slate-100 hover:bg-slate-50 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-55"
          >
            Previous Section
          </button>
        )}
        <button
          onClick={handleNextSection}
          disabled={loading}
          className={cn(
            "bg-[#066EFF] text-white py-3 rounded-[16px] font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#0052cc] transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20 cursor-pointer disabled:opacity-55",
            activeSectionIdx > 0 ? "flex-1" : "w-full"
          )}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <>
              <span>
                {activeSectionIdx === categories.length - 1
                  ? "Finish Assessment"
                  : "Next Section"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizView;
