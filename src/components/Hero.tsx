'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from 'next-intl'

const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL ?? ''
const VIDEO_SRC = `${MEDIA_URL}/premiera-scrub.mp4`
const POSTER_SRC = `${MEDIA_URL}/premiera-poster.jpg`

// Service labels that fade in as video scrub progresses
const SERVICE_LABELS = [
  { en: 'Marketing Retainers', ar: 'حسابات التسويق' },
  { en: 'Websites', ar: 'المواقع الإلكترونية' },
  { en: 'App Development', ar: 'تطوير التطبيقات' },
  { en: 'Social Media', ar: 'إدارة السوشيال ميديا' },
  { en: 'Animation & 3D', ar: 'الأنيميشن والتصميم ثلاثي الأبعاد' },
  { en: 'Video Production', ar: 'إنتاج الفيديو والتصوير' },
  { en: 'Branding & Design', ar: 'الهوية البصرية والتصميم' },
  { en: 'Podcast Filming', ar: 'تصوير البودكاست' },
  { en: 'Live Streaming', ar: 'البث المباشر متعدد الكاميرات' },
]

export default function Hero() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrubRef = useRef<number>(0)
  const [activeServiceIdx, setActiveServiceIdx] = useState(-1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll-scrub: video.currentTime driven by scroll progress
  useEffect(() => {
    if (isMobile || !videoRef.current) return

    const video = videoRef.current
    let rafId: number

    const updateScrub = () => {
      const section = sectionRef.current
      if (!section || !video) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Progress through the section: 0 when section top enters viewport, 1 when it leaves
      const scrollStart = -rect.top
      const scrollRange = sectionHeight - viewportHeight
      const progress = Math.max(0, Math.min(1, scrollStart / scrollRange))

      // Map progress to video duration
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = progress * video.duration
      }

      // Determine active service label (9 labels, evenly distributed over progress)
      const labelCount = SERVICE_LABELS.length
      const labelStart = 0.05
      const labelEnd = 0.95
      const labelRange = labelEnd - labelStart
      const adjustedProgress = Math.max(0, Math.min(1, (progress - labelStart) / labelRange))
      const idx = Math.floor(adjustedProgress * labelCount)
      setActiveServiceIdx(idx >= labelCount ? -1 : idx)

      rafId = requestAnimationFrame(updateScrub)
    }

    rafId = requestAnimationFrame(updateScrub)
    return () => cancelAnimationFrame(rafId)
  }, [isMobile])

  if (!mounted) return null

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: isMobile ? '100vh' : '400vh',
      }}
    >
      {/* Sticky video container */}
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#0A0A0B',
        }}
      >
        {/* Video element */}
        {isMobile ? (
          // Mobile: autoplay loop fallback
          <video
            src={VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            poster={POSTER_SRC}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            preload="auto"
            muted
            playsInline
            poster={POSTER_SRC}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.6) 60%, rgba(10,10,11,0.95) 100%)',
          }}
        />

        {/* Hero text content */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: 'clamp(1.5rem, 8vw, 8rem)',
            right: 'clamp(1.5rem, 8vw, 8rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              letterSpacing: '0.35em',
              color: '#C9A24B',
              marginBottom: '1.25rem',
            }}
          >
            {isArabic ? 'بريمييرا لايف' : 'PREMIERA LIVE'}
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              color: '#fff',
              lineHeight: 1.0,
              marginBottom: '1.5rem',
              maxWidth: '800px',
            }}
          >
            {isArabic
              ? 'نصنع علامات تجارية لا يمكن تجاهلها'
              : 'Marketing that makes your brand impossible to ignore.'}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '500px',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            {isArabic ? 'الآن في السعودية' : 'Now in Saudi Arabia'}
          </p>

          {!isMobile && (
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                color: 'rgba(201,162,75,0.4)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            >
              {isArabic ? '⬇ Scroll to explore' : '⬇ SCROLL TO EXPLORE'}
            </p>
          )}
        </div>

        {/* Service world labels — fade in/out as scrub progresses */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            {SERVICE_LABELS.map((svc, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: i === activeServiceIdx ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 3vw, 2.5rem)',
                  letterSpacing: '0.2em',
                  color: '#C9A24B',
                  whiteSpace: 'nowrap',
                }}
              >
                {isArabic ? svc.ar : svc.en}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
