"use client";

import React, { useState } from "react";
import { SettingsSidebar } from "./_components/SettingsSidebar";
import { AccountSettings } from "./_components/AccountSettings";
import { PasswordSecuritySettings } from "./_components/PasswordSecuritySettings";
import { NotificationSettings } from "./_components/NotificationSettings";
import { AppearanceSettings } from "./_components/AppearanceSettings";
import { IntegrationSettings } from "./_components/IntegrationSettings";
import { SupportSettings } from "./_components/SupportSettings";
import { SettingsEmptyState } from "./_components/SettingsEmptyState";
import { useLanguage } from "@/lib/i18n";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const { t } = useLanguage();

  const getTabLabel = (id: string) => {
    const keys: Record<string, string> = {
      account: "settings.account",
      security: "settings.security",
      notifications: "settings.notifications",
      appearance: "settings.appearance",
      integrations: "settings.integrations",
      support: "settings.support",
    };
    return keys[id] ? t(keys[id]) : id;
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8 lg:pb-5 space-y-2 md:space-y-4">
        <h1 className="text-[24px] md:text-[28px] font-semibold text-slate-900 font-poppins">
          {t("settings.title")}
        </h1>
        <p className="text-[14px] md:text-[15px] text-slate-400 font-normal font-poppins">
          {t("settings.subtitle")}
        </p>
      </div>

      <div className="p-4 md:p-6 lg:p-8 lg:pt-0 pb-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div
          className="flex-1 bg-white rounded-[24px] min-w-0 w-full lg:w-auto transition-all hover:shadow-xl hover:shadow-slate-200/20"
          style={{ border: "1.2px solid #F1F5F9" }}
        >
          {activeTab === "account" ? (
            <AccountSettings />
          ) : activeTab === "security" ? (
            <PasswordSecuritySettings />
          ) : activeTab === "notifications" ? (
            <NotificationSettings />
          ) : activeTab === "appearance" ? (
            <AppearanceSettings />
          ) : activeTab === "integrations" ? (
            <IntegrationSettings />
          ) : activeTab === "support" ? (
            <SupportSettings />
          ) : (
            <SettingsEmptyState title={getTabLabel(activeTab)} />
          )}
        </div>
      </div>
    </div>
  );
}
