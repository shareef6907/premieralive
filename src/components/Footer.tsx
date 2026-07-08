import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function Footer() {
  const locale = useLocale()
  const isArabic = locale === 'ar'

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--card-border)',
        padding: '3rem clamp(1.5rem, 5vw, 4rem) 2rem',
      }}
    >
      {/* Row 1: P monogram + wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {/* Gold P monogram — simplified inline SVG */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1px solid var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'var(--gold)',
              lineHeight: 1,
            }}
          >
            P
          </span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.25em', color: 'var(--gold)' }}>
            PREMIERA LIVE
          </div>
        </div>
      </div>

      {/* Row 2: tagline */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body-sm)',
          color: 'var(--text-faint)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}
      >
        {isArabic
          ? 'تنطلق بريميرا لايف في السعودية — ونخدم عملاءنا في مختلف دول الخليج.'
          : 'Launching in Saudi Arabia — serving clients across the Gulf.'}
      </p>

      {/* Row 3: copyright + locale switcher */}
      <div
        style={{
          borderTop: '1px solid var(--card-border)',
          paddingTop: '1.25rem',
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
            fontSize: 'var(--body-sm)',
            color: 'var(--text-faint)',
          }}
        >
          &copy; 2026 Premiera Live
        </p>
        <Link
          href={locale === 'en' ? '/ar' : '/en'}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            color: 'var(--text-faint)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          {locale === 'en' ? 'العربية' : 'English'}
        </Link>
      </div>
    </footer>
  )
}
