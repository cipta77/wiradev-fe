"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CVAnalysisViewProps {
  onComplete: () => void;
}

const analysisSteps = [
  { id: 1, label: "Parsing document structure..." },
  { id: 2, label: "Extracting technical skills..." },
  { id: 3, label: "Analyzing work experience..." },
  { id: 4, label: "Checking keyword optimization..." },
  { id: 5, label: "Comparing against industry standards..." },
  { id: 6, label: "Generating improvement suggestions..." },
  { id: 7, label: "Finalizing CV score..." },
];

export const CVAnalysisView: React.FC<CVAnalysisViewProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const totalTime = 4000; 
    const intervalTime = 40;
    const increment = 100 / (totalTime / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        const next = prev + increment;
        
        const step = Math.min(Math.floor((next / 100) * analysisSteps.length) + 1, analysisSteps.length);
        setCurrentStep(step);
        
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-[640px] mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-white rounded-md border border-[#E8ECF0] p-6 md:p-10 overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-[#066EFF]/5 rounded-md flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-[#066EFF]" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-50">
              <Loader2 className="w-4 h-4 text-[#066EFF] animate-spin" />
            </div>
          </div>
          
          <h2 className="text-[18px] font-bold text-slate-800 font-poppins mb-6">
            Analyzing Your CV
          </h2>

          <div className="w-full space-y-2 mb-8">
            <div className="flex justify-between items-center px-0.5">
              <span className="text-[12px] font-bold text-slate-400 font-poppins uppercase tracking-wider">Progress</span>
              <span className="text-[13px] font-bold text-[#066EFF] font-poppins">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
              <div 
                className="h-full bg-[#066EFF] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="w-full space-y-4">
            {analysisSteps.map((step) => {
              const isDone = progress > (step.id / analysisSteps.length) * 100;
              const isCurrent = currentStep === step.id && !isDone;
              
              return (
                <div 
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 transition-all duration-300 px-3 py-2 rounded-md border border-transparent",
                    isCurrent ? "bg-slate-50 border-slate-200" : ""
                  )}
                >
                  <div className="shrink-0">
                    {progress >= (step.id / analysisSteps.length) * 100 ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-[#066EFF] animate-spin" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-100" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[14px] font-medium font-poppins transition-colors",
                    progress >= (step.id / analysisSteps.length) * 100 ? "text-slate-400 line-through decoration-slate-300" :
                    isCurrent ? "text-slate-800" : "text-slate-200"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
