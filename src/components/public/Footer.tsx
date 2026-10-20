import Link from "next/link";
import type { Locale } from "@/i18n";

const VERTICAL_LINKS = [
  { href: "/for/law-firms", labelEn: "Law Firms", labelAr: "مكاتب المحاماة" },
  { href: "/for/clinics", labelEn: "Clinics", labelAr: "العيادات والمراكز الطبية" },
  { href: "/for/schools", labelEn: "Schools (K-12)", labelAr: "المدارس" },
  { href: "/for/real-estate", labelEn: "Real Estate", labelAr: "شركات العقار" },
  { href: "/for/accounting-consulting", labelEn: "Accounting & Consulting", labelAr: "المحاسبة والاستشارات" },
  { href: "/for/trading-companies", labelEn: "Trading & Distribution", labelAr: "التجارة والتوزيع" },
  { href: "/for/government-contractors", labelEn: "Government Contractors", labelAr: "مقاولو الجهات الحكومية" },
];

const BAHRAIN_CITIES = [
  { href: "/bahrain/manama", label: "Manama" },
  { href: "/bahrain/muharraq", label: "Muharraq" },
  { href: "/bahrain/riffa", label: "Riffa" },
  { href: "/bahrain/hamad-town", label: "Hamad Town" },
  { href: "/bahrain/aali", label: "A'ali" },
  { href: "/bahrain/saar", label: "Saar" },
];

const SAUDI_CITIES = [
  { href: "/saudi-arabia/riyadh", label: "Riyadh" },
  { href: "/saudi-arabia/jeddah", label: "Jeddah" },
  { href: "/saudi-arabia/dammam", label: "Dammam" },
  { href: "/saudi-arabia/al-khobar", label: "Al Khobar" },
  { href: "/saudi-arabia/mecca", label: "Mecca" },
  { href: "/saudi-arabia/medina", label: "Medina" },
];

interface FooterProps {
  locale: Locale;
  labels: {
    tagline: string;
    industries: string;
    cities: string;
    company: string;
    legal: string;
    privacy: string;
    terms: string;
    allCities: string;
    allIndustries: string;
    bahrainCr: string;
    saudiCr: string;
    addressSaudi: string;
    addressBahrain: string;
  };
}

export default function Footer({ locale, labels }: FooterProps) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px" }}>
                <span style={{ color: "var(--accent)" }}>Premiera</span> Local AI
              </span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.7, maxWidth: "32ch" }}>
              {labels.tagline}
            </p>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <a
                href="https://wa.me/97339007750"
                style={{ fontSize: "14px", color: "var(--muted)", display: "flex", alignItems: "center", gap: "6px" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ color: "var(--accent)" }}>WhatsApp</span> +973 3900 7750
              </a>
              <a
                href="mailto:ceo@premieralive.com"
                style={{ fontSize: "14px", color: "var(--muted)" }}
              >
                ceo@premieralive.com
              </a>
            </div>
          </div>

          {/* Industries */}
          <div>
            <p className="footer-heading">{labels.industries}</p>
            <ul style={{ listStyle: "none" }}>
              {VERTICAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={`${langPrefix}${link.href}`} className="footer-link">
                    {isAr ? link.labelAr : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <p className="footer-heading">{labels.cities}</p>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Bahrain
            </p>
            <ul style={{ listStyle: "none", marginBottom: "16px" }}>
              {BAHRAIN_CITIES.map((link) => (
                <li key={link.href}>
                  <Link href={`${langPrefix}${link.href}`} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Saudi Arabia
            </p>
            <ul style={{ listStyle: "none" }}>
              {SAUDI_CITIES.map((link) => (
                <li key={link.href}>
                  <Link href={`${langPrefix}${link.href}`} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer-heading">{labels.company}</p>
            <ul style={{ listStyle: "none" }}>
              <li><Link href={`${langPrefix}/about`} className="footer-link">{isAr ? "من نحن" : "About"}</Link></li>
              <li><Link href={`${langPrefix}/how-it-works`} className="footer-link">{isAr ? "كيف يعمل" : "How It Works"}</Link></li>
              <li><Link href={`${langPrefix}/pricing`} className="footer-link">{isAr ? "الأسعار" : "Pricing"}</Link></li>
              <li><Link href={`${langPrefix}/faq`} className="footer-link">{isAr ? "الأسئلة الشائعة" : "FAQ"}</Link></li>
              <li><Link href={`${langPrefix}/blog`} className="footer-link">{isAr ? "المدونة" : "Blog"}</Link></li>
              <li><Link href={`${langPrefix}/contact`} className="footer-link">{isAr ? "اتصل بنا" : "Contact"}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            <p>Premiera Live &bull; {isAr ? "الذكاء الاصطناعي المحلي" : "Local AI for Gulf businesses"}</p>
            <p style={{ marginTop: "4px", fontSize: "12px" }}>
              {isAr ? (
                <>المملكة العربية السعودية: {labels.addressSaudi} &bull; {labels.bahrainCr}</>
              ) : (
                <>Saudi Arabia: {labels.addressSaudi} &bull; {labels.saudiCr}</>
              )}
            </p>
            <p style={{ marginTop: "2px", fontSize: "12px" }}>
              {isAr ? (
                <>البحرين: {labels.addressBahrain} &bull; CR {labels.bahrainCr}</>
              ) : (
                <>Bahrain: {labels.addressBahrain} &bull; CR {labels.bahrainCr}</>
              )}
            </p>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "var(--muted)" }}>
              {isAr ? "لا بيانات تُرسل للخادم" : "No data sent to any server"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
