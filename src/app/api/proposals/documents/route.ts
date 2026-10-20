// GET  /api/proposals/documents         — list all documents
// POST /api/proposals/documents         — create document
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { computeTotals } from '@/lib/proposals/types';
import { LineItem } from '@/lib/proposals/types';
import { getActor, assertCanMutate } from '@/lib/auth';

const CEO_EMAIL = (process.env.CEO_EMAIL ?? '').trim().toLowerCase();
if (!CEO_EMAIL) console.warn('[GET /documents] CEO_EMAIL not set');

// GET /api/proposals/documents
export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: { user: authUser }, error: authErr } = await adminClient().auth.getUser(accessToken);
    if (authErr || !authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const isCeo = !!CEO_EMAIL && (authUser.email ?? '').trim().toLowerCase() === CEO_EMAIL;

    // Flip overdue — CEO only
    if (isCeo) {
      const today = new Date().toISOString().slice(0, 10);
      const { error: flipErr } = await adminClient()
        .from('documents')
        .update({ status: 'overdue' })
        .eq('doc_type', 'invoice')
        .eq('status', 'sent')
        .lte('due_date', today);
      if (flipErr) {
        console.error('[GET /documents] flip_overdue error:', flipErr);
      }
    }

    // List — adminClient bypasses RLS so CEO sees all rows
    const { data, error } = await adminClient()
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[GET /documents] select error:', error);
      return NextResponse.json(
        { error: error.message, detail: error.details, hint: error.hint },
        { status: 500 }
      );
    }

    return NextResponse.json({ rows: data ?? [], is_ceo: isCeo });
  } catch (err: any) {
    console.error('[GET /documents] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status: 500 });
  }
}

