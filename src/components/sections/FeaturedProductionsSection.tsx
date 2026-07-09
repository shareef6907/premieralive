'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'
import { BRAND_FILMS, SHORTS, CGI_SHOWREEL, MEDIA_BASE } from '@/config/media'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// VideoCard — IO frame-seek (mobile), hover play (desktop)
// ---------------------------------------------------------------------------
function VideoCard({ item, aspectRatio, cardWidth, isTouch, onOpen }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [errored, setErrored] = useState(false)
  const [playing, setPlaying] = useState(false)
  const ioRef = useRef<IntersectionObserver | null>(null)
  const seekedRef = useRef(false)

  // IO frame-seek: seek only when card enters viewport
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isTouch) return

    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seekedRef.current) {
            seekedRef.current = true
            video.src = item.src
            video.load()
          }
        })
      },
      { threshold: 0 }
    )
    ioRef.current.observe(video)

    return () => ioRef.current?.disconnect()
  }, [isTouch, item.src])

  function handleLoadedMetadata() {
    const v = videoRef.current
    if (!v) return
    v.currentTime = item.posterTime ?? 1.0
  }

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

  function handleClick() {
    if (!isTouch) return
    onOpen(item.src)
  }

  if (errored) {
    return (
      <div
        onClick={handleClick}
        style={{
          flexShrink: 0, width: cardWidth, aspectRatio,
          background: 'var(--color-card)', border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          cursor: 'pointer', overflow: 'hidden',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-faint)' }}>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
          <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" />
          <line x1="17" y1="17" x2="22" y2="17" />
        </svg>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-faint)', textAlign: 'center', paddingInline: '0.5rem', lineHeight: 1.4 }}>{item.title}</p>
      </div>
    )
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink: 0, width: cardWidth, aspectRatio,
        background: '#000', borderRadius: 'var(--radius)', overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        border: playing ? '1px solid var(--color-gold-soft)' : '1px solid transparent',
        transition: 'border-color 0.3s',
      }}
    >
      <video
        ref={videoRef}
        muted loop playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
        onError={() => setErrored(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '2rem 0.75rem 0.75rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>{item.title}</p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Modal — loading spinner + 10s canplay timeout fallback
// ---------------------------------------------------------------------------
function VideoModal({ src, onClose }: VideoModalProps) {
  const startY = useRef<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [timedOut, setTimedOut] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!src) return
    setLoading(true)
    setTimedOut(false)

    timerRef.current = setTimeout(() => {
      setTimedOut(true)
      setLoading(false)
    }, 10000)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [src])

  function handleCanPlay() {
    setLoading(false)
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }

  function handlePointerDown(e: React.PointerEvent) { startY.current = e.clientY }
  function handlePointerUp(e: React.PointerEvent) {
    if (startY.current === null) return
    if (e.clientY - startY.current > 60) onClose()
    startY.current = null
  }

  if (!src) return null

  return (
    <div
      onClick={onClose}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%', minWidth: '44px', minHeight: '44px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10001, color: '#fff',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {loading && !timedOut && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 10000 }}>
          <div style={{
            width: '48px', height: '48px',
            border: '3px solid rgba(201,162,75,0.2)',
            borderTopColor: 'var(--color-gold)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Loading...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {timedOut ? (
        <div style={{ textAlign: 'center', zIndex: 10000 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
            Tap to open film directly
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--color-gold)', textDecoration: 'underline' }}
          >
            Open video
          </a>
        </div>
      ) : (
        <video
          src={src}
          controls
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '90vw', maxHeight: '90vh',
            borderRadius: 'var(--radius)',
            display: loading ? 'none' : 'block',
          }}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Featured Productions section
// ---------------------------------------------------------------------------
export default function FeaturedProductionsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  // Hamra added at top
  const allFilms: VideoItem[] = [
    { src: `${MEDIA_BASE}/Horizontal%20Videos/Hamra%20Jewellery%20new2.mp4`, title: 'Al Hamra Jewellery' },
    ...BRAND_FILMS.map((f) => ({ src: f.src, title: f.title, posterTime: (f as any).posterTime })),
  ]

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
        id="films"
        eyebrow={isArabic ? 'إنتاج مختار' : 'FEATURED PRODUCTION'}
      >
        {/* Editorial film blocks — one per film, near full-width, full-bleed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 6vw, 5rem)', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          {allFilms.map((item, i) => (
            <div key={i} style={{ width: '100%' }}>
              <VideoCard
                item={item}
                aspectRatio="16/9"
                cardWidth="100%"
                isTouch={isTouch}
                onOpen={setActiveVideo}
              />
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', marginTop: '1rem',
              }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Shorts strip */}
      <section style={{ background: 'var(--color-bg-elevated)', paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 'var(--eyebrow)',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '2rem',
          }}>
            {isArabic ? 'أفلام قصيرة واجتماعية' : 'VERTICAL & SOCIAL FILMS'}
          </p>
          <div style={{
            display: 'flex', overflowX: 'auto', gap: '1rem',
            paddingBottom: '1rem',
            paddingRight: isTouch ? '15%' : '0',
            scrollbarWidth: 'thin', scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch', paddingLeft: '0',
          }}>
            {SHORTS.map((item, i) => (
              <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <VideoCard
                  item={item}
                  aspectRatio="9/16"
                  cardWidth="200px"
                  isTouch={isTouch}
                  onOpen={setActiveVideo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CGI plate */}
      <section style={{ paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}>
        <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'clamp(1.25rem, 5vw, 4rem)' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: 'var(--color-text)', letterSpacing: '0.05em',
            textTransform: 'uppercase', marginBottom: '2rem',
          }}>
            {isArabic ? 'ننفّذ بالمؤثرات ما تعجز الكاميرا عن تصويره' : 'CGI THAT SELLS THE UNSHOOTABLE'}
          </p>
          <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#000', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <video src={CGI_SHOWREEL} muted autoPlay loop playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  )
}
