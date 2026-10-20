// Phase 15/16 — Proposals, Retainers & Invoices shared types

export type DocType = 'quote' | 'proposal' | 'retainer' | 'invoice';
export type DocStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'superseded' | 'void' | 'paid' | 'overdue';
export type InvoiceKind = 'deposit' | 'final' | 'full' | 'retainer_month';

export interface LineItem {
  description: string;
  details: string;
  qty: number;
  unit_price: number;
  amount: number;
}

export interface Document {
  id: string;
  doc_number: string;
  doc_type: DocType;
  status: DocStatus;
  parent_id: string | null;
  client_name: string;
  client_address: string | null;
  client_email: string | null;
  client_phone: string | null;
  prospect_id: string | null;
  line_items: LineItem[];
  subtotal: number;
  discount_pct: number;
  discount_amount: number;
  total: number;
  currency: string;
  payment_terms: string;
  notes: string | null;
  share_token: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Phase 16 — retainer fields
  term_months?: number | null;
  monthly_amount?: number | null;
  start_date?: string | null;    // ISO date string
  billing_day?: number | null;
  // Phase 16 — invoice fields
  source_document_id?: string | null;
  invoice_kind?: InvoiceKind | null;
  invoice_sequence?: number | null;
  period_start?: string | null;
  period_end?: string | null;
  due_date?: string | null;
  paid_at?: string | null;
  payment_reference?: string | null;
  // Phase 16 — acceptance fields
  lpo_number?: string | null;
  lpo_date?: string | null;
  lpo_amount?: number | null;
  accepted_by_name?: string | null;
  accepted_by_title?: string | null;
  accepted_at?: string | null;
}

export interface DocumentApproval {
  id: string;
  document_id: string;
  requested_by: string;
  requested_at: string;
  decided_by: string | null;
  decided_at: string | null;
  decision: 'approved' | 'rejected' | null;
}

export interface DocumentAttachment {
  id: string;
  document_id: string;
  kind: 'signed_copy' | 'lpo';
  storage_path: string;
  filename: string;
  size_bytes: number;
  uploaded_by: string;
  created_at: string;
}

export interface RateCardEntry {
  id: string;
  service_key: string;
  name: string;
  category: 'media' | 'website';
  default_price: number;
  price_min: number;
  price_max: number;
  unit: string;
  default_scope: string;
  updated_at?: string;
}

// ---- Server-side helpers ---------------------------------------------

export function computeTotals(lineItems: LineItem[], discountPct: number) {
  const subtotal = lineItems.reduce((s, li) => s + li.amount, 0);
  const discountAmount = Math.round(subtotal * discountPct) / 100;
  const total = subtotal - discountAmount;
  return { subtotal, discountAmount, total };
}

export function makeLineItem(
  description = '',
  details = '',
  qty = 1,
  unitPrice = 0
): LineItem {
  return { description, details, qty, unit_price: unitPrice, amount: Math.round(qty * unitPrice * 100) / 100 };
}

/**
 * Compute the total contract value of a retainer.
 * monthly_amount × term_months.
 * Discount applies to the monthly fee (stored in discount_pct on the document).
 */
export function computeRetainerTotal(monthlyAmount: number, termMonths: number): number {
  return Math.round(monthlyAmount * termMonths * 100) / 100;
}

/**
 * Split a source total into deposit (50%) and final (50%), rounding
 * deposit to 2dp and letting final absorb any rounding cent so
 * deposit + final === source total exactly.
 */
export function splitInvoiceAmounts(total: number): { deposit: number; final: number } {
  const deposit = Math.round(total * 0.5 * 100) / 100;
  const final = Math.round((total - deposit) * 100) / 100;
  return { deposit, final };
}
