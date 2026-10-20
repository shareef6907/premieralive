-- Phase 15: Proposals & Invoices
-- Migration v10_proposals.sql
-- Run in Supabase SQL Editor before deploying Phase 15.

BEGIN;

-- =====================================================================
-- 1. DOCUMENTS TABLE
-- =====================================================================
create table documents (
  id uuid primary key default gen_random_uuid(),
  doc_number text unique not null,
  doc_type text not null check (doc_type in ('quote', 'proposal', 'invoice')),
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'accepted', 'declined', 'superseded', 'void')),
  parent_id uuid references documents(id),
  client_name text not null,
  client_address text,
  client_email text,
  client_phone text,
  prospect_id uuid references prospects(id),
  line_items jsonb not null,
  subtotal numeric(12,2) not null,
  discount_pct numeric(5,2) not null default 0
    check (discount_pct >= 0 and discount_pct <= 35),
    check (doc_type <> 'invoice' or discount_pct = 0),
  discount_amount numeric(12,2) not null default 0,
  total numeric(12,2) not null,
  currency text not null default 'SAR',
  payment_terms text not null default '50% upfront upon confirmation, 50% on completion/delivery',
  notes text,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =====================================================================
-- 2. DOCUMENT APPROVALS TABLE (invoice gate)
-- =====================================================================
create table document_approvals (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id),
  requested_by text not null,
  requested_at timestamptz not null default now(),
  decided_by text,
  decided_at timestamptz,
  decision text check (decision in ('approved', 'rejected'))
);

-- =====================================================================
-- 3. NUMBERING SEQUENCE (per-series per-year; no max()+1 race)
-- =====================================================================
create sequence doc_quote_proposal_seq;
create sequence doc_invoice_seq;

create or replace function next_doc_number(p_doc_type text)
returns text language plpgsql as $$
DECLARE
  prefix   text;
  seq      regclass;
  seq_val  bigint;
  yr       int := extract(year from now())::int;
BEGIN
  if p_doc_type = 'invoice' then
    prefix := 'PL-INV';
    seq    := 'doc_invoice_seq';
  else
    prefix := 'PL-P';
    seq    := 'doc_quote_proposal_seq';
  end if;
  select nextval(seq) into seq_val;
  return format('%s-%s-%s', prefix, yr, lpad(seq_val::text, 3, '0'));
END;
$$;

-- =====================================================================
-- 4. AUTO-UPDATE updated_at
-- =====================================================================
create or replace function documents_updated_at()
returns trigger language plpgsql as $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

create trigger documents_updated_at
  before update on documents
  for each row execute function documents_updated_at();

-- =====================================================================
-- 5. IMMUTABILITY TRIGGER
--
-- WHEN clause fires only for rows where OLD.status <> 'draft'.
-- Within that scope:
--   - Financial/content fields and client_* fields are permanently frozen.
--   - Status transitions are allowed only via the whitelist below.
-- =====================================================================
create or replace function documents_immutable()
returns trigger language plpgsql as $$
DECLARE
  allowed bool := false;
BEGIN
  -- Frozen financial/content fields may never change once non-draft.
  if OLD.line_items      is distinct from NEW.line_items      or
     OLD.subtotal        is distinct from NEW.subtotal        or
     OLD.discount_pct    is distinct from NEW.discount_pct    or
     OLD.discount_amount is distinct from NEW.discount_amount or
     OLD.total           is distinct from NEW.total           or
     OLD.client_name     is distinct from NEW.client_name     or
     OLD.client_address  is distinct from NEW.client_address  or
     OLD.client_email    is distinct from NEW.client_email    or
     OLD.client_phone    is distinct from NEW.client_phone
  then
    raise exception 'Cannot modify frozen document fields (id %)', OLD.id
      using errcode = '23P01';
  end if;

  -- Allowed status transitions for non-draft rows.
  if OLD.status = 'sent'       and NEW.status = 'sent'       then allowed := true; end if;
  if OLD.status = 'sent'       and NEW.status = 'accepted'   then allowed := true; end if;
  if OLD.status = 'sent'       and NEW.status = 'declined'   then allowed := true; end if;
  if OLD.status = 'sent'       and NEW.status = 'superseded' then allowed := true; end if;
  if OLD.status = 'sent'       and NEW.status = 'void'        then allowed := true; end if;
  if OLD.status = 'accepted'   and NEW.status = 'accepted'   then allowed := true; end if;
  if OLD.status = 'accepted'   and NEW.status = 'superseded' then allowed := true; end if;
  if OLD.status = 'accepted'   and NEW.status = 'void'        then allowed := true; end if;
  if OLD.status = 'declined'   and NEW.status = 'declined'   then allowed := true; end if;
  if OLD.status = 'declined'   and NEW.status = 'void'        then allowed := true; end if;
  if OLD.status = 'superseded' and NEW.status = 'superseded' then allowed := true; end if;
  if OLD.status = 'superseded' and NEW.status = 'void'        then allowed := true; end if;
  if OLD.status = 'void'       and NEW.status = 'void'        then allowed := true; end if;

  if not allowed then
    raise exception 'Invalid status transition % → % on document id %',
      OLD.status, NEW.status, OLD.id
      using errcode = '23P01';
  end if;

  RETURN NEW;
END;
$$;

create trigger documents_immutable
  before update on documents
  for each row
  when (OLD.status <> 'draft')
  execute function documents_immutable();

