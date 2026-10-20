// Phase 15/16 — Document View / Edit Page
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { Document, LineItem, DocumentAttachment } from "@/lib/proposals/types";
import { DocumentApproval } from "@/lib/proposals/types";
import { fmtDate } from "@/lib/format";
import {
  Download, Edit2, Save, X, AlertTriangle, CheckCircle, XCircle,
  Send, Copy, MessageCircle, Link2, MoreVertical, Upload, FileText,
  Clock, Check, Mail
} from "lucide-react";

function fmt(n: number) {
  return `SAR ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function msAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const d = Math.floor(diff / 86_400_000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(diff / 3_600_000);
  if (h > 0) return `${h}h ago`;
  return `${Math.floor(diff / 60_000)}m ago`;
}

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-gray-500", sent: "bg-blue-500", accepted: "bg-green-600",
  declined: "bg-red-500", superseded: "bg-gray-400", void: "bg-gray-800",
  paid: "bg-green-700", overdue: "bg-red-700",
};
const INVOICE_KIND_LABELS: Record<string, string> = {
  deposit: "Deposit", final: "Final", full: "Full", retainer_month: "Retainer Month",
};

export default function DocumentPage() {
  const { id } = useParams();
  const { profile } = useAuth();
  const router = useRouter();
  // isCeo is set from the server response to ensure CEO_EMAIL env var is used
  const [isCeo, setIsCeo] = useState(false);

  const [doc, setDoc] = useState<Document | null>(null);
  const [approvals, setApprovals] = useState<DocumentApproval[]>([]);
  const [attachments, setAttachments] = useState<DocumentAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [patching, setPatching] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Modals
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendForm, setSendForm] = useState({ to_email: "", subject: "", body_text: "" });
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState("");
  const [acceptForm, setAcceptForm] = useState({
    lpo_number: "", lpo_date: "", lpo_amount: "",
    accepted_by_name: "", accepted_by_title: "",
  });
  const [invoiceKind, setInvoiceKind] = useState<string>("deposit");
  const [uploadProgress, setUploadProgress] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  // Edit form state
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [discountPct, setDiscountPct] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("");
  const [notes, setNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // Retainer fields
  const [termMonths, setTermMonths] = useState(3);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [billingDay, setBillingDay] = useState(1);
  const [sourceDocNumber, setSourceDocNumber] = useState<string | null>(null);
  const [lpoUploaded, setLpoUploaded] = useState(false);

  async function load() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`/api/proposals/documents/${id}`, {
      headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
    });
    const data = await res.json();
    if (data.error) { setError(data.error); setLoading(false); return; }
    setDoc(data.row);
    setIsCeo(data.is_ceo ?? false);
    initForm(data.row);
    setLoading(false);

    const [apprRes, attRes] = await Promise.all([
      fetch("/api/proposals/approvals", {
        headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
      }),
      fetch(`/api/proposals/documents/${id}/attachments`, {
        headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
      }),
    ]);
    const apprData = await apprRes.json();
    const attData = await attRes.json();
    if (apprData.rows) {
      setApprovals(apprData.rows.filter((a: DocumentApproval) => a.document_id === id));
    }
    if (attData.rows) setAttachments(attData.rows);

    // Fetch source document's doc_number for the invoice source link
    if (data.row?.source_document_id) {
      const srcRes = await fetch(`/api/proposals/documents/${data.row.source_document_id}`, {
        headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
      });
      const srcData = await srcRes.json();
      if (srcData.row?.doc_number) setSourceDocNumber(srcData.row.doc_number);
    }
  }

  function initForm(d: Document) {
    setClientName(d.client_name);
    setClientAddress(d.client_address ?? "");
    setClientEmail(d.client_email ?? "");
    setClientPhone(d.client_phone ?? "");
    setLineItems(d.line_items);
    setDiscountPct(d.discount_pct);
    setPaymentTerms(d.payment_terms);
    setNotes(d.notes ?? "");
    setNewStatus(d.status);
    setTermMonths(d.term_months ?? 3);
    setMonthlyAmount(d.monthly_amount ?? 0);
    setStartDate(d.start_date ?? "");
    setBillingDay(d.billing_day ?? 1);
  }

  useEffect(() => { load(); }, [id]);

  function updateLine(i: number, field: keyof LineItem, value: string | number) {
    setLineItems((prev) => {
      const updated = [...prev];
      const li = { ...updated[i] };
      if (field === "qty" || field === "unit_price") {
        li[field] = Number(value);
        li.amount = Math.round(li.qty * li.unit_price * 100) / 100;
      } else { (li as any)[field] = value; }
      updated[i] = li;
      return updated;
    });
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const payload: Record<string, unknown> = {
        client_name: clientName, client_address: clientAddress,
        client_email: clientEmail, client_phone: clientPhone,
        line_items: lineItems, discount_pct: discountPct,
        payment_terms: paymentTerms, notes: notes || null,
        status: newStatus,
      };
      if (doc?.doc_type === "retainer") {
        payload.term_months = termMonths;
        payload.monthly_amount = monthlyAmount;
        payload.start_date = startDate;
        payload.billing_day = billingDay;
      }
      const res = await fetch(`/api/proposals/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed"); return; }
      setEditing(false);
      if (data.revision) { router.push(`/proposals/${data.row.id}`); }
      else { load(); }
    } finally { setSaving(false); }
  }

  async function handleAccept() {
    setPatching(true);
    setError("");
    try {
      // For quotes/proposals/retainers (not invoices), an LPO attachment is required
      if (!isInvoice && !attachments.some(a => a.kind === "lpo")) {
        setError("An LPO attachment is required before accepting this document.");
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`/api/proposals/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({
          _action: "accept",
          lpo_number: acceptForm.lpo_number || null,
          lpo_date: acceptForm.lpo_date || null,
          lpo_amount: acceptForm.lpo_amount ? Number(acceptForm.lpo_amount) : null,
          accepted_by_name: acceptForm.accepted_by_name || null,
          accepted_by_title: acceptForm.accepted_by_title || null,
          accepted_at: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Accept failed"); return; }
      setShowAcceptModal(false);
      load();
    } finally { setPatching(false); }
  }

  async function handleGenerateInvoice() {
    setInvoiceLoading(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`/api/proposals/documents/${id}/invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({ kind: invoiceKind }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Invoice creation failed"); return; }
      setShowInvoiceModal(false);
      if (data.invoice) router.push(`/proposals/${(data.invoice as { id: string }).id}`);
      else load();
    } finally { setInvoiceLoading(false); }
  }

  async function handleSendEmail() {
    setSendLoading(true);
    setSendError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/proposals/documents/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({
          document_id: id,
          to_email: sendForm.to_email || doc.client_email,
          subject: sendForm.subject || null,
          body_text: sendForm.body_text || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setSendError(data.error ?? "Send failed"); return; }
      setShowSendModal(false);
      load();
    } finally { setSendLoading(false); }
  }

  async function handleMarkPaid() {
    setPatching(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`/api/proposals/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({ _action: "mark_paid" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Update failed"); return; }
      load();
    } finally { setPatching(false); }
  }

  async function handleDecline() {
    setPatching(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`/api/proposals/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({ _action: "decline" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Decline failed"); return; }
      load();
    } finally { setPatching(false); }
  }

  async function handleVoid() {
    setPatching(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`/api/proposals/documents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({ _action: "void" }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Void failed"); return; }
      load();
    } finally { setPatching(false); }
  }

  async function handleAttachmentUpload(file: File, kind: "signed_copy" | "lpo") {
    setUploadProgress(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? "";

      // Step 1: Get presigned PUT URL from new dedicated route
      const presignRes = await fetch(`/api/attachments/${id}/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          kind,
        }),
      });
      const presignData = await presignRes.json();
      if (!presignRes.ok) { setError(presignData.error ?? "Presign failed"); return; }

      // Step 2: Upload file directly to S3 via presigned URL
      const uploadRes = await fetch(presignData.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!uploadRes.ok && uploadRes.status !== 200 && uploadRes.status !== 204) {
        setError(`S3 upload failed (${uploadRes.status})`);
        return;
      }

      // Step 3: Confirm upload and create DB record
      const confirmRes = await fetch(`/api/attachments/${id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          key: presignData.key,
          filename: file.name,
          sizeBytes: file.size,
          contentType: file.type,
          kind,
        }),
      });
      const confirmData = await confirmRes.json();
      if (!confirmRes.ok) { setError(confirmData.error ?? "Confirm failed"); return; }
      setAttachments((prev) => [...prev, confirmData.row]);
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
    } finally { setUploadProgress(false); }
  }

  async function handleAttachmentDownload(att: DocumentAttachment) {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`/api/proposals/documents/${id}/attachments/${att.id}/download`, {
      headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
    });
    const data = await res.json();
    if (!res.ok || !data.url) { setError("Download URL generation failed"); return; }
    window.open(data.url, "_blank");
  }

  async function handleSharePdf() {
    setShowMenu(false);
    if (!doc) return;
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`/api/proposals/documents/${doc.id}/pdf`, {
      headers: { Authorization: `Bearer ${session?.access_token ?? ''}` },
    });
    if (!res.ok) {
      const body = await res.text();
      window.alert(`PDF failed (${res.status}): ${body}`); return;
    }
    const blob = await res.blob();
    const phoneDigits = (doc.client_phone ?? '').replace(/\D/g, '');
    const docLabel = doc.doc_type === 'invoice' ? 'Invoice' : doc.doc_type === 'quote' ? 'Quote' : doc.doc_type === 'retainer' ? 'Retainer' : 'Proposal';
    const slug = doc.client_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const filename = `${doc.doc_number}-${slug}.pdf`;
    const file = new File([blob], filename, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: `${docLabel} ${doc.doc_number} — Premiera Live`, text: `Dear ${doc.client_name}, please find our ${docLabel} ${doc.doc_number} from Premiera Live.` }); return; }
      catch (err: any) { if (err.name === 'AbortError') return; }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
    const msg = `Dear ${doc.client_name}, please find our ${docLabel} ${doc.doc_number} from Premiera Live.`;
    const waUrl = phoneDigits.length >= 10 ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    window.alert('PDF downloaded — attach it in the WhatsApp chat that just opened.');
  }

  async function handleDuplicate() {
    if (!doc) return;
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/proposals/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
      body: JSON.stringify({
        doc_type: doc.doc_type === "invoice" ? "proposal" : doc.doc_type,
        client_name: doc.client_name, client_address: doc.client_address,
        client_email: doc.client_email, client_phone: doc.client_phone,
        line_items: doc.line_items, discount_pct: 0,
        payment_terms: doc.payment_terms, notes: doc.notes, status: "draft",
      }),
    });
    const data = await res.json();
    if (res.ok) router.push(`/proposals/${data.row.id}`);
  }

  if (loading) return <div className="text-center py-16 text-muted">Loading…</div>;
  if (error && !doc) return <div className="text-red-400 py-16 text-center">{error}</div>;
  if (!doc) return null;

  const isDraft = doc.status === "draft";
  const canEdit = isDraft && editing;
  const isAccepted = doc.status === "accepted";
  const isInvoice = doc.doc_type === "invoice";
  const isRetainer = doc.doc_type === "retainer";
  const isQuoteOrProposal = doc.doc_type === "quote" || doc.doc_type === "proposal";
  const isSent = doc.status === "sent";
  const canMarkPaid = isCeo && isInvoice && ["sent", "overdue"].includes(doc.status);
  const canAccept = isCeo && (isQuoteOrProposal || isRetainer) && isSent;
  const canDecline = isCeo && (isQuoteOrProposal || isRetainer) && isSent;
  const canVoid = isCeo && ["sent", "accepted", "draft"].includes(doc.status);
  const canGenerateInvoice = isCeo && isAccepted;
  const subtotal = lineItems.reduce((s, li) => s + li.amount, 0);
  const discountAmount = Math.round(subtotal * discountPct) / 100;
  // For retainers read stored total; for others recompute from line items
  const total = isRetainer ? doc.total : (subtotal - discountAmount);
  // Retainer contract value = monthly_amount × term_months (used for LPO comparison)
  const contractValue = isRetainer && doc.monthly_amount && doc.term_months
    ? Math.round(doc.monthly_amount * doc.term_months * 100) / 100
    : total;
  const hasPendingApproval = approvals.some(a => !a.decision);

  // Invoice modal options — proposal/quote → Deposit/Final/Full; retainer → Next Monthly Invoice
  const invoiceOptions: { value: string; label: string; disabled: boolean; reason?: string }[] = [];
  if (isRetainer) {
    invoiceOptions.push({ value: "retainer_month", label: "Next Monthly Invoice", disabled: false });
  } else {
    invoiceOptions.push({ value: "deposit", label: "Deposit (50%)", disabled: false });
    invoiceOptions.push({ value: "final", label: "Final (50%)", disabled: false });
    invoiceOptions.push({ value: "full", label: "Full (100%)", disabled: false });
  }

  return (
    <div className="max-w-4xl">
      {error && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>}

      {/* ACCEPT MODAL */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Accept Document</h2>
            <div className="space-y-3">
              <div>
                <label className="label"><span className="label-text text-xs text-muted">LPO Number (optional)</span></label>
                <input className="input input-sm w-full" value={acceptForm.lpo_number} onChange={e => setAcceptForm(f => ({ ...f, lpo_number: e.target.value }))} placeholder="LPO-XXXXX" />
              </div>
              <div>
                <label className="label"><span className="label-text text-xs text-muted">LPO Date (optional)</span></label>
                <input className="input input-sm w-full" type="date" value={acceptForm.lpo_date} onChange={e => setAcceptForm(f => ({ ...f, lpo_date: e.target.value }))} />
              </div>
              <div>
                <label className="label"><span className="label-text text-xs text-muted">LPO Amount SAR (optional)</span></label>
                <input className="input input-sm w-full" type="number" value={acceptForm.lpo_amount} onChange={e => setAcceptForm(f => ({ ...f, lpo_amount: e.target.value }))} placeholder="Leave blank if matches total" />
              </div>
              <div>
                <label className="label"><span className="label-text text-xs text-muted">Accepted By (name)</span></label>
                <input className="input input-sm w-full" value={acceptForm.accepted_by_name} onChange={e => setAcceptForm(f => ({ ...f, accepted_by_name: e.target.value }))} />
              </div>
              <div>
                <label className="label"><span className="label-text text-xs text-muted">Accepted By (title)</span></label>
                <input className="input input-sm w-full" value={acceptForm.accepted_by_title} onChange={e => setAcceptForm(f => ({ ...f, accepted_by_title: e.target.value }))} />
              </div>
              {/* LPO file upload — required before Accept for retainer/proposal/quote */}
              {!isInvoice && (
                <div className="border border-neutral-700 rounded-lg p-3 space-y-2">
                  <div className="text-xs text-muted">LPO Attachment (required)</div>
                  {attachments.some(a => a.kind === 'lpo') ? (
                    <div className="flex items-center gap-2 text-green-400 text-xs">
                      <span>✓ LPO uploaded</span>
                      <span className="text-muted">— {attachments.find(a => a.kind === 'lpo')?.filename}</span>
                    </div>
                  ) : (
                    <>
                      <label className="btn btn-outline btn-xs cursor-pointer w-full justify-start">
                        <Upload className="w-3 h-3 mr-1" />Choose LPO file
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                          onChange={async e => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const origErr = error;
                            setError('');
                            try {
                              await handleAttachmentUpload(f, 'lpo');
                            } catch {}
                            if (error) setError(origErr);
                            e.target.value = '';
                          }} />
                      </label>
                      {uploadProgress && <div className="text-xs text-muted animate-pulse">Uploading…</div>}
                    </>
                  )}
                </div>
              )}
              {acceptForm.lpo_amount && Number(acceptForm.lpo_amount) !== contractValue && (
                <div className="bg-amber-900/30 border border-amber-600 text-amber-300 rounded-lg px-3 py-2 text-sm">
                  LPO amount differs from contract value ({fmt(contractValue)})
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAcceptModal(false)} className="btn btn-ghost flex-1">Cancel</button>
              <button onClick={handleAccept} disabled={patching || (!isInvoice && !attachments.some(a => a.kind === 'lpo'))} className="btn btn-gold flex-1">{patching ? "Saving…" : "Accept"}</button>
            </div>
          </div>
        </div>
      )}

      {/* SEND VIA EMAIL MODAL */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Send via Email</h2>
            {sendError && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-3 py-2 mb-3 text-sm">{sendError}</div>}
            <div className="space-y-3">
              <div>
                <label className="label"><span className="label-text text-xs text-muted">To Email</span></label>
                <input className="input input-sm w-full" type="email" value={sendForm.to_email} onChange={e => setSendForm(f => ({ ...f, to_email: e.target.value }))} placeholder={doc.client_email ?? "client@example.com"} />
              </div>
              <div>
                <label className="label"><span className="label-text text-xs text-muted">Subject (optional)</span></label>
                <input className="input input-sm w-full" value={sendForm.subject} onChange={e => setSendForm(f => ({ ...f, subject: e.target.value }))} placeholder="Leave blank for default" />
              </div>
              <div>
                <label className="label"><span className="label-text text-xs text-muted">Message (optional)</span></label>
                <textarea className="textarea textarea-sm w-full h-24" value={sendForm.body_text} onChange={e => setSendForm(f => ({ ...f, body_text: e.target.value }))} placeholder="Leave blank for default message. The PDF will be attached automatically." />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowSendModal(false)} className="btn btn-ghost flex-1">Cancel</button>
              <button onClick={handleSendEmail} disabled={sendLoading} className="btn btn-gold flex-1">{sendLoading ? "Sending…" : "Send Email"}</button>
            </div>
          </div>
        </div>
      )}

      {/* INVOICE GENERATION MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Generate Invoice</h2>
            <div className="space-y-2 mb-4">
              {invoiceOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => !opt.disabled && setInvoiceKind(opt.value)}
                  disabled={opt.disabled}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition ${invoiceKind === opt.value ? "border-gold bg-gold/10 text-gold" : "border-line text-muted hover:border-gold"} ${opt.disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <span className="font-medium">{opt.label}</span>
                  {opt.reason && <span className="block text-xs mt-0.5 text-muted">{opt.reason}</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowInvoiceModal(false)} className="btn btn-ghost flex-1">Cancel</button>
              <button onClick={handleGenerateInvoice} disabled={invoiceLoading} className="btn btn-gold flex-1">{invoiceLoading ? "Creating…" : "Create Invoice"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold font-mono">{doc.doc_number}</h1>
            <span className={`text-xs text-white rounded px-2 py-0.5 ${STATUS_COLORS[doc.status]}`}>{doc.status}</span>
            {isInvoice && doc.invoice_kind && (
              <span className="text-xs bg-blue-900 text-blue-300 rounded px-2 py-0.5">{INVOICE_KIND_LABELS[doc.invoice_kind]}</span>
            )}
            {doc.discount_pct > 0 && !isInvoice && (
              <span className="text-xs bg-amber-200 text-amber-800 rounded px-1.5 py-0.5 font-medium">{doc.discount_pct}% off</span>
            )}
          </div>
          <p className="text-muted text-sm">
            {doc.doc_type} · {fmtDate(doc.created_at)} · by {doc.created_by}
          </p>
          {doc.parent_id && <p className="text-xs text-muted mt-1">Revised from parent document</p>}
          {isInvoice && <p className="text-xs text-muted mt-1">Due: Upon issuance</p>}
          {isRetainer && doc.term_months && <p className="text-xs text-muted mt-1">Term: {doc.term_months} months · SAR {doc.monthly_amount?.toLocaleString()} / month</p>}
          {!isRetainer && !isInvoice && doc.lpo_number && (
            <p className="text-xs text-gold mt-1">LPO: {doc.lpo_number} · {doc.lpo_date ? fmtDate(doc.lpo_date) : ""}</p>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`/api/proposals/documents/${id}/pdf`, {
              headers: { Authorization: `Bearer ${session?.access_token ?? ''}` },
            });
            if (res.ok) {
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const slug = doc.client_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const a = document.createElement('a'); a.href = url; a.download = `${doc.doc_number}-${slug}.pdf`; a.click();
              URL.revokeObjectURL(url);
            } else {
              const body = await res.text();
              window.alert(`PDF failed (${res.status}): ${body}`);
            }
          }} className="btn btn-ghost btn-sm flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> PDF</button>
          {doc.share_token && (
            <>
              <button onClick={handleSharePdf} className="btn btn-ghost btn-sm flex items-center gap-1.5" title="Share PDF via WhatsApp">
                <MessageCircle className="w-3.5 h-3.5" /> Share PDF
              </button>
              <div className="relative">
                <button onClick={() => setShowMenu(v => !v)} className="btn btn-ghost btn-sm"><MoreVertical className="w-3.5 h-3.5" /></button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl z-50">
                    <button onClick={() => { setShowMenu(false); navigator.clipboard.writeText(`${window.location.origin}/api/public/proposals/${doc.share_token}/pdf`).catch(() => {}); }} className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 rounded-t-lg flex items-center gap-2">
                      <Link2 className="w-3.5 h-3.5" /> Copy Public Link
                    </button>
                    {!isInvoice && (
                      <button onClick={() => { setShowMenu(false); handleDuplicate(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 rounded-b-lg flex items-center gap-2">
                        <Copy className="w-3.5 h-3.5" /> Duplicate
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
          {isDraft && !editing && (
            <button onClick={() => setEditing(true)} className="btn btn-ghost btn-sm flex items-center gap-1.5">
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          )}
          {editing && (
            <>
              <button onClick={handleSave} disabled={saving} className="btn btn-gold btn-sm flex items-center gap-1.5">
                <Save className="w-3.5 h-3.5" /> {saving ? "Saving…" : "Save"}
              </button>
              <button onClick={() => { setEditing(false); initForm(doc); }} className="btn btn-ghost btn-sm flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </>
          )}

        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: document content */}
        <div className="col-span-2 space-y-4">

          {/* Retainer summary */}
          {isRetainer && (
            <div className="panel border-gold/30">
              <h2 className="text-sm font-semibold text-gold mb-3">Retainer Terms</h2>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-xs text-muted">Monthly Fee</div>
                  <div className="font-mono font-medium">{fmt(doc.monthly_amount ?? 0)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Term</div>
                  <div className="font-medium">{doc.term_months} months</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Start Date</div>
                  <div className="font-medium">{doc.start_date ? fmtDate(doc.start_date) : "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Billing Day</div>
                  <div className="font-medium">{doc.billing_day}{["","st","nd","rd","th"][(doc.billing_day ?? 1) % 10] || "th"} of month</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-line">
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Total Contract Value</span>
                  <span className="font-bold text-red-400 font-mono">{fmt((doc.monthly_amount ?? 0) * (doc.term_months ?? 1))}</span>
                </div>
              </div>
            </div>
          )}

          {/* Invoice source info */}
          {isInvoice && doc.source_document_id && (
            <div className="panel border-blue-800 bg-blue-950/20">
              <div className="text-xs text-muted mb-1">Source Document</div>
              <div className="flex items-center gap-2">
                <a href={`/proposals/${doc.source_document_id}`} className="text-sm font-medium text-blue-400 hover:underline">{sourceDocNumber ?? 'Loading…'}</a>
                {doc.invoice_kind === 'retainer_month' && doc.period_start && (
                  <span className="text-xs text-muted">— Retainer month {fmtDate(doc.period_start)}</span>
                )}
              </div>
            </div>
          )}

          {/* Client block */}
          <div className="panel">
            <h2 className="text-sm font-semibold text-gold mb-2">Prepared For</h2>
            {canEdit ? (
              <div className="grid grid-cols-2 gap-3">
                <input className="input input-xs" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name" />
                <input className="input input-xs" value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="Email" />
                <input className="input input-xs" value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="Phone" />
                <input className="input input-xs col-span-2" value={clientAddress} onChange={e => setClientAddress(e.target.value)} placeholder="Address" />
              </div>
            ) : (
              <div>
                <div className="font-semibold">{doc.client_name}</div>
                {doc.client_email && <div className="text-muted text-sm">{doc.client_email}</div>}
                {doc.client_phone && <div className="text-muted text-sm">{doc.client_phone}</div>}
                {doc.client_address && <div className="text-muted text-sm">{doc.client_address}</div>}
              </div>
            )}
          </div>

          {/* Line items */}
          <div className="panel">
            <h2 className="text-sm font-semibold text-gold mb-3">
              {isRetainer ? "Monthly Scope" : isInvoice ? "Invoice Items" : "Line Items"}
            </h2>
            {canEdit ? (
              <div className="space-y-2">
                {lineItems.map((li, i) => (
                  <div key={i} className="grid grid-cols-12 gap-1 items-start border-b border-line/50 pb-2">
                    <input className="input input-xs col-span-4" value={li.description} onChange={e => updateLine(i, "description", e.target.value)} />
                    <input className="input input-xs col-span-5" value={li.details} onChange={e => updateLine(i, "details", e.target.value)} placeholder="detail" />
                    <input className="input input-xs col-span-1 text-center" type="number" min="1" value={li.qty} onChange={e => updateLine(i, "qty", e.target.value)} />
                    <input className="input input-xs col-span-2 text-right" type="number" step="0.01" value={li.unit_price} onChange={e => updateLine(i, "unit_price", e.target.value)} />
                    <div className="col-span-2 text-right font-mono text-xs pt-1">{fmt(li.amount)}</div>
                  </div>
                ))}
                {!isRetainer && <button onClick={() => setLineItems(p => [...p, { description: "", details: "", qty: 1, unit_price: 0, amount: 0 }])} className="text-xs text-gold hover:underline">+ Add Line</button>}
              </div>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left py-1.5 text-muted font-medium">Description</th>
                    <th className="text-left py-1.5 text-muted font-medium">Detail</th>
                    <th className="text-center py-1.5 text-muted font-medium w-10">Qty</th>
                    <th className="text-right py-1.5 text-muted font-medium w-20">Unit Price</th>
                    <th className="text-right py-1.5 text-muted font-medium w-20">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {doc.line_items.map((li: LineItem, i: number) => (
                    <tr key={i} className="border-b border-line/50">
                      <td className="py-1.5 font-medium">{li.description}</td>
                      <td className="py-1.5 text-muted">{li.details}</td>
                      <td className="py-1.5 text-center">{li.qty}</td>
                      <td className="py-1.5 text-right font-mono">{fmt(li.unit_price)}</td>
                      <td className="py-1.5 text-right font-mono font-medium">{fmt(li.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-4 flex justify-end">
              <div className="w-56 space-y-1">
                <div className="flex justify-between text-xs text-muted"><span>Subtotal</span><span className="font-mono">{fmt(canEdit ? subtotal : doc.subtotal)}</span></div>
                {(canEdit ? discountPct : doc.discount_pct) > 0 && !isInvoice && (
                  <div className="flex justify-between text-xs text-amber-400"><span>Discount ({(canEdit ? discountPct : doc.discount_pct)}%)</span><span className="font-mono">-{fmt(canEdit ? discountAmount : doc.discount_amount)}</span></div>
                )}
                <div className="flex justify-between font-bold text-base border-t border-line pt-1" style={{ color: "#C0392B" }}>
                  <span>{isInvoice ? "Amount Due" : isRetainer ? "Total Contract Value" : "Net Payable"}</span>
                  <span className="font-mono">{fmt(canEdit ? total : doc.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment terms + notes */}
          <div className="panel">
            <h2 className="text-sm font-semibold text-gold mb-2">Payment & Notes</h2>
            {canEdit ? (
              <div className="space-y-2">
                <div><div className="text-xs text-muted mb-1">Payment Terms</div><textarea className="textarea textarea-xs w-full" rows={2} value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} /></div>
                <div><div className="text-xs text-muted mb-1">Notes</div><textarea className="textarea textarea-xs w-full" rows={2} value={notes} onChange={e => setNotes(e.target.value)} /></div>
              </div>
            ) : (
              <div>
                <div className="mb-2"><div className="text-xs text-gold mb-1">Payment Terms</div><p className="text-sm">{doc.payment_terms}</p></div>
                {doc.notes && <div><div className="text-xs text-gold mb-1">Notes</div><p className="text-sm">{doc.notes}</p></div>}
              </div>
            )}
          </div>

          {/* Attachments */}
          {(isAccepted || isInvoice) && (
            <div className="panel">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gold">Attachments</h2>
                {!uploadProgress && (
                  <div className="flex gap-2">
                    <label className="btn btn-ghost btn-xs cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Signed Copy
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleAttachmentUpload(f, "signed_copy"); e.target.value = ""; }} />
                    </label>
                    <label className="btn btn-ghost btn-xs cursor-pointer flex items-center gap-1">
                      <Upload className="w-3 h-3" /> LPO
                      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleAttachmentUpload(f, "lpo"); e.target.value = ""; }} />
                    </label>
                  </div>
                )}
                {uploadProgress && <span className="text-xs text-muted animate-pulse">Uploading…</span>}
              </div>
              {attachments.length === 0 ? (
                <p className="text-sm text-muted">No attachments yet.</p>
              ) : (
                <div className="space-y-2">
                  {attachments.map(att => (
                    <div key={att.id} className="flex items-center justify-between bg-panel2 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted" />
                        <div>
                          <div className="text-sm font-medium">{att.filename}</div>
                          <div className="text-xs text-muted">{att.kind.replace("_", " ")} · {att.size_bytes ? `${(att.size_bytes / 1024).toFixed(0)} KB` : ""}{att.created_at ? ` · ${fmtDate(att.created_at)}` : ""}</div>
                        </div>
                      </div>
                      <button onClick={() => handleAttachmentDownload(att)} className="btn btn-ghost btn-xs flex items-center gap-1">
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: actions + approvals + acceptance info */}
        <div className="space-y-4">
          {/* Acceptance info */}
          {isAccepted && (
            <div className="panel border-green-800 bg-green-950/20">
              <h2 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Accepted
              </h2>
              <div className="text-xs text-muted space-y-1">
                {doc.accepted_by_name && <div>By: {doc.accepted_by_name}{doc.accepted_by_title ? ` (${doc.accepted_by_title})` : ""}</div>}
                {doc.accepted_at && <div>On: {fmtDate(doc.accepted_at)}</div>}
                {doc.lpo_number && <div className="text-gold mt-1">LPO: {doc.lpo_number}{doc.lpo_date ? ` · ${fmtDate(doc.lpo_date)}` : ""}</div>}
                {doc.lpo_amount && doc.lpo_amount !== doc.total && (
                  <div className="text-amber-400">LPO amount: SAR {doc.lpo_amount.toLocaleString()} (differs from total)</div>
                )}
                {isInvoice && doc.lpo_number && (
                  <div className="text-xs text-muted mt-1">Invoice references LPO {doc.lpo_number}</div>
                )}
                {!isInvoice && !doc.lpo_number && (
                  <div className="text-xs text-amber-500 mt-1">No LPO recorded — corporate clients may reject this invoice.</div>
                )}
              </div>
            </div>
          )}

          {/* Actions panel */}
          <div className="panel">
            <h2 className="text-sm font-semibold text-gold mb-3">Actions</h2>
            <div className="space-y-2">
              {/* Invoice draft → Send */}
              {!canEdit && isDraft && isInvoice && (
                <button onClick={async () => {
                  const { data: { session } } = await supabase.auth.getSession();
                  await fetch(`/api/proposals/documents/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                    body: JSON.stringify({ status: "sent" }),
                  });
                  load();
                }} className="btn btn-gold w-full text-sm flex items-center gap-2 justify-center">
                  <Send className="w-3.5 h-3.5" /> Mark Sent
                </button>
              )}

              {/* Invoice draft → Void (CEO only) */}
              {isCeo && isDraft && isInvoice && (
                <button onClick={async () => {
                  const { data: { session } } = await supabase.auth.getSession();
                  await fetch(`/api/proposals/documents/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                    body: JSON.stringify({ _action: "void" }),
                  });
                  load();
                }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-gray-600 text-white hover:bg-gray-700">
                  <AlertTriangle className="w-3.5 h-3.5" /> Void
                </button>
              )}

              {/* Non-invoice draft → Send */}
              {!canEdit && isDraft && !isInvoice && (
                <button onClick={async () => {
                  const { data: { session } } = await supabase.auth.getSession();
                  await fetch(`/api/proposals/documents/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                    body: JSON.stringify({ status: "sent" }),
                  });
                  load();
                }} className="btn btn-gold w-full text-sm flex items-center gap-2 justify-center">
                  <Send className="w-3.5 h-3.5" /> Mark Sent
                </button>
              )}

              {/* Send via Email */}
              {!isInvoice && (
                <button onClick={() => setShowSendModal(true)} className="btn btn-gold w-full text-sm flex items-center gap-2 justify-center">
                  <Mail className="w-3.5 h-3.5" /> Send via Email
                </button>
              )}

              {/* Sent → Accept / Decline / Void (CEO only) */}
              {isCeo && isSent && (isQuoteOrProposal || isRetainer) && (
                <>
                  <button onClick={() => setShowAcceptModal(true)} className="btn w-full text-sm flex items-center gap-2 justify-center bg-green-600 text-white hover:bg-green-700">
                    <CheckCircle className="w-3.5 h-3.5" /> Accept
                  </button>
                  <button onClick={async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    await fetch(`/api/proposals/documents/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                      body: JSON.stringify({ _action: "decline" }),
                    });
                    load();
                  }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-red-600 text-white hover:bg-red-700">
                    <XCircle className="w-3.5 h-3.5" /> Decline
                  </button>
                  <button onClick={async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    await fetch(`/api/proposals/documents/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                      body: JSON.stringify({ _action: "void" }),
                    });
                    load();
                  }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-gray-600 text-white hover:bg-gray-700">
                    <AlertTriangle className="w-3.5 h-3.5" /> Void
                  </button>
                </>
              )}

              {/* Sent invoice → Void (CEO only) */}
              {isCeo && isSent && isInvoice && (
                <button onClick={async () => {
                  const { data: { session } } = await supabase.auth.getSession();
                  await fetch(`/api/proposals/documents/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                    body: JSON.stringify({ _action: "void" }),
                  });
                  load();
                }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-gray-600 text-white hover:bg-gray-700">
                  <AlertTriangle className="w-3.5 h-3.5" /> Void
                </button>
              )}

              {/* Accepted proposal → Generate Deposit Invoice / Void (CEO only) */}
              {isCeo && isAccepted && isQuoteOrProposal && (
                <>
                  <button onClick={() => { setInvoiceKind("deposit"); setShowInvoiceModal(true); }} className="btn btn-gold w-full text-sm flex items-center gap-2 justify-center">
                    <FileText className="w-3.5 h-3.5" /> Generate Deposit Invoice
                  </button>
                  <button onClick={async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    await fetch(`/api/proposals/documents/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                      body: JSON.stringify({ _action: "void" }),
                    });
                    load();
                  }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-gray-600 text-white hover:bg-gray-700">
                    <AlertTriangle className="w-3.5 h-3.5" /> Void
                  </button>
                </>
              )}

              {/* Accepted retainer → Generate Next Monthly Invoice / Void (CEO only) */}
              {isCeo && isAccepted && isRetainer && (
                <>
                  <button onClick={() => { setInvoiceKind("monthly"); setShowInvoiceModal(true); }} className="btn btn-gold w-full text-sm flex items-center gap-2 justify-center">
                    <FileText className="w-3.5 h-3.5" /> Generate Next Monthly Invoice
                  </button>
                  <button onClick={async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    await fetch(`/api/proposals/documents/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                      body: JSON.stringify({ _action: "void" }),
                    });
                    load();
                  }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-gray-600 text-white hover:bg-gray-700">
                    <AlertTriangle className="w-3.5 h-3.5" /> Void
                  </button>
                </>
              )}

              {/* Invoice unpaid → Mark Paid / Void (CEO only) */}
              {canMarkPaid && (
                <>
                  <button onClick={handleMarkPaid} disabled={patching} className="btn btn-gold w-full text-sm flex items-center gap-2 justify-center">
                    <Check className="w-3.5 h-3.5" /> {patching ? "Marking…" : "Mark as Paid"}
                  </button>
                  <button onClick={async () => {
                    const { data: { session } } = await supabase.auth.getSession();
                    await fetch(`/api/proposals/documents/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                      body: JSON.stringify({ _action: "void" }),
                    });
                    load();
                  }} className="btn w-full text-sm flex items-center gap-2 justify-center bg-gray-600 text-white hover:bg-gray-700">
                    <AlertTriangle className="w-3.5 h-3.5" /> Void
                  </button>
                </>
              )}

              {/* Invoice: Paid confirmation */}
              {isInvoice && doc.status === "paid" && (
                <div className="text-center py-2 text-green-400 text-sm font-medium">
                  ✓ Paid{doc.paid_at ? ` on ${fmtDate(doc.paid_at)}` : ""}
                  {doc.payment_reference && <div className="text-xs text-muted mt-1">Ref: {doc.payment_reference}</div>}
                </div>
              )}

              {/* Non-CEO, accepted → request invoice approval */}
              {!isCeo && isAccepted && (
                <button onClick={async () => {
                  const { data: { session } } = await supabase.auth.getSession();
                  const res = await fetch("/api/proposals/approvals", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                    body: JSON.stringify({ document_id: id }),
                  });
                  if (res.ok) load(); else { const d = await res.json(); setError(d.error ?? "Request failed"); }
                }} className="btn btn-ghost w-full text-sm border border-gold text-gold hover:bg-gold/10 flex items-center gap-2 justify-center">
                  <Clock className="w-3.5 h-3.5" /> Request Invoice
                </button>
              )}

              {/* Self-diagnostic: isCeo is false */}
              {!isCeo && !isInvoice && (
                <p className="text-xs text-muted text-center py-1">No actions available for your role</p>
              )}

              {/* Self-diagnostic: isCeo is true but no action valid for this status */}
              {isCeo && !isSent && !isAccepted && !canMarkPaid && !isDraft && (
                <p className="text-xs text-muted text-center py-1">No actions for status: {doc.status}</p>
              )}

            </div>
          </div>

              {/* Void */}
          {/* Pending approval notice (sales) */}
          {!isCeo && hasPendingApproval && (
            <div className="panel border-gold/30 bg-gold/5">
              <div className="text-sm text-gold font-medium flex items-center gap-2"><Clock className="w-4 h-4" /> Invoice Pending CEO Approval</div>
            </div>
          )}

          {/* Approval requests (CEO) */}
          {isCeo && approvals.length > 0 && (
            <div className="panel">
              <h2 className="text-sm font-semibold text-gold mb-3">Invoice Approvals</h2>
              <div className="space-y-3">
                {approvals.map(a => (
                  <div key={a.id} className="border border-line rounded-lg p-3">
                    <div className="text-xs text-muted mb-1">By {a.requested_by} · {msAgo(a.requested_at)}</div>
                    {a.decision === "approved" && <div className="text-xs text-green-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approved by {a.decided_by}</div>}
                    {a.decision === "rejected" && <div className="text-xs text-red-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected by {a.decided_by}</div>}
                    {!a.decision && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={async () => {
                          const { data: { session } } = await supabase.auth.getSession();
                          const res = await fetch(`/api/proposals/approvals/${a.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                            body: JSON.stringify({ decision: "approved", invoice_kind: "deposit" }),
                          });
                          const d = await res.json();
                          if (res.ok) { load(); if (d.invoice) router.push(`/proposals/${(d.invoice as { id: string }).id}`); }
                          else setError(d.error ?? "Failed");
                        }} className="btn btn-xs bg-green-600 text-white hover:bg-green-700 flex-1 flex items-center gap-1 justify-center">
                          <CheckCircle className="w-3 h-3" /> Approve
                        </button>
                        <button onClick={async () => {
                          const { data: { session } } = await supabase.auth.getSession();
                          await fetch(`/api/proposals/approvals/${a.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
                            body: JSON.stringify({ decision: "rejected" }),
                          });
                          load();
                        }} className="btn btn-xs bg-red-600 text-white hover:bg-red-700 flex-1 flex items-center gap-1 justify-center">
                          <XCircle className="w-3 h-3" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
