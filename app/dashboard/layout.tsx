"use client";

import { useState } from "react";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { TopHeader } from "./_components/TopHeader";
import { useAuth } from "@/lib/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const name = user 
    ? (user.first_name || user.last_name 
        ? `${user.first_name || ""} ${user.last_name || ""}`.trim() 
        : user.username || user.email)
    : "Guest";

  const role = user?.field_of_study || user?.university || "Career Seeker";

  const getInitials = (currentUser: any) => {
    if (!currentUser) return "U";
    if (currentUser.first_name || currentUser.last_name) {
      const first = currentUser.first_name?.[0] || "";
      const last = currentUser.last_name?.[0] || "";
      return (first + last).toUpperCase() || "U";
    }
    return (currentUser.username?.[0] || currentUser.email?.[0] || "U").toUpperCase();
  };

  const initials = getInitials(user);

  return (
    <div className="flex h-screen bg-[#F0F2F5] font-poppins overflow-hidden">
      <DashboardSidebar 
        className="hidden lg:flex" 
        isCollapsed={isSidebarCollapsed} 
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <TopHeader 
          name={name} 
          role={role} 
          initials={initials} 
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
