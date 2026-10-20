-- ============================================================
-- Studio OS — Migration v9
-- Outbound prospecting: enrichment, sequences, sends, suppression
--
-- RUN ORDER: apply AFTER v5, v7, v8 are executed.
-- Run this in the Supabase SQL editor (dashboard) only.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Extend the existing prospects table with enrichment fields
--    (additive only — nothing dropped, nothing renamed)
-- ------------------------------------------------------------

alter table public.prospects
  add column if not exists source              text,           -- 'google_places' | 'manual' | 'csv' | 'referral'
  add column if not exists source_ref          text,           -- google place_id, etc.
  add column if not exists vertical            text,           -- 'real_estate' | 'healthcare' | 'fnb' | 'contracting' | 'hospitality' | 'education'
  add column if not exists city                text,
  add column if not exists country             text default 'SA',
  add column if not exists website             text,
  add column if not exists phone               text,
  add column if not exists lang_pref           text default 'ar'
    check (lang_pref in ('ar','en')),
  add column if not exists lang_confidence     text default 'guess'
    check (lang_confidence in ('guess','verified')),

  -- signals used for scoring + personalisation
  add column if not exists rating              numeric(2,1),
  add column if not exists rating_count        integer,
  add column if not exists has_video           boolean,        -- do they already publish video?
  add column if not exists video_quality       text            -- 'none' | 'poor' | 'ok' | 'strong'
    check (video_quality in ('none','poor','ok','strong')),
  add column if not exists named_assets        text[],         -- e.g. project names, branch names, flagship products
  add column if not exists personal_hook       text,           -- ONE specific observation. Never generic.
  add column if not exists hook_verified       boolean default false,

  add column if not exists score               integer default 0,
  add column if not exists score_breakdown     jsonb,

  -- PDPL / deliverability compliance
  add column if not exists consent_basis       text default 'legitimate_business'
    check (consent_basis in ('legitimate_business','opt_in','referral')),
  add column if not exists unsubscribed_at     timestamptz,
  add column if not exists bounced_at          timestamptz,
  add column if not exists complained_at       timestamptz;

create index if not exists prospects_score_idx      on public.prospects (score desc);
create index if not exists prospects_vertical_idx   on public.prospects (vertical);
create index if not exists prospects_city_idx       on public.prospects (city);
create unique index if not exists prospects_source_ref_uidx
  on public.prospects (source_ref) where source_ref is not null;

-- ------------------------------------------------------------
-- 2. Contacts — a prospect (company) can have several people.
--    Business contacts only. No personal mobiles. PDPL.
-- ------------------------------------------------------------

create table if not exists public.prospect_contacts (
  id            uuid primary key default gen_random_uuid(),
  prospect_id   uuid not null references public.prospects(id) on delete cascade,
  full_name     text,
  role_title    text,
  email         text,
  email_status  text default 'unverified'
    check (email_status in ('unverified','valid','risky','invalid')),
  whatsapp      text,               -- business line only; manual send
  lang_pref     text default 'ar' check (lang_pref in ('ar','en')),
  is_primary    boolean default false,
  created_at    timestamptz default now()
);

create index if not exists prospect_contacts_prospect_idx
  on public.prospect_contacts (prospect_id);
create unique index if not exists prospect_contacts_email_uidx
  on public.prospect_contacts (lower(email)) where email is not null;

-- ------------------------------------------------------------
-- 3. Sequences — the ladder definition
-- ------------------------------------------------------------

create table if not exists public.sequences (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  vertical      text,               -- null = applies to all
  lang          text not null check (lang in ('ar','en')),
  is_active     boolean default true,
  created_at    timestamptz default now()
);

