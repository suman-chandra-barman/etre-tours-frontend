"use client";

import SalesSidebar from "@/components/shared/SalesSidebar";
import { useUser } from "@/contexts/UserContext";
import React from "react";
import { usePathname } from "next/navigation";

export default function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useUser();
  const pathname = usePathname();

  // Determine role based on the current path if role is not set
  const getRoleFromPath = () => {
    if (pathname.startsWith("/direct-sales")) return "direct-sales";
    if (pathname.startsWith("/cruise-sales")) return "cruise-sales";
    if (pathname.startsWith("/partner-sales")) return "partner-sales";
    return role || "direct-sales";
  };

  const currentRole = role || getRoleFromPath();

  return (
    <div className="flex h-screen bg-gray-50">
      <SalesSidebar role={currentRole} />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
