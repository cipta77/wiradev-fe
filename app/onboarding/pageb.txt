"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingSidebar from "./_components/Sidebar";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step3 from "./_components/Step3";
import Step4 from "./_components/Step4";
import Step5 from "./_components/Step5";
import Step6 from "./_components/Step6";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const progressPercent = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const finishOnboarding = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-white font-poppins relative">
      <div
        className="fixed top-0 left-0 h-1.5 bg-[#066EFF] transition-all duration-500 ease-in-out z-50"
        style={{ width: `${progressPercent}%` }}
      />

      <div className="hidden lg:block">
        <OnboardingSidebar currentStep={currentStep} />
      </div>

      <div className="grow min-h-screen flex flex-col items-center bg-white px-4 md:px-8 py-10 md:py-0 md:justify-center">
        <div className="w-full max-w-[800px] flex flex-col items-center">
          <div className="lg:hidden w-full mb-8 text-center">
            <span className="text-[12px] font-bold text-[#066EFF] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          {currentStep === 1 && <Step1 onNext={nextStep} />}
          {currentStep === 2 && <Step2 onNext={nextStep} onBack={prevStep} />}
          {currentStep === 3 && <Step3 onNext={nextStep} onBack={prevStep} />}
          {currentStep === 4 && <Step4 onNext={nextStep} onBack={prevStep} />}
          {currentStep === 5 && <Step5 onNext={nextStep} onBack={prevStep} />}
          {currentStep === 6 && (
            <Step6 onFinish={finishOnboarding} onBack={prevStep} />
          )}
        </div>
      </div>
    </div>
  );
}
