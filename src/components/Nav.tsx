'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const links = [
  { href: '/#work',        label: { en: 'Work',        ar: 'أعمالنا' } },
  { href: '/#services',    label: { en: 'Services',    ar: 'خدماتنا' } },
  { href: '/#ai',          label: { en: 'AI',          ar: 'الذكاء الاصطناعي' } },
  { href: '/#process',     label: { en: 'Process',     ar: 'منهجية العمل' } },
  { href: '/#contact',     label: { en: 'Contact',     ar: 'اتصل بنا' } },
];

export default function Nav() {
  const locale = useParams().locale as string;
  const pathname = usePathname();
  const isArabic = locale === 'ar';

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = isArabic ? 'en' : 'ar';
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'var(--bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--card-border)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--gold)',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              PREMIERA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: 'var(--text-dim)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              LIVE
            </span>
          </div>
        </Link>

        {/* Center links */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                fontWeight: 500,
                color: 'var(--text-dim)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {isArabic ? link.label.ar : link.label.en}
            </a>
          ))}
        </div>

        {/* Right: locale switcher + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Locale switcher */}
          <Link
            href={otherPath}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              fontWeight: 500,
              color: 'var(--text-dim)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            {otherLocale.toUpperCase()}
          </Link>

          {/* Gold CTA */}
          <a
            href="https://wa.me/97366170000"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              fontWeight: 600,
              color: 'var(--bg)',
              background: 'var(--gold)',
              padding: '0.5rem 1.25rem',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            {isArabic ? 'احجز جلسة استراتيجية' : 'Book a Strategy Session'}
          </a>
        </div>
      </div>
    </nav>
  );
}
