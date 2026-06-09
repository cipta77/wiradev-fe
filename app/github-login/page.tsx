"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * GitHub OAuth entry page.
 *
 * Builds the GitHub authorization URL and redirects the browser to GitHub.
 * The actual code-for-token exchange happens back on /oauth-callback (the
 * registered GitHub callback URL), which is shared with the existing GitHub
 * profile integration. We encode the auth context (sign-in vs sign-up and the
 * final redirect target) inside the OAuth `state` parameter so /oauth-callback
 * knows how to finish the flow.
 *
 * Callers:
 *   - Web app sign-in:   /github-login?is_signup=false        (no redirect_uri -> web session)
 *   - Web app sign-up:   /github-login?is_signup=true
 *   - Native mobile:     /github-login?is_signup=...&redirect_uri=wirapath://oauth-callback
 *   - Flutter web:       /github-login?is_signup=...&redirect_uri=<origin>/#/oauth-callback
 */
function GitHubLoginContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Redirecting to GitHub...");
  const [isError, setIsError] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    if (!clientId) {
      setIsError(true);
      setStatus("GitHub OAuth is not configured (missing NEXT_PUBLIC_GITHUB_CLIENT_ID).");
      return;
    }

    const isSignUp = searchParams.get("is_signup") === "true";
    const finalRedirect = searchParams.get("redirect_uri") || "";

    // Encode the auth context into a URL-safe `state` value.
    const payload = JSON.stringify({ mode: "github_auth", isSignUp, redirect: finalRedirect });
    const state = btoa(payload)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // GitHub redirects back to the registered callback (shared with the integration).
    const callbackUrl = `${window.location.origin}/oauth-callback`;

    const authorizeUrl =
      "https://github.com/login/oauth/authorize" +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(callbackUrl)}` +
      `&scope=${encodeURIComponent("read:user user:email")}` +
      `&state=${encodeURIComponent(state)}` +
      `&allow_signup=${isSignUp ? "true" : "false"}`;

    window.location.href = authorizeUrl;
  }, [searchParams]);

  const blueGradient = "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-poppins"
      style={{ background: blueGradient }}
    >
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center relative z-10">
        <div className="mb-8 font-bold text-2xl text-blue-500 tracking-tight">Wirapath</div>

        <svg className="w-10 h-10 text-slate-100 mb-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
        </svg>

        <h1 className="text-xl font-semibold text-slate-100 mb-2">GitHub Sign In</h1>
        <p className="text-sm text-slate-400 mb-8 max-w-[280px]">
          Connecting to GitHub to authenticate your account securely.
        </p>

        {!isError && <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />}

        <div className={`text-sm ${isError ? "text-red-400" : "text-slate-400"}`}>{status}</div>
      </div>
    </div>
  );
}

export default function GitHubLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-poppins">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <GitHubLoginContent />
    </Suspense>
  );
}
