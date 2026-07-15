'use client'

import { useLocale } from 'next-intl'
import { Mail, MessageCircle, Phone } from 'lucide-react'

export default function ContactActions() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500440235'

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    isArabic
      ? 'مرحباً، أريد التواصل مع بريميرا لايف'
      : "Hi, I'd like to get in touch with Premiera Live"
  )}`

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isArabic ? 'row-reverse' : 'row',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Email */}
      <a
        href="mailto:ceo@premieralive.com"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.5rem',
          background: 'var(--color-gold)',
          color: '#0A0A0B',
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          fontWeight: 700,
          textDecoration: 'none',
          borderRadius: '9999px',
          flex: '1 1 160px',
          justifyContent: 'center',
          minWidth: '160px',
        }}
      >
        <Mail size={16} color="#0A0A0B" strokeWidth={2.5} />
        {isArabic ? 'راسلنا بالبريد' : 'Email Us'}
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.5rem',
          background: 'var(--color-gold)',
          color: '#0A0A0B',
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          fontWeight: 700,
          textDecoration: 'none',
          borderRadius: '9999px',
          flex: '1 1 160px',
          justifyContent: 'center',
          minWidth: '160px',
        }}
      >
        <MessageCircle size={16} color="#0A0A0B" strokeWidth={2.5} />
        {isArabic ? 'واتساب' : 'WhatsApp'}
      </a>

      {/* Call */}
      <a
        href="tel:+966500440235"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.5rem',
          background: 'var(--color-gold)',
          color: '#0A0A0B',
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          fontWeight: 700,
          textDecoration: 'none',
          borderRadius: '9999px',
          flex: '1 1 160px',
          justifyContent: 'center',
          minWidth: '160px',
        }}
      >
        <Phone size={16} color="#0A0A0B" strokeWidth={2.5} />
        {isArabic ? 'اتصل بنا' : 'Call Us'}
      </a>
    </div>
  )
}
