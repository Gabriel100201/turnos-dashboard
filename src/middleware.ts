import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionCookie = req.cookies.get("session-token");

  if (isMainPath(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !sessionCookie) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ]
}

function isMainPath (pathName: string): boolean {
  const isMainPath = pathName == "/";
  return isMainPath;
}