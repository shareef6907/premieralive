/**
 * Studio OS — Outbound Discovery Cron
 *
 * GET/POST /api/outbound/discover  — Vercel Cron (0 6 * * 0-4, i.e. 09:00 AST Sun-Thu)
 *
 * Discovery:  Google Places Text Search → prospects table
 * Enrichment: crawl website → extract emails, language, video signals, score
 * Auto-enrolment: gatekeeper sequence for prospects with email
 *
 * Add to vercel.json:
 *   { "path": "/api/outbound/discover", "schedule": "0 6 * * 0-4" }
 *
 * Env:
 *   GOOGLE_PLACES_API_KEY
 *   CRON_SECRET          — required Bearer token
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   AUTO_ENROL           — set to "true" to enable Step 3; ships unset
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getQueriesForToday, BLOCKLIST, DiscoveryQuery } from '@/lib/outbound/discovery-queries';
import { enrichProspect } from '@/lib/outbound/enrich';
import { enrolMany } from '@/lib/outbound/enrol';
import { GATEKEEPER_EN_ID, GATEKEEPER_AR_ID } from '@/lib/outbound/constants';

export const runtime = 'nodejs';
export const maxDuration = 300;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY!;
const INSERT_CAP = 10;

/* ------------------------------------------------------------------ */
/* Guard                                                                  */
/* ------------------------------------------------------------------ */

