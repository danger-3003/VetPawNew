// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // If user is logged in, block /login
  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user tries to access protected routes without token
  const protectedRoutes = ["/bookings", "/profile", "/reset-password", "/cart"];
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/bookings/:path*", "/profile/:path*", "/reset-password/:path*", "/cart/:path*"],
};
