'use client'

import { useRef } from 'react'
import { motion, useInView, animate, useMotionValue } from 'motion/react'
import { useTranslations, useLocale } from 'next-intl'

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const numericValue = parseInt(value.replace(/\D/g, ''), 10)
  const prefix = value.match(/^\D+/)?.[0] ?? ''
  const suffix = value.match(/\D+$/)?.[0] ?? ''

  if (prefersReduced) {
    return <span ref={ref}>{value}</span>
  }

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {numericValue > 0 ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {prefix}
          <motion.span>
            {Array.from({ length: String(numericValue).length }).map((_, idx) => {
              const digit = String(numericValue)[idx]
              return (
                <motion.span
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: idx * 0.08, ease: 'easeOut' }}
                >
                  {digit}
                </motion.span>
              )
            })}
          </motion.span>
          {suffix}
        </motion.span>
      ) : (
        <span>{value}</span>
      )}
    </motion.span>
  )
}

export default function WhyUs() {
  const t = useTranslations('whyUs')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const stats = t.raw('stats') as Array<{ value: string; label: string; labelAr: string }>

  return (
    <section
      id="whyUs"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#0A0A0B',
        borderTop: '1px solid rgba(255,255,255,0.03)',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: '#C9A24B',
          marginBottom: '1.5rem',
        }}
      >
        {t('eyebrow')}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: '#fff',
          marginBottom: '4rem',
          lineHeight: 1.05,
        }}
      >
        {t('heading')}
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '2rem',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: '#C9A24B',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}
            >
              <AnimatedCounter value={stat.value} />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
              }}
            >
              {isArabic ? stat.labelAr : stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
