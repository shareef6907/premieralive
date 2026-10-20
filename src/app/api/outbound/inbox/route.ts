/**
 * Studio OS — Outbound inbox cron
 *
 * GET /api/outbound/inbox  — Vercel Cron (every 15 minutes)
 * POST /api/outbound/inbox — manual invocation (curl debugging)
 *
 * Both methods share the same guard and the same work.
 * CRON_SECRET is validated on every request; a missing or mismatched
 * Bearer token returns 401 so the route is not accidentally open.
 *
 * Processes both replies and bounces in a single IMAP poll:
 *   1. Fetch messages from INBOX (last 48 hours)
 *   2. Log every DSN examined with from/subject/status/outcome
 *   3. Route each to reply handler or bounce handler
 *   4. Log summary
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchInboxMessages } from '@/lib/outbound/inbox';
import { processReplyMessages } from '@/lib/outbound/replies';
import { processBounceMessages } from '@/lib/outbound/bounces';

export const runtime = 'nodejs';

/* -------------------------------------------------------------------- */
/* Shared handler — called by both GET and POST                           */
/* -------------------------------------------------------------------- */

async function handleInboxRequest(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? '';
  const cronSecret = process.env.CRON_SECRET ?? '';

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const messages = await fetchInboxMessages(48);

    // ── Log every DSN / bounce-candidate examined ──────────────────────
    // This block mirrors the exact routing logic in processBounceMessages
    // so every message that could be a bounce is visible in the cron JSON.
    const dsnLog: Array<{
      uid: number;
      from: string;
      subject: string;
      parsed_status: string | null;
      failed_recipient: string | null;
      is_bounce: boolean;
      outcome: string;
    }> = [];

    for (const msg of messages) {
      const fromLower = msg.from.toLowerCase();
      const isFromMailer = fromLower.startsWith('mailer-daemon@') || fromLower.startsWith('postmaster@');
      const isAutoReply = msg.isAutoReply;

      let parsedStatus: string | null = null;
      if (isFromMailer && !isAutoReply) {
        // Mirror bounces.ts parseSmtpStatus — extract Status: N.x.x or Diagnostic-Code
        const smtpMatch = msg.bodyText.match(/^Status:\s*([45])\.\d+\.\d+/im);
        if (smtpMatch) {
          parsedStatus = smtpMatch[1] === '5' ? 'hard' : 'soft';
        } else {
          const diagMatch = msg.bodyText.match(/^Diagnostic-Code:\s*\S+\s+([45])\d{2}[-\s]/im);
          if (diagMatch) parsedStatus = diagMatch[1] === '5' ? 'hard' : 'soft';
        }
      }

      let outcome = 'ignored';
      if (isAutoReply) {
        outcome = 'skipped_is_auto_reply';
      } else if (!isFromMailer) {
        outcome = 'skipped_not_bounce_from';
      } else if (!parsedStatus) {
        outcome = 'skipped_no_status_code';
      }

      dsnLog.push({
        uid: msg.uid,
        from: msg.from,
        subject: msg.subject,
        parsed_status: parsedStatus,
        failed_recipient: msg.failedRecipient,
        is_bounce: isFromMailer && !isAutoReply,
        outcome,
      });
    }

    const replyCount = await processReplyMessages(messages);
    const bounceCount = await processBounceMessages(messages);

    return NextResponse.json({
      processed: messages.length,
      replies: replyCount,
      bounces: bounceCount,
      dsn_examined: dsnLog,
    });
  } catch (err: any) {
    console.error('[inbox cron] Error:', err?.message ?? err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

/* -------------------------------------------------------------------- */
/* Route handlers                                                        */
/* -------------------------------------------------------------------- */

export async function GET(req: NextRequest) {
  return handleInboxRequest(req);
}

export async function POST(req: NextRequest) {
  return handleInboxRequest(req);
}