"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../i18n";
import { BRAND } from "@/content/brand";

interface Props {
  locale: Locale;
  dict: FullDict;
}

export default function HomePage({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = dict;

  const VERTICALS = [
    {
      slug: "/for/law-firms",
      name: d.who.lawFirms,
      desc: d.who.lawFirmsDesc,
      icon: <ScaleIcon />,
    },
    {
      slug: "/for/clinics",
      name: d.who.clinics,
      desc: d.who.clinicsDesc,
      icon: <StethoscopeIcon />,
    },
    {
      slug: "/for/schools",
      name: d.who.schools,
      desc: d.who.schoolsDesc,
      icon: <SchoolIcon />,
    },
    {
      slug: "/for/real-estate",
      name: d.who.realEstate,
      desc: d.who.realEstateDesc,
      icon: <BuildingIcon />,
    },
    {
      slug: "/for/accounting-consulting",
      name: d.who.accounting,
      desc: d.who.accountingDesc,
      icon: <CalculatorIcon />,
    },
    {
      slug: "/for/trading-companies",
      name: d.who.trading,
      desc: d.who.tradingDesc,
      icon: <GlobeIcon />,
    },
    {
      slug: "/for/government-contractors",
      name: d.who.government,
      desc: d.who.governmentDesc,
      icon: <ShieldIcon />,
    },
  ];

  return (
    <>
      {/* ── Hero removed: rendered server-side in page.tsx ── */}

      {/* ── Signal line divider ─────────────────────────────── */}
      <SignalLine />

      {/* ── Why ───────────────────────────────────────────── */}
      <section className="section" data-reveal style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-eyebrow">{d.why.eyebrow}</span>
            <h2 className="text-heading">{d.why.headline}</h2>
            <p style={{ margin: "0 auto", color: "var(--muted)", fontSize: "17px", lineHeight: 1.7 }}>
              {d.why.intro}
            </p>
          </div>
          <div className="grid-3">
            <div className="card" style={{ padding: "36px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,107,107,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 6s2-4 11-4 11 4 11 4" /><path d="M1 12s2-4 11-4 11 4 11 4"/><circle cx="12" cy="16" r="2"/><path d="M12 18v4"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: "var(--font-display)" }}>{d.why.outages.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{d.why.outages.body}</p>
            </div>
            <div className="card" style={{ padding: "36px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: "var(--font-display)" }}>{d.why.privacy.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{d.why.privacy.body}</p>
            </div>
            <div className="card" style={{ padding: "36px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(108,140,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "12px", fontFamily: "var(--font-display)" }}>{d.why.cost.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{d.why.cost.body}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── What You Get ───────────────────────────────────── */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{d.what.eyebrow}</span>
            <h2 className="text-heading">{d.what.headline}</h2>
          </div>
          <div className="grid-2">
            {[
              { title: d.what.stack, desc: d.what.stackDesc, icon: <ChipIcon /> },
              { title: d.what.models, desc: d.what.modelsList, icon: <BrainIcon /> },
              { title: d.what.rag, desc: d.what.ragDesc, icon: <DocumentIcon /> },
              { title: d.what.team, desc: d.what.teamDesc, icon: <UsersIcon /> },
              { title: d.what.setup, desc: d.what.setupDesc, icon: <ToolIcon /> },
              { title: d.what.support, desc: d.what.supportDesc, icon: <SupportIcon /> },
            ].map((item, i) => (
              <div key={i} className="card" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "6px", fontFamily: "var(--font-display)" }}>{item.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── Who It's For ─────────────────────────────────── */}
      <section className="section" data-reveal>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{d.who.eyebrow}</span>
            <h2 className="text-heading">{d.who.headline}</h2>
          </div>
          <div className="grid-3">
            {VERTICALS.map((v) => (
              <Link key={v.slug} href={`${langPrefix}${v.slug}`} className="card" style={{ display: "block" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <span style={{ color: "var(--accent)" }}>{v.icon}</span>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{v.name}</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.65 }}>{v.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{d.how.eyebrow}</span>
            <h2 className="text-heading">{d.how.headline}</h2>
          </div>
          <div style={{ display: "grid", gap: "0", position: "relative" }}>
            {[
              { n: "01", title: d.how.step1Title, desc: d.how.step1Desc },
              { n: "02", title: d.how.step2Title, desc: d.how.step2Desc },
              { n: "03", title: d.how.step3Title, desc: d.how.step3Desc },
              { n: "04", title: d.how.step4Title, desc: d.how.step4Desc },
              { n: "05", title: d.how.step5Title, desc: d.how.step5Desc },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "28px", alignItems: "flex-start", padding: "32px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 800, color: "var(--accent)", opacity: 0.5, lineHeight: 1, flexShrink: 0, minWidth: "60px" }}>
                  {step.n}
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{step.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "32px", fontSize: "15px", color: "var(--accent)", fontWeight: 500 }}>
            {d.how.typicalTime}
          </p>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── Packages ─────────────────────────────────────── */}
      <section className="section" data-reveal id="packages">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{d.pricing.eyebrow}</span>
            <h2 className="text-heading">{d.pricing.headline}</h2>
          </div>
          <PricingSection locale={locale} dict={d} langPrefix={langPrefix} />
        </div>
      </section>
      <div className="section-divider" />

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-header">
            <span className="section-eyebrow">{d.faq.eyebrow}</span>
            <h2 className="text-heading">{d.faq.headline}</h2>
          </div>
          <FAQAccordion dict={d} />
        </div>
      </section>
      <div className="section-divider" />

      {/* ── Case Studies ─────────────────────────────────── */}
      <section className="section" data-reveal>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{d.cases.eyebrow}</span>
            <h2 className="text-heading">{d.cases.headline}</h2>
            <p style={{ color: "var(--muted)", fontSize: "15px", marginTop: "8px" }}>{d.cases.note}</p>
          </div>
          <div className="grid-3">
            {[
              {
                city: d.cases.case1City,
                country: d.cases.case1Country,
                type: d.cases.case1Type,
                desc: d.cases.case1Desc,
              },
              {
                city: d.cases.case2City,
                country: d.cases.case2Country,
                type: d.cases.case2Type,
                desc: d.cases.case2Desc,
              },
              {
                city: d.cases.case3City,
                country: d.cases.case3Country,
                type: d.cases.case3Type,
                desc: d.cases.case3Desc,
              },
            ].map((c, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span className="badge badge-accent">{c.country}</span>
                  <span className="badge">{c.city}</span>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{c.type}</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" />

      {/* ── About ────────────────────────────────────────── */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ maxWidth: "760px" }}>
            <span className="section-eyebrow">{d.about.eyebrow}</span>
            <h2 className="text-heading" style={{ marginBottom: "32px" }}>{d.about.headline}</h2>
            <div style={{ display: "flex", gap: "48px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flexShrink: 0 }}>
                <ShareefPhotoFallback />
              </div>
              <div style={{ flex: 1, minWidth: "280px" }}>
                <p style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--muted)", marginBottom: "20px" }}>{d.about.p1}</p>
                <p style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--muted)", marginBottom: "20px" }}>{d.about.p2}</p>
                <p style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--muted)", marginBottom: "28px" }}>{d.about.p3}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{d.about.operatingEntities}</p>
                  <a href="https://premieralive.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {d.about.entitySaudi}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                  <a href="https://bahrainnights.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {d.about.entityBahrain}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────── */}
      <section className="section" data-reveal id="contact">
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div className="section-header" style={{ textAlign: "center" }}>
              <span className="section-eyebrow">{d.contact.eyebrow}</span>
              <h2 className="text-heading">{d.contact.headline}</h2>
              <p style={{ color: "var(--muted)", fontSize: "16px", marginTop: "8px" }}>{d.contact.subline}</p>
            </div>
            <ContactForm locale={locale} dict={d} />
          </div>
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────────── */}
      <CtaStrip locale={locale} dict={d} />
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────────

function PricingSection({ locale, dict, langPrefix }: { locale: Locale; dict: FullDict; langPrefix: string }) {
  const [currency, setCurrency] = useState<"BHD" | "SAR">("BHD");

  const prices = {
    essential: currency === "BHD" ? { main: "500", sub: "BHD 4,999" } : { main: "4,999", sub: "" },
    professional: currency === "BHD" ? { main: "750", sub: "BHD 7,499" } : { main: "7,499", sub: "" },
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
        <div style={{ display: "flex", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
          <button
            onClick={() => setCurrency("BHD")}
            style={{ padding: "8px 20px", background: currency === "BHD" ? "var(--accent)" : "transparent", color: currency === "BHD" ? "var(--bg)" : "var(--muted)", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}
          >
            BHD
          </button>
          <button
            onClick={() => setCurrency("SAR")}
            style={{ padding: "8px 20px", background: currency === "SAR" ? "var(--accent)" : "transparent", color: currency === "SAR" ? "var(--bg)" : "var(--muted)", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}
          >
            SAR
          </button>
        </div>
      </div>
      <div className="grid-3">
        {/* Essential */}
        <div className="pricing-card">
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{dict.pricing.essential}</h3>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>{dict.pricing.essentialDesc}</p>
          <div style={{ marginBottom: "28px" }}>
            <span className="price">
              <span className="price-currency">{currency === "BHD" ? "BHD" : "SAR"}</span>
              {" "}{prices.essential.main}
            </span>
            {prices.essential.sub && (
              <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>≈ {prices.essential.sub}</p>
            )}
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {dict.pricing.featureEssential.map((f, i) => (
              <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--muted)" }}>
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
          <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
            {dict.pricing.cta}
          </a>
        </div>

        {/* Professional */}
        <div className="pricing-card featured" style={{ borderColor: "var(--accent)" }}>
          <div style={{ display: "inline-block", background: "rgba(54,226,180,0.1)", color: "var(--accent)", borderRadius: "100px", fontSize: "12px", fontWeight: 700, padding: "4px 12px", marginBottom: "12px" }}>
            {dict.pricing.professionalFeatured}
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{dict.pricing.professional}</h3>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>{dict.pricing.professionalDesc}</p>
          <div style={{ marginBottom: "28px" }}>
            <span className="price">
              <span className="price-currency">{currency === "BHD" ? "BHD" : "SAR"}</span>
              {" "}{prices.professional.main}
            </span>
            {prices.professional.sub && (
              <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>≈ {prices.professional.sub}</p>
            )}
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {dict.pricing.featureProfessional.map((f, i) => (
              <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--muted)" }}>
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
          <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            {dict.pricing.cta}
          </a>
        </div>

        {/* Business */}
        <div className="pricing-card">
          <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{dict.pricing.business}</h3>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "24px", lineHeight: 1.6 }}>{dict.pricing.businessDesc}</p>
          <div style={{ marginBottom: "28px" }}>
            <span className="price" style={{ fontSize: "28px", color: "var(--accent)" }}>{locale === "ar" ? "يبدأ من BHD 1,800" : "From BHD 1,800"}</span>
            <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>{locale === "ar" ? "~17,999+ ريال سعودي" : "~SAR 17,999+"}</p>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
            {dict.pricing.featureBusiness.map((f, i) => (
              <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--muted)" }}>
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
          <Link href={`${langPrefix}/contact`} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
            {dict.pricing.ctaContact}
          </Link>
        </div>
      </div>

      {/* Schools */}
      <div className="card" style={{ marginTop: "24px", borderColor: "var(--accent)", background: "linear-gradient(135deg, rgba(54,226,180,0.04) 0%, var(--surface) 60%)" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <SchoolIcon />
              <h3 style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-display)" }}>{dict.pricing.schools}</h3>
            </div>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "16px" }}>{dict.pricing.schoolsDesc}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "14px", color: "var(--muted)" }}>
              <span>{currency === "BHD" ? "BHD 2,000–4,000" : "SAR 20,000–40,000"}</span>
              <span>+ hardware + annual retainer</span>
            </div>
          </div>
          <Link href={`${langPrefix}/for/schools`} className="btn btn-secondary">
            {dict.pricing.ctaContact}
          </Link>
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "20px", textAlign: "center" }}>{dict.pricing.footnote}</p>
    </>
  );
}

function FAQAccordion({ dict }: { dict: FullDict }) {
  const [open, setOpen] = useState<number | null>(0);

  const questions = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
    { q: dict.faq.q9, a: dict.faq.a9 },
    { q: dict.faq.q10, a: dict.faq.a10 },
  ];

  return (
    <div>
      {questions.map((item, i) => (
        <div key={i} className="accordion-item">
          <button
            className="accordion-trigger"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.q}
            <svg className={`accordion-icon ${open === i ? "open" : ""}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`accordion-content ${open === i ? "open" : ""}`}>
            <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, paddingBottom: "20px" }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactForm({ locale, dict }: { locale: Locale; dict: FullDict }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const d = dict;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (data.get("website")) return;

    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone") || "",
          city: data.get("city"),
          vertical: data.get("vertical"),
          machines: data.get("machines"),
          message: data.get("message"),
          locale,
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr" }}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">{d.contact.form.name} *</label>
          <input className="form-input" type="text" id="name" name="name" required />
        </div>
        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="company">{d.contact.form.company}</label>
            <input className="form-input" type="text" id="company" name="company" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">{d.contact.form.email} *</label>
            <input className="form-input" type="email" id="email" name="email" required />
          </div>
        </div>
        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">{d.contact.form.phone}</label>
            <input className="form-input" type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="city">{d.contact.form.city} *</label>
            <select className="form-select" id="city" name="city" required>
              <option value="">{d.contact.form.selectCity}</option>
              {Object.entries(d.contact.form.cityOptions).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="vertical">{d.contact.form.vertical}</label>
            <select className="form-select" id="vertical" name="vertical" required>
              <option value="">{d.contact.form.selectVertical}</option>
              {Object.entries(d.contact.form.verticalOptions).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="machines">{d.contact.form.machines}</label>
          <select className="form-select" id="machines" name="machines"          required>
            <option value="">{d.contact.form.selectMachines}</option>
            {Object.entries(d.contact.form.machinesOptions).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">{d.contact.form.message}</label>
          <textarea className="form-textarea" id="message" name="message" rows={4} />
        </div>
        {/* Honeypot */}
        <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      </div>

      {status === "success" && (
        <div style={{ background: "rgba(54,226,180,0.1)", border: "1px solid rgba(54,226,180,0.3)", borderRadius: "var(--radius-sm)", padding: "16px", color: "var(--accent)", fontSize: "15px" }}>
          {d.contact.form.success}
        </div>
      )}
      {status === "error" && (
        <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: "var(--radius-sm)", padding: "16px", color: "var(--danger)", fontSize: "15px" }}>
          {d.contact.form.error}
          {" "}
          <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
            {locale === "ar" ? "راسلنا على واتساب" : "Message us on WhatsApp"}
          </a>
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
        {status === "sending" ? d.contact.form.sending : d.contact.form.submit}
      </button>

      <p style={{ fontSize: "13px", color: "var(--muted)", textAlign: "center" }}>
        {locale === "ar" ? "أو تواصل مباشرة:" : "Or reach out directly:"}
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "14px" }}>
          <WhatsAppIcon />
          {locale === "ar" ? "واتساب" : "WhatsApp"}
        </a>
        <a href="tel:+97339007750" className="btn btn-secondary" style={{ fontSize: "14px" }}>
          {d.contact.callUs || "Call"}
        </a>
      </div>
    </form>
  );
}

function CtaStrip({ locale, dict }: { locale: Locale; dict: FullDict }) {
  return (
    <div className="cta-strip">
      <div className="container">
        <div className="cta-strip-inner">
          <span>
            <span style={{ color: "var(--accent)" }}>✓</span>
            {locale === "ar" ? "بدون سحابة" : "No cloud"}
          </span>
          <span className="cta-strip-dot" />
          <span>
            <span style={{ color: "var(--accent)" }}>✓</span>
            {locale === "ar" ? "بدون اشتراك" : "No subscription"}
          </span>
          <span className="cta-strip-dot" />
          <span>
            <span style={{ color: "var(--accent)" }}>✓</span>
            {locale === "ar" ? "بياناتك لا تغادر المبنى" : "Your data never leaves the building"}
          </span>
          <span className="cta-strip-dot" />
          <span>
            <span style={{ color: "var(--accent)" }}>✓</span>
            {locale === "ar" ? "تركيب في البحرين والسعودية" : "Installed in Bahrain & Saudi Arabia"}
          </span>
        </div>
      </div>
    </div>
  );
}

function SignalLine() {
  return (
    <div style={{ padding: "0", overflow: "hidden", lineHeight: 0 }}>
      <svg className="signal-line" viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,20 Q150,5 300,20 T600,20 T900,20 T1200,20" />
      </svg>
    </div>
  );
}

function ShareefPhotoFallback() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="60" fill="var(--surface-2)"/>
      <circle cx="60" cy="46" r="22" fill="var(--muted)" opacity="0.3"/>
      <ellipse cx="60" cy="100" rx="36" ry="28" fill="var(--muted)" opacity="0.2"/>
    </svg>
  );
}

// ─── Icon components ──────────────────────────────────────────────
function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
}
function CheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>;
}
function ScaleIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3l4 4-4 4M8 3L4 7l4 4M4 7h16"/></svg>;
}
function StethoscopeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6v0a6 6 0 006-6v-4"/><circle cx="20" cy="10" r="2"/></svg>;
}
function SchoolIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
}
function BuildingIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10M9 6h.01M15 6h.01M9 10h.01M15 10h.01"/></svg>;
}
function CalculatorIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>;
}
function GlobeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
}
function ShieldIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function ChipIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>;
}
function BrainIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 013.95-1.93A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-3.95-1.93A2.5 2.5 0 0014.5 2z"/></svg>;
}
function DocumentIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function UsersIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
}
function ToolIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
}
function SupportIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
}
