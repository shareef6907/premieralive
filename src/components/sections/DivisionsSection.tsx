'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { IMAGES } from '@/config/media'
import ServiceCardLink from '../ServiceCardLink'

// Slug mapping for each capability (order matches capability lists)
const CAPABILITY_SLUGS = {
  cinematic: [
    'commercial-film-production-saudi-arabia',    // Commercial Films
    'corporate-video-production-saudi-arabia',      // Corporate Films
    'professional-photography-saudi-arabia',       // Professional Photography
    'animation-cgi-studio-saudi-arabia',           // Animation & CGI
    'documentary-production-saudi-arabia',          // Documentary
    'event-coverage-saudi-arabia',                 // Event Coverage
    'multi-cam-live-streaming-saudi-arabia',        // Multi-Cam Live Streaming
  ],
  digital: [
    'business-website-development-saudi-arabia',    // Business Websites
    'business-software-development-saudi-arabia',    // Business Software
    'landing-page-design-saudi-arabia',             // Landing Pages
    'booking-system-development-saudi-arabia',      // Booking Systems
    'business-platform-development-saudi-arabia',    // Business Platforms
    'client-portal-development-saudi-arabia',       // Client Portals
    'ai-assistants-automation-saudi-arabia',        // AI Assistants & Automation
    'website-maintenance-saudi-arabia',             // Website Maintenance
  ],
} as const

const DIVISIONS = [
  {
    id: 'cinematic',
    nameEn: 'CINEMATIC PRODUCTION',
    nameAr: 'الإنتاج السينمائي',
    lineEn: 'Films built to be remembered.',
    lineAr: 'ننتج أفلاماً تبقى في الذاكرة.',
    capabilitiesEn: ['Commercial Films', 'Corporate Films', 'Professional Photography', 'Animation & CGI', 'Documentary', 'Event Coverage', 'Multi-Cam Live Streaming'],
    capabilitiesAr: ['أفلام إعلانية', 'أفلام مؤسسية', 'تصوير احترافي', 'رسوم متحركة ومؤثرات', 'أفلام وثائقية', 'تغطية الفعاليات', 'بث مباشر متعدد الكاميرات'],
    image: IMAGES.pillarContent,
  },
  {
    id: 'digital',
    nameEn: 'DIGITAL EXPERIENCES',
    nameAr: 'التجارب الرقمية',
    lineEn: 'Software that turns attention into growth.',
    lineAr: 'نبني برمجيات تحوّل الانتباه إلى نمو.',
    capabilitiesEn: ['Business Websites', 'Business Software', 'Landing Pages', 'Booking Systems', 'Business Platforms', 'Client Portals', 'AI Assistants & Automation', 'Website Maintenance'],
    capabilitiesAr: ['مواقع الأعمال', 'برمجيات الأعمال', 'صفحات الهبوط', 'أنظمة الحجز', 'منصات الأعمال', 'بوابات العملاء', 'مساعدون أذكياء وأتمتة', 'صيانة المواقع'],
    image: IMAGES.pillarTechnology,
  },
]

function DivisionHalf({ division }: { division: typeof DIVISIONS[0] }) {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [hovered, setHovered] = useState(false)
  const slugs = CAPABILITY_SLUGS[division.id as keyof typeof CAPABILITY_SLUGS]
  const capabilities = isArabic ? division.capabilitiesAr : division.capabilitiesEn

  return (
    <div
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: '260px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${division.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.6s var(--ease-out)',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
          className="division-img"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,11,0.6) 0%, transparent 60%)',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '0.75rem',
        }}>
          {isArabic ? division.nameAr : division.nameEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
          color: 'var(--color-text)',
          lineHeight: 1.1,
          marginBottom: '1.25rem',
        }}>
          {isArabic ? division.lineAr : division.lineEn}
        </p>

        {/* Capability list — each item is a link to its service page */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          {capabilities.map((cap, i) => {
            const slug = slugs[i]
            if (!slug) return null
            return (
              <li key={i} style={{
                borderBottom: '1px solid var(--color-card-border)',
                paddingBottom: '0.5rem',
                marginBottom: '0.5rem',
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
      <div style={{
        display: 'flex',
        flexDirection: isArabic ? 'row-reverse' : 'row',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {DIVISIONS.map((d) => (
          <DivisionHalf key={d.id} division={d} />
        ))}
      </div>
    </Section>
  )
}
