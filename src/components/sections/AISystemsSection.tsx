import { useLocale } from 'next-intl'
import Section from '../Section'
import { IMAGES } from '@/config/media'

export default function AISystemsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="ai"
      eyebrow={isArabic ? 'أنظمة الذكاء الاصطناعي' : 'AI SYSTEMS'}
      title={
        isArabic
          ? 'بدأ مستقبل التسويق يعمل هنا اليوم.'
          : 'THE FUTURE OF MARKETING IS ALREADY WORKING HERE.'
      }
    >
      {/* Background image — 0.25 opacity, cover, centered */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.aiSystemsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.7,
            maxWidth: '640px',
            marginBottom: '3rem',
          }}
        >
          {isArabic
            ? 'يتحدث كثيرون عن الذكاء الاصطناعي، ونحن نبنيه — أنظمة حقيقية تعمل لأعمال حقيقية.'
            : 'Most agencies talk about AI. We build it — real systems, deployed for real businesses.'}
        </p>

        {/* AI cards — placeholder, PR-5 full content */}
      </div>
    </Section>
  )
}
