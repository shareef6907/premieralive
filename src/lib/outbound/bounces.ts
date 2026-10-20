/**
 * Studio OS — Bounce detection
 *
 * Distinguishes hard bounces (permanent, suppress) from soft bounces (transient,
 * log and continue). Runs in the same inbox poll as reply detection so a single
 * IMAP connection handles both outcomes.
 *
 * Hard bounce consequences:
 *   - prospects.bounced_at = now()
 *   - sequence_sends.status = 'bounced'
 *   - sequence_enrolments.status = 'bounced', next_send_at = null, stopped_reason = 'hard_bounce'
 *   - suppression_list: upsert with reason='hard_bounce', domain = null
 *
 * Soft bounce consequences:
 *   - sequence_sends.status = 'failed' with diagnostic in error column
 *   - nothing else changes; the sender will retry on the next run
 */

import { createClient } from '@supabase/supabase-js';
import { InboxMessage } from './inbox';

/** Lazy-initialized service-role client */
let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _supabase;
}

/* -------------------------------------------------------------------- */
/* Status parsing                                                        */
/* -------------------------------------------------------------------- */

/**
 * Parse SMTP delivery status code from a bounce body.
 * Returns 'hard', 'soft', or null.
 *
 * Bounce messages carry a message/delivery-status MIME part with a
 * Status: field in N.x.y form.  The leading digit is the class:
 *   5.x.x = permanent (hard)
 *   4.x.x = transient (soft)
 *
 * We also check Diagnostic-Code: for the SMTP response which sometimes
 * carries a more specific code.
 */
export function parseSmtpStatus(body: string): 'hard' | 'soft' | null {
  // 1. Status: N.x.x header (RFC 3464) — the canonical machine-readable field
  const statusMatch = body.match(/^Status:\s*([45])\.\d+\.\d+/im);
  if (statusMatch) {
    return statusMatch[1] === '5' ? 'hard' : 'soft';
  }

  // 2. Diagnostic-Code: header (RFC 3464) — Gmail uses "smtp; 550-5.1.1"
  //    The enhanced code after the SMTP response code (550) can be separated
  //    by a dash or a space: "smtp; 550-5.1.1" or "smtp; 550 5.1.1"
  //    The protocol identifier (e.g. "smtp") is \S+ so it handles all variants.
  const diagMatch = body.match(
    /^Diagnostic-Code:\s*\S+\s+([45])\d{2}[ .-]\d+\.\d+\.\d+/im
  );
  if (diagMatch) {
    return diagMatch[1] === '5' ? 'hard' : 'soft';
  }

  // 3. Fallback: search the raw body for an embedded enhanced status code.
  //    Gmail DSNs carry the SMTP response inside the text/plain part as
  //    human-readable text: "550 5.1.1 <address>: ..." or
  //    "smtp; 550-5.1.1 <address>: ..." — neither has a preceding header name.
  //    The enhanced code format is: NNN[- ]M.N.N where NNN is 4xx or 5xx.
  const embeddedMatch = body.match(/\b([45])\d{2}[- ]\d+\.\d+\.\d+/);
  if (embeddedMatch) {
    return embeddedMatch[1] === '5' ? 'hard' : 'soft';
  }

  return null;
}

/* -------------------------------------------------------------------- */
/* Per-message processing                                                */
/* -------------------------------------------------------------------- */

/**
 * Find the prospect that owns a failed email address.
 */
async function findProspectByEmail(email: string): Promise<{ id: string } | null> {
  const { data: contact } = await getSupabase()
    .from('prospect_contacts')
    .select('id, prospect_id')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (!contact) return null;

  const prospect = await (getSupabase()
    .from('prospects')
    .select('id')
    .eq('id', contact.prospect_id)
    .maybeSingle() as unknown as { data: { id: string } | null });

  return prospect?.data ?? null;
}

/**
 * Find the most recent 'sent' sequence_sends row for this prospect
 * that has no bounced_at set — the send we are processing.
 */
