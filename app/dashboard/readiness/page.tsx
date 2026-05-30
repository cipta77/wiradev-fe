"use client";

import React, { useState } from "react";
import { ReadinessHeader } from "./_components/ReadinessHeader";
import { ReadinessTabs } from "./_components/ReadinessTabs";
import { StatsCards } from "./_components/StatsCards";
import { AnalysisCards } from "./_components/AnalysisCards";
import { SkillMap } from "./_components/SkillMap";
import { SkillRadarAnalytics } from "./_components/SkillRadarAnalytics";
import { SkillGap } from "./_components/SkillGap";
import { MarketDemand } from "./_components/MarketDemand";
import { InitialTest } from "./_components/InitialTest";
import { CVScreening } from "./_components/CVScreening";
import { useAssessmentAnalytics } from "@/hooks/useAssessmentAnalytics";
import { NoAssessmentState } from "./_components/NoAssessmentState";

export default function ReadinessCenterPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAssessing, setIsAssessing] = useState(false);
  const { data: analytics, loading, hasAssessment, refresh } = useAssessmentAnalytics();

  const handleTestComplete = (tab: string) => {
    setActiveTab(tab);
    setIsAssessing(false);
    refresh();
  };

  const isAnalyticsTab = ["overview", "skill-map", "skill-gap", "market-demand"].includes(activeTab);

  return (
    <div id="readiness-scroll" className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5">
        {!isAssessing && (
          <>
            <ReadinessHeader />
            <ReadinessTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}

        {loading && !isAssessing ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#066EFF] rounded-full animate-spin" />
          </div>
        ) : isAssessing ? (
          <InitialTest 
            isStarted={true} 
            onBack={() => setIsAssessing(false)} 
            onTabChange={handleTestComplete}
          />
        ) : !hasAssessment && isAnalyticsTab ? (
          <NoAssessmentState onAction={() => setActiveTab("initial-test")} />
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <StatsCards data={analytics || undefined} />
                <AnalysisCards onTabChange={setActiveTab} />
              </div>
            )}

            {activeTab === "skill-map" && (
              <div className="space-y-5">
                <SkillMap categories={analytics?.categories} />
                <SkillRadarAnalytics categories={analytics?.categories} overallScore={analytics?.overall_score} />
              </div>
            )}

            {activeTab === "skill-gap" && <SkillGap />}

            {activeTab === "market-demand" && <MarketDemand />}

            {activeTab === "initial-test" && (
              <InitialTest onStart={() => setIsAssessing(true)} onTabChange={handleTestComplete} />
            )}

            {activeTab === "cv-screening" && <CVScreening onTabChange={setActiveTab} />}
          </>
        )}
      </div>
    </div>
  );
}
