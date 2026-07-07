import { useLocale } from 'next-intl'

export default function FourPillarsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <section style={{ padding: 'var(--section-y) var(--container)', maxWidth: 'var(--container)', margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>
        {isArabic ? 'ماذا نقدم' : 'WHAT WE DO'}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h2)', color: 'var(--text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', marginBottom: '4rem' }}>
        {isArabic ? 'نجمع أربعة تخصصات تحت شريك واحد.' : 'ONE PARTNER. FOUR DISCIPLINES.'}
      </h2>
      {/* Pillar cards — PR-3 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 'var(--radius)', padding: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              PILLAR {i} — {isArabic ? 'PR-3' : 'PR-3'}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
