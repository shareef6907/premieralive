// GET /api/public/proposals/[share_token]/pdf
// No auth required. Looks up by share_token only.
// Returns 404 for void documents or unknown tokens.
// Content-Disposition: inline so the browser renders the PDF.
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { Document } from '@/lib/proposals/types';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { ProposalPDF } from '@/lib/proposals/pdf';

interface Params { params: Promise<{ share_token: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { share_token } = await params;

  const supabase = adminClient();

  const { data: doc, error } = await supabase
    .from('documents')
    .select('*')
    .eq('share_token', share_token)
    .single();

  if (error || !doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (doc.status === 'void') {
    return NextResponse.json({ error: 'This document is no longer available' }, { status: 404 });
  }

  let buffer: Buffer;
  try {
    const element = React.createElement(ProposalPDF, { doc: doc as Document });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buffer = await (renderToBuffer as any)(element) as Buffer;
  } catch (renderErr) {
    console.error('[public/proposals/[share_token]/pdf] renderToBuffer failed:', renderErr);
    return NextResponse.json({ error: 'PDF render failed', detail: String(renderErr) }, { status: 500 });
  }

  const slug = doc.client_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const filename = `${doc.doc_number}-${slug}.pdf`;

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Content-Length': String(buffer.length),
      'Cache-Control': 'no-store',
    },
  });
}
