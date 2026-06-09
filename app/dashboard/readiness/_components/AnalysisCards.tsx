"use client";

import React, { useState, useEffect } from "react";
import { FileText, BookOpen, Upload, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { useAuth } from "@/lib/auth-context";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

interface AnalysisCardsProps {
  onTabChange?: (tab: string) => void;
  onSyncComplete?: () => void;
}

export const AnalysisCards = ({ onTabChange, onSyncComplete }: AnalysisCardsProps) => {
  const { user, refreshProfile } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [githubUsernameInput, setGithubUsernameInput] = useState("");

  const githubUsername = user?.github_username;
  const githubScore = user?.github_readiness_score;
  const githubLanguages = user?.github_languages;
  const lastSynced = user?.github_last_synced_at;

  const isGithubConnected = !!githubUsername;

  // Listen to OAuth events if GitHub OAuth is used
  useEffect(() => {
    const handleOAuthMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "GITHUB_AUTH_CODE") {
        const { code } = event.data;
        setIsSyncing(true);
        try {
          await apiClient.post(`/api/users/${user?.id}/github/link`, { code });
          toast.success(`Successfully connected to GitHub!`);
          await refreshProfile();
          if (onSyncComplete) onSyncComplete();
        } catch (e: any) {
          toast.error(e.message || "Failed to link GitHub account.");
        } finally {
          setIsSyncing(false);
        }
      } else if (event.data?.type === "GITHUB_AUTH_SUCCESS") {
        const { username } = event.data;
        setIsSyncing(true);
        try {
          await apiClient.post(`/api/users/${user?.id}/github/sync`, { githubUsername: username });
          toast.success(`GitHub data synchronized successfully for @${username}!`);
          await refreshProfile();
          if (onSyncComplete) onSyncComplete();
        } catch (e: any) {
          toast.error(e.message || "Failed to synchronize GitHub data.");
        } finally {
          setIsSyncing(false);
        }
      } else if (event.data?.type === "GITHUB_AUTH_CANCEL") {
        toast.error("GitHub authorization cancelled.");
        setIsSyncing(false);
      }
    };

    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, [user, onSyncComplete, refreshProfile]);

  const handleSyncClick = () => {
    if (isGithubConnected) {
      // Direct sync
      triggerSync(githubUsername);
    } else {
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
      if (clientId) {
        // Run OAuth Flow
        setIsSyncing(true);
        const redirectUri = `${window.location.origin}/oauth-callback`;
        const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user,public_repo`;
        const width = 500;
        const height = 620;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
          oauthUrl,
          "GitHub Authorization",
          `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no`
        );
        if (!popup) {
          toast.error("Popup blocked! Please allow popups for this page.");
          setIsSyncing(false);
        }
      } else {
        // Open Manual Username Prompt Modal
        setIsModalOpen(true);
      }
    }
  };

  const triggerSync = async (username: string) => {
    setIsSyncing(true);
    const syncPromise = apiClient.post(`/api/users/${user?.id}/github/sync`, { githubUsername: username });

    toast.promise(syncPromise, {
      loading: `Syncing GitHub repositories for @${username}...`,
      success: () => {
        setIsModalOpen(false);
        refreshProfile().then(() => {
          if (onSyncComplete) onSyncComplete();
        });
        return `Successfully synced GitHub data and updated readiness!`;
      },
      error: (err: any) => {
        setIsSyncing(false);
        return err.message || "GitHub Sync failed.";
      }
    });

    try {
      await syncPromise;
    } catch {
      // Handled by toast.promise
    } finally {
      setIsSyncing(false);
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsernameInput.trim()) return;
    triggerSync(githubUsernameInput.trim());
  };

  const formatLanguagesText = () => {
    if (!githubLanguages) return "";
    const langs = Object.keys(githubLanguages);
    if (langs.length === 0) return "No languages found.";
    return `Top languages: ${langs.slice(0, 3).join(", ")}.`;
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* CV Analysis */}
        <div
          className="bg-white p-4 md:p-5 rounded-[16px] flex flex-col gap-3 h-full transition-all duration-300 shadow-sm shadow-slate-200/10 border border-slate-100 hover:border-blue-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 md:gap-3.5">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#F0F7FF] text-[#066EFF]">
                <FileText className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </div>
              <div className="space-y-0.5 pt-0.5">
                <h3 className="text-[13px] md:text-[14px] font-semibold text-slate-800 font-poppins">
                  CV Analysis
                </h3>
                <p className="text-[11px] md:text-[12px] font-medium text-[#10B981]">
                  Uploaded & Analyzed
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px] md:text-[12px] text-slate-500 leading-relaxed font-medium">
            12 skills extracted, 3 experience entries detected. Your CV shows strong frontend focus but lacks backend and DevOps keywords.
          </p>
          <button 
            onClick={() => onTabChange?.("cv-screening")}
            className="flex items-center gap-2 text-[#066EFF] font-semibold text-[12px] md:text-[13px] w-fit transition-all pt-0.5 cursor-pointer hover:underline mt-auto"
          >
            <Upload className="w-3.5 h-3.5" />
            Deep CV Screening
          </button>
        </div>

        {/* Academic Transcript */}
        <div
          className="bg-white p-4 md:p-5 rounded-[16px] flex flex-col gap-3 h-full transition-all duration-300 shadow-sm shadow-slate-200/10 border border-slate-100 hover:border-amber-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 md:gap-3.5">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#FFF9F0] text-[#F59E0B]">
                <BookOpen className="w-4.5 h-4.5 md:w-5 md:h-5" />
              </div>
              <div className="space-y-0.5 pt-0.5">
                <h3 className="text-[13px] md:text-[14px] font-semibold text-slate-800 font-poppins">
                  Academic Transcript
                </h3>
                <p className="text-[11px] md:text-[12px] font-medium text-[#10B981]">
                  Uploaded & Analyzed
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px] md:text-[12px] text-slate-500 leading-relaxed font-medium">
            GPA 3.45/4.00 detected. Strong academic performance in Data Structures and Algorithms. Software Engineering coursework identified.
          </p>
          <button 
            className="flex items-center gap-2 text-[#F59E0B] font-semibold text-[12px] md:text-[13px] w-fit transition-all pt-0.5 cursor-pointer hover:underline mt-auto"
          >
            <Upload className="w-3.5 h-3.5" />
            Re-upload Transcript
          </button>
        </div>

        {/* GitHub Sync */}
        <div
          className={cn(
            "p-4 md:p-5 rounded-[16px] flex flex-col gap-3 h-full transition-all duration-300 shadow-sm shadow-slate-200/10 border",
            isGithubConnected 
              ? "bg-white border-slate-100 hover:border-emerald-200" 
              : "bg-white border-slate-100 hover:border-indigo-200"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 md:gap-3.5">
              <div className={cn(
                "w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                isGithubConnected ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#F5F3FF] text-[#6366F1]"
              )}>
                <GithubIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 pt-0.5 text-left">
                <h3 className="text-[13px] md:text-[14px] font-semibold text-slate-800 font-poppins">
                  GitHub Integration
                </h3>
                <p className={cn(
                  "text-[11px] md:text-[12px] font-bold tracking-tight",
                  isGithubConnected ? "text-[#059669]" : "text-[#6366F1]"
                )}>
                  {isGithubConnected ? `Synced (@${githubUsername})` : "Not Connected"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px] md:text-[12px] text-slate-500 leading-relaxed font-medium text-left">
            {isGithubConnected 
              ? `Repositores analyzed. Code alignment score: ${githubScore}%. ${formatLanguagesText()}`
              : "Sync your GitHub repositories to analyze the languages you use and boost your overall career readiness score."}
          </p>
          <button 
            onClick={handleSyncClick}
            disabled={isSyncing}
            className={cn(
              "flex items-center gap-2 font-semibold text-[12px] md:text-[13px] w-fit transition-all pt-0.5 cursor-pointer disabled:opacity-50 mt-auto hover:underline",
              isGithubConnected ? "text-[#059669]" : "text-[#6366F1]"
            )}
          >
            {isSyncing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isGithubConnected ? (
              <RefreshCw className="w-3.5 h-3.5" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            {isGithubConnected ? "Sync GitHub Data" : "Connect & Sync GitHub"}
          </button>
        </div>
      </div>

      {/* Manual Username Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-2xl p-6 md:p-8 w-full max-w-[440px] flex flex-col gap-6 animate-in zoom-in-95 duration-200 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[16px] md:text-[18px] font-bold text-slate-900 font-poppins">
                  GitHub Integration
                </h3>
                <p className="text-[12px] text-slate-400 font-medium">
                  Tailor your career readiness analysis
                </p>
              </div>
            </div>

            <p className="text-[12px] md:text-[13px] text-slate-500 leading-relaxed font-medium">
              Enter your public GitHub username. We will fetch your public repositories and calculate how well your coding languages align with your target role.
            </p>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="github-username-field" className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                  GitHub Username
                </label>
                <input
                  id="github-username-field"
                  type="text"
                  required
                  value={githubUsernameInput}
                  onChange={(e) => setGithubUsernameInput(e.target.value)}
                  placeholder="e.g. ubaydillah1"
                  className="w-full h-11 px-4 rounded-[12px] border border-slate-200 focus:outline-none focus:border-indigo-500 text-[14px] font-semibold text-slate-800 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-11 rounded-[12px] border border-slate-200 hover:bg-slate-50 text-[13px] font-bold text-slate-600 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSyncing || !githubUsernameInput.trim()}
                  className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-[12px] text-[13px] font-bold shadow-md shadow-black/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    "Connect & Sync"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
