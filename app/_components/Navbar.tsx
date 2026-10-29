"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/88 backdrop-blur-md border-b-[0.8px] border-gray-200 dark:border-slate-700 h-16 md:h-20 flex items-center shadow-sm shadow-black/5">
      <div className="container mx-auto flex items-center justify-between max-w-[1248px] px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8 lg:gap-14">
          <Link href="/" className="flex items-center -mt-1 transition-opacity hover:opacity-90">
            <Image
              src="/assets/images/logo.png"
              alt="WiraDev Logo"
              width={220}
              height={32}
              className="w-auto object-contain h-[24px] md:h-[32px]"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-[14px] font-semibold text-gray-400 dark:text-slate-400">
            <Link href="#features" className="hover:text-[#066EFF] transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-[#066EFF] transition-colors">
              How It Works
            </Link>
            <Link href="#testimonials" className="hover:text-[#066EFF] transition-colors">
              Testimonials
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="w-[18px] h-[18px]" />
              ) : (
                <Moon className="w-[18px] h-[18px]" />
              )
            ) : (
              <span className="w-[18px] h-[18px]" />
            )}
          </button>

          <Link
            href="/signin"
            className="whitespace-nowrap text-[14px] md:text-[16px] font-semibold text-[#066EFF] hover:text-[#0556cc] transition-colors"
          >
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="bg-[#066EFF] hover:bg-[#0556cc] rounded-[10px] md:rounded-[14px] px-4 md:px-6 h-9 md:h-12 text-[13px] md:text-[15px] font-bold shadow-lg shadow-blue-500/25 transition-all active:scale-95">
              Get Started<span className="hidden sm:inline"> Free</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
