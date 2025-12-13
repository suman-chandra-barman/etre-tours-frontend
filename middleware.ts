import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This would typically come from your auth session/cookie
// For now, we'll simulate it - replace with actual auth logic
function getUserRole(request: NextRequest): string | null {
  // Example: Get role from cookie or session
//   const userRole = request.cookies.get("userRole")?.value;
  const userRole = "partner-sales"; // Placeholder: replace with real logic
  return userRole || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get user role (you'll need to implement actual auth logic here)
  const userRole = getUserRole(request);

  // Define route permissions
  const routePermissions: Record<string, string[]> = {
    "/admin": ["admin"],
    "/cruise-sales": ["cruise-sales"],
    "/direct-sales": ["direct-sales"],
    "/partner-sales": ["partner-sales"],
  };

  // Check if the current path requires protection
  const protectedRoute = Object.keys(routePermissions).find((route) =>
    pathname.startsWith(route)
  );

  if (protectedRoute) {
    const allowedRoles = routePermissions[protectedRoute];

    // If no user role, redirect to home/login
    if (!userRole) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If user doesn't have permission, redirect to their dashboard
    if (!allowedRoles.includes(userRole)) {
      let redirectPath = "/";

      switch (userRole) {
        case "admin":
          redirectPath = "/admin";
          break;
        case "direct-sales":
          redirectPath = "/direct-sales";
          break;
        case "cruise-sales":
          redirectPath = "/cruise-sales";
          break;
        case "partner-sales":
          redirectPath = "/partner-sales";
          break;
      }

      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/admin/:path*",
    "/cruise-sales/:path*",
    "/direct-sales/:path*",
    "/partner-sales/:path*",
  ],
};
