"use client";

import { useEffect, useState } from "react";
import { ReadinessScoreCard } from "./_components/ReadinessScoreCard";
import { GrowthProgressCard } from "./_components/GrowthProgressCard";
import { QuickActionsCard } from "./_components/QuickActionsCard";
import { SkillsNeedAttentionCard } from "./_components/SkillsNeedAttentionCard";
import { ContinueWorkingCard } from "./_components/ContinueWorkingCard";
import { RecentAchievementsCard } from "./_components/RecentAchievementsCard";
import { WelcomeSection } from "./_components/WelcomeSection";
import { getDashboardSummary, type DashboardSummary } from "@/lib/api";

const fallbackSummary: DashboardSummary = {
  name: "Alex",
  role: "Career Seeker",
  initials: "AR",
  streak: 3,
  readinessScore: 62,
  readinessTrend: "+8%",
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>(fallbackSummary);

  useEffect(() => {
    getDashboardSummary()
      .then((data) => setSummary(data))
      .catch((error) => {
        console.error("Failed to load dashboard summary:", error);
      });
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5">
        <WelcomeSection name={summary.name} streak={summary.streak} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-4">
          <div className="lg:col-span-5 min-h-[220px] md:min-h-[240px]">
            <ReadinessScoreCard
              score={summary.readinessScore}
              trend={summary.readinessTrend}
            />
          </div>

          <div className="lg:col-span-7 min-h-[220px] md:min-h-[240px]">
            <GrowthProgressCard />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
          <SkillsNeedAttentionCard />
          <ContinueWorkingCard />
          <RecentAchievementsCard />
        </div>
      </div>
    </div>
  );
}
