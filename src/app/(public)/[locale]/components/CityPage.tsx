"use client";
import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";
import { BRAND } from "@/content/brand";

interface Props {
  locale: Locale;
  dict: FullDict;
  citySlug: string;
  country: "bahrain" | "saudi-arabia";
  cityData: {
    country: string; countryAr: string; name: string; nameAr: string;
    desc: string; descAr: string;
    whoWeServe: { vertical: string; verticalAr: string; emphasis: string; emphasisAr: string }[];
    howItWorks: string; howItWorksAr: string;
    faq: { q: string; qAr: string; a: string; aAr: string }[];
    cities: string[];
  };
}

export default function CityPage({ locale, dict, citySlug, country, cityData }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = isAr ? cityData : {
    country: cityData.country,
    name: cityData.name,
    desc: cityData.desc,
    whoWeServe: cityData.whoWeServe.map(w => ({ vertical: w.vertical, emphasis: w.emphasis })),
    howItWorks: cityData.howItWorks,
    faq: cityData.faq.map(f => ({ q: f.q, a: f.a })),
  };
  const whoAr = isAr ? cityData.whoWeServe.map(w => ({ vertical: w.verticalAr, emphasis: w.emphasisAr })) : cityData.whoWeServe;
  const faqAr = cityData.faq.map(f => ({ q: f.qAr, a: f.aAr }));
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openCityFaq, setOpenCityFaq] = useState<number | null>(null);
  const countryPrefix = `/${country}`;

  const faqItems = isAr
    ? faqAr.map((f, i) => ({ q: f.q, a: f.a }))
    : cityData.faq.map(f => ({ q: f.q, a: f.a }));

  const whoItems = isAr ? whoAr : cityData.whoWeServe;

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Breadcrumb */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href={`${langPrefix}${countryPrefix}`}>
              {isAr ? (country === "bahrain" ? "البحرين" : "المملكة العربية السعودية") : (country === "bahrain" ? "Bahrain" : "Saudi Arabia")}
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span>{isAr ? cityData.nameAr : cityData.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,226,180,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-eyebrow">
              {isAr ? (cityData.countryAr) : cityData.country}
            </span>
            <h1 className="text-display" style={{ marginBottom: "16px" }}>
              {isAr ? cityData.nameAr : cityData.name}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--muted)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 }}>
              {isAr ? cityData.descAr : cityData.desc}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "15px", padding: "14px 32px" }}>
                <WhatsAppIcon />
                {isAr ? "تواصل معنا الآن" : "Contact us now"}
              </a>
              <Link href={`${langPrefix}/pricing`} className="btn btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                {dict.pricing.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "من نخدم" : "Who We Serve"}</span>
            <h2 className="text-heading">
              {isAr ? `من نخدم في ${cityData.nameAr}` : `Who we serve in ${cityData.name}`}
            </h2>
          </div>
          <div className="grid-3">
            {whoItems.map((w, i) => (
              <div key={i} className="card">
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{w.vertical}</h3>
                <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.65 }}>{w.emphasis}</p>
                <div style={{ marginTop: "16px" }}>
                  <Link href={`${langPrefix}/for/${getVerticalSlug(w.vertical)}`} style={{ color: "var(--accent)", fontSize: "14px", fontWeight: 600 }}>
                    {isAr ? "اعرف المزيد" : "Learn more"} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "كيف يعمل" : "How It Works"}</span>
            <h2 className="text-heading">
              {isAr ? `كيف يعمل التركيب في ${cityData.nameAr}` : `How a ${cityData.name} install works`}
            </h2>
          </div>
          <div className="grid-2">
            {[
              { n: "01", title: isAr ? "تقييم مجاني" : "Free Assessment", desc: isAr ? "نتواصل معك لفهم إعدادك — عادةً عبر مكالمة فيديو أو زيارة ميدانية." : "We discuss your setup — typically a video call or on-site visit." },
              { n: "02", title: isAr ? "فحص الأجهزة" : "Hardware Check", desc: isAr ? "نتحقق من أجهزتك — 16 غيغابايت كحد أدنى، نُعدّ التوصيات إن لزم الأمر." : "We check your hardware — 16 GB minimum, we advise if upgrades are needed." },
              { n: "03", title: isAr ? "تركيب ميداني" : "On-site Installation", desc: isAr ? "نحضر بجهاز التثبيت. التركيب النموذجي: 3-4 ساعات." : "We arrive with an offline installer. Typical install: 3-4 hours." },
              { n: "04", title: isAr ? "تحميل مستنداتك" : "Load Your Documents", desc: isAr ? "نُعدّ قاعدة المعرفة RAG بملفاتك — أنت من يختار ما يدخل." : "We configure your RAG knowledge base with your files — you choose what goes in." },
              { n: "05", title: isAr ? "تدريب فريقك" : "Train Your Team", desc: isAr ? "جلسة 60 دقيقة مع فريقك + دليل مطبوع." : "A 60-minute session with your team + a printed guide." },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 800, color: "var(--accent)", opacity: 0.4, lineHeight: 1, flexShrink: 0, minWidth: "50px" }}>{step.n}</div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{step.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "40px", padding: "24px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--accent)" }}>→</strong>{" "}
              {isAr ? cityData.howItWorksAr : cityData.howItWorks}
            </p>
          </div>
        </div>
      </section>

      {/* Packages Summary */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{dict.pricing.eyebrow}</span>
            <h2 className="text-heading">{dict.pricing.headline}</h2>
          </div>
          <div className="grid-3">
            {[
              { name: dict.pricing.essential, price: "BHD 500", sub: isAr ? "~4,999 ريال سعودي" : "~SAR 4,999", desc: dict.pricing.essentialDesc, features: dict.pricing.featureEssential.slice(0, 4) },
              { name: dict.pricing.professional, price: "BHD 750", sub: isAr ? "~7,499 ريال سعودي" : "~SAR 7,499", desc: dict.pricing.professionalDesc, features: dict.pricing.featureProfessional.slice(0, 4), featured: true },
              { name: dict.pricing.business, price: "From BHD 1,800", sub: isAr ? "~18,999+ ريال سعودي" : "~SAR 18,999+", desc: dict.pricing.businessDesc, features: dict.pricing.featureBusiness.slice(0, 4) },
            ].map((pkg, i) => (
              <div key={i} className={`pricing-card${pkg.featured ? " featured" : ""}`}>
                {pkg.featured && <div style={{ display: "inline-block", background: "rgba(54,226,180,0.1)", color: "var(--accent)", borderRadius: "100px", fontSize: "12px", fontWeight: 700, padding: "4px 12px", marginBottom: "12px" }}>{dict.pricing.professionalFeatured}</div>}
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{pkg.name}</h3>
                <div style={{ marginBottom: "20px" }}>
                  <span className="price"><span className="price-currency">BHD</span> {pkg.price.replace("BHD ", "")}</span>
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "4px" }}>{pkg.sub}</p>
                </div>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px", lineHeight: 1.6 }}>{pkg.desc}</p>
                <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "14px" }}>
                  {dict.pricing.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City FAQ */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-header">
            <span className="section-eyebrow">{dict.faq.eyebrow}</span>
            <h2 className="text-heading">
              {isAr ? `أسئلة شائعة عن التركيب في ${cityData.nameAr}` : `Questions about installing in ${cityData.name}`}
            </h2>
          </div>
          <div>
            {faqItems.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "20px 0", background: "none", border: "none", color: "var(--text)", fontSize: "16px", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", textAlign: "start", gap: "16px" }}
                  onClick={() => setOpenCityFaq(openCityFaq === i ? null : i)}
                >
                  {item.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform 0.3s", transform: openCityFaq === i ? "rotate(180deg)" : "none", color: "var(--accent)" }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openCityFaq === i && (
                  <div style={{ paddingBottom: "20px" }}>
                    <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "مدن أخرى" : "Other Cities"}</span>
            <h2 className="text-heading">
              {isAr ? `Other ${country === "bahrain" ? "مدن في البحرين" : "مدن في السعودية"}` : `Other ${country === "bahrain" ? "Bahrain" : "Saudi Arabia"} cities`}
            </h2>
          </div>
          <div className="grid-3">
            {cityData.cities.map((cSlug) => (
              <Link key={cSlug} href={`${langPrefix}${countryPrefix}/${cSlug}`} className="card" style={{ display: "block" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px", fontFamily: "var(--font-display)" }}>{getCityName(cSlug)}</h3>
                <p style={{ fontSize: "13px", color: "var(--accent)" }}>{isAr ? "عرض التفاصيل →" : "View details →"}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="text-heading" style={{ marginBottom: "16px" }}>
              {isAr ? `ابدأ الآن في ${cityData.nameAr}` : `Get started in ${cityData.name}`}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "32px" }}>
              {isAr
                ? `تركيب في ${cityData.nameAr} خلال أيام. بدون التزام.`
                : `Installation in ${cityData.name} within days. No commitment.`}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "15px", padding: "14px 32px" }}>
                <WhatsAppIcon />
                {isAr ? "راسلنا الآن" : "Message us now"}
              </a>
              <Link href={`${langPrefix}/contact`} className="btn btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                {isAr ? "تواصل معنا" : "Contact us"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": isAr ? "الرئيسية" : "Home", "item": `${BRAND.domain}${langPrefix}` },
              { "@type": "ListItem", "position": 2, "name": isAr ? (country === "bahrain" ? "البحرين" : "السعودية") : (country === "bahrain" ? "Bahrain" : "Saudi Arabia"), "item": `${BRAND.domain}${langPrefix}${countryPrefix}` },
              { "@type": "ListItem", "position": 3, "name": isAr ? cityData.nameAr : cityData.name, "item": `${BRAND.domain}${langPrefix}${countryPrefix}/${citySlug}` },
            ],
          }),
        }}
      />
    </div>
  );
}

