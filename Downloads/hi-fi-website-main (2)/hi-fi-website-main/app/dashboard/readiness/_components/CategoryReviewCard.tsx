"use client";

import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  Zap,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryReviewCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  score: number;
  status: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  whyThisScore: string;
  additions: string[];
  recommendation: string;
  colorTheme?: "emerald" | "amber" | "blue" | "purple";
}

export const CategoryReviewCard: React.FC<CategoryReviewCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  score,
  status,
  description,
  strengths,
  weaknesses,
  whyThisScore,
  additions,
  recommendation,
  colorTheme = "emerald",
}) => {
  const isStrong = score >= 80;

  return (
    <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/10 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center border",
            colorTheme === "emerald" ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
            colorTheme === "amber" ? "bg-amber-50 border-amber-100 text-amber-600" :
            colorTheme === "purple" ? "bg-purple-50 border-purple-100 text-purple-500" :
            "bg-blue-50 border-blue-100 text-[#066EFF]"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[16px] font-semibold text-slate-900 font-poppins">{title}</h3>
            <p className="text-[12px] text-slate-400 font-normal font-poppins">{subtitle}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={cn(
            "text-[18px] font-semibold font-poppins",
            isStrong ? "text-emerald-500" : "text-amber-500"
          )}>{score}%</div>
          <div className={cn(
            "text-[11px] font-semibold uppercase tracking-wider font-poppins",
            isStrong ? "text-emerald-500" : "text-amber-500"
          )}>{status}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13.5px] text-slate-500 leading-relaxed max-w-4xl font-poppins">
        {description}
      </p>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50/30 rounded-[20px] p-4 border border-emerald-100/30 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-[10px] uppercase tracking-widest font-poppins">
            <CheckCircle2 className="w-3 h-3" />
            Strengths
          </div>
          <ul className="space-y-1.5">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-emerald-700/80 font-poppins">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rose-50/30 rounded-[20px] p-4 border border-rose-100/30 space-y-2.5">
          <div className="flex items-center gap-2 text-rose-500 font-semibold text-[10px] uppercase tracking-widest font-poppins">
            <AlertCircle className="w-3 h-3" />
            Weaknesses
          </div>
          <ul className="space-y-1.5">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-rose-700/80 font-poppins">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why This Score */}
      <div className="bg-amber-50/40 rounded-[14px] p-3.5 border border-amber-100/50 flex items-start gap-2.5">
        <div className="w-5 h-5 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest font-poppins">Why this score</span>
          <p className="text-[12.5px] text-amber-700 font-medium font-poppins">
            {whyThisScore}
          </p>
        </div>
      </div>

      {/* What to Add */}
      <div className="space-y-3.5">
        <h4 className="text-[13px] font-semibold text-slate-800 font-poppins">What you should add to your CV</h4>
        <div className="space-y-2">
          {additions.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-[#F0F7FF] rounded-lg border border-blue-100/50">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-[#066EFF] flex items-center justify-center text-[10px] font-bold shrink-0 font-poppins">
                {i + 1}
              </div>
              <span className="text-[13px] text-slate-600 font-medium font-poppins">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Recommendation */}
      <div className="bg-blue-50/50 rounded-xl p-3.5 border border-blue-100/50 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
          <Zap className="w-3.5 h-3.5 text-[#066EFF]" />
        </div>
        <div className="space-y-0.5">
          <span className="text-[9px] font-semibold text-[#066EFF] uppercase tracking-widest font-poppins">Recommendation</span>
          <p className="text-[12px] text-[#066EFF] font-semibold font-poppins">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};
