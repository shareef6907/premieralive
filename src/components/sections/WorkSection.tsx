import { useLocale } from 'next-intl'

export default function WorkSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: 'var(--section-y) var(--container)', maxWidth: 'var(--container)', margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
        {isArabic ? 'أعمال مختارة' : 'SELECTED WORK'}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', marginBottom: '4rem' }}>
        {isArabic ? 'نُثبت بالأعمال لا بالوعود.' : 'PROOF, NOT PROMISES.'}
      </h2>
      {/* Work carousels — PR-4 */}
    </section>
  )
}
