"use client";

import React from "react";
import { DevHubHeader } from "./_components/DevHubHeader";
import { ProjectGrid } from "./_components/ProjectGrid";

export default function DevHubPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <DevHubHeader />
        <ProjectGrid />
      </div>
    </div>
  );
}
