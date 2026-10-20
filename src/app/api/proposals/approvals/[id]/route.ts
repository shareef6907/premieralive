// PATCH /api/proposals/approvals/[id] — CEO approves or rejects
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { getActor } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const actor = await getActor(req);

    if (!actor.isCeo) return NextResponse.json({ error: 'Only the CEO can decide approvals' }, { status: 403 });

    const body = await req.json();
    const { decision, invoice_kind } = body;  // decision: 'approved' | 'rejected'
    if (!['approved', 'rejected'].includes(decision)) {
      return NextResponse.json({ error: "decision must be 'approved' or 'rejected'" }, { status: 400 });
    }

    // Load the approval row
    const { data: approval, error: fetchErr } = await adminClient()
      .from('document_approvals')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchErr || !approval) return NextResponse.json({ error: 'Approval not found' }, { status: 404 });
    if (approval.decision) return NextResponse.json({ error: 'Approval already decided' }, { status: 409 });

    // Update the approval row
    const { data: updated, error: updErr } = await adminClient()
      .from('document_approvals')
      .update({
        decision,
        decided_by: actor.user.email ?? 'unknown',
        decided_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

    // If approved: create the invoice via the same server function
    if (decision === 'approved') {
      const kind = invoice_kind ?? 'deposit';  // default to deposit
      const result: unknown = await adminClient().rpc('create_invoice_from_source', {
        p_source_id: approval.document_id,
        p_kind: kind,
        p_requested_by: approval.requested_by,
      });
      const res = result as { data?: { invoice?: object; error?: string }; error?: { message?: string } };
      if (res?.error || (res?.data && (res.data as { error?: string }).error)) {
        const msg = (res?.data as { error?: string })?.error ?? res?.error?.message ?? 'RPC failed';
        // Revert the approval decision
        await adminClient().from('document_approvals').update({ decision: null, decided_by: null, decided_at: null }).eq('id', id);
        return NextResponse.json({ error: 'Invoice creation failed: ' + msg }, { status: 400 });
      }
      const invoice = (res as { data: { invoice: object } }).data.invoice;
      return NextResponse.json({ approval: updated, invoice }, { status: 200 });
    }

    return NextResponse.json({ approval: updated });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : 500;
    console.error('[PATCH /approvals/[id]] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}
