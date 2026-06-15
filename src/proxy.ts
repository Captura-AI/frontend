import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route protection (Next.js 16 Proxy — formerly Middleware).
 *
 * Optimistic auth gate only: presence of the session cookie guards
 * `/account/*` and `/dashboard/*`, and the photographer area additionally
 * checks the role claim decoded from the JWT. Real authorization is enforced
 * server-side by the backend guards — this is purely a UX redirect, per the
 * Next.js guidance that Proxy must not be the sole authorization layer.
 */

const ACCESS_TOKEN_COOKIE = "fe_access_token";
const PHOTOGRAPHER_PREFIX = "/dashboard/photographer";

type Role = "user" | "photographer" | "admin";

function decodeRoleClaim(token: string): Role | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) {
      return null;
    }
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const claims = JSON.parse(atob(padded)) as { role?: unknown };
    return typeof claims.role === "string" ? (claims.role as Role) : null;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(PHOTOGRAPHER_PREFIX)) {
    const role = decodeRoleClaim(token);
    // Only block when we positively know the role is not allowed; if the claim
    // is unreadable we defer to the backend guard rather than false-blocking.
    if (role && role !== "photographer" && role !== "admin") {
      return NextResponse.redirect(new URL("/account/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/dashboard/:path*"],
};
