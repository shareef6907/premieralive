'use client'

import { useTranslations, useLocale } from 'next-intl'

const PLACEHOLDER_POSTERS = [
  { label: 'Coming Soon', labelAr: 'قريباً' },
  { label: 'Coming Soon', labelAr: 'قريباً' },
  { label: 'Coming Soon', labelAr: 'قريباً' },
  { label: 'Coming Soon', labelAr: 'قريباً' },
  { label: 'Coming Soon', labelAr: 'قريباً' },
  { label: 'Coming Soon', labelAr: 'قريباً' },
]

export default function SelectedWork() {
  const t = useTranslations('work')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section
      id="work"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#0E0E10',
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
          marginBottom: '3rem',
          lineHeight: 1.05,
        }}
      >
        {t('heading')}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {PLACEHOLDER_POSTERS.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              aspectRatio: '9/16',
              background: '#16161B',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.12)',
              }}
            >
              {isArabic ? item.labelAr : item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
