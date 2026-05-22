"use client";

import React, { useState } from "react";
import { ChevronDown, Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { id: "en-us", label: "English (US)", flag: "🇺🇸" },
  { id: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { id: "en-uk", label: "English (UK)", flag: "🇬🇧" },
  { id: "jp", label: "Japanese", flag: "🇯🇵" },
];

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export const AppearanceSettings = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("light");

  return (
    <div className="p-5 md:p-8 space-y-5 md:space-y-7 w-full">
      <div className="space-y-1">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins">
          Language & Appearance
        </h2>
        <p className="text-[13px] md:text-[14px] text-slate-400 font-normal font-poppins">
          Customize your experience
        </p>
      </div>

      <div className="space-y-4 md:space-y-5 w-full">
        <div className="space-y-2 relative">
          <label className="text-[13px] font-semibold text-slate-700 font-poppins block px-0.5">
            Language
          </label>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={cn(
              "w-full bg-slate-50 border-[0.8px] border-slate-100 rounded-[12px] px-4 py-3 flex items-center justify-between hover:border-blue-200 hover:bg-white transition-all group cursor-pointer",
              isLangOpen && "bg-white border-blue-200 ring-2 ring-blue-50",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-[16px] md:text-[18px] -mt-0.5">{selectedLang.flag}</span>
              <span className="text-[13px] md:text-[14px] font-medium text-slate-700 font-poppins">
                {selectedLang.label}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-slate-400 transition-transform duration-300",
                isLangOpen && "rotate-180 text-[#066EFF]",
              )}
            />
          </button>

          {isLangOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border-[0.8px] border-slate-200 rounded-[16px] shadow-2xl shadow-slate-200/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-2 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all hover:bg-slate-50 group text-left",
                      selectedLang.id === lang.id && "bg-blue-50",
                    )}
                  >
                    <span className="text-[18px]">{lang.flag}</span>
                    <span
                      className={cn(
                        "text-[14px] font-medium font-poppins",
                        selectedLang.id === lang.id
                          ? "text-[#066EFF]"
                          : "text-slate-600",
                      )}
                    >
                      {lang.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 pt-2">
          <label className="text-[14px] font-semibold text-slate-700 font-poppins px-0.5 block">
            Theme
          </label>
          <div className="relative flex bg-slate-100/80 border-[0.8px] border-slate-200 p-1 rounded-[16px] w-full max-w-[360px] h-12">
            <div
              className="absolute top-1 bottom-1 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border-[0.8px] border-slate-200 transition-all duration-300 ease-out z-0"
              style={{
                width: "calc(33.333% - 4px)",
                left: "4px",
                transform: `translateX(${
                  activeTheme === "light"
                    ? "0%"
                    : activeTheme === "dark"
                      ? "100%"
                      : "200%"
                })`,
              }}
            />

            {themes.map((theme) => {
              const Icon = theme.icon;
              const isActive = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={cn(
                    "relative z-10 flex-1 flex items-center justify-center gap-2 md:gap-2.5 h-full rounded-[12px] transition-all duration-300 font-medium font-poppins text-[13px] md:text-[14px] cursor-pointer whitespace-nowrap",
                    isActive
                      ? "text-[#066EFF]"
                      : "text-slate-500 hover:text-slate-700",
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive ? "text-[#066EFF]" : "text-slate-400",
                    )}
                  />
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