create table if not exists public.sequence_steps (
  id            uuid primary key default gen_random_uuid(),
  sequence_id   uuid not null references public.sequences(id) on delete cascade,
  step_number   integer not null,
  delay_days    integer not null,   -- days after enrolment
  channel       text not null check (channel in ('email','whatsapp_manual')),
  subject       text,               -- email only
  body          text not null,      -- supports {{first_name}} {{company}} {{hook}} {{city}}
  created_at    timestamptz default now(),
  unique (sequence_id, step_number)
);

-- ------------------------------------------------------------
-- 4. Enrolments — a prospect walking through a sequence
-- ------------------------------------------------------------

create table if not exists public.sequence_enrolments (
  id               uuid primary key default gen_random_uuid(),
  prospect_id      uuid not null references public.prospects(id) on delete cascade,
  contact_id       uuid references public.prospect_contacts(id) on delete set null,
  sequence_id      uuid not null references public.sequences(id),
  status           text not null default 'active'
    check (status in ('active','replied','completed','stopped','bounced','unsubscribed')),
  current_step     integer default 0,
  enrolled_at      timestamptz default now(),
  next_send_at     timestamptz,
  stopped_at       timestamptz,
  stopped_reason   text,
  unique (prospect_id, sequence_id)
);

create index if not exists enrolments_due_idx
  on public.sequence_enrolments (next_send_at)
  where status = 'active';

-- ------------------------------------------------------------
-- 5. Sends — immutable log of everything that went out
-- ------------------------------------------------------------

create table if not exists public.sequence_sends (
  id             uuid primary key default gen_random_uuid(),
  enrolment_id   uuid not null references public.sequence_enrolments(id) on delete cascade,
  step_number    integer not null,
  channel        text not null,
  to_email       text,
  subject        text,
  body           text,
  provider_id    text,              -- Resend message id
  status         text default 'queued'
    check (status in ('queued','sent','delivered','bounced','complained','failed')),
  sent_at        timestamptz,
  replied_at     timestamptz,
  error          text,
  created_at     timestamptz default now()
);

create index if not exists sends_enrolment_idx on public.sequence_sends (enrolment_id);
create index if not exists sends_status_idx    on public.sequence_sends (status);

-- ------------------------------------------------------------
-- 6. Suppression list — never contact again. Checked before EVERY send.
-- ------------------------------------------------------------

create table if not exists public.suppression_list (
  id          uuid primary key default gen_random_uuid(),
  email       text,
  domain      text,
  reason      text not null,        -- 'unsubscribed' | 'complained' | 'hard_bounce' | 'manual' | 'client'
  created_at  timestamptz default now()
);

create unique index if not exists suppression_email_uidx
  on public.suppression_list (lower(email)) where email is not null;
create unique index if not exists suppression_domain_uidx
  on public.suppression_list (lower(domain)) where domain is not null;

-- ------------------------------------------------------------
-- 7. Guard: stop a sequence the moment a reply is logged
-- ------------------------------------------------------------

create or replace function public.halt_sequence_on_reply()
returns trigger
language plpgsql
as $$
begin
  if new.replied_at is not null and old.replied_at is null then
    update public.sequence_enrolments
       set status         = 'replied',
           stopped_at     = now(),
           stopped_reason = 'reply_received',
           next_send_at   = null
     where id = new.enrolment_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_halt_sequence_on_reply on public.sequence_sends;
create trigger trg_halt_sequence_on_reply
  after update on public.sequence_sends
  for each row
  execute function public.halt_sequence_on_reply();

-- ------------------------------------------------------------
-- 8. RLS — match the existing Studio OS posture
-- ------------------------------------------------------------

alter table public.prospect_contacts   enable row level security;
alter table public.sequences           enable row level security;
alter table public.sequence_steps      enable row level security;
alter table public.sequence_enrolments enable row level security;
alter table public.sequence_sends      enable row level security;
alter table public.suppression_list    enable row level security;

-- NOTE: policies intentionally left out of this migration.
-- Mirror whatever policy pattern v7 used on public.prospects,
-- then apply the same to these six tables in a follow-up.
