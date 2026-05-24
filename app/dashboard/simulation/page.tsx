"use client";

import React, { useState } from "react";
import { SimulationHeader } from "./_components/SimulationHeader";
import { SimulationTabs } from "./_components/SimulationTabs";
import { CompanyList } from "./_components/CompanyList";
import { ChatSimulation } from "./_components/ChatSimulation";
import { ScenarioCard } from "./_components/ScenarioCard";
import { JobdeskAnalyzer } from "./_components/JobdeskAnalyzer";

export default function CareerSimulationPage() {
  const [activeTab, setActiveTab] = useState("recruiter");
  const [activeCompanyId, setActiveCompanyId] = useState("gojek");

  const getCompanyName = (id: string) => {
    const map: Record<string, string> = {
      gojek: "Gojek",
      tokopedia: "Tokopedia",
      bca: "Bank BCA",
      telkom: "Telkom Indonesia",
      shopee: "Shopee",
      bukalapak: "Bukalapak",
      traveloka: "Traveloka",
    };
    return map[id] || "Company";
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:px-8 lg:px-10 py-3 md:py-4 space-y-3 md:space-y-4 shrink-0">
        <SimulationHeader />

        <div className="flex justify-start">
          <SimulationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-10 pt-2 md:pt-0 flex flex-col">
        {activeTab === "recruiter" ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
              <div className="lg:col-span-4 h-fit lg:h-full min-h-0 order-2 lg:order-1 overflow-y-auto no-scrollbar">
                <CompanyList
                  activeId={activeCompanyId}
                  setActiveId={setActiveCompanyId}
                />
              </div>

              <div className="lg:col-span-8 h-[480px] order-1 lg:order-2">
                <ChatSimulation companyName={getCompanyName(activeCompanyId)} />
              </div>
            </div>
            <div className="h-6 md:h-10 w-full" />
          </div>
        ) : activeTab === "salary" ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
              <div className="lg:col-span-4 h-fit lg:h-full min-h-0 order-2 lg:order-1">
                <ScenarioCard />
              </div>

              <div className="lg:col-span-8 h-[480px] order-1 lg:order-2">
                <ChatSimulation
                  type="salary"
                  showSuggestions={false}
                  companyName=""
                />
              </div>
            </div>
            <div className="h-6 md:h-10 w-full" />
          </div>
        ) : activeTab === "jobdesk" ? (
          <div className="flex-1 flex flex-col">
            <JobdeskAnalyzer />
            <div className="lg:hidden h-8 w-full shrink-0" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 p-6 md:p-10 bg-white rounded-[24px] border border-[#E8ECF0]/80">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-6 border-[0.8px] border-slate-100">
              <span className="text-[28px] md:text-[32px]">⏳</span>
            </div>
            <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins mb-2 text-center">
              Simulation Module Coming Soon
            </h2>
            <p className="text-[14px] md:text-[15px] text-slate-400 text-center max-w-md font-normal">
              We&apos;re currently training our AI simulation engine for{" "}
              {activeTab === "salary"
                ? "salary negotiation"
                : "jobdesk analysis"}
              . Stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
