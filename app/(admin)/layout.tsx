"use client";

import Sidebar from "@/components/shared/Sidebar";
import RouteGuard from "@/components/shared/RouteGuard";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar role="admin" />
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </RouteGuard>
  );
}
