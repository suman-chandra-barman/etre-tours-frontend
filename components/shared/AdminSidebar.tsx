"use client";

import {
  Users,
  LayoutDashboard,
  FileText,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

function AdminSidebar() {
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: <FileText className="w-6 h-6 mb-1" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="w-6 h-6 mb-1" />,
    },
  ];

  // Check if a link is active
  const isActiveLink = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <Link
        href={`/admin`}
        className="mb-4 transition-opacity hover:opacity-80"
        aria-label="Home"
      >
        <Image
          src="/logo.svg"
          alt="ETRE Tours Logo"
          width={32}
          height={32}
          priority
        />
      </Link>

      {/* Navigation Links */}
      <nav
        className="flex flex-col items-center space-y-6 flex-1"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => {
          const isActive = isActiveLink(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200",
                isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
              )}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
            >
              {link.icon}
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
