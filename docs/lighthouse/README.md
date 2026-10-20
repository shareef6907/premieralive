# Lighthouse Mobile Reports

## Summary

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| / (EN) | 67 | 91 | 96 | 91 |
| /ar/ (AR) | 88 | 91 | 96 | 91 |

Generated: 2026-10-19
Profile: Mobile (390×844)
Categories: Performance, Accessibility, Best Practices, SEO

## Known Issues (both pages)

- meta-viewport: `user-scalable="no"` should be removed (not set by us, inherited from CSS reset or framework)
- meta-description: Not present on the home page — needs to be added via metadata
- links rely on color: Contrast of link text vs body text — check brand colors
- unused-css-rules: Tailwind CSS purge may not be 100% effective in Vercel build
- unused-javascript: Next.js chunk overhead; investigate code splitting
- legacy-javascript: Some dependency ships ES5; investigate modern polyfill strategy
- cache-insight: Vercel cache headers for static assets

## Files
- `home-en-mobile.json` — Lighthouse JSON report for /
- `home-ar-mobile.json` — Lighthouse JSON report for /ar/
