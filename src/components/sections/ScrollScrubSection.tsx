import { useLocale } from 'next-intl'

export default function ScrollScrubSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ height: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase' }}>
        {isArabic ? 'مميز' : 'SIGNATURE'}
      </h2>
    </section>
  )
}
