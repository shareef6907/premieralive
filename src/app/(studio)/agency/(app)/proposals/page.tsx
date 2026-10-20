// Phase 15 — Proposals List Page
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { Document, DocType, DocStatus } from "@/lib/proposals/types";
import Link from "next/link";
import { FileText, Plus, Filter, Download, Eye, AlertCircle } from "lucide-react";

const TYPE_LABELS: Partial<Record<DocType, string>> = {
  proposal: "Proposal",
  retainer: "Retainer",
  invoice: "Invoice",
};

const STATUS_COLORS: Record<DocStatus, string> = {
  draft: "bg-gray-500",
  sent: "bg-blue-500",
  accepted: "bg-green-600",
  declined: "bg-red-500",
  superseded: "bg-gray-400",
  void: "bg-gray-800",
  paid: "bg-green-700",
  overdue: "bg-red-700",
};

function formatCurrency(n: number) {
  return `SAR ${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

function DiscountBadge({ pct }: { pct: number }) {
  if (pct <= 0) return null;
  return (
    <span className="ml-2 text-xs bg-amber-200 text-amber-800 rounded px-1.5 py-0.5 font-medium">
      {pct}% off
    </span>
  );
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

export default function ProposalsPage() {
  useAuth();
  const [rows, setRows] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<DocType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<DocStatus | "all">("all");
  // isCeo comes from the server (CEO_EMAIL env var) to avoid client-side role mismatch
  const [isCeo, setIsCeo] = useState(false);

  async function load() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/proposals/documents", {
      headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
    });
    const data = await res.json();
    setRows(data.rows ?? []);
    setIsCeo(data.is_ceo ?? false);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = rows.filter((r) => {
    if (filterType !== "all" && r.doc_type !== filterType) return false;
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Proposals & Invoices</h1>
          <p className="text-muted text-sm mt-1">Quotes, proposals, and invoices</p>
        </div>
        {isCeo && (
          <Link
            href="/agency/proposals/new"
            className="btn btn-gold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Document
          </Link>
        )}
        {!isCeo && (
          <Link
            href="/agency/proposals/new"
            className="btn btn-gold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Quote / Proposal
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 items-center">
        <Filter className="w-4 h-4 text-muted" />
        <select
          className="select select-sm w-40"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as DocType | "all")}
        >
          <option value="all">All Types</option>
          <option value="proposal">Proposal</option>
          <option value="retainer">Retainer</option>
          {isCeo && <option value="invoice">Invoice</option>}
        </select>
        <select
          className="select select-sm w-40"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as DocStatus | "all")}
        >
          <option value="all">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
          <option value="superseded">Superseded</option>
          <option value="void">Void</option>
          {isCeo && <option value="paid">Paid</option>}
          {isCeo && <option value="overdue">Overdue</option>}
        </select>
        <span className="text-sm text-muted ml-auto">{filtered.length} document{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-muted">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted flex flex-col items-center gap-3">
          <AlertCircle className="w-8 h-8" />
          <p>No documents found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-2 px-3 text-muted font-medium">Number</th>
                <th className="text-left py-2 px-3 text-muted font-medium">Type</th>
                <th className="text-left py-2 px-3 text-muted font-medium">Client</th>
                <th className="text-right py-2 px-3 text-muted font-medium">Total</th>
                <th className="text-center py-2 px-3 text-muted font-medium">Status</th>
                <th className="text-left py-2 px-3 text-muted font-medium">Created By</th>
                <th className="text-left py-2 px-3 text-muted font-medium">Date</th>
                <th className="text-center py-2 px-3 text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr
                  key={doc.id}
                  className={`border-b border-line hover:bg-panel2 transition ${doc.status === "superseded" || doc.status === "void" ? "opacity-50" : ""}`}
                >
                  <td className="py-2.5 px-3 font-mono text-xs">
                    <Link href={`/proposals/${doc.id}`} className="text-gold hover:underline">
                      {doc.doc_number}
                    </Link>
                    {doc.parent_id && (
                      <span className="ml-1 text-xs text-muted">(revised)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs font-medium">{TYPE_LABELS[doc.doc_type]}</span>
                    {doc.discount_pct > 0 && <DiscountBadge pct={doc.discount_pct} />}
                  </td>
                  <td className="py-2.5 px-3">{doc.client_name}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    {formatCurrency(doc.doc_type === 'retainer' && doc.total === 0
                      ? (doc.monthly_amount ?? 0) * (doc.term_months ?? 1)
                      : doc.total)}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-xs text-white rounded px-2 py-0.5 ${STATUS_COLORS[doc.status]}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-muted text-xs">{doc.created_by}</td>
                  <td className="py-2.5 px-3 text-muted text-xs">{msAgo(doc.created_at)}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/proposals/${doc.id}`}
                        className="btn btn-ghost btn-xs"
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={async () => {
                          const { data: { session } } = await supabase.auth.getSession();
                          const res = await fetch(`/api/proposals/documents/${doc.id}/pdf`, {
                            headers: { Authorization: `Bearer ${session?.access_token ?? ''}` },
                          });
                          if (res.ok) {
                            const blob = await res.blob();
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a'); a.href = url; a.download = `${doc.doc_number}.pdf`; a.click();
                            URL.revokeObjectURL(url);
                          }
                        }}
                        className="btn btn-ghost btn-xs"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
