/**
 * Studio OS — Outbound Enrolment
 *
 * Places a prospect into a sequence.  Two stages exist:
 *   pitch    — personalised outreach to a named decision-maker (requires personal_hook + contact full_name)
 *   gatekeeper — referral ask to a general inbox (no hook required)
 *
 * Guards (each produces a distinct reason string):
 *   1. Sequence requires_hook=true but prospect has no personal_hook  [pitch only]
 *   2. No contact row with a non-null email
 *   3. prospects.unsubscribed_at is not null
 *   4. prospects.bounced_at is not null
 *   5. Contact email appears in suppression_list (email or domain match)
 *   6. Prospect already has an active enrolment (in any sequence)
 */

import { createClient } from '@supabase/supabase-js';
import {
  ENGLISH_SEQUENCE_ID,
  ARABIC_SEQUENCE_ID,
  GATEKEEPER_EN_ID,
  GATEKEEPER_AR_ID,
} from './constants';
import { isSuppressed } from './suppression';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* -------------------------------------------------------------------- */
/* Guard helpers — each returns a reason string, or null if the guard    */
/* passes (i.e. null = no reason to skip = proceed)                     */
/* -------------------------------------------------------------------- */

async function guardHasContact(contactId: string | null): Promise<string | null> {
  return contactId ? null : 'no_contact_email';
}

async function guardUnsubscribed(unsubscribedAt: string | null): Promise<string | null> {
  return unsubscribedAt ? 'already_unsubscribed' : null;
}

async function guardBounced(bouncedAt: string | null): Promise<string | null> {
  return bouncedAt ? 'address_bounced' : null;
}

async function guardSuppressed(email: string): Promise<string | null> {
  return (await isSuppressed(email)) ? 'suppressed' : null;
}

async function guardNotAlreadyActive(prospectId: string): Promise<string | null> {
  const { data } = await supabase
    .from('sequence_enrolments')
    .select('id, sequence_id')
    .eq('prospect_id', prospectId)
    .eq('status', 'active')
    .maybeSingle();

  if (!data) return null;

  // Enrolled in both Arabic and English simultaneously is also a failure.
  const { data: other } = await supabase
    .from('sequence_enrolments')
    .select('id')
    .eq('prospect_id', prospectId)
    .neq('id', data.id)
    .eq('status', 'active')
    .maybeSingle();

  return other ? 'enrolled_in_both_sequences' : 'already_active';
}

/**
 * Guard 1 — check requires_hook on the target sequence.
 * Returns a reason string if the sequence requires a hook but none is present.
 */
async function guardSequenceRequiresHook(
  sequenceId: string,
  personalHook: string | null
): Promise<string | null> {
  const { data: seq } = await supabase
    .from('sequences')
    .select('requires_hook')
    .eq('id', sequenceId)
    .maybeSingle();

  if (!seq) return 'sequence_not_found';

  if (seq.requires_hook && !personalHook?.trim()) {
    return 'missing_personal_hook';
  }
  return null;
}

/* -------------------------------------------------------------------- */
/* Stage + language → sequence resolution                               */
/* -------------------------------------------------------------------- */

export type Stage = 'gatekeeper' | 'pitch';

/**
 * Resolve a stage + language pair to a sequence UUID.
 * The four sequences are defined in constants.ts — never inline UUIDs elsewhere.
 */
export function resolveSequenceId(stage: Stage, lang: string): string {
  if (stage === 'gatekeeper') {
    return lang === 'ar' ? GATEKEEPER_AR_ID : GATEKEEPER_EN_ID;
  }
  return lang === 'ar' ? ARABIC_SEQUENCE_ID : ENGLISH_SEQUENCE_ID;
}

/**
 * Determine the default stage for a prospect.
 * pitch: has a non-empty personal_hook AND at least one contact with a full_name
 * gatekeeper: everything else (no hook, or hook but no named contact)
 */
export async function defaultStage(
  prospectId: string,
  personalHook: string | null
): Promise<Stage> {
  const hasHook = !!personalHook?.trim();

  if (!hasHook) return 'gatekeeper';

  const { data: contact } = await supabase
    .from('prospect_contacts')
    .select('full_name')
    .eq('prospect_id', prospectId)
    .eq('is_primary', true)
    .maybeSingle();

  return contact?.full_name?.trim() ? 'pitch' : 'gatekeeper';
}

/* -------------------------------------------------------------------- */
/* Single-prospect enrolment                                             */
/* Returns { enrolled: true } or { enrolled: false, reason: string }    */
/* -------------------------------------------------------------------- */

export type EnrolResult =
  | { enrolled: true }
  | { enrolled: false; reason: string };