function getVerticalSlug(name: string): string {
  const map: Record<string, string> = {
    "Law Firms": "law-firms",
    "Clinics & Medical": "clinics",
    "Clinics & Healthcare": "clinics",
    "Schools (K-12)": "schools",
    "Real Estate Companies": "real-estate",
    "Accounting & Consulting": "accounting-consulting",
    "Accounting & Financial": "accounting-consulting",
    "Trading & Distribution": "trading-companies",
    "Trading & Logistics": "trading-companies",
    "Government Contractors": "government-contractors",
    "Government Offices": "government-contractors",
    "Government Services": "government-contractors",
    "Healthcare": "clinics",
    "Medical": "clinics",
    "Law": "law-firms",
    "Financial": "accounting-consulting",
    "Financial Services": "accounting-consulting",
    "Professional Services": "accounting-consulting",
    "Industrial": "trading-companies",
    "Oil & Gas": "trading-companies",
    "Construction": "trading-companies",
    "Manufacturing": "trading-companies",
    "Engineering": "trading-companies",
    "Logistics": "trading-companies",
    "Logistics & Shipping": "trading-companies",
    "Schools": "schools",
    "Educational": "schools",
    "Education": "schools",
    "Wealth Management": "accounting-consulting",
    "Family Law Practices": "law-firms",
    "Family Law Firms": "law-firms",
    "Private Clinics": "clinics",
    "Dental": "clinics",
    "Dentists": "clinics",
    "Accountants": "accounting-consulting",
    "Tax Advisors": "accounting-consulting",
    "Tutorial Centres": "schools",
    "Retail": "trading-companies",
    "Hotels": "trading-companies",
    "Hotels & Hospitality": "trading-companies",
  };
  return map[name] || "";
}

function getCityName(slug: string): string {
  const names: Record<string, string> = {
    manama: "Manama", riffa: "Riffa", muharraq: "Muharraq", "isa-town": "Isa Town",
    "hamad-town": "Hamad Town", aali: "A'ali", saar: "Saar",
    riyadh: "Riyadh", jeddah: "Jeddah", dammam: "Dammam", "al-khobar": "Al Khobar",
    dhahran: "Dhahran", jubail: "Jubail", mecca: "Mecca", medina: "Medina", tabuk: "Tabuk", abha: "Abha",
  };
  return names[slug] || slug;
}

function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
}
