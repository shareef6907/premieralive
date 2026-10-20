// GET /api/proposals/rate-card/pdf — branded rate card PDF
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Image,
  Font,
} from '@react-pdf/renderer';
import { RateCardEntry } from '@/lib/proposals/types';
import fs from 'fs';
import path from 'path';

// Register Inter fonts from public/fonts/ — replaces PDFKit standard Helvetica
// which is not included in the Vercel serverless bundle.
Font.registerHyphenationCallback((word) => [word]);

Font.register({
  family: 'Inter',
  fonts: [
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'), fontWeight: 'normal' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Medium.ttf'), fontWeight: 500 },
    { src: path.join(process.cwd(), 'public', 'fonts', 'Inter-Bold.ttf'), fontWeight: 'bold' },
  ],
});

// Load logo at request time so it works in Vercel serverless functions.
function getLogoDataUri(): string {
  const LOGO_PATH = path.join(process.cwd(), 'public', 'brand', 'premiera-live-gold.png');
  try {
    const buf = fs.readFileSync(LOGO_PATH);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return '/brand/premiera-live-gold.png';
  }
}

const COLORS = { gold: '#C9A84C', ink: '#1a1a2e', muted: '#666666', line: '#dddddd', white: '#ffffff' };

const styles = StyleSheet.create({
  page: { fontFamily: 'Inter', fontSize: 9, color: COLORS.ink, padding: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  logoBox: { width: 160, height: 50 },
  titleBlock: { textAlign: 'right' },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.ink },
  subtitle: { fontSize: 9, color: COLORS.muted, marginTop: 4 },
  divider: { borderBottom: `1 solid ${COLORS.gold}`, marginVertical: 16 },
  companyBlock: { marginBottom: 20 },
  companyName: { fontSize: 12, fontWeight: 'bold', color: COLORS.ink },
  companyInfo: { fontSize: 8, color: COLORS.muted, lineHeight: 1.6 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: COLORS.gold, marginBottom: 8, marginTop: 20 },
  tableHeader: { flexDirection: 'row', backgroundColor: COLORS.ink, paddingVertical: 5, paddingHorizontal: 8 },
  thText: { fontSize: 7, color: COLORS.white, fontWeight: 'bold', textTransform: 'uppercase' },
  thName: { flex: 2 },
  thScope: { flex: 3 },
  thDefault: { width: 85, textAlign: 'right' },
  thMin: { width: 75, textAlign: 'right' },
  thMax: { width: 75, textAlign: 'right' },
  thUnit: { width: 70 },
  tableRow: { flexDirection: 'row', borderBottom: `0.5 solid ${COLORS.line}`, paddingVertical: 6, paddingHorizontal: 8 },
  tdName: { flex: 2, fontSize: 9, fontWeight: 'bold' },
  tdScope: { flex: 3, fontSize: 8, color: COLORS.muted },
  tdDefault: { width: 85, textAlign: 'right', fontSize: 9 },
  tdMin: { width: 75, textAlign: 'right', fontSize: 9 },
  tdMax: { width: 75, textAlign: 'right', fontSize: 9 },
  tdUnit: { width: 70, fontSize: 9, color: COLORS.muted, paddingLeft: 4 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7, color: COLORS.muted },
  footerTagline: { fontSize: 7, color: COLORS.gold, fontStyle: 'italic' },
});

