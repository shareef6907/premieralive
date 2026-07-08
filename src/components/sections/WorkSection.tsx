'use client'

import { useLocale } from 'next-intl'
import Section from '../Section'
import { BRAND_FILMS, SHORTS, CGI_SHOWREEL } from '@/config/media'
import { useState } from 'react'

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
        {/* Brand Films — horizontal carousel */}
        {BRAND_FILMS.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '1rem',
                paddingBottom: '1rem',
                scrollbarWidth: 'thin',
              }}
            >
              {BRAND_FILMS.map((file, i) => (
                <div
                  key={i}
                  onClick={() => setActiveVideo(file)}
                  style={{
                    flexShrink: 0,
                    width: '480px',
                    aspectRatio: '16 / 9',
                    background: '#000',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <video
                    src={file}
                    muted
                    loop
                    playsInline
                    preload="none"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shorts — 9:16 carousel */}
        {SHORTS.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '1rem',
                paddingBottom: '1rem',
                scrollbarWidth: 'thin',
              }}
            >
              {SHORTS.map((file, i) => (
                <div
                  key={i}
                  onClick={() => setActiveVideo(file)}
                  style={{
                    flexShrink: 0,
                    width: '200px',
                    aspectRatio: '9 / 16',
                    background: '#000',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <video
                    src={file}
                    muted
                    loop
                    playsInline
                    preload="none"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* CGI & Animation — full-width on elevated bg */}
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
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            src={activeVideo}
            controls
            autoPlay
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
          />
        </div>
      )}
    </>
  )
}
