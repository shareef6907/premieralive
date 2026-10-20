// POST /api/attachments/[id]/presign
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { getPresignedPutUrl } from '@/lib/s3';
import { getActor, assertCanMutate } from '@/lib/auth';

interface PresignParams { params: Promise<{ id: string }> }

const ALLOWED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

function sanitizeFilename(name: string): string {
  return name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-._]/g, '');
}

function buildS3Key(docNumber: string, kind: string, timestamp: number, filename: string): string {
  const sanitized = sanitizeFilename(filename);
  if (kind === 'lpo') return `LPO/${docNumber}/${timestamp}-${sanitized}`;
  if (kind === 'signed_copy') return `Signed Copy/${docNumber}/${timestamp}-${sanitized}`;
  return `Attachments/${docNumber}/${timestamp}-${sanitized}`;
}

export async function POST(req: NextRequest, { params }: PresignParams) {
  try {
    const { id: documentId } = await params;
    const actor = await getActor(req);

    const body = await req.json();
    const { filename, contentType, kind = 'other' } = body;

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'filename is required' }, { status: 400 });
    }
    if (!['lpo', 'signed_copy', 'generated_pdf'].includes(kind)) {
      return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
    }

    const mime = contentType ?? 'application/octet-stream';
    if (!ALLOWED_TYPES.has(mime) && mime !== 'application/octet-stream') {
      return NextResponse.json({ error: 'Invalid file type. Allowed: PDF, JPEG, PNG' }, { status: 400 });
    }

    // Fetch doc for QA guard
    const { data: doc } = await adminClient()
      .from('documents').select('doc_number, client_name').eq('id', documentId).single();
    if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    assertCanMutate(actor, doc);

    const docNumber = doc?.doc_number ?? documentId;
    const timestamp = Date.now();
    const key = buildS3Key(docNumber, kind, timestamp, filename);

    const uploadUrl = await getPresignedPutUrl(key, mime);

    return NextResponse.json({ uploadUrl, key }, { status: 200 });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : err.status === 403 ? 403 : 500;
    console.error('[POST /attachments/[id]/presign] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}
