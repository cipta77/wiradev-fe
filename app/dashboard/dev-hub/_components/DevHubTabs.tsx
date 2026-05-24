"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DevHubTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: "mini-projects", label: "Mini Projects" },
  { id: "ai-code-review", label: "AI Code Review" },
];

export const DevHubTabs = ({ activeTab, setActiveTab }: DevHubTabsProps) => {
  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-4 md:mx-0 px-4 md:px-0 mt-0 mb-2 md:mb-6">
      <div className="flex gap-2 border-b border-slate-100 w-full min-w-max px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 pb-3 text-[14px] font-medium transition-all relative shrink-0 cursor-pointer",
                isActive ? "text-[#066EFF]" : "text-slate-400 hover:text-slate-600",
              )}
            >
              <span className="font-poppins">{tab.label}</span>
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#066EFF] rounded-full transition-all duration-300 ease-out transform",
                  isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
