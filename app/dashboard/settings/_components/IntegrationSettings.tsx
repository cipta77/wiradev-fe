"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { NotionIcon } from "@/components/icons/NotionIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { IntegrationSummary } from "./IntegrationSummary";
import { IntegrationItem } from "./IntegrationItem";
import { useAuth } from "@/lib/auth-context";

export const IntegrationSettings = () => {
  const { user } = useAuth();
  const providers = user?.providers || [];

  const isGoogleConnected = providers.includes("google");
  const isGithubConnected = providers.includes("github");
  const isLinkedinConnected = providers.includes("linkedin");
  const isNotionConnected = providers.includes("notion");

  const integrations = [
    {
      id: "gdrive",
      name: "Google Drive",
      description: "Document storage & sync",
      icon: GoogleIcon,
      statusText: isGoogleConnected ? "Connected" : "Not Connected",
      status: isGoogleConnected ? "connected" : "not-connected",
      indicatorColor: isGoogleConnected ? "text-emerald-500 bg-emerald-50" : "text-slate-400 bg-slate-100/50",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Repository sync & project review",
      icon: GithubIcon,
      statusText: isGithubConnected ? (user?.username ? `@${user.username}` : "Connected") : "Not Connected",
      status: isGithubConnected ? "connected" : "not-connected",
      indicatorColor: isGithubConnected ? "text-emerald-600 bg-emerald-50 font-semibold" : "text-slate-400 bg-slate-100/50",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Profile sync & job matching",
      icon: LinkedinIcon,
      statusText: isLinkedinConnected ? "Connected" : "Not Connected",
      status: isLinkedinConnected ? "connected" : "not-connected",
      indicatorColor: isLinkedinConnected ? "text-emerald-500 bg-emerald-50" : "text-slate-400 bg-slate-100/50",
    },
    {
      id: "notion",
      name: "Notion",
      description: "Notes & project documentation",
      icon: NotionIcon,
      statusText: isNotionConnected ? "Connected" : "Disconnected",
      status: isNotionConnected ? "connected" : "disconnected",
      indicatorColor: isNotionConnected ? "text-emerald-500 bg-emerald-50" : "text-red-500 bg-red-50",
    },
  ];

  const connectedCount = integrations.filter((i) => i.status === "connected").length;
  const disconnectedCount = integrations.filter((i) => i.status === "disconnected").length;
  const notConnectedCount = integrations.filter((i) => i.status === "not-connected").length;

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

      <IntegrationSummary 
        connectedCount={connectedCount} 
        disconnectedCount={disconnectedCount} 
        notConnectedCount={notConnectedCount} 
      />

      {/* Integration List */}
      <div className="space-y-4 w-full">
        {integrations.map((item) => (
          <IntegrationItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
