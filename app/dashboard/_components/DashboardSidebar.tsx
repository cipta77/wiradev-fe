"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShieldCheck,
  Code2,
  Briefcase,
  User,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  {
    icon: ShieldCheck,
    label: "Readiness Center",
    href: "/dashboard/readiness",
  },
  { icon: Code2, label: "Development Hub", href: "/dashboard/dev-hub" },
  {
    icon: Briefcase,
    label: "Career Simulation",
    href: "/dashboard/simulation",
  },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export const DashboardSidebar = ({
  className,
  isMobile,
  isCollapsed,
}: {
  className?: string;
  isMobile?: boolean;
  isCollapsed?: boolean;
}) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside
      className={cn(
        "bg-white flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[240px]",
        className
      )}
      style={!isMobile ? { borderRight: "0.8px solid #E8ECF0" } : undefined}
    >
      <div className={cn(
        "flex transition-all duration-300", 
        isCollapsed ? "flex-col p-6 pb-12 items-center" : "flex-row px-6.5 pt-8 pb-8 items-center justify-between"
      )}>
        <Link href="/dashboard" className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "justify-start")}>
          <Image
            src="/assets/images/logo.png"
            alt="Wirapath Logo"
            width={isCollapsed ? 28 : 110}
            height={isCollapsed ? 28 : 28}
            className="object-contain"
          />
        </Link>
        
        {isMobile && (
          <SheetClose asChild>
            <button className="lg:hidden p-2 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl transition-all active:scale-90 hover:bg-slate-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </SheetClose>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const content = (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3.5 rounded-[12px] transition-all duration-200 group",
                isCollapsed ? "px-0 justify-center h-10 w-10 mx-auto" : "px-3.5 py-2.5",
                isActive
                   ? "bg-[#066EFF] text-white"
                   : "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
              )}
            >
              <item.icon
                className={cn(
                  "w-4.5 h-4.5 transition-all duration-300",
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-600",
                  isCollapsed && "scale-105"
                )}
              />
              {!isCollapsed && <span className="text-[14px]">{item.label}</span>}
            </Link>
          );

          return isMobile ? (
            <SheetClose asChild key={item.label}>
              {content}
            </SheetClose>
          ) : (
            <React.Fragment key={item.label}>{content}</React.Fragment>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-50">
        {isMobile ? (
          <SheetClose asChild>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 px-3.5 py-2.5 w-full rounded-[12px] text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span className="text-[14px] font-medium">Log Out</span>
            </button>
          </SheetClose>
        ) : (
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3.5 rounded-[12px] text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group cursor-pointer",
              isCollapsed ? "px-0 justify-center h-10 w-10 mx-auto" : "px-3.5 py-2.5",
            )}
          >
            <LogOut className="w-4.5 h-4.5" />
            {!isCollapsed && <span className="text-[14px] font-medium">Log Out</span>}
          </button>
        )}
      </div>
    </aside>
  );
};
