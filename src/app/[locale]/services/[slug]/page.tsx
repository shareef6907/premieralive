import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollToTop from '@/components/ScrollToTop'
import RelatedServiceLink from '@/components/RelatedServiceLink'
import ContactActions from '@/components/ContactActions'
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
        'en-SA': `${domain}/en/services/${slug}`,
        'ar-SA': `${domain}/ar/services/${slug}`,
        'x-default': `${domain}/en/services/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Premiera Live`,
      description: isArabic ? service.valuePropAr : service.valuePropEn,
      url: canonical,
      images: [{ url: service.heroImage, width: 1200, height: 630 }],
      locale: locale === 'ar' ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | Premiera Live`,
      description: isArabic ? service.valuePropAr : service.valuePropEn,
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
  const showCustomCode = [
    'business-website-development-saudi-arabia',
    'app-development-saudi-arabia',
    'booking-system-development-saudi-arabia',
    'business-platform-development-saudi-arabia',
    'client-portal-development-saudi-arabia',
  ].includes(slug)

  const customCodeEN = 'Built from scratch for bulletproof security. Unlike cookie-cutter platforms and template builders, we write clean, custom code for every project. We develop everything ourselves — no WordPress, no page builders, no third-party platforms — so there is no limit on what we can build. And by eliminating heavy plugins and bloated third-party software, we drastically shrink the surface area for cyber threats: your website stays fast, lightweight, and incredibly difficult for automated hacking bots to target.'
  const customCodeAR = 'نبني من الصفر لأمانٍ يصعب اختراقه. خلافاً للمنصات الجاهزة وقوالب البناء، نكتب شيفرة نظيفة مخصصة لكل مشروع، ونطوّر كل شيء بأنفسنا — بلا ووردبريس ولا أدوات بناء ولا منصات خارجية — فلا سقف لما نستطيع بناءه. وبإزالة الإضافات الثقيلة والبرمجيات المتضخمة نقلّص مساحة التعرض للتهديدات السيبرانية تقليصاً كبيراً: يبقى موقعك سريعاً وخفيفاً وعصيّاً على استهداف روبوتات الاختراق الآلية.'

  const related = service.relatedSlugs
    .map((rs: ServiceSlug) => SERVICES_BY_SLUG[rs])
    .filter(Boolean)
    .slice(0, 4)

  const breadcrumbLabel = isArabic ? 'الرئيسية' : 'Home'
  const servicesLabel = isArabic ? 'الخدمات' : 'Services'

  return (
    <>
      <BreadcrumbJsonLd locale={locale} slug={slug} name={name} />
      <ServiceJsonLd locale={locale} slug={slug} name={name} />

      <ScrollToTop />
      {/* ── Breadcrumb ── */}
      <div style={{
        maxWidth: '80rem', margin: '0 auto',
        padding: '5rem clamp(1.25rem, 5vw, 4rem) 1.25rem',
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
        {/* Optimised background image via Vercel Image CDN */}
        <Image
          src={service.heroImage}
          alt={name}
          fill
          priority
          quality={70}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
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

      {/* ── Custom Code Paragraph (website/software/platform/portal only) ── */}
      {showCustomCode && (
        <section style={{
          padding: '0 clamp(1.25rem, 5vw, 4rem) clamp(4rem, 8vw, 7rem)',
          maxWidth: '80rem', margin: '0 auto',
        }}>
          <div style={{
            padding: '1.5rem 2rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderLeft: '3px solid var(--color-gold)',
            borderRadius: 'var(--radius)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
              color: 'var(--color-text-dim)', lineHeight: 1.8,
            }}>
              {isArabic ? customCodeAR : customCodeEN}
            </p>
          </div>
        </section>
      )}

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
        <ContactActions />
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
