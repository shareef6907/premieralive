'use client'

import { useLocale } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

const BRANDS = [
  'BBC STUDIOS',
  'MCLAREN',
  'AUDI',
  'JEEP',
  'TOMMY HILFIGER',
  'CALVIN KLEIN',
  'DHL',
  'FOUR SEASONS',
  'BAHRAIN INTERNATIONAL CIRCUIT',
  'FORMULA 1',
  'WORLD ENDURANCE CHAMPIONSHIP',
  'UAE SPACE AGENCY',
  'STARBUCKS',
  'BAHRAIN MINISTRY OF YOUTH AFFAIRS',
  'BAHRAIN ECONOMIC DEVELOPMENT BOARD',
  'RASHID EQUESTRIAN HORSE RACING',
]

export default function BrandMarqueeSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const [paused, setPaused] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section
      style={{ padding: 'var(--section-y) 0', background: 'var(--bg-elevated)' }}
      aria-label={isArabic ? 'العلامات التجارية الموثوق بها' : 'Trusted by global brands'}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        {isArabic ? 'وثقت بنا علامات عالمية' : 'TRUSTED BY GLOBAL BRANDS'}
      </p>

      {/* Marquee clipping wrapper — masks the overflowing tracks */}
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fade masks on left and right edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 'clamp(1rem, 5vw, 4rem)',
            background: 'linear-gradient(to right, var(--bg-elevated), transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: 'clamp(1rem, 5vw, 4rem)',
            background: 'linear-gradient(to left, var(--bg-elevated), transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Row 1 — scrolls left */}
        <div
          style={{ marginBottom: '1.5rem', cursor: 'default' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: prefersReduced ? 'none' : 'marquee-left 30s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={`row1-${i}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                  fontWeight: 500,
                  color: 'var(--text-faint)',
                  padding: '0 2.5rem',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-faint)')}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div
          style={{ cursor: 'default' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: prefersReduced ? 'none' : 'marquee-right 35s linear infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={`row2-${i}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                  fontWeight: 500,
                  color: 'var(--text-faint)',
                  padding: '0 2.5rem',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-faint)')}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
