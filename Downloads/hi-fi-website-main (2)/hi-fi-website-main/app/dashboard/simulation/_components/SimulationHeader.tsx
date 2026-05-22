"use client";

import React from "react";

export const SimulationHeader = () => {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2 font-poppins">
      <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#0D3E9B] tracking-tight leading-tight">
        Career Simulation
      </h1>
      <p className="text-[13px] md:text-[14px] text-slate-500 max-w-[600px] leading-relaxed font-medium">
        Practice interviews, negotiate salary, and analyze job descriptions
      </p>
    </div>
  );
};
