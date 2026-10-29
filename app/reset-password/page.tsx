"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, Loader2, LockKeyhole, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

function ResetPasswordBranding() {
  const blueGradient =
    "linear-gradient(to bottom, #066EFF, #076AF8, #0867F0, #0963E9, #0A60E2, #0B5CDA, #0C59D3, #0C55CC, #0C52C5, #0D4FBE, #0D4BB7, #0D48B0, #0D45A9, #0D41A2, #0D3E9B)";

  return (
    <div
      className="hidden lg:flex w-[40%] flex-col items-center justify-center p-12 text-white relative overflow-hidden"
      style={{ background: blueGradient }}
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-[340px]">
        <Link href="/" className="mb-12">
          <Image
            src="/assets/images/logo.png"
            alt="WiraDev Logo"
            width={160}
            height={42}
            className="brightness-0 invert object-contain"
          />
        </Link>

        <h1 className="text-[28px] font-bold mb-4">Reset Password</h1>
        <p className="text-[15px] opacity-80 leading-relaxed">
          Create a new strong password to secure your account and continue your career readiness journey.
        </p>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32" />
    </div>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing.");
      return;
    }

    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/api/auth/reset-password", {
        token,
        password,
      });
      toast.success("Password has been successfully reset.");
      setResetSuccess(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password. The link may have expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-poppins">
      <ResetPasswordBranding />
      <div className="grow min-h-screen flex flex-col items-center p-6 md:px-12 py-[70px] overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center w-full">
          {!token ? (
            <div className="w-full max-w-[420px] flex flex-col items-center text-center p-8 bg-white border border-[#E8ECF0] rounded-[24px] shadow-sm">
              <div className="p-4 bg-red-50 rounded-full text-red-500 mb-6">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h2 className="text-[22px] font-extrabold text-[#0D3E9B] mb-3">
                Invalid Reset Link
              </h2>
              <p className="text-[14px] text-slate-400 leading-relaxed mb-8">
                The password reset token is missing or invalid. Please check your email or request a new reset link.
              </p>
              <Button
                onClick={() => router.push("/signin")}
                className="w-full h-[48px] bg-[#066EFF] hover:bg-[#0556cc] text-white font-bold rounded-[16px] transition-all text-[14px]"
              >
                Back to Sign In
              </Button>
            </div>
          ) : resetSuccess ? (
            <div className="w-full max-w-[420px] flex flex-col items-center text-center p-8 bg-white border border-[#E8ECF0] rounded-[24px] shadow-sm animate-in fade-in zoom-in-95 duration-300">
              <div className="p-4 bg-green-50 rounded-full text-green-500 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-[22px] font-extrabold text-[#0D3E9B] mb-3">
                Password Reset Successfully
              </h2>
              <p className="text-[14px] text-slate-400 leading-relaxed mb-8">
                Your password has been changed. You can now use your new password to sign in to your account.
              </p>
              <Button
                onClick={() => router.push("/signin")}
                className="w-full h-[48px] bg-[#066EFF] hover:bg-[#0556cc] text-white font-bold rounded-[16px] shadow-xl shadow-blue-500/10 transition-all text-[14px]"
              >
                Go to Sign In
              </Button>
            </div>
          ) : (
            <div className="w-full max-w-[420px] flex flex-col items-center lg:items-start">
              <div className="mb-7 text-center lg:text-left">
                <div className="lg:hidden mb-4 flex justify-center">
                  <Image
                    src="/assets/images/logo.png"
                    alt="WiraDev Logo"
                    width={140}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-[28px] font-extrabold text-[#0D3E9B] mb-2">
                  Create New Password
                </h2>
                <p className="text-[14px] text-slate-400 leading-relaxed">
                  Please enter and confirm your new password below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="space-y-3 relative">
                  <Label htmlFor="password" className="text-[14px] font-semibold ml-1">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-[46px] bg-white rounded-[12px] px-5 pr-12 text-[14px] font-medium placeholder:text-[#0A0A0A80] placeholder:font-normal focus-visible:ring-0 border border-[#E8ECF0] outline-none"
                      placeholder="At least 8 characters"
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

                <div className="space-y-3 relative">
                  <Label htmlFor="confirmPassword" className="text-[14px] font-semibold ml-1">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-[46px] bg-white rounded-[12px] px-5 pr-12 text-[14px] font-medium placeholder:text-[#0A0A0A80] placeholder:font-normal focus-visible:ring-0 border border-[#E8ECF0] outline-none"
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 p-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400 transition-colors z-20 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="w-5 h-5 stroke-[1.5]" />
                      ) : (
                        <EyeIcon className="w-5 h-5 stroke-[1.5]" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[48px] bg-[#066EFF] hover:bg-[#0556cc] text-white font-bold rounded-[16px] shadow-xl shadow-blue-500/30 transition-all text-[16px] cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-poppins">
          <Loader2 className="w-8 h-8 animate-spin text-[#066EFF]" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
