-- v13_document_sends_and_s3_attachments.sql
-- Phase 16 — document_sends audit log + S3 fields on document_attachments + send tracking on documents
-- Run in Supabase SQL Editor. Expected: "Success. No rows returned".

BEGIN;

-- 1. document_sends — audit log of every send event (email or manual)
CREATE TABLE IF NOT EXISTS document_sends (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id   uuid        NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  sent_at       timestamptz NOT NULL,
  sent_to       text        NOT NULL,
  sent_via      text        NOT NULL CHECK (sent_via IN ('email', 'manual')),
  subject       text,
  body          text,
  created_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS document_sends_document_id_idx ON document_sends(document_id);
CREATE INDEX IF NOT EXISTS document_sends_sent_at_idx ON document_sends(sent_at);

-- 2. S3 / metadata columns + kind on document_attachments
ALTER TABLE document_attachments
  ADD COLUMN IF NOT EXISTS bucket        text,
  ADD COLUMN IF NOT EXISTS key           text,
  ADD COLUMN IF NOT EXISTS content_type  text,
  ADD COLUMN IF NOT EXISTS size_bytes    bigint,
  ADD COLUMN IF NOT EXISTS uploaded_by   text,
  ADD COLUMN IF NOT EXISTS kind          text NOT NULL DEFAULT 'lpo'
                                     CHECK (kind IN ('lpo', 'signed_copy', 'generated_pdf')),
  ADD COLUMN IF NOT EXISTS created_at    timestamptz DEFAULT now();

-- 3. Send tracking on documents
ALTER TABLE documents
  ADD COLUMN IF NOT EXISTS sent_via     text CHECK (sent_via IN ('email', 'manual')),
  ADD COLUMN IF NOT EXISTS send_count   integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_sent_at timestamptz;

-- 4. Outbound sequence tracking
ALTER TABLE sequence_sends
  ADD COLUMN IF NOT EXISTS handled_at timestamptz;

-- 5. Phase 16 documents_immutable() trigger
--    Extends v11 with paid/overdue transitions and all Phase 16 fields
CREATE OR REPLACE FUNCTION documents_immutable()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  allowed bool := false;
BEGIN
  IF OLD.line_items      IS DISTINCT FROM NEW.line_items      OR
     OLD.subtotal        IS DISTINCT FROM NEW.subtotal        OR
     OLD.discount_pct    IS DISTINCT FROM NEW.discount_pct    OR
     OLD.discount_amount IS DISTINCT FROM NEW.discount_amount OR
     OLD.total           IS DISTINCT FROM NEW.total           OR
     OLD.client_name      IS DISTINCT FROM NEW.client_name     OR
     OLD.client_address   IS DISTINCT FROM NEW.client_address  OR
     OLD.client_email     IS DISTINCT FROM NEW.client_email    OR
     OLD.client_phone     IS DISTINCT FROM NEW.client_phone
  THEN
    RAISE EXCEPTION 'Cannot modify frozen document fields (id %)', OLD.id
      USING ERRCODE = '23P01';
  END IF;

  IF OLD.term_months     IS DISTINCT FROM NEW.term_months     OR
     OLD.monthly_amount  IS DISTINCT FROM NEW.monthly_amount  OR
     OLD.start_date      IS DISTINCT FROM NEW.start_date      OR
     OLD.billing_day     IS DISTINCT FROM NEW.billing_day     OR
     OLD.lpo_number      IS DISTINCT FROM NEW.lpo_number      OR
     OLD.lpo_date        IS DISTINCT FROM NEW.lpo_date        OR
     OLD.lpo_amount      IS DISTINCT FROM NEW.lpo_amount      OR
     OLD.accepted_by_name  IS DISTINCT FROM NEW.accepted_by_name OR
     OLD.accepted_by_title IS DISTINCT FROM NEW.accepted_by_title OR
     OLD.accepted_at     IS DISTINCT FROM NEW.accepted_at
  THEN
    RAISE EXCEPTION 'Cannot modify frozen Phase 16 fields (id %)', OLD.id
      USING ERRCODE = '23P01';
  END IF;

  IF OLD.status = NEW.status THEN allowed := true; END IF;
  IF OLD.status = 'sent'       AND NEW.status IN ('accepted','declined','superseded','void','paid','overdue') THEN allowed := true; END IF;
  IF OLD.status = 'accepted'   AND NEW.status IN ('superseded','void') THEN allowed := true; END IF;
  IF OLD.status = 'declined'   AND NEW.status IN ('void') THEN allowed := true; END IF;
  IF OLD.status = 'superseded' AND NEW.status IN ('void') THEN allowed := true; END IF;
  IF OLD.status = 'overdue'    AND NEW.status IN ('paid','void') THEN allowed := true; END IF;

  IF NOT allowed THEN
    RAISE EXCEPTION 'Invalid status transition % → % on document id %',
      OLD.status, NEW.status, OLD.id
      USING ERRCODE = '23P01';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS documents_immutable ON documents;
CREATE TRIGGER documents_immutable
  BEFORE UPDATE ON documents
  FOR EACH ROW
  WHEN (OLD.status <> 'draft')
  EXECUTE FUNCTION documents_immutable();

COMMIT;
