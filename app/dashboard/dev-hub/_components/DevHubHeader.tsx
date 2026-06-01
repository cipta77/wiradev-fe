"use client";

import React from "react";

export const DevHubHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-poppins">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#0D3E9B] tracking-tight leading-tight">
          Development Hub
        </h1>
        <p className="text-[13px] md:text-[14px] text-slate-500 max-w-[600px] leading-relaxed font-medium">
          Rancang dan kembangkan proyek nyata untuk memperkuat portofolio Anda dengan ulasan instan dari AI.
        </p>
      </div>
    </div>
  );
};
