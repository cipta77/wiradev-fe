"use client";

import React, { useState } from "react";
import { DevHubHeader } from "./_components/DevHubHeader";
import { DevHubTabs } from "./_components/DevHubTabs";
import { ProjectGrid } from "./_components/ProjectGrid";
import { AICodeReview } from "./_components/AICodeReview";

export default function DevHubPage() {
  const [activeTab, setActiveTab] = useState("mini-projects");

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-5">
        <DevHubHeader />

        <div className="flex justify-start">
          <DevHubTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="-mt-5.5">
          {activeTab === "mini-projects" ? <ProjectGrid /> : <AICodeReview />}
        </div>
      </div>
    </div>
  );
}
