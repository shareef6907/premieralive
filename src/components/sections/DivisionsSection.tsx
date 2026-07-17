'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { IMAGES } from '@/config/media'
import ServiceCardLink from '../ServiceCardLink'

const CAPABILITY_SLUGS = {
  cinematic: [
    'commercial-film-production-saudi-arabia',
    'corporate-video-production-saudi-arabia',
    'professional-photography-saudi-arabia',
    'animation-cgi-studio-saudi-arabia',
    'documentary-production-saudi-arabia',
    'event-coverage-saudi-arabia',
    'multi-cam-live-streaming-saudi-arabia',
    'podcast-filming-saudi-arabia',
    ],
  digital: [
    'business-website-development-saudi-arabia',
    'app-development-saudi-arabia',
    'landing-page-design-saudi-arabia',
    'booking-system-development-saudi-arabia',
    'business-platform-development-saudi-arabia',
    'client-portal-development-saudi-arabia',
    'ai-assistants-automation-saudi-arabia',
    'website-maintenance-saudi-arabia',
  ],
} as const

// Marketing service links — routes land in PR-M2; will 404 until then
const MARKETING_SERVICE_LINKS = {
  en: [
    { slug: 'social-media-management-saudi',           label: 'Social Media Management' },
    { slug: 'google-ads-saudi',                          label: 'Google Ads' },
    { slug: 'facebook-instagram-ads-saudi',             label: 'Facebook & Instagram Ads' },
    { slug: 'snapchat-tiktok-ads-saudi',               label: 'Snapchat & TikTok Ads' },
    { slug: 'seo-saudi',                                label: 'SEO' },
    { slug: 'content-production-saudi',                 label: 'Content Production' },
    { slug: 'marketing-packages-saudi',                 label: 'Marketing Packages' },
  ],
  ar: [
    { slug: 'social-media-management-saudi',            label: 'إدارة وسائل التواصل' },
    { slug: 'google-ads-saudi',                         label: 'إعلانات قوقل' },
    { slug: 'facebook-instagram-ads-saudi',             label: 'إعلانات فيسبوك وإنستغرام' },
    { slug: 'snapchat-tiktok-ads-saudi',              label: 'إعلانات سناب وتيك توك' },
    { slug: 'seo-saudi',                               label: 'تحسين محركات البحث' },
    { slug: 'content-production-saudi',                 label: 'إنتاج المحتوى' },
    { slug: 'marketing-packages-saudi',                 label: 'باقات التسويق' },
  ],
} as const

const DIVISIONS = [
  {
    id: 'cinematic',
    nameEn: 'CINEMATIC PRODUCTION',
    nameAr: 'الإنتاج السينمائي',
    lineEn: 'Films built to be remembered.',
    lineAr: 'ننتج أفلاماً تبقى في الذاكرة.',
    capabilitiesEn: ['Commercial Films', 'Corporate Films', 'Professional Photography', 'Animation & CGI', 'Documentary', 'Event Coverage', 'Multi-Cam Live Streaming', 'Podcast Filming'],
    capabilitiesAr: ['أفلام إعلانية', 'أفلام مؤسسية', 'تصوير احترافي', 'رسوم متحركة ومؤثرات', 'أفلام وثائقية', 'تغطية الفعاليات', 'بث مباشر متعدد الكاميرات', 'تصوير البودكاست'],
    image: IMAGES.pillarContent,
  },
  {
    id: 'digital',
    nameEn: 'DIGITAL EXPERIENCES',
    nameAr: 'التجارب الرقمية',
    lineEn: 'Websites and systems, built from scratch.',
    lineAr: 'نبني المواقع والأنظمة من الصفر.',
    capabilitiesEn: ['Business Websites', 'App Development', 'Landing Pages', 'Booking Systems', 'Business Platforms', 'Client Portals', 'AI Assistants & Automation', 'Website Maintenance'],
    capabilitiesAr: ['مواقع الأعمال', 'تطوير التطبيقات', 'صفحات الهبوط', 'أنظمة الحجز', 'منصات الأعمال', 'بوابات العملاء', 'مساعدون أذكياء وأتمتة', 'صيانة المواقع'],
    image: IMAGES.pillarTechnology,
  },
  {
    id: 'marketing',
    nameEn: 'MARKETING SERVICES',
    nameAr: 'خدمات التسويق',
    lineEn: 'Growth that compounds, month after month.',
    lineAr: 'ينمو أثرك شهرًا بعد شهر.',
    image: IMAGES.pillarAiGrowth,
  },
]

