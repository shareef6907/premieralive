/**
 * GET  /api/outbound/whatsapp          — list queued tasks
 * PATCH /api/outbound/whatsapp          — mark_sent | skip
 *
 * Auth: session via Authorization Bearer token.
 * Token is attached to the Supabase client so RLS sees auth.uid().
 * RLS policy on sequence_sends requires role in (ceo, sales_manager).
 */
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

/* ------------------------------------------------------------------ */
/* Auth — validate session, return user + raw token for client reuse  */
/* ------------------------------------------------------------------ */

type AuthResult = { user: { id: string }; token: string } | null;

async function authUser(req: NextRequest): Promise<AuthResult> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '') ?? '';
  if (!token) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: userData, error } = await supabase.auth.getUser(token);
  if (error || !userData?.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();

  if (!profile) return null;
  if (profile.role !== 'ceo' && profile.role !== 'sales_manager') return null;

  return { user: userData.user, token };
}

/* ------------------------------------------------------------------ */
/* GET — list queued WhatsApp tasks                                      */
/* ------------------------------------------------------------------ */

export async function GET(req: NextRequest) {
  const auth = await authUser(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Attach the validated token so RLS sees auth.uid()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${auth.token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );

  const { data, error } = await supabase
    .from('sequence_sends')
    .select(`
      id,
      body,
      channel,
      status,
      created_at,
      step_number,
      enrolment_id,
      sequence_enrolments!inner(
        current_step,
        prospects!inner(
          id,
          company_name,
          score,
          vertical,
          phone,
          lang_pref
        ),
        prospect_contacts!inner(
          full_name,
          whatsapp
        )
      )
    `)
    .eq('channel', 'whatsapp_manual')
    .eq('status', 'queued')
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []).map((row: any) => {
    const enr = row.sequence_enrolments;
    const prospect = enr?.prospects;
    const contact = enr?.prospect_contacts;
    return {
      id: row.id,
      body: row.body,
      channel: row.channel,
      status: row.status,
      created_at: row.created_at,
      step_number: row.step_number,
      enrolment_id: row.enrolment_id,
      prospect_id: prospect?.id,
      company_name: prospect?.company_name,
      score: prospect?.score,
      vertical: prospect?.vertical,
      phone: prospect?.phone,
      lang_pref: prospect?.lang_pref,
      full_name: contact?.full_name,
      whatsapp: contact?.whatsapp,
    };
  });

  return NextResponse.json({ rows });
}

/* ------------------------------------------------------------------ */
/* PATCH — mark_sent | skip                                            */
/* ------------------------------------------------------------------ */

export async function PATCH(req: NextRequest) {
  const auth = await authUser(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Request body must be an object' }, { status: 400 });
  }

  const { id, action } = body as Record<string, unknown>;

  if (typeof id !== 'string' || id.length === 0) {
    return NextResponse.json({ error: 'id must be a non-empty string' }, { status: 400 });
  }
  if (action !== 'mark_sent' && action !== 'skip') {
    return NextResponse.json({ error: 'action must be mark_sent or skip' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${auth.token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );

  const now = new Date().toISOString();

  if (action === 'mark_sent') {
    const { data, error } = await supabase
      .from('sequence_sends')
      .update({ status: 'sent', sent_at: now })
      .eq('id', id)
      .eq('channel', 'whatsapp_manual')
      .eq('status', 'queued')
      .select('id'); // count affected rows
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Row not found or already processed' }, { status: 404 });
    }
  } else {
    const { data, error } = await supabase
      .from('sequence_sends')
      .update({ status: 'failed', error: 'skipped manually' })
      .eq('id', id)
      .eq('channel', 'whatsapp_manual')
      .eq('status', 'queued')
      .select('id');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Row not found or already processed' }, { status: 404 });
    }
  }

  return NextResponse.json({ ok: true });
}
