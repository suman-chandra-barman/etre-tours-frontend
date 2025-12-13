"use client";

import RouteGuard from "@/components/shared/RouteGuard";

export default function DirectSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard allowedRoles={["direct-sales"]}>{children}</RouteGuard>;
}