async function guard(req: NextRequest): Promise<NextResponse | null> {
  const auth = req.headers.get('authorization') ?? '';
  const secret = process.env.CRON_SECRET ?? '';
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Step 1 — Places discovery                                             */
/* ------------------------------------------------------------------ */

function isBlocked(name: string): boolean {
  const lower = name.toLowerCase();
  return BLOCKLIST.some((b) => lower.includes(b));
}

interface PlaceResult {
  id: string;
  displayName: string;
  formattedAddress: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  rating?: number;
  userRatingCount?: number;
  types: string[];
}

async function searchPlaces(
  query: string,
  languageCode: string,
): Promise<PlaceResult[]> {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'X-Goog-Api-Key': PLACES_KEY,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.formattedAddress',
        'places.websiteUri',
        'places.nationalPhoneNumber',
        'places.rating',
        'places.userRatingCount',
        'places.types',
      ].join(','),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 10,
      languageCode,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[discover] Places ${res.status}: ${detail.slice(0, 300)}`);
    return [];
  }

  const j = await res.json();
  return (j.places ?? []).map((p: any) => ({
    id: p.id as string,
    displayName: p.displayName?.text ?? '',
    formattedAddress: p.formattedAddress ?? '',
    websiteUri: p.websiteUri as string | undefined,
    nationalPhoneNumber: p.nationalPhoneNumber as string | undefined,
    rating: p.rating as number | undefined,
    userRatingCount: p.userRatingCount as number | undefined,
    types: (p.types ?? []) as string[],
  }));
}

async function insertProspects(
  places: PlaceResult[],
  query: DiscoveryQuery,
): Promise<{ inserted: number; skipped_existing: number; skipped_junk: number; ids: string[] }> {
  let inserted = 0;
  let skipped_existing = 0;
  let skipped_junk = 0;
  const insertedIds: string[] = [];

  for (const place of places) {
    if (inserted >= INSERT_CAP) break;

    // Primary dedupe — by Google place_id
    const { data: existing } = await supabase
      .from('prospects')
      .select('id')
      .eq('source_ref', place.id)
      .maybeSingle();

    if (existing) {
      skipped_existing++;
      continue;
    }

    // Secondary dedupe — by normalised website (strip query string + trailing slash)
    // Skip if website is null (no website at all) or social-only (not a real website to dedup on)
    if (place.websiteUri) {
      try {
        const u = new URL(place.websiteUri);
        // Only dedup on real websites, not social handles
        const SOCIAL_HOSTS = ['instagram.com', 'linktr.ee', 'facebook.com', 'fb.com', 'm.me'];
        const isSocial = SOCIAL_HOSTS.some(h => u.hostname.endsWith(h));
        if (!isSocial) {
          u.search = '';
          u.hash = '';
          const norm = u.toString().replace(/\/$/, '');
          const { data: byWebsite } = await supabase
            .from('prospects')
            .select('id')
            .eq('website', norm)
            .maybeSingle();
          if (byWebsite) {
            skipped_existing++;
            continue;
          }
        }
      } catch {
        // invalid URL — let it proceed
      }
    }

    // Reachability filter
    if (!place.websiteUri && !place.nationalPhoneNumber) {
      skipped_junk++;
      continue;
    }

    // Blocklist filter
    if (isBlocked(place.displayName)) {
      skipped_junk++;
      continue;
    }

    // Skip certain Place types
    const SKIP_TYPES = [
      'shopping_mall', 'parking', 'gas_station', 'atm', 'bank',
    ];
    // car_dealer with haraj/used in name is already blocked above
    if (place.types.some((t) => SKIP_TYPES.includes(t))) {
      skipped_junk++;
      continue;
    }

    // Score with minimal data — enrich step fills in the rest
    const scoreResult = { total: 10, breakdown: { reachable: place.websiteUri ? 5 : -10, vertical_budget: 15 } };

    // Detect social-only websites — these are still inserted but flagged
    const rawWebsite = place.websiteUri ?? null;
    const SOCIAL_HOSTS = ['instagram.com', 'linktr.ee', 'facebook.com', 'fb.com', 'm.me'];
    let website: string | null = null;
    let socialOnly = false;
    if (rawWebsite) {
      try {
        const u = new URL(rawWebsite);
        if (SOCIAL_HOSTS.some(h => u.hostname.endsWith(h))) {
          socialOnly = true;
          website = rawWebsite; // store as-is for dedup
        } else {
          website = rawWebsite;
        }
      } catch {
        website = rawWebsite;
      }
    }

    const insertResult = await supabase.from('prospects').insert({
      company_name: place.displayName,
      vertical: query.vertical,
      industry: query.vertical,
      city: place.formattedAddress.split(',').slice(-2, -1)[0]?.trim()
        ?? place.formattedAddress.split(',')[0]?.trim()
        ?? '',
      country: 'SA',
      phone: place.nationalPhoneNumber ?? null,
      website,
      social_only: socialOnly,
      rating: place.rating ?? null,
      rating_count: place.userRatingCount ?? null,
      source: 'google_places',
      source_ref: place.id,
      google_place_id: place.id,
      lang_pref: query.lang,
      lang_confidence: 'guess',
      has_video: false,
      video_quality: 'none',
      personal_hook: null,
      consent_basis: 'legitimate_business',
      status: 'new',
      score: scoreResult.total,
      score_breakdown: scoreResult.breakdown,
    }).select('id').single();

    if (!insertResult.error && insertResult.data) {
      insertedIds.push(insertResult.data.id);
      inserted++;
    }
  }

  return { inserted, skipped_existing, skipped_junk, ids: insertedIds };
}

/* ------------------------------------------------------------------ */
/* Step 2 — Enrich                                                      */
/* ------------------------------------------------------------------ */

async function enrichInsertedProspects(
  prospectIds: string[],
  queryLang: 'ar' | 'en',
): Promise<{ enriched: number; with_email: number }> {
  let enriched = 0;
  let withEmail = 0;

  for (const id of prospectIds) {
    // Fetch website from the prospect row (set by Step 1 insert)
    const { data: p } = await supabase
      .from('prospects')
      .select('id, website, social_only')
      .eq('id', id)
      .maybeSingle();

    if (!p?.website) continue;

    // social_only prospects have no real website to crawl — skip fast
    if (p.social_only) continue;

    const result = await enrichProspect(supabase, p.id, p.website, queryLang);
    if (result.emails.length) withEmail++;
    enriched++;
    await new Promise((r) => setTimeout(r, 1200));
  }

  return { enriched, with_email: withEmail };
}

/* ------------------------------------------------------------------ */
/* Step 3 — Auto-enrol                                                   */
/* ------------------------------------------------------------------ */

async function autoEnrol(
  dryRun: boolean,
): Promise<{
  enrolled: number;
  would_enrol: number;
  enrolled_ids: string[];
  skipped: Array<{ prospectId: string; companyName: string; reason: string }>;
  would_enrol_candidates: Array<{
    prospectId: string;
    companyName: string;
    email: string;
    lang: string;
    sequenceId: string;
    sequenceName: string;
  }>;
  candidate_query_error?: string;
}> {
  // Candidates: google_places, status=new, not already enrolled in any active sequence,
  // has a primary contact with an email. Ordered by creation time.
  const { data: prospects, error } = await supabase
    .from('prospects')
    .select(`
      id,
      company_name,
      lang_pref,
      bounced_at,
      unsubscribed_at,
      prospect_contacts!inner(id, email, is_primary)
    `)
    .eq('source', 'google_places')
    .eq('status', 'new')
    // Exclude prospects already in active/bounced/unsubscribed/completed enrolment states.
    // These are Friday's enrollees — they waste the cap slot if included.
    .not('id', 'in',
      supabase.from('sequence_enrolments').select('prospect_id')
        .in('status', ['active', 'bounced', 'unsubscribed', 'completed'])
    )
    .eq('prospect_contacts.is_primary', true)
    .not('prospect_contacts.email', 'is', null)
    .order('created_at', { ascending: false })
    .limit(INSERT_CAP);

  if (error) {
    console.error('[autoEnrol] candidate query failed:', error.message);
    return {
      enrolled: 0, would_enrol: 0, enrolled_ids: [], skipped: [],
      would_enrol_candidates: [],
      candidate_query_error: error.message,
    };
  }

  if (!prospects?.length) return { enrolled: 0, would_enrol: 0, enrolled_ids: [], skipped: [], would_enrol_candidates: [] };

  // Filter out bounced / unsubscribed in-process (guard 3 + guard 4)
  // prospect_contacts join already guarantees guard 2 (email exists)
  const eligible: Array<{ id: string; company_name: string; lang_pref: string | null }> = [];
  for (const p of prospects) {
    if (p.bounced_at) continue;
    if (p.unsubscribed_at) continue;
    eligible.push({ id: p.id, company_name: p.company_name, lang_pref: p.lang_pref });
  }

  if (!eligible.length) {
    const skipped = prospects.map((p) => ({
      prospectId: p.id,
      companyName: p.company_name,
      reason: p.bounced_at ? 'address_bounced' : p.unsubscribed_at ? 'already_unsubscribed' : 'unknown',
    }));
    return { enrolled: 0, would_enrol: 0, enrolled_ids: [], skipped, would_enrol_candidates: [] };
  }

  // Group eligible prospects by language so each group is enrolled in the
  // appropriate sequence (EN → GATEKEEPER_EN_ID, AR → GATEKEEPER_AR_ID).
  // Previously all prospects were enrolled using the first prospect's lang_pref,
  // which misrouted non-English prospects to the Arabic sequence or vice versa.
  const byLang: Record<string, typeof eligible> = {};
  for (const p of eligible) {
    const lang = p.lang_pref === 'en' ? 'en' : 'ar';
    if (!byLang[lang]) byLang[lang] = [];
    byLang[lang].push(p);
  }

  let totalEnrolled = 0;
  let totalWouldEnrol = 0;
  const allEnrolledIds: string[] = [];
  const allSkipped: Array<{ prospectId: string; companyName: string; reason: string }> = [];
  const allWouldEnrolCandidates: Array<{
    prospectId: string;
    companyName: string;
    email: string;
    lang: string;
    sequenceId: string;
    sequenceName: string;
  }> = [];

  for (const [lang, group] of Object.entries(byLang)) {
    const prospectIds = group.map((p) => p.id);
    const sequenceId = lang === 'en' ? GATEKEEPER_EN_ID : GATEKEEPER_AR_ID;

    const result = await enrolMany(prospectIds, 'gatekeeper', sequenceId, dryRun);

    totalEnrolled += result.enrolled.length;
    totalWouldEnrol += group.length;
    if (!dryRun) allEnrolledIds.push(...result.enrolled);
    allSkipped.push(...result.skipped);
    allWouldEnrolCandidates.push(...result.would_enrol_candidates);
  }

  return {
    enrolled: dryRun ? 0 : totalEnrolled,
    would_enrol: dryRun ? totalWouldEnrol : 0,
    enrolled_ids: dryRun ? [] : allEnrolledIds,
    skipped: allSkipped,
    would_enrol_candidates: dryRun ? allWouldEnrolCandidates : [],
  };
}

/* ------------------------------------------------------------------ */
/* Handler                                                               */
/* ------------------------------------------------------------------ */

async function handleDiscover(req: NextRequest) {
  const authFailure = await guard(req);
  if (authFailure) return authFailure;

  const url = new URL(req.url);
  const dryRun = url.searchParams.get('dry_run') === 'true';
  const autoEnrolEnabled = process.env.AUTO_ENROL === 'true';

  const [q1, q2] = getQueriesForToday();
  const queries = [q1, q2];

  const log = {
    run: 'discover',
    date: new Date().toISOString(),
    queries: queries.map((q) => q.query),
    found: 0,
    skipped_existing: 0,
    skipped_junk: 0,
    inserted: 0,
    enriched: 0,
    with_email: 0,
    enrolled: 0,
    would_enrol: 0,
    enrolled_ids: [] as string[],
    auto_enrol: autoEnrolEnabled,
    dry_run: dryRun,
    queries_skipped_dry_run: 0,
  };

  const insertReports = [];
  const enrichReports = [];
  let enrolmentReport = { enrolled: 0, would_enrol: 0, skipped: [] as Array<{ prospectId: string; reason: string }> };
  const allInsertedIds: string[] = [];

  for (const query of queries) {
    const langCode = query.lang === 'en' ? 'en' : 'ar';

    // In dry_run mode, skip Places API calls entirely — they consume quota.
    // Only Step 3 (enrolment evaluation of existing prospects) runs.
    if (dryRun) {
      log.queries_skipped_dry_run++; // count Places API calls avoided
      continue;
    }

    const places = await searchPlaces(query.query, langCode);
    log.found += places.length;

    if (!dryRun) {
      const ins = await insertProspects(places, query);
      log.skipped_existing += ins.skipped_existing;
      log.skipped_junk += ins.skipped_junk;
      log.inserted += ins.inserted;
      allInsertedIds.push(...ins.ids);
      insertReports.push(ins);
    } else {
      // Count what we would skip
      for (const _place of places) {
        void _place;
        log.skipped_existing++; // Would be checked against DB in real run
      }
    }
  }

  // Step 2: Enrich inserted prospects
  if (!dryRun && allInsertedIds.length > 0) {
    const lang = queries[0].lang;
    const { enriched, with_email } = await enrichInsertedProspects(allInsertedIds, lang);
    log.enriched = enriched;
    log.with_email = with_email;
    enrichReports.push({ enriched, with_email });
  }

  // Step 3: Auto-enrol — only when AUTO_ENROL=true (dry_run evaluation always runs)
  const enrolmentResult =
    autoEnrolEnabled || dryRun
      ? await autoEnrol(dryRun)
      : { enrolled: 0, would_enrol: 0, enrolled_ids: [], skipped: [], would_enrol_candidates: [], candidate_query_error: undefined };
  log.enrolled = enrolmentResult.enrolled;
  log.would_enrol = enrolmentResult.would_enrol;
  log.enrolled_ids = enrolmentResult.enrolled_ids;
  enrolmentReport = enrolmentResult;

  // Console log for Vercel cron log capture
  console.log(JSON.stringify(log));

  return NextResponse.json({
    ...log,
    insert_reports: insertReports,
    enrich_reports: enrichReports,
    enrolment_skipped: enrolmentReport.skipped,
    would_enrol_candidates: enrolmentResult.would_enrol_candidates ?? [],
    ...(enrolmentResult.candidate_query_error
      ? { candidate_query_error: enrolmentResult.candidate_query_error }
      : {}),
  });
}

export async function GET(req: NextRequest) {
  return handleDiscover(req);
}

export async function POST(req: NextRequest) {
  return handleDiscover(req);
}
