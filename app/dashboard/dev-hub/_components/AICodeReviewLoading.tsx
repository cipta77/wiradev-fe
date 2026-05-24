"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Loader2, 
  Search, 
  ShieldCheck, 
  Zap, 
  FileText,
  Code2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStep {
  id: number;
  label: string;
  subLabel?: string;
  status: "idle" | "loading" | "completed";
  icon: any;
}

export const AICodeReviewLoading = ({ onComplete }: { onComplete: () => void }) => {
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: 1, label: "Analyzing your code", subLabel: "This usually takes a few seconds", status: "loading", icon: Code2 },
    { id: 2, label: "Parsing code structure", status: "idle", icon: CheckCircle2 },
    { id: 3, label: "Checking best practices", status: "idle", icon: CheckCircle2 },
    { id: 4, label: "Scanning for security issues", status: "idle", icon: Search },
    { id: 5, label: "Analyzing performance", status: "idle", icon: Zap },
    { id: 6, label: "Generating recommendations", status: "idle", icon: FileText },
  ]);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setSteps(prev => prev.map((step, idx) => {
          if (idx === currentStep) return { ...step, status: "completed" };
          if (idx === currentStep + 1) return { ...step, status: "loading" };
          return step;
        }));
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 space-y-3 animate-in fade-in duration-500">
      {steps.map((step) => (
        <div 
          key={step.id}
          className={cn(
            "flex items-center gap-4 px-5 py-4 rounded-[16px] transition-all duration-500 border",
            step.status === "completed" 
              ? "bg-emerald-50/40 border-emerald-100/50 text-emerald-600" 
              : step.status === "loading"
                ? "bg-blue-50/40 border-blue-100/50 text-[#066EFF]"
                : "bg-slate-50/30 border-transparent text-slate-300"
          )}
        >
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            step.status === "completed" ? "bg-emerald-100/50" : step.status === "loading" ? "bg-blue-100/50" : "bg-slate-100/50"
          )}>
            {step.status === "completed" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : step.status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <step.icon className="w-4 h-4 opacity-40" />
            )}
          </div>
          <div className="flex-1">
            <h4 className={cn(
              "text-[14px] font-semibold tracking-tight",
              step.status === "idle" && "opacity-40"
            )}>
              {step.label}
            </h4>
            {step.subLabel && step.status === "loading" && (
              <p className="text-[11px] opacity-70 font-normal">{step.subLabel}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
