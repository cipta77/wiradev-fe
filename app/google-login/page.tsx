"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

function GoogleLoginContent() {
  const searchParams = useSearchParams();
  const redirectUriParam = searchParams.get("redirect_uri") || "";

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"" | "error" | "success">("");
  const [isLoading, setIsLoading] = useState(false);
  const [deepLinkUrl, setDeepLinkUrl] = useState("");
  const initialized = useRef(false);

  const clientId = "159334240812-3k5m6m19u2h5uljs0t5rckauajkovgel.apps.googleusercontent.com";
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeGoogleSDK = () => {
      if (typeof window !== "undefined" && window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          context: "signin",
          ux_mode: "popup",
          auto_prompt: false,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          {
            theme: "filled_blue",
            size: "large",
            width: 320,
            text: "signin_with",
            shape: "pill",
            logo_alignment: "left",
          }
        );
      } else {
        // Retry if SDK not loaded yet
        setTimeout(initializeGoogleSDK, 100);
      }
    };

    initializeGoogleSDK();
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const idToken = response.credential;
    if (!idToken) return;

    setIsLoading(true);
    setStatus("Authenticating with Wirapath...");
    setStatusType("");

    try {
      // 1. Attempt login with backend API
      let res = await fetch(`${backendUrl}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, isSignUp: false }),
      });

      let data = await res.json();

      // 2. If user not found, retry with signup enabled (auto-signup)
      if (!res.ok && data.message && data.message.includes("Account not found")) {
        setStatus("Creating new account...");
        res = await fetch(`${backendUrl}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, isSignUp: true }),
        });
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      setStatus("Login successful! Redirecting...");
      setStatusType("success");

      // 3. Perform redirect
      if (redirectUriParam) {
        if (redirectUriParam.startsWith("wirapath://") || redirectUriParam.includes("/#/oauth-callback") || redirectUriParam.includes("/oauth-callback?")) {
          const separator = redirectUriParam.includes("?") ? "&" : "?";
          const tokens = data.result.tokens;
          const deepLink = `${redirectUriParam}${separator}access_token=${encodeURIComponent(tokens.accessToken)}&refresh_token=${encodeURIComponent(tokens.refreshToken)}`;
          setDeepLinkUrl(deepLink);
          setTimeout(() => {
            window.location.href = deepLink;
          }, 1000);
        } else {
          // Web Next.js callback (expects hash id_token)
          setTimeout(() => {
            window.location.href = `${redirectUriParam}#id_token=${encodeURIComponent(idToken)}`;
          }, 1000);
        }
      } else {
        // Redirect back to mobile app via deep link
        const tokens = data.result.tokens;
        const deepLink = `wirapath://oauth-callback?access_token=${encodeURIComponent(tokens.accessToken)}&refresh_token=${encodeURIComponent(tokens.refreshToken)}`;
        setDeepLinkUrl(deepLink);
        setTimeout(() => {
          window.location.href = deepLink;
        }, 1000);
      }
    } catch (err: any) {
      setIsLoading(false);
      setStatus(err.message || "Something went wrong.");
      setStatusType("error");
    }
  };

  const blueGradient =
    "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-poppins"
      style={{ background: blueGradient }}
    >
      {/* Abstract decorative glowing blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphism card container */}
      <div className="w-full max-w-[420px] bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center relative z-10">
        {/* Branding Logo */}
        <div className="mb-8 font-bold text-2xl text-blue-500 tracking-tight">
          Wirapath
        </div>

        <h1 className="text-xl font-semibold text-slate-100 mb-2">
          Google Sign In
        </h1>
        <p className="text-sm text-slate-400 mb-8 max-w-[280px]">
          Log in to your account securely using your system web browser.
        </p>

        {isLoading && (
          <div className="flex flex-col items-center justify-center mb-6">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          </div>
        )}

        <div
          id="btn-container"
          className="mb-6"
          style={{ display: isLoading ? "none" : "block" }}
        >
          <div id="google-signin-btn" className="flex justify-center" />
        </div>

        {status && (
          <div
            className={`text-sm ${
              statusType === "error"
                ? "text-red-400"
                : statusType === "success"
                ? "text-emerald-400"
                : "text-slate-400"
            }`}
          >
            {status}
          </div>
        )}

        {statusType === "success" && deepLinkUrl && (
          <a
            href={deepLinkUrl}
            className="mt-6 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-95 inline-block"
          >
            Open Wirapath App
          </a>
        )}
      </div>
    </div>
  );
}

export default function GoogleLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-poppins">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <GoogleLoginContent />
    </Suspense>
  );
}
