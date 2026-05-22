"use client";

import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { NotionIcon } from "@/components/icons/NotionIcon";
import { IntegrationSummary } from "./IntegrationSummary";
import { IntegrationItem } from "./IntegrationItem";

const integrations = [
  {
    id: "github",
    name: "GitHub",
    description: "Repository analysis & code review",
    icon: GithubIcon,
    statusText: "Connected",
    status: "connected",
    indicatorColor: "text-emerald-500 bg-emerald-50",
  },
  {
    id: "gdrive",
    name: "Google Drive",
    description: "Document storage & sync",
    icon: GoogleIcon,
    statusText: "Connected",
    status: "connected",
    indicatorColor: "text-emerald-500 bg-emerald-50",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Profile sync & job matching",
    icon: LinkedinIcon,
    statusText: "Not Connected",
    status: "not-connected",
    indicatorColor: "text-slate-400 bg-slate-100/50",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Notes & project documentation",
    icon: NotionIcon,
    statusText: "Disconnected",
    status: "disconnected",
    indicatorColor: "text-red-500 bg-red-50",
  },
];

export const IntegrationSettings = () => {
  return (
    <div className="p-5 md:p-8 space-y-6 md:space-y-8 w-full">
      {/* Header */}
      <div className="space-y-1 px-0.5">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins">
          Integrations & Status
        </h2>
        <p className="text-[13px] md:text-[14px] text-slate-400 font-normal font-poppins">
          Manage connected services and view connection status
        </p>
      </div>

      <IntegrationSummary />

      {/* Integration List */}
      <div className="space-y-4 w-full">
        {integrations.map((item) => (
          <IntegrationItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
