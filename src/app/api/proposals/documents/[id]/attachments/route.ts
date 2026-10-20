// GET /api/proposals/documents/[id]/attachments — list attachments for a document
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';

interface AttachParams { params: Promise<{ id: string }> }

export async function GET(req: NextRequest, { params }: AttachParams) {
  try {
    const { id: documentId } = await params;
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
    if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await adminClient()
      .from('document_attachments')
      .select('*')
      .eq('document_id', documentId)
      .order('created_at', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ rows: data });
  } catch (err: any) {
    console.error('[GET /documents/[id]/attachments] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status: 500 });
  }
}
