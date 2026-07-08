import { useLocale } from 'next-intl'
import Section from '../Section'

export default function FourPillarsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="services"
      eyebrow={isArabic ? 'ماذا نقدم' : 'WHAT WE DO'}
      title={isArabic ? 'نجمع أربعة تخصصات تحت شريك واحد.' : 'ONE PARTNER. FOUR DISCIPLINES.'}
    >
      <div className="pillars-grid">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
              padding: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--eyebrow)',
                letterSpacing: '0.2em',
                color: 'var(--color-gold)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              PILLAR {i} — {isArabic ? 'PR-3' : 'PR-3'}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
