"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Code2, Briefcase, FileText, ChevronRight, Sparkles, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardActivity } from "@/lib/api";
import { getRecentPages } from "@/lib/recent-activity";

const typeStyles = {
  project: { icon: Code2, iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
  simulation: { icon: Briefcase, iconBg: "bg-amber-50", iconColor: "text-amber-500" },
  review: { icon: FileText, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
  page: { icon: LayoutDashboard, iconBg: "bg-blue-50", iconColor: "text-blue-500" },
} as const;

const typeRoutes = {
  project: "/dashboard/dev-hub",
  simulation: "/dashboard/simulation",
  review: "/dashboard/dev-hub",
  page: "/dashboard",
} as const;

type CardItem = DashboardActivity & { route?: string };

export const ContinueWorkingCard = ({ activities = [] }: { activities?: DashboardActivity[] }) => {
  const router = useRouter();
  const [items, setItems] = useState<CardItem[]>(activities);

  useEffect(() => {
    // Recently visited pages first, then DB-backed activities (deduped by title).
    const recent: CardItem[] = getRecentPages().map((p) => ({
      type: (p.type in typeStyles ? p.type : "page") as CardItem["type"],
      title: p.title,
      status: "Recently visited",
      progress: null,
      refId: null,
      route: p.route,
    }));
    const titles = new Set(recent.map((r) => r.title));
    setItems([...recent, ...activities.filter((a) => !titles.has(a.title))].slice(0, 4));
  }, [activities]);

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

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-slate-300" />
          </div>
          <p className="text-[12px] text-slate-400 font-medium px-4">
            Nothing in progress yet. Start a project or simulation to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const style = typeStyles[item.type] ?? typeStyles.project;
            const Icon = style.icon;
            return (
              <div
                key={`${item.type}-${item.refId}-${item.title}`}
                onClick={() => router.push(item.route ?? typeRoutes[item.type] ?? "/dashboard/dev-hub")}
                className="group flex flex-col gap-2 p-3 rounded-[16px] border border-slate-50 bg-[#F8FAFC] hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0",
                        style.iconBg
                      )}
                    >
                      <Icon className={cn("w-4.5 h-4.5", style.iconColor)} />
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
                {item.progress != null && (
                  <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
