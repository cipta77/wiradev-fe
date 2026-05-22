"use client";

import React from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizHeaderProps {
  onBack: () => void;
  elapsedTime: string;
  progress: string;
  activeColor?: string;
}

export const QuizHeader = ({ onBack, elapsedTime, progress, activeColor = "blue" }: QuizHeaderProps) => {
  const pillColors: Record<string, string> = {
    blue: "bg-blue-50 text-[#066EFF] border-blue-100",
    purple: "bg-purple-50 text-purple-500 border-purple-100",
    emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-[14px] font-medium font-poppins">Back</span>
      </button>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white border border-slate-100 px-3.5 py-1.5 rounded-full shadow-sm shadow-slate-100/50">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-[13px] font-semibold font-poppins text-slate-700">{elapsedTime}</span>
        </div>
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[12px] font-semibold font-poppins border",
          pillColors[activeColor]
        )}>
          {progress} completed
        </div>
      </div>
    </div>
  );
};
