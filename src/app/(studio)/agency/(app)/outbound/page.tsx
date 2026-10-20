"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PageHead, Badge, Empty } from "@/components/ui";
import { Field, Modal } from "@/components/form";
import { format } from "date-fns";
import { StopCircle } from "lucide-react";

const STATUS_OPTIONS = ["queued", "sent", "delivered", "bounced", "complained", "failed"];
const REPLY_OPTIONS = ["any", "replied", "not_replied"];

export default function OutboundPage() {
  const [tab, setTab] = useState<"sends" | "enrolments">("sends");
  const [sends, setSends] = useState<any[]>([]);
  const [enrolments, setEnrolments] = useState<any[]>([]);
  const [sequences, setSequences] = useState<Record<string, string>>({});
  const [prospects, setProspects] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // filters
  const [statusFilter, setStatusFilter] = useState("");
  const [replyFilter, setReplyFilter] = useState("any");
  const [sequenceFilter, setSequenceFilter] = useState("");

  // detail modal
  const [detailRow, setDetailRow] = useState<any>(null);

  // halt loading per enrolment
  const [halting, setHalting] = useState<Set<string>>(new Set());

  async function load() {
    setLoading(true);
    const [{ data: seqs }, { data: prows }, { data: srows }, { data: erows }] = await Promise.all([
      supabase.from("sequences").select("id, name"),
      supabase.from("prospects").select("id, company_name"),
      supabase.from("sequence_sends").select("*").order("created_at", { ascending: false }),
      supabase.from("sequence_enrolments").select("*").order("enrolled_at", { ascending: false }),
    ]);
    const seqMap: Record<string, string> = {};
    (seqs ?? []).forEach((s: any) => { seqMap[s.id] = s.name; });
    const proMap: Record<string, string> = {};
    (prows ?? []).forEach((p: any) => { proMap[p.id] = p.company_name; });
    setSequences(seqMap);
    setProspects(proMap);
    setSends(srows ?? []);
    setEnrolments(erows ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filteredSends = useMemo(() => {
    return sends.filter((s: any) => {
      if (statusFilter && s.status !== statusFilter) return false;
      if (replyFilter === "replied" && !s.replied_at) return false;
      if (replyFilter === "not_replied" && s.replied_at) return false;
      if (sequenceFilter) {
        const enrolment = enrolments.find((e: any) => e.id === s.enrolment_id);
        if (!enrolment || enrolment.sequence_id !== sequenceFilter) return false;
      }
      return true;
    });
  }, [sends, statusFilter, replyFilter, sequenceFilter, enrolments]);

  const activeEnrolments = useMemo(() =>
    enrolments.filter((e: any) => e.status === "active"),
  [enrolments]);

  const stats = useMemo(() => {
    const total = sends.filter((s: any) => s.status === "sent").length;
    const replies = sends.filter((s: any) => s.replied_at).length;
    const bounces = sends.filter((s: any) => s.status === "bounced").length;
    return { total, replies, bounces, enrolled: activeEnrolments.length };
  }, [sends, activeEnrolments]);

  async function handleHalt(id: string) {
    if (!confirm("Halt this enrolment? No further emails will be sent.")) return;
    setHalting((prev) => new Set([...prev, id]));
    await supabase.from("sequence_enrolments").update({
      status: "stopped",
      stopped_at: new Date().toISOString(),
      stopped_reason: "manual",
    }).eq("id", id);
    setHalting((prev) => { const n = new Set(prev); n.delete(id); return n; });
    load();
  }

  return (
    <div>
      <PageHead title="Outbound" sub="Sent emails, active sequences, and enrolment management." />

      {/* counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="card p-3">
          <div className="text-xl font-bold">{stats.total}</div>
          <div className="text-xs text-muted">Emails sent</div>
        </div>
        <div className="card p-3">
          <div className="text-xl font-bold text-teal">{stats.replies}</div>
          <div className="text-xs text-muted">Replies</div>
        </div>
        <div className="card p-3">
          <div className="text-xl font-bold text-red-400">{stats.bounces}</div>
          <div className="text-xs text-muted">Bounces</div>
        </div>
        <div className="card p-3">
          <div className="text-xl font-bold text-gold">{stats.enrolled}</div>
          <div className="text-xs text-muted">Active enrolments</div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-2 mb-4">
        <button className={`btn ${tab === "sends" ? "btn-gold" : "btn-ghost"}`} onClick={() => setTab("sends")}>Sent Emails</button>
        <button className={`btn ${tab === "enrolments" ? "btn-gold" : "btn-ghost"}`} onClick={() => setTab("enrolments")}>
          Active Enrolments
          {activeEnrolments.length > 0 && (
            <span className="ml-1 bg-panel2 text-xs px-1.5 py-0.5 rounded">{activeEnrolments.length}</span>
          )}
        </button>
      </div>

      {tab === "sends" && (
        <>
          {/* filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            <select className="input text-xs" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="input text-xs" value={replyFilter} onChange={(e) => setReplyFilter(e.target.value)}>
              <option value="any">All replies</option>
              <option value="replied">Replied</option>
              <option value="not_replied">Not replied</option>
            </select>
            <select className="input text-xs" value={sequenceFilter} onChange={(e) => setSequenceFilter(e.target.value)}>
              <option value="">All sequences</option>
              {Object.entries(sequences).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
            {(statusFilter || replyFilter !== "any" || sequenceFilter) && (
              <button className="btn btn-ghost text-xs" onClick={() => { setStatusFilter(""); setReplyFilter("any"); setSequenceFilter(""); }}>Clear</button>
            )}
          </div>

          {loading ? (
            <div className="text-sm text-muted">Loading…</div>
          ) : filteredSends.length === 0 ? (
            <Empty text="No sent emails match your filters." />
          ) : (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr>{["Sent","Company","To","Seq","Step","Channel","Subject","Status","Replied"].map((h) => <th key={h} className="th">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredSends.map((s: any) => {
                    const enrolment = enrolments.find((e: any) => e.id === s.enrolment_id);
                    const companyName = enrolment ? (prospects[enrolment.prospect_id] ?? "—") : "—";
                    return (
                      <tr key={s.id} className="hover:bg-panel2/50 cursor-pointer" onClick={() => setDetailRow(s)}>
                        <td className="td text-xs text-muted whitespace-nowrap">{s.sent_at ? format(new Date(s.sent_at), "MMM d, HH:mm") : "—"}</td>
                        <td className="td text-sm font-medium">{companyName}</td>
                        <td className="td text-xs text-muted">{s.to_email ?? "—"}</td>
                        <td className="td text-xs text-muted">{enrolment ? (sequences[enrolment.sequence_id] ?? "—") : "—"}</td>
                        <td className="td text-xs text-center">{s.step_number}</td>
                        <td className="td text-xs">{s.channel}</td>
                        <td className="td text-sm truncate max-w-[200px]">{s.subject ?? "—"}</td>
                        <td className="td"><Badge value={s.status} /></td>
                        <td className="td text-xs">{s.replied_at ? "✓" : "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {tab === "enrolments" && (
        <>
          {loading ? (
            <div className="text-sm text-muted">Loading…</div>
          ) : activeEnrolments.length === 0 ? (
            <Empty text="No active enrolments." />
          ) : (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>{["Company","Sequence","Step","Next send","Enrolled","Actions"].map((h) => <th key={h} className="th">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {activeEnrolments.map((e: any) => (
                    <tr key={e.id} className="hover:bg-panel2/50">
                      <td className="td text-sm font-medium">{prospects[e.prospect_id] ?? "—"}</td>
                      <td className="td text-xs">{sequences[e.sequence_id] ?? "—"}</td>
                      <td className="td text-xs text-center">{e.current_step}</td>
                      <td className="td text-xs text-muted whitespace-nowrap">{e.next_send_at ? format(new Date(e.next_send_at), "MMM d, HH:mm") : "—"}</td>
                      <td className="td text-xs text-muted whitespace-nowrap">{format(new Date(e.enrolled_at), "MMM d, yyyy")}</td>
                      <td className="td">
                        <button
                          className="btn btn-ghost text-xs py-0.5 px-2 text-red-400 hover:text-red-300"
                          disabled={halting.has(e.id)}
                          onClick={() => handleHalt(e.id)}
                        >
                          <StopCircle className="w-3.5 h-3.5 mr-1" />
                          {halting.has(e.id) ? "Halting…" : "Halt"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* detail modal */}
      {detailRow && (
        <Modal title="Email Detail" onClose={() => setDetailRow(null)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted">To:</span> {detailRow.to_email}</div>
              <div><span className="text-muted">Status:</span> <Badge value={detailRow.status} /></div>
              <div><span className="text-muted">Sent:</span> {detailRow.sent_at ? format(new Date(detailRow.sent_at), "MMM d yyyy HH:mm") : "—"}</div>
              <div><span className="text-muted">Replied:</span> {detailRow.replied_at ? format(new Date(detailRow.replied_at), "MMM d yyyy HH:mm") : "No"}</div>
              <div><span className="text-muted">Channel:</span> {detailRow.channel}</div>
              <div><span className="text-muted">Step:</span> {detailRow.step_number}</div>
            </div>
            {detailRow.subject && (
              <div className="text-sm"><span className="text-muted">Subject:</span> {detailRow.subject}</div>
            )}
            {detailRow.error && (
              <div className="text-sm text-red-400"><span className="text-muted">Error:</span> {detailRow.error}</div>
            )}
            <div className="border-t border-line pt-3">
              <div className="text-xs text-muted mb-1">Full body:</div>
              <pre
                className="whitespace-pre-wrap text-sm bg-panel2 rounded p-3 font-mono leading-relaxed"
                dir={detailRow.channel === "whatsapp_manual" ? "rtl" : "ltr"}
              >{detailRow.body}</pre>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
