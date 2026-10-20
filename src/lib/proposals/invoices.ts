// Phase 16 — Invoice creation (TypeScript only, no SQL business logic)
import { adminClient } from '@/lib/admin';
import type { InvoiceKind } from './types';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export interface CreateInvoiceOptions {
  sourceId: string;
  kind: InvoiceKind;
  requestedBy: string; // user id of requester — must go through document_approvals for sales
}

/**
 * Compute period_start and period_end for a retainer_month invoice.
 * billing_day is 1-28. Month N starts at billing_day of (start_date month + N - 1).
 * period_end = last calendar day of that month.
 */
function computeRetainerPeriod(
  startDate: string,
  billingDay: number,
  monthIndex: number // 1-based month number within the term
): { period_start: string; period_end: string } {
  const base = new Date(startDate + 'T00:00:00');
  // target month = start_date month + (monthIndex - 1)
  const targetMonth = new Date(base.getFullYear(), base.getMonth() + monthIndex - 1, billingDay);
  const period_start = targetMonth.toISOString().slice(0, 10);

  // period_end = last day of the target month
  const period_end = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).toISOString().slice(0, 10);

  return { period_start, period_end };
}

/**
 * Create an invoice from an accepted source document.
 * Called only from the API route behind CEO_EMAIL check;
 * sales use document_approvals (not this function directly).
 */
