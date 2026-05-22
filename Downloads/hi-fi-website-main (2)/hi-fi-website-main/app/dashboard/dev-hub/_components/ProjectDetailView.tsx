"use client";

import React from "react";
import { 
  ChevronLeft, 
  Clock, 
  Play, 
  CheckCircle2, 
  Target, 
  FileText, 
  ListOrdered,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProjectDetailViewProps {
  project: any;
  onBack: () => void;
}

export const ProjectDetailView = ({ project, onBack }: ProjectDetailViewProps) => {
  const steps = [
    "Set up Express project with proper folder structure",
    "Implement user authentication with JWT",
    "Create CRUD endpoints with input validation",
    "Add error handling middleware and testing"
  ];

  const getActionButton = () => {
    if (project.status === "Completed") {
      return {
        label: "View Solution",
        icon: ExternalLink,
        bg: "bg-[#066EFF]",
        hover: "hover:bg-[#0559d1]"
      };
    }
    if (project.status === "In Progress") {
      return {
        label: "Continue Project",
        icon: Play,
        bg: "bg-[#066EFF]",
        hover: "hover:bg-[#0559d1]"
      };
    }
    return {
      label: "Start Project",
      icon: Play,
      bg: "bg-[#066EFF]",
      hover: "hover:bg-[#0559d1]"
    };
  };

  const action = getActionButton();

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-medium text-[13px] mb-8 group transition-all"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Development Hub
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 md:p-7 shadow-sm shadow-slate-200/5">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 uppercase tracking-wider">
                {project.level}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-500 uppercase tracking-wider">
                {project.status}
              </span>
            </div>
            <h1 className="text-[22px] md:text-[24px] font-bold text-[#066EFF] mb-3 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-400 text-[13px] md:text-[14px] font-medium leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-[#066EFF]" />
              </div>
              <h2 className="text-[15px] md:text-[16px] font-semibold text-slate-800">
                Objective
              </h2>
            </div>
            <p className="text-slate-400 text-[13px] md:text-[14px] font-medium leading-relaxed pl-1">
              Demonstrate ability to build production-ready backend APIs with proper authentication, validation, and error handling patterns.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-orange-500" />
              </div>
              <h2 className="text-[15px] md:text-[16px] font-semibold text-slate-800">
                Project Brief
              </h2>
            </div>
            <p className="text-slate-400 text-[13px] md:text-[14px] font-medium leading-relaxed pl-1">
              You&apos;re building a Task Management API for a small team. Users should be able to register, login, and manage their tasks (create, read, update, delete). Each task has a title, description, status, and due date. Only authenticated users can access their own tasks.
            </p>
          </div>

          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <ListOrdered className="w-4 h-4 text-slate-500" />
              </div>
              <h2 className="text-[15px] md:text-[16px] font-semibold text-slate-800">
                Project Steps
              </h2>
            </div>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-3.5 rounded-[16px] bg-[#F8FAFC] border border-slate-100/50 group transition-all">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-blue-600">{idx + 1}</span>
                  </div>
                  <span className="text-[13px] font-medium text-slate-600 tracking-tight">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-7">
            <Link href={`/dashboard/dev-hub/${project.id}/project`} className="block">
              <button className={cn(
                "w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[14px] font-bold text-white shadow-xl transition-all active:scale-[0.98] cursor-pointer",
                action.bg,
                action.hover,
                "shadow-blue-600/20"
              )}>
                <action.icon className="w-4.5 h-4.5" />
                {action.label}
              </button>
            </Link>

            <div className="space-y-5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-slate-400">Estimated Time</span>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[13px] font-semibold">{project.duration}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-slate-400">Difficulty</span>
                <span className="text-[13px] font-semibold text-blue-600">{project.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-slate-400">Primary Skill</span>
                <span className="text-[13px] font-semibold text-slate-700">{project.tag || "Node.js"}</span>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-[11px] font-semibold">
                  <span className="text-slate-400 uppercase tracking-widest">Progress</span>
                  <span className="text-[#066EFF]">
                    {project.status === "Completed" ? 100 : (project.progress ?? 0)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100/80 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#066EFF] rounded-full transition-all duration-1000"
                    style={{ width: `${project.status === "Completed" ? 100 : (project.progress ?? 0)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Related Skills</h4>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express.js", "JWT Auth", "REST API", "Validation", "Error Handling"].map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-blue-50/50 text-[#066EFF] text-[10px] font-semibold border border-blue-100/30 tracking-tight">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
