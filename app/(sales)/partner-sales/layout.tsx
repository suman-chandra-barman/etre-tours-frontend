"use client";

import RouteGuard from "@/components/shared/RouteGuard";

export default function PartnerSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard allowedRoles={["partner-sales"]}>{children}</RouteGuard>;
}
