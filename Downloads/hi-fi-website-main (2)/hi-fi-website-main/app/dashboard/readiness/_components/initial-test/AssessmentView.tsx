import React from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Layers,
  Database,
  Layout,
  Code2,
  Terminal,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentViewProps {
  onStart: () => void;
  onBack?: () => void;
}

const sections = [
  {
    title: "Data Analysis",
    tasks: "2 Multiple Choice · 1 Essay · 1 Upload",
    icon: Database,
    iconColor: "text-blue-600 bg-blue-50",
    dotColor: "bg-blue-500",
  },
  {
    title: "Design Brief",
    tasks: "2 Multiple Choice · 1 Upload",
    icon: Layout,
    iconColor: "text-purple-600 bg-purple-50",
    dotColor: "bg-purple-500",
  },
  {
    title: "Problem Solving",
    tasks: "2 Multiple Choice · 1 Essay",
    icon: Code2,
    iconColor: "text-emerald-600 bg-emerald-50",
    dotColor: "bg-emerald-500",
  },
  {
    title: "Web Development",
    tasks: "2 Multiple Choice · 1 Essay",
    icon: Terminal,
    iconColor: "text-orange-600 bg-orange-50",
    dotColor: "bg-orange-500",
  },
];

export const AssessmentView: React.FC<AssessmentViewProps> = ({ onStart, onBack }) => {
  return (
    <div className="w-full max-w-[700px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#94A3B8] hover:text-slate-600 transition-colors mb-6 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-[14px] font-medium font-poppins">Back to Readiness Center</span>
      </button>

      <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden shadow-slate-200/20">
        <div className="bg-linear-to-br from-[#5D6AF2] to-[#066EFF] p-8 md:p-10 text-center relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-[24px] md:text-[28px] font-semibold text-white mb-2 font-poppins tracking-tight">
              Initial Skill Assessment
            </h2>
            <p className="text-white/80 text-[13px] md:text-[14px] font-medium font-poppins max-w-[460px]">
              A structured assessment across 4 categories with multiple task types
            </p>
          </div>
        </div>

        <div className="px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { label: "13 Tasks", icon: BookOpen, color: "text-blue-600 bg-blue-50/50 border-blue-100" },
              { label: "~30 min", icon: Clock, color: "text-emerald-600 bg-emerald-50/50 border-emerald-100" },
              { label: "4 Sections", icon: Layers, color: "text-amber-600 bg-amber-50/50 border-amber-100" },
            ].map((stat) => (
              <div 
                key={stat.label}
                className={cn(
                  "flex items-center gap-2.5 px-5 py-2 rounded-full border text-[13px] font-semibold font-poppins",
                  stat.color
                )}
              >
                <stat.icon className="w-4 h-4" />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-5 max-w-[660px] mx-auto">
            <h3 className="text-[12px] font-semibold text-slate-400 mb-4 font-poppins uppercase tracking-wider">Assessment sections</h3>
            <div className="grid grid-cols-1 gap-3">
              {sections.map((section) => (
                <div 
                  key={section.title}
                  className="bg-[#F8FAFC]/50 p-4 md:p-5 rounded-[18px] border border-slate-50 flex items-center justify-between group transition-all hover:bg-[#F8FAFC]"
                >
                  <div className="flex items-center gap-5">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", section.iconColor)}>
                      <section.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-slate-800 font-poppins mb-1">
                        {section.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-normal font-poppins">
                        {section.tasks}
                      </p>
                    </div>
                  </div>
                  <div className={cn("w-1.5 h-1.5 rounded-full", section.dotColor)} />
                </div>
              ))}
            </div>

            {/* Comprehensive Evaluation Card */}
            <div className="mt-8 bg-amber-50/50 border border-amber-100 p-5 rounded-[20px] flex items-start gap-4">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-5 h-5 text-amber-600 fill-amber-600/10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[13px] font-semibold text-amber-800 font-poppins">Comprehensive evaluation</h4>
                <p className="text-[11px] text-amber-700/80 leading-relaxed font-medium font-poppins">
                  This test includes multiple choice, practical tasks with file uploads, and essay questions to thoroughly assess your skill readiness across all key areas.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onStart}
              className="bg-[#066EFF] text-white w-full py-4 rounded-[14px] font-semibold text-[15px] flex items-center justify-center gap-2.5 hover:bg-[#0052cc] transition-all active:scale-[0.98] group cursor-pointer"
            >
              Start Assessment
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
