import { useLocale } from 'next-intl'

export default function FinalCTASection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: '80vh var(--container)', background: 'var(--bg)', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h1)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', marginBottom: '3rem' }}>
        {isArabic ? 'لنصنع معاً شيئاً استثنائياً' : 'READY TO BUILD SOMETHING EXTRAORDINARY?'}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--text-faint)' }}>
        {isArabic ? 'نرد خلال يوم عمل واحد.' : 'Replies within one business day.'}
      </p>
    </section>
  )
}
