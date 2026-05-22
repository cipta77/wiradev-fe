"use client";

import React from "react";

export const SettingsEmptyState = ({ title }: { title: string }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-[20px] flex items-center justify-center mb-6 border-[0.8px] border-slate-100">
        <span className="text-[32px]">⚙️</span>
      </div>
      <h3 className="text-[20px] font-semibold text-slate-900 font-poppins mb-2">
        {title}
      </h3>
      <p className="text-slate-400 text-[15px] font-normal max-w-sm leading-relaxed font-poppins">
        We&apos;re currently building out this settings module. It will be
        available in the next update!
      </p>
    </div>
  );
};
