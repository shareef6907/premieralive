'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'
import { IMAGES } from '@/config/media'

const PILLARS = [
  {
    imageKey: 'pillarCreative',
    msgKey: 'creative',
  },
  {
    imageKey: 'pillarContent',
    msgKey: 'content',
  },
  {
    imageKey: 'pillarTechnology',
    msgKey: 'technology',
  },
  {
    imageKey: 'pillarAiGrowth',
    msgKey: 'aiGrowth',
  },
]

export default function FourPillarsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  // We do a dynamic require trick: read from window.location to get the locale
  // Since this is a 'use client' component we can use a data-attribute set by the server
  // Instead: inline the messages directly (they are static copy from the spec)
  const titles: Record<string, { en: string; ar: string }> = {
    creative: { en: 'CREATIVE', ar: 'الإبداع' },
    content: { en: 'CONTENT', ar: 'المحتوى' },
    technology: { en: 'TECHNOLOGY', ar: 'التقنية' },
    aiGrowth: { en: 'AI & GROWTH', ar: 'الذكاء الاصطناعي والنمو' },
  }
  const descs: Record<string, { en: string; ar: string }> = {
    creative: {
      en: 'Brand identities and campaigns built to be remembered.',
      ar: 'نبتكر هويات وحملات تبقى في الذاكرة.',
    },
    content: {
      en: 'Cinema-grade film, photography, and animation.',
      ar: 'ننتج أفلاماً وصوراً ورسوماً بمستوى سينمائي.',
    },
    technology: {
      en: 'Websites and software engineered like products.',
      ar: 'نبني مواقع وبرمجيات بمعايير المنتجات العالمية.',
    },
    aiGrowth: {
      en: 'Intelligent systems that sell while you sleep.',
      ar: 'نطوّر أنظمة ذكية تبيع نيابةً عنك على مدار الساعة.',
    },
  }

  return (
    <Section
      id="services"
      eyebrow={isArabic ? 'ماذا نقدم' : 'WHAT WE DO'}
      title={isArabic ? 'نجمع أربعة تخصصات تحت شريك واحد.' : 'ONE PARTNER. FOUR DISCIPLINES.'}
    >
      <div className="pillars-grid">
        {PILLARS.map((pillar) => {
          const imgUrl = IMAGES[pillar.imageKey as keyof typeof IMAGES] as string
          return (
            <div
              key={pillar.msgKey}
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
              }}
            >
              {/* Image header — 4:5 aspect */}
              <div
                style={{
                  aspectRatio: '4 / 5',
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                {/* Gradient overlay: card bg at bottom → transparent at top */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, var(--color-card) 0%, transparent 60%)',
                  }}
                />
              </div>

              {/* Text block */}
              <div style={{ padding: '1.5rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
                    color: 'var(--color-text)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  {titles[pillar.msgKey][isArabic ? 'ar' : 'en']}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--body-sm)',
                    color: 'var(--color-text-dim)',
                    lineHeight: 1.6,
                  }}
                >
                  {descs[pillar.msgKey][isArabic ? 'ar' : 'en']}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
