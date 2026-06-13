"use client";

import { Link2Off, CheckCircle2, ChevronRight } from "lucide-react";
import { useIntegrations } from "@/lib/integrations";

export const IntegrationsCard = () => {
  const { integrations, connect } = useIntegrations();

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">Integrations</h3>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => !item.connected && connect(item.id)}
              disabled={item.connected}
              className={`w-full text-left p-3 rounded-[16px] flex items-center justify-between border transition-all ${
                item.connected
                  ? "bg-emerald-50/10 border-emerald-100/80 shadow-xs cursor-default"
                  : "bg-slate-50/30 border-dashed border-slate-200 hover:border-blue-300 hover:bg-white cursor-pointer group"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm animate-in zoom-in-95">
                  <Icon className="w-5 h-5 text-slate-800" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">
                    {item.name}
                  </p>
                  <p
                    className={`text-[11px] font-medium ${
                      item.connected
                        ? "text-emerald-600 font-semibold"
                        : "text-slate-400"
                    }`}
                  >
                    {item.connected
                      ? item.handle
                        ? `@${item.handle}`
                        : "Connected"
                      : "Not connected"}
                  </p>
                </div>
              </div>
              {item.connected ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 group-hover:text-[#066EFF] group-hover:translate-x-0.5 transition-all" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
