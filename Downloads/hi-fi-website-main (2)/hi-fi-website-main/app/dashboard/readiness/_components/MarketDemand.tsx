"use client";

import { TrendingUp } from "lucide-react";

interface MarketDemandItem {
  rank: number;
  skill: string;
  jobs: string;
  trend: number;
  barWidth: number;
}

const marketDemands: MarketDemandItem[] = [
  {
    rank: 1,
    skill: "React/Next.js",
    jobs: "12.4k jobs",
    trend: 92,
    barWidth: 92,
  },
  { rank: 2, skill: "TypeScript", jobs: "11.2k jobs", trend: 88, barWidth: 85 },
  {
    rank: 3,
    skill: "Python/AI/ML",
    jobs: "9.8k jobs",
    trend: 85,
    barWidth: 78,
  },
  { rank: 4, skill: "Cloud/AWS", jobs: "8.5k jobs", trend: 82, barWidth: 72 },
  { rank: 5, skill: "Docker/K8s", jobs: "7.2k jobs", trend: 78, barWidth: 65 },
];

const RankBadge = ({ rank }: { rank: number }) => (
  <div className="w-8 text-[14px] font-medium text-slate-400 font-poppins shrink-0">
    #{rank}
  </div>
);

const DemandBar = ({ width }: { width: number }) => (
  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-1000 ease-out"
      style={{
        width: `${width}%`,
        background: "linear-gradient(90deg, #066EFF 0%, #10B981 100%)",
      }}
    />
  </div>
);

const TrendIndicator = ({ trend }: { trend: number }) => (
  <div className="flex items-center gap-1">
    <TrendingUp className="w-3 h-3 text-[#10B981]" />
    <span className="text-[12px] font-medium text-[#10B981] tracking-tight">{trend}%</span>
  </div>
);

const MarketDemandRow = ({ item }: { item: MarketDemandItem }) => (
  <div className="p-3 md:p-4 rounded-[12px] bg-[#F8FAFC]/60 border border-slate-50 transition-all duration-300 hover:bg-[#F8FAFC] group">
    <div className="flex items-center gap-2">
      <RankBadge rank={item.rank} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[13px] md:text-[14px] font-medium text-slate-800 font-poppins leading-none truncate group-hover:text-[#066EFF] transition-colors">
            {item.skill}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[11px] md:text-[12px] text-slate-400 font-medium whitespace-nowrap">
              {item.jobs}
            </span>
            <TrendIndicator trend={item.trend} />
          </div>
        </div>

        <DemandBar width={item.barWidth} />
      </div>
    </div>
  </div>
);

export const MarketDemand = () => {
  return (
    <div
      className="bg-white p-5 md:p-7 rounded-[20px] border border-[#E8ECF0]"
    >
      <div className="mb-5 px-1">
        <h2 className="text-[15px] md:text-[17px] font-semibold text-slate-800 font-poppins tracking-tight">
          Market Demand Insights
        </h2>
      </div>

      <div className="space-y-2">
        {marketDemands.map((item) => (
          <MarketDemandRow key={item.rank} item={item} />
        ))}
      </div>
    </div>
  );
};
