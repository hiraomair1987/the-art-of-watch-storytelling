import { NextResponse, type NextRequest } from "next/server";

/**
 * Keep search engines from indexing temporary Vercel addresses
 * (*.vercel.app). Only the real domain (efficiovirtual.com) should appear in
 * Google. Nothing changes for visitors — this only adds a header for crawlers.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  // Run on pages only, not on static files and images.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png).*)"],
};
