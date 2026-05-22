"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  User,
  Lock,
  Bell,
  Languages,
  CreditCard,
  Share2,
  Shield,
  HelpCircle,
  LucideIcon,
  ChevronRight,
} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

const settingsTabs: Tab[] = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Password & Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Language & Appearance", icon: Languages },
  { id: "integrations", label: "Integrations", icon: Share2 },
  { id: "support", label: "Help & Support", icon: HelpCircle },
];

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const SettingsSidebar = ({
  activeTab,
  setActiveTab,
}: SettingsSidebarProps) => {
  return (
    <>
      <div className="lg:hidden w-full overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-4 md:mx-0 px-4 md:px-0">
        <div className="flex gap-4 border-b border-slate-100 w-full min-w-max px-2">
          {settingsTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 pb-4 text-[15px] font-medium transition-all relative shrink-0 cursor-pointer",
                  isActive ? "text-[#066EFF]" : "text-slate-400 hover:text-slate-600",
                )}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span className="font-poppins">{tab.label}</span>
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[3px] bg-[#066EFF] rounded-full transition-all duration-300 ease-out transform",
                    isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="hidden lg:flex w-[280px] bg-white rounded-[24px] overflow-hidden flex-col self-start shrink-0 sticky top-10"
        style={{ border: "1.2px solid #F1F5F9" }}
      >
        <div className="p-3 space-y-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3.5 px-4 py-3 rounded-[16px] transition-all duration-200 group cursor-pointer text-left",
                  isActive
                    ? "bg-blue-50 text-[#066EFF]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-600",
                )}
              >
                <div className="shrink-0 flex items-center justify-center w-5 h-5">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive
                        ? "text-[#066EFF]"
                        : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                </div>
                <span className="text-[15px] font-medium font-poppins">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
