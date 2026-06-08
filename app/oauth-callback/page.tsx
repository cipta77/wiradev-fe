"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [loadingText, setLoadingText] = useState("Securing connection...");
  const processed = useRef(false);

  const blueGradient =
    "linear-gradient(135deg, #066EFF, #0A60E2, #0D45A9, #0D3E9B)";

  useEffect(() => {
    // Prevent double invocation in React 18 Strict Mode
    if (processed.current) return;
    processed.current = true;

    const handleCallback = async () => {
      // 1. Get the hash fragment containing the id_token
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (!hash) {
        // Check query parameters in case Google returns code or error there
        const searchParams = new URLSearchParams(window.location.search);
        const error = searchParams.get("error");
        if (error) {
          toast.error(`Authentication error: ${error}`);
        } else {
          toast.error("No authorization data received.");
        }
        router.replace("/signin");
        return;
      }

      // Parse parameters from the URL hash fragment (omit the '#')
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get("id_token");
      const error = params.get("error");

      if (error) {
        toast.error(`Authentication error: ${error}`);
        router.replace("/signin");
        return;
      }

      if (!idToken) {
        toast.error("Invalid token format received.");
        router.replace("/signin");
        return;
      }

      setLoadingText("Authenticating credentials...");

      // 2. Fetch the flow type (Sign In vs Sign Up) from sessionStorage
      const isSignUp = sessionStorage.getItem("oauth_is_signup") === "true";
      
      try {
        setLoadingText("Setting up your session...");
        const loggedUser = await loginWithGoogle(idToken, isSignUp);

        toast.success(
          isSignUp 
            ? "Successfully registered with Google!" 
            : "Successfully logged in with Google!"
        );

        // Clear redirect storage
        sessionStorage.removeItem("oauth_is_signup");

        // Navigate based on onboarding progress
        if (loggedUser.onboarding_completed) {
          router.replace("/dashboard");
        } else {
          router.replace("/onboarding");
        }
      } catch (err: any) {
        console.error("Google OAuth error:", err);
        toast.error(err.message || "Failed to authenticate with Google.");
        router.replace(isSignUp ? "/signup" : "/signin");
      }
    };

    handleCallback();
  }, [loginWithGoogle, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-poppins"
      style={{ background: blueGradient }}
    >
      {/* Abstract decorative glowing blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphism card container */}
      <div className="w-full max-w-[450px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl flex flex-col items-center text-center relative z-10 transition-all duration-300 hover:shadow-blue-500/20 hover:scale-[1.01]">
        {/* Branding Logo */}
        <div className="mb-8">
          <Image
            src="/assets/images/logo.png"
            alt="Wirapath Logo"
            width={180}
            height={46}
            className="brightness-0 invert object-contain"
            priority
          />
        </div>

        {/* Loader Icon with double-ring visual effect */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute w-20 h-20 border-4 border-white/10 rounded-full" />
          <Loader2 className="w-16 h-16 text-white animate-spin stroke-[1.5] relative z-10" />
        </div>

        {/* Dynamic loading descriptions */}
        <h2 className="text-xl font-bold text-white mb-2 tracking-wide">
          Completing authentication
        </h2>
        <p className="text-sm text-white/70 font-medium">
          {loadingText}
        </p>

        {/* Footnote */}
        <div className="mt-8 text-xs text-white/40">
          Redirecting you to Wirapath dashboard...
        </div>
      </div>
    </div>
  );
}
