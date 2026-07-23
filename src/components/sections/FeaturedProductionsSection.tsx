'use client'

import { useRef, useState, useEffect } from 'react'
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
  titleAr?: string
  posterTime?: number
  poster?: string
}

// ---------------------------------------------------------------------------
// Global mute state — shared across all slider card instances
// ---------------------------------------------------------------------------
let _globalUnmutedSrc: string | null = null
const _globalMuteListeners: Set<() => void> = new Set()

function subscribeGlobalMute(cb: () => void) {
  _globalMuteListeners.add(cb)
  return () => { _globalMuteListeners.delete(cb) }
}

function notifyGlobalMute() {
  _globalMuteListeners.forEach(cb => cb())
}

// ---------------------------------------------------------------------------
// SliderCard — IO autoplay on mobile, click-to-unmute on all devices
// Global mute exclusivity: clicking one card's unmute mutes all others
// isCurrentlyPlaying ref: drives gold border on the actively-played card
// ---------------------------------------------------------------------------
function SliderCard({
  item,
  aspectRatio,
  cardWidth,
  isTouch,
  isArabic,
}: {
  item: VideoItem
  aspectRatio: AspectRatio
  cardWidth: string
  isTouch: boolean
  isArabic: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [errored, setErrored] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const ioRef = useRef<IntersectionObserver | null>(null)
  const clickStartedRef = useRef(false)

  // IO: set src + autoplay when card enters viewport (mobile only)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    ioRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
          if (entry.isIntersecting && isTouch && !clickStartedRef.current) {
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

  // Sync play state with IO visibility (mobile autoplay)
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isTouch) return

    if (isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
      video.currentTime = item.posterTime ?? 1.0
    }
  }, [isVisible, isTouch, item.posterTime])

  // Per-slide toggle — click-to-play on first interaction, unmute on subsequent
  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (!video.muted) {
      // Mute this card
      video.muted = true
      setIsMuted(true)
      video.pause()
      video.currentTime = item.posterTime ?? 1.0
      setIsPlaying(false)
      if (_globalUnmutedSrc === item.src) _globalUnmutedSrc = null
    } else {
      // Unmute with global exclusivity
      if (_globalUnmutedSrc && _globalUnmutedSrc !== item.src) {
        _globalUnmutedSrc = null
        notifyGlobalMute()
      }
      // First click: load video from poster, then play
      if (!clickStartedRef.current && !isTouch) {
        video.src = item.src
        video.load()
        clickStartedRef.current = true
      }
      video.muted = false
      setIsMuted(false)
      setIsPlaying(true)
      _globalUnmutedSrc = item.src
      video.play().catch(() => {})
    }
  }

  // Keyboard accessibility
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMute(e as unknown as React.MouseEvent)
    }
  }

  // Global mute broadcast
  function handleGlobalMute() {
    const video = videoRef.current
    if (!video || video.muted) return
    video.muted = true
    setIsMuted(true)
    video.pause()
    video.currentTime = item.posterTime ?? 1.0
    setIsPlaying(false)
    if (_globalUnmutedSrc === item.src) _globalUnmutedSrc = null
  }

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
      onClick={toggleMute}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Play ${item.title}`}
      style={{
        flexShrink: 0, width: cardWidth, aspectRatio,
        background: '#000', borderRadius: 'var(--radius)', overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        border: isPlaying ? '2px solid var(--color-gold)' : '1px solid transparent',
        transition: 'border-color 0.3s',
        outline: 'none',
      }}
    >
      <video disablePictureInPicture controlsList="nodownload nofullscreen"
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={item.poster}
        onLoadedMetadata={() => {
          const v = videoRef.current
          if (v) v.currentTime = item.posterTime ?? 1.0
        }}
        onError={() => setErrored(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {/* Play affordance — shown before video loads */}
      {!isPlaying && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(201,162,75,0.9)" stroke="none" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}>
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Per-slide unmute pill */}
      {!isMuted && (
        <div
          onClick={toggleMute}
          style={{
            position: 'absolute', top: '0.5rem', right: '0.5rem',
            background: 'rgba(0,0,0,0.6)', borderRadius: '9999px',
            padding: '0.25rem 0.625rem',
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            cursor: 'pointer',
            border: '1px solid rgba(201,162,75,0.5)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 500, color: '#C9A24B' }}>SOUND ON</span>
        </div>
      )}

      {/* Title */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '2rem 0.75rem 0.75rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>{isArabic ? (item.titleAr ?? item.title) : item.title}</p>
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

  // Al Hamra at top, then new 3 films, then existing BRAND_FILMS
  const allFilms: VideoItem[] = [
    { src: `${MEDIA_BASE}/Horizontal%20Videos/Hamra%20Jewellery%20new2.mp4`, title: 'Al Hamra Jewellery', poster: `${MEDIA_BASE}/work/posters/Hamra-Jewellery-poster.jpg` },
    ...BRAND_FILMS.map((f) => ({ src: f.src, title: f.title, titleAr: f.titleAr, posterTime: (f as any).posterTime, poster: f.poster })),
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
                isArabic={isArabic}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Shorts strip */}
      <section style={{ background: 'var(--color-bg-elevated)' }}>
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
                  isArabic={isArabic}
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
            <video disablePictureInPicture controlsList="nodownload nofullscreen" webkit-playsinline
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
