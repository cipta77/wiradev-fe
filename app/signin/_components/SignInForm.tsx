"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

declare global {
  interface Window {
    google?: any;
  }
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleCredentialResponse = async (response: any) => {
      setIsSubmitting(true);
      try {
        const loggedUser = await loginWithGoogle(response.credential, false);
        toast.success("Successfully logged in with Google!");
        if (loggedUser.onboarding_completed) {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
      } catch (err: any) {
        toast.error(err.message || "Google authentication failed.");
      } finally {
        setIsSubmitting(false);
      }
    };

    const initializeGoogle = () => {
      if (typeof window !== "undefined" && window.google?.accounts?.id) {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
          console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured in .env.local");
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { 
            theme: "outline", 
            size: "large", 
            width: 400, 
            text: "continue_with",
            shape: "rectangular"
          }
        );
      }
    };

    const checkInterval = setInterval(() => {
      if (window.google?.accounts?.id) {
        initializeGoogle();
        clearInterval(checkInterval);
      }
    }, 200);

    return () => clearInterval(checkInterval);
  }, [loginWithGoogle, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier) {
      toast.error("Please enter your email or username.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const loggedUser = await login(identifier, password);
      toast.success("Successfully logged in!");
      if (loggedUser.onboarding_completed) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center lg:items-start font-poppins">
      <div className="mb-7 text-center lg:text-left">
        <h2 className="text-[28px] font-extrabold text-[#0D3E9B] mb-2">
          Sign In
        </h2>
        <p className="text-[14px] text-slate-400 leading-relaxed">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-[14px] font-semibold ml-1">
            Email or Username
          </Label>
          <Input
            id="email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="h-[46px] bg-white rounded-[12px] px-5 text-[14px] font-medium placeholder:text-[#0A0A0A80] placeholder:font-normal focus-visible:ring-0 border border-[#E8ECF0] outline-none"
            placeholder="Enter your email or username"
          />
        </div>

        <div className="space-y-3 relative">
          <Label htmlFor="password" className="text-[14px] font-semibold ml-1">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[46px] bg-white rounded-[12px] px-5 pr-12 text-[14px] font-medium placeholder:text-[#0A0A0A80] placeholder:font-normal focus-visible:ring-0 border border-[#E8ECF0] outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-2 p-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400 transition-colors z-20 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <EyeIcon className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full text-[14px] font-semibold">
          <div className="flex items-center gap-3">
            <Checkbox
              id="remember"
              className="border-slate-200 rounded-[4px] data-[state=checked]:bg-blue-600"
            />
            <label htmlFor="remember" className="text-slate-400 font-medium cursor-pointer select-none">
              Remember me
            </label>
          </div>
          <Link href="#" onClick={(e) => { e.preventDefault(); toast.info("Forgot Password flow is simulated."); }} className="text-[#066EFF] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[48px] bg-[#066EFF] hover:bg-[#0556cc] text-white font-bold rounded-[16px] shadow-xl shadow-blue-500/30 transition-all text-[16px] cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="w-full flex items-center gap-4 my-9">
        <div className="h-px grow bg-[#E8ECF0]" />
        <span className="text-[12px] text-[#94A3B8] tracking-widest px-2">
          Or continue with
        </span>
        <div className="h-px grow bg-[#E8ECF0]" />
      </div>

      <div className="w-full relative h-[48px] overflow-hidden rounded-[16px] border border-[#E8ECF0] bg-white hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-3">
        {/* Custom Premium UI */}
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
        <span className="text-[14px] text-slate-700">
          Continue with Google
        </span>

        {/* Hidden/Transparent official Google button overlaid directly on top */}
        <div 
          id="google-signin-btn" 
          className="absolute inset-0 w-full h-full opacity-[0.01] cursor-pointer [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:min-w-full z-10" 
        />
      </div>

      <div className="w-full text-center mt-12">
        <p className="text-[14px] text-slate-400 font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#066EFF] font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
