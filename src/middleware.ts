import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  // Check if the route is protected (officer routes)
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/officer");

  // If accessing a protected route without authentication, redirect to signin
  if (isProtectedRoute && !session?.user) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/officer",
    "/officer/:path*",
    // Add other protected routes here as needed
  ],
};
