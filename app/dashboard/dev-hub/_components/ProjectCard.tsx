import Link from "next/link";
import { Clock, Play, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  submission_status: "not_started" | "in_progress" | "submitted" | "reviewed";
  duration: string;
  tag: string;
  overall_score?: number | null;
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

export const ProjectCard = ({
  id,
  title,
  description,
  level,
  submission_status,
  duration,
  tag,
  overall_score,
}: ProjectCardProps) => {
  const currentStatus = statusConfigs[submission_status] || statusConfigs.not_started;

  return (
    <div 
      className="bg-white p-5 rounded-[20px] transition-all shadow-sm hover:shadow-md hover:border-[#066EFF]/30 flex flex-col justify-between font-poppins relative overflow-hidden" 
      style={{ border: '1.2px solid #F1F5F9' }}
    >
      {/* Decorative gradient overlay for reviewed projects */}
      {submission_status === "reviewed" && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
      )}

      <div className="flex flex-col h-full gap-4.5">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1.5">
            <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-semibold", levelConfigs[level])}>
              {level}
            </span>
            <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-semibold", currentStatus.className)}>
              {currentStatus.label}
            </span>
          </div>
          <div className="flex items-center gap-1.2 text-slate-400 shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">
              {duration}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 flex-1">
          <h3 className="text-[14px] md:text-[15px] font-bold text-[#0F172A] tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-[12px] text-slate-400 font-medium leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center justify-between">
          <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-100">
            {tag}
          </span>

          {submission_status === "reviewed" && overall_score !== null && (
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg px-2 py-0.5">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span className="text-[11px] font-bold">Skor: {overall_score}/100</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-2">
          {submission_status === "submitted" ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] md:text-[13px] font-bold bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed"
            >
              <Loader2 className="w-4 h-4 animate-spin text-[#066EFF]" />
              <span>Menganalisis Kode & File...</span>
            </button>
          ) : (
            <Link href={`/dashboard/dev-hub/${id}`} className="block">
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] md:text-[13px] font-bold transition-all cursor-pointer border",
                  submission_status === "reviewed"
                    ? "bg-white text-emerald-600 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/20"
                    : submission_status === "in_progress"
                    ? "bg-[#066EFF]/5 text-[#066EFF] border-[#066EFF]/20 hover:bg-[#066EFF]/10"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#066EFF] hover:text-[#066EFF]"
                )}
              >
                {submission_status === "reviewed" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Lihat Hasil Evaluasi</span>
                  </>
                ) : submission_status === "in_progress" ? (
                  <>
                    <Play className="w-4 h-4 fill-current text-[#066EFF]" />
                    <span>Buka Proyek</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-slate-400 group-hover:text-[#066EFF]" />
                    <span>Mulai Proyek</span>
                  </>
                )}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
