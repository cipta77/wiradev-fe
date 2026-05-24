"use client";

import React, { useState } from "react";

interface EssayTaskProps {
  question: string;
  placeholder: string;
  minWords: number;
}

export const EssayTask = ({ question, placeholder, minWords }: EssayTaskProps) => {
  const [text, setText] = useState("");
  
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col">
      <h2 className="text-[14px] font-medium text-slate-800 mb-4 leading-relaxed font-poppins">
        {question}
      </h2>

      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[180px] p-5 rounded-[20px] bg-[#F8FAFC]/50 border-2 border-slate-50 focus:border-blue-200 focus:bg-white outline-hidden transition-all text-[14px] font-medium font-poppins text-slate-700 placeholder:text-slate-300 resize-none"
        />
        <div className="flex justify-between items-center mt-3 px-1">
          <span className="text-[12px] font-semibold font-poppins text-slate-400">
            {wordCount} / {minWords} words min
          </span>
        </div>
      </div>
    </div>
  );
};
