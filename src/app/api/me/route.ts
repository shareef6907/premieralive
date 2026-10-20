// GET /api/me — returns current user's role and is_ceo flag
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';

const CEO_EMAIL = process.env.CEO_EMAIL ?? '';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
  if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await adminClient()
    .from('profiles')
    .select('id, full_name, role, active')
    .eq('id', user.id)
    .single();

  return NextResponse.json({
    user_id: user.id,
    email: user.email,
    is_ceo: user.email === CEO_EMAIL,
    role: profile?.role ?? null,
    full_name: profile?.full_name ?? null,
  });
}
