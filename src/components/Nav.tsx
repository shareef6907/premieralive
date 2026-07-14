'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Nav() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: `/${locale}/#films`,    en: 'Films',       ar: 'الأفلام' },
    { href: `/${locale}/digital`,   en: 'Digital',     ar: 'رقمي' },
    { href: `/${locale}/marketing`, en: 'Marketing',   ar: 'التسويق' },
    { href: `/${locale}/#process`, en: 'Process',     ar: 'منهجية العمل' },
    { href: `/${locale}/#contact`, en: 'Contact',     ar: 'تواصل معنا' },
  ]

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(isArabic ? 'أرغب في حجز جلسة استراتيجية.' : "Hi, I'd like to book a strategy session.")}`
    : '#'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          transition: 'background 0.4s var(--ease-out), border-color 0.4s var(--ease-out)',
          background: scrolled ? 'rgba(10,10,11,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--card-border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${locale}`}
          style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}
          aria-label="Premiera Live home"
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', letterSpacing: '0.2em', color: 'var(--gold)' }}>
            PREMIERA
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.45em', color: 'rgba(201,162,75,0.65)', marginTop: '-2px' }}>
            LIVE
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                letterSpacing: '0.18em',
                color: 'rgba(245,244,240,0.65)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.65)')}
            >
              {isArabic ? link.ar : link.en}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Locale switcher */}
          <Link
            href={locale === 'en' ? '/ar' : '/en'}
            className="locale-toggle"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: 'rgba(245,244,240,0.5)',
              textDecoration: 'none',
              padding: '0.4rem 0.75rem',
              border: '1px solid var(--card-border)',
              borderRadius: '3px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {locale === 'en' ? 'عربي' : 'EN'}
          </Link>

          {/* Gold CTA button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.1rem',
              background: 'var(--gold)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              borderRadius: '100px',
              textDecoration: 'none',
              fontWeight: 700,
              boxShadow: '0 4px 20px rgba(201,162,75,0.3)',
              transition: 'box-shadow 0.3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 28px rgba(201,162,75,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,162,75,0.3)')}
          >
            {isArabic ? 'احجز جلسة استراتيجية' : 'BOOK A STRATEGY SESSION'}
          </a>

          {/* Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: 'rgba(245,244,240,0.7)',
                  transition: 'all 0.3s var(--ease-out)',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(5px, 5px)'
                        : i === 2
                        ? 'rotate(-45deg) translate(5px, -5px)'
                        : 'scaleX(0)'
                      : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(10,10,11,0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                letterSpacing: '0.15em',
                color: 'rgba(245,244,240,0.8)',
                textDecoration: 'none',
              }}
            >
              {isArabic ? link.ar : link.en}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              color: 'var(--gold)',
              textDecoration: 'none',
              marginTop: '1rem',
            }}
          >
            {isArabic ? 'احجز جلسة استراتيجية' : 'BOOK A STRATEGY SESSION'}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
