import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTranslations, getLocale } from 'next-intl/server'
import RelatedServiceLink from '@/components/RelatedServiceLink'
import Link from 'next/link'
import { SERVICES_BY_SLUG, ALL_SLUGS } from '@/config/services'
import type { ServiceSlug } from '@/config/services'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const slug of ALL_SLUGS) {
    params.push({ locale: 'en', slug })
    params.push({ locale: 'ar', slug })
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const service = SERVICES_BY_SLUG[slug as ServiceSlug]
  if (!service) return {}

  const isArabic = locale === 'ar'
  const name = isArabic ? service.nameAr : service.nameEn
  const domain = 'https://www.premieralive.com'
  const canonical = `${domain}/${locale}/services/${slug}`

  return {
    title: `${name} | Premiera Live`,
    description: isArabic
      ? service.valuePropAr
      : service.valuePropEn,
    alternates: {
      canonical,
      languages: {
        en: `${domain}/en/services/${slug}`,
        ar: `${domain}/ar/services/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Premiera Live`,
      description: isArabic ? service.valuePropAr : service.valuePropEn,
      images: [{ url: service.heroImage, width: 1200, height: 630 }],
      locale: locale === 'ar' ? 'ar-SA' : 'en-US',
      alternateLocale: locale === 'ar' ? 'en-US' : 'ar-SA',
    },
  }
}

// Breadcrumb JSON-LD
function BreadcrumbJsonLd({ locale, slug, name }: { locale: string; slug: string; name: string }) {
  const domain = 'https://www.premieralive.com'
  const items = [
    { '@type': 'ListItem', name: 'Home', url: `${domain}/${locale}` },
    { '@type': 'ListItem', name: 'Services', url: `${domain}/${locale}/services` },
    { '@type': 'ListItem', name, url: `${domain}/${locale}/services/${slug}` },
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service JSON-LD
function ServiceJsonLd({ locale, slug, name }: { locale: string; slug: string; name: string }) {
  const domain = 'https://www.premieralive.com'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: {
      '@type': 'Organization',
      name: 'Premiera Live',
      url: domain,
    },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    url: `${domain}/${locale}/services/${slug}`,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params
  const isArabic = locale === 'ar'

  const service = SERVICES_BY_SLUG[slug as ServiceSlug]
  if (!service) notFound()

  const name = isArabic ? service.nameAr : service.nameEn
  const valueProp = isArabic ? service.valuePropAr : service.valuePropEn
  const whatWeDeliver = isArabic ? service.whatWeDeliverAr : service.whatWeDeliverEn
  const howWeWork = isArabic ? service.howWeWorkAr : service.howWeWorkEn
  const whereWeWork = isArabic ? service.whereWeWorkAr : service.whereWeWorkEn
  const faq = isArabic ? service.faqAr : service.faqEn
  const ctaMessage = isArabic ? service.ctaMessageAr : service.ctaMessageEn

  const domain = 'https://www.premieralive.com'
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500000000'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(ctaMessage)}`

  // Related service pages
  const related = service.relatedSlugs
    .map((rs) => SERVICES_BY_SLUG[rs])
    .filter(Boolean)
    .slice(0, 4)

  const breadcrumbLabel = isArabic ? 'الرئيسية' : 'Home'
  const servicesLabel = isArabic ? 'الخدمات' : 'Services'

  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug={slug} name={name} />
      <ServiceJsonLd locale={locale} slug={slug} name={name} />

      {/* ── Breadcrumb ── */}
      <div style={{
        maxWidth: '80rem', margin: '0 auto',
        padding: '1.25rem clamp(1.25rem, 5vw, 4rem)',
        display: 'flex', gap: '0.5rem', alignItems: 'center',
        fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
        color: 'var(--color-text-faint)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}>
        <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>{breadcrumbLabel}</Link>
        <span>/</span>
        <Link href={`/${locale}/services`} style={{ color: 'inherit', textDecoration: 'none' }}>{servicesLabel}</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-dim)' }}>{name}</span>
      </div>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', minHeight: '65vh',
        display: 'flex', alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${service.heroImage})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}>
          {/* Fallback gradient if image missing */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.3) 60%, rgba(10,10,11,0.5) 100%)',
          }} />
        </div>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.2) 50%, rgba(10,10,11,0.5) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: '80rem', width: '100%', margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '1rem',
          }}>
            {isArabic ? 'الإنتاج السينمائي' : 'CINEMATIC PRODUCTION'}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: 'var(--color-text)', lineHeight: 1.0,
            letterSpacing: '0.01em', marginBottom: '1.5rem',
            maxWidth: '800px',
          }}>
            {name}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
            color: 'var(--color-text-dim)', lineHeight: 1.7,
            maxWidth: '600px',
          }}>
            {valueProp}
          </p>
        </div>
      </section>

      {/* ── What We Deliver ── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2rem',
        }}>
          {isArabic ? 'ما نقدّمه' : 'WHAT WE DELIVER'}
        </p>
        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {whatWeDeliver.map((item, i) => (
            <li key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
              color: 'var(--color-text-dim)', lineHeight: 1.6,
              padding: '1rem 1.25rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            }}>
              <span style={{
                color: 'var(--color-gold)', fontWeight: 600,
                flexShrink: 0, marginTop: '0.1em',
              }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── How We Work ── */}
      <section style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '3rem',
          }}>
            {isArabic ? 'كيف نعمل على هذه الخدمة' : 'HOW WE WORK'}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {howWeWork.map((step, i) => (
              <div key={i} style={{
                padding: '1.5rem',
                background: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600,
                  fontSize: '0.875rem', color: 'var(--color-gold)',
                  marginBottom: '0.5rem', letterSpacing: '0.05em',
                }}>
                  {String(i + 1).padStart(2, '0')} — {step.step}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                  color: 'var(--color-text-dim)', lineHeight: 1.6,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where We Work ── */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1rem',
        }}>
          {isArabic ? 'أين نعمل' : 'WHERE WE WORK'}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '720px',
        }}>
          {whereWeWork}
        </p>
      </section>

      {/* ── FAQ ── */}
      {faq.length > 0 && (
        <section style={{
          background: 'var(--color-bg-elevated)',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-gold)',
              marginBottom: '3rem',
            }}>
              FAQ
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '720px' }}>
              {faq.map((item, i) => (
                <div key={i} style={{
                  padding: '1.5rem',
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: 'var(--radius)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontWeight: 600,
                    fontSize: 'var(--body)', color: 'var(--color-text)',
                    marginBottom: '0.75rem',
                  }}>
                    {item.q}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                    color: 'var(--color-text-dim)', lineHeight: 1.7,
                  }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 4rem)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: 'var(--color-text)', lineHeight: 1.0,
          letterSpacing: '0.01em', marginBottom: '2.5rem',
        }}>
          {isArabic ? 'هل أنت مستعد للبدء؟' : 'READY TO GET STARTED?'}
        </h2>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.875rem 2rem',
            background: 'var(--color-gold)', color: '#0A0A0B',
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: 'var(--body)', textDecoration: 'none',
            borderRadius: '9999px',
            transition: 'opacity 0.2s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {isArabic ? 'تواصل عبر واتساب' : 'Start on WhatsApp'}
        </a>
      </section>

      {/* ── More Services ── */}
      {related.length > 0 && (
        <section style={{
          background: 'var(--color-bg-elevated)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
        }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-gold)',
              marginBottom: '2rem',
            }}>
              {isArabic ? 'المزيد من خدماتنا' : 'MORE SERVICES'}
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '1rem',
            }}>
              {related.map((rel) => {
                const relName = isArabic ? rel.nameAr : rel.nameEn
                const relHref = `/${locale}/services/${rel.slug}`
                return (
                  <RelatedServiceLink key={rel.slug} href={relHref}>
                    {relName}
                  </RelatedServiceLink>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
