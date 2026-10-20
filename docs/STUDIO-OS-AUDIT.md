# Studio OS Audit — Agency Repo

**Audited:** Mon 19 Oct 2026
**Repo:** `github.com/shareef6907/Agency`
**Main SHA:** `7c29362` — Merge pull request #36 from shareef6907/feat/phase16-retainers-v2
**Branch:** `feat/local-ai-site` (to be created)

---

## A. Page Routes

All in `src/app/(app)/` (route group) and `src/app/login/page.tsx`.

| Page | URL | Auth Required | Notes |
|------|-----|---------------|-------|
| `(app)/page.tsx` | `/` | Yes | Dashboard |
| `(app)/crm/page.tsx` | `/crm` | Yes | Sales CRM |
| `(app)/prospects/page.tsx` | `/prospects` | Yes | Prospects list |
| `(app)/clients/page.tsx` | `/clients` | Yes | Clients |
| `(app)/tasks/page.tsx` | `/tasks` | Yes | Tasks |
| `(app)/payments/page.tsx` | `/payments` | Yes | Payments |
| `(app)/finance/page.tsx` | `/finance` | Yes | Finance |
| `(app)/revenue/page.tsx` | `/revenue` | Yes | Revenue |
| `(app)/accounting/page.tsx` | `/accounting` | Yes | Accounting |
| `(app)/team/page.tsx` | `/team` | Yes | Team |
| `(app)/whatsapp/page.tsx` | `/whatsapp` | Yes | WhatsApp queue |
| `(app)/proposals/page.tsx` | `/proposals` | Yes | Proposals list |
| `(app)/proposals/new/page.tsx` | `/proposals/new` | Yes | New proposal |
| `(app)/proposals/[id]/page.tsx` | `/proposals/[id]` | Yes | Proposal detail |
| `(app)/proposals/rates/page.tsx` | `/proposals/rates` | Yes | Rate card |
| `(app)/replies/page.tsx` | `/replies` | Yes | Replies |
| `(app)/outbound/page.tsx` | `/outbound` | Yes | Outbound CRM |

| Page | URL | Auth Required | Notes |
|------|-----|---------------|-------|
| `login/page.tsx` | `/login` | No | Login page (entry point) |

**Auth mechanism:** Client-side via `AuthProvider.tsx` (wraps all `(app)/` routes). No Next.js middleware. `supabase.auth.getSession()` + `supabase.auth.onAuthStateChange()`. When no session, redirects to `/login`. When session exists, redirects to `/` (dashboard).

**No `src/app/layout.tsx` providers needed by Studio OS pages** — the root layout is bare: `<html><body>{children}</body></html>` + a service worker registration. Studio OS pages get their auth/provider wrapper from `(app)/layout.tsx`.

---

## B. API Routes

All in `src/app/api/`. **These stay at root — they do NOT move.**

| Route | Path | Called By | In vercel.json crons |
|-------|------|-----------|----------------------|
| `api/keep-alive/route.ts` | `/api/keep-alive` | Vercel cron | ✅ `0 3 * * *` |
| `api/outbound/send/route.ts` | `/api/outbound/send` | Vercel cron | ✅ `0 * * * *` |
| `api/outbound/inbox/route.ts` | `/api/outbound/inbox` | Vercel cron | ✅ `*/15 * * * *` |
| `api/outbound/discover/route.ts` | `/api/outbound/discover` | Vercel cron | ✅ `0 6 * * 0-4` |
| `api/outbound/whatsapp/route.ts` | `/api/outbound/whatsapp` | Browser (whatsapp page) | No |
| `api/outbound/enrol/route.ts` | `/api/outbound/enrol` | Browser (outbound page) | No |
| `api/admin/create-user/route.ts` | `/api/admin/create-user` | Browser (team page) | No |
| `api/admin/delete-user/route.ts` | `/api/admin/delete-user` | Browser (team page) | No |
| `api/me/route.ts` | `/api/me` | Browser | No |
| `api/attachments/presign/route.ts` | `/api/attachments/presign` | Browser | No |
| `api/attachments/[id]/presign/route.ts` | `/api/attachments/[id]/presign` | Browser | No |
| `api/attachments/[id]/confirm/route.ts` | `/api/attachments/[id]/confirm` | Browser (S3 callback) | No |
| `api/proposals/rate-card/route.ts` | `/api/proposals/rate-card` | Browser | No |
| `api/proposals/documents/route.ts` | `/api/proposals/documents` | Browser | No |
| `api/proposals/documents/[id]/route.ts` | `/api/proposals/documents/[id]` | Browser | No |
| `api/proposals/documents/[id]/pdf/route.ts` | `/api/proposals/documents/[id]/pdf` | Browser | No |
| `api/proposals/documents/[id]/invoice/route.ts` | `/api/proposals/documents/[id]/invoice` | Browser | No |
| `api/proposals/documents/[id]/attachments/route.ts` | `/api/proposals/documents/[id]/attachments` | Browser | No |
| `api/proposals/documents/[id]/attachments/[attachmentId]/download/route.ts` | `/api/proposals/documents/[id]/attachments/[attachmentId]/download` | Browser (S3 signed URL download) | No |
| `api/proposals/documents/send/route.ts` | `/api/proposals/documents/send` | Browser | No |
| `api/proposals/approvals/route.ts` | `/api/proposals/approvals` | Browser | No |
| `api/proposals/approvals/[id]/route.ts` | `/api/proposals/approvals/[id]` | Browser | No |
| `api/public/proposals/[share_token]/pdf/route.ts` | `/api/public/proposals/[share_token]/pdf` | **External (email link)** | No |
| `u/[id]/route.ts` | `/u/[id]` | **External (email unsubscribe link)** | No |

