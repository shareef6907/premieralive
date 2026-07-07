'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useTranslations, useLocale } from 'next-intl'

function TiltCard({ item, isArabic }: {
  item: { name: string; nameAr: string; desc: string; descAr: string }
  isArabic: boolean
}) {
  const card = useRef<HTMLDivElement>(null)
  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const rect = card.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set((e.clientX - cx) / (rect.width / 2) * 6)
    rawY.set((e.clientY - cy) / (rect.height / 2) * -6)
  }
  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={card}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: '#16161B',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: '2rem',
        cursor: 'default',
        rotateX: y,
        rotateY: x,
        transformStyle: 'preserve-3d',
        boxShadow: useTransform(
          [x, y],
          () => `0 ${rawY.get() * 2}px ${rawX.get() * 2}px rgba(201,162,75,0.0)`
        ),
      }}
      whileHover={prefersReduced ? {} : { boxShadow: '0 0 28px rgba(201,162,75,0.18)' }}
      transition={{ boxShadow: { duration: 0.2 } }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          letterSpacing: '0.06em',
          color: '#fff',
          marginBottom: '0.75rem',
        }}>
          {isArabic ? item.nameAr : item.name}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.6,
        }}>
          {isArabic ? item.descAr : item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const t = useTranslations('services')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const items = t.raw('items') as Array<{ name: string; nameAr: string; desc: string; descAr: string }>

  return (
    <section
      id="services"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#0A0A0B',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <TiltCard item={item} isArabic={isArabic} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
