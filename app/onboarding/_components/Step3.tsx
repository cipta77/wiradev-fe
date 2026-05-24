"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2,
  Code2,
  Database,
  Brain,
  Cloud,
  Palette,
  Compass,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const roles = [
  {
    title: "Frontend Developer",
    description: "React, Vue, UI/UX implementation",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Backend Developer",
    description: "APIs, databases, server logic",
    icon: Database,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Data Scientist",
    description: "ML, analytics, data pipelines",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Freelance",
    description: "Work From Home",
    icon: Cloud,
    color: "text-sky-500",
    bgColor: "bg-sky-50",
  },
  {
    title: "UI/UX Designer",
    description: "Design systems, prototyping",
    icon: Palette,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "Other / Exploring",
    description: "I'm still figuring it out",
    icon: Compass,
    color: "text-slate-500",
    bgColor: "bg-slate-50",
  },
];

export default function Step3({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { user, updateRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string | null>(
    user?.target_role || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.error("Please select a target role before continuing.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateRole(selectedRole);
      toast.success("Target role updated successfully.");
      onNext();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to update role. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 max-w-[720px] mx-auto py-4 px-4 sm:px-0">
      <div className="w-full mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0D3E9B] mb-2 tracking-tight leading-tight">
          What role are you targeting?
        </h2>
        <p className="text-[14px] md:text-[15px] font-medium text-slate-400 leading-relaxed opacity-80">
          We&apos;ll tailor your assessment, projects, and career path around your chosen role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {roles.map((role) => {
          const isSelected = selectedRole === role.title;
          const Icon = role.icon;

          return (
            <button
              key={role.title}
              onClick={() => setSelectedRole(role.title)}
              disabled={isSubmitting}
              className={cn(
                "p-5 flex items-center text-left rounded-[20px] border transition-all duration-300 outline-none cursor-pointer group disabled:opacity-50 min-h-[90px]",
                isSelected
                  ? "bg-blue-50/40 border-[#066EFF] shadow-lg shadow-blue-100/50 scale-[1.01]"
                  : "bg-white border-[#E8ECF0] hover:border-blue-200 hover:bg-slate-50/30"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mr-4 transition-transform group-hover:scale-105",
                  role.bgColor,
                  role.color
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[15px] font-bold text-slate-800 leading-tight">
                  {role.title}
                </h4>
                <p className="text-[12px] font-medium text-slate-400 mt-1 truncate">
                  {role.description}
                </p>
              </div>
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
