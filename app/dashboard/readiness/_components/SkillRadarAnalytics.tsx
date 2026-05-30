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
  Tooltip,
  Cell,
} from "recharts";
import { Target, TrendingUp, BarChart3, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

import { AssessmentAnalyticsCategory } from "@/lib/api";

interface SkillRadarAnalyticsProps {
  categories?: AssessmentAnalyticsCategory[];
  overallScore?: number;
}

export const SkillRadarAnalytics = ({
  categories = [],
  overallScore = 0,
}: SkillRadarAnalyticsProps) => {
  // Format radar data
  const radarData = categories.slice(0, 6).map((c) => ({
    subject: c.name.split(" ")[0], // Keep name short for radar axes
    A: c.score,
    fullMark: 100,
  }));

  // Format distribution data
  const distributionData = categories.slice(0, 6).map((c) => ({
    name: c.slug.replace("cat-", "").substring(0, 3).toUpperCase(),
    value: c.score,
  }));

  // Calculate matching target: how many categories are close to or exceed required scores
  const metRequiredCount = categories.filter(
    (c) => c.score >= c.required,
  ).length;
  const matchPercentage =
    categories.length > 0
      ? Math.round((metRequiredCount / categories.length) * 100)
      : 0;

  // Key focus areas to list
  const topFocusSkills = categories.slice(0, 3).map((c) => {
    let color = "bg-emerald-500";
    if (c.status === "gap") color = "bg-rose-500";
    else if (c.status === "moderate") color = "bg-amber-500";

    return {
      label: c.name,
      value: c.score,
      color,
    };
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 md:gap-4">
      {/* Skill Radar Card */}
      <div className="xl:col-span-5 bg-white p-5 md:p-7 rounded-[20px] border border-slate-200/60 flex flex-col">
        <div className="mb-1.5">
          <h3 className="text-[14px] font-semibold text-slate-800 font-poppins tracking-tight">
            Skill Radar
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            Based on active skills assessment
          </p>
        </div>

        <div className="flex-1 min-h-[220px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#64748B", fontSize: 10, fontWeight: 600 }}
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
                {Math.round(overallScore)}%
              </h4>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#066EFF] to-[#4F46E5] rounded-full"
                style={{ width: `${overallScore}%` }}
              />
            </div>
            <p className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Real-time core capability index
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
                Market Target Match
              </p>
              <h4 className="text-[20px] font-semibold text-slate-800 font-poppins">
                {matchPercentage}%
              </h4>
            </div>
          </div>
          <div className="space-y-4">
            {topFocusSkills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                  <span className="truncate max-w-[120px]">{skill.label}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full animate-all duration-500",
                      skill.color,
                    )}
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
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={24}>
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
              Strengths & Gaps Status
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Strong Skills",
                current: categories.filter((c) => c.status === "strong").length,
                total: categories.length,
                color: "bg-[#066EFF]",
              },
              {
                label: "Moderate Capabilities",
                current: categories.filter((c) => c.status === "moderate")
                  .length,
                total: categories.length,
                color: "bg-amber-500",
              },
              {
                label: "Improvement Gaps",
                current: categories.filter((c) => c.status === "gap").length,
                total: categories.length,
                color: "bg-rose-500",
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
                    style={{
                      width:
                        item.total > 0
                          ? `${(item.current / item.total) * 100}%`
                          : "0%",
                    }}
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
