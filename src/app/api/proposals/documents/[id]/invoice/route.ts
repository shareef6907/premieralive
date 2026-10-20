// POST /api/proposals/documents/[id]/invoice
// CEO: generates an invoice (deposit/final/full/retainer_month) from an accepted source doc.
// Sales: inserts a document_approval row instead.
import { NextRequest, NextResponse } from 'next/server';
import { createInvoiceFromSource } from '@/lib/proposals/invoices';
import { adminClient } from '@/lib/admin';
import { getActor, assertCanMutate } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const actor = await getActor(req);
    const { id: sourceId } = params;

    const body = await req.json();
    const { kind } = body;  // 'deposit' | 'final' | 'full' | 'retainer_month'

    if (!['deposit', 'final', 'full', 'retainer_month'].includes(kind)) {
      return NextResponse.json({ error: 'Invalid invoice kind' }, { status: 400 });
    }

    // Fetch source doc for QA guard
    const { data: sourceDoc } = await adminClient()
      .from('documents').select('client_name').eq('id', sourceId).single();
    assertCanMutate(actor, sourceDoc ?? {});

    // ── CEO path: create invoice via TypeScript (no SQL business logic) ─
    if (actor.isCeo) {
      try {
        const invoice = await createInvoiceFromSource(sourceId, kind, actor.user.id);
        return NextResponse.json({ invoice }, { status: 201 });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
      }
    }

    // ── Sales path: create approval request ────────────────────────────
    const { error: apprErr } = await adminClient()
      .from('document_approvals')
      .insert({
        document_id: sourceId,
        requested_by: actor.user.email ?? 'unknown',
      });
    if (apprErr) return NextResponse.json({ error: apprErr.message }, { status: 500 });

    return NextResponse.json({
      message: 'Invoice request submitted for CEO approval',
      approval_requested: true,
    });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : err.status === 403 ? 403 : 500;
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}
