'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  { en: 'Professional Film', ar: 'فيلم احترافي' },
  { en: 'Website',            ar: 'موقع إلكتروني' },
  { en: 'Landing Pages',     ar: 'صفحات هبوط' },
  { en: 'Google Ads',         ar: 'إعلانات Google' },
  { en: 'SEO',                ar: 'تحسين محركات البحث' },
  { en: 'Monthly Reporting',  ar: 'تقارير شهرية' },
]

export default function GrowthSystemSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '0.75rem',
        }}>
          {isArabic ? 'نظام النمو' : 'THE SYSTEM'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: 'var(--color-text)',
          marginBottom: '0.75rem',
          lineHeight: 1.1,
        }}>
          {isArabic ? 'نظام النمو من بريميرا لايف' : 'The Premiera Growth System'}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'rgba(245,244,240,0.55)',
          maxWidth: '480px',
          marginInline: 'auto',
        }}>
          {isArabic
            ? 'نظام واحد. تغذي كل مرحلة ما بعدها.'
            : 'One system. Each piece feeds the next.'}
        </p>
      </div>

      {/* Steps — desktop: horizontal row; mobile: vertical stack */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 0,
        direction: isArabic ? 'rtl' : 'ltr',
      }}>
        {STEPS.map((step, i) => {
          const isLast = i === STEPS.length - 1
          return (
            <div key={step.en} style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: isArabic ? 'row-reverse' : 'row',
            }}>
              {/* Step card */}
              <div style={{
                background: '#16161B',
                border: '1px solid rgba(201,162,75,0.2)',
                borderRadius: '8px',
                padding: '1.25rem 1rem',
                minWidth: '130px',
                textAlign: 'center',
                flexShrink: 0,
              }}>
                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(201,162,75,0.5)',
                  marginBottom: '0.5rem',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Label */}
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#C9A24B',
                  lineHeight: 1.3,
                }}>
                  {isArabic ? step.ar : step.en}
                </div>
              </div>

              {/* Connector arrow — between cards, hidden on mobile */}
              {!isLast && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingInline: '0.375rem',
                  color: 'rgba(201,162,75,0.35)',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
                  className="growth-arrow"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .growth-arrow { display: none !important; }
        }
      `}</style>
    </Section>
  )
}
