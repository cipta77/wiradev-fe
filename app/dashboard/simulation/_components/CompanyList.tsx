"use client";

import React from "react";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyItemProps {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const companies = [
  { id: "gojek", name: "Gojek", role: "Software Engineer" },
  { id: "tokopedia", name: "Tokopedia", role: "Frontend Developer" },
  { id: "bca", name: "Bank BCA", role: "IT Analyst" },
  { id: "telkom", name: "Telkom Indonesia", role: "Backend Developer" },
  { id: "shopee", name: "Shopee", role: "Full Stack Developer" },
  { id: "bukalapak", name: "Bukalapak", role: "Data Engineer" },
  { id: "traveloka", name: "Traveloka", role: "Mobile Developer" },
];

const CompanyItem = ({
  id,
  name,
  role,
  isActive,
  onClick,
}: CompanyItemProps) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={cn(
        "w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-300 border-[0.8px]",
        isActive
          ? "bg-blue-50 border-blue-100 shadow-sm shadow-blue-500/5"
          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100",
      )}
    >
      <div
        className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border-[0.8px]",
          isActive
            ? "bg-white text-[#066EFF] border-blue-50 shadow-sm shadow-blue-500/5"
            : "bg-slate-50 text-slate-400 border-slate-100",
        )}
      >
        <Building2 className="w-3.5 h-3.5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className={cn(
            "text-[13px] font-semibold font-poppins leading-tight truncate mb-0.5",
            isActive ? "text-[#066EFF]" : "text-slate-900",
          )}
        >
          {name}
        </h4>
        <p className="text-[11px] text-slate-400 font-normal truncate">
          {role}
        </p>
      </div>
    </button>
  );
};

export const CompanyList = ({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) => {
  return (
    <div
      className="bg-white rounded-[24px] flex flex-col h-full overflow-hidden transition-all hover:shadow-xl hover:shadow-slate-200/20"
      style={{ border: "1.2px solid #F1F5F9" }}
    >
      <div className="px-4 py-3 border-b border-[#F1F5F9] text-left bg-slate-50/50">
        <h3 className="text-[14px] font-semibold text-slate-800 font-poppins">
          Select Company
        </h3>
      </div>

      <div className="p-2 space-y-1 flex-1 overflow-y-auto no-scrollbar pb-4">
        {companies.map((company) => (
          <CompanyItem
            key={company.id}
            {...company}
            isActive={activeId === company.id}
            onClick={setActiveId}
          />
        ))}
      </div>
    </div>
  );
};
