'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import Section from '../Section'

const LINES_EN = [
  'Every growing business needs two things.',
  'Great Storytelling 🎬',
  'And a Website that turns Attention into Customers. 💻',
  "That's where we come in.",
]

const LINES_AR = [
  'يحتاج كل عمل ينمو إلى شيئين.',
  'نروي قصتك ببراعة 🎬',
  'نبني موقعًا يحوّل الانتباه إلى عملاء. 💻',
  'يبدأ دورنا من هنا.',
]

export default function IntroSection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const lines = isArabic ? LINES_AR : LINES_EN
  const refs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      refs.current.forEach((el) => {
        if (el) {
          el.style.opacity = '1'
          el.style.transform = 'none'
        }
      })
      return
    }
    const observers: IntersectionObserver[] = []
    refs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.transition = `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${i * 250}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${i * 250}ms`
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.unobserve(el)
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <Section>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
          maxWidth: '700px',
          marginInline: 'auto',
          textAlign: 'center',
          direction: isArabic ? 'rtl' : 'ltr',
        }}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            ref={(el) => { refs.current[i] = el }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </Section>
  )
}
