"use client";

import React from "react";
import { 
  ChevronLeft, 
  Code2, 
  ShieldAlert, 
  Zap, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  title: string;
  status: "Good" | "Needs Work" | "Critical";
  score: number;
  description: string;
  suggestions: string[];
  icon: any;
}

const ReviewSectionCard = ({ title, status, score, description, suggestions, icon: Icon }: ReviewSectionProps) => {
  const statusColors = {
    "Good": "text-emerald-500 bg-emerald-50 border-emerald-100",
    "Needs Work": "text-orange-500 bg-orange-50 border-orange-100",
    "Critical": "text-rose-500 bg-rose-50 border-rose-100"
  };

  const progressColors = {
    "Good": "bg-emerald-500",
    "Needs Work": "bg-orange-500",
    "Critical": "bg-rose-500"
  };

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 md:p-8 space-y-6 shadow-sm shadow-slate-200/5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", statusColors[status].split(' ').slice(1).join(' '))}>
            <Icon className={cn("w-5 h-5", statusColors[status].split(' ')[0])} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[16px] font-bold text-slate-800">{title}</h3>
            <span className={cn("text-[12px] font-bold", statusColors[status].split(' ')[0])}>{status}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 min-w-[120px] md:min-w-[180px]">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full transition-all duration-1000", progressColors[status])} style={{ width: `${score}%` }} />
          </div>
          <span className={cn("text-[13px] font-bold", statusColors[status].split(' ')[0])}>{score}%</span>
        </div>
      </div>

      <p className="text-[13px] text-slate-500 font-normal leading-relaxed">
        {description}
      </p>

      <div className="space-y-3">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Suggestions</h4>
        <div className="space-y-2">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-[12px] bg-slate-50/50 border border-slate-100/40 text-slate-600">
              <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="text-[12px] font-normal">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AICodeReviewFullDetail = ({ onBack }: { onBack: () => void }) => {
  const sections: ReviewSectionProps[] = [
    {
      title: "Code Quality",
      status: "Good",
      score: 72,
      icon: Code2,
      description: "Good variable naming conventions. Function complexity could be reduced in auth middleware — consider extracting validation logic into separate helper functions.",
      suggestions: [
        "Extract validation into helpers",
        "Reduce nested conditionals",
        "Use early returns for cleaner flow"
      ]
    },
    {
      title: "Best Practices",
      status: "Needs Work",
      score: 58,
      icon: Target,
      description: "Missing error handling in 3 API routes. Input validation is inconsistent — some endpoints validate input while others don't.",
      suggestions: [
        "Add try-catch to all async handlers",
        "Use validation middleware consistently",
        "Implement centralized error handling"
      ]
    },
    {
      title: "Security",
      status: "Critical",
      score: 45,
      icon: ShieldAlert,
      description: "Critical: SQL injection vulnerability detected in the search query. User input is directly concatenated into the SQL string.",
      suggestions: [
        "Use parameterized queries immediately",
        "Sanitize all user inputs",
        "Add rate limiting to endpoints"
      ]
    },
    {
      title: "Performance",
      status: "Needs Work",
      score: 68,
      icon: Zap,
      description: "N+1 query pattern detected in user list endpoint. Each user triggers a separate query for their tasks.",
      suggestions: [
        "Use eager loading / JOIN queries",
        "Implement query result caching",
        "Add pagination to list endpoints"
      ]
    },
    {
      title: "Documentation",
      status: "Critical",
      score: 40,
      icon: FileText,
      description: "Missing JSDoc comments on public functions. No API documentation for any endpoint. README lacks setup instructions.",
      suggestions: [
        "Add JSDoc to all exported functions",
        "Create Swagger/OpenAPI docs",
        "Write a comprehensive README"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-normal text-[13px] group transition-all">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[12px] font-semibold hover:bg-slate-50 transition-all"
        >
          Submit New Code
        </button>
      </div>

      <div className="space-y-2">
        <h1 className="text-[22px] font-bold text-[#0F172A]">AI Code Review Results</h1>
        <p className="text-slate-400 text-[14px] font-normal">Detailed analysis of your code submission</p>
      </div>

      {/* Overall Assessment */}
      <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm shadow-slate-200/5">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
            <circle
              cx="50" cy="50" r="42"
              stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray="263.9"
              strokeDashoffset={263.9 * (1 - 0.57)}
              strokeLinecap="round"
              className="text-orange-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-bold text-slate-800 leading-none">57</span>
            <span className="text-[10px] font-bold text-slate-400">/100</span>
          </div>
        </div>
        
        <div className="space-y-4 flex-1 text-center md:text-left">
          <h2 className="text-[18px] font-bold text-slate-800">Overall Assessment</h2>
          <p className="text-[13px] text-slate-500 font-normal leading-relaxed max-w-2xl">
            Your code shows decent quality but has critical security issues that need immediate attention. Focus on fixing the SQL injection vulnerability and adding proper error handling.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-[11px] font-bold border border-rose-100/50">2 Critical</span>
            <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-[11px] font-bold border border-orange-100/50">1 Warning</span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[11px] font-bold border border-emerald-100/50">2 Good</span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <ReviewSectionCard key={idx} {...section} />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-4 pt-6 pb-10">
        <button onClick={onBack} className="text-[13px] font-normal text-slate-400 hover:text-slate-600 transition-all">
          Back to Development Hub
        </button>
        <button onClick={onBack} className="flex items-center gap-2 bg-[#066EFF] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]">
          View Updated Skills
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
