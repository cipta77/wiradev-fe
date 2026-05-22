"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Target,
  BarChart2,
  Star,
  Zap,
  ShieldCheck,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CVAnalysisView } from "./CVAnalysisView";
import { CVResultsView } from "./CVResultsView";

const analyzeItems = [
  {
    icon: Target,
    label: "Overall CV Score",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: BarChart2,
    label: "Section Breakdown",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Star,
    label: "Strengths & Weaknesses",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Zap,
    label: "Keyword Analysis",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheck,
    label: "ATS Compatibility",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: LineChart,
    label: "Role-Fit Score",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const previousUploadsData = [
  { name: "Alex_Rahman_CV_v3.pdf", date: "Apr 10, 2026", score: 72 },
  { name: "Alex_Rahman_CV_v2.pdf", date: "Mar 28, 2026", score: 64 },
];

export const CVScreening = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleUpload = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setIsAnalyzing(false);
  };

  if (isAnalyzing) {
    return <CVAnalysisView onComplete={handleAnalysisComplete} />;
  }

  if (showResults) {
    return (
      <CVResultsView 
        onBack={handleBack} 
        fileName="Alex_Rahman_CV_v3.pdf" 
        onViewSkillMap={() => onTabChange?.("skill-map")}
        onViewSkillGap={() => onTabChange?.("skill-gap")}
      />
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-700 pb-6 md:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        <div className="lg:col-span-8 space-y-5 md:space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-[24px] border-2 border-dashed border-[#E8ECF0] p-8 md:p-10 flex flex-col items-center text-center relative group transition-all hover:border-[#066EFF]/30 hover:bg-slate-50/30">
            <div className="w-14 h-14 bg-[#066EFF]/10 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:bg-[#066EFF]/15">
              <UploadCloud className="w-7 h-7 text-[#066EFF]" />
            </div>
            <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-800 font-poppins mb-1 tracking-tight">
              Drop your CV here or click to browse
            </h3>
            <p className="text-slate-400 text-[11px] md:text-[12px] font-medium font-poppins mb-6">
              PDF, DOC, DOCX — Max 10MB
            </p>
            <button
              onClick={handleUpload}
              className="bg-[#066EFF] text-white px-8 py-2.5 rounded-full font-semibold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:bg-[#0559d1] active:scale-[0.98] cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              Choose File
            </button>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
              onChange={handleUpload}
            />
          </div>

          {/* Previous Uploads */}
          <div className="bg-white rounded-[24px] border border-[#E8ECF0] p-5 md:p-6 shadow-sm shadow-slate-200/5">
            <h4 className="text-[13px] md:text-[14px] font-semibold text-slate-800 font-poppins mb-5">
              Previous Uploads
            </h4>
            <div className="space-y-3">
              {previousUploadsData.map((file, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8FAFC]/60 p-3 rounded-[20px] border border-slate-100 flex items-center justify-between gap-4 transition-all hover:bg-[#F8FAFC]"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
                      <FileText className="w-5 h-5 text-[#066EFF]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[13px] font-semibold text-slate-700 font-poppins truncate block tracking-tight">
                        {file.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[11px] text-slate-400 font-medium font-poppins">
                          {file.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6 shrink-0">
                    <span className="text-[13px] md:text-[14px] font-medium text-[#F59E0B] font-poppins">
                      {file.score}/100
                    </span>
                    <button className="text-[#066EFF] text-[12px] md:text-[13px] font-medium hover:underline cursor-pointer px-1 py-1 transition-all">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-5 md:space-y-6 flex flex-col">
          <div className="bg-white rounded-[24px] border border-[#E8ECF0] p-5 md:p-6 flex-1 shadow-sm shadow-slate-200/5">
            <div className="flex items-center gap-2 mb-6 px-1">
              <Sparkles className="w-4 h-4 text-[#066EFF]" />
              <h4 className="text-[13px] font-semibold text-slate-800 font-poppins">
                What we analyze
              </h4>
            </div>
            <div className="space-y-1.5">
              {analyzeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-[14px] bg-[#F8FAFC]/60 border border-slate-100/50 transition-all hover:bg-[#F8FAFC]"
                >
                  <div className="w-6.5 h-6.5 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-xs">
                    <item.icon className="w-3.5 h-3.5 text-[#066EFF]" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-600 font-poppins tracking-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-[#066EFF] to-[#0446A3] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-blue-600/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <h5 className="text-[15px] font-semibold mb-2 font-poppins flex items-center gap-2 text-white tracking-tight">
                Pro Tip
              </h5>
              <p className="text-white/90 text-[11px] md:text-[12px] font-medium font-poppins leading-relaxed">
                Upload your latest CV to get the most accurate analysis. Apply
                our suggestions and re-upload for a better score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
