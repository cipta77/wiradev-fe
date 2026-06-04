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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Strengths Section */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm shadow-slate-200/10 h-full">
          <h3 className="text-[16px] font-semibold text-slate-800 font-poppins mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            Kelebihan (Strengths)
          </h3>
          <div className="space-y-3">
            {result.strengths && result.strengths.length > 0 ? (
              result.strengths.map((strength, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/50">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">✓</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium font-poppins leading-relaxed">{strength}</p>
                </div>
              ))
            ) : (
              <p className="text-[13px] text-slate-400 font-poppins">Belum ada kelebihan yang terdeteksi.</p>
            )}
          </div>
        </div>

        {/* Weaknesses Section */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm shadow-slate-200/10 h-full">
          <h3 className="text-[16px] font-semibold text-slate-800 font-poppins mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            Kekurangan (Weaknesses)
          </h3>
          <div className="space-y-3">
            {result.weaknesses && result.weaknesses.length > 0 ? (
              result.weaknesses.map((weakness, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-amber-50/30 p-3 rounded-xl border border-amber-100/50">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold">!</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium font-poppins leading-relaxed">{weakness}</p>
                </div>
              ))
            ) : (
              <p className="text-[13px] text-slate-400 font-poppins">Semua aspek sudah sangat baik!</p>
            )}
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
