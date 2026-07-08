'use client'

import { useRef, useEffect, useState } from 'react'
import { SCRUB_VIDEO } from '@/config/media'

export default function ScrollScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoaded = () => setVideoDuration(video.duration)
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video || !videoDuration) return

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const progress = -rect.top / (rect.height - window.innerHeight)
        if (video) {
          video.currentTime = Math.max(0, Math.min(videoDuration, progress * videoDuration))
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [videoDuration])

  return (
    <div
      ref={containerRef}
      style={{ height: '400vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <video
          ref={videoRef}
          src={SCRUB_VIDEO}
          muted
          playsInline
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.1em',
            }}
          >
            PREMIERA LIVE — SHOWREEL
          </p>
        </div>
      </div>
    </div>
  )
}
