-- ============================================================
-- Studio OS — Backfill prospect_contacts from prospects.email
--
-- Problem: 59 prospects exist but only 7 have contact rows.
-- enrol.ts reads recipient addresses from prospect_contacts,
-- not from prospects.email directly. Prospects without a
-- contact row fail Guard 2 (no_contact_email) and can never
-- be enrolled in any sequence.
--
-- This migration creates a contact row for every prospect that
-- has no contact row, populating it from prospects.email.
--
-- Idempotent: uses ON CONFLICT DO NOTHING so running it
-- multiple times is safe.
--
-- Run in the Supabase SQL Editor after v9, v9b, v9c, v9d.
-- ============================================================

-- Step 1: prospects that have at least one contact row already
--          — nothing to do for these
-- Step 2: prospects with no contact rows but with a non-null, non-empty email
--          — insert one primary contact per prospect
-- Step 3: prospects with no contact rows and no email
--          — skip silently (can't enrol anyway without an address)

insert into public.prospect_contacts (
  prospect_id,
  full_name,
  email,
  email_status,
  is_primary,
  lang_pref
)
select
  p.id,
  coalesce(p.company_name, 'Unknown'),
  lower(trim(p.email)),
  'unverified',
  true,
  coalesce(p.lang_pref, 'ar')
from public.prospects p
where
  -- only prospects that actually have an email address
  p.email is not null
  and trim(p.email) != ''
  -- exclude prospects that already have at least one contact row
  and not exists (
    select 1
    from public.prospect_contacts pc
    where pc.prospect_id = p.id
  )
  -- Exclude prospects whose email already belongs to a different prospect's contact row.
  -- This is an edge case where the same email appears on two prospects in prospects.email.
  -- Upserting it onto two contact rows would create a conflict on email uniqueness.
  and not exists (
    select 1
    from public.prospect_contacts pc
    where pc.email = lower(trim(p.email))
      and pc.prospect_id != p.id
  )
on conflict (email) do nothing;
