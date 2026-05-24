"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const PasswordSecuritySettings = () => {
  const { updatePassword } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (!newPassword) {
      toast.error("New password is required.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setIsUpdating(true);
    try {
      await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message || "Failed to update password. Please check your current password.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-5 md:space-y-7 w-full">
      <div className="space-y-1">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins">
          Password & Security
        </h2>
        <p className="text-[13px] md:text-[14px] text-slate-400 font-normal font-poppins">
          Update your password and security settings
        </p>
      </div>

      <div className="space-y-4 md:space-y-5 w-full">
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isUpdating}
              className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 pr-12 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              disabled={isUpdating}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#066EFF] transition-colors cursor-pointer disabled:opacity-50"
            >
              {showCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isUpdating}
              className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 pr-12 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              disabled={isUpdating}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#066EFF] transition-colors cursor-pointer disabled:opacity-50"
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-slate-700 font-poppins ml-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isUpdating}
              className="w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 pr-12 focus:bg-white focus:border-blue-200 outline-none transition-all text-[14px] text-slate-700 font-medium font-poppins disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              disabled={isUpdating}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#066EFF] transition-colors cursor-pointer disabled:opacity-50"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleUpdatePassword}
            disabled={isUpdating}
            className="w-full md:w-auto px-8 py-3 bg-[#066EFF] text-white rounded-[12px] text-[15px] font-semibold font-poppins hover:bg-blue-600 transition-all active:scale-[0.98] shadow-[0_8px_20px_rgba(6,110,255,0.15)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
