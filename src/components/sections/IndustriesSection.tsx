'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'

const INDUSTRIES = [
  { en: 'Restaurants & Hospitality', ar: 'المطاعم والضيافة' },
  { en: 'Healthcare', ar: 'الرعاية الصحية' },
  { en: 'Retail & E-commerce', ar: 'التجزئة والتجارة الإلكترونية' },
  { en: 'Real Estate & Construction', ar: 'العقارات والمقاولات' },
  { en: 'Industrial', ar: 'الصناعة' },
  { en: 'Government & Education', ar: 'الحكومة والتعليم' },
  { en: 'Events & Entertainment', ar: 'الفعاليات والترفيه' },
  { en: 'Automotive', ar: 'السيارات' },
]

export default function IndustriesSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section id="industries" eyebrow={isArabic ? 'القطاعات' : 'INDUSTRIES'}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {INDUSTRIES.map((ind) => (
          <span
            key={ind.en}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid var(--color-card-border)',
              borderRadius: '999px',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLElement).style.borderColor = 'var(--color-gold-soft)'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLElement).style.borderColor = 'var(--color-card-border)'
            }}
          >
            {isArabic ? ind.ar : ind.en}
          </span>
        ))}
      </div>
    </Section>
  )
}
