import React from "react";
import { cn } from "@/lib/utils";
import { AssessmentCategory } from "../quizData";
import { Check } from "lucide-react";

interface SectionTabsProps {
  sections: AssessmentCategory[];
  activeSectionId: string;
  onTabClick?: (index: number) => void;
  answers?: Record<string, string>;
}

export const SectionTabs = ({ sections, activeSectionId, onTabClick, answers = {} }: SectionTabsProps) => {
  const activeColors: Record<string, string> = {
    blue: "border-blue-500 ring-blue-500/10 text-[#066EFF]",
    purple: "border-[#A855F7] ring-purple-500/10 text-[#A855F7]",
    emerald: "border-emerald-500 ring-emerald-500/10 text-emerald-500",
    orange: "border-orange-500 ring-orange-500/10 text-orange-500",
  };

  const activeBgs: Record<string, string> = {
    blue: "bg-[#066EFF]",
    purple: "bg-[#A855F7]",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
  };

  const isSectionComplete = (section: AssessmentCategory) => {
    if (!section.questions || section.questions.length === 0) return false;
    return section.questions.every((q) => answers[q.id] !== undefined);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-2.5 mb-6">
      {sections.map((section, idx) => {
        const isActive = section.id === activeSectionId;
        const isComplete = isSectionComplete(section);
        const color = section.color || "blue";
        return (
          <button
            key={section.id}
            onClick={() => onTabClick?.(idx)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2.5 rounded-[14px] border transition-all cursor-pointer text-left select-none",
              isActive
                ? cn("bg-white shadow-sm ring-1", activeColors[color])
                : isComplete
                  ? "bg-emerald-50/50 border-emerald-100 opacity-90 hover:opacity-100"
                  : "bg-white/50 border-slate-100 opacity-60 hover:opacity-100"
            )}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-300",
                isActive 
                  ? "text-white " + activeBgs[color] 
                  : isComplete 
                    ? "bg-emerald-500 text-white" 
                    : "bg-slate-200 text-slate-500"
              )}
            >
              {isComplete ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            <span
              className={cn(
                "text-[12px] font-semibold font-poppins truncate flex-1 transition-colors",
                isActive 
                  ? activeColors[color].split(' ').pop() 
                  : isComplete 
                    ? "text-emerald-700 font-medium" 
                    : "text-slate-400 font-medium"
              )}
            >
              {section.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
