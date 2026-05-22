"use client";

import { FileText, BookOpen, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const analysisItems = [
  {
    icon: FileText,
    title: "CV Analysis",
    status: "Uploaded & Analyzed",
    statusColor: "text-[#10B981]",
    description:
      "12 skills extracted, 3 experience entries detected. Your CV shows strong frontend focus but lacks backend and DevOps keywords.",
    action: "Deep CV Screening",
    iconColor: "bg-[#F0F7FF] text-[#066EFF]",
  },
  {
    icon: BookOpen,
    title: "Academic Transcript",
    status: "Uploaded & Analyzed",
    statusColor: "text-[#10B981]",
    description:
      "GPA 3.45/4.00 detected. Strong academic performance in Data Structures and Algorithms. Software Engineering coursework identified.",
    action: "Re-upload Transcript",
    iconColor: "bg-[#FFF9F0] text-[#F59E0B]",
  },
];

interface AnalysisCardsProps {
  onTabChange?: (tab: string) => void;
}

export const AnalysisCards = ({ onTabChange }: AnalysisCardsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-6">
      {analysisItems.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 md:p-5 rounded-[16px] flex flex-col gap-3 h-full transition-all duration-300 shadow-sm shadow-slate-200/10"
          style={{ border: "1.2px solid #F1F5F9" }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 md:gap-3.5">
              <div
                className={cn(
                  "w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0",
                  card.iconColor,
                )}
              >
                <card.icon className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </div>
              <div className="space-y-0.5 pt-0.5">
                <h3 className="text-[13px] md:text-[14px] font-semibold text-slate-800 font-poppins">
                  {card.title}
                </h3>
                <p className={cn("text-[11px] md:text-[12px] font-medium", card.statusColor)}>
                  {card.status}
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] md:text-[12px] text-slate-500 leading-relaxed font-medium">
            {card.description}
          </p>

          <button 
            onClick={() => {
              if (card.action === "Deep CV Screening" && onTabChange) {
                onTabChange("cv-screening");
              }
            }}
            className="flex items-center gap-2 text-[#066EFF] font-semibold text-[12px] md:text-[13px] w-fit transition-all pt-0.5 cursor-pointer hover:underline"
          >
            <Upload className="w-3 h-3" />
            {card.action}
          </button>
        </div>
      ))}
    </div>
  );
};
