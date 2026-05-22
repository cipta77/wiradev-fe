"use client";

import React from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "JavaScript", category: "Language", progress: 78 },
  { name: "React", category: "Framework", progress: 65 },
  { name: "Node.js", category: "Runtime", progress: 60 },
  { name: "Python", category: "Language", progress: 52 },
  { name: "SQL", category: "Database", progress: 70 },
  { name: "TypeScript", category: "Language", progress: 45 },
  { name: "System Design", category: "Architecture", progress: 28 },
  { name: "Testing", category: "Quality", progress: 35 },
  { name: "Docker", category: "DevOps", progress: 30 },
  { name: "Git", category: "Tools", progress: 82 },
];

const getStatus = (progress: number) => {
  if (progress >= 65) return "strong";
  if (progress > 45) return "moderate";
  return "gap";
};

const statusConfig = {
  strong: {
    color: "#10B981",
    bg: "bg-[#10B981]",
    label: "Strong (>65%)",
  },
  moderate: {
    color: "#F59E0B",
    bg: "bg-[#F59E0B]",
    label: "Moderate (45-65%)",
  },
  gap: {
    color: "#EF4444",
    bg: "bg-[#EF4444]",
    label: "Gap (<45%)",
  },
};

export const SkillMap = () => {
  return (
    <div className="bg-white p-5 md:p-7 rounded-[20px] border border-[#E8ECF0]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-1">
        <h2 className="text-[15px] md:text-[17px] font-semibold text-slate-800 font-poppins tracking-tight">
          Your Skill Map
        </h2>

        <div className="flex flex-wrap gap-3 md:gap-4">
          {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map(
            (key) => (
              <div key={key} className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    statusConfig[key].bg,
                  )}
                />
                <span className="text-[11px] md:text-[12px] text-slate-400 font-medium">
                  {statusConfig[key].label}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
        {skills.map((skill, index) => {
          const status = getStatus(skill.progress);
          const config = statusConfig[status];

          return (
            <div
              key={index}
              className="bg-[#F8FAFC]/60 border border-slate-100 p-3 md:p-4 rounded-[14px] transition-all hover:bg-[#F8FAFC] group"
            >
              <div className="flex items-center gap-3 h-full">
                <div
                  className={cn("w-2 h-6 rounded-full shrink-0", config.bg)}
                />

                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[13px] md:text-[14px] font-medium text-slate-800 leading-tight font-poppins tracking-tight">
                      {skill.name}
                    </h3>
                    <span
                      className={cn(
                        "text-[12px] md:text-[13px] font-bold",
                        status === "strong"
                          ? "text-[#10B981]"
                          : status === "moderate"
                            ? "text-[#F59E0B]"
                            : "text-[#EF4444]",
                      )}
                    >
                      {skill.progress}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-slate-100/50">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-in-out",
                        config.bg,
                      )}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>

                  <p className="text-[10px] md:text-[11px] text-slate-400 font-medium truncate">
                    {skill.category}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
