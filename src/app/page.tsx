// Root → /en/ is handled entirely by middleware (rewrite, no redirect).
// This file exists only to satisfy the Next.js app router.
// Making it a static export prevents a server-render redirect round-trip.
export const dynamic = "force-static";

export default function RootPage() {
  return null;
}
