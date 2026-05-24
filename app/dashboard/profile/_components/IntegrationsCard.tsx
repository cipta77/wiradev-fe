"use client";

import { ExternalLink, Link2Off } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { useAuth } from "@/lib/auth-context";

export const IntegrationsCard = () => {
  const { user } = useAuth();

  const isGithubConnected = !!user?.github_connected;

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">Integrations</h3>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {/* GitHub */}
        <div
          className={`p-3 rounded-[16px] flex items-center justify-between border transition-all ${
            isGithubConnected
              ? "bg-slate-50/50 border-slate-100 hover:border-blue-100 cursor-pointer group"
              : "bg-slate-50/30 border-dashed border-slate-200 opacity-70"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
              <GithubIcon className="w-4.5 h-4.5 text-slate-700" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-800">GitHub</p>
              {isGithubConnected ? (
                <p className="text-[11px] text-emerald-500 font-semibold">
                  Connected
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 font-medium">
                  Not connected
                </p>
              )}
            </div>
          </div>
          {isGithubConnected ? (
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          ) : (
            <Link2Off className="w-3.5 h-3.5 text-slate-300" />
          )}
        </div>

        {/* Google Drive - not in API, show as not connected */}
        <div className="p-3 bg-slate-50/30 rounded-[16px] flex items-center justify-between border border-dashed border-slate-200 opacity-70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
              <svg viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#FFC107" d="M17 6h14l9 16H8l9-16z" />
                <path fill="#1976D2" d="M31 6l9 16-7 13-9-16 7-13z" />
                <path fill="#4CAF50" d="M40 22L33 35H15l7-13h18z" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-800">
                Google Drive
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                Not connected
              </p>
            </div>
          </div>
          <Link2Off className="w-3.5 h-3.5 text-slate-300" />
        </div>
      </div>
    </div>
  );
};
