'use client'

import { motion } from 'motion/react'
import { useTranslations, useLocale } from 'next-intl'

function SaudiFlag() {
  return (
    <img
      src="/flags/sa.svg"
      alt="Saudi Arabia"
      width={22}
      height={15}
      style={{ borderRadius: '2px', flexShrink: 0 }}
    />
  )
}

export default function Contact() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500440235'

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem)',
        background: 'linear-gradient(180deg, #0A0A0B 0%, #0E0E10 100%)',
        textAlign: 'center',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: '#fff',
          marginBottom: '1rem',
          lineHeight: 1.0,
        }}
      >
        {t('heading')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '3rem',
          maxWidth: '480px',
          margin: '0 auto 3rem',
          lineHeight: 1.7,
        }}
      >
        {isArabic ? t('subAr') : t('sub')}
      </motion.p>

      <motion.a
        href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(isArabic ? 'مرحباً، أريد التواصل مع بريميرا لايف' : "Hi, I'd like to get in touch with Premiera Live")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.25 }}
        whileHover={{ scale: 1.03, y: -2 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 2.5rem',
          background: '#C9A24B',
          color: '#0A0A0B',
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          letterSpacing: '0.1em',
          fontWeight: 700,
          borderRadius: '100px',
          textDecoration: 'none',
          boxShadow: '0 4px 30px rgba(201,162,75,0.4)',
        }}
      >
        <SaudiFlag />
        {t('btn')}
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.25)',
          marginTop: '2.5rem',
        }}
      >
        {isArabic ? 'نخدم العملاء في السعودية والخليج' : 'Serving clients in Saudi Arabia and across the Gulf.'}
      </motion.p>
    </section>
  )
}
