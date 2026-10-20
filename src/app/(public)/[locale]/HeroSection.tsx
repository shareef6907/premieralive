import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../i18n";
import { BRAND } from "@/content/brand";
import HeroEffects from "./HeroEffects";

interface Props {
  locale: Locale;
  dict: FullDict;
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function HeroIllustration() {
  return (
    <svg width="100%" height="auto" style={{ maxWidth: "600px", opacity: 0.9 }} viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="100" y="60" width="400" height="200" rx="8" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <rect x="150" y="180" width="300" height="60" rx="4" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
      <rect x="220" y="140" width="80" height="55" rx="4" stroke="rgba(54,226,180,0.3)" strokeWidth="1.5" fill="rgba(54,226,180,0.03)" />
      <rect x="245" y="195" width="30" height="8" rx="2" fill="rgba(54,226,180,0.15)" />
      <rect x="228" y="148" width="64" height="3" rx="1.5" fill="rgba(54,226,180,0.5)" />
      <rect x="228" y="155" width="48" height="2.5" rx="1" fill="rgba(54,226,180,0.3)" />
      <rect x="228" y="161" width="56" height="2.5" rx="1" fill="rgba(54,226,180,0.3)" />
      <rect x="228" y="167" width="40" height="2.5" rx="1" fill="rgba(54,226,180,0.3)" />
      <circle cx="260" cy="230" r="4" fill="var(--accent)" style={{ animation: "pulse-glow 2s ease infinite" }} />
      <circle cx="460" cy="90" r="28" stroke="rgba(255,107,107,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
      <path d="M442 78 L478 102M478 78 L442 102" stroke="rgba(255,107,107,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <text x="460" y="94" textAnchor="middle" fontSize="11" fill="rgba(255,107,107,0.5)" fontFamily="system-ui">☁</text>
      <path d="M300 230 Q330 210 360 230" stroke="rgba(54,226,180,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M300 230 Q340 200 380 230" stroke="rgba(54,226,180,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="380" y="170" width="20" height="16" rx="3" stroke="rgba(54,226,180,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M385 170 V164 Q390 158 395 164 V170" stroke="rgba(54,226,180,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <text x="300" y="265" textAnchor="middle" fontSize="12" fill="rgba(54,226,180,0.6)" fontFamily="system-ui" fontWeight="600">LOCAL NETWORK — FULLY OFFLINE</text>
    </svg>
  );
}

export default function HeroSection({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = dict;

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="grid-bg" />
      {/* Ambient gradient orbs + count-up stats + signal animation */}
      <HeroEffects locale={locale} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          <span className="section-eyebrow">{d.hero.eyebrow}</span>
          <h1 className="text-display" style={{ marginBottom: "24px", color: "var(--text)" }}>
            {d.hero.headline.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {i === 0 ? <><span style={{ color: "var(--accent)" }}>{line}</span></> : line}
              </span>
            ))}
          </h1>
          <p style={{ fontSize: "18px", color: "var(--muted)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            {d.hero.subline}
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "32px" }}>
            <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "15px", padding: "14px 32px" }}>
              <WhatsAppIcon />
              {d.hero.cta1}
            </a>
            <Link href={`${langPrefix}/pricing`} className="btn btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              {d.hero.cta2}
            </Link>
          </div>

          {/* Hero illustration */}
          <div style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
