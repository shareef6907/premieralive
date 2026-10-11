import type { Metadata } from 'next'
import Image from 'next/image'
import { getLocale } from 'next-intl/server'
import ServiceCardLink from '@/components/ServiceCardLink'
import { SERVICES } from '@/config/services'
import { MEDIA_BASE } from '@/config/media'

const DOMAIN = 'https://www.premieralive.com'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/services`

  return {
    title: isArabic
      ? 'خدماتنا | إنتاج سينمائي وتجارب رقمية | بريمييرا لايف'
      : 'Our Services | Cinematic Production & Digital Experiences | Premiera Live',
    description: isArabic
      ? 'كل خدماتنا في الخبر بالسعودية: إنتاج سينمائي (أفلام تجارية، أفلام شركات، تصوير احترافي، رسوم متحركة، وثائقيات، تغطية فعاليات، بث مباشر متعدد الكاميرات، إنتاج بودكاست) وتجارب رقمية (مواقع الأعمال، تطبيقات، صفحات هبوط، أنظمة حجز، منصات أعمال، بوابات عملاء، مساعدون أذكياء وأتمتة، صيانة مواقع).'
      : 'All our services in Al Khobar, Saudi Arabia: cinematic production (commercial films, corporate videos, professional photography, animation, documentaries, event coverage, multi-camera live streaming, podcast production) and digital experiences (business websites, apps, landing pages, booking systems, business platforms, client portals, AI assistants and automation, website maintenance).',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${DOMAIN}/en/services`,
        'ar-SA': `${DOMAIN}/ar/services`,
        'x-default': `${DOMAIN}/en/services`,
      },
    },
    openGraph: {
      title: isArabic
        ? 'خدماتنا | إنتاج سينمائي وتجارب رقمية | بريمييرا لايف'
        : 'Our Services | Cinematic Production & Digital Experiences | Premiera Live',
      description: isArabic
        ? 'كل خدماتنا في الخبر بالسعودية: إنتاج سينمائي وتجارب رقمية.'
        : 'All our services in Al Khobar, Saudi Arabia: cinematic production and digital experiences.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'خدماتنا | إنتاج سينمائي وتجارب رقمية | بريمييرا لايف'
        : 'Our Services | Cinematic Production & Digital Experiences | Premiera Live',
      description: isArabic
        ? 'كل خدماتنا في الخبر بالسعودية: إنتاج سينمائي وتجارب رقمية.'
        : 'All our services in Al Khobar, Saudi Arabia: cinematic production and digital experiences.',
    },
  }
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
      'podcast-filming-saudi-arabia',
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
        position: 'relative',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)',
        overflow: 'hidden',
      }}>
        <Image
          src={`${MEDIA_BASE}/service-headers/photo_002.jpg`}
          alt="Premiera Live services"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0.85) 100%)',
          zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
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
        </div>
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
