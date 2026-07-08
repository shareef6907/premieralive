'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'
import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    num: '01',
    titleEn: 'Discovery',
    titleAr: 'الاكتشاف',
    descEn: 'We learn your business before we touch a pixel.',
    descAr: 'نفهم أعمالك قبل أي تصميم.',
  },
  {
    num: '02',
    titleEn: 'Strategy',
    titleAr: 'الاستراتيجية',
    descEn: 'Goals, audience, message, and the plan to win.',
    descAr: 'نحدد الأهداف والجمهور والرسالة وخطة الوصول.',
  },
  {
    num: '03',
    titleEn: 'Production',
    titleAr: 'الإنتاج',
    descEn: 'Film, design, and content at cinema grade.',
    descAr: 'ننتج الأفلام والتصاميم والمحتوى بمستوى سينمائي.',
  },
  {
    num: '04',
    titleEn: 'Build & Integrate',
    titleAr: 'البناء والدمج',
    descEn: 'Websites, systems, and AI wired together.',
    descAr: 'نبني المواقع والأنظمة ونربطها بالذكاء الاصطناعي.',
  },
  {
    num: '05',
    titleEn: 'Launch',
    titleAr: 'الإطلاق',
    descEn: 'Everything live, tested, and tracked.',
    descAr: 'نُطلق العمل مكتملاً ومختبراً وقابلاً للقياس.',
  },
  {
    num: '06',
    titleEn: 'Grow',
    titleAr: 'النمو',
    descEn: 'Measure, optimize, repeat.',
    descAr: 'نقيس ونحسّن ونكرر النجاح.',
  },
]

export default function ProcessSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef}>
      <Section
        id="process"
        eyebrow={isArabic ? 'كيف نعمل' : 'HOW WE WORK'}
        title={isArabic ? 'نتّبع منهجاً لا حظاً.' : 'A PROCESS, NOT A GAMBLE.'}
      >
        {/* Horizontal timeline — desktop */}
        <div
          className="process-timeline"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 0,
            position: 'relative',
            overflowX: 'auto',
            paddingBottom: '1rem',
          }}
        >
          {/* Gold connecting line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.5rem',
              right: '1.5rem',
              height: '1px',
              background: 'var(--color-card-border)',
              zIndex: 0,
            }}
          />
          <div
            aria-hidden="true"
            className={visible ? 'process-line-fill' : ''}
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.5rem',
              height: '1px',
              background: 'var(--color-gold)',
              width: visible ? 'calc(83.33% - 3rem)' : '0',
              transition: 'width 1.2s var(--ease-out)',
              zIndex: 1,
            }}
          />

          {STEPS.map((step) => (
            <div
              key={step.num}
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '0 0.75rem',
                textAlign: 'center',
              }}
            >
              {/* Number bubble */}
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  border: '1px solid var(--color-card-border)',
                  background: 'var(--color-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  color: 'var(--color-gold)',
                  letterSpacing: '0.05em',
                }}
              >
                {step.num}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                  color: 'var(--color-text)',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {isArabic ? step.titleAr : step.titleEn}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'var(--color-text-faint)',
                  lineHeight: 1.5,
                }}
              >
                {isArabic ? step.descAr : step.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <style>{`
          @media (max-width: 767px) {
            .process-timeline {
              display: flex !important;
              flex-direction: column !important;
              gap: 1.5rem !important;
            }
            .process-timeline > div[style*="position: relative"] {
              display: flex !important;
              align-items: flex-start !important;
              gap: 1rem !important;
              text-align: left !important;
            }
          }
        `}</style>
      </Section>
    </div>
  )
}
