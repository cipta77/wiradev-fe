import React from "react";
import { ClipboardList } from "lucide-react";

interface NoAssessmentStateProps {
  onAction: () => void;
}

export function NoAssessmentState({ onAction }: NoAssessmentStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white border border-slate-100 rounded-[20px] shadow-sm text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-5 bg-[#066EFF]/10 text-[#066EFF] rounded-2xl animate-pulse">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2 font-poppins">
        No Assessment Data Yet
      </h3>
      <p className="max-w-md text-slate-500 mb-6 text-sm leading-relaxed">
        Complete the Initial Skill Assessment to analyze your strengths, pinpoint critical gaps, and match with current market job demands.
      </p>
      <button
        onClick={onAction}
        className="px-6 py-3 bg-[#066EFF] hover:bg-[#055bca] active:scale-95 transition-all text-white font-medium rounded-xl text-sm shadow-sm shadow-[#066EFF]/20"
      >
        Take Initial Assessment
      </button>
    </div>
  );
}
