"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Option } from "../quizData";

interface MultipleChoiceTaskProps {
  question: string;
  options: Option[];
  selectedOption?: string;
  onSelect: (optionId: string) => void;
  activeColor?: string;
}

export const MultipleChoiceTask = ({ 
  question, 
  options, 
  selectedOption, 
  onSelect,
  activeColor = "blue"
}: MultipleChoiceTaskProps) => {
  const borderColors: Record<string, string> = {
    blue: "border-blue-500",
    purple: "border-purple-500",
    emerald: "border-emerald-500",
    orange: "border-orange-500",
  };

  const dotColors: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-[14px] font-medium text-slate-800 mb-4 leading-relaxed font-poppins">
        {question}
      </h2>

      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full p-3 rounded-[12px] text-left border-2 transition-all flex items-center gap-3 cursor-pointer group",
                isSelected
                  ? cn("bg-white", borderColors[activeColor])
                  : "border-slate-50 bg-[#F8FAFC]/30 hover:border-slate-100"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[12px] font-semibold transition-colors",
                  isSelected
                    ? cn("text-white", dotColors[activeColor])
                    : "bg-white text-slate-400 border border-slate-100 group-hover:bg-slate-50"
                )}
              >
                {option.id}
              </div>
              <span
                className={cn(
                  "text-[14px] font-poppins font-medium",
                  isSelected ? "text-slate-900" : "text-slate-600"
                )}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
