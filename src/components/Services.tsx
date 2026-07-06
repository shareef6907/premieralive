'use client'

import { useTranslations, useLocale } from 'next-intl'

export default function Services() {
  const t = useTranslations('services')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const items = t.raw('items') as Array<{
    name: string
    nameAr: string
    desc: string
    descAr: string
  }>

  return (
    <section
      id="services"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#0A0A0B',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: '#16161B',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '2rem',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,162,75,0.3)'
              ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)'
              ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                letterSpacing: '0.06em',
                color: '#fff',
                marginBottom: '0.75rem',
              }}
            >
              {isArabic ? item.nameAr : item.name}
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.6,
              }}
            >
              {isArabic ? item.descAr : item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