function DivisionHalf({ division }: { division: typeof DIVISIONS[0] }) {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [hovered, setHovered] = useState(false)
  const slugs = CAPABILITY_SLUGS[division.id as keyof typeof CAPABILITY_SLUGS] ?? []
  const capabilities = isArabic ? division.capabilitiesAr : division.capabilitiesEn
  const isMarketing = division.id === 'marketing'
  const marketingLinks = isArabic ? MARKETING_SERVICE_LINKS.ar : MARKETING_SERVICE_LINKS.en

  const divisionHref =
    division.id === 'cinematic'
      ? `/${locale}/services`
      : division.id === 'digital'
      ? `/${locale}/digital`
      : `/${locale}/marketing`

  return (
    <div
      className="division-half"
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      {/* Image with hover scale */}
      <div
        className="division-image"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: '260px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          src={division.image}
          alt={isArabic ? division.nameAr : division.nameEn}
          fill
          quality={70}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.6s var(--ease-out)',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,11,0.6) 0%, transparent 60%)',
        }} />
      </div>

      {/* Content */}
      <div className="division-content" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Link
          href={divisionHref}
          className="division-eyebrow"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 'var(--eyebrow)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            marginBottom: '0.75rem',
            display: 'block',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
        >
          {isArabic ? division.nameAr : division.nameEn}
        </Link>
        <p className="division-line" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
          color: 'var(--color-text)',
          lineHeight: 1.1,
          marginBottom: '1.25rem',
        }}>
          {isArabic ? division.lineAr : division.lineEn}
        </p>

        <ul className="division-capabilities" style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          {!isMarketing && capabilities && capabilities.map((cap, i) => {
            const slug = slugs[i]
            if (!slug) return null
            return (
              <li key={i} className="capability-item" style={{
                borderBottom: '1px solid var(--color-card-border)',
                paddingBottom: '0.5rem',
                marginBottom: '0.5rem',
                minHeight: '2.5rem',
              }}>
                <ServiceCardLink
                  href={`/${locale}/services/${slug}`}
                  name={cap}
                  description=""
                  isArabic={isArabic}
                />
              </li>
            )
          })}
          {isMarketing && marketingLinks.map((link) => (
              <li key={link.slug} className="capability-item" style={{
                borderBottom: '1px solid var(--color-card-border)',
                paddingBottom: '0.5rem',
                marginBottom: '0.5rem',
                minHeight: '2.5rem',
              }}>
                <ServiceCardLink
                  href={`/${locale}/marketing/${link.slug}`}
                  name={link.label}
                  description=""
                  isArabic={isArabic}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default function DivisionsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section eyebrow={isArabic ? 'ما نقدم' : 'WHAT WE DO'}>
      <div
        className="divisions-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}
      >
        {DIVISIONS.map((d) => (
          <DivisionHalf key={d.id} division={d} />
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .divisions-container {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .division-half {
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }
          .division-content {
            padding: 0 !important;
          }
          .division-eyebrow {
            font-size: 0.7rem !important;
            margin-bottom: 0.5rem !important;
          }
          .division-line {
            margin-bottom: 1.5rem !important;
          }
          .division-capabilities {
            display: flex;
            flex-direction: column;
          }
          .capability-item {
            border-bottom: 1px solid rgba(201,162,75,0.15) !important;
            margin-bottom: 0 !important;
            padding: 1.25rem 0 !important;
          }
          .capability-item:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </Section>
  )
}
