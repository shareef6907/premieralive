'use client'

import { useTranslations, useLocale } from 'next-intl'

function SaudiFlag() {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#006C35" />
      <rect x="0" y="3.5" width="20" height="1.4" fill="white" />
      <rect x="0" y="7" width="20" height="1.4" fill="white" />
      <rect x="0" y="10.5" width="20" height="1.4" fill="white" />
      <text x="1.5" y="10.5" fontSize="6" fill="#006C35" fontWeight="bold">الله</text>
    </svg>
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
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: '#fff',
          marginBottom: '1rem',
          lineHeight: 1.0,
        }}
      >
        {t('heading')}
      </h2>

      <p
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
      </p>

      <a
        href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(isArabic ? 'مرحباً، أريد التواصل مع بريميرا لايف' : "Hi, I'd like to get in touch with Premiera Live")}`}
        target="_blank"
        rel="noopener noreferrer"
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
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 40px rgba(201,162,75,0.5)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 30px rgba(201,162,75,0.4)'
        }}
      >
        <SaudiFlag />
        {t('btn')}
      </a>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.25)',
          marginTop: '2.5rem',
        }}
      >
        {isArabic ? 'نخدم العملاء في السعودية والخليج' : 'Serving clients in Saudi Arabia and across the Gulf.'}
      </p>
    </section>
  )
}
