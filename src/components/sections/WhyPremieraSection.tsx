import { useLocale } from 'next-intl'
import Section from '../Section'

const STATS = [
  {
    num: '15+',
    labelEn: 'Years of Experience',
    labelAr: 'عاماً من الخبرة',
  },
  {
    num: '1,000+',
    labelEn: 'Projects Delivered',
    labelAr: 'مشروع منجز',
  },
  {
    num: '20+',
    labelEn: 'Global Brands',
    labelAr: 'علامة عالمية',
  },
  {
    num: '25+',
    labelEn: 'Platforms Mastered',
    labelAr: 'منصة نتقنها',
  },
]

export default function WhyPremieraSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section id="why" elevated>
      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.25rem',
          color: 'var(--color-text-faint)',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        {isArabic ? 'نعمل منذ خمسة عشر عاماً عبر الخليج — وُلدنا في البحرين، ونخدم السوق السعودي اليوم.' : 'Fifteen years across the Gulf. Born in Bahrain — now in Saudi Arabia.'}
      </p>

      {/* Stats grid — 4-col desktop, 2-col mobile */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--color-card-border)',
          borderBottom: '1px solid var(--color-card-border)',
        }}
        className="why-stats-grid"
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2.5rem 1rem',
              borderRight: i < STATS.length - 1 ? '1px solid var(--color-card-border)' : 'none',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                color: 'var(--color-gold)',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}
            >
              {stat.num}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--eyebrow)',
                color: 'var(--color-text-faint)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderRight: isArabic ? '1px solid var(--color-card-border)' : 'none',
                borderLeft: isArabic ? 'none' : '1px solid var(--color-card-border)',
                paddingInline: '1.5rem',
              }}
            >
              {isArabic ? stat.labelAr : stat.labelEn}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 639px) {
          .why-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .why-stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .why-stats-grid > div:nth-child(1),
          .why-stats-grid > div:nth-child(2) {
            border-bottom: 1px solid var(--color-card-border);
          }
        }
      `}</style>
    </Section>
  )
}
