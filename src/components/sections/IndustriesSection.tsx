import { useLocale } from 'next-intl'

export default function IndustriesSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: '4rem var(--container)', maxWidth: 'var(--container)', margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '2rem' }}>
        {isArabic ? 'القطاعات' : 'INDUSTRIES'}
      </p>
      {/* Industry chips — PR-5 */}
    </section>
  )
}
