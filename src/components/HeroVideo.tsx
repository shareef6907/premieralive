'use client'

import { useState, useEffect } from 'react'

interface HeroVideoProps {
  poster: string
  webm: string
  mp4: string
  width: number
  height: number
}

export default function HeroVideo({ poster, webm, mp4, width, height }: HeroVideoProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (reducedMotion) return null

  return (
    <video
      width={width}
      height={height}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      autoPlay
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  )
}
