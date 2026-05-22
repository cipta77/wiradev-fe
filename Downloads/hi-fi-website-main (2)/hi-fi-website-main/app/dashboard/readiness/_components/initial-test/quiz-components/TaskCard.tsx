"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  index: number;
  type: string;
  children: React.ReactNode;
  activeColor?: string;
}

export const TaskCard = ({ index, type, children, activeColor = "blue" }: TaskCardProps) => {
  const bgColors: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
    orange: "bg-orange-500",
  };

  const headerBgs: Record<string, string> = {
    blue: "bg-slate-50/50",
    purple: "bg-purple-50/20",
    emerald: "bg-emerald-50/20",
    orange: "bg-orange-50/20",
  };

  return (
    <div className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm shadow-slate-100/50">
      <div className={cn("px-5 py-3 border-b border-slate-50 flex items-center gap-3", headerBgs[activeColor])}>
        <div className={cn(
          "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-semibold text-white",
          bgColors[activeColor] || "bg-blue-500"
        )}>
          {index}
        </div>
        <span className="text-[12px] font-semibold font-poppins text-slate-400">
          {type}
        </span>
      </div>
      <div className="p-5 md:p-6">
        {children}
      </div>
    </div>
  );
};
