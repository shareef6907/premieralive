/**
 * Shared suppression logic.
 * Extracted from sender.ts so enrolment and the sender
 * use identical matching — one source of truth.
 */

import { createClient } from '@supabase/supabase-js';

// Lazy client to avoid initializing before env vars are loaded in dev
let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase)
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  return _supabase;
}

export async function isSuppressed(email: string): Promise<boolean> {
  const domain = email.split('@')[1] ?? '';
  const { data } = await getSupabase()
    .from('suppression_list')
    .select('id')
    .or(`email.eq.${email},domain.eq.${domain}`)
    .limit(1);
  return !!data?.length;
}
