// GET /api/proposals/documents/[id]/attachments/[attachmentId]/download
// Generates a presigned GET URL for the attachment from S3.
// CEO or sales role.
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { getPresignedGetUrl } from '@/lib/s3';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; attachmentId: string }> }
) {
  const { id: documentId, attachmentId } = await params;
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: { user }, error: authErr } = await adminClient().auth.getUser(accessToken);
  if (authErr || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: attachment, error: fetchErr } = await adminClient()
    .from('document_attachments')
    .select('*')
    .eq('id', attachmentId)
    .eq('document_id', documentId)
    .single();
  if (fetchErr || !attachment) return NextResponse.json({ error: 'Attachment not found' }, { status: 404 });

  const url = await getPresignedGetUrl(attachment.storage_path);
  return NextResponse.json({ url });
}
