import { useLocale } from 'next-intl'
import Section from '../Section'
import ContactActions from '../ContactActions'

export default function FinalCTASection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section id="contact">
      <div style={{
        minHeight: '70vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--h1)',
          color: 'var(--color-text)', lineHeight: 0.95,
          letterSpacing: '0.01em', textTransform: 'uppercase',
          marginBottom: '3rem',
        }}>
          {isArabic
            ? 'لنصنع معاً شيئاً استثنائياً'
            : "LET'S BUILD SOMETHING REMARKABLE."}
        </h2>

        <div style={{ marginBottom: '1.5rem' }}>
          <ContactActions />
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--color-text-faint)' }}>
          {isArabic ? 'نرد خلال يوم عمل واحد.' : 'Replies within one business day.'}
        </p>
      </div>
    </Section>
  )
}
