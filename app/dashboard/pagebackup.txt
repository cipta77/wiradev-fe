"use client";

import { ReadinessScoreCard } from "./_components/ReadinessScoreCard";
import { GrowthProgressCard } from "./_components/GrowthProgressCard";
import { QuickActionsCard } from "./_components/QuickActionsCard";
import { SkillsNeedAttentionCard } from "./_components/SkillsNeedAttentionCard";
import { ContinueWorkingCard } from "./_components/ContinueWorkingCard";
import { RecentAchievementsCard } from "./_components/RecentAchievementsCard";
import { WelcomeSection } from "./_components/WelcomeSection";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.first_name || "Developer";

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5">
        <WelcomeSection name={userName} streak={3} />


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-4">
          <div className="lg:col-span-5 min-h-[220px] md:min-h-[240px]">
            <ReadinessScoreCard score={62} trend="+8%" />
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
