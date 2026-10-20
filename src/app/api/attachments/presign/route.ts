// POST /api/attachments/presign
// Returns a presigned PUT URL for direct S3 upload by the client.
// After upload, client must call /api/attachments/confirm to create the DB record.
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { getPresignedPutUrl } from '@/lib/s3';

interface PresignParams { params: Promise<{ id: string }> }

const ALLOWED_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);
const MAX_SIZE = 25 * 1024 * 1024; // 25 MB

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
    const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
    if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { filename, contentType, kind = 'other' } = body;

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'filename is required' }, { status: 400 });
    }
    if (!['signed_copy', 'lpo', 'other'].includes(kind)) {
      return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
    }

    const mime = contentType ?? 'application/octet-stream';
    if (!ALLOWED_TYPES.has(mime) && mime !== 'application/octet-stream') {
      return NextResponse.json({ error: 'Invalid file type. Allowed: PDF, JPEG, PNG' }, { status: 400 });
    }

    // Fetch doc_number for the key path
    const { data: doc } = await adminClient()
      .from('documents')
      .select('doc_number')
      .eq('id', documentId)
      .single();

    const docNumber = doc?.doc_number ?? documentId;
    const timestamp = Date.now();
    const key = buildS3Key(docNumber, kind, timestamp, filename);

    const uploadUrl = await getPresignedPutUrl(key, mime);

    return NextResponse.json({ uploadUrl, key }, { status: 200 });
  } catch (err: any) {
    console.error('[POST /attachments/presign] unexpected error:', err);
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status: 500 });
  }
}
