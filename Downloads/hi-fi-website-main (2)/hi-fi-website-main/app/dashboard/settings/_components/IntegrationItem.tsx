import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationItemProps {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: string;
  statusText: string;
  indicatorColor: string;
}

export const IntegrationItem = ({
  name,
  description,
  icon: Icon,
  status,
  statusText,
  indicatorColor,
}: IntegrationItemProps) => {
  return (
    <div className="p-5 md:p-6 bg-white rounded-[22px] border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all hover:shadow-lg hover:shadow-slate-200/20 cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-50 group-hover:bg-white group-hover:shadow-inner transition-all">
          <Icon className="w-8 h-8 md:w-9 md:h-9 text-slate-800" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h4 className="text-[16px] md:text-[17px] font-bold text-slate-900 font-poppins leading-none">
              {name}
            </h4>
            <div className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full",
              indicatorColor
            )}>
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                status === "connected" ? "bg-emerald-500" : status === "disconnected" ? "bg-red-500" : "bg-slate-400"
              )} />
              <span className="text-[11px] font-bold tracking-tight uppercase">
                {statusText}
              </span>
            </div>
          </div>
          <p className="text-[13px] md:text-[14px] text-slate-400 font-medium font-poppins leading-snug">
            {description}
          </p>
        </div>
      </div>

      <button className="text-slate-300 group-hover:text-[#066EFF] group-hover:translate-x-1 transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
