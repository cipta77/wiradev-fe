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

export default function ReadinessCenterPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAssessing, setIsAssessing] = useState(false);

  return (
    <div id="readiness-scroll" className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5">
        {!isAssessing && (
          <>
            <ReadinessHeader />
            <ReadinessTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}

        {isAssessing ? (
          <InitialTest 
            isStarted={true} 
            onBack={() => setIsAssessing(false)} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setIsAssessing(false);
            }}
          />
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <StatsCards />
                <AnalysisCards onTabChange={setActiveTab} />
              </div>
            )}

            {activeTab === "skill-map" && (
              <div className="space-y-5">
                <SkillMap />
                <SkillRadarAnalytics />
              </div>
            )}

            {activeTab === "skill-gap" && <SkillGap />}

            {activeTab === "market-demand" && <MarketDemand />}

            {activeTab === "initial-test" && (
              <InitialTest onStart={() => setIsAssessing(true)} />
            )}

            {activeTab === "cv-screening" && <CVScreening onTabChange={setActiveTab} />}
          </>
        )}
      </div>
    </div>
  );
}
