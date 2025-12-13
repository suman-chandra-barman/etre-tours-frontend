"use client";

import {
  Clock,
  Users,
  Hotel,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/user";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  role: UserRole;
}

function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  // Define role-based navigation links
  const roleNavLinks: Record<UserRole, NavLink[]> = {
    admin: [],
    "direct-sales": [
      {
        href: "/direct-sales",
        label: "Tickets",
        icon: (
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
          </svg>
        ),
      },
      {
        href: "/direct-sales/history",
        label: "History",
        icon: <Clock className="w-6 h-6 mb-1" />,
      },
    ],
    "cruise-sales": [
      {
        href: "/cruise-sales",
        label: "Headcounts",
        icon: <Users className="w-6 h-6 mb-1" />,
      },
      {
        href: "/cruise-sales/history",
        label: "History",
        icon: <Clock className="w-6 h-6 mb-1" />,
      },
    ],
    "partner-sales": [
      {
        href: "/partner-sales",
        label: "Hotels",
        icon: <Hotel className="w-6 h-6 mb-1" />,
      },
      {
        href: "/partner-sales/history",
        label: "History",
        icon: <Clock className="w-6 h-6 mb-1" />,
      },
    ],
  };

  const navLinks = roleNavLinks[role] || [];

  // Check if a link is active
  const isActiveLink = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <Link
        href={`/${role}`}
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

export default Sidebar;
