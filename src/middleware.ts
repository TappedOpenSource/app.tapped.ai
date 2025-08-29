// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// the following code is taken from : https://nextjs.org/docs/advanced-features/middleware#setting-headers
export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/map", request.url), {
      headers: requestHeaders,
    });
  }

  // You can also set request headers in NextResponse.rewrite
  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
}

// the following code has been copied from https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
