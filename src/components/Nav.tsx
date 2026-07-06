'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
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
        padding: '0 2rem',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        background: scrolled ? 'rgba(10,10,11,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <Link
        href={`/${locale}`}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            letterSpacing: '0.2em',
            color: '#C9A24B',
          }}
        >
          {locale === 'ar' ? 'بريميرا' : 'PREMIERA'}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.55rem',
            letterSpacing: '0.45em',
            color: 'rgba(201,162,75,0.65)',
            marginTop: '-2px',
          }}
        >
          {locale === 'ar' ? 'لايف' : 'LIVE'}
        </span>
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}
        className="desktop-nav"
      >
        {['work', 'services', 'whyUs', 'contact'].map((key) => (
          <a
            key={key}
            href={`#${key}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {t(key)}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link
          href={locale === 'en' ? '/ar' : '/en'}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
            padding: '0.25rem 0.6rem',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '3px',
            transition: 'all 0.2s',
          }}
        >
          {locale === 'en' ? 'عربي' : 'EN'}
        </Link>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1.1rem',
            background: '#C9A24B',
            color: '#0A0A0B',
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: 700,
            boxShadow: '0 4px 20px rgba(201,162,75,0.35)',
          }}
        >
          {t('startProject')}
        </a>
      </div>
    </nav>
  )
}
