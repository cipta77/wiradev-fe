"use client";

import React from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Target, 
  Award,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Layers,
  Star,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

import { MiniProject, UserMiniProjectSubmission } from "@/lib/api";

interface ProjectReviewResultProps {
  project: MiniProject;
  submission: UserMiniProjectSubmission;
  onBack: () => void;
}

export const ProjectReviewResult = ({ project, submission, onBack }: ProjectReviewResultProps) => {
  const score = submission?.overall_score || 0;
  
  // Determine score label and visual config
  const getScoreRating = (s: number) => {
    if (s >= 90) return { label: "EXCELLENT", color: "text-emerald-500", stroke: "text-emerald-500" };
    if (s >= 75) return { label: "GOOD", color: "text-[#066EFF]", stroke: "text-[#066EFF]" };
    if (s >= 60) return { label: "SATISFACTORY", color: "text-amber-500", stroke: "text-amber-500" };
    return { label: "NEEDS WORK", color: "text-rose-500", stroke: "text-rose-500" };
  };

  const rating = getScoreRating(score);

  // Parsing JSON fields safely
  const relatedSkills: string[] = Array.isArray(project.related_skills) 
    ? project.related_skills 
    : typeof project.related_skills === 'string'
      ? JSON.parse(project.related_skills)
      : [];

  const strengths: string[] = Array.isArray(submission.strengths) 
    ? submission.strengths 
    : typeof submission.strengths === 'string'
      ? JSON.parse(submission.strengths)
      : [];

  const improvements: string[] = Array.isArray(submission.improvements) 
    ? submission.improvements 
    : typeof submission.improvements === 'string'
      ? JSON.parse(submission.improvements)
      : [];

  const objectivesMet: { title: string; status: "success" | "warning" }[] = Array.isArray(submission.objectives_met) 
    ? submission.objectives_met 
    : typeof submission.objectives_met === 'string'
      ? JSON.parse(submission.objectives_met)
      : [];

  const successObjectives = objectivesMet.filter(o => o.status === "success").length;
  const totalObjectives = objectivesMet.length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 font-semibold text-[13px] group transition-all cursor-pointer bg-transparent border-none"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Detail Proyek
      </button>

      {/* Result Header Card */}
      <div className="bg-white rounded-[24px] border border-[#F1F5F9] overflow-hidden relative shadow-sm shadow-slate-200/5">
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#066EFF]" />
        
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5 flex-1">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[#066EFF]" />
            </div>
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#066EFF] uppercase tracking-widest">
                Ulasan Hasil Proyek
              </span>
              <h1 className="text-[20px] md:text-[22px] font-bold text-slate-900 tracking-tight leading-none">
                {project.title}
              </h1>
              <p className="text-slate-500 text-[13px] md:text-[13.5px] font-medium leading-relaxed max-w-2xl pl-0.5">
                {submission.ai_summary}
              </p>
            </div>
          </div>

          {/* Score Ring */}
          <div className="flex flex-col items-center gap-2 shrink-0 self-center md:self-auto bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="33" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                <circle
                  cx="40" cy="40" r="33"
                  stroke="currentColor" strokeWidth="6" fill="transparent"
                  strokeDasharray="207.3"
                  strokeDashoffset={207.3 * (1 - score / 100)}
                  strokeLinecap="round"
                  className={cn("transition-all duration-1000", rating.stroke)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[20px] font-extrabold text-slate-800 leading-none">{score}</span>
                <span className="text-[9px] font-bold text-slate-400">/100</span>
              </div>
            </div>
            <span className={cn("text-[10px] font-extrabold tracking-widest", rating.color)}>{rating.label}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-5 space-y-3.5 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-[12px] font-bold text-slate-400">Status Kelulusan</span>
          </div>
          <div className="space-y-2">
            <span className="text-[20px] font-extrabold text-slate-900">{score >= 60 ? "LULUS" : "REVISI"}</span>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full", score >= 60 ? "bg-emerald-500" : "bg-rose-500")} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-5 space-y-3.5 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#066EFF]" />
            <span className="text-[12px] font-bold text-slate-400">Sasaran Terpenuhi</span>
          </div>
          <div className="space-y-1">
            <span className="text-[20px] font-extrabold text-slate-900">
              {totalObjectives > 0 ? `${successObjectives}/${totalObjectives}` : "Selesai"}
            </span>
            <p className="text-[11px] text-slate-500 font-medium">Kriteria berhasil dicapai</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#F1F5F9] p-5 space-y-3.5 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-[12px] font-bold text-slate-400">Estimasi Durasi</span>
          </div>
          <div className="space-y-1">
            <span className="text-[20px] font-extrabold text-slate-900">{project.duration}</span>
            <p className="text-[11px] text-slate-500 font-medium">Untuk lingkup ini</p>
          </div>
        </div>
      </div>

      {/* Objectives / Milestones met */}
      {objectivesMet.length > 0 && (
        <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 space-y-5 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2.5">
            <Target className="w-4.5 h-4.5 text-[#066EFF]" />
            <h2 className="text-[14px] md:text-[15px] font-bold text-slate-800">Cakupan Evaluasi Kriteria</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {objectivesMet.map((item, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-[16px] border",
                  item.status === "success" 
                    ? "bg-emerald-50/20 border-emerald-100 text-emerald-700" 
                    : "bg-orange-50/20 border-orange-100 text-orange-600"
                )}
              >
                {item.status === "success" ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                )}
                <span className="text-[12.5px] font-bold tracking-tight">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 space-y-4 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2.5">
            <Star className="w-4.5 h-4.5 text-emerald-500" />
            <h3 className="text-[13.5px] md:text-[14.5px] font-bold text-slate-800">Kekuatan & Kelebihan</h3>
          </div>
          <div className="space-y-3 pl-0.5">
            {strengths.length > 0 ? (
              strengths.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-[12.5px] text-slate-500 font-medium leading-relaxed">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-[12px] font-medium italic">Tidak ada catatan kelebihan.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 space-y-4 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-4.5 h-4.5 text-amber-500" />
            <h3 className="text-[13.5px] md:text-[14.5px] font-bold text-slate-800">Rekomendasi Perbaikan</h3>
          </div>
          <div className="space-y-3 pl-0.5">
            {improvements.length > 0 ? (
              improvements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <span className="text-[12.5px] text-slate-500 font-medium leading-relaxed">{item}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-[12px] font-medium italic">Tidak ada catatan perbaikan.</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Skills */}
      {relatedSkills.length > 0 && (
        <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 space-y-4 shadow-sm shadow-slate-200/5">
          <div className="flex items-center gap-2.5">
            <Layers className="w-4.5 h-4.5 text-slate-500" />
            <h2 className="text-[14px] md:text-[15px] font-bold text-slate-800">Keahlian Yang Dipraktikkan</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedSkills.map(skill => (
              <span key={skill} className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#066EFF] text-[11px] font-bold border border-blue-100/50 tracking-tight">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Premium CTA Box */}
      <div className="bg-linear-to-r from-[#066EFF] to-[#4F46E5] rounded-[24px] p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg shadow-blue-600/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-widest">Langkah Rekomendasi Berikutnya</span>
            <h3 className="text-[16px] font-bold text-white">Terus Latih Keterampilan Anda</h3>
            <p className="text-[12.5px] text-blue-100 font-medium">Buka proyek mini lainnya untuk memperdalam dan mengasah keahlian Anda di bidang ini.</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="shrink-0 flex items-center gap-2 bg-white text-[#066EFF] px-5 py-2.8 rounded-xl text-[12.5px] font-bold hover:bg-blue-50 transition-all active:scale-[0.98] cursor-pointer"
        >
          Lihat Proyek Lainnya
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
