import { useLocale } from 'next-intl'

export default function BrandMarqueeSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: 'var(--section-y) 0', overflow: 'hidden' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', textAlign: 'center', marginBottom: '3rem' }}>
        {isArabic ? 'وثقت بنا علامات عالمية' : 'TRUSTED BY GLOBAL BRANDS'}
      </p>
      {/* Marquee items rendered via CSS animation */}
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-faint)', textAlign: 'center' }}>
        (Marquee — PR-2)
      </div>
    </section>
  )
}
