// POST /api/proposals/documents/send — email a document PDF to the client
// Body: { document_id: string, to_email: string, subject?: string, body_text?: string }
import { NextRequest, NextResponse } from 'next/server';
import { adminClient } from '@/lib/admin';
import { getActor, assertCanMutate } from '@/lib/auth';
import nodemailer from 'nodemailer';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { ProposalPDF } from '@/lib/proposals/pdf';
import { Document } from '@/lib/proposals/types';

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_APP_PASSWORD! },
});

export async function POST(req: NextRequest) {
  try {
    const actor = await getActor(req);
    const body = await req.json();
    const { document_id, to_email, subject, body_text } = body;
    if (!document_id || !to_email) return NextResponse.json({ error: 'document_id and to_email are required' }, { status: 400 });

    const supabase = adminClient();
    const { data: doc, error: docErr } = await supabase.from('documents').select('*').eq('id', document_id).single();
    if (docErr || !doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    assertCanMutate(actor, doc);

    let buffer: Buffer;
    try {
      const element = React.createElement(ProposalPDF, { doc: doc as Document });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      buffer = await (renderToBuffer as any)(element) as Buffer;
    } catch (renderErr) {
      return NextResponse.json({ error: 'PDF render failed', detail: String(renderErr) }, { status: 500 });
    }

    const docLabel = doc.doc_type === 'invoice' ? 'Invoice' : doc.doc_type === 'quote' ? 'Quote' : doc.doc_type === 'retainer' ? 'Retainer' : 'Proposal';
    const defaultSubject = subject ?? `${docLabel} ${doc.doc_number} — Premiera Live`;
    const defaultBody = body_text ?? `Dear ${doc.client_name},\\n\\nPlease find attached our ${docLabel} ${doc.doc_number}.\\n\\nKindly don't hesitate to reach out if you have any questions.\\n\\nBest regards,\\nPremiera Live`;

    try {
      const from = `"Premiera Live" <${process.env.DOCUMENTS_FROM_EMAIL ?? process.env.SMTP_USER!}>`;
      const replyTo = process.env.DOCUMENTS_REPLY_TO ?? process.env.DOCUMENTS_FROM_EMAIL ?? process.env.SMTP_USER!;
      await transport.sendMail({ from, replyTo, to: to_email, subject: defaultSubject, text: defaultBody, attachments: [{ filename: `${doc.doc_number}-${doc.client_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.pdf`, content: buffer }] });
    } catch (mailErr: any) {
      return NextResponse.json({ error: `Email send failed: ${mailErr?.message ?? mailErr}` }, { status: 500 });
    }

    const sentAt = new Date().toISOString();
    await supabase.from('document_sends').insert({ document_id, sent_at: sentAt, sent_to: to_email, sent_via: 'email', subject: defaultSubject, body: defaultBody });
    const { data: updated, error: updErr } = await supabase.from('documents').update({ send_via_email: true, send_count: (doc.send_count ?? 0) + 1, last_sent_at: sentAt }).eq('id', document_id).select().single();
    if (updErr) console.error('[/api/proposals/documents/send] upd err:', updErr);
    return NextResponse.json({ ok: true, row: updated ?? doc });
  } catch (err: any) {
    const status = err.message === 'Unauthorized' ? 401 : err.status === 403 ? 403 : 500;
    return NextResponse.json({ error: err.message ?? 'Internal server error' }, { status });
  }
}
