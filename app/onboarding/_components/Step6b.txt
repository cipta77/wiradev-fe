"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, CheckCircle2, Loader2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function Step6({
  onFinish,
  onBack,
}: {
  onFinish: () => void;
  onBack: () => void;
}) {
  const { user, completeOnboarding } = useAuth();
  const [githubId, setGithubId] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "GITHUB_AUTH_SUCCESS") {
        setGithubId(event.data.githubId);
        setGithubUsername(event.data.username);
        toast.success(`Successfully connected to GitHub as @${event.data.username}!`);
      } else if (event.data?.type === "GITHUB_AUTH_CANCEL") {
        toast.error("GitHub authorization cancelled.");
      }
      setIsConnecting(false);
    };

    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, []);

  const handleConnectGitHub = () => {
    setIsConnecting(true);
    
    const width = 500;
    const height = 620;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      "",
      "GitHub Authorization",
      `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no`
    );

    if (!popup) {
      toast.error("Popup blocked! Please allow popups for this page.");
      setIsConnecting(false);
      return;
    }

    popup.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorize Wirapath</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {
              background-color: #0d1117;
              color: #c9d1d9;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              align-items: center;
              justify-content: center;
            }
            .container {
              background-color: #161b22;
              border: 1px border #30363d;
              border-radius: 6px;
              width: 100%;
              max-width: 440px;
              padding: 32px;
              box-shadow: 0 8px 24px rgba(0,0,0,0.3);
              box-sizing: border-box;
            }
            .header {
              text-align: center;
              margin-bottom: 24px;
            }
            .logo-wrap {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 16px;
              margin-bottom: 16px;
            }
            .logo {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              background-color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .plus {
              font-size: 24px;
              color: #8b949e;
            }
            h1 {
              font-size: 22px;
              font-weight: 500;
              color: #f0f6fc;
              margin: 0;
            }
            p.subtitle {
              font-size: 14px;
              color: #8b949e;
              margin: 8px 0 0;
            }
            .divider {
              height: 1px;
              background-color: #30363d;
              margin: 20px 0;
            }
            .permissions {
              font-size: 14px;
              line-height: 1.5;
            }
            .permission-item {
              display: flex;
              align-items: flex-start;
              gap: 12px;
              margin-bottom: 16px;
            }
            .check-icon {
              color: #3fb950;
              font-size: 16px;
              margin-top: 2px;
            }
            .actions {
              display: flex;
              flex-direction: column;
              gap: 12px;
              margin-top: 24px;
            }
            button {
              height: 40px;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              border: none;
              outline: none;
              transition: background-color 0.2s;
            }
            .btn-authorize {
              background-color: #238636;
              color: #ffffff;
            }
            .btn-authorize:hover {
              background-color: #2ea043;
            }
            .btn-cancel {
              background-color: #21262d;
              color: #c9d1d9;
              border: 1px solid #30363d;
            }
            .btn-cancel:hover {
              background-color: #30363d;
            }
            .footer-info {
              font-size: 12px;
              color: #8b949e;
              text-align: center;
              margin-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-wrap">
                <div class="logo" style="background-color: #24292e;">
                  <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true" style="fill: #ffffff;"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.57-.18-3.23-.79-3.23-3.5 0-.78.28-1.41.73-1.92-.08-.18-.32-1.01.07-2.08 0 0 .6-.19 1.95.73a6.82 6.82 0 011.8-.24c.6 0 1.2.08 1.8.24 1.35-.92 1.94-.73 1.94-.73.4 1.07.16 1.9.07 2.08.45.51.73 1.13.73 1.92 0 2.78-1.67 3.32-3.24 3.5.26.22.47.65.47 1.31 0 .94-.01 1.7-.01 1.93 0 .21.14.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                </div>
                <div class="plus">+</div>
                <div class="logo" style="background-color: #066EFF;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <h1>Authorize Wirapath</h1>
              <p class="subtitle">by <strong>Wirapath Team</strong></p>
            </div>
            
            <div class="divider"></div>
            
            <div class="permissions">
              <p style="color: #f0f6fc; font-weight: 600; margin-bottom: 16px;">Wirapath requests access to:</p>
              <div class="permission-item">
                <span class="check-icon">✔</span>
                <div>
                  <strong style="color: #f0f6fc;">Public user profile</strong>
                  <div style="color: #8b949e; font-size: 12px; margin-top: 2px;">Email, profile name, and biography.</div>
                </div>
              </div>
              <div class="permission-item">
                <span class="check-icon">✔</span>
                <div>
                  <strong style="color: #f0f6fc;">Public repositories</strong>
                  <div style="color: #8b949e; font-size: 12px; margin-top: 2px;">Read list of public repositories and commit patterns.</div>
                </div>
              </div>
            </div>
            
            <div class="actions">
              <button class="btn-authorize" onclick="authorize()">Authorize ubaydillah1</button>
              <button class="btn-cancel" onclick="cancel()">Cancel</button>
            </div>
            
            <div class="footer-info">
              You will be redirected back to Wirapath.
            </div>
          </div>
          
          <script>
            function authorize() {
              window.opener.postMessage({
                type: 'GITHUB_AUTH_SUCCESS',
                githubId: '98765432',
                username: 'ubaydillah1'
              }, window.location.origin);
              window.close();
            }
            
            function cancel() {
              window.opener.postMessage({
                type: 'GITHUB_AUTH_CANCEL'
              }, window.location.origin);
              window.close();
            }
          </script>
        </body>
      </html>
    `);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await completeOnboarding(githubId || undefined);
      toast.success("Welcome aboard! Onboarding successfully completed.");
      onFinish();
    } catch (e: any) {
      toast.error(e.message || "Failed to finalize onboarding. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 max-w-[720px] mx-auto py-4 px-4 sm:px-0">
      {githubUsername ? (
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px] bg-emerald-50 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-emerald-100/50 animate-in zoom-in-95">
          <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />
        </div>
      ) : (
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px] bg-[#1A1A1D] rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-black/10">
          <GithubIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
      )}

      <div className="text-center mb-8 md:mb-10 max-w-[620px]">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0D3E9B] mb-3 md:mb-4 tracking-tight leading-tight">
          {githubUsername ? "GitHub Connected!" : "Connect Your GitHub"}
        </h2>
        <p className="text-[14px] md:text-[15px] text-slate-400 leading-relaxed md:leading-[1.8] opacity-80 px-2 md:px-4">
          {githubUsername
            ? `Successfully linked to @${githubUsername}. We've analyzed your public repositories and tailored your skill gaps accordingly.`
            : "Let's see what you've built. Connecting GitHub helps us analyze your repositories, coding patterns, and suggest personalized development projects."}
        </p>
      </div>

      {githubUsername ? (
        <div className="w-full max-w-[400px] mb-8 bg-slate-50 border border-slate-200 rounded-[20px] p-5 flex items-center gap-4 animate-in fade-in duration-300">
          <div className="w-11 h-11 rounded-full bg-[#1A1A1D] flex items-center justify-center text-white shrink-0">
            <GithubIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[14px] font-bold text-slate-800 truncate pr-4">
              @{githubUsername}
            </p>
            <p className="text-[12px] font-medium text-emerald-600 mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Linked to Onboarding Account
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[400px] mb-4 md:mb-6">
          <Button
            onClick={handleConnectGitHub}
            disabled={isConnecting || isSubmitting}
            className="w-full h-14 md:h-16 bg-[#1A1A1D] hover:bg-[#2A2A2D] rounded-[16px] md:rounded-[20px] text-[15px] md:text-[16px] font-bold text-white shadow-xl shadow-black/10 transition-all active:scale-[0.98] flex items-center justify-center gap-3 md:gap-4 cursor-pointer"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <GithubIcon className="w-5 h-5 md:w-6 md:h-6" />
                Connect GitHub Account
              </>
            )}
          </Button>
        </div>
      )}

      {!githubUsername && (
        <p className="text-[12px] md:text-[13px] text-[#94A3B8] mb-10 md:mb-16 opacity-70 text-center">
          We only read public repository data. Your code stays yours.
        </p>
      )}

      <div className="flex items-center gap-3 mt-auto w-full">
        <button
          onClick={onBack}
          disabled={isConnecting || isSubmitting}
          className="h-14 w-14 flex items-center justify-center rounded-[20px] bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-gray-900 transition-all active:scale-95 sm:w-auto sm:px-6 sm:gap-2 sm:bg-transparent sm:hover:bg-transparent sm:h-auto disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline text-[15px] font-semibold">Back</span>
        </button>
        <div className="hidden sm:block grow" />
        <Button
          onClick={handleFinish}
          disabled={isConnecting || isSubmitting}
          className="grow sm:grow-0 h-14 px-12 bg-linear-to-r from-[#066EFF] to-[#0556cc] hover:from-[#0556cc] hover:to-[#044bb3] rounded-[20px] text-[15px] font-bold text-white shadow-lg shadow-blue-500/25 gap-3 group transition-all active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Completing...
            </>
          ) : (
            <>
              Finish Setup
              <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
