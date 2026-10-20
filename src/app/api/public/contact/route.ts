import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Rate limit (in-memory, per IP) ──────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // per hour
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── Shared SMTP transport ─────────────────────────────────────────────────────
function makeTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER ?? "placeholder@premieralive.co",
      pass: process.env.SMTP_APP_PASSWORD ?? "placeholder",
    },
  });
}

const HAS_SMTP = !!process.env.SMTP_USER && !!process.env.SMTP_APP_PASSWORD;

// ── Contact form handler ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? req.headers.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, company, email, phone, city, vertical, machines, message, locale } = body as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    city?: string;
    vertical?: string;
    machines?: string;
    message?: string;
    locale?: string;
  };

  // Honeypot
  if ((body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  // Validate required fields
  if (!name || !company || !email || !city || !vertical || !machines) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const isAr = locale === "ar";
  const from = `"Premiera Local AI" <${process.env.SMTP_USER ?? "shareef@premieralive.co"}>`;

  // ── Email to CEO ─────────────────────────────────────────────────────────
  const subject = `[Local AI lead] ${company} — ${city}`;
  const ceoBody = `
${isAr ? "عميل محتمل جديد من موقع Premiera Local AI" : "New lead from Premiera Local AI website"}

${isAr ? "الاسم:" : "Name:"} ${name}
${isAr ? "الشركة:" : "Company:"} ${company}
${isAr ? "البريد الإلكتروني:" : "Email:"} ${email}
${isAr ? "الهاتف:" : "Phone:"} ${phone || "—"}
${isAr ? "المدينة:" : "City:"} ${city}
${isAr ? "القطاع:" : "Vertical:"} ${vertical}
${isAr ? "عدد الأجهزة:" : "Machines:"} ${machines}
${isAr ? "الرسالة:" : "Message:"} ${message ?? "—"}

${isAr ? "يُرسل من:" : "Sent from:"} premieralive.co
`.trim();

  // ── Acknowledgement to prospect ───────────────────────────────────────────
  const ackSubject = isAr
    ? "تم استلام رسالتك — Premiera Local AI"
    : "We received your message — Premiera Local AI";

  const ackBody = isAr
    ? `مرحبًا ${name.split(" ")[0]}،

شكرًا لتواصلك معنا من خلال موقع Premiera Local AI.

قدّمنا رسالتك إلى فريقنا. سنرد عليك خلال يوم عمل واحد.

فريق Premiera Local AI`
    : `Hi ${name.split(" ")[0]},

Thank you for reaching out through Premiera Local AI.

Your message has been forwarded to our team. We'll get back to you within one business day.

The Premiera Local AI Team`;

  if (!HAS_SMTP) {
    console.log(`[contact] DEV MODE — would send to ceo@premieralive.com and ${email} for ${company} (${city})`);
    return NextResponse.json({ ok: true });
  }

  try {
    const transport = makeTransport();
    await Promise.all([
      transport.sendMail({ from, to: "ceo@premieralive.com", subject, text: ceoBody, replyTo: email }),
      transport.sendMail({ from, to: email, subject: ackSubject, text: ackBody }),
    ]);
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
