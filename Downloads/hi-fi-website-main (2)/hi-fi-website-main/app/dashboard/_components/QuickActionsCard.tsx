"use client";

import React from "react";
import { ShieldCheck, Code2, Briefcase, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    icon: ShieldCheck,
    label: "Readiness Center",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Code2,
    label: "Development Hub",
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    icon: Briefcase,
    label: "Career Simulation",
    color: "bg-orange-50 text-orange-500",
  },
];

export const QuickActionsCard = () => {
  return (
    <div
      className="bg-white rounded-[24px] p-5 md:p-8 flex flex-col gap-5 h-full transition-all hover:shadow-xl hover:shadow-blue-500/5"
      style={{ border: "1.2px solid #F1F5F9" }}
    >
      <p className="text-[15px] font-medium text-slate-700 tracking-tight">
        Quick Actions
      </p>
      <div className="flex flex-col gap-2">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className="group flex items-center justify-between p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98] cursor-pointer border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                  action.color,
                )}
              >
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-[13px] md:text-[14px] font-medium text-slate-700 group-hover:text-[#066EFF] transition-colors tracking-tight line-clamp-1">
                {action.label}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#066EFF] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};
