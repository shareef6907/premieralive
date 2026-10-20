/**
 * Studio OS — Prospect Enrichment Library
 *
 * Extracted from scripts/enrich.ts into a reusable module.
 * Called by both the manual CLI script and the discovery cron.
 *
 * PDPL posture: business contact points only. We collect addresses that a
 * company publishes on its own site for the purpose of being contacted.
 * Personal-looking mailboxes are dropped (see PERSONAL_PATTERN).
 */

import { SupabaseClient } from '@supabase/supabase-js';

/* ------------------------------------------------------------------ */
/* 1. Page fetching — homepage plus the usual contact paths             */
/* ------------------------------------------------------------------ */

const CONTACT_PATHS = [
  '', '/contact', '/contact-us', '/about', '/about-us',
  '/اتصل-بنا', '/تواصل-معنا', '/من-نحن',
];

async function fetchPage(url: string): Promise<string | null> {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 12_000);
    const res = await fetch(url, {
      signal: ctl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'PremieraLiveResearchBot/1.0 (+https://premieralive.com)',
      },
    });
    clearTimeout(t);
    if (!res.ok) return null;
    const ct = res.headers.get('content-type') ?? '';
    if (!ct.includes('text/html')) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function crawlContactSurface(
  website: string,
  delayMs = 800,
  maxPages = 3,
): Promise<string[]> {
  const base = website.replace(/\/+$/, '');
  const pages: string[] = [];
  for (const path of CONTACT_PATHS) {
    const html = await fetchPage(base + path);
    if (html) pages.push(html);
    if (pages.length >= maxPages) break;
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return pages;
}

/* ------------------------------------------------------------------ */
/* 2. Email discovery                                                   */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Junk we never want in the pipeline
const JUNK_PATTERN =
  /(example|sentry|wixpress|godaddy|squarespace|\.png|\.jpg|\.svg|\.webp|@2x|u0|domain\.com)/i;

// Role mailboxes — highest deliverability, lowest creep factor
const ROLE_PATTERN =
  /^(info|contact|hello|marketing|media|pr|sales|admin|enquiry|enquiries|inquiries|office|reception|business|comms)@/i;

// Looks like an individual's personal mailbox at a free provider — skip
const PERSONAL_PATTERN =
  /@(gmail|hotmail|yahoo|outlook|icloud|proton|live)\./i;

export function extractEmails(pages: string[], website: string): string[] {
  const domain = (() => {
    try { return new URL(website).hostname.replace(/^www\./, ''); }
    catch { return ''; }
  })();

  const found = new Set<string>();
  for (const html of pages) {
    const text = html
      .replace(/&#64;|&commat;/gi, '@')
      .replace(/\s*\[at\]\s*|\s*\(at\)\s*/gi, '@');

    for (const raw of text.match(EMAIL_RE) ?? []) {
      const e = raw.toLowerCase();
      if (JUNK_PATTERN.test(e)) continue;
      if (PERSONAL_PATTERN.test(e)) continue;
      if (domain && !e.endsWith('@' + domain)) continue;
      found.add(e);
    }
  }

  return [...found].sort((a, b) => {
    const ra = ROLE_PATTERN.test(a) ? 0 : 1;
    const rb = ROLE_PATTERN.test(b) ? 0 : 1;
    return ra - rb;
  });
}

/* ------------------------------------------------------------------ */
/* 3. Language detection                                                */
/* ------------------------------------------------------------------ */

export function detectLanguage(
  pages: string[],
): { lang: 'ar' | 'en'; confident: boolean } {
  const joined = pages.join(' ');
  const body = joined
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ');

  const arabic = (body.match(/[\u0600-\u06FF]/g) ?? []).length;
  const latin  = (body.match(/[A-Za-z]/g) ?? []).length;
  const total  = arabic + latin;

  if (total < 200) return { lang: 'ar', confident: false };

  const arabicShare = arabic / total;
  if (arabicShare > 0.35) return { lang: 'ar', confident: true };
  if (arabicShare < 0.05) return { lang: 'en', confident: true };
  return { lang: 'ar', confident: false };
}

/* ------------------------------------------------------------------ */
/* 4. Video gap                                                        */
/* ------------------------------------------------------------------ */

export function detectVideo(
  pages: string[],
): { hasVideo: boolean; quality: 'none' | 'poor' | 'ok' | 'strong' } {
  const j = pages.join(' ');

  const embeds =
    (j.match(/youtube\.com\/(embed|watch)|youtu\.be\//gi) ?? []).length +
    (j.match(/player\.vimeo\.com|vimeo\.com\/\d+/gi) ?? []).length;
  const nativeTags = (j.match(/<video[\s>]/gi) ?? []).length;
  const mp4 = (j.match(/\.mp4|\.webm/gi) ?? []).length;
  const hasChannel = /youtube\.com\/(c\/|channel\/|@)/i.test(j);

  const signals = embeds + nativeTags + mp4;

  if (signals === 0) return { hasVideo: false, quality: 'none' };
  if (signals <= 2 && !hasChannel) return { hasVideo: true, quality: 'poor' };
  if (hasChannel && signals >= 3) return { hasVideo: true, quality: 'strong' };
  return { hasVideo: true, quality: 'ok' };
}

/* ------------------------------------------------------------------ */
/* 5. Scoring — mirrors the Python scorer used for batch 01             */
/* ------------------------------------------------------------------ */

const VERTICAL_BUDGET: Record<string, number> = {
  healthcare: 30, real_estate: 28, contracting: 25, hospitality: 22, fnb: 15,
};

export function scoreProspect(p: {
  vertical?: string;
  rating?: number;
  rating_count?: number;
  video_quality?: string;
  website?: string;
}): { total: number; breakdown: Record<string, number> } {
  const b: Record<string, number> = {};

  b.vertical_budget = VERTICAL_BUDGET[p.vertical ?? ''] ?? 15;

  const c = p.rating_count ?? 0;
  b.review_volume = c >= 1000 ? 25 : c >= 300 ? 18 : c >= 50 ? 12 : 6;

  const r = p.rating ?? 5;
  b.reputation_pain = r < 3.8 ? 20 : r < 4.3 ? 14 : 8;

  b.video_gap =
    p.video_quality === 'none' ? 25 :
    p.video_quality === 'poor' ? 20 :
    p.video_quality === 'ok'   ? 10 : 0;

  b.reachable = p.website ? 5 : -10;

  const total = Object.values(b).reduce((a, n) => a + n, 0);
  return { total, breakdown: b };
}

/* ------------------------------------------------------------------ */
/* 6. Main — enrich one prospect by ID                                  */
/* ------------------------------------------------------------------ */

/**
 * Enrich a single prospect: crawl website, extract emails/language/video,
 * update the prospect row and upsert contact rows.
 *
 * @param supabase  — authenticated Supabase client (service role for writes)
 * @param prospectId — prospects.id
 * @param website   — website URI already known from Places (skip Place Details call)
 * @param lang      — gatekeeper email language (from discovery query entry)
 */
export async function enrichProspect(
  supabase: SupabaseClient,
  prospectId: string,
  website: string,
  lang: 'ar' | 'en',
): Promise<{
  emails: string[];
  lang: 'ar' | 'en';
  langConfident: boolean;
  video: { hasVideo: boolean; quality: string };
  score: number;
  scoreBreakdown: Record<string, number>;
}> {
  let emails: string[] = [];
  let langConfident = false;
  const video = { hasVideo: false, quality: 'none' as const };

  if (website) {
    const pages = await crawlContactSurface(website);
    if (pages.length) {
      emails = extractEmails(pages, website);
      const d = detectLanguage(pages);
      langConfident = d.confident;
      Object.assign(video, detectVideo(pages));
    }
  }

  const s = scoreProspect({
    video_quality: video.quality,
    website,
  });

  await supabase
    .from('prospects')
    .update({
      website,
      lang_pref: lang,
      lang_confidence: langConfident ? 'verified' : 'guess',
      has_video: video.hasVideo,
      video_quality: video.quality,
      score: s.total,
      score_breakdown: s.breakdown,
    })
    .eq('id', prospectId);

  if (emails.length) {
    const { error: contactErr } = await supabase
      .from('prospect_contacts')
      .upsert(
        emails.slice(0, 3).map((email, i) => ({
          prospect_id: prospectId,
          email: email.trim().toLowerCase(),
          email_status: 'unverified',
          lang_pref: lang,
          is_primary: i === 0,
        })),
        { onConflict: 'email', ignoreDuplicates: true }
      );

    if (contactErr) {
      console.error(`    contact upsert failed: ${contactErr.message}`);
    }
  }

  return { emails, lang, langConfident, video, score: s.total, scoreBreakdown: s.breakdown };
}
