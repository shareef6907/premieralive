// GET/PATCH /api/proposals/rate-card
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';

const CEO_EMAIL = process.env.CEO_EMAIL;

export async function GET() {
  const supabase = adminClient();
  const { data, error } = await supabase
    .from('rate_card')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data });
}

export async function PATCH(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
  if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (user.email !== CEO_EMAIL) {
    return NextResponse.json({ error: 'Only the CEO can edit the rate card' }, { status: 403 });
  }

  const body = await req.json();
  const { id, default_price, price_min, price_max, unit } = body;

  const { data, error } = await adminClient()
    .from('rate_card')
    .update({ default_price, price_min, price_max, unit })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ row: data });
}
