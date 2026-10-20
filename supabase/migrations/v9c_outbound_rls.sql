-- ============================================================
-- Studio OS — Outbound RLS policies
-- Match the pattern from v7 (public.prospects).
--
-- Pattern: authenticated users with role in (ceo, sales_manager)
-- have full access (select, insert, update, delete).
--
-- Tables: prospect_contacts, sequences, sequence_steps,
--         sequence_enrolments, sequence_sends, suppression_list
--
-- Run AFTER v9 and v9b.
-- ============================================================

-- ------------------------------------------------------------
-- prospect_contacts
-- ------------------------------------------------------------
drop policy if exists p_prospect_contacts_all on public.prospect_contacts;
create policy p_prospect_contacts_all on public.prospect_contacts
  for all to authenticated
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  )
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  );

-- ------------------------------------------------------------
-- sequences
-- ------------------------------------------------------------
drop policy if exists p_sequences_all on public.sequences;
create policy p_sequences_all on public.sequences
  for all to authenticated
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  )
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  );

-- ------------------------------------------------------------
-- sequence_steps
-- ------------------------------------------------------------
drop policy if exists p_sequence_steps_all on public.sequence_steps;
create policy p_sequence_steps_all on public.sequence_steps
  for all to authenticated
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  )
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  );

-- ------------------------------------------------------------
-- sequence_enrolments
-- ------------------------------------------------------------
drop policy if exists p_sequence_enrolments_all on public.sequence_enrolments;
create policy p_sequence_enrolments_all on public.sequence_enrolments
  for all to authenticated
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  )
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  );

-- ------------------------------------------------------------
-- sequence_sends
-- ------------------------------------------------------------
drop policy if exists p_sequence_sends_all on public.sequence_sends;
create policy p_sequence_sends_all on public.sequence_sends
  for all to authenticated
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  )
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  );

-- ------------------------------------------------------------
-- suppression_list
-- ------------------------------------------------------------
drop policy if exists p_suppression_list_all on public.suppression_list;
create policy p_suppression_list_all on public.suppression_list
  for all to authenticated
  using (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  )
  with check (
    exists (
      select 1 from profiles
      where id = auth.uid()
      and role::text in ('ceo', 'sales_manager')
    )
  );

-- Realtime — match the existing Studio OS pattern
alter publication supabase_realtime add table public.prospect_contacts;
alter publication supabase_realtime add table public.sequences;
alter publication supabase_realtime add table public.sequence_steps;
alter publication supabase_realtime add table public.sequence_enrolments;
alter publication supabase_realtime add table public.sequence_sends;
alter publication supabase_realtime add table public.suppression_list;

notify pgrst, 'reload schema';
