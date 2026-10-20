"use client";
import { useState } from "react";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";
import { BRAND } from "@/content/brand";

interface Props { locale: Locale; dict: FullDict; }

export default function PricingPageClient({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = dict.pricing;
  const pd = dict.pricing as unknown as Record<string, unknown>;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Extract FAQ items
  const faqItems: { q: string; a: string }[] = [];
  for (let i = 1; i <= 10; i++) {
    const q = pd[`q${i}`];
    const a = pd[`a${i}`];
    if (q && a) faqItems.push({ q: q as string, a: a as string });
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb">
            <a href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</a>
            <span className="breadcrumb-sep">/</span>
            <span>{isAr ? "الأسعار" : "Pricing"}</span>
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
            <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {d.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="section" data-reveal style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="grid-3" style={{ alignItems: "stretch" }}>
            {/* Essential */}
            <div className="pricing-card">
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{d.essential}</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>{d.essentialDesc}</p>
              <div style={{ marginBottom: "28px" }}>
                <span className="price"><span className="price-currency">BHD</span> 500</span>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>{isAr ? "~4,999 ريال سعودي" : "~SAR 4,999"}</p>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {d.featureEssential.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                {d.cta}
              </a>
            </div>

            {/* Professional */}
            <div className="pricing-card featured">
              <div style={{ display: "inline-block", background: "rgba(54,226,180,0.1)", color: "var(--accent)", borderRadius: "100px", fontSize: "12px", fontWeight: 700, padding: "4px 12px", marginBottom: "12px" }}>
                {d.professionalFeatured}
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{d.professional}</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>{d.professionalDesc}</p>
              <div style={{ marginBottom: "28px" }}>
                <span className="price"><span className="price-currency">BHD</span> 750</span>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>{isAr ? "~7,499 ريال سعودي" : "~SAR 7,499"}</p>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {d.featureProfessional.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {d.cta}
              </a>
            </div>

            {/* Business */}
            <div className="pricing-card">
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{d.business}</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>{d.businessDesc}</p>
              <div style={{ marginBottom: "28px" }}>
                <span className="price" style={{ fontSize: "28px", color: "var(--accent)" }}>{isAr ? "يبدأ من BHD 1,800" : "From BHD 1,800"}</span>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>{isAr ? "~17,999+ ريال سعودي" : "~SAR 17,999+"}</p>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {d.featureBusiness.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={`${langPrefix}/contact`} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
                {d.ctaContact}
              </a>
            </div>
          </div>

          <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "20px", textAlign: "center" }}>{d.footnote}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-header">
            <span className="section-eyebrow">{dict.faq.eyebrow}</span>
            <h2 className="text-heading">{dict.faq.headline}</h2>
          </div>
          {faqItems.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "20px 0", background: "none", border: "none", color: "var(--text)", fontSize: "16px", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", textAlign: "start", gap: "16px" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "none", color: "var(--accent)" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: "20px" }}>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" data-reveal>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="text-heading" style={{ marginBottom: "16px" }}>{isAr ? "مستعد للبدء؟" : "Ready to get started?"}</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "32px" }}>
              {isAr ? "احجز تقييمًا مجانيًا ونزور مكتبك." : "Book a free assessment and we'll visit your office."}
            </p>
            <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {d.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
