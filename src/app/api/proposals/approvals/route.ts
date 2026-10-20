// Phase 15/16 — Approval routes
// GET  /api/proposals/approvals         — list approvals
// POST /api/proposals/approvals         — request approval (sales → document_approvals row)
// PATCH /api/proposals/approvals/[id]   — CEO approves/rejects

import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';

const CEO_EMAIL = process.env.CEO_EMAIL ?? '';

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
    if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const isCeo = user.email === CEO_EMAIL;

    const query = adminClient()
      .from('document_approvals')
      .select('*, documents!document_id(doc_number, doc_type, client_name, total, status)')
      .order('requested_at', { ascending: false });

    const { data, error } = isCeo
      ? await query
      : await query.eq('requested_by', user.email!);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ rows: data });
  } catch (err: any) {
    console.error('[GET /approvals] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
    if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { document_id } = await req.json();
    if (!document_id) return NextResponse.json({ error: 'document_id required' }, { status: 400 });

    const { data: doc, error: docErr } = await adminClient()
      .from('documents').select('*').eq('id', document_id).single();
    if (docErr || !doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    if (doc.status !== 'accepted') {
      return NextResponse.json({ error: 'Only accepted documents can be invoiced' }, { status: 400 });
    }

    const { data: existing } = await adminClient()
      .from('document_approvals')
      .select('id')
      .eq('document_id', document_id)
      .is('decision', null)
      .single();
    if (existing) return NextResponse.json({ error: 'Approval already requested' }, { status: 409 });

    const { data, error } = await adminClient()
      .from('document_approvals')
      .insert({ document_id, requested_by: user.email! })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ row: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /approvals] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status: 500 });
  }
}
