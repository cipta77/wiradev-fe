"use client";

import React from "react";

export const ScenarioCard = () => {
  return (
    <div
      className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full"
      style={{ border: "1.2px solid #F1F5F9" }}
    >
      <div className="px-4 py-3 border-b border-[#F1F5F9] bg-slate-50/50">
        <h3 className="text-[14px] font-semibold text-slate-800 font-poppins">
          Scenario Details
        </h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="p-3 bg-slate-50/50 rounded-xl space-y-0.5 border border-slate-100">
          <p className="text-[11px] text-slate-400 font-medium font-poppins">
            Position
          </p>
          <p className="text-[13px] text-slate-800 font-semibold font-poppins">
            Jr. Software Engineer
          </p>
        </div>

        <div className="p-3 bg-slate-50/50 rounded-xl space-y-0.5 border border-slate-100">
          <p className="text-[11px] text-slate-400 font-medium font-poppins">
            Initial Offer
          </p>
          <p className="text-[13px] text-slate-800 font-semibold font-poppins">
            Rp 8,000,000/mo
          </p>
        </div>

        <div className="p-3 bg-slate-50/50 rounded-xl space-y-0.5 border border-slate-100">
          <p className="text-[11px] text-slate-400 font-medium font-poppins">
            Market Average
          </p>
          <p className="text-[13px] text-emerald-500 font-semibold font-poppins">
            Rp 9.5M - 12M/mo
          </p>
        </div>
      </div>
    </div>
  );
};
