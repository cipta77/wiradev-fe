"use client";

import { DashboardActivity } from "./api";

const KEY = "recent_pages_v1";
const MAX = 3;

type RecentPage = {
  route: string;
  title: string;
  type: DashboardActivity["type"] | "readiness" | "jobdesk" | "page";
};

/** Pages worth resurfacing on the Continue Working card. */
const TRACKED: Record<string, { title: string; type: RecentPage["type"] }> = {
  "/dashboard/readiness": { title: "Readiness Center", type: "page" },
  "/dashboard/dev-hub": { title: "Development Hub", type: "project" },
  "/dashboard/simulation": { title: "Career Simulation", type: "simulation" },
};

export function recordRecentPage(pathname: string): void {
  if (typeof window === "undefined") return;
  // Match exact tracked routes or their subpages (e.g. /dashboard/dev-hub/123).
  const match = Object.keys(TRACKED).find(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );
  if (!match) return;
  const entry: RecentPage = { route: match, ...TRACKED[match] };
  try {
    const existing: RecentPage[] = JSON.parse(localStorage.getItem(KEY) || "[]");
    const updated = [entry, ...existing.filter((p) => p.route !== match)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    localStorage.setItem(KEY, JSON.stringify([entry]));
  }
}

export function getRecentPages(): RecentPage[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
