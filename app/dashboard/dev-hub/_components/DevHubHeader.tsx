"use client";

import React from "react";
import { Plus } from "lucide-react";

export const DevHubHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-poppins">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#0D3E9B] tracking-tight leading-tight">
          Development Hub
        </h1>
        <p className="text-[13px] md:text-[14px] text-slate-500 max-w-[600px] leading-relaxed font-medium">
          Build real projects and get AI-powered code feedback
        </p>
      </div>

      <button className="flex items-center gap-1.5 bg-[#066EFF] text-white px-3.5 py-2 rounded-lg text-[12px] md:text-[13px] font-bold shadow-md shadow-blue-500/10 transition-all cursor-pointer">
        <Plus className="w-3.5 h-3.5 shrink-0" />
        <span className="whitespace-nowrap">New Project</span>
      </button>
    </div>
  );
};
