'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { BRAND_FILMS, SHORTS, CGI_SHOWREEL } from '@/config/media'

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------
type AspectRatio = '16/9' | '9/16'

interface VideoItem {
  src: string
  title: string
  posterTime?: number
}

interface VideoCardProps {
  item: VideoItem
  aspectRatio: AspectRatio
  cardWidth: string
  isTouch: boolean
  onOpen: (src: string) => void
}

interface VideoModalProps {
  src: string | null
  onClose: () => void
}

// -----------------------------------------------------------------------
// VideoCard — hover (desktop) or poster-frame tap (mobile)
// -----------------------------------------------------------------------
function VideoCard({ item, aspectRatio, cardWidth, isTouch, onOpen }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [errored, setErrored] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Seek to a real frame on metadata load — default 1.0s, per-item override
  function handleLoadedMetadata() {
    const v = videoRef.current
    if (!v) return
    v.currentTime = item.posterTime ?? 1.0
  }

  // Desktop only: hover-to-play
  function handleMouseEnter() {
    if (isTouch) return
    const v = videoRef.current
    if (!v || errored) return
    v.play().catch(() => {})
    setPlaying(true)
  }

  function handleMouseLeave() {
    if (isTouch) return
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = item.posterTime ?? 1.0
    setPlaying(false)
  }

  // Mobile: single tap opens modal (poster frame only, no inline play)
  function handleClick() {
    if (!isTouch) return
    onOpen(item.src)
  }

  // Error fallback — styled card, never raw black
  if (errored) {
    return (
      <div
        onClick={handleClick}
        style={{
          flexShrink: 0,
          width: cardWidth,
          aspectRatio,
          background: 'var(--color-card)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-faint)' }}>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" />
          <line x1="17" y1="7" x2="22" y2="7" />
          <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--color-text-faint)',
          textAlign: 'center',
          paddingInline: '0.5rem',
          lineHeight: 1.4,
        }}>
          {item.title}
        </p>
      </div>
    )
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink: 0,
        width: cardWidth,
        aspectRatio,
        background: '#000',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        border: playing ? '1px solid var(--color-gold-soft)' : '1px solid transparent',
        transition: 'border-color 0.3s',
      }}
    >
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setErrored(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Bottom gradient + title */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem 0.75rem 0.75rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: '#fff',
          lineHeight: 1.3,
        }}>
          {item.title}
        </p>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------
// Modal — video element created ONLY on mount (mobile performance)
// -----------------------------------------------------------------------
function VideoModal({ src, onClose }: VideoModalProps) {
  // Swipe-down detection via pointer Y delta
  const startY = useRef<number | null>(null)

  function handlePointerDown(e: React.PointerEvent) {
    startY.current = e.clientY
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (startY.current === null) return
    const delta = e.clientY - startY.current
    if (delta > 60) {
      onClose()
    }
    startY.current = null
  }

  if (!src) return null

  return (
    <div
      onClick={onClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close button — 44×44px tap target */}
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10001,
          color: '#fff',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Video created on mount — playsInline, controls, sound ON */}
      <video
        src={src}
        controls
        autoPlay
        playsInline
        preload="auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          borderRadius: 'var(--radius)',
        }}
      />
    </div>
  )
}

// -----------------------------------------------------------------------
// Carousel — native scroll, scroll-snap, edge-peek ~15%
// -----------------------------------------------------------------------
function Carousel({ children, peek = false }: { children: React.ReactNode; peek?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        paddingBottom: '1rem',
        // Edge-peek: extra padding so last card shows ~15% of itself
        paddingRight: peek ? '15%' : '1rem',
        scrollbarWidth: 'thin',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch', // momentum on iOS
        paddingLeft: '1rem',
      }}
    >
      {children}
    </div>
  )
}

// -----------------------------------------------------------------------
// Main WorkSection
// -----------------------------------------------------------------------
export default function WorkSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  // Detect touch-only device
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)')
    setIsTouch(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <>
      <Section
        id="work"
        eyebrow={isArabic ? 'أعمال مختارة' : 'SELECTED WORK'}
        title={isArabic ? 'نُثبت بالأعمال لا بالوعود.' : 'PROOF, NOT PROMISES.'}
      >
        {/* Brand Films — 16:9, 480px wide, peek on mobile */}
        {BRAND_FILMS.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <Carousel peek={isTouch}>
              {BRAND_FILMS.map((item, i) => (
                <div key={i} style={{ scrollSnapAlign: 'start' }}>
                  <VideoCard
                    item={item}
                    aspectRatio="16/9"
                    cardWidth="480px"
                    isTouch={isTouch}
                    onOpen={setActiveVideo}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Shorts — 9:16, 200px wide, peek on mobile */}
        {SHORTS.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <Carousel peek={isTouch}>
              {SHORTS.map((item, i) => (
                <div key={i} style={{ scrollSnapAlign: 'start' }}>
                  <VideoCard
                    item={item}
                    aspectRatio="9/16"
                    cardWidth="200px"
                    isTouch={isTouch}
                    onOpen={setActiveVideo}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </Section>

      {/* CGI & Animation */}
      <section
        style={{
          background: 'var(--color-bg-elevated)',
          paddingBlock: 'clamp(4rem, 8vw, 8rem)',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--color-text)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            {isArabic ? 'ننفّذ بالمؤثرات ما تعجز الكاميرا عن تصويره' : 'CGI THAT SELLS THE UNSHOOTABLE'}
          </p>
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#000',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
            }}
          >
            <video
              src={CGI_SHOWREEL}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Fullscreen modal — video element created only on open */}
      <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  )
}
