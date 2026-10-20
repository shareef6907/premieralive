// GET/PATCH /api/proposals/documents/[id]
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { computeTotals } from '@/lib/proposals/types';
import { LineItem } from '@/lib/proposals/types';
import { getActor, assertCanMutate } from '@/lib/auth';

interface Params { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const actor = await getActor(req);

    const supabase = adminClient();
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      row: data,
      is_ceo: actor.isCeo,
      auth: {
        user_email: actor.user.email,
        ceo_email_configured: !!process.env.CEO_EMAIL,
        is_ceo: actor.isCeo,
      },
    });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const actor = await getActor(req);

    const supabase = adminClient();
    const { data: existing, error: fetchErr } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchErr || !existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // QA guard: non-primary CEO may only mutate TEST — documents
    assertCanMutate(actor, existing);

    const body = await req.json();

    // ── Phase 16: Mark invoice paid ────────────────────────────────────
    if (body._action === 'mark_paid') {
      if (!actor.isCeo) return NextResponse.json({ error: 'Only the CEO can mark an invoice as paid' }, { status: 403 });
      if (existing.doc_type !== 'invoice') return NextResponse.json({ error: 'Only invoices can be marked paid' }, { status: 400 });
      if (!['sent', 'overdue'].includes(existing.status)) {
        return NextResponse.json({ error: `Cannot mark paid from status '${existing.status}'` }, { status: 400 });
      }
      const { data: updated, error: updErr } = await supabase
        .from('documents')
        .update({
          status: 'paid',
          paid_at: body.paid_at ?? new Date().toISOString(),
          payment_reference: body.payment_reference ?? null,
        })
        .eq('id', id)
        .select()
        .single();
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
      return NextResponse.json({ row: updated });
    }

    // ── Phase 16: Decline a sent document ──────────────────────────────
    if (body._action === 'decline') {
      if (!actor.isCeo) return NextResponse.json({ error: 'Only the CEO can decline a document' }, { status: 403 });
      if (existing.status !== 'sent') return NextResponse.json({ error: 'Only sent documents can be declined' }, { status: 400 });
      if (!['quote', 'proposal', 'retainer'].includes(existing.doc_type)) {
        return NextResponse.json({ error: 'Only quotes, proposals and retainers can be declined' }, { status: 400 });
      }
      const { data: updated, error: updErr } = await supabase
        .from('documents')
        .update({ status: 'declined' })
        .eq('id', id)
        .select()
        .single();
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
      return NextResponse.json({ row: updated });
    }

    // ── Phase 16: Void a document ──────────────────────────────────────
    if (body._action === 'void') {
      if (!actor.isCeo) return NextResponse.json({ error: 'Only the CEO can void a document' }, { status: 403 });
      if (!['draft', 'sent', 'accepted'].includes(existing.status)) {
        return NextResponse.json({ error: `Cannot void a document with status '${existing.status}'` }, { status: 400 });
      }
      const { data: updated, error: updErr } = await supabase
        .from('documents')
        .update({ status: 'void' })
        .eq('id', id)
        .select()
        .single();
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
      return NextResponse.json({ row: updated });
    }

    // ── Phase 16: Flip overdue ─────────────────────────────────────────
    if (body._action === 'flip_overdue') {
      const { data: updated, error: updErr } = await adminClient()
        .from('documents')
        .update({ status: 'overdue' })
        .eq('doc_type', 'invoice')
        .eq('status', 'sent')
        .lte('due_date', new Date().toISOString().slice(0, 10))
        .select();
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
      return NextResponse.json({ rows: updated });
    }

    // ── Phase 16: Accept a sent document ───────────────────────────────
    if (body._action === 'accept') {
      if (!actor.isCeo) return NextResponse.json({ error: 'Only the CEO can accept a document' }, { status: 403 });
      if (existing.status !== 'sent') return NextResponse.json({ error: 'Only sent documents can be accepted' }, { status: 400 });
      if (!['quote', 'proposal', 'retainer'].includes(existing.doc_type)) {
        return NextResponse.json({ error: 'Only quotes, proposals and retainers can be accepted' }, { status: 400 });
      }
      const { data: updated, error: updErr } = await supabase
        .from('documents')
        .update({
          status: 'accepted',
          accepted_by_name: body.accepted_by_name ?? null,
          accepted_by_title: body.accepted_by_title ?? null,
          accepted_at: body.accepted_at ?? new Date().toISOString(),
          lpo_number: body.lpo_number ?? null,
          lpo_date: body.lpo_date ?? null,
          lpo_amount: body.lpo_amount ?? null,
        })
        .eq('id', id)
        .select()
        .single();
      if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
      return NextResponse.json({ row: updated });
    }

    // ── Phase 15: Editing a non-draft doc → create revision ─────────────
    if (existing.status !== 'draft') {
      const newDocNumber: string = await supabase.rpc('next_doc_number', { p_doc_type: existing.doc_type }) as any;
      const revisionBody = {
        doc_number: newDocNumber,
        doc_type: existing.doc_type,
        status: 'draft',
        parent_id: existing.id,
        client_name: body.client_name ?? existing.client_name,
        client_address: body.client_address ?? existing.client_address,
        client_email: body.client_email ?? existing.client_email,
        client_phone: body.client_phone ?? existing.client_phone,
        prospect_id: body.prospect_id ?? existing.prospect_id,
        line_items: body.line_items ?? existing.line_items,
        subtotal: existing.subtotal,
        discount_pct: body.discount_pct ?? existing.discount_pct,
        discount_amount: existing.discount_amount,
        total: existing.total,
        currency: existing.currency,
        payment_terms: body.payment_terms ?? existing.payment_terms,
        notes: body.notes ?? existing.notes,
        created_by: existing.created_by,
      };
      const { data: newDoc, error: insertErr } = await supabase
        .from('documents')
        .insert(revisionBody)
        .select()
        .single();
      if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });
      await supabase.from('documents').update({ status: 'superseded' }).eq('id', existing.id);
      return NextResponse.json({ row: newDoc, revision: true });
    }

    // ── Draft edit ─────────────────────────────────────────────────────
    if (existing.doc_type === 'retainer' && existing.status === 'draft') {
      const newStart = body.start_date ?? existing.start_date;
      if (newStart) {
        const todayStr = new Date().toISOString().slice(0, 10);
        if (newStart < todayStr) {
          return NextResponse.json({ error: 'Start date must be today or in the future' }, { status: 400 });
        }
      }
    }

    const discount = Number(body.discount_pct ?? existing.discount_pct ?? 0);
    if (discount < 0 || discount > 35) {
      return NextResponse.json({ error: 'Discount must be 0–35%' }, { status: 400 });
    }

    const rawItems: LineItem[] = (body.line_items ?? existing.line_items ?? []).map((li: any) => ({
      description: String(li.description ?? '').trim(),
      details: String(li.details ?? ''),
      qty: Number(li.qty ?? 1),
      unit_price: Math.round(Number(li.unit_price ?? 0) * 100) / 100,
      amount: 0,
    }));
    rawItems.forEach((li) => { li.amount = Math.round(li.qty * li.unit_price * 100) / 100; });

    const invalidItem = rawItems.find((li) => li.description === '' || li.amount <= 0);
    if (invalidItem) {
      return NextResponse.json(
        { error: invalidItem.description === '' ? 'Empty line item description is not allowed' : 'Line item amount must be greater than zero' },
        { status: 400 }
      );
    }

    const lineItems: LineItem[] = rawItems;
    const { subtotal, discountAmount, total } = computeTotals(lineItems, discount);

    const { data, error } = await supabase
      .from('documents')
      .update({
        client_name: body.client_name ?? existing.client_name,
        client_address: body.client_address ?? existing.client_address,
        client_email: body.client_email ?? existing.client_email,
        client_phone: body.client_phone ?? existing.client_phone,
        prospect_id: body.prospect_id ?? existing.prospect_id,
        line_items: lineItems,
        subtotal,
        discount_pct: discount,
        discount_amount: discountAmount,
        total,
        payment_terms: body.payment_terms ?? existing.payment_terms,
        notes: body.notes ?? existing.notes,
        status: body.status ?? existing.status,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ row: data, revision: false });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : err.status === 403 ? 403 : 500;
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}
