/**
 * Studio OS — IMAP inbox connection
 *
 * Connects to the production mailbox via IMAP over TLS.
 * Both reply detection and bounce detection poll this connection.
 */

import { ImapFlow } from 'imapflow';
import { simpleParser, ParsedMail } from 'mailparser';

let client: ImapFlow | null = null;

export function getInboxClient(): ImapFlow {
  if (client) return client;

  client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_APP_PASSWORD!,
    },
    logger: false,
    socketTimeout: 60_000,
  });

  return client;
}

export interface InboxMessage {
  uid: number;
  from: string;
  subject: string;
  date: Date;
  headers: Record<string, string>;
  bodyText: string;
  isAutoReply: boolean;
  isBounce: boolean;
  bounceType: 'hard' | 'soft' | null;
  failedRecipient: string | null;
}

/**
 * Returns true if the message is an auto-reply / out-of-office.
 * These should not halt a sequence.
 */
function isAutoReply(headers: Record<string, string>): boolean {
  const auto = headers['auto-submitted'] ?? '';
  const xAuto = headers['x-autoreply'] ?? '';
  const subject = headers['subject'] ?? '';
  return (
    auto.toLowerCase() === 'auto-replied' ||
    auto.toLowerCase() === 'auto-generated' ||
    xAuto.toLowerCase() === 'yes' ||
    /^automatic(al)?[_\s]?reply:?\s*/i.test(subject) ||
    /^Out\s+of\s+(Office|Auto-Reply)/i.test(subject)
  );
}

/**
 * Returns true if the message is a bounce notification.
 * Detected by envelope sender (mailer-daemon or postmaster).
 */
function isBounceNotification(from: string): boolean {
  return (
    from === 'mailer-daemon@googlemail.com' ||
    from === 'mailer-daemon@ gmail.com' || // some providers use a space
    from.startsWith('mailer-daemon@') ||
    from.startsWith('postmaster@')
  );
}

/**
 * Extract the failed recipient from bounce notification headers.
 * Checks X-Failed-Recipients first.
 */
function extractFailedRecipient(headers: Record<string, string>): string | null {
  const xFailed = headers['x-failed-recipients'];
  if (xFailed) return xFailed.toLowerCase().trim();
  return null;
}

/**
 * Normalise a From: header value to a bare lowercased email address.
 */
function normaliseAddress(fromRaw: string): string {
  const match = fromRaw.match(/<([^>]+)>/);
  if (match) return match[1].toLowerCase().trim();
  return fromRaw.toLowerCase().trim().replace(/^["']|["']$/g, '');
}

/**
 * Fetch messages from INBOX received in the last `hours` (default 48).
 * Returns enriched message objects ready for reply / bounce processing.
 *
 * Uses mailparser's simpleParser on the raw message source so that
 * transfer encoding (base64, quoted-printable), charset conversion,
 * multipart decomposition, and MIME header decoding are all handled
 * correctly and consistently for both reply and bounce processing.
 */
export async function fetchInboxMessages(hours = 48): Promise<InboxMessage[]> {
  const imap = getInboxClient();
  await imap.connect();

  const sinceDate = new Date(Date.now() - hours * 3600_000);

  // Open INBOX read-only to avoid marking messages as read
  const lock = await imap.getMailboxLock('INBOX', { readOnly: true });

  try {
    const messages = imap.fetch(
      { since: sinceDate },
      {
        uid: true,
        envelope: true,
        internalDate: true,
        source: true, // raw RFC822/2822 — simpleParser handles all encoding
      }
    );

    const results: InboxMessage[] = [];

    for await (const msg of messages) {
      let parsed: ParsedMail | null = null;

      if (msg.source) {
        try {
          parsed = await simpleParser(msg.source);
        } catch (err) {
          console.error('[inbox] simpleParser failed for UID', msg.uid, err);
        }
      }

      // Prefer parsed headers when available; fall back to envelope
      const fromRaw =
        parsed?.headers.get('from')?.text ??
        msg.envelope?.from?.[0]?.address ??
        '';
      const from = normaliseAddress(fromRaw);
      const subject = parsed?.subject ?? msg.envelope?.subject ?? '';
      const date = parsed?.date ?? msg.envelope?.date ?? new Date();

      // simpleParser returns decoded, charset-converted plain text
      const bodyText = parsed?.text ?? '';

      // Build header record from parsed headers (already decoded by mailparser)
      const headers: Record<string, string> = {};
      if (parsed?.headers) {
        for (const [key, val] of parsed.headers.entries()) {
          headers[key.toLowerCase()] = val;
        }
      }

      const isAuto = isAutoReply(headers);
      const isBnc = isBounceNotification(from);
      let bounceType: 'hard' | 'soft' | null = null;
      let failedRecipient: string | null = null;

      if (isBnc) {
        failedRecipient = extractFailedRecipient(headers);
        bounceType = null;
      }

      results.push({
        uid: msg.uid,
        from,
        subject,
        date,
        headers,
        bodyText,
        isAutoReply: isAuto,
        isBounce: isBnc,
        bounceType,
        failedRecipient,
      });
    }

    return results;
  } finally {
    lock.release();
    await imap.logout();
    client = null;
  }
}
