import { useLocale } from 'next-intl'
import Section from '../Section'

const BEATS = [
  {
    en: 'Film earns attention.',
    ar: 'يجذب الفيلم الانتباه.',
  },
  {
    en: 'Websites convert it.',
    ar: 'يحوّله الموقع إلى عملاء.',
  },
  {
    en: 'Your business grows.',
    ar: 'فينمو عملك.',
  },
]

export default function WhyBothSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section>
      <div style={{
        display: 'flex',
        flexDirection: isArabic ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(1.5rem, 3vw, 3rem)',
        flexWrap: 'wrap',
        textAlign: 'center',
      }}>
        {BEATS.map((beat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
              color: 'var(--color-text)',
              lineHeight: 1.1,
            }}>
              {isArabic ? beat.ar : beat.en}
            </p>
            {i < BEATS.length - 1 && (
              <div style={{
                width: '1px',
                height: '2.5rem',
                background: 'var(--color-gold)',
                flexShrink: 0,
              }} />
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
