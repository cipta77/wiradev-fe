import type { Metadata } from "next";
import { Poppins, Darker_Grotesque } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { AuthGuard } from "@/components/auth-guard";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const darkerGrotesque = Darker_Grotesque({
  variable: "--font-darker-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wirapath - Skill Analysis & Career Prep",
  description:
    "Identify and close the gap between your university skills and industry requirements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${darkerGrotesque.variable} h-full antialiased scroll-smooth`}
    >
      <body
        className="min-h-full flex flex-col bg-white"
        cz-shortcut-listen="true"
      >
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
        <Toaster position="top-center" richColors />
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