---

## C. Externally-Referenced URLs

These must NOT move. All are at root level (not under `/agency`):

| URL | Used In | Type |
|-----|---------|------|
| `/u/[id]` (GET + POST) | Outbound emails (sender.ts) — `NEXT_PUBLIC_APP_URL/u/{enrolment_id}` | Unsubscribe link (in `List-Unsubscribe` header + body) |
| `/api/public/proposals/[share_token]/pdf` | Emails to prospects/clients — proposal PDF links | Public proposal PDF |
| `/api/attachments/[id]/confirm` | S3 bucket (event notification) | Inbound webhook |
| `/api/proposals/documents/[id]/attachments/[attachmentId]/download` | Browser (signed URL) | Download |

**The `/u/[id]` URL is the most critical** — every email sent to a prospect contains this link. It is constructed as `${process.env.NEXT_PUBLIC_APP_URL}/u/${e.id}` in `src/lib/outbound/sender.ts`. The env var must continue pointing to the domain root after the move.

---

## D. Auth Flow

- **Login:** `src/app/login/page.tsx` — calls `supabase.auth.signInWithPassword()`. Redirects to `/` (dashboard) on success.
- **Session:** Stored in Supabase cookies via `@supabase/ssr` pattern in `src/lib/supabase.ts` (`persistSession: true, autoRefreshToken: true`).
- **Auth guard:** `src/components/AuthProvider.tsx` — client-side. Checks session on mount, redirects to `/login` if none.
- **Protected routes:** All `(app)/` pages wrapped with `<AuthProvider>` in `(app)/layout.tsx`.
- **Supabase Auth redirect/callback:** No OAuth providers are used. No `/auth/callback` route exists. Supabase Auth uses email/password only. **No Supabase Auth URL configuration update is required.**
- **After-login redirect:** `router.replace("/")` in `login/page.tsx` → after move, this should become `/agency`.
- **Auth redirect from AuthProvider:** `router.replace("/login")` in `AuthProvider.tsx` → after move, this should become `/agency/login`.

---

## E. Env Vars Containing This Domain

| Var | Used In | Purpose |
|-----|---------|---------|
| `NEXT_PUBLIC_APP_URL` | `src/lib/outbound/sender.ts` | Builds unsubscribe URL: `${NEXT_PUBLIC_APP_URL}/u/${id}` |
| `NEXT_PUBLIC_SUPABASE_URL` | All Supabase client initializations | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts` | Supabase anon key (browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | All server-side Supabase clients | Bypasses RLS |

**No `NEXT_PUBLIC_APP_URL` change required** — it points to the domain root and `/u/[id]` stays at root.

**Required env vars NOT in `.env.example`** (must be present in Vercel):
- `SMTP_USER`, `SMTP_APP_PASSWORD`, `DAILY_SEND_CAP`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

---

## F. Layout Architecture

**Current root layout** (`src/app/layout.tsx`):
```tsx
// Bare shell — no providers, no shared state
export default function RootLayout({ children }) {
  return <html><body>{children}<SW registration /></body></html>
}
```

**Studio OS layout** (`src/app/(app)/layout.tsx`):
- Client component
- Contains `<AuthProvider>` wrapping all studio pages
- Contains sidebar nav with links: `/`, `/crm`, `/prospects`, etc.
- Logo links to `href="/"` (dashboard)
- Imports `globals.css` (Tailwind-based)

**Plan:** Move `(app)/` → `(studio)/agency/`. Move `login/page.tsx` → `(studio)/agency/login/page.tsx`. Move root `layout.tsx` → `(studio)/agency/layout.tsx`. Give public site `(public)/[locale]/` its own layout and `public.css`.

---

## G. Internal Link Summary (grep output)

From `grep -rn "href=\"/" src --include="*.tsx"` (non-API, non-HTTP):

| href | Found In | Action Required |
|------|----------|----------------|
| `href="/proposals/new"` | `(app)/proposals/page.tsx` | Update to `/agency/prospects/new` |
| `href="/proposals"` | `(app)/proposals/error.tsx` | Update to `/agency/proposals` |

**Nav links in `(app)/layout.tsx`:** `href="/"` (dashboard), `/crm`, `/prospects`, `/clients`, `/tasks`, `/payments`, `/finance`, `/revenue`, `/accounting`, `/team`, `/whatsapp`, `/proposals`, `/replies`, `/outbound`. All need `/agency` prefix.

**router.push calls:** `router.push('/proposals/...')` in proposals pages — these stay correct when app is mounted at `/agency` (relative navigation within the route group).

**router.replace calls:**
- `AuthProvider.tsx:19,27` → `/login` → must become `/agency/login`
- `AuthProvider.tsx:36` → `/login` → must become `/agency/login`
- `login/page.tsx:20` → `/` → must become `/agency`

**Logo sidebar href="/":** Must become `/agency` after move.
