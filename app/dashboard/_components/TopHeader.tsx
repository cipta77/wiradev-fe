"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Menu,
  Home,
  ShieldCheck,
  Code2,
  Briefcase,
  User,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

type Feature = {
  labelKey: string;
  fallback: string;
  description: string;
  href: string;
  icon: LucideIcon;
  keywords: string[];
};

// Navigable features, mirroring the dashboard sidebar plus key sub-pages.
const FEATURES: Feature[] = [
  { labelKey: "nav.home", fallback: "Home", description: "Dashboard overview", href: "/dashboard", icon: Home, keywords: ["dashboard", "overview", "beranda"] },
  { labelKey: "nav.readiness", fallback: "Readiness Center", description: "Assess and track your readiness", href: "/dashboard/readiness", icon: ShieldCheck, keywords: ["readiness", "assessment", "test", "score", "kesiapan"] },
  { labelKey: "nav.devhub", fallback: "Development Hub", description: "Mini projects and code review", href: "/dashboard/dev-hub", icon: Code2, keywords: ["dev hub", "projects", "coding", "code review"] },
  { labelKey: "nav.simulation", fallback: "Career Simulation", description: "Practice interview scenarios", href: "/dashboard/simulation", icon: Briefcase, keywords: ["simulation", "interview", "career", "simulasi"] },
  { labelKey: "nav.profile", fallback: "Profile", description: "Your account details", href: "/dashboard/profile", icon: User, keywords: ["profile", "account", "profil"] },
  { labelKey: "nav.settings", fallback: "Settings", description: "Account and app settings", href: "/dashboard/settings", icon: Settings, keywords: ["settings", "preferences", "language", "theme", "integrations", "pengaturan"] },
];

export const TopHeader = ({
  name,
  role,
  initials,
  isSidebarCollapsed,
  onToggleSidebar,
}: {
  name: string;
  role: string;
  initials: string;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}) => {
  const router = useRouter();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const label = (f: Feature) => {
    const translated = t(f.labelKey);
    return translated === f.labelKey ? f.fallback : translated;
  };

  const results = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return FEATURES;
    return FEATURES.filter(
      (f) =>
        label(f).toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.keywords.some((k) => k.toLowerCase().includes(q)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setActiveIndex(0), [searchQuery]);

  const go = (href: string) => {
    setIsOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) go(results[activeIndex].href);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <header
      className="h-[64px] md:h-[72px] bg-white border-b border-[#E8ECF0] px-4 md:px-6 flex items-center justify-between shrink-0 z-40 sticky top-0"
    >
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2 -ml-2 text-slate-500 rounded-xl transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-none w-[240px]" showCloseButton={false}>
            <div className="sr-only">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Access dashboard features and settings</SheetDescription>
              </SheetHeader>
            </div>
            <DashboardSidebar isMobile={true} />
          </SheetContent>
        </Sheet>
        
        <button 
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 -ml-2 text-slate-500 rounded-xl cursor-pointer"
        >
          {isSidebarCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>

        <div ref={containerRef} className="relative w-full max-w-[360px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search features..."
            className="w-full bg-[#F5F7FA] rounded-xl h-9 md:h-10 pl-10 md:pl-11 pr-10 text-[13px] outline-none border border-transparent focus:border-blue-100 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setIsOpen(true);
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {isOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border-[0.8px] border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-[13px] text-slate-400 font-medium">
                  No features found
                </div>
              ) : (
                <div className="p-2 space-y-0.5 max-h-[360px] overflow-y-auto">
                  {results.map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.href}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => go(f.href)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                          i === activeIndex ? "bg-blue-50" : "hover:bg-slate-50",
                        )}
                      >
                        <span
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            i === activeIndex ? "bg-[#066EFF] text-white" : "bg-slate-100 text-slate-500",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold text-slate-700 truncate">
                            {label(f)}
                          </span>
                          <span className="block text-[11px] text-slate-400 truncate">
                            {f.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#066EFF] flex items-center justify-center text-white font-normal text-[12px] md:text-[14px] cursor-pointer">
            {initials}
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[13px] font-bold text-slate-800 leading-tight">
              {name}
            </span>
            <span className="text-[11px] font-normal text-slate-400">
              {role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
