"use client";

import React from "react";
import { Code2, Briefcase, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tasks = [
  {
    type: "course",
    title: "REST API with Express",
    status: "In Progress — 65%",
    progress: 65,
    icon: Code2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    statusColor: "text-amber-500",
  },
  {
    type: "interview",
    title: "Practice Interview",
    status: "Gojek · Software Engineer",
    icon: Briefcase,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    statusColor: "text-slate-400",
  },
];

export const UpcomingTasks = () => {
  return (
    <div className="flex flex-col gap-3 h-full">
      {tasks.map((task) => (
        <div
          key={task.title}
          className="bg-white rounded-[20px] p-4 md:p-5 border border-slate-100 flex flex-col gap-3 transition-all shadow-sm shadow-slate-200/20 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0",
                  task.iconBg
                )}
              >
                <task.icon className={cn("w-5 h-5", task.iconColor)} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[14px] font-bold text-slate-800 font-poppins tracking-tight">
                  {task.title}
                </h4>
                <p className={cn("text-[12px] font-medium", task.statusColor)}>
                  {task.status}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 transition-all" />
          </div>
          {task.progress && (
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}

      <div className="bg-linear-to-br from-[#5D6AF2] to-[#066EFF] rounded-[20px] p-5 text-white flex items-center justify-between transition-all shadow-md shadow-blue-500/10 group cursor-pointer relative overflow-hidden grow">
        <div className="flex items-center gap-3 relative z-10 w-full">
          <div className="w-10 h-10 rounded-[14px] bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
            <Star className="w-5 h-5 text-white fill-white/20" />
          </div>
          <div className="grow min-w-0 pr-2">
            <h4 className="text-[15px] font-bold font-poppins tracking-tight leading-tight">
              Take Initial Assessment
            </h4>
            <p className="text-[12px] text-white/90 font-medium mt-0.5">
              Boost your readiness accuracy
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/70 transition-all shrink-0" />
        </div>
        
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-4 -mb-4 blur-xl" />
      </div>
    </div>
  );
};
