"use client";

import React from "react";
import { Target, Code2, Briefcase } from "lucide-react";

/**
 * GrowthProgressCard displays the user's progress in key areas using balanced circular charts.
 * Optimized for both desktop (lg:col-span-7) and mobile (responsive sizing).
 */

const growthProgress = [
  { 
    label: "Skills Mapped", 
    value: 12, 
    total: 20, 
    color: "#3B82F6", // Blue
    icon: Target 
  },
  { 
    label: "Projects Done", 
    value: 3, 
    total: 8, 
    color: "#10B981", // Emerald
    icon: Code2 
  },
  { 
    label: "Simulations", 
    value: 2, 
    total: 5, 
    color: "#F59E0B", // Orange/Amber
    icon: Briefcase 
  },
];

interface CircularProgressProps {
  value: number;
  total: number;
  color: string;
  icon: React.ElementType;
}

const CircularProgress = ({ value, total, color, icon: Icon }: CircularProgressProps) => {
  const percentage = (value / total) * 100;
  const circumference = 2 * Math.PI * 40; 

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 md:w-24 lg:w-28 flex items-center justify-center transition-transform duration-500">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#F8FAFC"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 40}
            style={{ 
              strokeDashoffset: (2 * Math.PI * 40) - (percentage / 100) * (2 * Math.PI * 40),
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              strokeLinecap: "round"
            }}
          />
        </svg>
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-80 transition-all duration-300"
          style={{ color }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  );
};

export const GrowthProgressCard = () => {
  return (
    <div
      className="bg-white rounded-[24px] p-4 md:p-6 lg:p-8 flex flex-col h-full gap-5 transition-all group border border-slate-100 shadow-sm shadow-slate-200/20"
    >
      <div className="flex justify-between items-center px-1">
        <p className="text-[14px] md:text-[16px] font-semibold text-slate-800 tracking-tight">
          Growth Progress
        </p>
        <div className="flex items-center gap-1.5">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
           <span className="text-[10px] md:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            THIS MONTH
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-around gap-2 md:gap-4">
        {growthProgress.map((item) => (
          <div key={item.label} className="flex flex-col items-center flex-1">
            <CircularProgress {...item} />
            <div className="mt-3 md:mt-4 flex flex-col items-center text-center">
              <span className="text-[13px] sm:text-[15px] md:text-[18px] font-bold text-slate-800 tracking-tight whitespace-nowrap">
                {item.value}<span className="text-slate-200 mx-0.5 font-medium text-[12px] md:text-[15px]">/</span><span className="text-slate-400 font-medium text-[12px] md:text-[15px]">{item.total}</span>
              </span>
              <span className="text-[9px] md:text-[10px] font-semibold text-slate-400 mt-0.5 uppercase tracking-tight line-clamp-1">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
