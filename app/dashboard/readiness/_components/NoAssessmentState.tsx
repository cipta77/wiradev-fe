"use client";

import React, { useState, useEffect } from "react";
import { ClipboardList, Loader2, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { useAuth } from "@/lib/auth-context";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

interface NoAssessmentStateProps {
  onAction: () => void;
  onSyncComplete?: () => void;
}

export function NoAssessmentState({ onAction, onSyncComplete }: NoAssessmentStateProps) {
  const { user, refreshProfile } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [githubUsernameInput, setGithubUsernameInput] = useState("");

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

  const handleConnectClick = () => {
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
        return `Successfully synced GitHub data and unlocked your skill gap metrics!`;
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[440px] p-6 md:p-10 bg-white border border-slate-100 rounded-[24px] shadow-sm text-center max-w-[640px] mx-auto my-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="flex items-center justify-center w-16 h-16 mb-5 bg-[#066EFF]/10 text-[#066EFF] rounded-2xl animate-pulse">
        <ClipboardList className="w-8 h-8" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2.5 font-poppins">
        Analyze Your Career Readiness
      </h3>
      <p className="max-w-md text-slate-500 mb-8 text-[13px] md:text-[14px] leading-relaxed font-medium">
        Wirapath analyzes your coding skills through two pathways. Choose to take our initial conceptual assessment, or sync your GitHub repositories to immediately calculate your alignment score.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full justify-center">
        <button
          onClick={onAction}
          className="px-6 py-3.5 bg-[#066EFF] hover:bg-[#055bca] active:scale-[0.98] transition-all text-white font-bold rounded-xl text-[14px] shadow-md shadow-[#066EFF]/15 flex items-center justify-center gap-2 cursor-pointer"
        >
          Take Initial Assessment
          <ArrowRight className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleConnectClick}
          disabled={isSyncing}
          className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all text-white font-bold rounded-xl text-[14px] shadow-md shadow-black/15 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {isSyncing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <GithubIcon className="w-4.5 h-4.5" />
          )}
          Connect & Sync GitHub
        </button>
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
}