// POST /api/proposals/documents
export async function POST(req: NextRequest) {
  try {
    const actor = await getActor(req);
    const body = await req.json();

    const { doc_type } = body;
    if (!doc_type) return NextResponse.json({ error: 'doc_type is required' }, { status: 400 });

    const {
      client_name, client_address, client_email, client_phone,
      prospect_id, line_items, discount_pct = 0, payment_terms, notes, status: targetStatus,
    } = body;

    // ── Role gate: invoice creation — primary CEO only ───────────────────
    if (doc_type === 'invoice') {
      assertCanMutate(actor, { client_name: client_name ?? '' });
    }

    // ── Discount cap ────────────────────────────────────────────────────────
    const discount = Number(discount_pct ?? 0);
    if (discount < 0 || discount > 35) {
      return NextResponse.json({ error: 'Discount must be 0–35%' }, { status: 400 });
    }
    if (discount > 0 && doc_type === 'invoice') {
      return NextResponse.json({ error: 'Invoices cannot be discounted' }, { status: 400 });
    }

    // ── Validate and normalise line items ────────────────────────────────────
    const raw: LineItem[] = (line_items ?? []).map((li: any) => ({
      description: String(li.description ?? '').trim(),
      details: String(li.details ?? ''),
      qty: Number(li.qty ?? 1),
      unit_price: Math.round(Number(li.unit_price ?? 0) * 100) / 100,
      amount: 0,
    }));

    raw.forEach((li) => {
      li.amount = Math.round(li.qty * li.unit_price * 100) / 100;
    });

    const invalidItem = raw.find((li) => li.description === '' || li.amount <= 0);
    if (invalidItem) {
      return NextResponse.json(
        { error: invalidItem.description === ''
            ? 'Empty line item description is not allowed'
            : 'Line item amount must be greater than zero' },
        { status: 400 }
      );
    }

    const items = raw;
    const { subtotal, discountAmount, total } = computeTotals(items, discount);

    // ── Get next doc number ─────────────────────────────────────────────────
    const supabaseAdmin = adminClient();
    const rpcResult: unknown = await supabaseAdmin.rpc('next_doc_number', { p_doc_type: doc_type });
    const { data: docNumber, error: rpcError } = (
      typeof rpcResult === 'object' && rpcResult !== null && 'data' in rpcResult
    ) ? rpcResult as { data: string | null; error: { message: string } | null }
      : { data: null as string | null, error: { message: 'Unexpected RPC response type' } };

    if (rpcError || !docNumber) {
      return NextResponse.json({ error: rpcError?.message ?? 'Failed to generate document number' }, { status: 500 });
    }
    if (typeof docNumber !== 'string' || !/^PL-(P|INV)-[0-9]{4}-[0-9]{3,}$/.test(docNumber)) {
      return NextResponse.json({ error: `Invalid doc_number generated: ${String(docNumber)}` }, { status: 500 });
    }

    // ── Status logic ────────────────────────────────────────────────────────
    const status = targetStatus ?? 'draft';

    // ── Retainer: subtotal/total = monthly_amount × term_months ──────────────
    let docSubtotal = subtotal;
    let docTotal = total;
    let docPaymentTerms = payment_terms ?? '50% upfront upon confirmation, 50% on completion/delivery';
    if (doc_type === 'retainer') {
      const term = Number(body.term_months ?? 0);
      const monthly = Math.round(Number(body.monthly_amount ?? 0) * 100) / 100;
      const start = body.start_date ?? null;
      const billing = Number(body.billing_day ?? 1);
      if (![3, 6, 12].includes(term)) {
        return NextResponse.json({ error: 'Term must be 3, 6, or 12 months' }, { status: 400 });
      }
      if (monthly <= 0) {
        return NextResponse.json({ error: 'Monthly amount must be greater than zero' }, { status: 400 });
      }
      if (!start) {
        return NextResponse.json({ error: 'Start date is required for retainers' }, { status: 400 });
      }
      // Retainer start_date must be today or in the future, and must be the 1st of a month
      const todayStr = new Date().toISOString().slice(0, 10);
      if (start < todayStr) {
        return NextResponse.json({ error: 'Start date must be today or in the future' }, { status: 400 });
      }
      const startDateObj = new Date(start + 'T00:00:00');
      if (startDateObj.getDate() !== 1) {
        return NextResponse.json({ error: 'Retainer start date must be the 1st of a month' }, { status: 400 });
      }
      if (billing < 1 || billing > 28) {
        return NextResponse.json({ error: 'Billing day must be between 1 and 28' }, { status: 400 });
      }
      docSubtotal = Math.round(monthly * term * 100) / 100;
      docTotal = docSubtotal;
      const ord = (n: number) => {
        if (n === 11 || n === 12 || n === 13) return 'th';
        const last = n % 10;
        if (last === 1) return 'st';
        if (last === 2) return 'nd';
        if (last === 3) return 'rd';
        return 'th';
      };
      docPaymentTerms = `Monthly fee payable in advance on the ${billing}${ord(billing)} of each month for the term stated. First invoice issued upon confirmation.`;
    }

    const insertPayload = {
      doc_number: docNumber,
      doc_type,
      status,
      client_name,
      client_address: client_address ?? null,
      client_email: client_email ?? null,
      client_phone: client_phone ?? null,
      prospect_id: prospect_id ?? null,
      line_items: items,
      subtotal: docSubtotal,
      discount_pct: discount,
      discount_amount: discountAmount,
      total: docTotal,
      currency: 'SAR',
      payment_terms: docPaymentTerms,
      notes: notes ?? null,
      created_by: actor.user.email!,
      ...(doc_type === 'retainer' ? {
        term_months: Number(body.term_months),
        monthly_amount: Math.round(Number(body.monthly_amount) * 100) / 100,
        start_date: body.start_date,
        billing_day: Number(body.billing_day),
      } : {}),
    };

    const { data, error } = await supabaseAdmin
      .from('documents')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error('[POST /documents] insert payload:', JSON.stringify(insertPayload, null, 2));
      console.error('[POST /documents] Postgres error:', error);
      return NextResponse.json(
        { error: error.message, detail: error.details, hint: error.hint },
        { status: 500 }
      );
    }
    return NextResponse.json({ row: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /documents] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status: 500 });
  }
}