async function findSentSend(prospectId: string): Promise<{ id: string } | null> {
  // Only consider active enrolments — bounced/stopped/completed ones are not the
  // current send target and must not be mutated by bounce processing.
  const { data: enrolment } = await getSupabase()
    .from('sequence_enrolments')
    .select('id')
    .eq('prospect_id', prospectId)
    .eq('status', 'active')
    .maybeSingle();

  if (!enrolment) return null;

  const send = await (getSupabase()
    .from('sequence_sends')
    .select('id')
    .eq('enrolment_id', enrolment.id)
    .eq('status', 'sent')
    .is('bounced_at', null)
    .order('sent_at', { ascending: false })
    .limit(1)
    .maybeSingle() as unknown as { data: { id: string } | null });

  return send?.data ?? null;
}

/**
 * Upsert a single address into suppression_list.
 * domain is deliberately left null — individual address only.
 * ignoreDuplicates prevents errors if the address is already present.
 */
async function suppressAddress(email: string) {
  const { error } = await getSupabase()
    .from('suppression_list')
    .upsert({ email: email.toLowerCase(), reason: 'hard_bounce' }, { onConflict: 'email', ignoreDuplicates: true });

  if (error) {
    // Log but don't throw — suppression failure should not rollback other changes
    console.error('[bounces] suppressAddress failed:', error.message);
  }
}

/**
 * Process a single bounce notification message.
 * Returns true if a bounce was handled (hard or soft).
 */
export async function processBounceMessage(msg: InboxMessage): Promise<boolean> {
  if (!msg.isBounce) return false;
  if (msg.isAutoReply) return false;

  const failedEmail = (msg.failedRecipient ?? '').trim().toLowerCase();
  if (!failedEmail) {
    console.warn('[bounces] Bounce received with no extractable recipient — no action taken');
    return false;
  }

  // Parse bounce type from body if not already set
  let bounceType = parseSmtpStatus(msg.bodyText);
  if (!bounceType) bounceType = msg.bounceType ?? 'hard'; // default hard when unknown

  const prospect = await findProspectByEmail(failedEmail);
  if (!prospect) {
    console.warn(`[bounces] No prospect found for failed address: ${failedEmail}`);
    return false;
  }

  const send = await findSentSend(prospect.id);

  if (bounceType === 'hard') {
    // 1. Mark prospect as bounced
    await getSupabase()
      .from('prospects')
      .update({ bounced_at: new Date().toISOString() })
      .eq('id', prospect.id);

    // 2. Mark the send record
    if (send) {
      await getSupabase()
        .from('sequence_sends')
        .update({ bounced_at: new Date().toISOString() })
        .eq('id', send.id);
    }

    // 3. Halt the enrolment
    await getSupabase()
      .from('sequence_enrolments')
      .update({
        status: 'bounced',
        next_send_at: null,
        stopped_reason: 'hard_bounce',
      })
      .eq('prospect_id', prospect.id)
      .eq('status', 'active');

    // 4. Suppress (domain stays null — individual address only)
    await suppressAddress(failedEmail);

    console.log(`[bounces] HARD BOUNCE processed: ${failedEmail}`);
  } else {
    // Soft bounce: mark the send as failed with diagnostic
    if (send) {
      const diagMatch = msg.bodyText.match(/^(?:Diagnostic-Code|Status):.*$/im);
      const diagnostic = diagMatch ? diagMatch[0] : 'unknown';

      await getSupabase()
        .from('sequence_sends')
        .update({ error: `[soft_bounce] ${diagnostic}` })
        .eq('id', send.id)
        .eq('status', 'sent');

      console.log(`[bounces] SOFT BOUNCE logged for ${failedEmail}: ${diagnostic}`);
    }
  }

  return true;
}

/**
 * Scan a list of inbox messages, handle each bounce.
 * Returns the count of bounces processed.
 */
export async function processBounceMessages(messages: InboxMessage[]): Promise<number> {
  let processed = 0;
  for (const msg of messages) {
    const handled = await processBounceMessage(msg);
    if (handled) processed++;
  }
  return processed;
}
