"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Award, Clock, ArrowRight, CheckCircle2, XCircle, Zap, ShieldAlert, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentSubmitResult {
  assessment_id: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
}

interface ResultViewProps {
  answers: Record<string, string>;
  timeTaken: number;
  onTabChange?: (tab: string) => void;
  responseResult?: AssessmentSubmitResult; // dynamic submit payload result
}

const ResultView: React.FC<ResultViewProps> = ({ answers, timeTaken, onTabChange, responseResult }) => {
  const router = useRouter();
  
  // Real scores computed from database response metadata
  const scorePercentage = responseResult ? Math.round(Number(responseResult.score_percentage)) : 0;
  const correctCount = responseResult ? Number(responseResult.correct_answers) : 0;
  const totalTasks = responseResult ? Number(responseResult.total_questions) : Object.keys(answers).length;
  const completedCount = Object.keys(answers).length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 100;

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const feedbacks: Record<string, { summary: string; strengths: string[]; weaknesses: string[]; recommendation: string }> = {
    high: {
      summary: "Excellent fundamental grasp across core competencies! Your knowledge aligns extremely well with target role expectations.",
      strengths: ["Strong problem solving accuracy", "Comprehensive framework awareness"],
      weaknesses: ["Edge-case documentation strategy", "Minor runtime environment performance quirks"],
      recommendation: "Dive into complex design patterns and architecture docs in our Development Hub."
    },
    medium: {
      summary: "Decent understanding, but core structures and system designs need minor refinements.",
      strengths: ["Good language capabilities", "Consistent software design workflow"],
      weaknesses: ["API response standardization", "Stateless auth flow edge cases"],
      recommendation: "Build the REST API mini project in our Development Hub to resolve these core skill gaps."
    },
    low: {
      summary: "Foundational concepts across design, logic, and standard patterns require structured learning.",
      strengths: ["Basic structural awareness", "Genuine drive for technical learning"],
      weaknesses: ["Algorithmic efficiency limits", "Practical syntax and debug strategies"],
      recommendation: "Take the foundational courses inside Development Hub to align with entry-level job demands."
    }
  };

  const feedbackKey = scorePercentage >= 75 ? "high" : scorePercentage >= 45 ? "medium" : "low";
  const activeFeedback = feedbacks[feedbackKey];

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
          {/* Circular Progress Area */}
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
                  strokeDashoffset={339.3 - (scorePercentage / 100) * 339.3}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[30px] font-semibold text-slate-800 font-poppins leading-none">
                  {scorePercentage}%
                </span>
              </div>
            </div>
            <h3 className="text-[16px] font-semibold text-slate-900 font-poppins mb-0.5">
              {scorePercentage >= 75 ? "Excellent Work!" : scorePercentage >= 45 ? "Keep Practicing!" : "Focus & Improve!"}
            </h3>
            <p className="text-slate-400 text-[12px] font-medium font-poppins text-center">
              {correctCount}/{totalTasks} correct answers · {completedCount}/{totalTasks} tasks submitted
            </p>
          </div>

          {/* Core Stats Cards - Side by Side */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-[#F8FAFC] p-6 rounded-[18px] border border-slate-50 flex flex-col items-center text-center">
              <span className="text-[26px] font-semibold text-slate-800 font-poppins">{scorePercentage}%</span>
              <span className="text-slate-400 text-[11px] font-semibold font-poppins mt-0.5">Assessment Score</span>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-[18px] border border-slate-50 flex flex-col items-center text-center">
              <span className="text-[26px] font-semibold text-slate-800 font-poppins">{taskCompletionRate}%</span>
              <span className="text-slate-400 text-[11px] font-semibold font-poppins mt-0.5">Task Completion</span>
            </div>
          </div>

          {/* Detailed Review Section */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-semibold text-slate-900 font-poppins mb-3">Assessment Evaluation Breakdown</h4>
            
            <div className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-xs">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-[14px] font-semibold text-slate-800 font-poppins">Feedback &amp; Overview</h5>
                    <p className="text-[11px] text-slate-400 font-medium font-poppins">Tailored assessment performance feedback</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-[14px] font-semibold font-poppins leading-none",
                    scorePercentage >= 75 ? "text-emerald-600" : scorePercentage >= 45 ? "text-amber-500" : "text-red-500"
                  )}>{scorePercentage}%</span>
                  <p className="text-[9px] font-bold text-slate-400 font-poppins uppercase mt-1">
                    {scorePercentage >= 75 ? "Ready" : scorePercentage >= 45 ? "Developing" : "Needs Focus"}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <p className="text-[12px] text-slate-600 font-medium font-poppins leading-relaxed">
                  {activeFeedback.summary}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-[18px] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-600 font-poppins uppercase">Strengths</span>
                    </div>
                    <ul className="space-y-1.5">
                      {activeFeedback.strengths.map((s, i) => (
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
                      {activeFeedback.weaknesses.map((w, i) => (
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
                      {activeFeedback.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

