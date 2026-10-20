// POST /api/attachments/[id]/confirm
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { getActor, assertCanMutate } from '@/lib/auth';

interface ConfirmParams { params: Promise<{ id: string }> }

const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

export async function POST(req: NextRequest, { params }: ConfirmParams) {
  try {
    const { id: documentId } = await params;
    const actor = await getActor(req);

    const body = await req.json();
    const { key, filename, sizeBytes, contentType, kind = 'other' } = body;

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'key (storage_path) is required' }, { status: 400 });
    }
    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'filename is required' }, { status: 400 });
    }
    if (!['lpo', 'signed_copy', 'generated_pdf'].includes(kind)) {
      return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
    }

    const size = Number(sizeBytes ?? 0);
    if (size <= 0 || size > MAX_SIZE) {
      return NextResponse.json({ error: 'Invalid size. Max 25 MB.' }, { status: 400 });
    }

    // Fetch doc for QA guard
    const { data: doc } = await adminClient()
      .from('documents').select('client_name').eq('id', documentId).single();
    if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    assertCanMutate(actor, doc);

    // Insert attachment record
    const { data: row, error: insErr } = await adminClient()
      .from('document_attachments')
      .insert({
        document_id: documentId,
        kind,
        storage_path: key,
        filename,
        size_bytes: size,
        content_type: contentType ?? 'application/octet-stream',
        uploaded_by: actor.user.email ?? 'unknown',
      })
      .select()
      .single();

    if (insErr) {
      return NextResponse.json({ error: `Record insert failed: ${insErr.message}` }, { status: 500 });
    }

    return NextResponse.json({ row }, { status: 201 });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : err.status === 403 ? 403 : 500;
    console.error('[POST /attachments/[id]/confirm] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}
