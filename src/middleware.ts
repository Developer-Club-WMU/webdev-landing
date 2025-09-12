import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env"; // Make sure this points to your env setup

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: env.NEXTAUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "development"
        ? "authjs.session-token"
        : "__Secure-authjs.session-token",
  });
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/officer");

  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/officer", "/officer/:path*"],
};
