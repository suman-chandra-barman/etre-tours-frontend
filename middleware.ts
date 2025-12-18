import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Constants
const ROUTES = {
  LOGIN: "/login",
  ADMIN: "/admin",
  CRUISE_SALES: "/cruise-sales",
  DIRECT_SALES: "/direct-sales",
  PARTNER_SALES: "/partner-sales",
} as const;

type UserRole = "admin" | "cruise-sales" | "direct-sales" | "partner-sales";

// Route permissions mapping
const ROUTE_PERMISSIONS: Record<string, UserRole[]> = {
  [ROUTES.ADMIN]: ["admin"],
  [ROUTES.CRUISE_SALES]: ["cruise-sales"],
  [ROUTES.DIRECT_SALES]: ["direct-sales"],
  [ROUTES.PARTNER_SALES]: ["partner-sales"],
};

// Role to dashboard mapping
const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  admin: ROUTES.ADMIN,
  "cruise-sales": ROUTES.CRUISE_SALES,
  "direct-sales": ROUTES.DIRECT_SALES,
  "partner-sales": ROUTES.PARTNER_SALES,
};

/**
 * Get user role from request
 * TODO: Replace with actual auth logic (e.g., JWT verification, session validation)
 */
function getUserRole(request: NextRequest): UserRole | null {
  // Example: Get role from cookie or session
  // const userRole = request.cookies.get("userRole")?.value;
  const userRole = "admin"; // Placeholder: replace with real logic

  // Suppress unused variable warning - request will be used when implementing actual auth
  void request;

  return (userRole as UserRole) || null;
}

/**
 * Redirect user to their role-specific dashboard
 */
function redirectToDashboard(
  userRole: UserRole | null,
  request: NextRequest
): NextResponse {
  if (!userRole || !(userRole in ROLE_DASHBOARD_MAP)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }
  return NextResponse.redirect(
    new URL(ROLE_DASHBOARD_MAP[userRole], request.url)
  );
}

/**
 * Check if user has access to the requested route
 */
function hasAccess(pathname: string, userRole: UserRole | null): boolean {
  const protectedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
    pathname.startsWith(route)
  );

  if (!protectedRoute) {
    return true; // Route is not protected
  }

  if (!userRole) {
    return false; // No user role
  }

  return ROUTE_PERMISSIONS[protectedRoute].includes(userRole);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = getUserRole(request);

  // Handle root route - redirect to role-based dashboard
  if (pathname === "/") {
    return redirectToDashboard(userRole, request);
  }

  // Check authentication for protected routes
  if (!userRole) {
    const protectedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
      pathname.startsWith(route)
    );

    if (protectedRoute) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  // Check authorization for protected routes
  if (userRole && !hasAccess(pathname, userRole)) {
    return redirectToDashboard(userRole, request);
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/cruise-sales/:path*",
    "/direct-sales/:path*",
    "/partner-sales/:path*",
  ],
};
