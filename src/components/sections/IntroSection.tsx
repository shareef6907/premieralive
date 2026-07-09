import { useLocale } from 'next-intl'
import Section from '../Section'

export default function IntroSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--body)',
        color: 'var(--color-text-dim)',
        lineHeight: 1.8,
        textAlign: 'center',
        maxWidth: '640px',
        marginInline: 'auto',
      }}>
        {isArabic
          ? 'نصنع أفلاماً تبقى في الذاكرة، وتجارب رقمية تنمو بها الأعمال.'
          : 'We create films people remember — and digital experiences businesses grow on.'}
      </p>
    </Section>
  )
}
