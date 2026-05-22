"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Award, Clock, ArrowRight, CheckCircle2, XCircle, Zap, ShieldAlert, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { quizData } from "./quizData";

interface ResultViewProps {
  answers: Record<number, string>;
  timeTaken: number;
  onTabChange?: (tab: string) => void;
}

const ResultView: React.FC<ResultViewProps> = ({ answers, timeTaken, onTabChange }) => {
  const router = useRouter();
  const allTasks = quizData.flatMap(s => s.tasks);
  const mcTasks = allTasks.filter(t => t.type === "Multiple Choice");
  
  const correctCount = mcTasks.reduce((acc, task) => {
    return acc + (answers[task.id] ? 1 : 0);
  }, 0);

  const totalMCQs = mcTasks.length;
  const scorePercentage = totalMCQs > 0 ? Math.round((correctCount / totalMCQs) * 100) : 100;
  
  const totalTasks = allTasks.length;
  const completedCount = Object.keys(answers).length;
  const taskCompletionRate = Math.round((completedCount / totalTasks) * 100);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const getFeedback = (sectionId: string) => {
    const feedbacks: Record<string, { summary: string; strengths: string[]; weaknesses: string[]; recommendation: string }> = {
      "data-analysis": {
        summary: "Foundational data prep and SQL aggregation patterns need reinforcement before tackling production analytics work.",
        strengths: ["Solid grasp of grouping and aggregation", "Structured approach to data cleaning"],
        weaknesses: ["Missing data strategy needs depth", "Analytical framing for stakeholders is light"],
        recommendation: "Practice end-to-end EDA on a real dataset and document your reasoning."
      },
      "design-brief": {
        summary: "Layout and accessibility fundamentals need work before tackling complex design briefs.",
        strengths: ["Pattern selection for monitoring UIs", "Awareness of contrast standards"],
        weaknesses: ["Onboarding flow narrative is thin", "Accessibility coverage is uneven"],
        recommendation: "Study one shipped design system (e.g. Material, Apple HIG) and recreate three flows."
      },
      "problem-solving": {
        summary: "Algorithmic thinking and complexity analysis need foundational practice.",
        strengths: ["Recognizes hash-based optimizations", "Comfortable with BST search"],
        weaknesses: ["Trade-off reasoning under constraints", "Graph vs relational decision criteria"],
        recommendation: "Solve 3 medium algorithmic problems weekly and explain trade-offs aloud."
      },
      "web-dev": {
        summary: "Fundamentals across hooks, status codes, and security need a structured review.",
        strengths: ["Correct use of useEffect for side effects", "Identified parameterized queries for SQLi"],
        weaknesses: ["REST status code precision", "Defense-in-depth thinking"],
        recommendation: "Build the REST API mini project in Development Hub — it directly targets these gaps."
      }
    };
    return feedbacks[sectionId] || feedbacks["data-analysis"];
  };

  return (
    <div className="w-full max-w-[800px] mx-auto animate-in fade-in duration-500 pb-10">
      <div className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm shadow-slate-200/20">
        {/* Header Section */}
        <div className="bg-linear-to-br from-[#5D6AF2] to-[#066EFF] py-8 md:py-10 px-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/10">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-[22px] md:text-[26px] font-semibold text-white mb-1.5 font-poppins tracking-tight">
              Assessment Complete!
            </h2>
            <div className="flex items-center gap-2 text-white/80 text-[13px] font-medium font-poppins">
              <Clock className="w-4 h-4" />
              <span>Completed in {formatTime(timeTaken)}</span>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6">
          {/* Circular Progress Area - Centered Stack as per screenshot */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" className="stroke-slate-50 fill-none" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="stroke-red-500 fill-none transition-all duration-1000"
                  strokeWidth="10"
                  strokeDasharray="339.3"
                  strokeDashoffset={339.3 - (taskCompletionRate / 100) * 339.3}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[30px] font-semibold text-slate-800 font-poppins leading-none">
                  {taskCompletionRate}%
                </span>
              </div>
            </div>
            <h3 className="text-[16px] font-semibold text-slate-900 font-poppins mb-0.5">Keep Practicing!</h3>
            <p className="text-slate-400 text-[12px] font-medium font-poppins text-center">
              {correctCount}/{totalMCQs} MCQ correct · {completedCount}/{totalTasks} tasks completed
            </p>
          </div>

          {/* Core Stats Cards - Side by Side */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-[#F8FAFC] p-6 rounded-[18px] border border-slate-50 flex flex-col items-center text-center">
              <span className="text-[26px] font-semibold text-slate-800 font-poppins">{scorePercentage}%</span>
              <span className="text-slate-400 text-[11px] font-semibold font-poppins mt-0.5">MCQ Accuracy</span>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-[18px] border border-slate-50 flex flex-col items-center text-center">
              <span className="text-[26px] font-semibold text-slate-800 font-poppins">{taskCompletionRate}%</span>
              <span className="text-slate-400 text-[11px] font-semibold font-poppins mt-0.5">Task Completion</span>
            </div>
          </div>

          {/* Section Breakdown - 2x2 Grid */}
          <div className="space-y-4 mb-10">
            <h4 className="text-[13px] font-semibold text-slate-900 font-poppins mb-3">Section Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quizData.map((section) => {
                const sectionTasks = section.tasks;
                const sectionCompleted = sectionTasks.filter(t => answers[t.id]).length;
                const progress = (sectionCompleted / sectionTasks.length) * 100;
                const themeColors: Record<string, string> = {
                  blue: "bg-blue-500", purple: "bg-[#A855F7]", emerald: "bg-emerald-500", orange: "bg-orange-500",
                };

                return (
                  <div key={section.id} className="bg-[#F8FAFC]/60 px-5 py-4 rounded-[18px] border border-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full", themeColors[section.color])} />
                        <span className="text-[13px] font-semibold text-slate-700 font-poppins">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-slate-300" />
                        <span className="text-[12px] font-semibold text-red-500 font-poppins">{sectionCompleted}/{sectionTasks.length}</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full", themeColors[section.color])} style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Subtest Review */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold text-slate-900 font-poppins mb-3">Detailed Subtest Review</h4>
            {quizData.map((section) => {
              const feedback = getFeedback(section.id);
              const Icon = section.icon;
              const themeStyles: Record<string, string> = {
                blue: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600",
                emerald: "bg-emerald-50 text-emerald-600", orange: "bg-orange-50 text-orange-600",
              };

              return (
                <div key={section.id} className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-xs">
                  <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", themeStyles[section.color])}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="text-[14px] font-semibold text-slate-800 font-poppins">{section.name}</h5>
                        <p className="text-[11px] text-slate-400 font-medium font-poppins">{section.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-semibold text-red-500 font-poppins leading-none">0%</span>
                      <p className="text-[9px] font-bold text-red-400 font-poppins uppercase mt-1">Needs Focus</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    <p className="text-[12px] text-slate-600 font-medium font-poppins leading-relaxed">{feedback.summary}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-[18px] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] font-bold text-emerald-600 font-poppins uppercase">Strengths</span>
                        </div>
                        <ul className="space-y-1.5">
                          {feedback.strengths.map((s, i) => (
                            <li key={i} className="text-[11px] text-slate-600 font-medium font-poppins flex items-start gap-2">
                              <span className="text-emerald-400 mt-1">•</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50/40 border border-red-100/50 rounded-[18px] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                          <span className="text-[10px] font-bold text-red-600 font-poppins uppercase">Weaknesses</span>
                        </div>
                        <ul className="space-y-1.5">
                          {feedback.weaknesses.map((w, i) => (
                            <li key={i} className="text-[11px] text-slate-600 font-medium font-poppins flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>{w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-blue-50/40 border border-blue-100/50 rounded-[18px] p-5 flex gap-3">
                      <Target className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-blue-600 font-poppins uppercase tracking-wider">Recommendation</span>
                        <p className="text-[11px] text-slate-600 font-medium font-poppins leading-relaxed">
                          {feedback.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="mt-10 space-y-4">
            <div className="bg-[#F8FAFC] border border-slate-100 p-5 rounded-[20px] flex items-center gap-4">
              <Zap className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-[12px] text-slate-500 font-medium font-poppins leading-relaxed">
                Your assessment results have been factored into your readiness score. Weak areas are flagged in your Skill Map.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => onTabChange?.("skill-map")} 
                className="flex-1 bg-white text-slate-500 border border-slate-200 py-3.5 rounded-[14px] font-semibold text-[14px] transition-all hover:bg-slate-50 cursor-pointer"
              >
                View Skill Map
              </button>
              <button 
                onClick={() => router.push("/dashboard/dev-hub")}
                className="flex-1 bg-[#066EFF] text-white py-3.5 rounded-[14px] font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#0052cc] shadow-lg shadow-blue-500/20 cursor-pointer group transition-all"
              >
                Start Improving <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
