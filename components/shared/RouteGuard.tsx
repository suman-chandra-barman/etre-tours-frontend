"use client";

import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function RouteGuard({
  children,
  allowedRoles,
}: RouteGuardProps) {
  const { user, role } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || !role) {
      // Redirect to login or home page if no user
      router.push("/");
      return;
    }

    if (!allowedRoles.includes(role)) {
      // Redirect to appropriate page based on user role
      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "direct-sales":
          router.push("/direct-sales");
          break;
        case "cruise-sales":
          router.push("/cruise-sales");
          break;
        case "partner-sales":
          router.push("/partner-sales");
          break;
        default:
          router.push("/");
      }
    }
  }, [user, role, allowedRoles, router]);

  // Don't render children if user doesn't have access
  if (!user || !role || !allowedRoles.includes(role)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
