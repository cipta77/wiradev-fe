"use client";

import React from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { NotionIcon } from "@/components/icons/NotionIcon";

export type IntegrationId = "google" | "github" | "linkedin" | "notion";

export interface IntegrationDef {
  id: IntegrationId;
  /** Auth-provider key as stored in `user.providers`. */
  provider: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Whether a real OAuth connect flow is wired up for this provider. */
  connectable: boolean;
}

// Single source of truth shared by the Profile and Settings integration views
// so their status and ordering always match.
export const INTEGRATION_DEFS: IntegrationDef[] = [
  {
    id: "google",
    provider: "google",
    name: "Google Drive",
    description: "Document storage & sync",
    icon: GoogleIcon,
    connectable: true,
  },
  {
    id: "github",
    provider: "github",
    name: "GitHub",
    description: "Repository sync & project review",
    icon: GithubIcon,
    connectable: true,
  },
  {
    id: "linkedin",
    provider: "linkedin",
    name: "LinkedIn",
    description: "Profile sync & job matching",
    icon: LinkedinIcon,
    connectable: false,
  },
  {
    id: "notion",
    provider: "notion",
    name: "Notion",
    description: "Notes & project documentation",
    icon: NotionIcon,
    connectable: false,
  },
];

export interface IntegrationStatus extends IntegrationDef {
  connected: boolean;
  /** GitHub username (or similar handle) when connected. */
  handle?: string;
}

export function useIntegrations() {
  const { user } = useAuth();
  const providers = user?.providers || [];

  const integrations: IntegrationStatus[] = INTEGRATION_DEFS.map((def) => {
    const connected = providers.includes(def.provider);
    return {
      ...def,
      connected,
      handle:
        def.id === "github" && connected
          ? user?.username || user?.github_username || undefined
          : undefined,
    };
  });

  /** Kick off the connect / sync flow for a given integration. */
  const connect = (id: IntegrationId) => {
    if (typeof window === "undefined") return;
    switch (id) {
      case "google":
        // Re-uses the Google OAuth entry; linking happens by email server-side.
        window.location.href = "/google-login";
        break;
      case "github":
        // No redirect_uri -> keeps the session in the web app and links GitHub.
        window.location.href = "/github-login?is_signup=false";
        break;
      default:
        toast.info(
          `${INTEGRATION_DEFS.find((d) => d.id === id)?.name} integration is coming soon.`,
        );
    }
  };

  return { integrations, connect };
}
