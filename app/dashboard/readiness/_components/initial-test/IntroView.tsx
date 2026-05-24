"use client";

import React from "react";
import { ClipboardCheck, ArrowRight } from "lucide-react";

interface IntroViewProps {
  onStart?: () => void;
}

export const IntroView = ({ onStart }: IntroViewProps) => {
  return (
    <div className="w-full flex justify-center pb-6 md:pb-10">
      <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[#E8ECF0] max-w-[800px] w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F0F7FF] rounded-2xl flex items-center justify-center mb-4">
          <ClipboardCheck className="w-6 h-6 md:w-7 text-[#066EFF]" />
        </div>

        <h2 className="text-[20px] md:text-[24px] font-extrabold text-[#0D3E9B] mb-2.5">
          Initial Skill Assessment
        </h2>
        <p className="text-slate-500 text-[13px] md:text-[14px] max-w-lg mb-6 leading-relaxed">
          Complement your CV and GitHub analysis with a direct knowledge
          assessment. This test evaluates your skills across 7 categories to
          give a more accurate readiness score.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-6">
          {[
            { label: "8 Questions", sub: "Multi-choice format" },
            { label: "~10 Minutes", sub: "No time pressure" },
            { label: "7 Categories", sub: "Full-stack coverage" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#F8FAFC] py-4 px-3 rounded-xl flex flex-col items-center justify-center border border-[#E8ECF0]"
            >
              <span className="text-[#1E293B] font-bold text-[14px]">
                {item.label}
              </span>
              <span className="text-slate-400 text-[11px] mt-0.5 font-medium">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

        <div
          className="bg-[#F0F7FF] p-4 rounded-xl text-left w-full mb-6"
          style={{ border: "1.2px solid #E0EFFF" }}
        >
          <h4 className="text-[#066EFF] font-bold text-[14px] mb-1.5 font-poppins">
            How this helps your readiness score
          </h4>
          <p className="text-slate-500 text-[12px] leading-relaxed">
            Currently your score is based on CV analysis (12 skills) and GitHub
            activity. Taking this assessment adds a third evaluation dimension,
            making your Skill Map and Skill Gap analysis significantly more
            accurate.
          </p>
        </div>

        <button
          onClick={onStart}
          className="bg-[#066EFF] text-white px-8 md:px-10 py-3 md:py-3.5 rounded-xl font-bold text-[14px] md:text-[15px] flex items-center gap-2 transition-all cursor-pointer shadow-sm shadow-blue-500/20"
        >
          Start Assessment
          <ArrowRight className="w-4 h-4 transition-transform" />
        </button>
      </div>
    </div>
  );
};
