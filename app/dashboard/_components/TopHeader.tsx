"use client";

import { useState } from "react";
import { Search, Bell, X, Menu } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header
      className="h-[64px] md:h-[72px] bg-white px-4 md:px-6 flex items-center justify-between shrink-0 z-40 sticky top-0"
      style={{ borderBottom: "0.8px solid #E8ECF0" }}
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

        <div className="relative w-full max-w-[360px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search features..."
            className="w-full bg-[#F5F7FA] rounded-xl h-9 md:h-10 pl-10 md:pl-11 pr-10 text-[13px] outline-none border border-transparent focus:border-blue-100 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-1">
        <button className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-slate-500 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-[#F97316] rounded-full border-2 border-white"></span>
        </button>

        <div
          className="h-7 w-px mx-4 bg-slate-200 hidden xs:block"
        />

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
