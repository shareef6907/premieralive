/**
 * Studio OS — Outbound sender (#20)
 * Vercel cron, hourly.  vercel.json:  { "crons": [{ "path": "/api/outbound/send", "schedule": "0 * * * *" }] }
 *
 * Sends through Google Workspace SMTP (shareef@premieralive.co), never through
 * Resend. Resend and SES both prohibit unsolicited email — routing cold outreach
 * through them risks the account that also carries Studio OS transactional mail.
 *
 * Env:
 *   SMTP_USER               shareef@premieralive.co
 *   SMTP_APP_PASSWORD       Google App Password (needs 2SV enabled)
 *   DAILY_SEND_CAP          start at 5, raise per the warm-up ladder
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DAILY_CAP = Number(process.env.DAILY_SEND_CAP ?? 5);

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_APP_PASSWORD!,
  },
});

/* ------------------------------------------------------------------ */
/* Send window — Saudi working days, business hours, AST (UTC+3)        */
/* ------------------------------------------------------------------ */

function insideSendWindow(now = new Date()): boolean {
  const ast = new Date(now.getTime() + 3 * 3600_000);
  const day = ast.getUTCDay();          // 0 Sun … 6 Sat
  const hour = ast.getUTCHours();

  if (day === 5 || day === 6) return false;   // Friday, Saturday
  return hour >= 9 && hour < 16;              // 09:00–16:00 AST
}

/* ------------------------------------------------------------------ */
/* Template rendering                                                   */
/* ------------------------------------------------------------------ */

function render(tpl: string, vars: Record<string, string | null>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
}

/** First name only. Falls back to a neutral address rather than a blank. */
function firstName(full: string | null, lang: string): string {
  const n = (full ?? '').trim().split(/\s+/)[0];
  if (n) return n;
  return lang === 'ar' ? 'حياك الله' : 'there';
}

/* ------------------------------------------------------------------ */
/* Suppression — shared via suppression.ts, imported below               */
/* ------------------------------------------------------------------ */

import { isSuppressed } from './suppression';

/* ------------------------------------------------------------------ */
/* Main                                                                 */
/* ------------------------------------------------------------------ */

