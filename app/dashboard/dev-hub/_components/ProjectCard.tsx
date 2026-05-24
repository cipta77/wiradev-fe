import Link from "next/link";
import { Clock, Play, CheckCircle2, ArrowRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "Not Started" | "In Progress" | "Completed";
  duration: string;
  tag: string;
  progress?: number;
}

const levelConfigs = {
  Beginner: "bg-teal-50 text-teal-600",
  Intermediate: "bg-blue-50 text-blue-600",
  Advanced: "bg-red-50 text-red-600",
};

const statusConfigs = {
  "Not Started": "bg-slate-100/80 text-slate-400",
  "In Progress": "bg-orange-50 text-orange-500",
  Completed: "bg-emerald-50 text-emerald-500",
};

export const ProjectCard = ({
  id,
  title,
  description,
  level,
  status,
  duration,
  tag,
  progress,
}: ProjectCardProps) => {
  return (
    <div className="bg-white p-5 rounded-[18px] border border-[#F1F5F9] transition-all shadow-sm shadow-slate-200/5 hover:border-[#066EFF]/30" style={{ border: '1.2px solid #F1F5F9' }}>
      <div className="flex flex-col h-full gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1.5">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-semibold",
                levelConfigs[level],
              )}
            >
              {level}
            </span>
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-[10px] font-semibold",
                statusConfigs[status],
              )}
            >
              {status}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">
              {duration}
            </span>
          </div>
        </div>

        <div className="space-y-1 flex-1">
          <h3 className="text-[14px] font-poppins font-semibold text-[#0F172A] tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-[12px] text-slate-400 font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="bg-slate-50 text-slate-400 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-slate-100">
            {tag}
          </span>
        </div>

        <div className="mt-auto space-y-4">
        {(progress !== undefined || status === "Completed") && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[12px] font-medium">
              <span className="text-slate-400">Progress</span>
              <span className="text-[#066EFF] font-bold">{progress ?? 100}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#066EFF] rounded-full transition-all duration-1000"
                style={{ width: `${progress ?? 100}%` }}
              />
            </div>
          </div>
        )}

          <Link href={`/dashboard/dev-hub/${id}`} className="block">
            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[13px] font-semibold bg-white text-slate-500 transition-all cursor-pointer border border-slate-200 hover:border-[#066EFF] hover:text-[#066EFF] hover:bg-slate-50/50 shadow-none"
            >
              {status === "Completed" ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-400 group-hover:text-[#066EFF]" />
                  <span>View Results</span>
                </>
              ) : status === "In Progress" ? (
                <>
                  <Play className="w-4 h-4 text-slate-400 group-hover:text-[#066EFF]" />
                  <span>Continue</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-slate-400 group-hover:text-[#066EFF]" />
                  <span>Start</span>
                </>
              )}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
