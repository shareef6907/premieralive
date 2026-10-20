"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PageHead, Badge } from "@/components/ui";
import { MessageSquare, CheckCircle, Clock, UserPlus, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

/* ------------------------------------------------------------------ */
/* Email extraction                                                       */
/* ------------------------------------------------------------------ */

const PREMIERA_domains = ['premieralive.co', 'premieralive.com'];
const NO_REPLY_PATTERNS = ['noreply', 'no-reply', 'donotreply', 'mailer-daemon', 'postmaster'];

function isExcluded(email: string): boolean {
  const local = email.split('@')[0]?.toLowerCase() ?? '';
  if (NO_REPLY_PATTERNS.some((p) => local.startsWith(p))) return true;
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  if (PREMIERA_domains.includes(domain)) return true;
  return false;
}

/** Pull email candidates outside quoted blocks only. */
function extractEmails(text: string): string[] {
  if (!text) return [];
  // Strip quoted sections (lines starting with >) before scanning
  const unquoted = text.split('\n').filter((l) => !l.trimStart().startsWith('>')).join('\n');
  const pat = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
  const found = (unquoted.match(pat) ?? []).map((e) => e.toLowerCase());
  return [...new Set(found)].filter((e) => !isExcluded(e));
}

/** Attempt to find a name-like token within ~40 chars before the email. */
function extractNameHint(email: string, text: string): string {
  const idx = text.toLowerCase().indexOf(email.toLowerCase());
  if (idx < 0) return '';
  const before = text.slice(Math.max(0, idx - 45), idx).trim();
  const words = before.split(/\s+/).filter(Boolean);
  for (let i = words.length - 1; i >= 0; i--) {
    const w = words[i].replace(/[.,;:]$/, '');
    if (w.length >= 2 && /[a-zA-Z\u0600-\u06FF]/.test(w)) return w;
  }
  return '';
}

/** Pull Saudi/local mobile phone candidates from unquoted text. */
function extractPhoneNumbers(text: string): string[] {
  if (!text) return [];
  const unquoted = text.split('\n').filter((l) => !l.trimStart().startsWith('>')).join('\n');
  // International: +966 5x, 05x; local: 05x with optional spaces/dashes
  const pat = /(?:\+966|0?5[0-9])[ -\d]{7,9}/g;
  const found = (unquoted.match(pat) ?? []) as string[];
  return [...new Set(found.map((p) => p.replace(/\s+/g, '').trim()))];
}

/** Parse "Name <email>" or bare email from the subject line (reply subject carries this). */
function parseFromSubject(subject: string): { name: string; email: string } | null {
  if (!subject) return null;
  // e.g. "Re: Banoon Dawood <b.dawood@thgsaudi.com>"
  const m = subject.match(/([^.@<\s]+(?:\s+[^\s@]+)?)\s*<([^>]+)>/);
  if (m) {
    return { name: m[1].trim(), email: m[2].trim().toLowerCase() };
  }
  // bare email
  const bare = subject.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  if (bare) return { name: '', email: bare[0].toLowerCase() };
  return null;
}

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

interface ReplyRow {
  id: string;
  replied_at: string;
  reply_snippet: string | null;
  subject: string | null;
  contact_email: string;
  step_number: number;
  sequence_id: string;
  sequence: {
    lang: string | null;
    stage: string | null;
  };
  prospect: {
    id?: string;
    company_name: string;
    vertical: string | null;
    personal_hook?: string | null;
    lang_pref?: string | null;
  };
  contact: {
    id?: string;
    full_name: string | null;
    email: string;
  } | null;
  // From header — the person who replied (may differ from enrolled contact)
  from_name?: string | null;
  from_email?: string | null;
  phones?: string[];
}

interface ExtractedEmail {
  email: string;
  name_hint: string;
  hook: string;
  lang: string;
  outcome: string | null;       // inline result message
  outcomeType: "success" | "error" | null;
  dismissed: boolean;            // card collapsed after outcome
}

/* ------------------------------------------------------------------ */
/* Sub-component: extraction card                                         */
/* ------------------------------------------------------------------ */

function ExtractionCard({
  reply,
  onUpdate,
}: {
  reply: ReplyRow;
  onUpdate: (id: string, updated: Partial<ReplyRow>) => void;
}) {
  const [cards, setCards] = useState<ExtractedEmail[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const emails = extractEmails(reply.reply_snippet ?? '');
    if (!emails.length) return;

    // Filter out addresses already linked to this prospect
    (async () => {
      const { data: existing } = await supabase
        .from('prospect_contacts')
        .select('email')
        .eq('prospect_id', reply.prospect.id ?? '');
      const existingEmails = new Set((existing ?? []).map((c: any) => c.email?.toLowerCase()));
      const unique = emails.filter((e) => !existingEmails.has(e));

      setCards(
        unique.map((email) => ({
          email,
          name_hint: extractNameHint(email, reply.reply_snippet ?? ''),
          hook: '',
          lang: reply.prospect.lang_pref ?? 'ar',
          outcome: null,
          outcomeType: null,
          dismissed: false,
        }))
      );
    })();
  }, [reply.reply_snippet, reply.prospect.id]);

  function updateCard(email: string, patch: Partial<ExtractedEmail>) {
    setCards((prev) => prev.map((c) => (c.email === email ? { ...c, ...patch } : c)));
  }

  async function handleEnrol(email: string) {
    setLoading((prev) => ({ ...prev, [email]: true }));
    const card = cards.find((c) => c.email === email);
    if (!card) return;

    try {
      const prospectId = reply.prospect.id ?? '';
      const lang = card.lang ?? 'ar';

      // 1. Upsert contact (is_primary = false — gatekeeper address stays primary)
      const { error: contactErr } = await supabase
        .from('prospect_contacts')
        .upsert(
          {
            prospect_id: prospectId,
            email: email.toLowerCase(),
            full_name: card.name_hint || null,
            email_status: 'unverified',
            is_primary: false,
            lang_pref: lang,
          },
          { onConflict: 'email', ignoreDuplicates: true }
        );

      if (contactErr) throw new Error('Contact: ' + contactErr.message);

      // 2. Set hook on prospect if it is empty
      if (!reply.prospect.personal_hook?.trim() && card.hook.trim()) {
        await supabase
          .from('prospects')
          .update({ personal_hook: card.hook.trim() })
          .eq('id', prospectId);
      }

      // 3. Enrol in pitch sequence
      const { defaultStage, enrolMany } = await import('@/lib/outbound/enrol');
      const { ENGLISH_SEQUENCE_ID, ARABIC_SEQUENCE_ID } = await import('@/lib/outbound/constants');
      const sequenceId = lang === 'ar' ? ARABIC_SEQUENCE_ID : ENGLISH_SEQUENCE_ID;
      const stage = await defaultStage(prospectId, card.hook.trim() || null);
      const result = await enrolMany([prospectId], stage, sequenceId, false);

      if (result.enrolled.length > 0) {
        updateCard(email, {
          outcome: `Enrolled in ${lang === 'ar' ? 'Arabic' : 'English'} pitch sequence.`,
          outcomeType: 'success',
        });
        onUpdate(reply.id, {});
      } else {
        updateCard(email, {
          outcome: result.skipped[0]?.reason ?? 'Skipped — check enrolment.',
          outcomeType: 'error',
        });
      }
    } catch (err: any) {
      updateCard(email, { outcome: err.message, outcomeType: 'error' });
    } finally {
      setLoading((prev) => ({ ...prev, [email]: false }));
    }
  }

  if (!cards.length) return null;

  return (
    <div className="mt-3 space-y-2">
      {cards.map((card) => {
        if (card.dismissed) return null;
        const isLoading = loading[card.email];
        return (
          <div key={card.email} className="border border-gold/30 rounded-lg p-3 bg-gold/5 text-sm">
            {/* Email + collapse toggle */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-xs">
                <UserPlus className="w-3.5 h-3.5 text-gold" />
                <span className="font-mono text-gold">{card.email}</span>
              </div>
              <button
                className="text-muted hover:text-white"
                onClick={() =>
                  setCollapsed((p) => ({ ...p, [card.email]: !p[card.email] }))
                }
              >
                {collapsed[card.email] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Outcome banner */}
            {card.outcome && (
              <div
                className={`mb-2 px-2 py-1 rounded text-xs ${
                  card.outcomeType === 'success'
                    ? 'bg-green-900/40 text-green-300'
                    : 'bg-red-900/40 text-red-300'
                }`}
              >
                {card.outcome}
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[10px] text-muted mb-2 italic">
              Extraction is a suggestion — Shareef reviews before clicking.
            </p>

            {/* Fields (hidden when collapsed) */}
            {!collapsed[card.email] && (
              <>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="text-[10px] text-muted block mb-0.5">Name hint</label>
                    <input
                      className="input text-xs py-1"
                      value={card.name_hint}
                      onChange={(e) => updateCard(card.email, { name_hint: e.target.value })}
                      placeholder="e.g. Ahmed"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted block mb-0.5">Language</label>
                    <select
                      className="input text-xs py-1"
                      value={card.lang}
                      onChange={(e) => updateCard(card.email, { lang: e.target.value })}
                    >
                      <option value="ar">Arabic</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="text-[10px] text-muted block mb-0.5">
                    Personal hook{" "}
                    <span className="text-red-400">(required for pitch)</span>
                  </label>
                  <textarea
                    className="input text-xs py-1"
                    rows={2}
                    value={card.hook}
                    onChange={(e) => updateCard(card.email, { hook: e.target.value })}
                    placeholder="Why this person? Paste or summarise what they do."
                  />
                </div>
                <button
                  className="btn btn-gold text-xs w-full"
                  disabled={isLoading || !card.hook.trim()}
                  onClick={() => handleEnrol(card.email)}
                >
                  {isLoading ? 'Enrolling…' : 'Add contact and enrol in pitch'}
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                             */
/* ------------------------------------------------------------------ */

export default function RepliesPage() {
  const [rows, setRows] = useState<ReplyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('sequence_sends')
      .select(`
        id, replied_at, reply_snippet, subject, to_email, step_number,
        enrolment:sequence_enrolments!enrolment_id (
          id,
          sequence:sequences!sequence_id ( lang, requires_hook ),
          prospect:prospects!prospect_id ( id, company_name, vertical, personal_hook, lang_pref ),
          contact:prospect_contacts!contact_id ( full_name, email )
        )
      `)
      .not('replied_at', 'is', null)
      .order('replied_at', { ascending: false });

    if (error) {
      console.error('[replies load]', error);
      setRows([]);
    } else {
      const flat: ReplyRow[] = (data ?? []).map((r: any) => ({
        id: r.id,
        replied_at: r.replied_at,
        reply_snippet: r.reply_snippet ?? '',
        subject: r.subject,
        contact_email: r.to_email ?? '',
        step_number: r.step_number,
        sequence_id: r.enrolment?.sequence?.id ?? null,
        sequence: {
          lang: r.enrolment?.sequence?.lang ?? null,
          stage: r.enrolment?.sequence?.requires_hook === false ? 'gatekeeper' : 'pitch',
        },
        prospect: r.enrolment?.prospect ?? { company_name: '—', vertical: null },
        contact: r.enrolment?.contact ?? null,
        ...(() => {
          const parsed = parseFromSubject(r.subject ?? '');
          return {
            from_name: parsed?.name ?? null,
            from_email: parsed?.email ?? null,
          };
        })(),
        phones: extractPhoneNumbers(r.reply_snippet ?? ''),
      }));
      setRows(flat);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function handleDismiss(id: string) {
    setDismissed((prev) => new Set([...prev, id]));
  }

  function handleRowUpdate(id: string, _updated: Partial<ReplyRow>) {
    load();
  }

  const visible = rows.filter((r) => !dismissed.has(r.id));
  const replyWord = visible.length === 1 ? 'reply' : 'replies';

  return (
    <div>
      <PageHead
        title="Replies"
        sub={`${visible.length} ${replyWord} received`}
      />

      {loading && (
        <div className="text-center text-muted py-16 text-sm">Loading…</div>
      )}

      {!loading && visible.length === 0 && (
        <div className="text-center text-muted py-16">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No replies received yet.</p>
          <p className="text-xs mt-1">Replies appear here when prospects respond to an outbound email.</p>
        </div>
      )}

      {!loading && visible.length > 0 && (
        <div className="space-y-3">
          {visible.map((r) => (
            <div key={r.id} className="card p-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{r.prospect.company_name}</span>
                    {r.prospect.vertical && <Badge value={r.prospect.vertical} />}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    {r.contact?.full_name ?? r.contact_email}
                    {r.contact?.full_name && r.contact?.email !== r.contact_email && (
                      <span className="text-muted/60"> · {r.contact.email}</span>
                    )}
                  </div>
                </div>

                {/* Sequence badge */}
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.sequence?.stage === 'gatekeeper'
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-gold/20 text-gold'
                    }`}
                  >
                    {r.sequence?.stage ?? 'pitch'}
                  </span>
                  <span className="text-[10px] text-muted">
                    {r.sequence?.lang === 'ar' ? 'Arabic' : 'English'} · step {r.step_number}
                  </span>
                </div>
              </div>

              {/* Reply meta */}
              <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
                <Clock className="w-3 h-3" />
                <span>
                  {formatDistanceToNow(new Date(r.replied_at), {
                    addSuffix: true,
                    locale: r.sequence?.lang === 'ar' ? ar : undefined,
                  })}
                </span>
              </div>

              {/* Reply snippet */}
              {r.reply_snippet ? (
                <blockquote
                  className={`text-sm leading-relaxed px-3 border-l-2 border-gold/40 ${
                    r.sequence?.lang === 'ar' ? 'text-right font-["Noto_Sans_Arabic"] dir-rtl' : ''
                  }`}
                >
                  {r.reply_snippet}
                </blockquote>
              ) : (
                <p className="text-sm text-muted italic">(no reply text captured)</p>
              )}

              {/* From-header contact section — shown when reply has no linked contact */}
              {r.sequence?.stage === 'gatekeeper' && r.from_email && (
                <div className="mt-3 p-3 border border-gold/40 rounded-lg bg-gold/5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-[10px] text-gold font-bold uppercase mb-1">Replier — From Header</p>
                      <p className="text-sm font-medium">{r.from_name ?? '—'}</p>
                      <p className="text-xs text-gold/80 font-mono">{r.from_email}</p>
                      {r.phones && r.phones.length > 0 && (
                        <p className="text-xs text-muted mt-1">
                          Phone: {r.phones.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-gold text-xs"
                      onClick={async () => {
                        const { error } = await supabase
                          .from('prospect_contacts')
                          .upsert({
                            prospect_id: r.prospect.id ?? '',
                            email: r.from_email ?? '',
                            full_name: r.from_name ?? null,
                            email_status: 'unverified',
                            is_primary: false,
                            lang_pref: r.prospect.lang_pref ?? 'ar',
                          }, { onConflict: 'email', ignoreDuplicates: true });
                        if (!error) {
                          // Stop gatekeeper if active
                          await supabase
                            .from('sequence_enrolments')
                            .update({ status: 'stopped', stopped_reason: 'reply_received', stopped_at: new Date().toISOString() })
                            .eq('prospect_id', r.prospect.id ?? '')
                            .eq('status', 'active');
                          load();
                        }
                      }}
                    >
                      Add as contact
                    </button>
                    <button
                      className="btn btn-outline-gold text-xs"
                      onClick={async () => {
                        const { ENGLISH_SEQUENCE_ID, ARABIC_SEQUENCE_ID } = await import('@/lib/outbound/constants');
                        const { defaultStage, enrolMany } = await import('@/lib/outbound/enrol');
                        const seqId = (r.prospect.lang_pref ?? 'ar') === 'ar' ? ARABIC_SEQUENCE_ID : ENGLISH_SEQUENCE_ID;
                        const stage = await defaultStage(r.prospect.id ?? '', null);
                        await enrolMany([r.prospect.id ?? ''], stage, seqId, false);
                        load();
                      }}
                    >
                      Enrol in pitch
                    </button>
                  </div>
                </div>
              )}

              {/* Email extraction card — gatekeeper replies with body emails */}
              {r.sequence?.stage === 'gatekeeper' && (
                <ExtractionCard reply={r} onUpdate={handleRowUpdate} />
              )}

              {/* Actions */}
              <div className="flex items-center justify-end mt-3 pt-3 border-t border-line/50">
                <button
                  className="btn btn-ghost text-xs flex items-center gap-1.5"
                  onClick={() => handleDismiss(r.id)}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Mark handled
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {visible.length > 0 && (
        <p className="text-xs text-muted/60 mt-4 text-center">
          Handled state is client-side only. A <code>sequence_sends.handled_at</code> column
          (future migration) is needed for persistence.
        </p>
      )}
    </div>
  );
}
