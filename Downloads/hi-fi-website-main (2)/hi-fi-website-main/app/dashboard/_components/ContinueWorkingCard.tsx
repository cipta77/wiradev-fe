"use client";

import { useRouter } from "next/navigation";
import { Play, Code2, Briefcase, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const workItems = [
  {
    title: "REST API with Express",
    status: "In Progress — Step 3 of 4",
    progress: 75,
    icon: Code2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    hasProgress: true,
  },
  {
    title: "Interview at Gojek",
    status: "Recruiter Simulation",
    icon: Briefcase,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    hasProgress: false,
  },
  {
    title: "AI Code Review",
    status: "Last review: 57/100",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    hasProgress: false,
  },
];

export const ContinueWorkingCard = () => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-[20px] p-4 md:p-6 h-full flex flex-col gap-4 transition-all shadow-sm shadow-slate-200/20"
      style={{ border: "1.2px solid #F1F5F9" }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
          <Play className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
        </div>
        <h3 className="text-[14px] font-semibold text-slate-700 tracking-tight font-poppins">
          Continue Working
        </h3>
      </div>

      <div className="space-y-3">
        {workItems.map((item) => (
          <div
            key={item.title}
            onClick={() => router.push("/dashboard/dev-hub")}
            className="group flex flex-col gap-2 p-3 rounded-[16px] border border-slate-50 bg-[#F8FAFC] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0",
                    item.iconBg
                  )}
                >
                  <item.icon className={cn("w-4.5 h-4.5", item.iconColor)} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-semibold text-slate-800 font-poppins tracking-tight truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-400 truncate">
                    {item.status}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400 transition-all" />
            </div>
            {item.hasProgress && (
              <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
