'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { media } from '@/config/media'

function ComingSoonTile({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        position: 'relative',
        aspectRatio: '9/16',
        background: 'transparent',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Gold ring border */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 12,
        padding: '1px',
        background: 'linear-gradient(135deg, rgba(201,162,75,0.5) 0%, rgba(201,162,75,0.1) 50%, rgba(201,162,75,0.5) 100%)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }} />
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          color: 'rgba(201,162,75,0.35)',
          textAlign: 'center',
          padding: '1rem',
        }}
      >
        COMING<br />SOON
      </div>
    </motion.div>
  )
}

export default function SelectedWork() {
  const t = useTranslations('work')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const allWork = [
    ...media.work.horizontal,
    ...media.work.animations,
    ...media.work.reels,
    ...media.work.interviews,
  ]

  const tiles = allWork.length > 0 ? allWork : Array(6).fill(null)

  return (
    <section
      id="work"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#0E0E10',
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
          marginBottom: '3rem',
          lineHeight: 1.05,
        }}
      >
        {t('heading')}
      </motion.h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
        }}
      >
        {tiles.map((item, i) =>
          item === null
            ? <ComingSoonTile key={i} index={i} />
            : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{
                  position: 'relative',
                  aspectRatio: '9/16',
                  background: '#16161B',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={`${media.folders.posters}/${item.file}`}
                  alt={item.title}
                  fill
                  quality={70}
                  sizes="(max-width: 768px) 50vw, 280px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,11,0.85) 0%, transparent 50%)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  right: '1.25rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  color: '#fff',
                }}>
                  {item.title}
                </div>
              </motion.div>
            )
        )}
      </div>
    </section>
  )
}
