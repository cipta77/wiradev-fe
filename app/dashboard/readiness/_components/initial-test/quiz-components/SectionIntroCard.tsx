"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Section } from "../quizData";

interface SectionIntroCardProps {
  section: Section;
}

export const SectionIntroCard = ({ section }: SectionIntroCardProps) => {
  const Icon = section.icon;
  
  const colors: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50",
    purple: "text-purple-500 bg-purple-50",
    emerald: "text-emerald-500 bg-emerald-50",
    orange: "text-orange-500 bg-orange-50",
  };

  const borderColors: Record<string, string> = {
    blue: "border-t-blue-500",
    purple: "border-t-[#A855F7]",
    emerald: "border-t-emerald-500",
    orange: "border-t-orange-500",
  };

  const tagColors: Record<string, string> = {
    blue: "bg-blue-50/50 text-blue-500 border-blue-100/50",
    purple: "bg-purple-50/50 text-purple-500 border-purple-100/50",
    emerald: "bg-emerald-50/50 text-emerald-500 border-emerald-100/50",
    orange: "bg-orange-50/50 text-orange-500 border-orange-100/50",
  };

  return (
    <div className={cn(
      "bg-white rounded-[20px] border border-slate-100 p-5 mb-6 flex items-center justify-between border-t-4 shadow-sm shadow-slate-100/50",
      borderColors[section.color] || "border-t-blue-500"
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
          colors[section.color] || "bg-blue-50 text-blue-500"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 font-poppins">
            {section.name}
          </h3>
          <p className="text-[12px] text-slate-400 font-medium font-poppins mt-0.5">
            {section.description}
          </p>
        </div>
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-[11px] font-semibold font-poppins border",
        tagColors[section.color]
      )}>
        {section.tasks.length} tasks
      </div>
    </div>
  );
};
