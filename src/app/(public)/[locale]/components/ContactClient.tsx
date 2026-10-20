"use client";
import { useState } from "react";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";
import { BRAND } from "@/content/brand";

interface Props { locale: Locale; dict: FullDict; }

export default function ContactClient({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = dict.contact;
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const text = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.open(`${BRAND.whatsappLink}?text=${text}`, "_blank");
    setSent(true);
    setLoading(false);
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb">
            <a href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</a>
            <span className="breadcrumb-sep">/</span>
            <span>{isAr ? "تواصل معنا" : "Contact"}</span>
          </nav>
        </div>
      </div>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,226,180,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-eyebrow">{d.eyebrow}</span>
            <h1 className="text-display" style={{ marginBottom: "20px" }}>{d.headline}</h1>
            <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.7 }}>
              {isAr ? d.subtitle : "Get in touch and we'll respond within hours."}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            {/* Contact methods */}
            <div className="grid-3" style={{ marginBottom: "48px" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(37,211,102,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </div>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px", fontFamily: "var(--font-display)" }}>WhatsApp</p>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>{BRAND.whatsapp}</p>
              </a>
              <a href={`mailto:${BRAND.email}`} className="card" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px", fontFamily: "var(--font-display)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</p>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>{BRAND.email}</p>
              </a>
              <div className="card" style={{ textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(108,140,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <p style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px", fontFamily: "var(--font-display)" }}>{isAr ? "الموقع" : "Location"}</p>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>Al Khobar, KSA</p>
              </div>
            </div>

            {/* Form */}
            <div className="card">
              <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", fontFamily: "var(--font-display)" }}>
                {isAr ? "أرسل لنا رسالة" : "Send us a message"}
              </h2>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                  <p style={{ fontSize: "16px", color: "var(--muted)" }}>
                    {isAr ? "تم فتح واتساب! أرسل رسالتك." : "WhatsApp opened! Send your message."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: isAr ? "1fr 1fr" : "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--muted)" }}>{isAr ? "الاسم *" : "Name *"}</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} style={{ width: "100%", padding: "10px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", fontFamily: "var(--font-body)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--muted)" }}>{isAr ? "الشركة" : "Company"}</label>
                      <input type="text" value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))} style={{ width: "100%", padding: "10px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", fontFamily: "var(--font-body)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isAr ? "1fr 1fr" : "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--muted)" }}>{isAr ? "البريد الإلكتروني" : "Email"}</label>
                      <input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} style={{ width: "100%", padding: "10px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", fontFamily: "var(--font-body)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--muted)" }}>{isAr ? "رقم الهاتف" : "Phone"}</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} style={{ width: "100%", padding: "10px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", fontFamily: "var(--font-body)", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--muted)" }}>{isAr ? "رسالتك *" : "Message *"}</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} style={{ width: "100%", padding: "10px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: "14px", fontFamily: "var(--font-body)", color: "var(--text)", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                  <button type="submit" disabled={loading} className="btn btn-whatsapp" style={{ alignSelf: "flex-start", fontSize: "15px" }}>
                    {isAr ? "📤 إرسال عبر واتساب" : "📤 Send via WhatsApp"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
