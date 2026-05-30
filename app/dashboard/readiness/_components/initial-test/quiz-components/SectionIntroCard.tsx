"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AssessmentCategory } from "../quizData";
import * as Icons from "lucide-react";

interface SectionIntroCardProps {
  section: AssessmentCategory;
}

export const SectionIntroCard = ({ section }: SectionIntroCardProps) => {
  // Safe dynamic lucide icon mapping with type safety, avoiding any
  const iconKey = section.icon as keyof typeof Icons;
  const IconComponent = (Icons[iconKey] as Icons.LucideIcon) || Icons.BookOpen;
  const color = section.color || "blue";
  
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
      borderColors[color] || "border-t-blue-500"
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
          colors[color] || "bg-blue-50 text-blue-500"
        )}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 font-poppins">
            {section.name}
          </h3>
          <p className="text-[12px] text-slate-400 font-medium font-poppins mt-0.5 animate-pulse">
            {section.description}
          </p>
        </div>
      </div>
      <div className={cn(
        "px-3 py-1 rounded-full text-[11px] font-semibold font-poppins border",
        tagColors[color]
      )}>
        {section.questions?.length || 0} tasks
      </div>
    </div>
  );
};
