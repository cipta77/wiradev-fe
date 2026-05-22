"use client";

import { cn } from "@/lib/utils";

interface SkillGapItem {
  skill: string;
  current: number;
  required: number;
  demand: string;
  priority: "Critical" | "High" | "Medium";
}

const skillGaps: SkillGapItem[] = [
  {
    skill: "System Design",
    current: 28,
    required: 70,
    demand: "High",
    priority: "Critical",
  },
  {
    skill: "Testing & QA",
    current: 35,
    required: 65,
    demand: "High",
    priority: "Critical",
  },
  {
    skill: "Docker/DevOps",
    current: 30,
    required: 60,
    demand: "Very High",
    priority: "High",
  },
  {
    skill: "TypeScript",
    current: 45,
    required: 75,
    demand: "Very High",
    priority: "High",
  },
  {
    skill: "Database Design",
    current: 42,
    required: 70,
    demand: "Medium",
    priority: "Medium",
  },
];

const PriorityBadge = ({ priority }: { priority: string }) => {
  const configs = {
    Critical: "bg-red-50 text-red-500",
    High: "bg-orange-50 text-orange-500",
    Medium: "bg-blue-50 text-blue-500",
  };
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mdium min-w-[70px] text-center uppercase tracking-tight",
        configs[priority as keyof typeof configs],
      )}
    >
      {priority}
    </span>
  );
};

const GapIndicator = ({
  current,
  required,
}: {
  current: number;
  required: number;
}) => {
  const gapWidth = Math.max(10, Math.min(40, (required - current) / 1.5));

  return (
    <div className="inline-flex h-1.5 w-10 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#EF4444] rounded-full transition-all duration-1000"
        style={{ width: `${gapWidth}%` }}
      />
    </div>
  );
};

const SkillGapRow = ({ item }: { item: SkillGapItem }) => (
  <tr className="transition-all duration-300 border-b-[0.8px] border-[#E8ECF0] hover:bg-[#F8FAFC]/50">
    <td className="py-2.5 px-4">
      <span className="text-[12px] md:text-[13px] font-medium text-slate-800 font-poppins whitespace-nowrap tracking-tight">
        {item.skill}
      </span>
    </td>
    <td className="py-2.5 px-4 text-center">
      <span className="text-[12px] md:text-[13px] font-mdium text-[#EF4444] font-poppins">
        {item.current}%
      </span>
    </td>
    <td className="py-2.5 px-4 text-center">
      <span className="text-[12px] md:text-[13px] font-mdium text-[#10B981] font-poppins">
        {item.required}%
      </span>
    </td>
    <td className="py-2.5 px-4">
      <GapIndicator current={item.current} required={item.required} />
    </td>
    <td className="py-2.5 px-4">
      <span className="text-[11px] md:text-[12px] text-slate-400 font-medium whitespace-nowrap">
        {item.demand}
      </span>
    </td>
    <td className="py-2.5 px-4">
      <PriorityBadge priority={item.priority} />
    </td>
  </tr>
);

export const SkillGap = () => {
  return (
    <div
      className="bg-white p-5 md:p-7 rounded-[20px] border border-[#E8ECF0]"
    >
      <div className="mb-5 px-1">
        <h2 className="text-[15px] md:text-[17px] font-mdium text-slate-800 font-poppins tracking-tight">
          Skill Gap Breakdown
        </h2>
      </div>

      <div className="overflow-x-auto rounded-[16px] border border-[#E8ECF0]">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="py-3 px-4 text-[11px] md:text-[12px] font-mdium text-slate-400 border-b border-[#E8ECF0] uppercase tracking-wider">
                Skill
              </th>
              <th className="py-3 px-4 text-[11px] md:text-[12px] font-mdium text-slate-400 border-b border-[#E8ECF0] uppercase tracking-wider text-center">
                Current
              </th>
              <th className="py-3 px-4 text-[11px] md:text-[12px] font-mdium text-slate-400 border-b border-[#E8ECF0] uppercase tracking-wider text-center">
                Required
              </th>
              <th className="py-3 px-4 text-[11px] md:text-[12px] font-mdium text-slate-400 border-b border-[#E8ECF0] uppercase tracking-wider">
                Gap
              </th>
              <th className="py-3 px-4 text-[11px] md:text-[12px] font-mdium text-slate-400 border-b border-[#E8ECF0] uppercase tracking-wider">
                Demand
              </th>
              <th className="py-3 px-4 text-[11px] md:text-[12px] font-mdium text-slate-400 border-b border-[#E8ECF0] uppercase tracking-wider">
                Priority
              </th>
            </tr>
          </thead>
          <tbody className="divide-[#E8ECF0]">
            {skillGaps.map((item) => (
              <SkillGapRow key={item.skill} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