export async function createInvoiceFromSource(
  sourceId: string,
  kind: InvoiceKind,
  _requestedBy: string
): Promise<{ id: string; doc_number: string }> {
  const supabase = adminClient();

  // 1. Validate source
  const { data: source, error: srcErr } = await supabase
    .from('documents')
    .select('*')
    .eq('id', sourceId)
    .single();

  if (srcErr || !source) throw new Error(`Source document not found: ${sourceId}`);
  if (source.status !== 'accepted') throw new Error(`Source must be accepted (got '${source.status}')`);

  const isRetainer = source.doc_type === 'retainer';

  // 2. Load existing invoices for this source (non-void only) to determine next sequence
  const { data: existingInvoices } = await supabase
    .from('documents')
    .select('id, invoice_kind, invoice_sequence, period_start, period_end')
    .eq('source_document_id', sourceId)
    .eq('doc_type', 'invoice')
    .neq('status', 'void');

  const existingKinds = new Set((existingInvoices ?? []).map((i: any) => i.invoice_kind));

  // 3. Kind rules
  if (kind === 'deposit') {
    if (existingKinds.has('deposit')) throw new Error('A deposit invoice already exists for this source');
  } else if (kind === 'final') {
    if (!existingKinds.has('deposit')) throw new Error('A deposit invoice must exist before creating a final invoice');
    if (existingKinds.has('final')) throw new Error('A final invoice already exists for this source');
  } else if (kind === 'full') {
    if (existingKinds.has('deposit')) throw new Error('A deposit already exists — use deposit + final instead');
    if (existingKinds.has('final')) throw new Error('A final already exists — cannot create a full invoice');
  } else if (kind === 'retainer_month') {
    if (!isRetainer) throw new Error('retainer_month kind is only valid for retainer documents');
    const usedSequences = (existingInvoices ?? [])
      .filter((i: any) => i.invoice_kind === 'retainer_month')
      .map((i: any) => i.invoice_sequence);
    const nextSeq = usedSequences.length === 0 ? 1 : Math.max(...usedSequences) + 1;
    if (nextSeq > (source.term_months ?? 0)) {
      throw new Error(`All ${source.term_months} retainer months have been invoiced`);
    }
  }

  // 4. Determine invoice_sequence for non-retainer_month kinds
  let invoiceSequence = 1;
  if (kind !== 'retainer_month') {
    const kindCount = (existingInvoices ?? []).filter((i: any) => i.invoice_kind === kind).length;
    invoiceSequence = kindCount + 1;
  }

  // 5. Compute amounts
  let amount: number;
  let periodStart: string | null = null;
  let periodEnd: string | null = null;

  if (kind === 'deposit') {
    amount = Math.round((source.total ?? 0) * 0.5 * 100) / 100;
  } else if (kind === 'final') {
    const deposit = (existingInvoices ?? [])
      .filter((i: any) => i.invoice_kind === 'deposit')
      .reduce((sum: number, i: any) => sum + (i.total ?? 0), 0);
    amount = Math.round(((source.total ?? 0) - deposit) * 100) / 100;
  } else if (kind === 'full') {
    amount = Math.round((source.total ?? 0) * 100) / 100;
  } else {
    // retainer_month
    amount = Math.round((source.monthly_amount ?? 0) * 100) / 100;
  }

  // Compute nextSeq after amount is set (needed for line item description)
  let nextSeq = 1;
  if (kind === 'retainer_month') {
    const usedSequences = (existingInvoices ?? [])
      .filter((i: any) => i.invoice_kind === 'retainer_month')
      .map((i: any) => i.invoice_sequence);
    nextSeq = usedSequences.length === 0 ? 1 : Math.max(...usedSequences) + 1;
    const { period_start, period_end } = computeRetainerPeriod(
      source.start_date ?? new Date().toISOString().slice(0, 10),
      source.billing_day ?? 1,
      nextSeq
    );
    periodStart = period_start;
    periodEnd = period_end;
  }

  // 6. Due date — invoices are due immediately upon issuance
  const issueDate = new Date().toISOString().slice(0, 10);
  const dueDate = issueDate;

  // 7. Get next doc_number via RPC
  const { data: docNumber, error: numErr } = await supabase.rpc('next_doc_number', {
    p_doc_type: 'invoice',
  }) as { data: string | null; error: any };

  if (numErr || !docNumber) throw new Error(`Failed to generate invoice number: ${numErr?.message ?? 'unknown'}`);

  // 8. Build line items — single line reflecting the invoice amount
  const lineItems = [{
    description: kind === 'deposit' ? 'Deposit (50% of contract value)'
      : kind === 'final' ? 'Final payment (remaining 50%)'
      : kind === 'full' ? 'Full payment'
      : `Retainer — ${MONTHS[new Date(periodStart + 'T00:00:00').getMonth()]} ${new Date(periodStart + 'T00:00:00').getFullYear()} (month ${nextSeq} of ${source.term_months})`,
    details: '',
    qty: 1,
    unit_price: amount,
    amount,
  }];

  // 9. Insert invoice
  const { data: invoice, error: insErr } = await supabase
    .from('documents')
    .insert({
      doc_type: 'invoice',
      doc_number: docNumber,
      status: 'draft',
      source_document_id: sourceId,
      invoice_kind: kind,
      invoice_sequence: kind === 'retainer_month'
        ? ((existingInvoices ?? []).filter((i: any) => i.invoice_kind === 'retainer_month').length + 1)
        : invoiceSequence,
      period_start: periodStart,
      period_end: periodEnd,
      due_date: dueDate,
      prospect_id: source.prospect_id,
      client_name: source.client_name,
      client_address: source.client_address,
      client_email: source.client_email,
      client_phone: source.client_phone,
      lpo_number: source.lpo_number ?? null,
      lpo_date: source.lpo_date ?? null,
      lpo_amount: source.lpo_amount ?? null,
      line_items: lineItems,
      subtotal: amount,
      discount_pct: 0,
      discount_amount: 0,
      total: amount,
      currency: source.currency ?? 'SAR',
      payment_terms: 'Payment upon invoice issuance.',
      notes: null,
      created_by: source.created_by,
    })
    .select('id, doc_number')
    .single();

  if (insErr || !invoice) throw new Error(`Invoice insert failed: ${insErr?.message ?? 'unknown'}`);

  return { id: invoice.id, doc_number: invoice.doc_number };
}
