"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  Clock, 
  Play, 
  CheckCircle2, 
  Target, 
  FileText, 
  Loader2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMiniProjects } from "@/hooks/use-mini-projects";

import { MiniProjectWithSubmission, UserMiniProjectSubmission } from "@/lib/api";

interface ProjectDetailViewProps {
  project: MiniProjectWithSubmission;
  submission: UserMiniProjectSubmission | null;
  onBack: () => void;
}

const levelConfigs = {
  Beginner: "bg-teal-50 text-teal-600 border border-teal-100",
  Intermediate: "bg-blue-50 text-[#066EFF] border border-blue-100",
  Advanced: "bg-red-50 text-red-600 border border-red-100",
};

const statusConfigs = {
  not_started: { label: "Belum Mulai", className: "bg-slate-100 text-slate-500" },
  in_progress: { label: "Sedang Berjalan", className: "bg-amber-50 text-amber-600 border border-amber-100" },
  submitted: { label: "Sedang Direview AI", className: "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse" },
  reviewed: { label: "Selesai Direview", className: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
};

export const ProjectDetailView = ({ project, submission, onBack }: ProjectDetailViewProps) => {
  const router = useRouter();
  const { startProject } = useMiniProjects();
  const [starting, setStarting] = useState(false);

  const status = submission?.status || "not_started";
  const currentStatus = statusConfigs[status as keyof typeof statusConfigs] || statusConfigs.not_started;

  const handleStartProject = async () => {
    if (status !== "not_started") {
      router.push(`/dashboard/dev-hub/${project.id}/project`);
      return;
    }

    setStarting(true);
    try {
      const res = await startProject(project.id);
      if (res) {
        router.push(`/dashboard/dev-hub/${project.id}/project`);
      }
    } catch (err) {
      console.error("Failed to start project:", err);
    } finally {
      setStarting(false);
    }
  };

  const getActionButton = () => {
    if (status === "reviewed") {
      return {
        label: "Lihat Hasil Evaluasi",
        icon: CheckCircle2,
        bg: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/10",
        disabled: false
      };
    }
    if (status === "submitted") {
      return {
        label: "Sedang Direview AI...",
        icon: Loader2,
        bg: "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed",
        disabled: true
      };
    }
    if (status === "in_progress") {
      return {
        label: "Lanjutkan Pengerjaan",
        icon: Play,
        bg: "bg-[#066EFF] hover:bg-[#0559d1] shadow-blue-600/10",
        disabled: false
      };
    }
    return {
      label: starting ? "Memulai Proyek..." : "Mulai Proyek",
      icon: starting ? Loader2 : Play,
      bg: "bg-[#066EFF] hover:bg-[#0559d1] shadow-blue-600/10",
      disabled: starting
    };
  };

  const action = getActionButton();

  // Parsing JSON arrays safely
  const relatedSkills: string[] = Array.isArray(project.related_skills) 
    ? project.related_skills 
    : typeof project.related_skills === 'string'
      ? JSON.parse(project.related_skills)
      : [];

  const evaluationCriteria: string[] = Array.isArray(project.evaluation_criteria)
    ? project.evaluation_criteria
    : typeof project.evaluation_criteria === 'string'
      ? JSON.parse(project.evaluation_criteria)
      : [];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-semibold text-[13px] mb-8 group transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Development Hub
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card Overview */}
          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 md:p-7 shadow-sm shadow-slate-200/5">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", levelConfigs[project.level])}>
                {project.level}
              </span>
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", currentStatus.className)}>
                {currentStatus.label}
              </span>
            </div>
            <h1 className="text-[22px] md:text-[24px] font-bold text-[#0D3E9B] mb-3 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-500 text-[13.5px] md:text-[14px] font-medium leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Card Brief */}
          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#066EFF]" />
              </div>
              <h2 className="text-[15px] md:text-[16px] font-bold text-slate-800">
                Brief Proyek & Instruksi
              </h2>
            </div>
            <div className="text-slate-500 text-[13px] md:text-[14px] font-medium leading-relaxed pl-1 whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {project.brief}
            </div>
          </div>

          {/* Card Evaluation Criteria */}
          {evaluationCriteria.length > 0 && (
            <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-emerald-500" />
                </div>
                <h2 className="text-[15px] md:text-[16px] font-bold text-slate-800">
                  Kriteria Penilaian AI
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                {evaluationCriteria.map((criterion, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-[16px] bg-slate-50/30 border border-slate-100">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-emerald-600">{idx + 1}</span>
                    </div>
                    <span className="text-[12.5px] font-semibold text-slate-600 tracking-tight">
                      {criterion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 shadow-sm shadow-slate-200/5 space-y-6">
            <button 
              onClick={handleStartProject}
              disabled={action.disabled}
              className={cn(
                "w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl text-[13px] md:text-[14px] font-bold shadow-xl transition-all cursor-pointer",
                status === "submitted" ? "bg-slate-50 text-slate-400 border border-slate-200" : "text-white active:scale-[0.98]",
                status !== "submitted" && action.bg
              )}
            >
              {action.icon === Loader2 ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : (
                <action.icon className="w-4.5 h-4.5" />
              )}
              {action.label}
            </button>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-400">Estimasi Durasi</span>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[13px] font-bold">{project.duration}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-400">Tingkat Kesulitan</span>
                <span className="text-[13px] font-bold text-blue-600">{project.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-400">Keahlian Utama</span>
                <span className="text-[13px] font-bold text-slate-700">{project.tag}</span>
              </div>

              {status === "reviewed" && submission && submission.overall_score !== null && (
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="text-[12px] font-bold text-emerald-800">Skor Akhir AI</span>
                  </div>
                  <span className="text-[18px] font-extrabold text-emerald-600">{submission.overall_score}/100</span>
                </div>
              )}
            </div>

            {relatedSkills.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Keahlian Terkait</h4>
                <div className="flex flex-wrap gap-1.5">
                  {relatedSkills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-full bg-blue-50/50 text-[#066EFF] text-[10px] font-bold border border-blue-100/30 tracking-tight">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
