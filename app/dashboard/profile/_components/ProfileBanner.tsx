"use client";

import React from "react";
import { Mail, MapPin, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const ProfileBanner = () => {
  const { user } = useAuth();

  const name = user 
    ? (user.first_name || user.last_name 
        ? `${user.first_name || ""} ${user.last_name || ""}`.trim() 
        : user.username || user.email)
    : "Guest";

  const email = user?.email || "No email provided";
  const university = user?.university || "Not specified";

  const getInitials = (currentUser: any) => {
    if (!currentUser) return "U";
    if (currentUser.first_name || currentUser.last_name) {
      const first = currentUser.first_name?.[0] || "";
      const last = currentUser.last_name?.[0] || "";
      return (first + last).toUpperCase() || "U";
    }
    return (currentUser.username?.[0] || currentUser.email?.[0] || "U").toUpperCase();
  };

  const initials = getInitials(user);

  return (
    <div
      className="relative w-full rounded-[24px] overflow-hidden p-5 md:p-6 lg:p-7 text-white flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center gap-6 shadow-xl shadow-blue-500/10"
      style={{
        background: "linear-gradient(135deg, #066EFF 0%, #0D41A2 100%)",
      }}
    >
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-5 md:gap-6 z-10 w-full lg:w-auto">
        <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-[24px] bg-white/20 backdrop-blur-xl flex items-center justify-center text-[28px] md:text-[32px] font-bold border border-white/30 shadow-2xl shadow-black/10 shrink-0">
          {initials}
        </div>
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-[24px] md:text-[30px] font-bold tracking-tight leading-none">
            {name}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md text-[12px] font-normal hover:bg-white/20 transition-colors cursor-default">
              <Mail className="w-3.5 h-3.5 opacity-80" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md text-[12px] font-normal hover:bg-white/20 transition-colors cursor-default">
              <MapPin className="w-3.5 h-3.5 opacity-80" />
              <span>Indonesia</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md text-[12px] font-normal hover:bg-white/20 transition-colors cursor-default">
              <GraduationCap className="w-3.5 h-3.5 opacity-80" />
              <span>{university}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex items-center gap-2 md:gap-3 z-10 justify-center w-full lg:w-auto">
        {[
          { label: "Readiness", value: "62%" },
          { label: "Skills", value: "12" },
          { label: "Badges", value: "6" },
        ].map((stat) => (
          <div 
            key={stat.label} 
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] w-[75px] md:w-[85px] h-[75px] md:h-[85px] flex flex-col items-center justify-center gap-0.5 transition-all hover:bg-white/20 cursor-default group"
          >
            <span className="text-[18px] md:text-[20px] font-bold group-hover:scale-105 transition-transform">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-[11px] text-white/70 font-medium opacity-80">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
