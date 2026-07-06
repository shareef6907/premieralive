'use client'

import { useTranslations, useLocale } from 'next-intl'

export default function WhyUs() {
  const t = useTranslations('whyUs')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const stats = t.raw('stats') as Array<{
    value: string
    label: string
    labelAr: string
  }>

  return (
    <section
      id="whyUs"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#0A0A0B',
        borderTop: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: '#C9A24B',
          marginBottom: '1.5rem',
        }}
      >
        {t('eyebrow')}
      </p>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: '#fff',
          marginBottom: '4rem',
          lineHeight: 1.05,
        }}
      >
        {t('heading')}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '2rem',
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: '#C9A24B',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
              }}
            >
              {isArabic ? stat.labelAr : stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
