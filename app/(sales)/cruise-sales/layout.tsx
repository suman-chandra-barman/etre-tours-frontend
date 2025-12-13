"use client";

import RouteGuard from "@/components/shared/RouteGuard";

export default function CruiseSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RouteGuard allowedRoles={["cruise-sales"]}>{children}</RouteGuard>;
}
