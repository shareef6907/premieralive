'use client'

import { useLocale } from 'next-intl'
import { useRef, useState, useEffect, useCallback } from 'react'
import { HERO_VIDEO, HERO_POSTER } from '@/config/media'

const STATS = [
  { en: { num: '15+', label: 'Years of Experience' }, ar: { num: '15+', label: 'عاماً من الخبرة' } },
  { en: { num: '1,000+', label: 'Projects Delivered' }, ar: { num: '1,000+', label: 'مشروع منجز' } },
  { en: { num: '20+', label: 'Global Brands' }, ar: { num: '20+', label: 'علامة عالمية' } },
  { en: { num: '25+', label: 'Platforms Mastered' }, ar: { num: '25+', label: 'منصة نتقنها' } },
]

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)
  useEffect(() => {
    if (!start || hasRun.current) return
    hasRun.current = true
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatItem({ stat, isArabic }: { stat: typeof STATS[0]; isArabic: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const numStr = stat[isArabic ? 'ar' : 'en'].num
  const raw = parseInt(numStr.replace(/\D/g, ''))
  const suffix = numStr.replace(/[\d,]/g, '')
  const count = useCountUp(raw, 2000, visible)

  // Format with locale comma separator for EN; raw for AR (Western numerals)
  const displayNum = isArabic ? count.toString() : count.toLocaleString('en-US')

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 2rem' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,3vw,3rem)', color: 'var(--color-gold)', lineHeight: 1 }}>
        {displayNum}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', color: 'var(--color-text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem' }}>
        {stat[isArabic ? 'ar' : 'en'].label}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasInteracted = useRef(false)
  const [muted, setMuted] = useState(true)
  const [audioFading, setAudioFading] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const fadeAudioIn = useCallback(() => {
    if (hasInteracted.current || reducedMotion) return
    hasInteracted.current = true
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setMuted(false)
    setAudioFading(true)
    video.volume = 0
    const target = 1
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let step = 0
    const interval = setInterval(() => {
      step++
      video.volume = Math.min(increment * step, target)
      if (step >= steps) {
        clearInterval(interval)
        setAudioFading(false)
      }
    }, duration / steps)
  }, [reducedMotion])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }, [])

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? ''
  const whatsappEn = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to book a strategy session.")}`
  const whatsappAr = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('أرغب في حجز جلسة استراتيجية.')}`

  return (
    <section
      id="hero"
      onClick={fadeAudioIn}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
        cursor: muted ? 'pointer' : 'default',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
          background: `linear-gradient(to top, #0A0A0B 0%, transparent 40%), linear-gradient(to bottom, #0A0A0B 0%, transparent 30%), rgba(10,10,11,0.35)`,
          zIndex: 1,
        }}
      />

      {/* Flex column: content top + stats strip bottom, normal flow */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Content block — top */}
        <div
          style={{
            maxWidth: '880px',
            padding: 'clamp(5rem,10vh,8rem) clamp(1.5rem,5vw,4rem) 0',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--eyebrow)',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            {isArabic ? 'إبداع · تقنية · ذكاء اصطناعي · نمو' : 'CREATIVE · TECHNOLOGY · AI · GROWTH'}
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            color: 'var(--color-text)',
            lineHeight: 0.95,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            {isArabic ? 'نصنع علاماتٍ لا تُنسى' : 'WE BUILD BRANDS PEOPLE REMEMBER'}
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body)',
            color: 'var(--color-text-dim)',
            lineHeight: 1.7,
            maxWidth: '560px',
            marginBottom: '2rem',
          }}>
            {isArabic
              ? 'نمزج السرد السينمائي بأنظمة الذكاء الاصطناعي وتجارب رقمية مصمّمة لزيادة العملاء والمبيعات وقيمة العلامة التجارية في السعودية والخليج.'
              : 'Cinematic storytelling, AI-powered systems, and digital experiences — engineered to grow leads, sales, and brand value across Saudi Arabia and the Gulf.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={isArabic ? whatsappAr : whatsappEn}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
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
              {isArabic ? 'احجز جلسة استراتيجية' : 'Book a Strategy Session'}
            </a>
            <a
              href="#work"
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
              {isArabic ? 'شاهد أعمالنا' : 'See Our Work'}
            </a>
          </div>
        </div>

        {/* Stats strip — last flex child, pinned to bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid var(--color-card-border)',
            background: 'rgba(10,10,11,0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem 0',
              }}
            >
              {i > 0 && (
                <div style={{ width: '1px', height: '2.5rem', background: 'var(--color-card-border)', marginRight: '0', marginLeft: '0' }} />
              )}
              <StatItem stat={stat} isArabic={isArabic} />
            </div>
          ))}
        </div>
      </div>

      {/* Unmute pill — bottom-right, outside flex so it floats */}
      <button
        onClick={e => { e.stopPropagation(); toggleMute() }}
        aria-label={muted ? (isArabic ? 'تشغيل الصوت' : 'Unmute') : (isArabic ? 'كتم الصوت' : 'Mute')}
        style={{
          position: 'absolute',
          bottom: '6rem',
          right: 'clamp(1.5rem,5vw,4rem)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1.25rem',
          background: 'var(--color-gold)',
          color: '#0A0A0B',
          border: 'none',
          borderRadius: '999px',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: 'var(--body-sm)',
          cursor: 'pointer',
          letterSpacing: '0.04em',
          transition: 'opacity 0.3s',
          opacity: audioFading ? 0 : 1,
        }}
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
        {muted ? (isArabic ? 'تشغيل' : 'Unmute') : (isArabic ? 'كتم' : 'Mute')}
      </button>
    </section>
  )
}
