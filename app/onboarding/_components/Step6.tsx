"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function Step6({
  onFinish,
  onBack,
}: {
  onFinish: () => void;
  onBack: () => void;
}) {
  const { completeOnboarding } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await completeOnboarding();
      toast.success("Welcome aboard! Onboarding successfully completed.");
      onFinish();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to finalize onboarding. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 max-w-[720px] mx-auto py-4 px-4 sm:px-0">
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px] bg-emerald-50 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-emerald-100/50 animate-in zoom-in-95">
        <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-emerald-500" />
      </div>

      <div className="text-center mb-10 max-w-[620px]">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0D3E9B] mb-3 md:mb-4 tracking-tight leading-tight">
          You're All Set!
        </h2>
        <p className="text-[14px] md:text-[15px] text-slate-400 leading-relaxed md:leading-[1.8] opacity-80 px-2 md:px-4">
          We have collected your profile and documents. Click "Finish Setup" below to head to your dashboard and start exploring your career readiness!
        </p>
      </div>

      <div className="flex items-center gap-3 mt-10 w-full">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="h-14 w-14 flex items-center justify-center rounded-[20px] bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-gray-900 transition-all active:scale-95 sm:w-auto sm:px-6 sm:gap-2 sm:bg-transparent sm:hover:bg-transparent sm:h-auto disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline text-[15px] font-semibold">Back</span>
        </button>
        <div className="hidden sm:block grow" />
        <Button
          onClick={handleFinish}
          disabled={isSubmitting}
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
