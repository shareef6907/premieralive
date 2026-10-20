"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PageHead, Badge, Empty } from "@/components/ui";
import { MessageCircle, Check, X, ExternalLink, Clock } from "lucide-react";
import { useRealtime } from "@/lib/useRealtime";

function msAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function stripPhone(phone: string | null): string {
  return (phone ?? "").replace(/[^0-9]/g, "");
}

function waDeepLink(phone: string | null, body: string): string | null {
  const digits = stripPhone(phone);
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(body)}`;
}

export default function WhatsAppQueue() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/outbound/whatsapp", {
      headers: { Authorization: `Bearer ${session?.access_token ?? ''}` },
    });
    const data = await res.json();
    setRows(data.rows ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);
  useRealtime(["sequence_sends"], load);

  async function handleAction(id: string, action: "mark_sent" | "skip") {
    setActing(id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/outbound/whatsapp", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ''}`,
        },
        body: JSON.stringify({ id, action }),
      });
      if (res.ok) load();
    } finally {
      setActing(null);
    }
  }

  const pendingCount = rows.length;

  return (
    <div>
      <PageHead
        title="WhatsApp Queue"
        sub="Manual sends waiting — oldest first."
      />

      {loading ? (
        <div className="text-muted text-sm">Loading…</div>
      ) : rows.length === 0 ? (
        <Empty text="No pending WhatsApp tasks. All caught up." />
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const link = waDeepLink(row.whatsapp ?? row.phone, row.body);
            const hasPhone = !!stripPhone(row.whatsapp ?? row.phone);
            const queuedMs = Date.now() - new Date(row.created_at).getTime();
            const queuedLabel = queuedMs > 86_400_000
              ? `${Math.floor(queuedMs / 86_400_000)}d queued`
              : queuedMs > 3_600_000
                ? `${Math.floor(queuedMs / 3_600_000)}h queued`
                : `${Math.floor(queuedMs / 60_000)}m queued`;

            return (
              <div key={row.id} className="card p-5 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink">{row.company_name}</span>
                      {row.full_name && (
                        <span className="text-muted text-sm">— {row.full_name}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {row.score != null && (
                        <span className="badge bg-line text-xs">
                          score {row.score}
                        </span>
                      )}
                      {row.vertical && (
                        <span className="badge bg-line text-xs">{row.vertical}</span>
                      )}
                      {row.lang_pref && (
                        <span className="badge bg-line text-xs">{row.lang_pref}</span>
                      )}
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {queuedLabel}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="btn btn-ghost text-xs flex items-center gap-1"
                      onClick={() => handleAction(row.id, "skip")}
                      disabled={acting === row.id}
                      title="Skip this task"
                    >
                      <X className="w-3.5 h-3.5" />
                      Skip
                    </button>
                    <button
                      className="btn btn-ghost text-xs flex items-center gap-1"
                      onClick={() => handleAction(row.id, "mark_sent")}
                      disabled={acting === row.id}
                      title="Mark sent without opening WhatsApp"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark sent
                    </button>
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold text-xs flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open WhatsApp
                      </a>
                    ) : (
                      <span className="text-xs text-muted italic">
                        No WhatsApp number
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                {(row.whatsapp ?? row.phone) && (
                  <div className="text-xs text-muted">
                    {row.whatsapp ? "WhatsApp: " : "Phone: "}
                    <span className="font-mono">{row.whatsapp ?? row.phone}</span>
                    {!row.whatsapp && row.phone && (
                      <span className="ml-2 text-yellow-400 text-[10px]">
                        (no WhatsApp number — used phone)
                      </span>
                    )}
                  </div>
                )}

                {/* Full message body */}
                <div className="bg-panel2 border border-line rounded-lg p-4">
                  <p
                    style={{
                      direction: row.lang_pref === "ar" ? "rtl" : "ltr",
                      fontFamily: row.lang_pref === "ar"
                        ? "'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif"
                        : "inherit",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                    className="text-sm text-ink leading-relaxed"
                  >
                    {row.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
