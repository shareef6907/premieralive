"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n";

const NAV_LINKS = [
  { href: "/", label: { en: "Home", ar: "الرئيسية" } },
  { href: "/pricing", label: { en: "Pricing", ar: "الأسعار" } },
  { href: "/how-it-works", label: { en: "How It Works", ar: "كيف يعمل" } },
  { href: "/for/law-firms", label: { en: "Industries", ar: "القطاعات" } },
  { href: "/about", label: { en: "About", ar: "من نحن" } },
  { href: "/contact", label: { en: "Contact", ar: "اتصل بنا" } },
];

interface HeaderProps {
  locale: Locale;
  labels: {
    getQuote: string;
    callUs: string;
    menu: string;
    close: string;
  };
}

export default function Header({ locale, labels }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const t = NAV_LINKS.map((link) => ({
    ...link,
    label: link.label[locale],
    href: locale === "ar" ? `/ar${link.href === "/" ? "" : link.href}` : link.href,
    isActive: pathname === link.href || pathname === `/ar${link.href}`,
  }));

  const langSwitchHref = locale === "en" ? `/ar${pathname === "/" ? "" : pathname}` : pathname.replace(/^\/ar/, "");

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="container">
          <nav className="nav">
            {/* Logo */}
            <Link href={locale === "en" ? "/" : "/ar"} className="flex items-center gap-2 font-display font-bold text-lg">
              <LogoIcon />
              <span>
                <span className="text-[var(--accent)]">Premiera</span>
                <span className="text-[var(--muted)]"> Local AI</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="nav-links">
              {t.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={link.isActive ? "active" : ""}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop actions */}
            <div className="nav-actions">
              <Link href={langSwitchHref} className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "13px" }}>
                {locale === "en" ? "عربي" : "English"}
              </Link>
              <Link href={locale === "en" ? "/contact" : "/ar/contact"} className="btn btn-primary" style={{ padding: "8px 20px", fontSize: "13px" }}>
                {labels.getQuote}
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label={labels.menu}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-nav-header">
          <Link href={locale === "en" ? "/" : "/ar"} className="flex items-center gap-2 font-display font-bold" onClick={() => setMobileOpen(false)}>
            <LogoIcon />
            <span><span style={{ color: "var(--accent)" }}>Premiera</span> Local AI</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} aria-label={labels.close} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: "28px", lineHeight: 1 }}>
            ×
          </button>
        </div>
        <ul className="mobile-nav-links">
          {t.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
            <Link href={langSwitchHref} className="btn btn-secondary" style={{ flex: 1 }}>
              {locale === "en" ? "عربي" : "English"}
            </Link>
            <Link href={locale === "en" ? "/contact" : "/ar/contact"} className="btn btn-primary" style={{ flex: 1 }} onClick={() => setMobileOpen(false)}>
              {labels.getQuote}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" />
      <path d="M8 16C8 11.582 11.582 8 16 8V8C20.418 8 24 11.582 24 16V16C24 20.418 20.418 24 16 24V24C11.582 24 8 20.418 8 16V16Z" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="4" fill="var(--accent)"/>
      <path d="M16 8V12M16 20V24M8 16H12M20 16H24" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
