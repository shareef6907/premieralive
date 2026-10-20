// Phase 15 — Rate Card Page
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import { RateCardEntry } from "@/lib/proposals/types";
import { Download } from "lucide-react";

function fmt(n: number) {
  return `SAR ${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

export default function RatesPage() {
  const { profile } = useAuth();
  const isCeo = profile?.role === "ceo";
  const [rows, setRows] = useState<RateCardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editMin, setEditMin] = useState<number>(0);
  const [editMax, setEditMax] = useState<number>(0);
  const [editUnit, setEditUnit] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/proposals/rate-card", {
      headers: { Authorization: `Bearer ${session?.access_token ?? ""}` },
    });
    const data = await res.json();
    setRows(data.rows ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(r: RateCardEntry) {
    setEditingId(r.id);
    setEditPrice(r.default_price);
    setEditMin(r.price_min);
    setEditMax(r.price_max);
    setEditUnit(r.unit);
  }

  async function saveEdit() {
    if (!editingId) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    await fetch("/api/proposals/rate-card", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token ?? ""}`,
      },
      body: JSON.stringify({
        id: editingId,
        default_price: editPrice,
        price_min: editMin,
        price_max: editMax,
        unit: editUnit,
      }),
    });
    setEditingId(null);
    setSaving(false);
    load();
  }

  const media = rows.filter((r) => r.category === "media");
  const website = rows.filter((r) => r.category === "website");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Rate Card</h1>
          <p className="text-muted text-sm mt-1">Standard pricing for media and website services</p>
        </div>
        <a
          href="/api/proposals/rate-card/pdf"
          target="_blank"
          rel="noreferrer"
          className="btn btn-gold flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Download Rate Card PDF
        </a>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted">Loading…</div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {/* Media services */}
          <div>
            <h2 className="text-sm font-semibold text-gold mb-3 uppercase tracking-wide">Media Services</h2>
            <div className="panel">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left py-2 text-muted font-medium text-xs">Service</th>
                    <th className="text-right py-2 text-muted font-medium text-xs">Default Price</th>
                    <th className="text-right py-2 text-muted font-medium text-xs">Range</th>
                    <th className="text-right py-2 text-muted font-medium text-xs">Unit</th>
                    {isCeo && <th className="w-8"></th>}
                  </tr>
                </thead>
                <tbody>
                  {media.map((r) => (
                    <tr key={r.id} className="border-b border-line/50">
                      <td className="py-2.5 font-medium text-sm">{r.name}</td>
                      {editingId === r.id ? (
                        <>
                          <td className="py-1"><input className="input input-xs w-24 text-right font-mono" type="number" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} /></td>
                          <td className="py-1"><input className="input input-xs w-16 text-right font-mono" type="number" value={editMin} onChange={(e) => setEditMin(Number(e.target.value))} /></td>
                          <td className="py-1"><input className="input input-xs w-16 text-right font-mono" type="number" value={editMax} onChange={(e) => setEditMax(Number(e.target.value))} /></td>
                          <td className="py-1"><input className="input input-xs w-16" value={editUnit} onChange={(e) => setEditUnit(e.target.value)} /></td>
                          <td>
                            <div className="flex gap-1">
                              <button onClick={saveEdit} disabled={saving} className="text-green-400 text-xs hover:text-green-300">{saving ? "…" : "✓"}</button>
                              <button onClick={() => setEditingId(null)} className="text-red-400 text-xs hover:text-red-300">✕</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2.5 text-right font-mono text-sm">{fmt(r.default_price)}</td>
                          <td className="py-2.5 text-right text-muted text-xs">{fmt(r.price_min)} – {fmt(r.price_max)}</td>
                          <td className="py-2.5 text-right text-muted text-xs">{r.unit}</td>
                          {isCeo && (
                            <td><button onClick={() => startEdit(r)} className="text-gold text-xs hover:underline">Edit</button></td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Website services */}
          <div>
            <h2 className="text-sm font-semibold text-gold mb-3 uppercase tracking-wide">Website Services</h2>
            <div className="panel">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left py-2 text-muted font-medium text-xs">Service</th>
                    <th className="text-right py-2 text-muted font-medium text-xs">Default Price</th>
                    <th className="text-right py-2 text-muted font-medium text-xs">Range</th>
                    <th className="text-right py-2 text-muted font-medium text-xs">Unit</th>
                    {isCeo && <th className="w-8"></th>}
                  </tr>
                </thead>
                <tbody>
                  {website.map((r) => (
                    <tr key={r.id} className="border-b border-line/50">
                      <td className="py-2.5 font-medium text-sm">{r.name}</td>
                      {editingId === r.id ? (
                        <>
                          <td className="py-1"><input className="input input-xs w-24 text-right font-mono" type="number" value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} /></td>
                          <td className="py-1"><input className="input input-xs w-16 text-right font-mono" type="number" value={editMin} onChange={(e) => setEditMin(Number(e.target.value))} /></td>
                          <td className="py-1"><input className="input input-xs w-16 text-right font-mono" type="number" value={editMax} onChange={(e) => setEditMax(Number(e.target.value))} /></td>
                          <td className="py-1"><input className="input input-xs w-16" value={editUnit} onChange={(e) => setEditUnit(e.target.value)} /></td>
                          <td>
                            <div className="flex gap-1">
                              <button onClick={saveEdit} disabled={saving} className="text-green-400 text-xs hover:text-green-300">{saving ? "…" : "✓"}</button>
                              <button onClick={() => setEditingId(null)} className="text-red-400 text-xs hover:text-red-300">✕</button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2.5 text-right font-mono text-sm">{fmt(r.default_price)}</td>
                          <td className="py-2.5 text-right text-muted text-xs">{fmt(r.price_min)} – {fmt(r.price_max)}</td>
                          <td className="py-2.5 text-right text-muted text-xs">{r.unit}</td>
                          {isCeo && (
                            <td><button onClick={() => startEdit(r)} className="text-gold text-xs hover:underline">Edit</button></td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