function fmt(n: number) {
  return `SAR ${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

interface Props { rows: RateCardEntry[] }

function RateCardPDF({ rows }: Props) {
  const logoDataUri = getLogoDataUri();
  const media = rows.filter((r) => r.category === 'media');
  const website = rows.filter((r) => r.category === 'website');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Image src={logoDataUri} style={{ width: 180 }} />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Rate Card</Text>
            <Text style={styles.subtitle}>Standard pricing · All prices exclusive of VAT</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Company */}
        <View style={styles.companyBlock}>
          <Text style={styles.companyName}>Premiera Live Company</Text>
          <Text style={styles.companyInfo}>CR 7054807941 · Spaces Ajdan Walk, Corniche 5, Al Khobar, KSA · premieralive.com</Text>
        </View>

        {/* Media */}
        <Text style={styles.sectionLabel}>Media Services</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, styles.thName]}>Service</Text>
          <Text style={[styles.thText, styles.thScope]}>Scope</Text>
          <Text style={[styles.thText, styles.thDefault]}>Default Price</Text>
          <Text style={[styles.thText, styles.thMin]}>Min</Text>
          <Text style={[styles.thText, styles.thMax]}>Max</Text>
          <Text style={[styles.thText, styles.thUnit]}>Unit</Text>
        </View>
        {media.map((r) => (
          <View key={r.id} style={styles.tableRow}>
            <Text style={[styles.tdName, styles.thName]}>{r.name}</Text>
            <Text style={[styles.tdScope, styles.thScope]}>{r.default_scope ?? ''}</Text>
            <Text style={[styles.tdDefault, styles.thDefault]}>{fmt(r.default_price)}</Text>
            <Text style={[styles.tdMin, styles.thMin]}>{fmt(r.price_min)}</Text>
            <Text style={[styles.tdMax, styles.thMax]}>{fmt(r.price_max)}</Text>
            <Text style={[styles.tdUnit, styles.thUnit]}>{r.unit.startsWith('per') ? `\n${r.unit}` : r.unit}</Text>
          </View>
        ))}

        {/* Website */}
        <Text style={styles.sectionLabel}>Website Services</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, styles.thName]}>Service</Text>
          <Text style={[styles.thText, styles.thScope]}>Scope</Text>
          <Text style={[styles.thText, styles.thDefault]}>Default Price</Text>
          <Text style={[styles.thText, styles.thMin]}>Min</Text>
          <Text style={[styles.thText, styles.thMax]}>Max</Text>
          <Text style={[styles.thText, styles.thUnit]}>Unit</Text>
        </View>
        {website.map((r) => (
          <View key={r.id} style={styles.tableRow}>
            <Text style={[styles.tdName, styles.thName]}>{r.name}</Text>
            <Text style={[styles.tdScope, styles.thScope]}>{r.default_scope ?? ''}</Text>
            <Text style={[styles.tdDefault, styles.thDefault]}>{fmt(r.default_price)}</Text>
            <Text style={[styles.tdMin, styles.thMin]}>{fmt(r.price_min)}</Text>
            <Text style={[styles.tdMax, styles.thMax]}>{fmt(r.price_max)}</Text>
            <Text style={[styles.tdUnit, styles.thUnit]}>{r.unit.startsWith('per') ? `\n${r.unit}` : r.unit}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>All prices are exclusive of VAT.</Text>
          <Text style={styles.footerTagline}>Born to Tell Great Stories</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET() {
  const { adminClient } = await import('@/lib/admin');

  let rows: RateCardEntry[] = [];

  try {
    const supabase = adminClient();
    const { data, error } = await supabase
      .from('rate_card')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error || !data) {
      return NextResponse.json({ error: 'Failed to load rate card', detail: error?.message ?? 'Unknown error' }, { status: 500 });
    }
    rows = data as RateCardEntry[];
  } catch (connErr) {
    return NextResponse.json({ error: 'Failed to load rate card', detail: String(connErr) }, { status: 500 });
  }

  let buffer: Buffer;
  try {
    buffer = await (renderToBuffer as any)(React.createElement(RateCardPDF, { rows })) as Buffer;
  } catch (renderErr) {
    return NextResponse.json({ error: 'PDF render failed', detail: String(renderErr) }, { status: 500 });
  }

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Premiera-Live-Rate-Card.pdf"',
      'Content-Length': String(buffer.length),
      'Cache-Control': 'no-store',
    },
  });
}
