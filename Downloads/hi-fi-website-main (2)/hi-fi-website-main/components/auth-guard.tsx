"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isPublicPath =
      pathname === "/" || pathname === "/signin" || pathname === "/signup";
    const isOnboardingPath = pathname.startsWith("/onboarding");
    const isDashboardPath = pathname.startsWith("/dashboard");

    if (!isAuthenticated) {
      if (isDashboardPath || isOnboardingPath) {
        router.push("/signin");
      }
    } else {
      if (user?.onboarding_completed) {
        if (
          pathname === "/signin" ||
          pathname === "/signup" ||
          isOnboardingPath
        ) {
          router.push("/dashboard");
        }
      } else {
        if (
          isDashboardPath ||
          pathname === "/signin" ||
          pathname === "/signup"
        ) {
          router.push("/onboarding");
        }
      }
    }
  }, [isAuthenticated, user, isLoading, pathname, router]);

  const isPublicPath =
    pathname === "/" || pathname === "/signin" || pathname === "/signup";
  const isOnboardingPath = pathname.startsWith("/onboarding");
  const isDashboardPath = pathname.startsWith("/dashboard");

  const willRedirect =
    (isAuthenticated &&
      ((user?.onboarding_completed &&
        (pathname === "/signin" ||
          pathname === "/signup" ||
          isOnboardingPath)) ||
        (!user?.onboarding_completed &&
          (isDashboardPath ||
            pathname === "/signin" ||
            pathname === "/signup")))) ||
    (!isAuthenticated && (isDashboardPath || isOnboardingPath));

  if (isLoading || willRedirect) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center font-poppins z-50 animate-in fade-in duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#066EFF] border-r-[#066EFF] animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-1.5 mt-2">
            <span className="text-[15px] font-bold text-[#0D3E9B] tracking-wide">
              Wirapath
            </span>
            <span className="text-[12px] font-medium text-slate-400">
              Loading your workspace...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
