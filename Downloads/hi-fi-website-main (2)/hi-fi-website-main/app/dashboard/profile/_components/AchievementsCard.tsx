"use client";

import React from "react";
import { 
  Rocket, 
  Star, 
  Trophy, 
  FileCheck, 
  GraduationCap, 
  Flame 
} from "lucide-react";

const achievements = [
  {
    title: "Fast Learner",
    description: "Completed 3 projects in first week",
    icon: Rocket,
    color: "text-rose-500",
    bg: "bg-rose-50"
  },
  {
    title: "Code Quality",
    description: "Scored 80+ on AI code review",
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50"
  },
  {
    title: "First Project",
    description: "Completed REST API project",
    icon: Trophy,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    title: "CV Pro",
    description: "Uploaded and analyzed CV",
    icon: FileCheck,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    title: "Academic Star",
    description: "GPA above 3.4",
    icon: GraduationCap,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    title: "Consistent",
    description: "3-day learning streak",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-50"
  }
];

export const AchievementsCard = () => {
  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">
          Achievements
        </h3>
      </div>
      <div className="p-5 md:p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.title} 
            className="flex flex-col items-center text-center p-4 rounded-[20px] bg-slate-50/50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group cursor-default"
          >
            <div className={`w-12 h-12 rounded-2xl ${achievement.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
            </div>
            <h4 className="text-[13px] font-bold text-slate-800 mb-1">
              {achievement.title}
            </h4>
            <p className="text-[11px] text-slate-400 leading-tight font-medium">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
