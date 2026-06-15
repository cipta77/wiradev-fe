"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

function ForgotPasswordBranding() {
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
            alt="Wirapath Logo"
            width={160}
            height={42}
            className="brightness-0 invert object-contain"
          />
        </Link>

        <h1 className="text-[28px] font-bold mb-4">Forgot Password</h1>
        <p className="text-[15px] opacity-80 leading-relaxed">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32" />
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/api/auth/forgot-password", {
        email,
      });
      toast.success("If an account exists, a reset link has been sent.");
      setResetSent(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to request password reset.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-poppins">
      <ForgotPasswordBranding />
      <div className="grow min-h-screen flex flex-col items-center p-6 md:px-12 py-[70px] overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center w-full">
          {resetSent ? (
            <div className="w-full max-w-[420px] flex flex-col items-center text-center p-8 bg-white border border-[#E8ECF0] rounded-[24px] shadow-sm animate-in fade-in zoom-in-95 duration-300">
              <div className="p-4 bg-green-50 rounded-full text-green-500 mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-[22px] font-extrabold text-[#0D3E9B] mb-3">
                Check Your Email
              </h2>
              <p className="text-[14px] text-slate-400 leading-relaxed mb-8">
                If an account exists for <strong>{email}</strong>, a password reset link has been sent. Please check your inbox and follow the instructions.
              </p>
              <Button
                onClick={() => router.push("/signin")}
                className="w-full h-[48px] bg-[#066EFF] hover:bg-[#0556cc] text-white font-bold rounded-[16px] transition-all text-[14px]"
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
            <div className="w-full max-w-[420px] flex flex-col items-center lg:items-start">
              <div className="mb-7 text-center lg:text-left">
                <div className="lg:hidden mb-4 flex justify-center">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Wirapath Logo"
                    width={140}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-[28px] font-extrabold text-[#0D3E9B] mb-2">
                  Forgot Password?
                </h2>
                <p className="text-[14px] text-slate-400 leading-relaxed">
                  Enter your email below and we will send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[14px] font-semibold ml-1">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-[46px] bg-white rounded-[12px] px-5 text-[14px] font-medium placeholder:text-[#0A0A0A80] placeholder:font-normal focus-visible:ring-0 border border-[#E8ECF0] outline-none"
                      placeholder="Enter your email address"
                    />
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
                      Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <div className="w-full text-center mt-6">
                  <p className="text-[14px] text-slate-400 font-medium">
                    Remember your password?{" "}
                    <Link href="/signin" className="text-[#066EFF] font-semibold">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
