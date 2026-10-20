-- v11_retainers_invoicing.sql — Phase 16 (AUTHORITATIVE — replaces Max's version in full)
-- Additive only. Touches documents (+ new document_attachments) and nothing else.
-- Run in Supabase SQL Editor. Expected: "Success. No rows returned".

BEGIN;

-- 1. doc_type gains 'retainer' (quote/proposal/invoice retained)
alter table documents drop constraint if exists documents_doc_type_check;
alter table documents add constraint documents_doc_type_check
  check (doc_type in ('quote','proposal','retainer','invoice'));

-- 2. status gains 'paid' and 'overdue' (invoices only)
alter table documents drop constraint if exists documents_status_check;
alter table documents add constraint documents_status_check
  check (status in ('draft','sent','accepted','declined','superseded','void','paid','overdue'));
alter table documents add constraint documents_paid_only_invoices
  check (status not in ('paid','overdue') or doc_type = 'invoice');

-- 3. retainer fields
alter table documents
  add column term_months int,
  add column monthly_amount numeric(12,2),
  add column start_date date,
  add column billing_day int;
alter table documents add constraint documents_retainer_fields check (
  doc_type <> 'retainer' or (
    term_months in (3,6,12) and monthly_amount > 0 and start_date is not null
    and billing_day between 1 and 28
  )
);

-- 4. invoice fields
alter table documents
  add column source_document_id uuid references documents(id),
  add column invoice_kind text check (invoice_kind in ('deposit','final','full','retainer_month')),
  add column invoice_sequence int,
  add column period_start date,
  add column period_end date,
  add column due_date date,
  add column paid_at timestamptz,
  add column payment_reference text;
alter table documents add constraint documents_invoice_fields check (
  doc_type <> 'invoice' or (invoice_kind is not null and source_document_id is not null and due_date is not null)
);

-- 5. one invoice per (source, kind, sequence)
create unique index documents_invoice_unique
  on documents (source_document_id, invoice_kind, invoice_sequence)
  where doc_type = 'invoice' and status <> 'void';

-- 6. acceptance + LPO fields (brief §3b)
alter table documents
  add column lpo_number text,
  add column lpo_date date,
  add column lpo_amount numeric(12,2),
  add column accepted_by_name text,
  add column accepted_by_title text,
  add column accepted_at timestamptz;

-- 7. attachments (signed copies, LPOs) — never deletable
create table document_attachments (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id),
  kind text not null check (kind in ('signed_copy','lpo','other')),
  storage_path text not null,
  filename text not null,
  size_bytes int,
  uploaded_by text not null,
  created_at timestamptz not null default now()
);
create or replace function document_attachments_no_delete()
returns trigger language plpgsql as $$
BEGIN
  raise exception 'Attachments may not be deleted (id %).', OLD.id using errcode = '23P01';
END;
$$;
create trigger document_attachments_no_delete
  before delete on document_attachments
  for each row execute function document_attachments_no_delete();
alter table document_attachments enable row level security;
create policy "attachments_read"   on document_attachments for select to authenticated using (true);
create policy "attachments_insert" on document_attachments for insert to authenticated with check (true);
create policy "attachments_deny_delete" on document_attachments for delete to authenticated using (false);

insert into storage.buckets (id, name, public)
values ('document-attachments', 'document-attachments', false)
on conflict (id) do nothing;

-- 8. immutability trigger: extend the status whitelist (frozen fields unchanged)
create or replace function documents_immutable()
returns trigger language plpgsql as $$
DECLARE
  allowed bool := false;
BEGIN
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

  if OLD.status = NEW.status then allowed := true; end if;
  if OLD.status = 'sent'       and NEW.status in ('accepted','declined','superseded','void','paid','overdue') then allowed := true; end if;
  if OLD.status = 'accepted'   and NEW.status in ('superseded','void') then allowed := true; end if;
  if OLD.status = 'declined'   and NEW.status in ('void') then allowed := true; end if;
  if OLD.status = 'superseded' and NEW.status in ('void') then allowed := true; end if;
  if OLD.status = 'overdue'    and NEW.status in ('paid','void') then allowed := true; end if;

  if not allowed then
    raise exception 'Invalid status transition % → % on document id %',
      OLD.status, NEW.status, OLD.id
      using errcode = '23P01';
  end if;

  RETURN NEW;
END;
$$;

COMMIT;
