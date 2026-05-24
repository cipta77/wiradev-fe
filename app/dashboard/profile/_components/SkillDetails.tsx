"use client";

import React from "react";

const skills = [
  { name: "JavaScript", proficiency: 78, color: "bg-emerald-500" },
  { name: "React", proficiency: 65, color: "bg-orange-500" },
  { name: "Node.js", proficiency: 60, color: "bg-orange-500" },
  { name: "Git", proficiency: 82, color: "bg-emerald-500" },
  { name: "SQL", proficiency: 70, color: "bg-emerald-500" },
  { name: "REST API", proficiency: 72, color: "bg-emerald-500" },
  { name: "CSS/Tailwind", proficiency: 68, color: "bg-orange-500" },
  { name: "Python", proficiency: 52, color: "bg-orange-500" },
];

export const SkillDetails = () => {
  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">
          Skill Details
        </h3>
      </div>
      <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-slate-700">
                {skill.name}
              </span>
              <span className={`text-[11px] font-bold ${skill.proficiency >= 70 ? 'text-emerald-500' : 'text-orange-500'}`}>
                {skill.proficiency}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${skill.color} transition-all duration-1000 ease-out`}
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
