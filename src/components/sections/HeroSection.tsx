'use client'

import { useRef, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { HERO_VIDEO } from '@/config/media'

export default function HeroSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Mobile: seek to 1.5s frame, no autoplay; desktop: autoplay
  function handleLoadedMetadata() {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 1.5
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay={!isMobile}
        muted
        loop={!isMobile}
        playsInline
        preload={isMobile ? 'metadata' : 'none'}
        onLoadedMetadata={isMobile ? handleLoadedMetadata : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, #0A0A0B 0%, transparent 50%), linear-gradient(to bottom, #0A0A0B 0%, transparent 30%), rgba(10,10,11,0.45)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem)',
          maxWidth: '960px',
        }}
      >
        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          color: 'var(--color-gold)',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}>
          {isArabic ? 'إنتاج سينمائي · تجارب رقمية' : 'CINEMATIC PRODUCTION · DIGITAL EXPERIENCES'}
        </p>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--h1)',
          lineHeight: 1.05,
          color: 'var(--color-text)',
          letterSpacing: '0.01em',
          marginBottom: '1.75rem',
          maxWidth: '18ch',
        }}>
          {isArabic
            ? 'تستحق كل علامةٍ عظيمة قصةً عظيمة'
            : 'EVERY GREAT BUSINESS DESERVES A GREAT STORY'}
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)',
          lineHeight: 1.7,
          maxWidth: '520px',
          marginBottom: '2.5rem',
        }}>
          {isArabic
            ? 'نصنع إنتاجاً سينمائياً وتجارب رقمية تساعد الأعمال على التواصل والانطلاق والنمو.'
            : 'We create cinematic productions and digital experiences that help businesses communicate, launch, and grow.'}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#films"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.875rem 1.75rem',
              background: 'var(--color-gold)',
              color: '#0A0A0B',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'var(--body-sm)',
              textDecoration: 'none',
              borderRadius: 'var(--radius)',
              letterSpacing: '0.02em',
            }}
          >
            {isArabic ? 'شاهد الأفلام' : 'View Films'}
          </a>
          <a
            href="#digital"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.875rem 1.75rem',
              border: '1px solid var(--color-card-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: 'var(--body-sm)',
              textDecoration: 'none',
              borderRadius: 'var(--radius)',
              letterSpacing: '0.02em',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-card-border)')}
          >
            {isArabic ? 'استكشف التجارب الرقمية' : 'Explore Digital Experiences'}
          </a>
        </div>
      </div>
    </section>
  )
}
