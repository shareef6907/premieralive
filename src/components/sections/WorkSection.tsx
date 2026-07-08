'use client'

import { useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { BRAND_FILMS, SHORTS, CGI_SHOWREEL } from '@/config/media'

// ---------------------------------------------------------------------------
// VideoCard — used by both carousel types
// ---------------------------------------------------------------------------
interface VideoCardProps {
  src: string
  title: string
  aspectRatio: '16/9' | '9/16'
  cardWidth: string
  onOpen: (src: string) => void
}

function VideoCard({ src, title, aspectRatio, cardWidth, onOpen }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [errored, setErrored] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Seek to 0.5s on metadata load so a real frame is painted (rest-state fix)
  function handleLoadedMetadata() {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0.5
  }

  function handleMouseEnter() {
    const v = videoRef.current
    if (!v || errored) return
    v.play().catch(() => {})
    setPlaying(true)
  }

  function handleMouseLeave() {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0.5
    setPlaying(false)
  }

  // Mobile tap → open modal
  function handleClick() {
    onOpen(src)
  }

  if (errored) {
    return (
      <div
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
        onClick={handleClick}
      >
        {/* Film icon */}
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
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            color: 'var(--color-text-faint)',
            textAlign: 'center',
            paddingInline: '0.5rem',
            lineHeight: 1.4,
          }}
        >
          {title}
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
        src={src}
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
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#fff',
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Modal player
// ---------------------------------------------------------------------------
interface ModalProps {
  src: string | null
  onClose: () => void
}

function VideoModal({ src, onClose }: ModalProps) {
  if (!src) return null
  return (
    <div
      onClick={onClose}
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
      {/* Close button */}
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
          width: '2.5rem',
          height: '2.5rem',
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

      <video
        src={src}
        controls
        autoPlay
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          borderRadius: 'var(--radius)',
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Carousel wrapper — handles edge-peek scroll hint
// ---------------------------------------------------------------------------
interface CarouselProps {
  children: React.ReactNode
}

function Carousel({ children }: CarouselProps) {
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        paddingBottom: '1rem',
        paddingRight: '1rem',
        scrollbarWidth: 'thin',
        scrollSnapType: 'x mandatory',
        // Edge-peek: ensure last item can scroll fully into view
        paddingLeft: '1rem',
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main WorkSection
// ---------------------------------------------------------------------------
export default function WorkSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <>
      <Section
        id="work"
        eyebrow={isArabic ? 'أعمال مختارة' : 'SELECTED WORK'}
        title={isArabic ? 'نُثبت بالأعمال لا بالوعود.' : 'PROOF, NOT PROMISES.'}
      >
        {/* Brand Films — 16:9, 480px wide, scroll-snap */}
        {BRAND_FILMS.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <Carousel>
              {BRAND_FILMS.map((item, i) => (
                <div key={i} style={{ scrollSnapAlign: 'start' }}>
                  <VideoCard
                    src={item.src}
                    title={item.title}
                    aspectRatio="16/9"
                    cardWidth="480px"
                    onOpen={setActiveVideo}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Shorts — 9:16, 200px wide, scroll-snap */}
        {SHORTS.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <Carousel>
              {SHORTS.map((item, i) => (
                <div key={i} style={{ scrollSnapAlign: 'start' }}>
                  <VideoCard
                    src={item.src}
                    title={item.title}
                    aspectRatio="9/16"
                    cardWidth="200px"
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
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: 'var(--color-text)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
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

      {/* Fullscreen modal player */}
      <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  )
}
