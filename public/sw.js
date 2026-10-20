// Minimal service worker — enables PWA install. Network-first so data stays fresh.
// Phase 15: exclude /proposals, /api/proposals, and /api/public from SW fetch handling
// to prevent cached HTML or blocked API calls masking proposal/document behaviour.
const CACHE = "studio-os-v1";
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Exclude Phase 15 routes — always hit network
  if (
    url.pathname.startsWith("/proposals") ||
    url.pathname.startsWith("/api/proposals") ||
    url.pathname.startsWith("/api/public")
  ) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
