-- v14_storage_path_nullable.sql
-- Make storage_path nullable so S3-direct rows (key-based) can insert without it
-- Run in Supabase SQL Editor. Expected: "Success. No rows returned".
ALTER TABLE document_attachments ALTER COLUMN storage_path DROP NOT NULL;
