"use client";

import React from "react";
import {
  ShieldCheck,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: ShieldCheck,
    value: "62%",
    label: "Overall Readiness",
    color: "bg-[#F0F7FF] text-[#066EFF]",
  },
  {
    icon: BarChart3,
    value: "12",
    label: "Skills Mapped",
    color: "bg-[#F0FFF9] text-[#10B981]",
  },
  {
    icon: AlertTriangle,
    value: "4",
    label: "Critical Gaps",
    color: "bg-[#FFF1F1] text-[#EF4444]",
  },
  {
    icon: CheckCircle2,
    value: "5",
    label: "Strengths",
    color: "bg-[#F0FFF9] text-[#10B981]",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-3.5 md:p-4 rounded-[16px] transition-all duration-300 shadow-sm shadow-slate-200/10"
          style={{ border: "1.2px solid #F1F5F9" }}
        >
          <div
            className={cn(
              "w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center mb-2.5 md:mb-3",
              stat.color,
            )}
          >
            <stat.icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </div>
          <div className="space-y-2">
            <div className="text-[18px] md:text-[28px] font-bold text-slate-900 leading-none tracking-tight font-poppins">
              {stat.value}
            </div>
            <div className="text-[11px] md:text-[12px] font-medium text-slate-400 tracking-tight">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
