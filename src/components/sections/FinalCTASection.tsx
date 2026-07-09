import { useLocale } from 'next-intl'
import Section from '../Section'

const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500000000'

const SA_FLAG = (
  <svg width="20" height="20" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect width="60" height="40" fill="#006C35" />
    <rect x="18" y="11" width="24" height="18" fill="white" />
    <path d="M21 20 L21 15 L27 11 L30 20 Z" fill="#006C35" />
    <path d="M21 20 L21 25 L27 29 L30 20 Z" fill="#006C35" />
    <path d="M39 20 L39 15 L33 11 L30 20 Z" fill="#006C35" />
    <path d="M39 20 L39 25 L33 29 L30 20 Z" fill="#006C35" />
  </svg>
)

export default function FinalCTASection() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(
    isArabic
      ? 'أرغب في حجز مكالمة تعريفية.'
      : "Hi, I'd like to book a discovery call."
  )}`

  return (
    <Section id="contact">
      <div style={{
        minHeight: '70vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--h1)',
          color: 'var(--color-text)', lineHeight: 0.95,
          letterSpacing: '0.01em', textTransform: 'uppercase',
          marginBottom: '3rem',
        }}>
          {isArabic
            ? 'لنصنع معاً شيئاً استثنائياً'
            : "LET'S BUILD SOMETHING REMARKABLE."}
        </h2>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.875rem 2rem', background: 'var(--color-gold)',
            color: 'var(--color-bg)', fontFamily: 'var(--font-body)',
            fontWeight: 600, fontSize: 'var(--body)', borderRadius: 'var(--radius)',
            textDecoration: 'none', marginBottom: '1.5rem', transition: 'opacity 0.2s',
          }}
        >
          {SA_FLAG}
          {isArabic ? 'احجز مكالمة تعريفية' : 'Book a Discovery Call'}
        </a>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--color-text-faint)' }}>
          {isArabic ? 'نرد خلال يوم عمل واحد.' : 'Replies within one business day.'}
        </p>
      </div>
    </Section>
  )
}
