"use client";

import React from "react";
import { Award, CheckCircle2, Code2, FileText, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
  {
    icon: CheckCircle2,
    title: "First Project Completed",
    sub: "Built a REST API",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Code2,
    title: "Code Reviewed",
    sub: "Got AI feedback on 3 files",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: FileText,
    title: "CV Uploaded",
    sub: "Skills extracted from CV",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Medal,
    title: "GitHub Connected",
    sub: "12 repositories synced",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

export const RecentAchievementsCard = () => {
  return (
    <div
      className="bg-white rounded-[20px] p-4 md:p-6 h-full flex flex-col gap-4 transition-all shadow-sm shadow-indigo-500/5"
      style={{ border: "1.2px solid #F1F5F9" }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center">
          <Medal className="w-3.5 h-3.5 text-indigo-500" />
        </div>
        <h3 className="text-[14px] font-semibold text-slate-700 tracking-tight font-poppins">
          Recent Achievements
        </h3>
      </div>
      <div className="space-y-2">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 p-2 rounded-[16px] border border-slate-50 bg-[#F8FAFC] hover:bg-slate-50 transition-all"
          >
            <div
              className={cn(
                "w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                item.bgColor,
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5", item.color)} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[12px] md:text-[13px] font-medium text-slate-700 truncate font-poppins tracking-tight">
                {item.title}
              </h4>
              <p className="text-[11px] font-medium text-slate-400 truncate">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
