// Phase 15/16 — New Document Builder
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { LineItem, makeLineItem, computeTotals, computeRetainerTotal } from "@/lib/proposals/types";
import { RateCardEntry } from "@/lib/proposals/types";

function fmt(n: number) {
  return `SAR ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function msAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const d = Math.floor(diff / 86_400_000);
  if (d > 0) return `${d}d ago`;
  const h = Math.floor(diff / 3_600_000);
  if (h > 0) return `${h}h ago`;
  const m = Math.floor(diff / 60_000);
  return `${m}m ago`;
}

export default function NewDocumentPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const isCeo = profile?.role === "ceo";

  const [docType, setDocType] = useState<"quote" | "proposal" | "retainer">("proposal");

  // Client fields
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [prospectId, setProspectId] = useState("");

  // Retainer fields
  const [termMonths, setTermMonths] = useState<3 | 6 | 12>(3);
  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [billingDay, setBillingDay] = useState(1);

  // Line items
  const [lineItems, setLineItems] = useState<LineItem[]>([makeLineItem()]);
  const [discountPct, setDiscountPct] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState("50% upfront upon confirmation, 50% on completion/delivery");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [prospects, setProspects] = useState<any[]>([]);
  const [rates, setRates] = useState<RateCardEntry[]>([]);
  const [showRateCard, setShowRateCard] = useState(false);

  useEffect(() => {
    supabase.from("prospects").select("id, company_name, city").then(({ data }) => {
      if (data) setProspects(data);
    });
    supabase.auth.getSession().then(({ data }) => {
      fetch("/api/proposals/rate-card", {
        headers: { Authorization: `Bearer ${data.session?.access_token ?? ""}` },
      }).then(r => r.json()).then(d => setRates(d.rows ?? [])).catch(() => {});
    });
  }, []);

  const isRetainer = docType === "retainer";

  // For retainers: sum of line items = monthly_amount
  const lineItemsSubtotal = lineItems.reduce((s, li) => s + li.amount, 0);
  const monthlyFee = isRetainer ? monthlyAmount : lineItemsSubtotal;
  const contractValue = isRetainer
    ? computeRetainerTotal(monthlyFee, termMonths)
    : lineItemsSubtotal - Math.round(lineItemsSubtotal * discountPct) / 100;
  const subtotal = isRetainer
    ? computeRetainerTotal(monthlyFee, termMonths)
    : lineItemsSubtotal;
  const discountAmount = isRetainer
    ? 0
    : Math.round(lineItemsSubtotal * discountPct) / 100;
  const total = subtotal - discountAmount;

  function addLineItem() {
    setLineItems((prev) => [...prev, makeLineItem()]);
  }

  function removeLineItem(i: number) {
    setLineItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateLine(i: number, field: keyof LineItem, value: string | number) {
    setLineItems((prev) => {
      const updated = [...prev];
      const li = { ...updated[i] };
      if (field === "qty" || field === "unit_price") {
        li[field] = Number(value);
        li.amount = Math.round(li.qty * li.unit_price * 100) / 100;
      } else {
        (li as any)[field] = value;
      }
      updated[i] = li;
      return updated;
    });
  }

  function addFromRateCard(rate: RateCardEntry) {
    setLineItems((prev) => [
      ...prev,
      {
        description: rate.name,
        details: rate.default_scope ?? "",
        qty: 1,
        unit_price: rate.default_price,
        amount: rate.default_price,
      },
    ]);
    setShowRateCard(false);
  }

  async function handleSave(status: "draft" | "sent") {
    if (!clientName.trim()) { setError("Client name is required"); return; }
    if (lineItems.length === 0) { setError("At least one line item is required"); return; }
    if (isRetainer && (!startDate || billingDay < 1 || billingDay > 28)) {
      setError("Retainer requires a start date and billing day (1–28)"); return;
    }
    if (isRetainer) {
      const today = new Date().toISOString().slice(0, 10);
      if (startDate < today) { setError("Start date must be today or in the future"); return; }
    }
    if (isRetainer && monthlyAmount <= 0) { setError("Monthly fee must be greater than zero"); return; }
    setSaving(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const payload: Record<string, unknown> = {
        doc_type: docType,
        client_name: clientName,
        client_address: clientAddress,
        client_email: clientEmail,
        client_phone: clientPhone,
        prospect_id: prospectId || null,
        line_items: lineItems.filter((li) => li.description.trim() !== ''),
        discount_pct: isRetainer ? 0 : discountPct,
        payment_terms: paymentTerms,
        notes: notes || null,
        status,
      };
      if (isRetainer) {
        payload.term_months = termMonths;
        payload.monthly_amount = monthlyAmount;
        payload.start_date = startDate;
        payload.billing_day = billingDay;
        payload.subtotal = subtotal;
        payload.discount_amount = 0;
        payload.total = total;
      }
      const res = await fetch("/api/proposals/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Save failed"); return; }
      router.push(`/proposals/${data.row.id}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">New Document</h1>
          <p className="text-muted text-sm mt-1">Build a quote, proposal, or retainer</p>
        </div>
        <button onClick={() => router.back()} className="btn btn-ghost">Cancel</button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>
      )}

      {/* Document type */}
      <section className="panel mb-4">
        <h2 className="text-sm font-semibold text-gold mb-3">Document Type</h2>
        <div className="flex gap-3">
          {(["quote", "proposal", "retainer"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setDocType(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${docType === t ? "bg-gold text-ink border-gold" : "border-line text-muted hover:border-gold"}`}
            >
              {t === "quote" ? "Quote" : t === "proposal" ? "Proposal" : "Retainer"}
            </button>
          ))}
        </div>
      </section>

      {/* Client info */}
      <section className="panel mb-4">
        <h2 className="text-sm font-semibold text-gold mb-3">Client</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label"><span className="label-text text-xs text-muted">Client Name *</span></label>
            <input className="input input-sm w-full" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Company name" />
          </div>
          <div>
            <label className="label"><span className="label-text text-xs text-muted">From Prospects</span></label>
            <select className="select select-sm w-full" value={prospectId} onChange={(e) => {
              setProspectId(e.target.value);
              const p = prospects.find((x) => x.id === e.target.value);
              if (p && !clientName) setClientName(p.company_name);
            }}>
              <option value="">— pick from CRM —</option>
              {prospects.map((p) => (
                <option key={p.id} value={p.id}>{p.company_name} ({p.city})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label"><span className="label-text text-xs text-muted">Email</span></label>
            <input className="input input-sm w-full" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
          </div>
          <div>
            <label className="label"><span className="label-text text-xs text-muted">Phone</span></label>
            <input className="input input-sm w-full" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="label"><span className="label-text text-xs text-muted">Address</span></label>
            <input className="input input-sm w-full" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Retainer fields */}
      {isRetainer && (
        <section className="panel mb-4">
          <h2 className="text-sm font-semibold text-gold mb-3">Retainer Terms</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text text-xs text-muted">Term</span></label>
              <div className="flex gap-2">
                {([3, 6, 12] as const).map((t) => (
                  <button key={t}
                    onClick={() => setTermMonths(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${termMonths === t ? "bg-gold text-ink border-gold" : "border-line text-muted hover:border-gold"}`}
                  >{t} months</button>
                ))}
              </div>
            </div>
            <div>
              <label className="label"><span className="label-text text-xs text-muted">Monthly Fee (SAR)</span></label>
              <input
                className="input input-sm w-full"
                type="number"
                min="0"
                step="100"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                placeholder="e.g. 15000"
              />
            </div>
            <div>
              <label className="label"><span className="label-text text-xs text-muted">Start Date (1st of month)</span></label>
              <input
                className="input input-sm w-full"
                type="date"
                min="2024-01-01"
                value={startDate}
                onChange={(e) => {
                  const d = new Date(e.target.value + 'T00:00:00');
                  if (d.getDate() !== 1) return; // only allow 1st of month
                  setStartDate(e.target.value);
                }}
              />
              {startDate && new Date(startDate + 'T00:00:00').getDate() !== 1 && (
                <p className="text-xs text-red-400 mt-1">Must be the 1st of a month</p>
              )}
            </div>
            <div>
              <label className="label"><span className="label-text text-xs text-muted">Billing Day (1–28)</span></label>
              <input
                className="input input-sm w-full"
                type="number"
                min="1"
                max="28"
                value={billingDay}
                onChange={(e) => setBillingDay(Math.min(28, Math.max(1, Number(e.target.value))))}
              />
            </div>
          </div>
          {monthlyAmount > 0 && (
            <div className="mt-3 p-3 bg-panel2 rounded-lg border border-gold/30 text-sm">
              <span className="text-muted">Monthly: </span>
              <span className="font-mono font-medium text-gold">{fmt(monthlyAmount)}</span>
              <span className="text-muted mx-2">·</span>
              <span className="text-muted">Term: </span>
              <span className="font-medium">{termMonths} months</span>
              <span className="text-muted mx-2">·</span>
              <span className="text-muted">Contract value: </span>
              <span className="font-mono font-bold text-red-400">{fmt(computeRetainerTotal(monthlyAmount, termMonths))}</span>
            </div>
          )}
        </section>
      )}

      {/* Line items */}
      <section className="panel mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gold">
            {isRetainer ? "Monthly Scope" : "Line Items"}
          </h2>
          <div className="flex gap-2">
            <button onClick={() => setShowRateCard(true)} className="btn btn-ghost btn-xs text-xs">Add from Rate Card</button>
            {!isRetainer && <button onClick={addLineItem} className="btn btn-ghost btn-xs text-xs">+ Manual Line</button>}
          </div>
        </div>

        {showRateCard && rates.length > 0 && (
          <div className="bg-panel2 rounded-lg p-3 mb-3 border border-line">
            <div className="text-xs text-muted mb-2">Click to add to line items:</div>
            <div className="grid grid-cols-2 gap-2">
              {rates.map((r) => (
                <button
                  key={r.id}
                  onClick={() => addFromRateCard(r)}
                  className="text-left px-3 py-2 rounded bg-panel hover:bg-gold/10 border border-line hover:border-gold text-sm transition"
                >
                  <div className="font-medium text-xs">{r.name}</div>
                  <div className="text-muted text-xs">{r.category} · {fmt(r.default_price)} / {r.unit}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowRateCard(false)} className="mt-2 text-xs text-muted hover:text-white">Close</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-1.5 pr-2 text-muted font-medium w-1/3">Description</th>
                <th className="text-left py-1.5 pr-2 text-muted font-medium w-1/3">Detail / Scope</th>
                <th className="text-center py-1.5 pr-2 text-muted font-medium w-12">Qty</th>
                <th className="text-right py-1.5 pr-2 text-muted font-medium w-24">Unit Price</th>
                <th className="text-right py-1.5 text-muted font-medium w-24">Amount</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((li, i) => (
                <tr key={i} className="border-b border-line/50">
                  <td className="py-1.5 pr-2">
                    <input
                      className="input input-xs w-full"
                      value={li.description}
                      onChange={(e) => updateLine(i, "description", e.target.value)}
                      placeholder="Service name"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <textarea
                      className="textarea textarea-xs w-full resize-none"
                      rows={2}
                      value={li.details}
                      onChange={(e) => updateLine(i, "details", e.target.value)}
                      placeholder="Scope, deliverables, details…"
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      className="input w-16 min-w-[4rem] text-center px-2 py-1 text-sm"
                      type="number"
                      min="1"
                      step="1"
                      value={li.qty}
                      onChange={(e) => updateLine(i, "qty", e.target.value === '' ? 1 : Number(e.target.value))}
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      className="input input-xs w-24 text-right"
                      type="number"
                      min="0"
                      step="0.01"
                      value={li.unit_price}
                      onChange={(e) => updateLine(i, "unit_price", e.target.value)}
                    />
                  </td>
                  <td className="py-1.5 text-right font-mono font-medium text-xs">
                    {fmt(li.amount)}
                  </td>
                  <td>
                    {!isRetainer && lineItems.length > 1 && (
                      <button onClick={() => removeLineItem(i)} className="text-red-400 hover:text-red-300 text-xs">✕</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-4 flex justify-end">
          <div className="w-64 space-y-1">
            {!isRetainer && (
              <>
                <div className="flex justify-between text-xs text-muted">
                  <span>Subtotal</span>
                  <span className="font-mono">{fmt(lineItemsSubtotal)}</span>
                </div>
                {discountPct > 0 && (
                  <div className="flex justify-between text-xs text-amber-400">
                    <span>Discount ({discountPct}%)</span>
                    <span className="font-mono">-{fmt(discountAmount)}</span>
                  </div>
                )}
              </>
            )}
            {isRetainer && monthlyAmount > 0 && (
              <>
                <div className="flex justify-between text-xs text-muted">
                  <span>Monthly Fee</span>
                  <span className="font-mono">{fmt(monthlyAmount)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>Term</span>
                  <span className="font-mono">{termMonths} months</span>
                </div>
              </>
            )}
            <div className="flex justify-between font-bold text-base border-t border-line pt-1" style={{ color: "#C0392B" }}>
              <span>{isRetainer ? "Total Contract Value" : "Net Payable"}</span>
              <span className="font-mono">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Discount (non-retainer) */}
        {!isRetainer && (
          <div className="mt-4 flex items-center gap-3">
            <label className="text-xs text-muted">Discount %</label>
            <input
              type="number"
              className="input input-xs w-24"
              min="0"
              max="35"
              step="0.5"
              value={discountPct}
              onChange={(e) => setDiscountPct(Number(e.target.value))}
            />
            {discountPct > 0 && (
              <span className="text-xs text-amber-400">
                Revision note: original ({fmt(lineItemsSubtotal)}) discounted {discountPct}%
              </span>
            )}
          </div>
        )}
      </section>

      {/* Payment terms + notes */}
      <section className="panel mb-4">
        <h2 className="text-sm font-semibold text-gold mb-3">Payment & Notes</h2>
        <div className="space-y-3">
          <div>
            <label className="label"><span className="label-text text-xs text-muted">Payment Terms</span></label>
            <textarea
              className="textarea textarea-sm w-full"
              rows={2}
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            />
          </div>
          <div>
            <label className="label"><span className="label-text text-xs text-muted">Notes (optional)</span></label>
            <textarea
              className="textarea textarea-sm w-full"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes or additional terms…"
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button onClick={() => handleSave("draft")} className="btn btn-ghost" disabled={saving}>
          {saving ? "Saving…" : "Save Draft"}
        </button>
        <button onClick={() => handleSave("sent")} className="btn btn-gold" disabled={saving}>
          {saving ? "Saving…" : "Mark Sent"}
        </button>
      </div>
    </div>
  );
}
