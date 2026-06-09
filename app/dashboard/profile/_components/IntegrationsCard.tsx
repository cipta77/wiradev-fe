"use client";

import { Link2Off, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { NotionIcon } from "@/components/icons/NotionIcon";

export const IntegrationsCard = () => {
  const { user } = useAuth();
  const providers = user?.providers || [];

  const integrations = [
    {
      id: "google",
      name: "Google Drive",
      connected: providers.includes("google"),
      icon: (className?: string) => (
        <svg viewBox="0 0 48 48" className={className}>
          <path fill="#FFC107" d="M17 6h14l9 16H8l9-16z" />
          <path fill="#1976D2" d="M31 6l9 16-7 13-9-16 7-13z" />
          <path fill="#4CAF50" d="M40 22L33 35H15l7-13h18z" />
        </svg>
      ),
    },
    {
      id: "github",
      name: "GitHub",
      connected: providers.includes("github"),
      icon: (className?: string) => <GithubIcon className={className} />,
      username: providers.includes("github") ? user?.username : undefined,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      connected: providers.includes("linkedin"),
      icon: (className?: string) => <LinkedinIcon className={className} />,
    },
    {
      id: "notion",
      name: "Notion",
      connected: providers.includes("notion"),
      icon: (className?: string) => <NotionIcon className={className} />,
    },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">Integrations</h3>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {integrations.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-[16px] flex items-center justify-between border transition-all ${
              item.connected
                ? "bg-emerald-50/10 border-emerald-100/80 shadow-xs"
                : "bg-slate-50/30 border-dashed border-slate-200 opacity-70"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm animate-in zoom-in-95">
                {item.icon("w-5 h-5")}
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">
                  {item.name}
                </p>
                <p className={`text-[11px] font-medium ${item.connected ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                  {item.connected
                    ? item.username
                      ? `@${item.username}`
                      : "Connected"
                    : "Not connected"}
                </p>
              </div>
            </div>
            {item.connected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Link2Off className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
