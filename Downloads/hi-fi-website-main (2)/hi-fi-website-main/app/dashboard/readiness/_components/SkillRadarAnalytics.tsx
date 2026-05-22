"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Target, TrendingUp, BarChart3, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const radarData = [
  { subject: "JavaScript", A: 85, fullMark: 100 },
  { subject: "React", A: 75, fullMark: 100 },
  { subject: "Node.js", A: 60, fullMark: 100 },
  { subject: "SQL", A: 70, fullMark: 100 },
  { subject: "Testing", A: 45, fullMark: 100 },
  { subject: "TypeScript", A: 65, fullMark: 100 },
];

const distributionData = [
  { name: "JS", value: 85 },
  { name: "TS", value: 65 },
  { name: "React", value: 75 },
  { name: "Test", value: 45 },
  { name: "SQL", value: 70 },
  { name: "DevOps", value: 40 },
];

export const SkillRadarAnalytics = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 md:gap-4">
      {/* Skill Radar Card */}
      <div className="xl:col-span-5 bg-white p-5 md:p-7 rounded-[20px] border border-slate-200/60 flex flex-col">
        <div className="mb-1.5">
          <h3 className="text-[14px] font-semibold text-slate-800 font-poppins tracking-tight">
            Skill Radar
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            Based on assessment & GitHub analysis
          </p>
        </div>

        <div className="flex-1 min-h-[220px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#64748B", fontSize: 11, fontWeight: 600 }}
              />
              <Radar
                name="Skills"
                dataKey="A"
                stroke="#066EFF"
                strokeWidth={2}
                fill="#066EFF"
                fillOpacity={0.12}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Readiness Score Card */}
        <div className="bg-white p-5 md:p-6 rounded-[20px] border border-slate-200/60 flex flex-col gap-7">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <Target className="w-4.5 h-4.5 text-[#066EFF]" />
            </div>
            <div className="space-y-0">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                Readiness Score
              </p>
              <h4 className="text-[20px] font-semibold text-slate-800 font-poppins">
                62%
              </h4>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#066EFF] to-[#4F46E5] rounded-full"
                style={{ width: "62%" }}
              />
            </div>
            <p className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +8% from last month
            </p>
          </div>
        </div>

        {/* Market Demand Match Card */}
        <div className="bg-white p-5 md:p-6 rounded-[20px] border border-slate-200/60 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
            </div>
            <div className="space-y-0">
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
                Market Demand Match
              </p>
              <h4 className="text-[20px] font-semibold text-slate-800 font-poppins">
                68%
              </h4>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "React.js", value: 85, color: "bg-emerald-500" },
              { label: "Testing", value: 45, color: "bg-emerald-500/40" },
              { label: "TypeScript", value: 60, color: "bg-emerald-500/70" },
            ].map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span>{skill.label}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full", skill.color)}
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Distribution Card */}
        <div className="bg-white p-5 md:p-6 rounded-[20px] border border-slate-200/60 flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4.5 h-4.5 text-violet-500" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
              Skill Distribution
            </p>
          </div>
          <div className="flex-1 min-h-[140px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={distributionData}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ fill: "#F8FAFC" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2.5 border border-slate-100 rounded-xl shadow-lg text-[11px] font-bold text-slate-800">
                          {payload[0].value}%
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                  {distributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#8B5CF6" : "#C4B5FD"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Improvement Progress Card */}
        <div className="bg-white p-5 md:p-6 rounded-[20px] border border-slate-200/60 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Lightbulb className="w-4.5 h-4.5 text-amber-500" />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">
              Improvement Progress
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Projects Done",
                current: 3,
                total: 5,
                color: "bg-[#066EFF]",
              },
              {
                label: "Skills Improved",
                current: 4,
                total: 6,
                color: "bg-emerald-500",
              },
              {
                label: "Simulations",
                current: 2,
                total: 4,
                color: "bg-amber-500",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span>{item.label}</span>
                  <span>
                    {item.current}/{item.total}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      item.color,
                    )}
                    style={{ width: `${(item.current / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
