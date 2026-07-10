'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { IMAGES, PLATFORMS } from '@/config/media'

// ---------------------------------------------------------------------------
// PlatformCard — CSS laptop frame + dashboard toggle
// ---------------------------------------------------------------------------
function PlatformCard({ cover, dashboard, nameEn, nameAr, descEn, descAr }: {
  cover: string; dashboard: string; nameEn: string; nameAr: string; descEn: string; descAr: string
}) {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [expanded, setExpanded] = useState(false)

  function handleToggle() {
    setExpanded(v => { window.dispatchEvent(new Event('dashboard-toggled')); return !v })
  }

  return (
    <div style={{
      background: 'var(--color-card)', border: '1px solid var(--color-card-border)',
      borderRadius: 'var(--radius)', overflow: 'hidden', flex: 1, minWidth: 0,
    }}>
      {/* CSS laptop frame */}
      <div style={{
        background: '#1a1a1f', padding: '12px 12px 0',
        borderRadius: '8px 8px 0 0',
      }}>
        <div style={{
          background: '#000', borderRadius: '4px 4px 0 0',
          overflow: 'hidden', aspectRatio: '16/10', position: 'relative',
        }}>
          <Image src={cover} alt={isArabic ? nameAr : nameEn}
            fill
            quality={70}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover', display: 'block' }} />
        </div>
      </div>
      {/* Laptop base bar */}
      <div style={{ background: '#1a1a1f', height: '8px', borderRadius: '0 0 4px 4px' }} />

      {/* Card body */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--h3)', color: 'var(--color-text)', marginBottom: '0.75rem' }}>
          {isArabic ? nameAr : nameEn}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          {isArabic ? descAr : descEn}
        </p>
        <button
          onClick={handleToggle}
          aria-expanded={expanded}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'none', border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)', padding: '0.5rem 1rem',
            cursor: 'pointer', color: 'var(--color-gold)',
            fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--body-sm)',
            transition: 'border-color 0.2s',
          }}
        >
          {isArabic ? 'عرض لوحة التحكم' : 'View dashboard'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {expanded && (
          <div style={{ marginTop: '1rem', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--color-card-border)', position: 'relative' }}>
            <Image src={dashboard} alt={isArabic ? nameAr : nameEn}
              fill quality={70} sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', display: 'block' }} />
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Digital Showcase section — static background, no video bg
// ---------------------------------------------------------------------------
export default function DigitalShowcaseSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <Section
      id="digital"
      eyebrow={isArabic ? 'أعمالنا الرقمية' : 'DIGITAL SHOWCASE'}
      title={isArabic ? 'نبني المنصات ونشغّلها بأنفسنا.' : 'PLATFORMS WE BUILT AND RUN.'}
    >
      {/* Static background — opacity 0.25 */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
      }}>
        <Image
          src={IMAGES.aiSystemsBg}
          alt=""
          fill
          quality={50}
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.25 }}
        />
      </div>

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Intro */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.7,
          maxWidth: '640px', marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          {isArabic
            ? 'نبني البرمجيات بأنفسنا لا نكتفي بالحديث عنها — هذه منصات حية صممناها وبرمجناها ونشغّلها بالكامل.'
            : "We don't just talk about software — we build it. These are live platforms we designed, coded, and operate end to end."}
        </p>

        {/* Platform cards with CSS laptop frames */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <PlatformCard
            cover={PLATFORMS.bahrainNights.cover}
            dashboard={PLATFORMS.bahrainNights.dashboard}
            nameEn={PLATFORMS.bahrainNights.nameEn}
            nameAr={PLATFORMS.bahrainNights.nameAr}
            descEn={PLATFORMS.bahrainNights.descEn}
            descAr={PLATFORMS.bahrainNights.descAr}
          />
          <PlatformCard
            cover={PLATFORMS.studentPhotos.cover}
            dashboard={PLATFORMS.studentPhotos.dashboard}
            nameEn={PLATFORMS.studentPhotos.nameEn}
            nameAr={PLATFORMS.studentPhotos.nameAr}
            descEn={PLATFORMS.studentPhotos.descEn}
            descAr={PLATFORMS.studentPhotos.descAr}
          />
        </div>

        {/* Closing line */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)', lineHeight: 1.7, maxWidth: '680px',
        }}>
          {isArabic
            ? 'تُقدَّر منصات بهذا الحجم عادةً بعشرات آلاف الدولارات وتستغرق فرق التطوير أشهراً لإنجازها. نصممها ونبرمجها ونطلقها في جزء من ذلك الوقت — والأنظمة نفسها تشغّل أعمالنا الخاصة.'
            : 'Platforms of this scope are typically quoted at tens of thousands of dollars and take a senior development team months to deliver. We design, code, and launch them in a fraction of that time — the same systems run our own businesses.'}
        </p>
      </div>
    </Section>
  )
}
