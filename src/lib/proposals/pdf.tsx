// Phase 15/16 — Proposal/Quote/Retainer/Invoice PDF renderer
import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Image, Link,
  Font,
} from '@react-pdf/renderer';
import { Document as Doc, LineItem } from './types';
import fs from 'fs';
import path from 'path';

Font.registerHyphenationCallback((word) => [word]);

Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'), fontWeight: 'normal', fontStyle: 'normal' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'), fontWeight: 'normal', fontStyle: 'italic' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'), fontWeight: 400, fontStyle: 'normal' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'), fontWeight: 400, fontStyle: 'italic' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Medium.ttf'), fontWeight: 500, fontStyle: 'normal' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Medium.ttf'), fontWeight: 500, fontStyle: 'italic' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'), fontWeight: 'bold', fontStyle: 'normal' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'), fontWeight: 'bold', fontStyle: 'italic' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'), fontWeight: 700, fontStyle: 'normal' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'), fontWeight: 700, fontStyle: 'italic' },
  ],
});

const COLORS = {
  gold: '#C9A84C',
  ink: '#1a1a2e',
  red: '#C0392B',
  muted: '#666666',
  line: '#dddddd',
  white: '#ffffff',
  paidGreen: '#27ae60',
};

const styles = StyleSheet.create({
  page: { fontFamily: 'Inter', fontSize: 10, color: COLORS.ink, padding: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  logoBox: { width: 160 },
  docTypeBadge: { textAlign: 'right' },
  docType: { fontSize: 22, fontWeight: 'bold', color: COLORS.ink },
  docNumber: { fontSize: 10, color: COLORS.muted, marginTop: 4 },
  docDate: { fontSize: 9, color: COLORS.muted, marginTop: 2 },

  divider: { borderBottom: `1 solid ${COLORS.gold}`, marginVertical: 16 },

  companyBlock: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  companyInfo: { fontSize: 8, color: COLORS.muted, lineHeight: 1.6 },
  companyName: { fontSize: 12, fontWeight: 'bold', color: COLORS.ink },

  twoCol: { flexDirection: 'row', gap: 20, marginBottom: 24 },
  col: { flex: 1 },
  colLabel: { fontSize: 8, color: COLORS.gold, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  colValue: { fontSize: 10, color: COLORS.ink, lineHeight: 1.5 },
  colValueMuted: { fontSize: 9, color: COLORS.muted },

  // Retainer summary box
  retainerSummary: { backgroundColor: '#f9f6f0', border: `1 solid ${COLORS.gold}`, padding: 12, marginBottom: 20 },
  retainerSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  retainerSummaryLabel: { fontSize: 9, color: COLORS.muted },
  retainerSummaryValue: { fontSize: 9, fontWeight: 'bold', color: COLORS.ink },
  retainerTotalLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.red },
  retainerTotalValue: { fontSize: 12, fontWeight: 'bold', color: COLORS.red },

  tableHeader: { flexDirection: 'row', backgroundColor: COLORS.ink, paddingVertical: 6, paddingHorizontal: 8 },
  tableHeaderText: { fontSize: 8, color: COLORS.white, fontWeight: 'bold', textTransform: 'uppercase' },
  thDesc: { flex: 3 },
  thDetail: { flex: 3 },
  thQty: { width: 40, textAlign: 'center' },
  thPrice: { width: 70, textAlign: 'right' },
  thAmount: { width: 80, textAlign: 'right' },

  tableRow: { flexDirection: 'row', borderBottom: `0.5 solid ${COLORS.line}`, paddingVertical: 7, paddingHorizontal: 8 },
  tdDesc: { flex: 3, fontSize: 9, fontWeight: 'bold', color: COLORS.ink },
  tdDetail: { flex: 3, fontSize: 8, color: COLORS.muted, marginTop: 2 },
  tdQty: { width: 40, textAlign: 'center', fontSize: 9 },
  tdPrice: { width: 70, textAlign: 'right', fontSize: 9 },
  tdAmount: { width: 80, textAlign: 'right', fontSize: 9 },

  totalsBlock: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, marginBottom: 24 },
  totalsBox: { width: 220 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  totalLabel: { fontSize: 9, color: COLORS.muted },
  totalValue: { fontSize: 9, color: COLORS.ink },
  totalDivider: { borderBottom: `1 solid ${COLORS.line}`, marginVertical: 4 },
  netPayableLabel: { fontSize: 13, fontWeight: 'bold', color: COLORS.red },
  netPayableValue: { fontSize: 13, fontWeight: 'bold', color: COLORS.red },
  discountRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  discountLabel: { fontSize: 9, color: COLORS.gold },
  discountValue: { fontSize: 9, color: COLORS.gold },

  revisionNote: { backgroundColor: '#fff8e1', borderLeft: `3 solid ${COLORS.gold}`, padding: 8, marginBottom: 16 },
  revisionText: { fontSize: 9, color: COLORS.ink, fontStyle: 'italic' },

  paymentBlock: { marginBottom: 20 },
  paymentLabel: { fontSize: 8, color: COLORS.gold, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  paymentText: { fontSize: 9, color: COLORS.ink },

  // CONFIRMATION block (quotes, proposals, retainers)
  confirmationBlock: { marginBottom: 20, padding: 14, border: `1 solid ${COLORS.gold}` },
  confirmationTitle: { fontSize: 10, fontWeight: 'bold', color: COLORS.gold, textTransform: 'uppercase', marginBottom: 8 },
  confirmationText: { fontSize: 9, color: COLORS.ink, lineHeight: 1.6, marginBottom: 12 },

  // Client acceptance box
  acceptanceBox: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  acceptanceLeft: { flex: 2, border: `1 solid ${COLORS.line}`, padding: 10 },
  acceptanceRight: { flex: 1, border: `1 solid ${COLORS.line}`, padding: 10, alignItems: 'center' },
  acceptanceLabel: { fontSize: 8, color: COLORS.gold, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  acceptanceRightLabel: { fontSize: 8, color: COLORS.gold, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8 },
  acceptanceLine: { borderBottom: `0.5 solid ${COLORS.line}`, marginBottom: 6, height: 33 },  // ≥25mm (25mm ≈ 28pt at 72dpi; 33pt gives clearance)
  acceptanceStampBox: { width: 114, height: 114, border: `1 solid ${COLORS.line}` },  // 40mm×40mm at 72dpi (1mm ≈ 2.834pt)
  acceptanceNameLine: { fontSize: 8, color: COLORS.muted, marginBottom: 2 },
  acceptanceTitleLine: { fontSize: 8, color: COLORS.muted, marginBottom: 2, marginTop: 4 },
  acceptanceSigLine: { fontSize: 8, color: COLORS.muted, marginBottom: 2, marginTop: 4 },
  acceptanceDateLabel: { fontSize: 8, color: COLORS.muted, marginTop: 2 },

  authorLine: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 4 },
  authorText: { fontSize: 8, color: COLORS.muted },

  // Invoice-specific
  invoiceSourceLine: { fontSize: 9, color: COLORS.muted, marginBottom: 4 },
  invoicePeriodLine: { fontSize: 9, color: COLORS.ink, fontStyle: 'italic', marginBottom: 8 },
  amountDueLabel: { fontSize: 13, fontWeight: 'bold', color: COLORS.red },
  amountDueValue: { fontSize: 13, fontWeight: 'bold', color: COLORS.red },
  paidStamp: { position: 'absolute', top: 60, right: 40, fontSize: 32, color: COLORS.paidGreen, fontWeight: 'bold', opacity: 0.7 },

  // Bank
  bankBlock: { backgroundColor: '#f5f5f5', padding: 12, marginBottom: 20 },
  bankLabel: { fontSize: 8, color: COLORS.gold, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 6 },
  bankRow: { flexDirection: 'row', marginBottom: 3 },
  bankKey: { fontSize: 8, color: COLORS.muted, width: 100 },
  bankVal: { fontSize: 8, color: COLORS.ink },

  // Footer
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerText: { fontSize: 7, color: COLORS.muted },
  footerTagline: { fontSize: 7, color: COLORS.gold, fontStyle: 'italic' },
  footerLink: { fontSize: 7, color: '#1a56db', textDecoration: 'none', textAlign: 'center' },
  footerPageNum: { fontSize: 7, color: COLORS.muted },
  footerContinuedWrap: { position: 'absolute', bottom: 46, left: 40, right: 40, alignItems: 'center' },
  footerContinued: { fontSize: 7, color: COLORS.muted, fontStyle: 'italic' },

  notesBlock: { marginBottom: 20, padding: 10, borderLeft: `3 solid ${COLORS.gold}` },
  notesLabel: { fontSize: 8, color: COLORS.gold, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  notesText: { fontSize: 9, color: COLORS.ink, lineHeight: 1.5 },
});

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

import { fmtDate } from '@/lib/format';

function getLogoDataUri(): string {
  const LOGO_PATH = path.join(process.cwd(), 'public', 'brand', 'premiera-live-gold.png');
  try {
    const buf = fs.readFileSync(LOGO_PATH);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return '/brand/premiera-live-gold.png';
  }
}

// Footer rendered on every page — placed as last child of <Page> so it overlays
// content on every page via the `fixed` prop. Uses Text render= callback to get
// live pageNumber/totalPages so "Continued on next page" only appears on non-last pages.
function PageFooter() {
  return (
    <>
      {/* "Continued on next page" — only shown on pages that are NOT the last page */}
      <Text
        render={({ pageNumber, totalPages }) =>
          pageNumber < totalPages
            ? <Text style={styles.footerContinued}>Continued on next page</Text>
            : null
        }
        style={styles.footerContinued}
        fixed
      />
      {/* Fixed footer — VAT line, website, page X of Y — appears on every page */}
      <View style={styles.footer} fixed>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={styles.footerText}>All prices are exclusive of VAT.</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Link src="https://premieralive.com" style={styles.footerLink}>premieralive.com</Link>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text
            render={({ pageNumber, totalPages }) =>
              <Text style={styles.footerPageNum}>Page {pageNumber} of {totalPages}</Text>
            }
          />
        </View>
      </View>
    </>
  );
}

function ordinal(n: number): string {
  if (n === 11 || n === 12 || n === 13) return 'th';
  const last = n % 10;
  if (last === 1) return 'st';
  if (last === 2) return 'nd';
  if (last === 3) return 'rd';
  return 'th';
}

interface Props { doc: Doc }

export function ProposalPDF({ doc }: Props) {
  const isInvoice = doc.doc_type === 'invoice';
  const isRetainer = doc.doc_type === 'retainer';
  const isQuoteOrProposal = doc.doc_type === 'quote' || doc.doc_type === 'proposal';
  const isPaid = doc.status === 'paid';

  // Retainer revision note (monthly_amount basis)
  const isDiscounted = doc.discount_pct > 0;
  const revisionNote = !isInvoice && isDiscounted
    ? `Revised offer — original retainer ${doc.parent_id ? '(ref)' : doc.doc_number} (SAR ${(doc.subtotal / (isRetainer && doc.term_months ? doc.term_months : 1)).toLocaleString('en-US', { minimumFractionDigits: 2 })}/month) discounted ${doc.discount_pct}%.`
    : null;

  const logoDataUri = getLogoDataUri();

  // Retainer total contract value — defined early so confirmationText can use it
  const contractValue = isRetainer && doc.monthly_amount && doc.term_months
    ? Math.round(doc.monthly_amount * doc.term_months * 100) / 100
    : doc.total;

  // Build confirmation terms text
  const docTypeSingular = isRetainer ? 'retainer agreement' : (isQuoteOrProposal ? (doc.doc_type as string) : 'document');
  const confirmationText = isRetainer
    ? `To confirm this retainer agreement, please return a signed and stamped copy together with a Local Purchase Order (LPO) issued to Premiera Live Company for the total contract value of SAR ${fmt(contractValue)}. Work commences upon receipt of the signed document, the LPO, and the first monthly payment. This retainer agreement is valid for 30 days from the date of issue; the term begins on the start date stated above.`
    : `To confirm this ${docTypeSingular}, please return a signed and stamped copy together with a Local Purchase Order (LPO) issued to Premiera Live Company for the total amount of SAR ${fmt(contractValue)}. Work commences upon receipt of the signed document, the LPO, and the deposit payment as per the payment terms above. This ${docTypeSingular} is valid for 30 days from the date of issue.`;

  // Retainer payment terms text
  const retainerPaymentText = `Monthly fee payable in advance on the ${doc.billing_day ?? 1}${ordinal(doc.billing_day ?? 1)} of each month for the term stated. First invoice issued upon confirmation.`;

  // Due date — invoices due immediately upon issuance
  const dueLabel = isInvoice ? 'Due: Upon issuance' : (doc.due_date ? `Due: ${fmtDate(doc.due_date)}` : null);

  // Period string for retainer_month invoices — shown once as "October 2026"
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const periodStr = (doc.period_start)
    ? `${MONTHS[new Date(doc.period_start + 'T00:00:00').getMonth()]} ${new Date(doc.period_start + 'T00:00:00').getFullYear()}`
    : null;

  // Source doc reference for invoices
  const sourceRefStr = isInvoice
    ? `Invoice for ${doc.doc_type === 'invoice' && doc.source_document_id ? 'source document' : ''}`
    : null;

  // LPO number for invoices
  const showLpo = isInvoice && doc.lpo_number;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* PAID stamp */}
        {isPaid && <Text style={styles.paidStamp}>PAID</Text>}

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Image src={logoDataUri} style={{ width: 180 }} />
          </View>
          <View style={styles.docTypeBadge}>
            <Text style={styles.docType}>
              {isInvoice ? 'INVOICE' : isRetainer ? 'RETAINER AGREEMENT' : doc.doc_type.toUpperCase()}
            </Text>
            <Text style={styles.docNumber}>{doc.doc_number}</Text>
            <Text style={styles.docDate}>{fmtDate(doc.created_at)}</Text>
            {dueLabel && (
              <Text style={[styles.docDate, { color: isInvoice ? COLORS.red : undefined, marginTop: 2 }]}>
                {dueLabel}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Company block */}
        <View style={styles.companyBlock}>
          <View>
            <Text style={styles.companyName}>Premiera Live Company</Text>
            <Text style={styles.companyInfo}>CR 7054807941</Text>
            <Text style={styles.companyInfo}>Spaces Ajdan Walk, Corniche 5</Text>
            <Text style={styles.companyInfo}>Al Khobar, Kingdom of Saudi Arabia</Text>
            <Text style={styles.companyInfo}>premieralive.com</Text>
          </View>
        </View>

        {/* Two-column: Client + Document info */}
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.colLabel}>Prepared For</Text>
            <Text style={styles.colValue}>{doc.client_name}</Text>
            {doc.client_address && <Text style={styles.colValueMuted}>{doc.client_address}</Text>}
            {doc.client_email && <Text style={styles.colValueMuted}>{doc.client_email}</Text>}
            {doc.client_phone && <Text style={styles.colValueMuted}>{doc.client_phone}</Text>}
          </View>
          <View style={styles.col}>
            <Text style={styles.colLabel}>Document Details</Text>
            <Text style={styles.colValue}>{doc.doc_number}</Text>
            <Text style={styles.colValueMuted}>Date: {fmtDate(doc.created_at)}</Text>
            {showLpo && (
              <Text style={[styles.colValueMuted, { color: COLORS.red, marginTop: 2 }]}>
                Your LPO No.: {doc.lpo_number}
              </Text>
            )}
            {isInvoice && doc.invoice_kind === 'retainer_month' && periodStr && (
              <Text style={[styles.colValueMuted, { marginTop: 2 }]}>{periodStr}</Text>
            )}
            {/* Retainer: term + billing info */}
            {isRetainer && doc.term_months && (
              <Text style={[styles.colValueMuted, { marginTop: 4 }]}>
                Term: {doc.term_months} months
              </Text>
            )}
            {isRetainer && doc.billing_day && (
              <Text style={styles.colValueMuted}>Billing: {doc.billing_day}{ordinal(doc.billing_day)} of month</Text>
            )}
            {isRetainer && doc.start_date && (
              <Text style={styles.colValueMuted}>Start: {fmtDate(doc.start_date)}</Text>
            )}
            {/* Revision note in doc details */}
            {revisionNote && (
              <Text style={[styles.revisionText, { marginTop: 6 }]}>{revisionNote}</Text>
            )}
          </View>
        </View>

        {/* Revision note block (for proposals/quotes) */}
        {revisionNote && (
          <View style={styles.revisionNote}>
            <Text style={styles.revisionText}>{revisionNote}</Text>
          </View>
        )}

        {/* Retainer summary box */}
        {isRetainer && doc.monthly_amount && doc.term_months && (
          <View style={styles.retainerSummary}>
            <View style={styles.retainerSummaryRow}>
              <Text style={styles.retainerSummaryLabel}>Monthly Fee</Text>
              <Text style={styles.retainerSummaryValue}>SAR {fmt(doc.monthly_amount)}</Text>
            </View>
            <View style={styles.retainerSummaryRow}>
              <Text style={styles.retainerSummaryLabel}>Term</Text>
              <Text style={styles.retainerSummaryValue}>{doc.term_months} months</Text>
            </View>
            <View style={styles.retainerSummaryRow}>
              <Text style={styles.retainerSummaryLabel}>Start Date</Text>
              <Text style={styles.retainerSummaryValue}>
                {doc.start_date ? fmtDate(doc.start_date) : '—'}
              </Text>
            </View>
            <View style={styles.retainerSummaryRow}>
              <Text style={styles.retainerSummaryLabel}>Billing Day</Text>
              <Text style={styles.retainerSummaryValue}>
                {doc.billing_day ?? 1}{ordinal(doc.billing_day ?? 1)} of each month
              </Text>
            </View>
            <View style={{ borderTop: `1 solid ${COLORS.line}`, marginTop: 8, paddingTop: 8 }}>
              <View style={styles.retainerSummaryRow}>
                <Text style={styles.retainerTotalLabel}>Total Contract Value</Text>
                <Text style={styles.retainerTotalValue}>SAR {fmt(contractValue)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Line items — hidden when retainer has no scope lines */}
        {!(isRetainer && (!doc.line_items || doc.line_items.length === 0)) && (
          <>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.thDesc]}>
                {isRetainer ? 'Monthly Scope' : 'Description'}
              </Text>
              {!isRetainer && (
                <>
                  <Text style={[styles.tableHeaderText, styles.thDetail]}>Details</Text>
                  <Text style={[styles.tableHeaderText, styles.thQty]}>Qty</Text>
                  <Text style={[styles.tableHeaderText, styles.thPrice]}>Unit Price</Text>
                  <Text style={[styles.tableHeaderText, styles.thAmount]}>Amount</Text>
                </>
              )}
              {isRetainer && (
                <Text style={[styles.tableHeaderText, styles.thDetail]}>Details</Text>
              )}
            </View>

            {doc.line_items.map((li: LineItem, i: number) => (
              <View key={i} style={styles.tableRow}>
                <Text style={[styles.tdDesc, styles.thDesc]}>{li.description}</Text>
                {!isRetainer && (
                  <>
                    <Text style={[styles.tdDetail, styles.thDetail]}>{li.details}</Text>
                    <Text style={[styles.tdQty, styles.thQty]}>{li.qty}</Text>
                    <Text style={[styles.tdPrice, styles.thPrice]}>SAR {fmt(li.unit_price)}</Text>
                    <Text style={[styles.tdAmount, styles.thAmount]}>SAR {fmt(li.amount)}</Text>
                  </>
                )}
                {isRetainer && (
                  <Text style={[styles.tdDetail, styles.thDetail]}>{li.details}</Text>
                )}
              </View>
            ))}
          </>
        )}

        {/* Totals — skip for retainers (Total Contract Value shown in summary box above) */}
        {!isRetainer && (
          <View style={styles.totalsBlock}>
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>SAR {fmt(doc.subtotal)}</Text>
              </View>
              {isDiscounted && !isInvoice && (
                <View style={styles.discountRow}>
                  <Text style={styles.discountLabel}>Discount ({doc.discount_pct}%)</Text>
                  <Text style={styles.discountValue}>SAR {fmt(doc.discount_amount)}</Text>
                </View>
              )}
              <View style={styles.totalDivider} />
              {isInvoice ? (
                <View style={styles.totalRow}>
                  <Text style={styles.amountDueLabel}>Amount Due</Text>
                  <Text style={styles.amountDueValue}>SAR {fmt(contractValue)}</Text>
                </View>
              ) : (
                <View style={styles.totalRow}>
                  <Text style={styles.netPayableLabel}>Net Payable</Text>
                  <Text style={styles.netPayableValue}>SAR {fmt(contractValue)}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Notes */}
        {doc.notes && (
          <View style={styles.notesBlock}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{doc.notes}</Text>
          </View>
        )}

        {/* Payment terms */}
        <View style={styles.paymentBlock}>
          <Text style={styles.paymentLabel}>Payment Terms</Text>
          <Text style={styles.paymentText}>
            {isRetainer ? retainerPaymentText : doc.payment_terms}
          </Text>
        </View>

        {/* CONFIRMATION block — quotes, proposals, retainers */}
        {(isQuoteOrProposal || isRetainer) && (
          <View style={styles.confirmationBlock} wrap={false}>
            <Text style={styles.confirmationTitle}>Confirmation</Text>
            <Text style={styles.confirmationText}>{confirmationText}</Text>

            {/* Client acceptance box */}
            <View style={styles.acceptanceBox}>
              <View style={styles.acceptanceLeft}>
                <Text style={styles.acceptanceLabel}>
                  Accepted on behalf of {doc.client_name}
                </Text>
                {/* Name — ruled line ≥25mm */}
                <Text style={styles.acceptanceNameLine}>Name</Text>
                <Text style={styles.acceptanceLine} />
                {/* Title — ruled line ≥25mm */}
                <Text style={styles.acceptanceTitleLine}>Title</Text>
                <Text style={styles.acceptanceLine} />
                {/* Signature — ruled line ≥25mm */}
                <Text style={styles.acceptanceSigLine}>Signature</Text>
                <Text style={styles.acceptanceLine} />
                {/* Date — no ruled line, smaller */}
                <Text style={styles.acceptanceDateLabel}>Date</Text>
              </View>
              <View style={styles.acceptanceRight}>
                <Text style={styles.acceptanceRightLabel}>Company Stamp</Text>
                <View style={styles.acceptanceStampBox} />
              </View>
            </View>

            {/* Authorised by Premiera Live */}
            <View style={styles.authorLine}>
              <Text style={styles.authorText}>
                Authorised by Premiera Live Company — Shareef Ali, CEO
              </Text>
            </View>
          </View>
        )}

        {/* Bank details */}
        <View style={styles.bankBlock}>
          <Text style={styles.bankLabel}>Bank Details</Text>
          <View style={styles.bankRow}>
            <Text style={styles.bankKey}>Bank</Text>
            <Text style={styles.bankVal}>Riyad Bank</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankKey}>Account Name</Text>
            <Text style={styles.bankVal}>PREMIERA LIVE COMPANY</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankKey}>Account No</Text>
            <Text style={styles.bankVal}>3214213839940</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankKey}>IBAN</Text>
            <Text style={styles.bankVal}>SA0820000003214213839940</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankKey}>SWIFT</Text>
            <Text style={styles.bankVal}>RIBLSARI</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankKey}>Currency</Text>
            <Text style={styles.bankVal}>SAR</Text>
          </View>
        </View>

        {/* Fixed footer on every page: VAT, website, page X of Y, continued */}
        <PageFooter />
      </Page>
    </Document>
  );
}
