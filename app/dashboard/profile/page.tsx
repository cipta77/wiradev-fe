"use client";

import React from "react";
import { ProfileBanner } from "./_components/ProfileBanner";
import { SkillDetails } from "./_components/SkillDetails";
import { IntegrationsCard } from "./_components/IntegrationsCard";
import { DocumentsCard } from "./_components/DocumentsCard";
import { AchievementsCard } from "./_components/AchievementsCard";

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-7">
        <ProfileBanner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          <div className="lg:col-span-8 space-y-6 md:space-y-7">
            <SkillDetails />
          </div>

          <div className="lg:col-span-4 space-y-6 md:space-y-7">
            <IntegrationsCard />
            <DocumentsCard />
          </div>
        </div>

        <AchievementsCard />
      </div>
    </div>
  );
}
