"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function Step2({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { user, updateProfile } = useAuth();
  
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [university, setUniversity] = useState(user?.university || "");
  const [fieldOfStudy, setFieldOfStudy] = useState(user?.field_of_study || "");
  const [gradYear, setGradYear] = useState(user?.graduation_year?.toString() || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!firstName.trim()) {
      toast.error("First name is required.");
      return;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required.");
      return;
    }
    if (!university.trim()) {
      toast.error("University/Institution is required.");
      return;
    }
    if (!fieldOfStudy.trim()) {
      toast.error("Field of study is required.");
      return;
    }
    if (!gradYear.trim()) {
      toast.error("Graduation year is required.");
      return;
    }

    const yearNum = parseInt(gradYear, 10);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
      toast.error("Please enter a valid graduation year (e.g., 2026).");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        university: university.trim(),
        field_of_study: fieldOfStudy.trim(),
        graduation_year: yearNum,
      });
      toast.success("Profile saved successfully.");
      onNext();
    } catch (e: any) {
      toast.error(e.message || "Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 max-w-[720px] mx-auto py-4 px-4 sm:px-0">
      <div className="w-full mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0D3E9B] mb-2 tracking-tight leading-tight">
          Tell us about yourself
        </h2>
        <p className="text-[14px] md:text-[15px] font-medium text-slate-400 leading-relaxed opacity-80">
          We&apos;ll personalize your experience based on this
        </p>
      </div>

      <div className="w-full space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[14px] font-semibold text-[#0A0A1F] ml-1">
              First Name
            </Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="h-14 bg-[#F9FAFB] rounded-[14px] px-5 text-[14px] font-normal placeholder:text-[#94A3B8] focus-visible:ring-0 border border-[#E8ECF0] outline-none"
              placeholder="Alex"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-[14px] font-semibold text-[#0A0A1F] ml-1">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="h-14 bg-[#F9FAFB] rounded-[14px] px-5 text-[14px] font-normal placeholder:text-[#94A3B8] focus-visible:ring-0 border border-[#E8ECF0] outline-none"
              placeholder="Rahman"
            />
          </div>
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="university" className="text-[14px] font-semibold text-[#0A0A1F] ml-1">
            University / Institution
          </Label>
          <Input
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="h-14 bg-[#F9FAFB] rounded-[14px] px-5 text-[14px] font-normal placeholder:text-[#94A3B8] focus-visible:ring-0 border border-[#E8ECF0] outline-none"
            placeholder="e.g. Universitas Indonesia"
          />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="fieldOfStudy" className="text-[14px] font-semibold text-[#0A0A1F] ml-1">
            Field of Study
          </Label>
          <Input
            id="fieldOfStudy"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            className="h-14 bg-[#F9FAFB] rounded-[14px] px-5 text-[14px] font-normal placeholder:text-[#94A3B8] focus-visible:ring-0 border border-[#E8ECF0] outline-none"
            placeholder="e.g. Computer Science"
          />
        </div>

        <div className="space-y-2 w-full">
          <Label htmlFor="gradYear" className="text-[14px] font-semibold text-[#0A0A1F] ml-1">
            Graduation Year
          </Label>
          <Input
            id="gradYear"
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            className="h-14 bg-[#F9FAFB] rounded-[14px] px-5 text-[14px] font-normal placeholder:text-[#94A3B8] focus-visible:ring-0 border border-[#E8ECF0] outline-none"
            placeholder="2025"
          />
        </div>
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
