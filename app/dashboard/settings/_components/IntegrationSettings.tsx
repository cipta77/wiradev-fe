"use client";

import { IntegrationSummary } from "./IntegrationSummary";
import { IntegrationItem } from "./IntegrationItem";
import { useIntegrations } from "@/lib/integrations";

export const IntegrationSettings = () => {
  const { integrations, connect } = useIntegrations();

  const connectedCount = integrations.filter((i) => i.connected).length;
  const notConnectedCount = integrations.filter((i) => !i.connected).length;

  return (
    <div className="p-5 md:p-8 space-y-6 md:space-y-8 w-full">
      {/* Header */}
      <div className="space-y-1 px-0.5">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins">
          Integrations & Status
        </h2>
        <p className="text-[13px] md:text-[14px] text-slate-400 font-normal font-poppins">
          Manage connected services and view connection status
        </p>
      </div>

      <IntegrationSummary
        connectedCount={connectedCount}
        disconnectedCount={0}
        notConnectedCount={notConnectedCount}
      />

      {/* Integration List */}
      <div className="space-y-4 w-full">
        {integrations.map((item) => (
          <IntegrationItem
            key={item.id}
            name={item.name}
            description={item.description}
            icon={item.icon}
            status={item.connected ? "connected" : "not-connected"}
            statusText={
              item.connected
                ? item.handle
                  ? `@${item.handle}`
                  : "Connected"
                : "Not Connected"
            }
            indicatorColor={
              item.connected
                ? "text-emerald-600 bg-emerald-50 font-semibold"
                : "text-slate-400 bg-slate-100/50"
            }
            onClick={() => !item.connected && connect(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
