"use client";

import React from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Target, 
  Award,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Layers,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AICodeReviewResultProps {
  projectId?: string;
}

export const AICodeReviewResult = ({ projectId }: AICodeReviewResultProps) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Back Link */}
      <Link
        href="/dashboard/dev-hub"
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 font-normal text-[12px] group transition-all"
      >
        <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        Back to Development Hub
      </Link>

      {/* Result Header Card */}
      <div className="bg-white rounded-[20px] border border-[#F1F5F9] overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#066EFF]" />
        
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5 flex-1">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#066EFF]" />
            </div>
            <div className="space-y-1.5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-widest">
                Mini Project Review
              </span>
              <h1 className="text-[20px] font-bold text-[#0F172A] tracking-tight">REST API with Express</h1>
              <p className="text-slate-400 text-[13px] font-normal leading-relaxed max-w-2xl">
                Your API delivers the core CRUD flow and JWT auth correctly. Validation coverage and error responses are the main areas to tighten before this is production-ready.
              </p>
            </div>
          </div>

          {/* Score Ring */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="33" stroke="currentColor" strokeWidth="7" fill="transparent" className="text-slate-100" />
                <circle
                  cx="40" cy="40" r="33"
                  stroke="currentColor" strokeWidth="7" fill="transparent"
                  strokeDasharray="207.3"
                  strokeDashoffset={207.3 * (1 - 0.78)}
                  strokeLinecap="round"
                  className="text-[#066EFF]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[18px] font-bold text-slate-800 leading-none">78</span>
                <span className="text-[9px] font-bold text-slate-400">/100</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#066EFF] uppercase tracking-wide">Good</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-[18px] border border-[#F1F5F9] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-[12px] font-semibold text-slate-500">Completion</span>
          </div>
          <div className="space-y-3">
            <span className="text-[22px] font-bold text-slate-900">100%</span>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-[#F1F5F9] p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#066EFF]" />
            <span className="text-[12px] font-semibold text-slate-500">Objectives Met</span>
          </div>
          <div className="space-y-1">
            <span className="text-[22px] font-bold text-slate-900">2/4</span>
            <p className="text-[11px] text-slate-400 font-normal">Project goals achieved</p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] border border-[#F1F5F9] p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-[12px] font-semibold text-slate-500">Estimated Time</span>
          </div>
          <div className="space-y-1">
            <span className="text-[22px] font-bold text-slate-900">4 hours</span>
            <p className="text-[11px] text-slate-400 font-normal">For this scope</p>
          </div>
        </div>
      </div>

      {/* Project Objective */}
      <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-6 space-y-5">
        <div className="flex items-center gap-2.5">
          <Target className="w-4 h-4 text-[#066EFF]" />
          <h2 className="text-[14px] font-bold text-slate-800">Project Objective</h2>
        </div>
        <p className="text-slate-400 text-[12px] font-normal leading-relaxed max-w-4xl">
          Demonstrate ability to build production-ready backend APIs with proper authentication, validation, and error handling patterns.
        </p>
        <div className="space-y-2.5">
          {[
            { title: "Authentication implemented with JWT", status: "success" },
            { title: "Full CRUD endpoints for tasks", status: "success" },
            { title: "Input validation on every endpoint", status: "warning" },
            { title: "Centralized error handling middleware", status: "warning" },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-[14px] border",
                item.status === "success" 
                  ? "bg-emerald-50/40 border-emerald-100/60 text-emerald-700" 
                  : "bg-orange-50/40 border-orange-100/50 text-orange-600"
              )}
            >
              {item.status === "success" ? (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="text-[12px] font-normal">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Skills */}
      <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-slate-500" />
          <h2 className="text-[14px] font-bold text-slate-800">Related Skills Practiced</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Node.js", "Express.js", "JWT Auth", "REST API", "Validation", "Error Handling"].map(skill => (
            <span key={skill} className="px-3 py-1.5 rounded-full bg-blue-50 text-[#066EFF] text-[11px] font-normal border border-blue-100/50 tracking-tight">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-emerald-500" />
            <h3 className="text-[13px] font-bold text-slate-800">Strengths</h3>
          </div>
          <div className="space-y-2.5">
            {[
              "Clean folder structure separating routes, controllers, and middleware",
              "JWT signing and verification implemented correctly",
              "Database queries are parameterized — no injection risk",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-[12px] text-slate-500 font-normal leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <h3 className="text-[13px] font-bold text-slate-800">Improvement Notes</h3>
          </div>
          <div className="space-y-2.5">
            {[
              "Add Joi validation middleware to POST/PUT routes",
              "Wrap async handlers to forward errors to a central handler",
              "Return consistent error response shape across endpoints",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-[12px] text-slate-500 font-normal leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Action CTA */}
      <div className="bg-linear-to-r from-[#2563EB] to-[#4F46E5] rounded-[20px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Next Recommended Action</span>
            <h3 className="text-[16px] font-bold text-white">Strengthen API Validation</h3>
            <p className="text-[12px] text-blue-100 font-normal">Build a validation middleware layer in the next mini project to lock in this skill.</p>
          </div>
        </div>
        <Link href="/dashboard/dev-hub">
          <button className="shrink-0 flex items-center gap-2 bg-white text-[#2563EB] px-5 py-2.5 rounded-xl text-[12px] font-bold hover:bg-blue-50 transition-all whitespace-nowrap">
            Browse Related Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-4 pt-2 pb-4">
        <Link
          href="/dashboard/dev-hub"
          className="text-[12px] font-normal text-slate-400 hover:text-slate-600 transition-all"
        >
          Back to Development Hub
        </Link>
        <Link href="/dashboard/dev-hub">
          <button className="flex items-center gap-2 bg-[#066EFF] text-white px-6 py-2.5 rounded-xl text-[12px] font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]">
            View Updated Skills
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
};
