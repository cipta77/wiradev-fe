"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Section } from "../quizData";

interface SectionTabsProps {
  sections: Section[];
  activeSectionId: string;
  onTabClick?: (index: number) => void;
}

export const SectionTabs = ({ sections, activeSectionId, onTabClick }: SectionTabsProps) => {
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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {sections.map((section, idx) => {
        const isActive = section.id === activeSectionId;
        return (
          <button
            key={section.id}
            onClick={() => onTabClick?.(idx)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-[16px] border transition-all cursor-pointer text-left",
              isActive
                ? cn("bg-white shadow-sm ring-1", activeColors[section.color])
                : "bg-white/50 border-slate-100 opacity-60 hover:opacity-100"
            )}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center text-[13px] font-semibold text-white shrink-0 transition-colors",
                isActive ? activeBgs[section.color] : "bg-slate-300"
              )}
            >
              {idx + 1}
            </div>
            <span
              className={cn(
                "text-[13px] font-semibold font-poppins truncate transition-colors",
                isActive ? activeColors[section.color].split(' ').pop() : "text-slate-400"
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
