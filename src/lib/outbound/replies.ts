/**
 * processReplyMessage — called by the inbox cron when a reply is detected.
 *
 * Stores the reply snippet (first 600 chars of the new text only, quoted
 * content stripped) alongside the replied_at timestamp.
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Strip quoted content from an email body:
 *   - Lines starting with `On … wrote:` or `From: …` (reply headers)
 *   - Lines starting with `>` (inline quoting)
 *   - Everything after a line of dashes
 * Returns the cleaned plain-text body.
 */
function stripQuoted(body: string): string {
  const lines = body.split('\n');
  const cleaned: string[] = [];
  let inQuotedBlock = false;

  for (const line of lines) {
    if (/^on\s+.+\s+wrote:?\s*$/i.test(line.trim()) || /^from:?\s*.+/i.test(line.trim())) {
      inQuotedBlock = true;
      continue;
    }
    if (/^---+$/i.test(line.trim())) {
      inQuotedBlock = true;
      continue;
    }
    if (inQuotedBlock) {
      if (line.startsWith('>')) continue;
      inQuotedBlock = false;
    }
    cleaned.push(line);
  }

  return cleaned.join('\n').trim();
}

/**
 * Extract plain-text body from an email with both text/plain and text/html parts,
 * or from a single-part body that may be HTML.
 */
function extractBody(multipart: { text?: string; html?: string } | string | null): string {
  if (!multipart) return '';

  if (typeof multipart === 'string') {
    return multipart
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
  }

  const raw = multipart.text ?? multipart.html ?? '';
  if (typeof raw !== 'string') return '';

  if (multipart.text) return stripQuoted(raw);

  return stripQuoted(
    raw.replace(/<[^>]+>/g, ' ')
       .replace(/&nbsp;/g, ' ')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&amp;/g, '&')
       .trim()
  );
}

/* -------------------------------------------------------------------- */
/**
 * Process a single reply to a send row.
 *
 * @param sendId           - sequence_sends.id
 * @param replyBody        - plain text body from mailparser
 * @param replyDate        - date parsed from the reply
 * @param isStaleSnippet   - true when replied_at is already set but reply_snippet was garbled;
 *                           when true, replied_at is NOT updated (preserves original timestamp)
 */
export async function processReplyMessage(
  sendId: string,
  replyBody: string,
  replyDate: Date,
  isStaleSnippet = false,
): Promise<void> {
  const plainBody = extractBody(replyBody);
  const snippet = plainBody.slice(0, 600);

  // 1. Always refresh reply_snippet — null on first processing, stale base64 on re-run
  const { error: err1 } = await supabase
    .from('sequence_sends')
    .update({ reply_snippet: snippet })
    .eq('id', sendId);

  if (err1) {
    console.error('[processReplyMessage] Failed to store reply_snippet:', err1.message);
    return;
  }

  // 2. Set replied_at only if not already set — preserves original timestamp from first reply
  const { error: err2 } = await supabase
    .from('sequence_sends')
    .update({ replied_at: replyDate.toISOString() })
    .eq('id', sendId)
    .is('replied_at', null);

  if (err2) {
    console.error('[processReplyMessage] Failed to set replied_at:', err2.message);
    return;
  }

  const { data: send } = await supabase
    .from('sequence_sends')
    .select('enrolment_id')
    .eq('id', sendId)
    .maybeSingle();

  if (!send?.enrolment_id) return;

  await supabase
    .from('sequence_enrolments')
    .update({
      status: 'stopped',
      stopped_at: replyDate.toISOString(),
      stopped_reason: 'reply_received',
    })
    .eq('id', send.enrolment_id)
    .eq('status', 'active');

  console.log(`[processReplyMessage] Replied row ${sendId}, halted enrolment ${send.enrolment_id}`);
}

/* -------------------------------------------------------------------- */
/* Plural — called by inbox cron; preserves original inbox.ts interface    */
/* -------------------------------------------------------------------- */

export async function processReplyMessages(messages: Array<{
  from: string;
  subject: string;
  date: Date;
  bodyText: string;
  headers: Record<string, string>;
  isAutoReply: boolean;
}>): Promise<number> {
  if (!messages?.length) return 0;

  // 1. Build candidate sets
  //
  // Primary: 'sent' rows awaiting first reply detection.
  // Secondary: rows where replied_at IS set but reply_snippet is null
  //   (first processing stored base64-garbage; this run decodes correctly).
  // Both sets are processed in the same loop; the secondary set is limited
  // to rows with a known provider_id so we can match by In-Reply-To.
  const { data: sends, error } = await supabase
    .from('sequence_sends')
    .select('id, to_email, provider_id')
    .eq('status', 'sent')
    .is('replied_at', null);

  if (error) {
    console.error('[replies] fetch failed:', error.message);
    return 0;
  }

  // Secondary: rows already replied-to but with garbled snippet
  const { data: staleSnippets } = await supabase
    .from('sequence_sends')
    .select('id, to_email, provider_id')
    .eq('status', 'sent')
    .not('replied_at', 'is', null)
    .is('reply_snippet', null);

  const secondaryIds = new Set((staleSnippets ?? []).map((s: any) => s.id));

  // Combine — deduplicated by Map semantics
  const allSends = [
    ...(sends ?? []),
    ...(staleSnippets ?? []),
  ];

  // 2. Index by provider_id and by to_email — same logic for both sets
  const norm = (s: string) => s.replace(/[<>]/g, '').trim().toLowerCase();
  const sendByMsgId = new Map<string, string>();
  const sendByEmail = new Map<string, string>();
  for (const s of allSends) {
    if (s.provider_id) sendByMsgId.set(norm(s.provider_id), s.id);
    if (s.to_email)    sendByEmail.set(s.to_email.toLowerCase(), s.id);
  }

  let count = 0;

  for (const msg of messages) {
    if (msg.isAutoReply) continue;

    let sendId: string | null = null;
    let isStaleSnippet = false;

    // 3a. Try threading headers first (In-Reply-To + References)
    const inReplyTo = msg.headers['in-reply-to'] ?? '';
    const references = msg.headers['references'] ?? '';

    const msgIdPat = /<([^>]+)>/g;
    const headerIds: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = msgIdPat.exec(inReplyTo + ' ' + references)) !== null) {
      headerIds.push(m[1].toLowerCase().trim());
    }

    for (const mid of headerIds) {
      const found = sendByMsgId.get(norm(mid));
      if (found) {
        sendId = found;
        isStaleSnippet = secondaryIds.has(found);
        break;
      }
    }

    // 3b. Fall back to sender address match
    if (!sendId) {
      const byEmail = sendByEmail.get(msg.from.toLowerCase()) ?? null;
      if (byEmail) {
        sendId = byEmail;
        isStaleSnippet = secondaryIds.has(byEmail);
      }
    }

    if (!sendId) continue;

    sendByMsgId.delete(sendId);
    sendByEmail.delete(msg.from.toLowerCase());

    // Pass isStaleSnippet so processReplyMessage knows whether to touch replied_at
    await processReplyMessage(sendId, msg.bodyText, msg.date, isStaleSnippet);
    count++;
  }

  return count;
}
