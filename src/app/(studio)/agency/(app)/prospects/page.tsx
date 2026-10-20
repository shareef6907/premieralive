"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PageHead, Badge, Empty } from "@/components/ui";
import { Field, Modal } from "@/components/form";
import {
  Plus, Upload, Download, ExternalLink, Phone, Mail,
  MessageCircle, CheckCircle, XCircle, Calendar, Send,
  Pencil, Trash2, ArrowRight, AlertCircle,
} from "lucide-react";
import { useRealtime } from "@/lib/useRealtime";
import { format, addDays } from "date-fns";

const CITIES = [
  "Riyadh","Jeddah","Khobar","Dammam","Dhahran","Mecca","Medina","Tabuk","Abha","Buraidah"
];

const INDUSTRIES = [
  "Restaurants & Cafés","Hotels & Hospitality","Real Estate","Events & Weddings",
  "Clinics & Medical","Gyms & Fitness","Salons & Beauty","Retail",
  "Education","Automotive","Construction","Other",
];

type Stage = "gatekeeper" | "pitch";

const BLANK = {
  company_name: "", city: "Al Khobar", industry: "Other", phone: "", whatsapp: "",
  email: "", website: "", instagram: "", assigned_to: "", notes: "",
  // Part 2 new fields
  contact_name: "", lang: "ar", personal_hook: "", enrol_now: true,
};

