import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <footer
      style={{
        background: '#0A0A0B',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '4rem 2rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Wordmark */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              letterSpacing: '0.15em',
              color: '#C9A24B',
            }}
          >
            PREMIERA LIVE
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '0.5em',
              color: 'rgba(201,162,75,0.5)',
              marginTop: '-4px',
            }}
          >
            {isArabic ? 'قريباً في السعودية' : 'LAUNCHING IN SAUDI ARABIA'}
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          {isArabic ? t('taglineAr') : t('tagline')}
        </p>

        {/* Bottom row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.04)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            {t('copyright')}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link
              href={locale === 'en' ? '/ar' : '/en'}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
              }}
            >
              {locale === 'en' ? 'العربية' : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
