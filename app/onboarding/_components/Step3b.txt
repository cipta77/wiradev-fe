"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, AchievementGoal } from "@/lib/auth-context";
import { toast } from "sonner";

const goals = [
  { text: "Get my first job in tech", value: AchievementGoal.GET_FIRST_JOB },
  { text: "Switch to a developer role", value: AchievementGoal.SWITCH_DEVELOPER_ROLE },
  { text: "Improve my coding skills", value: AchievementGoal.IMPROVE_CODING_SKILLS },
  { text: "Prepare for technical interviews", value: AchievementGoal.PREPARE_INTERVIEWS },
  { text: "Build a strong portfolio", value: AchievementGoal.BUILD_PORTFOLIO },
  { text: "Understand market demands", value: AchievementGoal.UNDERSTAND_MARKET },
];

export default function Step3({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { user, updateGoal } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState<AchievementGoal | null>(
    user?.achievement_goal || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedGoal) {
      toast.error("Please select a primary goal before continuing.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateGoal(selectedGoal);
      toast.success("Goal saved successfully.");
      onNext();
    } catch (e: any) {
      toast.error(e.message || "Failed to save goal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 max-w-[720px] mx-auto py-4 px-4 sm:px-0">
      <div className="w-full mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0D3E9B] mb-2 tracking-tight leading-tight">
          What do you want to achieve?
        </h2>
        <p className="text-[14px] md:text-[15px] font-medium text-slate-400 leading-relaxed opacity-80">
          Select your primary goal. This helps us personalize your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal.value;
          return (
            <button
              key={goal.value}
              onClick={() => setSelectedGoal(goal.value)}
              disabled={isSubmitting}
              className={cn(
                "min-h-[64px] md:h-[72px] px-6 py-4 flex items-center text-left rounded-[16px] border transition-all text-sm md:text-[15px] font-semibold outline-none cursor-pointer disabled:opacity-50",
                isSelected
                  ? "bg-blue-50/50 border-[#066EFF] text-[#066EFF] shadow-sm shadow-blue-100"
                  : "bg-white border-[#E8ECF0] text-gray-600 hover:border-blue-200"
              )}
            >
              {goal.text}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-10 md:mt-12 w-full">
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
          onClick={handleContinue}
          disabled={isSubmitting}
          className="grow sm:grow-0 h-14 px-12 bg-linear-to-r from-[#066EFF] to-[#0556cc] hover:from-[#0556cc] hover:to-[#044bb3] rounded-[20px] text-[15px] font-bold text-white shadow-lg shadow-blue-500/25 gap-3 group transition-all active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Continue
              <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