export async function runOutbound() {
  if (!insideSendWindow()) {
    return { skipped: 'outside send window' };
  }

  // How many have already gone out today?
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count: sentToday } = await supabase
    .from('sequence_sends')
    .select('id', { count: 'exact', head: true })
    .eq('channel', 'email')
    .eq('status', 'sent')
    .gte('sent_at', startOfDay.toISOString());

  const remaining = DAILY_CAP - (sentToday ?? 0);
  if (remaining <= 0) return { skipped: 'daily cap reached', sentToday };

  // Due enrolments
  const { data: due } = await supabase
    .from('sequence_enrolments')
    .select(`
      id, prospect_id, contact_id, sequence_id, current_step,
      sequences ( requires_hook ),
      prospects ( company_name, city, personal_hook, lang_pref, unsubscribed_at ),
      prospect_contacts ( full_name, email, lang_pref )
    `)
    .eq('status', 'active')
    .lte('next_send_at', new Date().toISOString())
    .limit(remaining);

  if (!due?.length) return { sent: 0, note: 'nothing due' };

  let sentCount = 0;
  const results: string[] = [];

  for (const e of due as any[]) {
    const prospect = e.prospects;
    const contact = e.prospect_contacts;
    const nextStep = (e.current_step ?? 0) + 1;

    const requiresHook = (e as any).sequences?.requires_hook ?? true;
    if (requiresHook && !prospect?.personal_hook) {
      await stop(e.id, 'missing_hook');
      results.push(`skip (no hook): ${prospect?.company_name}`);
      continue;
    }

    if (prospect.unsubscribed_at) {
      await stop(e.id, 'unsubscribed');
      continue;
    }

    const { data: step } = await supabase
      .from('sequence_steps')
      .select('*')
      .eq('sequence_id', e.sequence_id)
      .eq('step_number', nextStep)
      .single();

    if (!step) {                       // ladder finished
      await supabase.from('sequence_enrolments')
        .update({ status: 'completed', next_send_at: null })
        .eq('id', e.id);
      continue;
    }

    const lang = contact?.lang_pref ?? prospect.lang_pref ?? 'ar';
    const vars = {
      first_name: firstName(contact?.full_name, lang),
      company: prospect.company_name,
      city: prospect.city,
      hook: prospect.personal_hook,
    };

    const body = render(step.body, vars);
    const subject = step.subject ? render(step.subject, vars) : null;

    /* ---- WhatsApp: never automated. Queue it as a task. ---- */
    if (step.channel === 'whatsapp_manual') {
      await supabase.from('sequence_sends').insert({
        enrolment_id: e.id,
        step_number: nextStep,
        channel: 'whatsapp_manual',
        body,
        status: 'queued',           // surfaces in the Today queue for manual send
      });
      await advance(e.id, nextStep, e.sequence_id);
      results.push(`whatsapp task: ${prospect.company_name}`);
      continue;
    }

    /* ---- Email ---- */
    if (!contact?.email) {
      await stop(e.id, 'no_email');
      continue;
    }
    if (await isSuppressed(contact.email)) {
      await stop(e.id, 'suppressed');
      continue;
    }

    // Served by Studio OS itself — see src/app/u/[id]/route.ts
    const unsubUrl = `${process.env.NEXT_PUBLIC_APP_URL}/u/${e.id}`;
    const sig = lang === 'ar'
      ? `—\nShareef Ali\nFounder & CEO\nPremiera Live | شركة بريمييرا لايف\nCR 7054807941\nSpaces Ajdan Walk, Corniche 5, Al Khobar, Saudi Arabia\nceo@premieralive.com | +966 50 044 0235\npremieralive.com\n\nإذا ما تبي رسائل ثانية، اضغط هنا: ${unsubUrl}`
      : `—\nShareef Ali\nFounder & CEO\nPremiera Live | شركة بريمييرا لايف\nCR 7054807941\nSpaces Ajdan Walk, Corniche 5, Al Khobar, Saudi Arabia\nceo@premieralive.com | +966 50 044 0235\npremieralive.com\n\nIf you'd rather not hear from me again: ${unsubUrl}`;

    try {
      const info = await transport.sendMail({
        from: `"Shareef Ali" <${process.env.SMTP_USER}>`,
        to: contact.email,
        subject: subject ?? '',
        text: body + '\n\n' + sig,
        headers: {
          'List-Unsubscribe': `<${unsubUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      });

      await supabase.from('sequence_sends').insert({
        enrolment_id: e.id,
        step_number: nextStep,
        channel: 'email',
        to_email: contact.email,
        subject,
        body,
        provider_id: info.messageId,
        status: 'sent',
        sent_at: new Date().toISOString(),
      });

      await advance(e.id, nextStep, e.sequence_id);
      sentCount++;
      results.push(`sent step ${nextStep}: ${prospect.company_name}`);
    } catch (err: any) {
      await supabase.from('sequence_sends').insert({
        enrolment_id: e.id,
        step_number: nextStep,
        channel: 'email',
        to_email: contact.email,
        subject,
        body,
        status: 'failed',
        error: String(err?.message ?? err),
      });
      results.push(`FAILED: ${prospect.company_name}`);
    }

    // Human-ish spacing between sends
    await new Promise((r) => setTimeout(r, 20_000 + Math.random() * 40_000));
  }

  return { sent: sentCount, results };
}

/* ------------------------------------------------------------------ */

async function advance(enrolmentId: string, step: number, sequenceId: string) {
  const { data: next } = await supabase
    .from('sequence_steps')
    .select('delay_days')
    .eq('sequence_id', sequenceId)
    .eq('step_number', step + 1)
    .single();

  if (!next) {
    await supabase.from('sequence_enrolments')
      .update({ current_step: step, status: 'completed', next_send_at: null })
      .eq('id', enrolmentId);
    return;
  }

  // delay_days is measured from enrolment, so recompute from enrolled_at
  const { data: enr } = await supabase
    .from('sequence_enrolments')
    .select('enrolled_at')
    .eq('id', enrolmentId)
    .single();

  const base = new Date(enr!.enrolled_at);
  base.setDate(base.getDate() + next.delay_days);

  await supabase.from('sequence_enrolments')
    .update({ current_step: step, next_send_at: base.toISOString() })
    .eq('id', enrolmentId);
}

async function stop(enrolmentId: string, reason: string) {
  await supabase.from('sequence_enrolments').update({
    status: 'stopped',
    stopped_at: new Date().toISOString(),
    stopped_reason: reason,
    next_send_at: null,
  }).eq('id', enrolmentId);
}
