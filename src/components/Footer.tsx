'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import { SERVICES } from '@/config/services'
import { MARKETING_SLUGS, getServiceLabel } from '@/config/marketingServices'

// Cinematic services (first 8) — in display order
const CINEMATIC_SERVICES = SERVICES.slice(0, 8)

// Digital services (remaining 8) — in display order
const DIGITAL_SERVICES = SERVICES.slice(8)

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

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--card-border)',
        padding: '4rem clamp(1.5rem, 5vw, 4rem) 2rem',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      {/* ── Logo row ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_BASE || 'https://premiera-live-media.s3.us-east-1.amazonaws.com'}/premiera-live-white.png`}
          alt="Premiera Live"
          width={180}
          height={120}
          className="footer-logo-img"
          style={{ height: '120px', width: 'auto' }}
        />
      </div>

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
        {/* Col 1 — Filming */}
        <div>
          <Link
            href={`/${locale}/services`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--eyebrow)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              display: 'block',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
          >
            {isArabic ? 'الإنتاج السينمائي' : 'Filming'}
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CINEMATIC_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'rgba(245,244,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  lineHeight: 1.6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
              >
                {isArabic ? s.nameAr.replace(' في السعودية', '') : s.nameEn.replace(' in Saudi Arabia', '')}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2 — Digital */}
        <div>
          <Link
            href={`/${locale}/digital`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--eyebrow)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              display: 'block',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
          >
            {isArabic ? 'التجارب الرقمية' : 'Digital'}
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {DIGITAL_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'rgba(245,244,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  lineHeight: 1.6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
              >
                {isArabic ? s.nameAr.replace(' في السعودية', '') : s.nameEn.replace(' in Saudi Arabia', '')}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 — Marketing */}
        <div>
          <Link
            href={`/${locale}/marketing`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--eyebrow)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1rem',
              display: 'block',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
          >
            {isArabic ? 'خدمات التسويق' : 'Marketing'}
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(isArabic ? marketingLinksAr : marketingLinksEn).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'rgba(245,244,240,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  lineHeight: 1.6,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,244,240,0.55)')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
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
        {/* Company info — two lines */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--text-faint)',
            marginBottom: '0.25rem',
          }}
        >
          {isArabic ? 'شركة بريمييرا لايف' : 'Premiera Live Company'} | {isArabic ? 'سجل تجاري' : 'CR'}: 7054807941
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--text-faint)',
            marginBottom: '1rem',
            lineHeight: 1.6,
          }}
        >
          {isArabic
            ? 'سبيسز أجدان ووك، كورنيش 5، ص.ب. 34414، الخبر، المملكة العربية السعودية'
            : 'Spaces Ajdan Walk, Corniche 5, PO Box 34414, Al Khobar, Kingdom of Saudi Arabia'}
        </p>

        {/* Copyright + language toggle */}
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
        @media (max-width: 767px) {
          .footer-logo-img { height: 96px !important; }
        }
      `}</style>
    </footer>
  )
}
