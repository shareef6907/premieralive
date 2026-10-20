import { NextRequest, NextResponse } from "next/server";

// ── Supported locales for the public site ────────────────────────────────────
const SUPPORTED_LOCALES = ["en", "ar"];

// Paths that belong to Studio OS — skip locale rewrite, let (studio) handle it
const STUDIO_PATHS = ["/agency", "/prospects"];
// Paths that are public API or system routes — skip entirely
const SKIP_PATHS = ["/api/", "/_next", "/favicon", "/og", "/u/", "/sitemap", "/robots", "/sw."];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Studio OS paths: let the client-side AuthProvider handle auth ─────────
  // Middleware just passes these through unchanged.
  if (STUDIO_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ── System / skip paths: pass through unchanged ───────────────────────────
  if (SKIP_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ── Public site: bare paths → rewrite to /en prefix ────────────────────────
  // Already has locale prefix → let it through
  if (SUPPORTED_LOCALES.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)) {
    return NextResponse.next();
  }

  // Redirect bare /ar (no trailing slash) to /ar/ to avoid 404 on [locale] route
  if (pathname === "/ar") {
    const url = request.nextUrl.clone();
    url.pathname = "/ar/";
    return NextResponse.redirect(url, 308);
  }

  // Rewrite bare paths (no locale) to /en<path>
  // Root / → /en/ (trailing slash required by [locale] route)
  const rewritePath = pathname === "/" ? "/en/" : `/en${pathname}`;
  const url = request.nextUrl.clone();
  url.pathname = rewritePath;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files served from /public
     * - Static asset extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)",
  ],
};
