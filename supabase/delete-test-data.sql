-- Delete all test data: Max Test Prospect (Hermes Agent), ZZZ Test*, TEST Gatekeeper Co, TEST Pitch Co
-- Cascades: prospect_contacts → sequence_enrolments → sequence_sends → suppression_list

BEGIN;

-- 1. Collect all test prospect IDs
CREATE TEMP TABLE test_prospect_ids AS
SELECT id FROM prospects
WHERE
  company_name = 'Max Test Prospect (Hermes Agent)'
  OR company_name = 'ZZZ Test Delete Me'
  OR company_name = 'ZZZ Test 2 - Delete'
  OR company_name = 'TEST Gatekeeper Co'
  OR company_name = 'TEST Pitch Co';

-- 2. Delete suppression_list entries
DELETE FROM suppression_list WHERE prospect_id IN (SELECT id FROM test_prospect_ids);

-- 3. Delete sequence_sends via enrolment cascade
DELETE FROM sequence_sends
WHERE enrolment_id IN (
  SELECT se.id FROM sequence_enrolments se
  WHERE se.prospect_id IN (SELECT id FROM test_prospect_ids)
);

-- 4. Delete sequence_enrolments
DELETE FROM sequence_enrolments
WHERE prospect_id IN (SELECT id FROM test_prospect_ids);

-- 5. Delete prospect_contacts
DELETE FROM prospect_contacts
WHERE prospect_id IN (SELECT id FROM test_prospect_ids);

-- 6. Delete prospects
DELETE FROM prospects WHERE id IN (SELECT id FROM test_prospect_ids);

COMMIT;

-- Verify
SELECT count(*) AS remaining_test_prospects
FROM prospects
WHERE company_name ILIKE '%test%' OR company_name ILIKE 'ZZZ%';
