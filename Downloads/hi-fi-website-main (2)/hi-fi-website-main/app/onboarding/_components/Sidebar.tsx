"use client";

import Image from "next/image";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "Welcome to Wirapath" },
  { id: 2, title: "Personal Information" },
  { id: 3, title: "Your Goals" },
  { id: 4, title: "Upload CV" },
  { id: 5, title: "Upload Transcript" },
  { id: 6, title: "Connect GitHub" },
];

export default function OnboardingSidebar({
  currentStep,
}: {
  currentStep: number;
}) {
  const { completeOnboarding } = useAuth();
  const router = useRouter();

  return (

    <div className="w-[340px] h-full bg-[#F9FAFB] border-r border-gray-100 flex flex-col p-8 font-poppins">
      <div className="mb-14">
        <Image
          src="/assets/images/logo.png"
          alt="Wirapath Logo"
          width={130}
          height={32}
          className="object-contain"
        />
      </div>


      <div className="flex flex-col gap-2 grow">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-[16px] transition-all",
                isActive ? "bg-white shadow-sm shadow-gray-200/50" : ""
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all",
                  isActive ? "bg-[#066EFF] text-white" : "bg-slate-100 text-slate-400",
                  isCompleted ? "bg-[#E6F9F4] text-[#10B981]" : ""
                )}
              >
                {isCompleted ? <CheckIcon className="w-4 h-4 stroke-3" /> : step.id}
              </div>
              <span
                className={cn(
                  "text-[14px] font-semibold transition-colors",
                  isActive ? "text-gray-900" : "text-slate-400",
                  isCompleted ? "text-[#10B981]" : ""
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>


      <div className="mt-auto w-full">
        <button
          onClick={async () => {
            try {
              await completeOnboarding();
              toast.success("Skipped onboarding setup.");
              router.push("/dashboard");
            } catch (e: any) {
              toast.error(e.message || "Failed to skip onboarding.");
            }
          }}
          className="text-[14px] text-slate-400 font-semibold hover:text-[#066EFF] transition-colors flex items-center justify-center w-full cursor-pointer py-2"
        >
          Skip Onboarding
        </button>
      </div>
    </div>
  );
}

