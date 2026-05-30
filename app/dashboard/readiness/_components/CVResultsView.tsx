"use client";

import React from "react";
import {
  Download,
  RefreshCcw,
  ArrowLeft,
  Award,
  Zap,
  Briefcase,
  GraduationCap,
  FileText,
  ShieldCheck,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CvScreeningResult } from "@/lib/api";

interface CVResultsViewProps {
  onBack: () => void;
  onViewSkillMap?: () => void;
  onViewSkillGap?: () => void;
  onExport?: () => void;
  result: CvScreeningResult;
}

export const CVResultsView: React.FC<CVResultsViewProps> = ({
  onBack,
  onViewSkillMap,
  onViewSkillGap,
  onExport,
  result,
}) => {
  const categoryScores = [
    { id: "contact", label: "Contact & Header", score: result.contact_score ?? 0, icon: FileText, color: "emerald" },
    { id: "summary", label: "Professional Summary", score: result.summary_score ?? 0, icon: Sparkles, color: "amber" },
    { id: "skills", label: "Technical Skills", score: result.skills_score ?? 0, icon: Zap, color: "emerald" },
    { id: "experience", label: "Work Experience", score: result.experience_score ?? 0, icon: Briefcase, color: "amber" },
    { id: "projects", label: "Projects", score: result.projects_score ?? 0, icon: Target, color: "amber" },
    { id: "education", label: "Education", score: result.education_score ?? 0, icon: GraduationCap, color: "emerald" },
    { id: "ats", label: "ATS Compatibility", score: result.ats_score ?? 0, icon: ShieldCheck, color: "amber" },
  ];

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-emerald-500" };
    if (score >= 60) return { label: "Good", color: "text-[#066EFF]" };
    return { label: "Needs Improvement", color: "text-amber-500" };
  };

  const status = getScoreStatus(result.overall_score);

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 font-poppins text-slate-900">
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium text-[13px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-slate-200">|</span>
          <span className="text-[13px] font-semibold text-slate-600 truncate max-w-[240px]">
            {result.file_name}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {onExport && (
            <button 
              onClick={onExport}
              className="px-3.5 py-1.5 text-[12px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          )}
          <button 
            onClick={onBack}
            className="px-4 py-1.5 text-[12px] font-semibold text-white bg-[#066EFF] rounded-xl hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Re-upload CV
          </button>
        </div>
      </div>

      {/* Hero Assessment Card */}
      <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/20 mb-6 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#066EFF] rounded-full text-[11px] font-semibold border border-blue-100">
            CV Screening Review
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
              <Award className="w-5 h-5 text-[#066EFF]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-[20px] md:text-[22px] font-semibold text-slate-900 tracking-tight font-poppins">
                Overall CV Assessment
              </h1>
              <p className="text-[13.5px] text-slate-500 leading-relaxed font-normal font-poppins">
                {result.ai_summary}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364}
                strokeDashoffset={364 * (1 - result.overall_score / 100)}
                strokeLinecap="round"
                className="text-[#066EFF] transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[32px] font-semibold text-slate-900 leading-none font-poppins">{result.overall_score}</span>
              <span className="text-[12px] font-medium text-slate-400 mt-0.5 font-poppins">/100</span>
            </div>
          </div>
          <span className={cn("text-[16px] font-semibold font-poppins", status.color)}>{status.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Keywords Grid */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm shadow-slate-200/10 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800 mb-3 font-poppins flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Keywords Found
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {result.keywords_found && result.keywords_found.length > 0 ? (
                  result.keywords_found.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-medium rounded-lg border border-emerald-100/50 font-poppins">
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-slate-400 font-poppins">No keywords identified.</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-[14px] font-semibold text-slate-800 mb-3 font-poppins flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Missing Industry Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {result.keywords_missing && result.keywords_missing.length > 0 ? (
                  result.keywords_missing.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-rose-50 text-rose-500 text-[11px] font-medium rounded-lg border border-rose-100/50 font-poppins">
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-[12px] text-slate-400 font-poppins">All critical skills detected!</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Category Scores */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm shadow-slate-200/10 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-semibold text-slate-800 font-poppins">Section Breakdown</h3>
              <span className="text-[11px] text-slate-400 font-medium italic font-poppins">ATS Scoring Breakdown</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {categoryScores.map((cat, idx) => (
                <div key={idx} className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-100/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border",
                        cat.color === "emerald" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-purple-50 text-purple-500 border-purple-100"
                      )}>
                        <cat.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13px] font-semibold text-slate-700 font-poppins">{cat.label}</span>
                    </div>
                    <span className={cn(
                      "text-[13px] font-semibold font-poppins",
                      cat.score >= 80 ? "text-emerald-500" : cat.score >= 50 ? "text-amber-500" : "text-rose-500"
                    )}>{cat.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        cat.score >= 80 ? "bg-emerald-500" : cat.score >= 50 ? "bg-amber-500" : "bg-rose-500"
                      )}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Next Steps Section */}
      <div className="mt-8 bg-white rounded-[24px] p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-[16px] font-semibold text-slate-800 font-poppins">Actionable Next Steps</h3>
          </div>
          <p className="text-[12px] text-slate-400 font-normal font-poppins">
            Apply these modifications to increase your resume screening match and overall competitiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {result.recommendations && result.recommendations.length > 0 ? (
            result.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-slate-50/50 rounded-xl p-4 border border-slate-100/50 flex gap-4 group hover:border-blue-200 hover:bg-blue-50/10 transition-all">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#066EFF] flex items-center justify-center text-[11px] font-bold shrink-0 font-poppins">
                  {idx + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="text-[13.5px] font-semibold text-slate-800 font-poppins leading-tight">{rec}</h4>
                  <p className="text-[11.5px] text-slate-500 leading-normal font-poppins">
                    Target improvement recommendation for technical role alignment.
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-4 text-slate-400 font-poppins text-[13px]">
              No recommendations generated. Excellent work!
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-400 font-medium font-poppins italic">Or jump straight to your skill data</p>
          <div className="flex items-center gap-3">
            <button 
              onClick={onViewSkillMap}
              className="px-5 py-2 text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-poppins cursor-pointer"
            >
              View Skill Map
            </button>
            <button 
              onClick={onViewSkillGap}
              className="px-5 py-2 text-[13px] font-semibold text-white bg-[#066EFF] rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 font-poppins cursor-pointer"
            >
              View Skill Gap
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