export default function Prospects() {
  const [rows, setRows] = useState<any[]>([]);
  const [view, setView] = useState<"today"|"all">("today");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({ ...BLANK });
  const [team, setTeam] = useState<any[]>([]);
  const [filters, setFilters] = useState({ city: "", industry: "", status: "", assigned: "", search: "" });
  const [batch, setBatch] = useState(10);
  const [profile, setProfile] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [enrolling, setEnrolling] = useState(false);
  const [enrolResult, setEnrolResult] = useState<{ enrolled: string[]; skipped: any[] } | null>(null);
  // Part 1: stage replaces language-only picker
  const [selectedStage, setSelectedStage] = useState<Stage | "auto">("auto");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [routing, setRouting] = useState<any[]>([]);
  // Part 2 duplicate check
  const [dupWarning, setDupWarning] = useState<{ company?: any; contact?: any } | null>(null);
  // Part 2: submit guard
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [editContact, setEditContact] = useState<any>(null);
  const [editNotesAppend, setEditNotesAppend] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) { console.error("[prospects load]", error); setRows([]); return; }
    setRows(data || []);
    const { data: t } = await supabase.from("profiles").select("id, full_name, role")
      .in("role", ["ceo", "sales_manager"]);
    setTeam(t || []);
    const { data: me } = await supabase.from("profiles").select("*").limit(1);
    if (me?.[0]) setProfile(me[0]);
  }

  useEffect(() => { load(); }, []);
  useRealtime(["prospects"], load);

  const today = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);

  const followUps = useMemo(() =>
    rows.filter((p: any) => p.follow_up_date && p.follow_up_date <= today && p.status === "follow_up"),
  [rows, today]);

  const baseFiltered = useMemo(() => {
    let r = rows;
    if (filters.city) r = r.filter((p: any) => p.city === filters.city);
    if (filters.industry) r = r.filter((p: any) => p.industry === filters.industry);
    if (filters.assigned) r = r.filter((p: any) => p.assigned_to === filters.assigned);
    if (filters.search) r = r.filter((p: any) =>
      p.company_name?.toLowerCase().includes(filters.search.toLowerCase()));
    return r;
  }, [rows, filters]);

  const freshBatch = useMemo(() =>
    baseFiltered.filter((p: any) => p.status === "new").slice(0, batch),
  [baseFiltered, batch]);

  const filtered = useMemo(() => {
    let r = rows;
    if (filters.city) r = r.filter((p: any) => p.city === filters.city);
    if (filters.industry) r = r.filter((p: any) => p.industry === filters.industry);
    if (filters.status) r = r.filter((p: any) => p.status === filters.status);
    if (filters.assigned) r = r.filter((p: any) => p.assigned_to === filters.assigned);
    if (filters.search) r = r.filter((p: any) =>
      p.company_name?.toLowerCase().includes(filters.search.toLowerCase()));
    return r;
  }, [rows, filters]);

  const name = (id: string) => team.find((t) => t.id === id)?.full_name || "—";

  /* ---------------------------------------------------------------- */
  /* Part 2 — Add Prospect save with duplicate check                    */
  /* ---------------------------------------------------------------- */

  async function checkDuplicates(company: string, email: string) {
    setDupWarning(null);
    if (!company.trim() && !email.trim()) return;

    if (company.trim()) {
      const { data: co } = await supabase
        .from("prospects")
        .select("id, company_name")
        .ilike("company_name", company.trim())
        .maybeSingle();
      if (co) { setDupWarning({ company: co }); return; }
    }

    if (email.trim()) {
      const { data: contact } = await supabase
        .from("prospect_contacts")
        .select("id, email, full_name, prospects(id, company_name)")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();
      if (contact) { setDupWarning({ contact }); return; }
    }
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company_name.trim()) { alert("Company name is required."); return; }
    if (submitting) return;
    doSave();
  }

  async function doSave() {
    setSubmitting(true);
    const companyTrimmed = form.company_name.trim();

    // --- 1. Duplicate check (runs BEFORE any insert) ---
    if (companyTrimmed) {
      const { data: co } = await supabase
        .from("prospects")
        .select("id, company_name")
        .ilike("company_name", companyTrimmed)
        .maybeSingle();
      if (co) {
        setDupWarning({ company: co });
        setSubmitting(false);
        return;
      }
    }

    if (form.email?.trim()) {
      const { data: contact } = await supabase
        .from("prospect_contacts")
        .select("id, email, prospects(id, company_name)")
        .eq("email", form.email.trim().toLowerCase())
        .maybeSingle();
      if (contact) {
        setDupWarning({ contact });
        setSubmitting(false);
        return;
      }
    }

    // --- 2. Insert or find prospect ---
    const prospectRow = {
      company_name: companyTrimmed,
      city: form.city || null,
      industry: form.industry || null,
      phone: form.phone || null,
      whatsapp: form.whatsapp || null,
      email: form.email?.trim() || null,
      website: form.website || null,
      instagram: form.instagram || null,
      assigned_to: form.assigned_to || null,
      notes: form.notes || null,
      source: "manual",
      lang_pref: form.lang || "ar",
      personal_hook: form.personal_hook?.trim() || null,
      consent_basis: "legitimate_business",
      status: "new",
      lang_confidence: "verified",
      created_by: profile?.id,
    };

    // Try insert first; if company_name unique-constraint fires, find the existing row
    const { data: newProspect, error: pErr } = await supabase
      .from("prospects")
      .insert(prospectRow)
      .select("id")
      .single();

    if (pErr) {
      if (pErr.message.includes('unique') || pErr.code === '23505') {
        // Another concurrent submission got there first — find it and continue
        const { data: existing } = await supabase
          .from("prospects")
          .select("id")
          .ilike("company_name", companyTrimmed)
          .maybeSingle();
        if (existing) {
          newProspect satisfies { id: string } satisfies { id: string } || // satisfies pattern
          Object.assign(newProspect as any, { id: existing.id });
        } else {
          alert("Could not save: " + pErr.message);
          setSubmitting(false);
          return;
        }
      } else {
        alert("Could not save: " + pErr.message);
        setSubmitting(false);
        return;
      }
    }

    // --- 3. Upsert contact (idempotent — ignore dupe constraint, read id back) ---
    let contactId: string | null = null;
    if (form.email?.trim() && newProspect?.id) {
      const { data: contactRow, error: cErr } = await supabase
        .from("prospect_contacts")
        .upsert(
          {
            prospect_id: (newProspect as any).id,
            email: form.email.trim().toLowerCase(),
            full_name: form.contact_name?.trim() || null,
            email_status: "unverified",
            is_primary: true,
            lang_pref: form.lang || "ar",
          },
          { onConflict: 'email', ignoreDuplicates: true }
        )
        .select("id")
        .single();

      if (cErr && !cErr.message.includes('unique') && cErr.code !== '23505') {
        alert(`Prospect saved, but contact creation failed: ${cErr.message}. Add the contact manually.`);
        setForm({ ...BLANK, city: "Al Khobar" });
        setDupWarning(null);
        setOpen(false);
        setSubmitting(false);
        load();
        return;
      }

      // If upsert returned nothing (duplicate was ignored), fetch the existing id
      if (!contactRow?.id && form.email?.trim()) {
        const { data: existing } = await supabase
          .from("prospect_contacts")
          .select("id")
          .eq("email", form.email.trim().toLowerCase())
          .maybeSingle();
        contactId = existing?.id ?? null;
      } else {
        contactId = contactRow?.id ?? null;
      }
    }

    // --- 4. Enrol with auto stage detection ---
    let enrolOutcome: { enrolled: boolean; reason?: string } | null = null;
    if (form.enrol_now && ((newProspect as any)?.id || form.email?.trim())) {
      const prospectId = (newProspect as any)?.id;
      if (prospectId && contactId) {
        const { defaultStage, enrolProspect } = await import("@/lib/outbound/enrol");
        const stage = await defaultStage(prospectId, form.personal_hook ?? null);
        const result = await enrolProspect(prospectId, stage) as { enrolled: boolean; reason?: string };
        enrolOutcome = result.enrolled
          ? { enrolled: true }
          : { enrolled: false, reason: result.reason ?? 'unknown' };
      }
    }

    setForm({ ...BLANK, city: "Al Khobar" });
    setDupWarning(null);
    setOpen(false);
    setSubmitting(false);

    if (enrolOutcome && !enrolOutcome.enrolled) {
      alert(`Prospect saved, but enrolment was skipped: ${enrolOutcome.reason}`);
    } else if (enrolOutcome?.enrolled) {
      alert(`Prospect saved and enrolled in ${form.lang === "ar" ? "Arabic" : "English"} ${form.personal_hook?.trim() ? "pitch" : "gatekeeper"} sequence.`);
    }

    load();
  }

  async function handleUseExistingProspect(existingProspectId: string) {
    // Enrol the existing prospect if it has a contact
    const { data: contact } = await supabase
      .from("prospect_contacts")
      .select("id, email")
      .eq("prospect_id", existingProspectId)
      .eq("is_primary", true)
      .maybeSingle();

    if (!contact) {
      alert("That prospect has no contact email — add one before enrolling.");
      return;
    }

    const { defaultStage, enrolProspect } = await import("@/lib/outbound/enrol");
    const { data: p } = await supabase.from("prospects").select("personal_hook").eq("id", existingProspectId).single();
    const stage = await defaultStage(existingProspectId, p?.personal_hook ?? null);

    setDupWarning(null);
    setForm({ ...BLANK, city: "Al Khobar" });
    setOpen(false);
    const result = await enrolProspect(existingProspectId, stage) as { enrolled: boolean; reason?: string };
    if (result.enrolled) {
      alert(`Enrolled existing prospect.`);
    } else {
      alert(`Enrolment skipped: ${result.reason ?? 'unknown'}`);
    }
    load();
  }

  /* ---------------------------------------------------------------- */
  /* Part 1 — batch enrolment with confirmation                         */
  /* ---------------------------------------------------------------- */

  async function openEnrolConfirm() {
    if (!selectedIds.size) return;
    setConfirmLoading(true);
    setRouting([]);

    const ids = [...selectedIds];
    const res = await fetch("/api/outbound/enrol", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prospectIds: ids,
        stage: selectedStage === "auto" ? undefined : selectedStage,
        sequence: "dry-run",
      }),
    });
    const data = await res.json();
    setRouting(data.routing ?? []);
    setConfirmLoading(false);
    setConfirmOpen(true);
  }

  async function confirmEnrol() {
    const ids = [...selectedIds];
    setConfirmLoading(true);
    try {
      const res = await fetch("/api/outbound/enrol", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prospectIds: ids, stage: selectedStage === "auto" ? undefined : selectedStage }),
      });
      const data = await res.json();
      setEnrolResult(data);
      setSelectedIds(new Set());
      if (data.enrolled?.length) load();
    } finally {
      setConfirmLoading(false);
      setConfirmOpen(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Original handlers                                                  */
  /* ---------------------------------------------------------------- */

  async function handleOutcome(id: string, outcome: string, extra?: any) {
    const p = rows.find((r: any) => r.id === id);
    if (!p) return;
    const updates: any = { last_contacted_at: new Date().toISOString() };
    if (outcome === "no_answer") {
      Object.assign(updates, { status: "contacted", contact_count: (p.contact_count || 0) + 1 });
    } else if (outcome === "interested") {
      if (!extra?.follow_up_date) return;
      Object.assign(updates, { status: "follow_up", follow_up_date: extra.follow_up_date, contact_count: (p.contact_count || 0) + 1 });
    } else if (outcome === "meeting") {
      Object.assign(updates, { status: "meeting" });
    } else if (outcome === "rejected") {
      Object.assign(updates, { status: "rejected" });
    }
    await supabase.from("prospects").update(updates).eq("id", id);
    load();
  }

  async function handleConvert(id: string) {
    const p = rows.find((r: any) => r.id === id);
    if (!p || p.status === "converted") return;
    const { data: client, error } = await supabase.from("clients").insert({
      name: p.company_name,
      package_tier: "projects",
      monthly_fee: 0,
      status: "active",
      phone: p.phone,
      email: p.email,
      brought_by: p.assigned_to || profile?.id,
    }).select().single();
    if (error) { alert("Could not convert: " + error.message); return; }
    await supabase.from("prospects").update({
      status: "converted",
      converted_client_id: client.id,
    }).eq("id", id);
    load();
  }

  async function handleEditOpen(id: string) {
    const p = rows.find((r: any) => r.id === id);
    if (!p) return;
    const { data: contacts } = await supabase
      .from("prospect_contacts")
      .select("*")
      .eq("prospect_id", id)
      .eq("is_primary", true)
      .maybeSingle();
    setEditId(id);
    setEditForm({
      company_name: p.company_name ?? "",
      city: p.city ?? "",
      industry: p.industry ?? "",
      phone: p.phone ?? "",
      whatsapp: p.whatsapp ?? "",
      email: p.email ?? "",
      website: p.website ?? "",
      instagram: p.instagram ?? "",
      assigned_to: p.assigned_to ?? "",
      notes: p.notes ?? "",
      status: p.status ?? "",
      follow_up_date: p.follow_up_date ?? "",
      personal_hook: p.personal_hook ?? "",
      hook_verified: !!p.hook_verified,
      lang_pref: p.lang_pref ?? "ar",
    });
    setEditContact(contacts ? { id: contacts.id, full_name: contacts.full_name ?? "", email: contacts.email ?? "", phone: contacts.phone ?? "", whatsapp: contacts.whatsapp ?? "" } : null);
    setEditNotesAppend("");
    setEditOpen(true);
  }

  async function handleEditSave() {
    if (!editId) return;
    const row = {
      company_name: editForm.company_name.trim() || null,
      city: editForm.city || null,
      industry: editForm.industry || null,
      phone: editForm.phone || null,
      whatsapp: editForm.whatsapp || null,
      email: editForm.email || null,
      website: editForm.website || null,
      instagram: editForm.instagram || null,
      assigned_to: editForm.assigned_to || null,
      notes: editForm.notes || null,
      follow_up_date: editForm.follow_up_date || null,
      personal_hook: editForm.personal_hook || null,
      hook_verified: !!editForm.hook_verified,
      lang_pref: editForm.lang_pref || 'ar',
    };
    const { error: pErr } = await supabase.from("prospects").update(row).eq("id", editId);
    if (pErr) { alert("Could not save: " + pErr.message); return; }

    const contactEmail = editContact?.email?.trim() || null;
    if (contactEmail) {
      if (editContact?.id) {
        const { error: cErr } = await supabase.from("prospect_contacts").update({
          full_name: editContact.full_name || null,
          email: contactEmail.toLowerCase(),
          phone: editContact.phone || null,
          whatsapp: editContact.whatsapp || null,
        }).eq("id", editContact.id);
        if (cErr) { alert("Could not save contact: " + cErr.message); return; }
      } else {
        await supabase.from("prospect_contacts").insert({
          prospect_id: editId,
          full_name: editContact.full_name || null,
          email: contactEmail.toLowerCase(),
          phone: editContact.phone || null,
          whatsapp: editContact.whatsapp || null,
          is_primary: true,
          lang_pref: "en",
          email_status: "unverified",
        });
      }
    }
    setEditOpen(false);
    load();
  }

  async function handleDeleteConfirm(id: string, name: string) {
    await supabase.from("sequence_enrolments").update({ status: "stopped", stopped_at: new Date().toISOString(), stopped_reason: "prospect_deleted" }).eq("prospect_id", id).eq("status", "active");
    const { error } = await supabase.from("prospects").delete().eq("id", id);
    if (error) { alert("Could not delete: " + error.message); return; }
    setDeleteOpen(false);
    load();
  }

  function openDeleteModal(id: string, name: string) {
    setDeleteId(id);
    setDeleteName(name);
    setDeleteOpen(true);
  }

  function canConvert(p: any) {
    return p.status === "meeting" || p.status === "follow_up";
  }

  return (
    <div>
      <PageHead title="Prospects" sub="Pipeline and daily outreach queue."
        action={<div className="flex gap-2">
          <button className="btn btn-ghost text-xs" onClick={downloadTemplate}><Download className="w-3 h-3" /> Template</button>
          <button className="btn btn-ghost text-xs" onClick={() => fileRef.current?.click()}><Upload className="w-3 h-3" /> Import CSV</button>
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleImport} />
          <button className="btn btn-gold" onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Add Prospect</button>
        </div>}
      />

      <div className="flex gap-2 mb-5">
        <button className={`btn ${view === "today" ? "btn-gold" : "btn-ghost"}`} onClick={() => setView("today")}>Today</button>
        <button className={`btn ${view === "all" ? "btn-gold" : "btn-ghost"}`} onClick={() => setView("all")}>All</button>
      </div>

      {selectedIds.size > 0 && (
        <div className="mb-3 p-3 card flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted">{selectedIds.size} selected</span>
          {/* Part 1: stage picker with auto option */}
          <select className="input text-sm" value={selectedStage} onChange={(e) => setSelectedStage(e.target.value as Stage | "auto")}>
            <option value="auto">Auto-detect stage</option>
            <option value="gatekeeper">Gatekeeper (referral ask)</option>
            <option value="pitch">Pitch (personalised)</option>
          </select>
          <button className="btn btn-gold text-sm" onClick={openEnrolConfirm} disabled={enrolling || selectedIds.size === 0}>
            <Send className="w-3.5 h-3.5 mr-1" />
            Preview & Enrol
          </button>
          <button className="btn btn-ghost text-sm" onClick={() => setSelectedIds(new Set())}>Clear</button>
        </div>
      )}

      {enrolResult && (
        <div className="mb-3 p-3 card">
          {enrolResult.enrolled.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-teal mb-2">
              <CheckCircle className="w-4 h-4" />
              {enrolResult.enrolled.length} enrolled
            </div>
          )}
          {enrolResult.skipped.length > 0 && (
            <div>
              <div className="text-sm text-red-400 mb-1 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {enrolResult.skipped.length} skipped
              </div>
              <ul className="text-xs text-muted pl-6 space-y-0.5">
                {enrolResult.skipped.map((s: any) => (
                  <li key={s.prospectId}>
                    <span className="font-medium text-ink">{s.companyName}</span>: {s.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {enrolResult.enrolled.length === 0 && enrolResult.skipped.length === 0 && (
            <div className="text-sm text-muted">No prospects processed.</div>
          )}
          <button className="btn btn-ghost text-xs mt-2" onClick={() => setEnrolResult(null)}>Dismiss</button>
        </div>
      )}

      {view === "today" ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gold mb-2">Follow-ups due</h3>
            {followUps.length === 0
              ? <div className="card p-6 text-center text-muted text-sm">No follow-ups due today.</div>
              : <div className="space-y-2">{followUps.map((p: any) => (
                <ProspectCard key={p.id} p={p} name={name} onOutcome={handleOutcome} onConvert={handleConvert} canConvert={canConvert} />
              ))}</div>
            }
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gold mb-2">Fresh outreach</h3>
            {freshBatch.length === 0
              ? <div className="card p-6 text-center text-muted text-sm">No new prospects in queue.</div>
              : <div className="space-y-2">{freshBatch.map((p: any) => (
                <ProspectCard key={p.id} p={p} name={name} onOutcome={handleOutcome} onConvert={handleConvert} canConvert={canConvert} />
              ))}</div>
            }
            {rows.filter((r: any) => r.status === "new").length > batch && (
              <button className="btn btn-ghost mt-2" onClick={() => setBatch(b => b + 10)}>Show 10 more</button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="card p-3">
            <div className="flex flex-wrap gap-2">
              <select className="input text-xs" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})}>
                <option value="">All cities</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="_other">Other city</option>
              </select>
              <select className="input text-xs" value={filters.industry} onChange={e => setFilters({...filters, industry: e.target.value})}>
                <option value="">All industries</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <select className="input text-xs" value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                <option value="">All statuses</option>
                <option value="new">New</option><option value="contacted">Contacted</option>
                <option value="follow_up">Follow up</option><option value="meeting">Meeting</option>
                <option value="converted">Converted</option><option value="rejected">Rejected</option>
              </select>
              <select className="input text-xs" value={filters.assigned} onChange={e => setFilters({...filters, assigned: e.target.value})}>
                <option value="">All assigned</option>
                {team.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
              </select>
              <input className="input text-xs" placeholder="Search company…" value={filters.search}
                onChange={e => setFilters({...filters, search: e.target.value})} />
            </div>
          </div>
          {filtered.length === 0 ? <Empty text="No prospects match your filters." /> : (
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead><tr>{["","Company","City","Industry","Status","Assigned","Follow-up","Contacted ×","Actions"].map((h, i) => <th key={h} className={`th ${i === 0 ? 'w-8' : ''}`}>{h === '' ? (
                  <input
                    type="checkbox"
                    className="accent-gold"
                    checked={filtered.length > 0 && filtered.every((p: any) => selectedIds.has(p.id))}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(new Set(filtered.map((p: any) => p.id)));
                      else setSelectedIds(new Set());
                    }}
                  />
                ) : h}</th>)}</tr></thead>
                <tbody>
                  {filtered.map((p: any) => (
                    <tr key={p.id} className={`hover:bg-panel2/50 ${selectedIds.has(p.id) ? 'bg-gold/5' : ''}`}>
                      <td className="td">
                        <input
                          type="checkbox"
                          className="accent-gold"
                          checked={selectedIds.has(p.id)}
                          onChange={(e) => {
                            const next = new Set(selectedIds);
                            if (e.target.checked) next.add(p.id);
                            else next.delete(p.id);
                            setSelectedIds(next);
                          }}
                        />
                      </td>
                      <td className="td font-semibold">{p.company_name}</td>
                      <td className="td text-muted text-sm">{p.city || "—"}</td>
                      <td className="td text-muted text-sm">{p.industry}</td>
                      <td className="td"><Badge value={p.status} /></td>
                      <td className="td text-sm">{name(p.assigned_to)}</td>
                      <td className="td text-muted text-sm whitespace-nowrap">{p.follow_up_date || "—"}</td>
                      <td className="td text-sm">{p.contact_count ?? 0}</td>
                      <td className="td">
                        <div className="flex gap-1 items-center">
                          <a href={`https://wa.me/${(p.whatsapp ?? p.phone ?? "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                            className={`p-1 rounded hover:bg-panel2 ${(!p.whatsapp && !p.phone) ? "opacity-30 pointer-events-none" : ""}`}>
                            <MessageCircle className="w-3.5 h-3.5 text-teal" />
                          </a>
                          <a href={`tel:${p.phone}`} className={`p-1 rounded hover:bg-panel2 ${!p.phone ? "opacity-30 pointer-events-none" : ""}`}>
                            <Phone className="w-3.5 h-3.5 text-blue-400" />
                          </a>
                          <a href={`mailto:${p.email}`} className={`p-1 rounded hover:bg-panel2 ${!p.email ? "opacity-30 pointer-events-none" : ""}`}>
                            <Mail className="w-3.5 h-3.5 text-gold" />
                          </a>
                          <select className="bg-ink border border-line rounded px-1 py-0.5 text-xs" defaultValue=""
                            onChange={(e) => {
                              const val = e.target.value;
                              if (!val) return;
                              if (val === "interested") {
                                const d = prompt("Follow-up date (YYYY-MM-DD):", format(addDays(new Date(), 3), "yyyy-MM-dd"));
                                if (!d) return;
                                handleOutcome(p.id, "interested", { follow_up_date: d });
                              } else {
                                handleOutcome(p.id, val);
                              }
                              e.target.value = "";
                            }}>
                            <option value="">Outcome…</option>
                            <option value="no_answer">No answer</option>
                            <option value="interested">Interested</option>
                            <option value="meeting">Meeting booked</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          {canConvert(p) && (
                            <button className="btn btn-gold text-xs py-0.5 px-1.5" onClick={() => handleConvert(p.id)}>Convert</button>
                          )}
                          <button className="btn btn-ghost text-xs py-0.5 px-1" onClick={() => handleEditOpen(p.id)}>
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button className="btn btn-ghost text-xs py-0.5 px-1 text-red-400 hover:text-red-300" onClick={() => openDeleteModal(p.id, p.company_name)}>
                            <Trash2 className="w-3 h-3" />
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
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Part 2 — Add Prospect Modal (expanded)                            */}
      {/* ---------------------------------------------------------------- */}
      {open && (
        <Modal title="Add Prospect" onClose={() => { setOpen(false); setDupWarning(null); setForm({ ...BLANK, city: "Al Khobar" }); }}>
          <form onSubmit={save} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Company name *" full>
              <input className="input" value={form.company_name}
                onChange={(e) => { setForm({ ...form, company_name: e.target.value }); if (form.email?.trim()) checkDuplicates(e.target.value, form.email); }}
                onBlur={(e) => checkDuplicates(e.target.value, form.email ?? "")}
                required />
            </Field>
            <Field label="City">
              <select className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="">Other</option>
              </select>
            </Field>
            <Field label="Industry">
              <select className="input" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="Phone"><input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="WhatsApp"><input className="input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></Field>
            <Field label="Email">
              <input className="input" type="email" value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); checkDuplicates(form.company_name, e.target.value); }}
                onBlur={() => checkDuplicates(form.company_name, form.email ?? "")} />
            </Field>
            <Field label="Website"><input className="input" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></Field>
            <Field label="Instagram"><input className="input" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} /></Field>
            {/* Part 2 new fields */}
            <Field label="Contact name">
              <input className="input" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} placeholder="Full name of the decision-maker" />
            </Field>
            <Field label="Language">
              <select className="input" value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })}>
                <option value="ar">Arabic</option>
                <option value="en">English</option>
              </select>
            </Field>
            <Field label="Personal hook" full>
              <textarea className="input" rows={2} value={form.personal_hook}
                onChange={(e) => setForm({ ...form, personal_hook: e.target.value })}
                placeholder="Why this company? Used in pitch sequence step 1." />
            </Field>
            <Field label="Enrol now" full>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="accent-gold" checked={form.enrol_now}
                  onChange={(e) => setForm({ ...form, enrol_now: e.target.checked })} />
                Enrol immediately after saving
              </label>
              <p className="text-xs text-muted mt-1">
                {form.personal_hook?.trim() && form.contact_name?.trim()
                  ? 'Will route to pitch sequence — personalised outreach to the named contact.'
                  : 'Will route to gatekeeper sequence — referral ask to the general inbox.'}
              </p>
            </Field>
            <Field label="Assigned to" full>
              <select className="input" value={form.assigned_to} onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}>
                <option value="">— unassigned —</option>
                {team.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
              </select>
            </Field>
            <Field label="Notes" full>
              <input className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>

            {/* Duplicate warning */}
            {dupWarning?.company && (
              <div className="sm:col-span-2 p-3 border border-yellow-500/40 rounded-lg bg-yellow-500/10">
                <div className="flex items-start gap-2 text-sm text-yellow-300">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <strong>A company with this name already exists:</strong> {dupWarning.company.company_name}
                    <div className="mt-2 flex gap-2">
                      <button type="button" className="btn btn-gold text-xs"
                        onClick={() => handleUseExistingProspect(dupWarning.company.id)}>Enrol that prospect</button>
                      <button type="button" className="btn btn-ghost text-xs"
                        onClick={() => setDupWarning(null)}>Create anyway</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dupWarning?.contact && (
              <div className="sm:col-span-2 p-3 border border-yellow-500/40 rounded-lg bg-yellow-500/10">
                <div className="flex items-start gap-2 text-sm text-yellow-300">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <strong>This email already belongs to:</strong> {dupWarning.contact.prospects?.company_name ?? 'an existing contact'}
                    <br /><span className="text-yellow-200">{dupWarning.contact.email}</span>
                    <div className="mt-2 flex gap-2">
                      <button type="button" className="btn btn-gold text-xs"
                        onClick={() => handleUseExistingProspect(dupWarning.contact.prospects?.id)}>Enrol that prospect</button>
                      <button type="button" className="btn btn-ghost text-xs"
                        onClick={() => setDupWarning(null)}>Create anyway</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="sm:col-span-2 flex gap-2 justify-end pt-1">
              <button type="button" className="btn btn-ghost" onClick={() => { setOpen(false); setDupWarning(null); setForm({ ...BLANK, city: "Al Khobar" }); }}>Cancel</button>
              <button className="btn btn-gold" type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Save Prospect"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Part 1 — Enrolment Confirmation Dialog                            */}
      {/* ---------------------------------------------------------------- */}
      {confirmOpen && (
        <Modal title="Confirm Enrolment" onClose={() => setConfirmOpen(false)}>
          <div className="space-y-4">
            <p className="text-sm text-muted">
              The following prospects will be enrolled. Review the routing before proceeding.
            </p>
            <div className="space-y-2">
              {routing.map((r: any) => (
                <div key={r.prospectId} className="flex items-start gap-3 p-2 rounded bg-panel2/50 text-sm">
                  <ArrowRight className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{r.companyName}</div>
                    <div className="text-xs text-muted flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${r.stage === 'gatekeeper' ? 'bg-blue-900 text-blue-300' : 'bg-gold/20 text-gold'}`}>
                        {r.stage}
                      </span>
                      <span>{r.lang === 'ar' ? 'Arabic' : 'English'}</span>
                      <span className="text-muted">— {r.reason}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {selectedStage !== "auto" && (
              <p className="text-xs text-muted">
                All prospects are being forced to <strong>{selectedStage}</strong> stage.
                Use "Auto-detect stage" to use the default routing logic.
              </p>
            )}
            <div className="flex gap-2 justify-end border-t border-line pt-4">
              <button className="btn btn-ghost" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={confirmEnrol} disabled={confirmLoading}>
                {confirmLoading ? "Enrolling…" : `Enrol ${selectedIds.size} Prospect${selectedIds.size !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Modal (unchanged) */}
      {editOpen && (
        <Modal title="Edit Prospect" onClose={() => setEditOpen(false)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Company name *" full>
              <input className="input" value={editForm.company_name} onChange={(e) => setEditForm({...editForm, company_name: e.target.value})} required />
            </Field>
            <Field label="City">
              <select className="input" value={editForm.city} onChange={(e) => setEditForm({...editForm, city: e.target.value})}>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="">Other</option>
              </select>
            </Field>
            <Field label="Industry">
              <select className="input" value={editForm.industry} onChange={(e) => setEditForm({...editForm, industry: e.target.value})}>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select className="input" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="follow_up">Follow up</option>
                <option value="meeting">Meeting</option>
                <option value="rejected">Rejected</option>
              </select>
            </Field>
            <Field label="Phone"><input className="input" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} /></Field>
            <Field label="WhatsApp"><input className="input" value={editForm.whatsapp} onChange={(e) => setEditForm({...editForm, whatsapp: e.target.value})} /></Field>
            <Field label="Website"><input className="input" value={editForm.website} onChange={(e) => setEditForm({...editForm, website: e.target.value})} /></Field>
            <Field label="Instagram"><input className="input" value={editForm.instagram} onChange={(e) => setEditForm({...editForm, instagram: e.target.value})} /></Field>
            <Field label="Follow-up date">
              <input className="input" type="date" value={editForm.follow_up_date} onChange={(e) => setEditForm({...editForm, follow_up_date: e.target.value})} />
            </Field>
            <Field label="Assigned to">
              <select className="input" value={editForm.assigned_to} onChange={(e) => setEditForm({...editForm, assigned_to: e.target.value})}>
                <option value="">— unassigned —</option>
                {team.map(t => <option key={t.id} value={t.id}>{t.full_name}</option>)}
              </select>
            </Field>
            <Field label="Notes (current)" full>
              <textarea className="input" rows={3} value={editForm.notes} onChange={(e) => setEditForm({...editForm, notes: e.target.value})} />
            </Field>
            <Field label="Append notes" full>
              <input className="input" placeholder="Add call notes after each contact…" value={editNotesAppend} onChange={(e) => setEditNotesAppend(e.target.value)} />
            </Field>
            <Field label="Personal hook" full>
              <textarea className="input" rows={2} placeholder="Why this person? Used in step 1 of the sequence." value={editForm.personal_hook ?? ""} onChange={(e) => setEditForm({...editForm, personal_hook: e.target.value})} />
            </Field>
            <Field label="Language">
              <select className="input" value={editForm.lang_pref ?? 'ar'} onChange={(e) => setEditForm({...editForm, lang_pref: e.target.value})}>
                <option value="ar">Arabic</option>
                <option value="en">English</option>
              </select>
            </Field>
            <Field label="Hook verified" full>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="accent-gold" checked={!!editForm.hook_verified} onChange={(e) => setEditForm({...editForm, hook_verified: e.target.checked})} />
                Hook has been researched and confirmed
              </label>
            </Field>
          </div>

          <div className="mt-4 border-t border-line pt-4">
            <div className="text-xs font-semibold text-muted mb-2 uppercase tracking-wide">Primary Contact</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Contact name">
                <input className="input" value={editContact?.full_name ?? ""} onChange={(e) => setEditContact({...editContact, full_name: e.target.value})} />
              </Field>
              <Field label="Contact email">
                <input className="input" type="email" value={editContact?.email ?? ""} onChange={(e) => setEditContact({...editContact, email: e.target.value})} />
              </Field>
              <Field label="Contact phone">
                <input className="input" value={editContact?.phone ?? ""} onChange={(e) => setEditContact({...editContact, phone: e.target.value})} />
              </Field>
              <Field label="Contact WhatsApp">
                <input className="input" value={editContact?.whatsapp ?? ""} onChange={(e) => setEditContact({...editContact, whatsapp: e.target.value})} />
              </Field>
            </div>
            {!editContact && (
              <p className="text-xs text-muted mt-2">No contact row yet. Add an email above to create one.</p>
            )}
          </div>

          <div className="sm:col-span-2 flex gap-2 justify-end pt-4 mt-4 border-t border-line">
            <button type="button" className="btn btn-ghost" onClick={() => setEditOpen(false)}>Cancel</button>
            <button className="btn btn-gold" onClick={handleEditSave}>Save Changes</button>
          </div>
        </Modal>
      )}

      {deleteOpen && (
        <Modal title="Delete Prospect" onClose={() => setDeleteOpen(false)}>
          <div className="space-y-4">
            <p className="text-sm">
              Delete <strong>{deleteName}</strong>? This will also delete all contact records,
              enrolment history, and sent emails for this company. <strong>This cannot be undone.</strong>
            </p>
            <div className="flex gap-2 justify-end">
              <button className="btn btn-ghost" onClick={() => setDeleteOpen(false)}>Cancel</button>
              <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => deleteId && handleDeleteConfirm(deleteId, deleteName)}>Delete permanently</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );

  /* ---------------------------------------------------------------- */
  /* CSV import (unchanged from original)                               */
  /* ---------------------------------------------------------------- */
  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split("\n");
      if (!lines.length) return;
      const header = lines[0].split(",").map((h: string) => h.trim().replace(/"/g, ""));
      const expected = ["company_name","city","industry","phone","whatsapp","email","website","notes"];
      if (header.join(",") !== expected.join(",")) {
        alert("Invalid CSV header. Expected: " + expected.join(","));
        return;
      }
      let imported = 0, noEmail = 0, skipped = 0;
      for (let i = 1; i < lines.length; i++) {
        const vals = lines[i].split(",").map((v: string) => v.trim().replace(/"/g, ""));
        if (!vals[0]?.trim()) { skipped++; continue; }
        const email = vals[5]?.trim() || null;
        const row = {
          company_name: vals[0]?.trim() || null,
          city: vals[1]?.trim() || null,
          industry: vals[2]?.trim() || null,
          phone: vals[3]?.trim() || null,
          whatsapp: vals[4]?.trim() || null,
          email,
          website: vals[6]?.trim() || null,
          notes: vals[7]?.trim() || null,
          source: "csv",
          created_by: profile?.id,
        };
        const { data: prospectRow, error } = await supabase.from("prospects").insert(row).select('id').single();
        if (error) { skipped++; continue; }
        if (email) {
          await supabase.from("prospect_contacts").insert({
            prospect_id: prospectRow.id,
            email: email.toLowerCase(),
            full_name: null,
            email_status: 'unverified',
            is_primary: true,
            lang_pref: 'en',
          });
        } else {
          noEmail++;
        }
        imported++;
      }
      alert(`Imported ${imported}${noEmail ? `, ${noEmail} without email` : ''}, skipped ${skipped}.`);
      if (fileRef.current) fileRef.current.value = "";
      load();
    };
    reader.readAsText(file);
  }

  function downloadTemplate() {
    const csv = "company_name,city,industry,phone,whatsapp,email,website,notes\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prospects_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
}

function ProspectCard({ p, name, onOutcome, onConvert, canConvert }: any) {
  return (
    <div className="card p-3 flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{p.company_name}</div>
        <div className="text-xs text-muted">{[p.city, p.industry].filter(Boolean).join(" · ") || "—"}</div>
        <div className="flex gap-1 mt-1.5">
          <a href={`https://wa.me/${(p.whatsapp ?? p.phone ?? "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
            className={`p-1 rounded hover:bg-panel2 ${(!p.whatsapp && !p.phone) ? "opacity-30 pointer-events-none" : ""}`}>
            <MessageCircle className="w-3.5 h-3.5 text-teal" />
          </a>
          <a href={`tel:${p.phone}`} className={`p-1 rounded hover:bg-panel2 ${!p.phone ? "opacity-30 pointer-events-none" : ""}`}>
            <Phone className="w-3.5 h-3.5 text-blue-400" />
          </a>
          <a href={`mailto:${p.email}`} className={`p-1 rounded hover:bg-panel2 ${!p.email ? "opacity-30 pointer-events-none" : ""}`}>
            <Mail className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge value={p.status} />
        {p.follow_up_date && <span className="text-xs text-muted">{p.follow_up_date}</span>}
        <select className="bg-ink border border-line rounded px-1 py-0.5 text-xs" defaultValue=""
          onChange={(e) => {
            const val = e.target.value;
            if (!val) return;
            if (val === "interested") {
              const d = prompt("Follow-up date (YYYY-MM-DD):", format(addDays(new Date(), 3), "yyyy-MM-dd"));
              if (!d) return;
              onOutcome(p.id, "interested", { follow_up_date: d });
            } else {
              onOutcome(p.id, val);
            }
            e.target.value = "";
          }}>
          <option value="">Outcome…</option>
          <option value="no_answer">No answer</option>
          <option value="interested">Interested</option>
          <option value="meeting">Meeting booked</option>
          <option value="rejected">Rejected</option>
        </select>
        {canConvert(p) && (
          <button className="btn btn-gold text-xs py-0.5 px-1.5" onClick={() => onConvert(p.id)}>Convert</button>
        )}
      </div>
    </div>
  );
}
