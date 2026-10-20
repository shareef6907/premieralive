"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";
import type { VerticalSlug } from "@/content/verticals/index";
import { VERTICALS } from "@/content/verticals/index";
import { BRAND } from "@/content/brand";

interface Props {
  locale: Locale;
  dict: FullDict;
  slug: VerticalSlug;
}

const VERTICAL_NAME: Record<VerticalSlug, { en: string; ar: string }> = {
  "law-firms": { en: "Law Firms", ar: "مكاتب المحاماة" },
  "clinics": { en: "Clinics & Medical Centres", ar: "العيادات والمراكز الطبية" },
  "schools": { en: "Schools (K-12)", ar: "المدارس" },
  "real-estate": { en: "Real Estate Companies", ar: "شركات العقار" },
  "accounting-consulting": { en: "Accounting & Consulting", ar: "المكاتب المحاسبة والاستشارات" },
  "trading-companies": { en: "Trading & Distribution", ar: "الشركات التجارية والتوزيع" },
  "government-contractors": { en: "Government Contractors", ar: "مقاولو الجهات الحكومية" },
};

export default function VerticalPage({ locale, dict, slug }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const content = VERTICALS[slug];
  if (!content) return null;

  const c = isAr ? content.ar : content.en;
  const name = VERTICAL_NAME[slug];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // City cross-links (filter to valid cities)
  const cityLinks = (content.cities || []).slice(0, 6).map((city) => {
    const cityData = getCityData(city);
    return { slug: city, name: cityData?.name || city, nameAr: cityData?.nameAr || city };
  });

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href={`${langPrefix}/#who`}>{isAr ? "القطاعات" : "Industries"}</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{isAr ? name.ar : name.en}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,226,180,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-eyebrow">{isAr ? "لـ" : "For "}{isAr ? name.ar : name.en}</span>
            <h1 className="text-display" style={{ marginBottom: "24px" }}>{c.headline}</h1>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <WhatsAppIcon />
                {c.cta}
              </a>
              <Link href={`${langPrefix}/pricing`} className="btn btn-secondary">{dict.pricing.cta}</Link>
            </div>
            <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", fontSize: "14px", color: "var(--muted)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                {isAr ? "بدون اتصال إنترنت" : "Works offline"}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                {isAr ? "تركيب ميداني" : "Installed on-site"}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                {isAr ? "بدون رسوم شهرية" : "No monthly fees"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "760px" }}>
            <h2 className="text-heading" style={{ marginBottom: "24px" }}>
              {isAr ? "ما هو الذكاء الاصطناعي المحلي لـ" : "What local AI means for "}{isAr ? name.ar : name.en}
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--muted)" }}>{c.intro}</p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "حالات الاستخدام" : "Use Cases"}</span>
            <h2 className="text-heading">{c.useCasesTitle}</h2>
          </div>
          <div className="grid-3">
            {c.useCases.map((uc, i) => (
              <div key={i} className="card">
                <div style={{ marginBottom: "16px" }}>
                  <span className="badge badge-accent">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", fontFamily: "var(--font-display)" }}>{uc.title}</h3>
                <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "16px", marginBottom: "16px", fontFamily: "monospace", fontSize: "13px", color: "var(--accent)", lineHeight: 1.6 }}>
                  {uc.prompt}
                </div>
                <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7 }}>{uc.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confidentiality + Recommended Package */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="card" style={{ borderColor: "rgba(54,226,180,0.3)", background: "linear-gradient(135deg, rgba(54,226,180,0.04) 0%, var(--surface) 60%)" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", fontFamily: "var(--font-display)" }}>
                {isAr ? "الخصوصية والأمان" : "Privacy & Security"}
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7 }}>{c.confidentiality}</p>
            </div>
            <div className="card">
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(108,140,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", fontFamily: "var(--font-display)" }}>
                {isAr ? "الباقة الموصى بها" : "Recommended Package"}
              </h3>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "16px" }}>{c.recommendedPackage}</p>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7 }}><strong>{isAr ? "ملاحظة الأجهزة:" : "Hardware note:"}</strong> {c.hardwareNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objections */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "الاعتراضات الشائعة" : "Common Questions"}</span>
            <h2 className="text-heading">{c.objectionsTitle}</h2>
          </div>
          <div>
            {c.objections.map((obj, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "20px 0", background: "none", border: "none", color: "var(--text)", fontSize: "16px", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", textAlign: "start", gap: "16px" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {obj.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "none", color: "var(--accent)" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: "20px", maxHeight: "300px", overflow: "hidden", transition: "max-height 0.3s" }}>
                    <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{obj.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      {cityLinks.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow">{isAr ? "المدن التي نخدمها" : "Cities We Serve"}</span>
              <h2 className="text-heading">
                {isAr ? "متاح في " : "Available in "}
                {isAr ? name.ar : name.en} {isAr ? "في هذه المدن" : "in these cities"}
              </h2>
            </div>
            <div className="grid-3">
              {cityLinks.map((city) => (
                <Link key={city.slug} href={`${langPrefix}/bahrain/${city.slug}`} className="card" style={{ display: "block" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px", fontFamily: "var(--font-display)" }}>{isAr ? city.nameAr : city.name}</h3>
                  <p style={{ fontSize: "13px", color: "var(--accent)" }}>{isAr ? "عرض التفاصيل ←" : "View details →"}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="text-heading" style={{ marginBottom: "16px" }}>
              {isAr ? "مستعد للبدء؟" : "Ready to get started?"}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "32px" }}>
              {isAr
                ? `احصل على تقييم مجاني لمكتب ${name.ar} الخاص بك. بدون التزام.`
                : `Get a free assessment for your ${name.en}. No commitment.`}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "15px", padding: "14px 32px" }}>
                <WhatsAppIcon />
                {c.cta}
              </a>
              <Link href={`${langPrefix}/contact`} className="btn btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                {isAr ? "تواصل معنا" : "Contact us"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getCityData(slug: string) {
  try {
    const { CITIES } = require("@/content/cities");
    return CITIES[slug];
  } catch {
    return null;
  }
}

function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
}
