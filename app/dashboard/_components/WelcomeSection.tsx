"use client";

import React from "react";
import { Zap } from "lucide-react";

export const WelcomeSection = ({
  name,
  streak,
}: {
  name: string;
  streak: number;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-[22px] md:text-[26px] lg:text-[30px] font-extrabold text-[#0D3E9B] leading-tight">
          Welcome back, {name}! 👋
        </h1>
        <p className="text-[13px] md:text-[14px] text-slate-400 mt-1 md:mt-0 font-medium">
          Here&apos;s your career readiness overview.
        </p>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100 shadow-sm shadow-orange-100/30">
        <div className="flex items-center justify-center w-5 h-5 bg-orange-500 rounded-full">
           <Zap className="w-3 h-3 text-white fill-white" />
        </div>
        <span className="text-[12px] md:text-[13px] font-bold text-orange-700 whitespace-nowrap">
          {streak} day streak
        </span>
      </div>
    </div>
  );
};
