-- v9d_suppression_index.sql
-- Run AFTER v9, v9b, v9c — BEFORE any send.
-- Replaces the functional partial index with a plain unique index on email
-- so that ON CONFLICT (email) has a valid arbiter.
--
-- The original index was:
--   create unique index suppression_email_uidx
--     on public.suppression_list (lower(email)) where email is not null;
--
-- That index cannot serve ON CONFLICT (email) because it is on lower(email)
-- (a functional expression) and is partial (where email is not null).
-- Postgres error 42P10 is raised when the conflict target column
-- does not match any index column expression.
--
-- Sequencing: v9 → v9b → v9c → v9d
-- If v9d is skipped, unsubscribes silently fail to suppress
-- (the upsert falls through to confirmation with no row written).

drop index if exists public.suppression_email_uidx;

create unique index if not exists suppression_email_uidx
  on public.suppression_list (email);
