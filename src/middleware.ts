import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env"; // Make sure this points to your env setup

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  console.log("Secret: ", env.NEXTAUTH_SECRET);

  console.log("🔐 Middleware - token:", token);
  console.log("🔒 Path:", req.nextUrl.pathname);

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/officer");

  if (isProtectedRoute && !token) {
    console.log("➡️ Redirecting to sign-in...");
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/officer", "/officer/:path*"],
};
