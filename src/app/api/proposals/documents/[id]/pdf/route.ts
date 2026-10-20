// GET /api/proposals/documents/[id]/pdf — generate PDF
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { Document } from '@/lib/proposals/types';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { ProposalPDF } from '@/lib/proposals/pdf';
import { putObject } from '@/lib/s3';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = adminClient();

  const { data: doc, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let buffer: Buffer;
  try {
    const element = React.createElement(ProposalPDF, { doc: doc as Document });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buffer = await (renderToBuffer as any)(element) as Buffer;
  } catch (renderErr) {
    console.error('[/api/proposals/documents/[id]/pdf] renderToBuffer failed:', renderErr);
    return NextResponse.json(
      { error: 'PDF render failed', detail: String(renderErr) },
      { status: 500 }
    );
  }

  // Upload generated PDF to S3
  const isInvoice = doc.doc_type === 'invoice';
  const folder = isInvoice ? 'Invoices' : 'Proposal';
  const key = `${folder}/${doc.doc_number}/${doc.doc_number}.pdf`;
  try {
    await putObject(key, buffer, 'application/pdf');
  } catch (uploadErr) {
    console.error('[/api/proposals/documents/[id]/pdf] S3 upload failed:', uploadErr);
    // Do not block the response — still stream the PDF to browser
  }

  const filename = `${doc.doc_number}-${doc.client_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.pdf`;

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Length': String(buffer.length),
      'Cache-Control': 'no-store',
    },
  });
}
