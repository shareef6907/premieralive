// HeroSection — placeholder for PR-2 full hero implementation
import { useLocale } from 'next-intl'

export default function HeroSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section
      id="hero"
      style={{
        height: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          {isArabic ? 'إبداع · تقنية · ذكاء اصطناعي · نمو' : 'CREATIVE · TECHNOLOGY · AI · GROWTH'}
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h1)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', maxWidth: 900, margin: '0 auto 1.5rem' }}>
          {isArabic ? 'نصنع علاماتٍ لا تُنسى' : 'WE BUILD BRANDS PEOPLE REMEMBER'}
        </h1>
      </div>
    </section>
  )
}
