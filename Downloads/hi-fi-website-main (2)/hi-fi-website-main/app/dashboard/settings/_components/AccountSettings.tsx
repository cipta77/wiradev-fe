"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const AccountSettings = () => {
  const { user, updateAccountSettings } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setUniversity(user.university || "");
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (!firstName.trim()) {
      toast.error("First name is required.");
      return;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required.");
      return;
    }
    if (!email.trim()) {
      toast.error("Email address is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!university.trim()) {
      toast.error("University/Institution is required.");
      return;
    }

    setIsSaving(true);
    try {
      await updateAccountSettings({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        university: university.trim(),
      });
      toast.success("Account settings updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update account settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-5 md:space-y-7 w-full">
      <div className="space-y-1">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins">
          Account Settings
        </h2>
        <p className="text-[13px] md:text-[14px] text-slate-400 font-normal font-poppins">
          Manage your personal information
        </p>
      </div>

      <div className="space-y-4 md:space-y-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isSaving}
              placeholder="e.g. Alex"
              className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isSaving}
              placeholder="e.g. Rahman"
              className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSaving}
            placeholder="e.g. alex.rahman@email.com"
            className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
            University / Institution
          </label>
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            disabled={isSaving}
            placeholder="e.g. Universitas Indonesia"
            className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="w-full md:w-auto px-8 py-3 bg-[#066EFF] text-white rounded-[12px] text-[15px] font-semibold font-poppins hover:bg-blue-600 transition-all active:scale-[0.98] shadow-[0_8px_20px_rgba(6,110,255,0.15)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
