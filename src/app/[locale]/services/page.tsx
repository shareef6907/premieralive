import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import ServiceCardLink from '@/components/ServiceCardLink'
import { SERVICES } from '@/config/services'

export const metadata: Metadata = {
  title: 'Services | Premiera Live',
  description: 'Cinematic production, digital experiences, and AI systems — built by the team behind campaigns for global brands. Serving Saudi Arabia and the Gulf.',
  alternates: {
    canonical: 'https://www.premieralive.com/en/services',
    languages: {
      'en': 'https://www.premieralive.com/en/services',
      'ar': 'https://www.premieralive.com/ar/services',
    },
  },
}

const DIVISIONS = [
  {
    labelEn: 'Cinematic Production',
    labelAr: 'الإنتاج السينمائي',
    slugs: [
      'commercial-film-production-saudi-arabia',
      'corporate-video-production-saudi-arabia',
      'professional-photography-saudi-arabia',
      'animation-cgi-studio-saudi-arabia',
      'documentary-production-saudi-arabia',
      'event-coverage-saudi-arabia',
      'multi-cam-live-streaming-saudi-arabia',
    ],
  },
  {
    labelEn: 'Digital Experiences',
    labelAr: 'التجارب الرقمية',
    slugs: [
      'business-website-development-saudi-arabia',
      'app-development-saudi-arabia',
      'landing-page-design-saudi-arabia',
      'booking-system-development-saudi-arabia',
      'business-platform-development-saudi-arabia',
      'client-portal-development-saudi-arabia',
      'ai-assistants-automation-saudi-arabia',
      'website-maintenance-saudi-arabia',
    ],
  },
]

export default async function ServicesIndexPage() {
  const locale = await getLocale()
  const isArabic = locale === 'ar'

  const servicesLabel = isArabic ? 'خدماتنا' : 'OUR SERVICES'
  const cinematicLabel = isArabic ? 'الإنتاج السينمائي' : 'CINEMATIC PRODUCTION'
  const digitalLabel = isArabic ? 'التجارب الرقمية' : 'DIGITAL EXPERIENCES'

  return (
    <>
      {/* Hero */}
      <section style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {servicesLabel}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          color: 'var(--color-text)', lineHeight: 0.95,
          letterSpacing: '0.01em', marginBottom: '1.5rem',
        }}>
          {isArabic ? 'كل ما تحتاجه لينمو عملك' : 'EVERYTHING YOUR BUSINESS NEEDS TO GROW'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.7,
          maxWidth: '560px', margin: '0 auto',
        }}>
          {isArabic
            ? 'من الإنتاج السينمائي إلى البرمجيات وأنظمة الذكاء الاصطناعي — كل خدمة مبنية لهدف محدد.'
            : 'From cinematic production to software and AI systems — every service built for a specific purpose.'}
        </p>
      </section>

      {/* Cinematic Production */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem',
        }}>
          {cinematicLabel}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1rem',
        }}>
          {DIVISIONS[0].slugs.map((slug) => {
            const svc = SERVICES.find((s) => s.slug === slug)
            if (!svc) return null
            return (
              <ServiceCardLink
                key={slug}
                href={`/${locale}/services/${slug}`}
                name={isArabic ? svc.nameAr : svc.nameEn}
                description={isArabic ? svc.valuePropAr : svc.valuePropEn}
                isArabic={isArabic}
              />
            )
          })}
        </div>
      </section>

      {/* Digital Experiences */}
      <section style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '2.5rem',
          }}>
            {digitalLabel}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}>
            {DIVISIONS[1].slugs.map((slug) => {
              const svc = SERVICES.find((s) => s.slug === slug)
              if (!svc) return null
              return (
                <ServiceCardLink
                  key={slug}
                  href={`/${locale}/services/${slug}`}
                  name={isArabic ? svc.nameAr : svc.nameEn}
                  description={isArabic ? svc.valuePropAr : svc.valuePropEn}
                  isArabic={isArabic}
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
