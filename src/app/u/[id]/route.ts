import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* -------------------------------------------------------------------- */
/* Logging                                                               */
/* -------------------------------------------------------------------- */

async function logHit(
  enrolmentId: string,
  method: string,
  userAgent: string,
  ip: string | null,
  ts: string,
) {
  try {
    const { error } = await supabase.from('unsubscribe_hits').insert({
      enrolment_id: enrolmentId,
      method,
      user_agent: userAgent,
      ip,
      hit_at: ts,
    });
    if (error) console.error('[unsubscribe] logHit error:', error.message);
  } catch (e: any) {
    console.error('[unsubscribe] logHit exception:', e?.message ?? e);
  }
}

/* -------------------------------------------------------------------- */
/* Confirmation page                                                     */
/* -------------------------------------------------------------------- */

function confirmPage(lang: string): string {
  const ar = lang === 'ar';
  const heading = ar ? 'تأكيد إلغاء الاشتراك' : 'Confirm Unsubscribe';
  const body = ar
    ? 'إذا لم تكن تريد استلام رسائل أخرى من Premiera Live، اضغط الزر أدناه.'
    : 'If you no longer wish to receive emails from Premiera Live, click the button below.';
  const button = ar ? 'إلغاء الاشتراك' : 'Unsubscribe';
  const note = ar
    ? 'لن تصلك رسائل أخرى من بريمييرا لايف.'
    : 'You will no longer receive emails from Premiera Live.';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>${heading}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 480px; margin: 60px auto; padding: 0 20px; text-align: center; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    p  { font-size: 1rem; color: #555; margin-bottom: 2rem; line-height: 1.6; }
    form { margin-top: 1.5rem; }
    button {
      background: #d32f2f; color: #fff; border: none; border-radius: 6px;
      padding: 12px 32px; font-size: 1rem; cursor: pointer;
    }
    button:hover { background: #b71c1c; }
    .note { margin-top: 1.5rem; font-size: 0.85rem; color: #888; }
  </style>
</head>
<body>
  <h1>${heading}</h1>
  <p>${body}</p>
  <form method="POST" action="/u/${lang === 'ar' ? 'ar' : ''}">
    <button type="submit">${button}</button>
  </form>
  <p class="note">${note}</p>
</body>
</html>`;
}

/* -------------------------------------------------------------------- */
/* One-click body parser (RFC 8058)                                      */
/* -------------------------------------------------------------------- */

function isOneClickPost(body: string): boolean {
  return body
    .split('&')
    .some((pair) => pair.trim().toLowerCase() === 'list-unsubscribe=one-click');
}

/* -------------------------------------------------------------------- */
/* Unsubscribe action (shared between POST and one-click)                */
/* -------------------------------------------------------------------- */

async function doUnsubscribe(
  id: string,
  source: 'confirm_page' | 'one_click_header' | 'legacy_get',
  userAgent: string,
  ip: string | null,
): Promise<{ found: boolean; email: string | null }> {
  const ts = new Date().toISOString();

  const { data: enrolment } = await supabase
    .from('sequence_enrolments')
    .select('id, prospect_id, contact_id')
    .eq('id', id)
    .maybeSingle();

  if (!enrolment) return { found: false, email: null };

  // Resolve contact email
  let email: string | null = null;
  if (enrolment.contact_id) {
    const { data: c } = await supabase
      .from('prospect_contacts')
      .select('email')
      .eq('id', enrolment.contact_id)
      .maybeSingle();
    email = c?.email ?? null;
  }
  if (!email) {
    const { data: c } = await supabase
      .from('prospect_contacts')
      .select('email')
      .eq('prospect_id', enrolment.prospect_id)
      .eq('is_primary', true)
      .maybeSingle();
    email = c?.email ?? null;
  }

  // Mark prospect unsubscribed
  await supabase
    .from('prospects')
    .update({ unsubscribed_at: ts })
    .eq('id', enrolment.prospect_id);

  // Mark enrolment stopped — include the source so the reason is informative
  await supabase
    .from('sequence_enrolments')
    .update({
      status: 'unsubscribed',
      next_send_at: null,
      stopped_at: ts,
      stopped_reason: source,
    })
    .eq('id', id);

  // Suppression list
  if (email) {
    await supabase
      .from('suppression_list')
      .upsert(
        { email: email.trim().toLowerCase(), reason: 'unsubscribed' },
        { onConflict: 'email', ignoreDuplicates: true }
      );
  }

  return { found: true, email };
}

/* -------------------------------------------------------------------- */
/* Route handlers                                                        */
/* -------------------------------------------------------------------- */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const userAgent = req.headers.get('user-agent') ?? '';
  const ip = req.headers.get('x-forwarded-for')
    ?? req.headers.get('x-real-ip')
    ?? null;
  const ts = new Date().toISOString();

  // Log the hit — GET is never an unsubscribe action, only a page render
  await logHit(id, 'GET', userAgent, ip, ts);

  // Primary: render in the prospect's own lang_pref (from DB).
  // Fallback: detect from Accept-Language header.
  // If enrolment does not exist, fall back to Accept-Language (same page either way).
  let lang = 'ar'; // default
  const { data: enrolment } = await supabase
    .from('sequence_enrolments')
    .select('prospect_id')
    .eq('id', id)
    .maybeSingle();

  if (enrolment?.prospect_id) {
    const { data: prospect } = await supabase
      .from('prospects')
      .select('lang_pref')
      .eq('id', enrolment.prospect_id)
      .maybeSingle();
    if (prospect?.lang_pref) {
      lang = prospect.lang_pref === 'en' ? 'en' : 'ar';
    } else {
      // No lang_pref on prospect — use Accept-Language as fallback
      const acceptLang = req.headers.get('accept-language') ?? '';
      lang = acceptLang.toLowerCase().includes('ar') ? 'ar' : 'en';
    }
  } else {
    // Enrolment not found — use Accept-Language (same page is shown either way)
    const acceptLang = req.headers.get('accept-language') ?? '';
    lang = acceptLang.toLowerCase().includes('ar') ? 'ar' : 'en';
  }

  return new NextResponse(confirmPage(lang), {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const userAgent = req.headers.get('user-agent') ?? '';
  const ip = req.headers.get('x-forwarded-for')
    ?? req.headers.get('x-real-ip')
    ?? null;
  const ts = new Date().toISOString();

  // Log the POST hit immediately
  await logHit(id, 'POST', userAgent, ip, ts);

  // RFC 8058 one-click: POST body contains List-Unsubscribe=One-Click
  let bodyText = '';
  try {
    bodyText = await req.text();
  } catch { /* ignore */ }

  const source: 'confirm_page' | 'one_click_header' | 'legacy_get' =
    isOneClickPost(bodyText) ? 'one_click_header' : 'confirm_page';

  // For one-click from List-Unsubscribe-Post header, Gmail sends Content-Type: application/x-www-form-urlencoded
  // or similar — we treat any POST with List-Unsubscribe=One-Click as a one-click.
  // If it's a plain form POST from our own confirm page, it's confirm_page.
  const isOneClick = isOneClickPost(bodyText);

  const result = await doUnsubscribe(
    id,
    isOneClick ? 'one_click_header' : 'confirm_page',
    userAgent,
    ip,
  );

  // Render the post-action page in the prospect's own language (lang_pref),
  // not the Accept-Language of whoever is viewing it.
  let lang = 'ar';
  if (result.found) {
    const { data: enrolment } = await supabase
      .from('sequence_enrolments')
      .select('prospect_id')
      .eq('id', id)
      .maybeSingle();
    if (enrolment?.prospect_id) {
      const { data: prospect } = await supabase
        .from('prospects')
        .select('lang_pref')
        .eq('id', enrolment.prospect_id)
        .maybeSingle();
      if (prospect?.lang_pref) lang = prospect.lang_pref === 'en' ? 'en' : 'ar';
    }
  }

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <title>${lang === 'ar' ? 'تم إلغاء الاشتراك' : 'Unsubscribed'}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 480px; margin: 60px auto; padding: 0 20px; text-align: center; }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    p  { font-size: 1rem; color: #555; }
  </style>
</head>
<body>
  <h1>${lang === 'ar' ? 'تم إلغاء الاشتراك' : 'Unsubscribed'}</h1>
  <p>${lang === 'ar' ? 'لن تصلك رسائل أخرى من Premiera Live.' : 'No more emails from Premiera Live.'}</p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