-- =====================================================================
-- 6. DENY DELETE (BEFORE trigger — unconditional exception)
-- =====================================================================
create or replace function documents_no_delete()
returns trigger language plpgsql as $$
BEGIN
  raise exception 'Documents may not be deleted; void the row instead (id %).', OLD.id
    using errcode = '23P01';
END;
$$;

create trigger documents_no_delete
  before delete on documents
  for each row execute function documents_no_delete();

-- =====================================================================
-- 7. RLS
-- =====================================================================
alter table documents enable row level security;
alter table document_approvals enable row level security;

create policy "documents_read_all"    on documents for select to authenticated using (true);
create policy "documents_insert"      on documents for insert to authenticated with check (true);
create policy "documents_update"      on documents for update to authenticated using (true);
create policy "documents_deny_delete" on documents for delete to authenticated using (false);

create policy "approvals_read_all" on document_approvals for select to authenticated using (true);
create policy "approvals_insert"   on document_approvals for insert to authenticated with check (true);
create policy "approvals_update"   on document_approvals for update to authenticated using (true)
  with check (decision is not null);

-- =====================================================================
-- 8. RATE CARD TABLE (structure only — seed values in section 9)
-- =====================================================================
create table rate_card (
  id            uuid primary key default gen_random_uuid(),
  service_key   text unique not null,
  name          text not null,
  category      text not null check (category in ('media', 'website')),
  default_price numeric(12,2) not null,
  price_min     numeric(12,2) not null,
  price_max     numeric(12,2) not null,
  unit          text not null
);

-- =====================================================================
-- 9. RATE CARD SEED — 16 services (8 media, 8 website)
--
-- MEDIA (8):
--   commercial_film         — Commercial Film Production
--   corporate_video         — Corporate Video
--   professional_photography— Professional Photography
--   animation_cgi           — Animation / CGI
--   documentary             — Documentary Production
--   event_coverage         — Event Coverage
--   multi_cam_streaming     — Multi-Cam Live Streaming
--   podcast                 — Podcast Production
--
-- WEBSITE (8):
--   business_website        — Business Website
--   app_dev                 — App Development
--   landing_page           — Landing Page
--   booking_system          — Booking System
--   business_platform      — Business Platform
--   client_portal          — Client Portal
--   ai_automation         — AI Assistants / Automation
--   website_maintenance    — Website Maintenance
--
-- REVIEW BEFORE RUNNING: replace every 0.00 below with the actual price
-- agreed with Premiera Live.  Do not apply this block until all 17 rows
-- (16 services + the insert statement) have been verified line by line.
-- =====================================================================
--
-- insert into rate_card (service_key, name, category, default_price, price_min, price_max, unit) values
--   ('commercial_film',          'Commercial Film Production',      'media',    0.00, 0.00, 0.00, 'project'),
--   ('corporate_video',          'Corporate Video',                'media',    0.00, 0.00, 0.00, 'project'),
--   ('professional_photography',  'Professional Photography',       'media',    0.00, 0.00, 0.00, 'session'),
--   ('animation_cgi',             'Animation / CGI',               'media',    0.00, 0.00, 0.00, 'project'),
--   ('documentary',              'Documentary Production',        'media',    0.00, 0.00, 0.00, 'project'),
--   ('event_coverage',            'Event Coverage',                'media',    0.00, 0.00, 0.00, 'event'),
--   ('multi_cam_streaming',      'Multi-Cam Live Streaming',       'media',    0.00, 0.00, 0.00, 'event'),
--   ('podcast',                  'Podcast Production',             'media',    0.00, 0.00, 0.00, 'episode'),
--   ('business_website',         'Business Website',              'website',  0.00, 0.00, 0.00, 'project'),
--   ('app_dev',                  'App Development',               'website',  0.00, 0.00, 0.00, 'project'),
--   ('landing_page',             'Landing Page',                   'website',  0.00, 0.00, 0.00, 'project'),
--   ('booking_system',           'Booking System',                'website',  0.00, 0.00, 0.00, 'project'),
--   ('business_platform',        'Business Platform',             'website',  0.00, 0.00, 0.00, 'project'),
--   ('client_portal',            'Client Portal',                 'website',  0.00, 0.00, 0.00, 'project'),
--   ('ai_automation',           'AI Assistants / Automation',    'website',  0.00, 0.00, 0.00, 'project'),
--   ('website_maintenance',     'Website Maintenance',           'website',  0.00, 0.00, 0.00, 'month');

-- =====================================================================
-- 10. ADD default_scope TO RATE CARD
-- Run this ALTER after applying the seed (separate step, after step 9 above):
-- =====================================================================
-- alter table rate_card add column default_scope text not null default '';

-- =====================================================================
-- 11. ADD share_token TO DOCUMENTS
-- Run this ALTER after v10 is applied (separate step):
-- =====================================================================
-- alter table documents add column share_token uuid unique not null default gen_random_uuid();

-- =====================================================================
-- 12. DOC_NUMBER FORMAT CHECK CONSTRAINT
-- Run this ALTER after cleaning existing rows (see below):
-- IMPORTANT: Before applying, update any malformed doc_number values:
--   UPDATE documents SET doc_number = 'PL-P-' || to_char(created_at, 'YYYY') || '-' || lpad(split_part(doc_number, '-', 4), 3, '0')
--   WHERE doc_number !~ '^PL-(P|INV)-[0-9]{4}-[0-9]{3,}$';
-- Then apply:
-- =====================================================================
-- alter table documents add constraint documents_doc_number_format
--   check (doc_number ~ '^PL-(P|INV)-[0-9]{4}-[0-9]{3,}$');

COMMIT;
