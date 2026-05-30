"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface YesNoTaskProps {
  question: string;
  selectedOption?: string; // 'yes' | 'no'
  onSelect: (optionId: string) => void;
  activeColor?: string;
}

export const YesNoTask = ({
  question,
  selectedOption,
  onSelect,
  activeColor = "blue",
}: YesNoTaskProps) => {
  const borderColors: Record<string, string> = {
    blue: "border-blue-500",
    purple: "border-purple-500",
    emerald: "border-emerald-500",
    orange: "border-orange-500",
  };

  const textColors: Record<string, string> = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    emerald: "text-emerald-600",
    orange: "text-orange-600",
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-[14px] font-medium text-slate-800 mb-5 leading-relaxed font-poppins">
        {question}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Yes Button */}
        <button
          type="button"
          onClick={() => onSelect("yes")}
          className={cn(
            "p-5 rounded-[16px] border-2 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group active:scale-[0.98]",
            selectedOption === "yes"
              ? "bg-emerald-50/40 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/5"
              : "border-slate-50 bg-[#F8FAFC]/30 hover:border-slate-100 text-slate-600"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              selectedOption === "yes"
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-400 border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-500"
            )}
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[14px] font-semibold font-poppins uppercase tracking-wider">Yes</span>
        </button>

        {/* No Button */}
        <button
          type="button"
          onClick={() => onSelect("no")}
          className={cn(
            "p-5 rounded-[16px] border-2 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group active:scale-[0.98]",
            selectedOption === "no"
              ? "bg-red-50/40 border-red-500 text-red-700 shadow-md shadow-red-500/5"
              : "border-slate-50 bg-[#F8FAFC]/30 hover:border-slate-100 text-slate-600"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              selectedOption === "no"
                ? "bg-red-500 text-white"
                : "bg-white text-slate-400 border border-slate-100 group-hover:bg-red-50 group-hover:text-red-500"
            )}
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[14px] font-semibold font-poppins uppercase tracking-wider">No</span>
        </button>
      </div>
    </div>
  );
};
