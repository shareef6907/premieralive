'use client'

import Link from 'next/link'

interface ServiceCardProps {
  slug: string
  shortEn: string
  shortAr: string
  locale: string
  isArabic: boolean
}

export default function ServiceCard({ slug, shortEn, shortAr, locale, isArabic }: ServiceCardProps) {
  return (
    <Link
      href={`/${locale}/services/${slug}`}
      style={{
        display: 'block',
        padding: '1.25rem 1.5rem',
        background: 'var(--color-card)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201,162,75,0.5)'
        e.currentTarget.style.background = 'rgba(201,162,75,0.04)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-card-border)'
        e.currentTarget.style.background = 'var(--color-card)'
      }}
    >
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
        color: 'var(--color-text)',
        letterSpacing: '0.01em',
        marginBottom: '0.5rem',
      }}>
        {isArabic ? shortAr : shortEn}
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body-sm)',
        color: 'var(--color-text-faint)',
        lineHeight: 1.6,
      }}>
        {isArabic
          ? `${shortAr} — افحص الخدمة`
          : `View service →`}
      </p>
    </Link>
  )
}
