-- Outbound fixes: C (auto-enrol), D (bounce), E (Dossary unsubscribe scanner)
-- Safe to apply independently of v11_retainers_invoicing.sql

-- =====================================================================
-- C: prospects.social_only — flags rows whose website is a social profile
-- (instagram.com / linktr.ee / facebook.com) rather than a real website.
-- These are still inserted as prospects but enrichment skips them fast
-- and they do not count toward with_email targets.
-- =====================================================================
alter table prospects
  add column social_only boolean default false;

create index if not exists prospects_social_only_idx
  on prospects (social_only)
  where social_only = true;

-- =====================================================================
-- E: unsubscribe_hits — logs every hit to /u/[id] so link-scanner
-- traffic from corporate email security gateways is visible.
-- =====================================================================
create table if not exists unsubscribe_hits (
  id          uuid    default gen_random_uuid() primary key,
  enrolment_id uuid   not null references sequence_enrolments(id) on delete cascade,
  method      text   not check (method in ('GET', 'POST', 'HEAD')),
  user_agent  text,
  ip          text,
  hit_at      timestamptz default now() not null
);

create index if not exists unsubscribe_hits_enrolment_idx
  on unsubscribe_hits (enrolment_id);

create index if not exists unsubscribe_hits_hit_at_idx
  on unsubscribe_hits (hit_at);

-- =====================================================================
-- E: stopped_reason values — record how the unsubscribe was triggered
-- so link-scanner events can be distinguished from real opt-outs.
-- =====================================================================
-- Valid stopped_reason values for sequence_enrolments (no enum needed —
-- free text with documented values; RLS prevents writes from anon/auth):
--   confirm_page    — human clicked the POST button on the confirm page
--   one_click_header — Gmail one-click via List-Unsubscribe-Post header
--   legacy_get      — the old GET-to-unsubscribe behaviour (deprecated;
--                       kept so existing rows are readable)
--   hard_bounce     — bounce detection (existing)
--   missing_hook    — sender.ts stopped (existing)
--   unsubscribed    — sender.ts stopped (existing)
--   suppressed      — sender.ts stopped (existing)
--   reply_received  — replies.ts stopped (existing)
-- No schema change required; the column already exists.
-- The new values are documented here so future readers understand them.
-- =====================================================================
-- No column/table alter needed; just a comment for docs:
comment on column sequence_enrolments.stopped_reason is
  'One of: confirm_page, one_click_header, legacy_get, hard_bounce, missing_hook, unsubscribed, suppressed, reply_received, already_active, enrolled_in_both_sequences, address_bounced, no_contact_email, already_unsubscribed, sequence_not_found, missing_personal_hook, no_email';
