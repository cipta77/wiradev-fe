import React from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  label: string;
  count: number;
  sub: string;
  color: string;
  bgColor: string;
  borderColor: string;
  dotColor: string;
}

const summaryCards: SummaryCardProps[] = [
  {
    label: "Connected",
    count: 2,
    sub: "Active & syncing",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50/50",
    borderColor: "border-emerald-100/50",
    dotColor: "bg-emerald-500",
  },
  {
    label: "Disconnected",
    count: 1,
    sub: "Needs attention",
    color: "text-red-500",
    bgColor: "bg-red-50/50",
    borderColor: "border-red-100/50",
    dotColor: "bg-red-500",
  },
  {
    label: "Not Connected",
    count: 1,
    sub: "Available",
    color: "text-slate-500",
    bgColor: "bg-slate-50/50",
    borderColor: "border-slate-100/50",
    dotColor: "bg-slate-400",
  },
];

export const IntegrationSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className={cn(
            "p-5 rounded-[22px] border transition-all hover:shadow-md",
            card.bgColor,
            card.borderColor
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={cn("w-2 h-2 rounded-full", card.dotColor)} />
            <span className={cn("text-[13px] font-bold font-poppins", card.color)}>
              {card.label}
            </span>
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[28px] font-bold text-slate-900 font-poppins leading-none tracking-tight">
              {card.count}
            </h3>
            <p className="text-[13px] text-slate-400 font-medium font-poppins truncate">
              {card.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
