"use client";

import React from "react";
import { FileText, Files, Download } from "lucide-react";

export const DocumentsCard = () => {
  const docs = [
    { name: "CV", filename: "alex_rahman_cv.pdf", icon: FileText, color: "text-blue-500" },
    { name: "Transcript", filename: "academic_transcript.pdf", icon: Files, color: "text-orange-500" },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">
          Documents
        </h3>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {docs.map((doc) => (
          <div key={doc.name} className="p-3 bg-slate-50/50 rounded-[16px] flex items-center justify-between border border-slate-100 hover:border-blue-100 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                <doc.icon className={`w-4.5 h-4.5 ${doc.color}`} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">
                  {doc.name}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {doc.filename}
                </p>
              </div>
            </div>
            <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
