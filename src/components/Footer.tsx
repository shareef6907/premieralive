'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { FOOTER_LINKS } from '@/config/navLinks'
import { MARKETING_SLUGS } from '@/config/marketingServices'

// Short labels for footer marketing links (strip " in Saudi Arabia" suffix)
const MARKETING_SHORT_LABELS_EN: Record<string, string> = {
  'social-media-management-saudi': 'Social Media Management',
  'google-ads-saudi': 'Google Ads',
  'facebook-instagram-ads-saudi': 'Facebook & Instagram Ads',
  'snapchat-tiktok-ads-saudi': 'Snapchat & TikTok Ads',
  'seo-saudi': 'SEO',
  'content-production-saudi': 'Content Production',
  'marketing-packages-saudi': 'Growth Partnership Packages',
}

const MARKETING_SHORT_LABELS_AR: Record<string, string> = {
  'social-media-management-saudi': 'إدارة وسائل التواصل الاجتماعي',
  'google-ads-saudi': 'إعلانات Google',
  'facebook-instagram-ads-saudi': 'إعلانات فيسبوك وإنستغرام',
  'snapchat-tiktok-ads-saudi': 'إعلانات سناب شات وتيك توك',
  'seo-saudi': 'تحسين محركات البحث',
  'content-production-saudi': 'إنتاج المحتوى',
  'marketing-packages-saudi': 'باقات شراكة النمو',
}

export default function Footer() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const pathname = usePathname()
  const target = isArabic ? 'en' : 'ar'
  const segments = pathname.split('/')
  segments[1] = target
  const localeSwitchHref = segments.join('/') || `/${target}`

  const marketingLinksEn = MARKETING_SLUGS.map((slug) => ({
    href: `/en/marketing/${slug}`,
    label: MARKETING_SHORT_LABELS_EN[slug] ?? slug,
  }))
  const marketingLinksAr = MARKETING_SLUGS.map((slug) => ({
    href: `/ar/marketing/${slug}`,
    label: MARKETING_SHORT_LABELS_AR[slug] ?? slug,
  }))

  const whatsappUrl = `https://wa.me/966500440235?text=${encodeURIComponent(
    isArabic ? 'مرحباً، أريد التواصل مع Premiera Live' : "Hi, I'd like to get in touch with Premiera Live"
  )}`

  const colDir = isArabic ? 'column-reverse' : 'column'

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--card-border)',
        padding: '4rem clamp(1.5rem, 5vw, 4rem) 2rem',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      {/* ── 4-column grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem 2.5rem',
          marginBottom: '3rem',
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
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
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.25em', color: 'var(--gold)' }}>
              PREMIERA LIVE
            </div>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              color: 'rgba(245,244,240,0.55)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {isArabic
              ? 'نطلق في المملكة العربية السعودية — ونخدم عملاء في أنحاء الخليج.'
              : 'Launching in Saudi Arabia — serving clients across the Gulf.'}
          </p>
        </div>

        {/* Col 2 — Company */}
        <div>
          <p
            style={{
              fontFamily: 'var(--eyebrow)',
              fontSize: 'var(--eyebrow)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
            }}
          >
            {isArabic ? 'الشركة' : 'Company'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={`/${locale}${link.href}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'rgba(245,244,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
              >
                {isArabic ? link.ar : link.en}
              </a>
            ))}
          </div>
        </div>

        {/* Col 3 — Marketing */}
        <div>
          <p
            style={{
              fontFamily: 'var(--eyebrow)',
              fontSize: 'var(--eyebrow)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
            }}
          >
            {isArabic ? 'خدمات التسويق' : 'Marketing'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(isArabic ? marketingLinksAr : marketingLinksEn).map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'rgba(245,244,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <p
            style={{
              fontFamily: 'var(--eyebrow)',
              fontSize: 'var(--eyebrow)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
            }}
          >
            {isArabic ? 'تواصل معنا' : 'Contact'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <a
              href="mailto:ceo@premieralive.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'rgba(245,244,240,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
            >
              <Mail size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
              ceo@premieralive.com
            </a>
            <a
              href="tel:+966500440235"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'rgba(245,244,240,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
            >
              <Phone size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
              +966 50 044 0235
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'rgba(245,244,240,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
            >
              <MessageCircle size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
              {isArabic ? 'واتساب' : 'WhatsApp'}
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: '1px solid var(--card-border)',
          paddingTop: '1.25rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--text-faint)',
            marginBottom: '0.5rem',
          }}
        >
          {isArabic
            ? 'شركة بريمييرا لايف | سجل تجاري 7054807941'
            : 'Premiera Live Company | CR 7054807941'}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--text-faint)',
            marginBottom: '1rem',
          }}
        >
          {isArabic
            ? 'كورنيش 5، حي الكورنيش، ص.ب. 34414، الخبر، المملكة العربية السعودية'
            : 'Corniche 5, Al Kurniash Dist, PO Box 34414, Al Khobar, Kingdom of Saudi Arabia'}
        </p>
        <div
          style={{
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
              margin: 0,
            }}
          >
            &copy; 2026 Premiera Live
          </p>
          <Link
            href={localeSwitchHref}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: 'var(--text-faint)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {locale === 'en' ? 'عربي' : 'English'}
          </Link>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
