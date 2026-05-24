"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  Clock, 
  Play, 
  CheckCircle2, 
  Target, 
  FileText, 
  ListOrdered,
  ExternalLink,
  Code2,
  Lightbulb,
  ArrowRight,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AICodeReviewResult } from "../../_components/AICodeReviewResult";

export default function ProjectWorkspacePage({ params: paramsProp }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsProp);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = 4;
  const steps = [
    {
      id: 1,
      title: "Set up Express project with proper folder structure",
      instructions: "You're building a Task Management API for a small team. Users should be able to register, login, and manage their tasks (create, read, update, delete). Each task has a title, description, status, and due date. Only authenticated users can access their own tasks.",
      code: "// Start coding here for Step 1\n// Set up Express project with proper folder structure",
    },
    {
      id: 2,
      title: "Implement user authentication with JWT",
      instructions: "Define the user model and implement registration and login logic using bcrypt for password hashing and jsonwebtoken for session management.",
      code: "// Start coding here for Step 2\n// Implement user authentication with JWT",
    },
    {
      id: 3,
      title: "Create CRUD endpoints with input validation",
      instructions: "Create routes for tasks and implement controllers for each action. Use a validation library like Joi or express-validator to ensure input data is correct.",
      code: "// Start coding here for Step 3\n// Create CRUD endpoints with input validation",
    },
    {
      id: 4,
      title: "Add error handling middleware and testing",
      instructions: "Implement a centralized error handling middleware to catch and format errors consistently. Write unit tests for your controllers.",
      code: "// Start coding here for Step 4\n// Add error handling middleware and testing",
    }
  ];

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    } else {
      setIsReviewing(true);
      setTimeout(() => {
        setIsReviewing(false);
        setShowResult(true);
      }, 2500);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  if (showResult) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        <AICodeReviewResult projectId={params.id} />
      </div>
    );
  }

  if (isReviewing) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white p-12 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/20 max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden">
            <div className="absolute inset-0 border-2 border-blue-500 border-t-transparent rounded-2xl animate-spin" />
            <div className="text-blue-600 font-bold text-xl">C</div>
          </div>
          <div className="space-y-2">
            <h2 className="text-[20px] font-bold text-slate-900">Reviewing your project</h2>
            <p className="text-slate-400 text-[14px]">Evaluating against the project objective and related skills...</p>
          </div>
          <div className="h-1.5 w-48 bg-slate-100 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-[#066EFF] rounded-full animate-[progress_2.5s_ease-in-out]" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep - 1];
  const progress = (completedSteps.length / totalSteps) * 100;

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pt-2">
        <div className="space-y-2">
          <div className="space-y-0.5">
            <h1 className="text-[20px] font-bold text-[#0F172A]">REST API with Express</h1>
            <p className="text-slate-400 text-[12px] font-normal">Working on Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start">
          <span className="text-[11px] font-semibold text-slate-400">Progress</span>
          <div className="w-32 h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#066EFF] rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[12px] font-bold text-[#066EFF]">{progress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-[20px] border border-slate-100/80 p-5 space-y-4">
          <h3 className="text-[13px] font-semibold text-slate-700">Project Steps</h3>
          <div className="space-y-2">
            {steps.map((s) => {
              const isCompleted = completedSteps.includes(s.id);
              const isActive = currentStep === s.id;
              
              return (
                <button
                  key={s.id}
                  onClick={() => handleStepClick(s.id)}
                  className={cn(
                    "w-full flex items-start gap-2.5 p-3 rounded-[14px] transition-all text-left group",
                    isActive 
                      ? "bg-blue-50/60 border border-blue-100" 
                      : isCompleted
                        ? "bg-emerald-50/30 border border-emerald-100/40"
                        : "bg-transparent border border-transparent hover:bg-slate-50"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : isCompleted
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  )}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="text-[10px] font-bold">{s.id}</span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[11px] font-semibold leading-snug",
                    isActive ? "text-blue-600" : isCompleted ? "text-emerald-600" : "text-slate-400"
                  )}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-5 md:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#066EFF]" />
                <h2 className="text-[13px] font-semibold text-slate-700">
                  Step {currentStep}: {step.title}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px] font-normal">4 hours</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-[#F8FAFC] rounded-[14px] p-4 border border-slate-100/40 space-y-2">
              <h4 className="text-[14px] font-bold text-slate-800">Instructions</h4>
              <p className="text-[12px] text-slate-500 font-normal leading-relaxed">
                {step.instructions}
              </p>
            </div>

            {/* Editor Placeholder */}
            <div className="bg-[#1E293B] rounded-[16px] overflow-hidden border border-slate-800/60 shadow-xl">
              <div className="bg-[#0F172A] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-normal text-slate-500 font-mono">workspace.js</span>
                <div className="w-10" />
              </div>
              <div className="p-5 font-mono text-[12px] leading-relaxed min-h-[140px]">
                <pre className="text-slate-300">
                  <code>{step.code}</code>
                </pre>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-[#FFF7ED]/60 rounded-[14px] px-4 py-3 border border-orange-100/20 flex gap-2 items-start">
              <Lightbulb className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-orange-500 font-normal leading-relaxed">
                <span className="font-bold">Tip:</span> Complete this step and click &quot;Next Step&quot; to proceed. You can submit the project at any point to get a project-specific review.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 text-[12px] font-semibold hover:bg-slate-50 transition-all">
                <FileText className="w-3.5 h-3.5" />
                Submit Project
              </button>
              <button 
                onClick={handleNextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#066EFF] text-white text-[12px] font-bold shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                {currentStep === totalSteps ? "Complete Project" : "Next Step"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
