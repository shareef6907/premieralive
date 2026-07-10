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

// ---------------------------------------------------------------------------
// Global mute state — shared across all slider instances
// ---------------------------------------------------------------------------
// Use a module-level ref so unmute exclusivity works across all card instances
let _globalUnmutedSrc: string | null = null
const _globalMuteListeners: Set<() => void> = new Set()

export function subscribeGlobalMute(cb: () => void) {
  _globalMuteListeners.add(cb)
  return () => { _globalMuteListeners.delete(cb) }
}

function notifyGlobalMute() {
  _globalMuteListeners.forEach(cb => cb())
}

// ---------------------------------------------------------------------------
// SliderCard — IO autoplay (mobile), hover play (desktop)
// Unmute exclusivity: only one video unmutes globally at a time.
// Desktop hover: unmute + play. Touch tap: unmute + play.
// Any other play attempt: mutes the previously unmuted one.
// ---------------------------------------------------------------------------
function SliderCard({
  item,
  aspectRatio,
  cardWidth,
  isTouch,
}: {
  item: VideoItem
  aspectRatio: AspectRatio
  cardWidth: string
  isTouch: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [errored, setErrored] = useState(false)
  const [isMuted, setIsMuted] = useState(true)       // start muted
  const [isVisible, setIsVisible] = useState(false)  // IO-driven visibility
  const ioRef = useRef<IntersectionObserver | null>(null)
  const isCurrentlyPlaying = useRef(false)

  // IO: set video src + autoplay when card enters viewport (mobile)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
          if (entry.isIntersecting && isTouch) {
            video.src = item.src
            video.load()
            video.play().catch(() => {})
          }
        })
      },
      { threshold: 0 }
    )
    ioRef.current.observe(video)
    return () => ioRef.current?.disconnect()
  }, [isTouch, item.src])

  // Sync play state with visibility (mobile IO autoplay)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!isTouch) return

    if (isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = item.posterTime ?? 1.0
    }
  }, [isVisible, isTouch, item.posterTime])

  function handleMouseEnter() {
    if (isTouch) return
    const video = videoRef.current
    if (!video || errored) return

    // Mute any currently unmuted video globally
    if (_globalUnmutedSrc && _globalUnmutedSrc !== item.src) {
      _globalUnmutedSrc = null
      notifyGlobalMute()
    }

    video.muted = false
    setIsMuted(false)
    _globalUnmutedSrc = item.src
    video.play().catch(() => {})
    isCurrentlyPlaying.current = true
  }

  function handleMouseLeave() {
    if (isTouch) return
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.muted = true
    setIsMuted(true)
    if (_globalUnmutedSrc === item.src) _globalUnmutedSrc = null
    video.currentTime = item.posterTime ?? 1.0
    isCurrentlyPlaying.current = false
  }

  // Called by global mute broadcast
  function handleGlobalMute() {
    const video = videoRef.current
    if (!video || video.muted) return
    video.muted = true
    setIsMuted(true)
    video.pause()
    video.currentTime = item.posterTime ?? 1.0
    isCurrentlyPlaying.current = false
    if (_globalUnmutedSrc === item.src) _globalUnmutedSrc = null
  }

  // Subscribe to global mute
  useEffect(() => {
    return subscribeGlobalMute(handleGlobalMute)
  }, [])

  if (errored) {
    return (
      <div
        style={{
          flexShrink: 0, width: cardWidth, aspectRatio,
          background: 'var(--color-card)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 'var(--radius)',
          display: 'flex', flexDirection: 'column',
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
      onClick={!isTouch ? handleMouseEnter : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink: 0, width: cardWidth, aspectRatio,
        background: '#000', borderRadius: 'var(--radius)', overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        border: isCurrentlyPlaying.current ? '1px solid var(--color-gold-soft)' : '1px solid transparent',
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
        onLoadedMetadata={() => {
          const v = videoRef.current
          if (v) v.currentTime = item.posterTime ?? 1.0
        }}
        onError={() => setErrored(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Mute indicator */}
      {isMuted && (
        <div style={{
          position: 'absolute', top: '0.5rem', right: '0.5rem',
          background: 'rgba(0,0,0,0.55)', borderRadius: '50%',
          width: '28px', height: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </div>
      )}

      {/* Title */}
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
// Featured Productions section — horizontal scroll sliders
// ---------------------------------------------------------------------------
export default function FeaturedProductionsSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [isTouch, setIsTouch] = useState(false)

  // Hamra added at top of brand films
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
        {/* Brand Films slider */}
        <div style={{
          display: 'flex', overflowX: 'auto', gap: '1rem',
          paddingBottom: '1rem',
          paddingRight: isTouch ? '15%' : '0',
          scrollbarWidth: 'thin', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}>
          {allFilms.map((item, i) => (
            <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
              <SliderCard
                item={item}
                aspectRatio="16/9"
                cardWidth={isTouch ? '75vw' : '480px'}
                isTouch={isTouch}
              />
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
            WebkitOverflowScrolling: 'touch',
          }}>
            {SHORTS.map((item, i) => (
              <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
                <SliderCard
                  item={item}
                  aspectRatio="9/16"
                  cardWidth="200px"
                  isTouch={isTouch}
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
    </>
  )
}
