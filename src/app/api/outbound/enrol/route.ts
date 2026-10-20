import { NextRequest, NextResponse } from 'next/server';
import { enrolMany, defaultStage, resolveSequenceId, type Stage } from '@/lib/outbound/enrol';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  let body: { prospectIds?: string[]; stage?: Stage; sequence?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(body.prospectIds) || body.prospectIds.length === 0) {
    return NextResponse.json({ error: 'prospectIds must be a non-empty array' }, { status: 400 });
  }

  const { prospectIds, stage } = body;

  // Resolve stage + sequence for each prospect
  const routing = await Promise.all(
    prospectIds.map(async (id) => {
      const { data: p } = await supabase
        .from('prospects')
        .select('id, company_name, lang_pref, personal_hook')
        .eq('id', id)
        .single();

      if (!p) return { prospectId: id, companyName: id, stage: 'gatekeeper' as Stage, lang: 'en', reason: 'prospect_not_found', sequenceId: '' };

      const inferredStage = stage ?? (await defaultStage(id, p.personal_hook));
      const lang = p.lang_pref === 'ar' ? 'ar' : 'en';
      const sequenceId = resolveSequenceId(inferredStage, lang);

      const { data: contact } = await supabase
        .from('prospect_contacts')
        .select('full_name')
        .eq('prospect_id', id)
        .eq('is_primary', true)
        .maybeSingle();

      const hasHook = !!p.personal_hook?.trim();
      const hasName = !!contact?.full_name?.trim();

      let reason = '';
      if (hasHook && hasName) {
        reason = 'personal hook + named contact';
      } else if (hasHook) {
        reason = 'no named contact';
      } else {
        reason = 'no personal hook';
      }

      return { prospectId: id, companyName: p.company_name ?? id, stage: inferredStage, lang, reason, sequenceId };
    })
  );

  // Dry-run: compute routing without writing anything
  if (body.sequence === 'dry-run') {
    return NextResponse.json({ routing });
  }

  // Live enrolment — dryRun=false is the default
  const results = await Promise.all(
    prospectIds.map(async (id, i) => {
      const r = routing[i];
      const resolvedStage = stage ?? r.stage;
      const lang = r.lang;
      const sequenceId = resolveSequenceId(resolvedStage, lang);
      return enrolMany([id], resolvedStage, sequenceId, false);
    })
  );

  const enrolled = results.flatMap((r) => r.enrolled);
  const skipped = results.flatMap((r) => r.skipped);

  return NextResponse.json({ enrolled, skipped, routing });
}
