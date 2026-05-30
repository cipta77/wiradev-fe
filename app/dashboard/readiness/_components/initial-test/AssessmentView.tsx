import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Layers,
  Zap,
  Loader2
} from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssessmentCategories } from "@/lib/api";

interface AssessmentViewProps {
  onStart: () => void;
  onBack?: () => void;
}

interface DynamicCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({ onStart, onBack }) => {
  const [categories, setCategories] = useState<DynamicCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await getAssessmentCategories();
        // Backend returns standard wrap response { success: true, result: [...] }
        const result = Array.isArray(data) ? data : data?.result || [];
        setCategories(result);
      } catch (err) {
        console.error("Failed to load assessment metadata:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCats();
  }, []);

  const themeColors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 bg-blue-500",
    purple: "text-purple-600 bg-purple-50 bg-purple-500",
    emerald: "text-emerald-600 bg-emerald-50 bg-emerald-500",
    orange: "text-orange-600 bg-orange-50 bg-orange-500",
  };

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
              A structured assessment personalized across your core role requirements
            </p>
          </div>
        </div>

        <div className="px-6 md:px-8 py-6 md:py-8">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { label: `${categories.length * 5} Tasks`, icon: BookOpen, color: "text-blue-600 bg-blue-50/50 border-blue-100" },
              { label: `~${categories.length * 7} min`, icon: Clock, color: "text-emerald-600 bg-emerald-50/50 border-emerald-100" },
              { label: `${categories.length} Sections`, icon: Layers, color: "text-amber-600 bg-amber-50/50 border-amber-100" },
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
            
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-8 h-8 text-[#066EFF] animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {categories.map((section) => {
                  const iconKey = section.icon as keyof typeof Icons;
                  const Icon = (Icons[iconKey] as Icons.LucideIcon) || Icons.Layers;
                  const sectionColor = section.color || "blue";
                  
                  return (
                    <div 
                      key={section.id}
                      className="bg-[#F8FAFC]/50 p-4 md:p-5 rounded-[18px] border border-slate-50 flex items-center justify-between group transition-all hover:bg-[#F8FAFC]"
                    >
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0", 
                          sectionColor === "blue" ? "text-blue-600 bg-blue-50" :
                          sectionColor === "purple" ? "text-purple-600 bg-purple-50" :
                          sectionColor === "emerald" ? "text-emerald-600 bg-emerald-50" : "text-orange-600 bg-orange-50"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[14px] font-semibold text-slate-800 font-poppins mb-1">
                            {section.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-normal font-poppins">
                            5 dynamic MCQ &amp; Yes/No evaluation tasks
                          </p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full", 
                        sectionColor === "blue" ? "bg-blue-500" :
                        sectionColor === "purple" ? "bg-purple-500" :
                        sectionColor === "emerald" ? "bg-emerald-500" : "bg-orange-500"
                      )} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Comprehensive Evaluation Card */}
            <div className="mt-8 bg-amber-50/50 border border-amber-100 p-5 rounded-[20px] flex items-start gap-4">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-5 h-5 text-amber-600 fill-amber-600/10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[13px] font-semibold text-amber-800 font-poppins">Comprehensive evaluation</h4>
                <p className="text-[11px] text-amber-700/80 leading-relaxed font-medium font-poppins">
                  This test includes multiple choice and Yes/No questions to thoroughly and deterministically evaluate your skills.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onStart}
              disabled={loading || categories.length === 0}
              className="bg-[#066EFF] text-white w-full py-4 rounded-[14px] font-semibold text-[15px] flex items-center justify-center gap-2.5 hover:bg-[#0052cc] transition-all active:scale-[0.98] group cursor-pointer disabled:opacity-50"
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