export async function enrolProspect(
  prospectId: string,
  stage: Stage,
  forcedSequenceId?: string,
  dryRun = false,
): Promise<EnrolResult> {
  const { data: p } = await supabase
    .from('prospects')
    .select('id, company_name, lang_pref, personal_hook, unsubscribed_at, bounced_at')
    .eq('id', prospectId)
    .single();

  if (!p) return { enrolled: false, reason: 'prospect_not_found' };

  // Guard 3 — unsubscribed
  const g3 = await guardUnsubscribed(p.unsubscribed_at);
  if (g3) return { enrolled: false, reason: g3 };

  // Guard 4 — bounced
  const g4 = await guardBounced(p.bounced_at);
  if (g4) return { enrolled: false, reason: g4 };

  // Guard 6 — already active
  const g6 = await guardNotAlreadyActive(p.id);
  if (g6) return { enrolled: false, reason: g6 };

  // Fetch primary contact for: guard 2, suppression check, and contact_id
  const { data: contact } = await supabase
    .from('prospect_contacts')
    .select('id, email, lang_pref, full_name')
    .eq('prospect_id', prospectId)
    .eq('is_primary', true)
    .maybeSingle();

  // Guard 2 — no contact with email
  const g2 = await guardHasContact(contact?.id ?? null);
  if (g2) return { enrolled: false, reason: g2 };

  // Guard 5 — suppressed
  const g5 = await guardSuppressed(contact!.email);
  if (g5) return { enrolled: false, reason: g5 };

  // Determine sequence
  const sequenceId = forcedSequenceId
    ?? resolveSequenceId(stage, contact?.lang_pref ?? p.lang_pref ?? 'en');

  // Guard 1 — sequence requires_hook check
  const g1 = await guardSequenceRequiresHook(sequenceId, p.personal_hook);
  if (g1) return { enrolled: false, reason: g1 };

  // In dry_run mode, skip the INSERT and report this prospect as would-be-enrolled.
  // This guard must come after ALL other guards so the skip-reason is accurate.
  if (dryRun) {
    return { enrolled: false, reason: 'would_enrol' };
  }

  // Insert enrolment
  const now = new Date().toISOString();
  const { error } = await supabase.from('sequence_enrolments').insert({
    prospect_id: p.id,
    contact_id: contact!.id,
    sequence_id: sequenceId,
    status: 'active',
    current_step: 0,
    enrolled_at: now,
    next_send_at: now,
  });

  if (error) {
    return { enrolled: false, reason: `insert_failed: ${error.message}` };
  }

  return { enrolled: true };
}

/* -------------------------------------------------------------------- */
/* Batch enrolment                                                      */
/* Runs guards for each prospect independently, collects results.         */
/* When dryRun=true, skips the database insert and returns the same       */
/* shape so callers get a consistent {enrolled, skipped} response.        */
/* -------------------------------------------------------------------- */

export async function enrolMany(
  prospectIds: string[],
  stage: Stage,
  forcedSequenceId?: string,
  dryRun = false,
): Promise<{
  enrolled: string[];
  skipped: Array<{ prospectId: string; companyName: string; reason: string }>;
  would_enrol_candidates: Array<{
    prospectId: string;
    companyName: string;
    email: string;
    lang: string;
    sequenceId: string;
    sequenceName: string;
  }>;
}> {
  const enrolled: string[] = [];
  const skipped: Array<{ prospectId: string; companyName: string; reason: string }> = [];
  const would_enrol_candidates: Array<{
    prospectId: string;
    companyName: string;
    email: string;
    lang: string;
    sequenceId: string;
    sequenceName: string;
  }> = [];

  for (const id of prospectIds) {
    const r = await enrolProspect(id, stage, forcedSequenceId, dryRun);
    if (r.enrolled) {
      if (!dryRun) {
        enrolled.push(id);
        // Mark prospect as contacted — same convention used for Dallah etc.
        // This excludes them from future discovery candidate queries.
        await supabase
          .from('prospects')
          .update({ status: 'contacted' })
          .eq('id', id);
      }
    } else {
      const failReason = (r as { enrolled: false; reason: string }).reason;

      if (failReason === 'would_enrol' && dryRun) {
        // Prospect passed all guards — fetch contact email and sequence for the candidate list
        const { data: contactRow } = await supabase
          .from('prospect_contacts')
          .select('email, lang_pref')
          .eq('prospect_id', id)
          .eq('is_primary', true)
          .maybeSingle();

        const { data: prospectRow } = await supabase
          .from('prospects')
          .select('company_name, lang_pref')
          .eq('id', id)
          .maybeSingle();

        const lang = contactRow?.lang_pref ?? prospectRow?.lang_pref ?? 'ar';
        const seqId = forcedSequenceId ?? (lang === 'en' ? GATEKEEPER_EN_ID : GATEKEEPER_AR_ID);
        const seqName = lang === 'en' ? 'Gatekeeper English' : 'Gatekeeper Arabic';

        would_enrol_candidates.push({
          prospectId: id,
          companyName: prospectRow?.company_name ?? id,
          email: contactRow?.email ?? 'no_email',
          lang,
          sequenceId: seqId,
          sequenceName: seqName,
        });
      }

      const { data: p } = await supabase
        .from('prospects')
        .select('company_name')
        .eq('id', id)
        .maybeSingle();
      skipped.push({ prospectId: id, companyName: p?.company_name ?? id, reason: failReason });
    }
  }

  return { enrolled, skipped, would_enrol_candidates };
}
