"use client";

import React, { useState } from "react";
import { Switch } from "./Switch";

const initialNotifications = [
  {
    id: "project",
    label: "Project Updates",
    description: "Get notified when projects have new content",
    enabled: true,
  },
  {
    id: "skill",
    label: "Skill Progress",
    description: "Weekly summary of your skill improvements",
    enabled: true,
  },
  {
    id: "simulations",
    label: "New Simulations",
    description: "New career simulation scenarios available",
    enabled: true,
  },
  {
    id: "code-review",
    label: "Code Review Results",
    description: "When AI completes your code review",
    enabled: false,
  },
];

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="p-5 md:p-8 space-y-5 md:space-y-7 w-full">
      <div className="space-y-1 px-0.5">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-slate-900 font-poppins">
          Notifications
        </h2>
        <p className="text-[13px] md:text-[14px] text-slate-400 font-normal font-poppins">
          Control what notifications you receive
        </p>
      </div>

      <div className="space-y-3 md:space-y-3.5 w-full">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-4 md:p-5 bg-slate-50/50 rounded-[16px] border-[0.8px] border-slate-100 flex items-center justify-between hover:border-blue-100 transition-all group"
          >
            <div className="space-y-0.5 pr-4">
              <h4 className="text-[14px] md:text-[15px] font-semibold text-slate-900 font-poppins group-hover:text-[#066EFF] transition-colors leading-tight">
                {n.label}
              </h4>
              <p className="text-[12px] md:text-[13px] text-slate-400 font-normal font-poppins leading-snug">
                {n.description}
              </p>
            </div>
            <div className="shrink-0 scale-90 md:scale-95 origin-right">
              <Switch
                checked={n.enabled}
                onChange={() => toggleNotification(n.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
