import { useLocale } from 'next-intl'

export default function WhyPremieraSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: 'var(--section-y) var(--container)', background: 'var(--bg-elevated)', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: 'var(--text-faint)', marginBottom: '3rem' }}>
        {isArabic ? 'نلتزم معياراً واحداً منذ خمسة عشر عاماً.' : 'Fifteen years. One standard.'}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--gold)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        15+ &middot; 1,000+ &middot; 20+ &middot; 25+
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--text-faint)', marginTop: '1rem' }}>
        {isArabic
          ? '15+ عاماً من الخبرة · 1,000+ مشروع منجز · 20+ علامة عالمية · 25+ منصة نتقنها'
          : 'Years of Experience · Projects Delivered · Global Brands · Platforms Mastered'}
      </p>
    </section>
  )
}
