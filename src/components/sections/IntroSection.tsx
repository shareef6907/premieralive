import { useLocale } from 'next-intl'
import Section from '../Section'

export default function IntroSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
        color: 'rgba(245,244,240,0.75)',
        lineHeight: 1.4,
        textAlign: 'center',
        maxWidth: '640px',
        marginInline: 'auto',
        paddingBlock: '2rem',
      }}>
        {isArabic
          ? 'نصنع أفلاماً تبقى في الذاكرة، وتجارب رقمية تنمو بها الأعمال.'
          : 'We create films people remember — and digital experiences businesses grow on.'}
      </p>
    </Section>
  )
}
