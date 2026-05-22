"use client";

import React, { useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticalTaskProps {
  title: string;
  instructions: string[];
  activeColor?: string;
}

export const PracticalTask = ({ title, instructions, activeColor = "blue" }: PracticalTaskProps) => {
  const [file, setFile] = React.useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bgColors: Record<string, string> = {
    blue: "bg-blue-50/40 border-blue-100",
    purple: "bg-purple-50/40 border-purple-100",
    emerald: "bg-emerald-50/40 border-emerald-100",
    orange: "bg-orange-50/40 border-orange-100",
  };

  const iconBgs: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
  };

  const dotColors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        size: formatFileSize(selectedFile.size)
      });
    }
  };

  const onAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-[14px] font-medium text-slate-800 mb-2 font-poppins">
        {title}
      </h2>
      <p className="text-[13px] text-slate-500 mb-4 leading-relaxed font-poppins font-medium">
        Download the provided dataset (CSV) and perform the following data cleaning tasks. Upload your cleaned dataset and a brief summary of steps taken.
      </p>

      <div className="bg-[#F8FAFC] rounded-[16px] p-4 mb-4 border border-slate-100">
        <h4 className="text-[13px] font-semibold text-slate-800 mb-2.5 font-poppins">Instructions</h4>
        <ul className="space-y-2.5">
          {instructions.map((instruction, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 border",
                dotColors[activeColor]
              )}>
                {idx + 1}
              </div>
              <span className="text-[13px] text-slate-600 font-medium font-poppins leading-snug">
                {instruction}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".csv,.xlsx,.zip"
      />

      {file ? (
        <div className={cn(
          "border rounded-[20px] p-4 flex items-center justify-between animate-in fade-in zoom-in-95 duration-300",
          bgColors[activeColor]
        )}>
          <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconBgs[activeColor])}>
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[14px] font-semibold text-slate-800 font-poppins truncate max-w-[200px] md:max-w-md">
                {file.name}
              </p>
              <p className="text-[12px] text-slate-400 font-medium font-poppins">{file.size}</p>
            </div>
          </div>
          <button 
            onClick={() => setFile(null)}
            className="text-[13px] font-semibold text-red-500 hover:text-red-600 px-3 py-1 cursor-pointer transition-colors shrink-0"
          >
            Remove
          </button>
        </div>
      ) : (
        <div 
          onClick={onAreaClick}
          className="border-2 border-dashed border-slate-200 rounded-[20px] p-8 flex flex-col items-center justify-center bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
            <Upload className={cn("w-5 h-5", activeColor === 'blue' ? 'text-blue-600' : 
                                       activeColor === 'purple' ? 'text-purple-600' :
                                       activeColor === 'emerald' ? 'text-emerald-600' :
                                       'text-orange-600')} />
          </div>
          <p className="text-[14px] font-semibold text-slate-800 font-poppins mb-0.5">Click to upload or drag and drop</p>
          <p className="text-[11px] text-slate-400 font-medium font-poppins">Accepted: .csv, .xlsx, .zip • Max 10MB</p>
        </div>
      )}
    </div>
  );
};
