"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type LanguageId = "en-us" | "id" | "en-uk" | "jp";

// Translation dictionaries. English variants share the base English strings.
// Keys are stable identifiers used across the app; missing keys fall back to
// the key's English value so untranslated strings still render gracefully.
const en: Record<string, string> = {
  "settings.title": "Settings",
  "settings.subtitle": "Manage your account settings and preferences.",
  "settings.account": "Account",
  "settings.security": "Password & Security",
  "settings.notifications": "Notifications",
  "settings.appearance": "Language & Appearance",
  "settings.integrations": "Integrations",
  "settings.support": "Help & Support",
  "appearance.title": "Language & Appearance",
  "appearance.subtitle": "Customize your experience",
  "appearance.language": "Language",
  "appearance.theme": "Theme",
  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.system": "System",
  "nav.home": "Home",
  "nav.readiness": "Readiness Center",
  "nav.devhub": "Development Hub",
  "nav.simulation": "Career Simulation",
  "nav.profile": "Profile",
  "nav.settings": "Settings",
  "nav.logout": "Log Out",
};

const id: Record<string, string> = {
  "settings.title": "Pengaturan",
  "settings.subtitle": "Kelola pengaturan akun dan preferensi Anda.",
  "settings.account": "Akun",
  "settings.security": "Kata Sandi & Keamanan",
  "settings.notifications": "Notifikasi",
  "settings.appearance": "Bahasa & Tampilan",
  "settings.integrations": "Integrasi",
  "settings.support": "Bantuan & Dukungan",
  "appearance.title": "Bahasa & Tampilan",
  "appearance.subtitle": "Sesuaikan pengalaman Anda",
  "appearance.language": "Bahasa",
  "appearance.theme": "Tema",
  "theme.light": "Terang",
  "theme.dark": "Gelap",
  "theme.system": "Sistem",
  "nav.home": "Beranda",
  "nav.readiness": "Pusat Kesiapan",
  "nav.devhub": "Pusat Pengembangan",
  "nav.simulation": "Simulasi Karier",
  "nav.profile": "Profil",
  "nav.settings": "Pengaturan",
  "nav.logout": "Keluar",
};

const jp: Record<string, string> = {
  "settings.title": "設定",
  "settings.subtitle": "アカウント設定と環境設定を管理します。",
  "settings.account": "アカウント",
  "settings.security": "パスワードとセキュリティ",
  "settings.notifications": "通知",
  "settings.appearance": "言語と外観",
  "settings.integrations": "連携",
  "settings.support": "ヘルプとサポート",
  "appearance.title": "言語と外観",
  "appearance.subtitle": "体験をカスタマイズ",
  "appearance.language": "言語",
  "appearance.theme": "テーマ",
  "theme.light": "ライト",
  "theme.dark": "ダーク",
  "theme.system": "システム",
  "nav.home": "ホーム",
  "nav.readiness": "準備センター",
  "nav.devhub": "開発ハブ",
  "nav.simulation": "キャリアシミュレーション",
  "nav.profile": "プロフィール",
  "nav.settings": "設定",
  "nav.logout": "ログアウト",
};

const DICTIONARIES: Record<LanguageId, Record<string, string>> = {
  "en-us": en,
  "en-uk": en,
  id,
  jp,
};

const HTML_LANG: Record<LanguageId, string> = {
  "en-us": "en",
  "en-uk": "en-GB",
  id: "id",
  jp: "ja",
};

interface LanguageContextValue {
  lang: LanguageId;
  setLang: (lang: LanguageId) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "wirapath-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageId>("en-us");

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as LanguageId | null)
      : null);
    if (stored && DICTIONARIES[stored]) {
      setLangState(stored);
      document.documentElement.lang = HTML_LANG[stored];
    }
  }, []);

  const setLang = (next: LanguageId) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = HTML_LANG[next];
    }
  };

  const t = (key: string) => {
    const dict = DICTIONARIES[lang] || en;
    return dict[key] ?? en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback so components don't crash if used outside the provider.
    return {
      lang: "en-us" as LanguageId,
      setLang: () => {},
      t: (key: string) => en[key] ?? key,
    };
  }
  return ctx;
}
