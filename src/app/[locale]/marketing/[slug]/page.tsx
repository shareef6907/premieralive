import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import { getMarketingService, getRelatedServices, MARKETING_SLUGS } from '@/config/marketingServices'
import { MEDIA_BASE } from '@/config/media'
import type { MarketingTier } from '@/config/marketingServices'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'
import TierCard from '@/components/TierCard'
import { CheckCircle2 } from 'lucide-react'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return MARKETING_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const service = getMarketingService(slug)
  if (!service) return {}
  const isArabic = locale === 'ar'
  return {
    title: isArabic ? service.metaTitleAr : service.metaTitleEn,
    description: isArabic ? service.metaDescAr : service.metaDescEn,
  }
}

// ─── Shared sub-components ───────────────────────────────────────────────────

function HeroP({ text, label }: { text: string; label: string }) {
  return (
    <Section>
      <div style={{ maxWidth: '80rem', marginInline: 'auto', textAlign: 'center', paddingBlock: '4rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          {label}
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-text)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
          {text}
        </h1>
      </div>
    </Section>
  )
}

// ─── Hero image mapping ────────────────────────────────────────────────────────
const MARKETING_HERO_IMAGES: Record<string, string> = {
  'social-media-management-saudi': `${MEDIA_BASE}/marketing/socialmediamanagement.jpg`,
  'google-ads-saudi':            `${MEDIA_BASE}/marketing/googleads.jpg`,
  'facebook-instagram-ads-saudi':`${MEDIA_BASE}/marketing/facebookinstagramads.jpg`,
  'snapchat-tiktok-ads-saudi':   `${MEDIA_BASE}/marketing/snapchattiktokads.jpg`,
  'seo-saudi':                   `${MEDIA_BASE}/marketing/seo.jpg`,
  'content-production-saudi':     `${MEDIA_BASE}/marketing/contentproduction.jpg`,
  'marketing-packages-saudi':     `${MEDIA_BASE}/marketing/marketingpackages.jpg`,
}

function PageHeroSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const heroText = isArabic
    ? (service as { packagesHeroAr?: string }).packagesHeroAr ?? service.heroAr
    : (service as { packagesHeroEn?: string }).packagesHeroEn ?? service.heroEn
  const ctaText = isArabic ? service.ctaAr : service.ctaEn
  const heroImgSrc = MARKETING_HERO_IMAGES[service.slug]
  return (
    <Section>
      {heroImgSrc && (
        <div style={{ position: 'relative', width: '100%', height: 'clamp(280px, 40vw, 520px)', marginBottom: '2.5rem', borderRadius: '12px', overflow: 'hidden' }}>
          <Image
            src={heroImgSrc}
            alt={isArabic ? service.titleAr : service.titleEn}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{ maxWidth: '80rem', marginInline: 'auto', textAlign: 'center', paddingBlock: heroImgSrc ? '0 2rem' : '4rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          PREMIERA LIVE
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-text)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
          {isArabic ? service.titleAr : service.titleEn}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.7, maxWidth: '600px', marginInline: 'auto' }}>
          {heroText}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'var(--color-gold)', color: '#0A0A0B', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.08em', fontWeight: 700, borderRadius: '100px', textDecoration: 'none' }}>
            {ctaText}
          </a>
        </div>
      </div>
    </Section>
  )
}

function WhySection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const text = isArabic ? service.whyAr : service.whyEn
  const eyebrow = isArabic ? service.whyHeadingAr : service.whyHeadingEn
  if (!text && !eyebrow) return null
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        {eyebrow && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{eyebrow}</p>
        )}
        {paragraphs.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: '1rem' }}>{para}</p>
        ))}
      </div>
    </Section>
  )
}

function DeliverablesSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const items = isArabic ? service.deliverablesAr : service.deliverablesEn
  const eyebrow = isArabic ? service.deliverablesHeadingAr : service.deliverablesHeadingEn
  if (!items?.length && !eyebrow) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        {eyebrow && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{eyebrow}</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} strokeWidth={1.5} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '3px' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function ProcessSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const steps = isArabic ? service.processStepsAr : service.processStepsEn
  if (!steps?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{isArabic ? 'كيف نعمل' : 'HOW WE WORK'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--color-gold)', background: 'rgba(201,162,75,0.1)', border: '1px solid rgba(201,162,75,0.25)', borderRadius: '9999px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', letterSpacing: '0.08em', color: 'var(--color-text)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>{step.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.55)', lineHeight: 1.65 }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function IndustriesSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const text = isArabic ? service.industriesAr : service.industriesEn
  const eyebrow = isArabic ? service.industriesHeadingAr : service.industriesHeadingEn
  if (!text && !eyebrow) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
        {eyebrow && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{eyebrow}</p>
        )}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.7 }}>{text}</p>
      </div>
    </Section>
  )
}

function WhyPremieraSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const text = isArabic ? service.whyPremieraAr : service.whyPremieraEn
  const eyebrow = isArabic ? service.whyPremieraHeadingAr : service.whyPremieraHeadingEn
  if (!text && !eyebrow) return null
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        {eyebrow && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{eyebrow}</p>
        )}
        {paragraphs.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.7, marginBottom: '1rem' }}>{para}</p>
        ))}
      </div>
    </Section>
  )
}

function ComplianceSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const text = isArabic ? service.complianceAr : service.complianceEn
  const eyebrow = isArabic ? service.complianceHeadingAr : service.complianceHeadingEn
  if (!text && !eyebrow) return null
  return (
    <Section>
      <div style={{ background: 'rgba(201,162,75,0.05)', border: '1px solid rgba(201,162,75,0.15)', borderLeft: '3px solid var(--color-gold)', borderRadius: '8px', padding: '2rem', maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--eyebrow)', letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>{eyebrow}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.8 }}>{text}</p>
      </div>
    </Section>
  )
}

function FAQSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const faqs = isArabic ? service.faqsAr : service.faqsEn
  if (!faqs?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '3rem', textAlign: 'center' }}>FAQ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{faq.q}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--color-text-dim)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function RelatedSection({ slugs, locale, isArabic }: { slugs: string[]; locale: string; isArabic: boolean }) {
  if (!slugs?.length) return null
  const related = getRelatedServices(slugs)
  if (!related.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>RELATED SERVICES</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {related.map((s) => (
            <a key={s.slug} href={`/${locale}/marketing/${s.slug}`} style={{ display: 'inline-block', padding: '0.5rem 1.25rem', background: '#16161B', border: '1px solid rgba(201,162,75,0.2)', borderRadius: '100px', fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.7)', textDecoration: 'none' }}>
              {isArabic ? s.titleAr : s.titleEn}
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Packages page sections ──────────────────────────────────────────────────

function PackagesHeroSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const heroText = isArabic
    ? (service as { packagesHeroAr?: string }).packagesHeroAr ?? service.heroAr
    : (service as { packagesHeroEn?: string }).packagesHeroEn ?? service.heroEn
  const ctaText = isArabic ? service.ctaAr : service.ctaEn
  return (
    <Section>
      <div style={{ maxWidth: '80rem', marginInline: 'auto', textAlign: 'center', paddingBlock: '4rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          PREMIERA LIVE
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-text)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
          {isArabic ? service.titleAr : service.titleEn}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'var(--color-text-dim)', lineHeight: 1.7, maxWidth: '600px', marginInline: 'auto' }}>
          {heroText}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'var(--color-gold)', color: '#0A0A0B', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.08em', fontWeight: 700, borderRadius: '100px', textDecoration: 'none' }}>
            {ctaText}
          </a>
        </div>
      </div>
    </Section>
  )
}

function PackagesTiersSection({ tiers, isArabic }: { tiers: MarketingTier[]; isArabic: boolean }) {
  if (!tiers?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '1000px', marginInline: 'auto' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch', flexWrap: 'wrap', justifyContent: 'center' }}>
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} isArabic={isArabic} />
          ))}
        </div>
      </div>
    </Section>
  )
}

// website dev items are shaped: { heading?: string; paragraph?: string; subHeading?: string; items?: string[]; subItems?: string[] }
type WebsiteDevItem = { heading?: string; paragraph?: string; subHeading?: string; items?: string[]; subItems?: string[] }

function WebsiteDevSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const heading = isArabic ? service.websiteDevAr : service.websiteDevEn
  const rawItems = isArabic ? service.websiteDevItemsAr : service.websiteDevItemsEn
  if (!heading && !rawItems?.length) return null
  const items: WebsiteDevItem[] = rawItems ?? []
  return (
    <Section>
      <div style={{ maxWidth: '640px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{isArabic ? 'تطوير المواقع' : 'WEBSITE DEVELOPMENT'}</p>

        {items.map((item, i) => (
          <div key={i} style={{ marginBottom: '1.25rem' }}>
            {item.heading && (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)', color: 'var(--color-text)', marginBottom: '0.5rem', fontWeight: 600 }}>{item.heading}</p>
            )}
            {item.paragraph && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{item.paragraph}</p>
            )}
            {item.items?.length && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: item.subItems?.length ? '0.5rem' : 0 }}>
                {item.items.map((t, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={15} strokeWidth={1.5} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.6 }}>{t}</p>
                  </div>
                ))}
              </div>
            )}
            {item.subHeading && (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)', color: 'var(--color-text)', marginBottom: '0.5rem', fontWeight: 600, marginTop: '0.75rem' }}>{item.subHeading}</p>
            )}
            {item.subItems?.length && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {item.subItems.map((t, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={15} strokeWidth={1.5} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.6 }}>{t}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

// website care items: { heading?: string; paragraph?: string; items?: string[] }
type WebsiteCareItem = { heading?: string; paragraph?: string; items?: string[] }

function WebsiteCareSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const heading = isArabic ? service.websiteCareAr : service.websiteCareEn
  const rawItems = isArabic ? service.websiteCareItemsAr : service.websiteCareItemsEn
  if (!heading && !rawItems?.length) return null
  const items: WebsiteCareItem[] = rawItems ?? []
  return (
    <Section>
      <div style={{ maxWidth: '640px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>{isArabic ? 'العناية المستمرة بالموقع' : 'ONGOING WEBSITE CARE'}</p>

        {items.map((item, i) => (
          <div key={i} style={{ marginBottom: '1.25rem' }}>
            {item.heading && (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)', color: 'var(--color-text)', marginBottom: '0.5rem', fontWeight: 600 }}>{item.heading}</p>
            )}
            {item.paragraph && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{item.paragraph}</p>
            )}
            {item.items?.length && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {item.items.map((t, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={15} strokeWidth={1.5} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.6 }}>{t}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

function ScaleBenefitsSection({ items, isArabic }: { items: string[]; isArabic: boolean }) {
  if (!items?.length) return null
  return (
    <Section>
      <div style={{ background: 'rgba(201,162,75,0.05)', border: '1px solid rgba(201,162,75,0.15)', borderRadius: '8px', padding: '2rem', maxWidth: '640px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>{isArabic ? 'مزايا عملاء الريادة' : 'Premium Benefits for Scale Clients'}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={15} strokeWidth={1.5} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function PackagesFAQLocalSection({ service, isArabic }: { service: NonNullable<ReturnType<typeof getMarketingService>>, isArabic: boolean }) {
  const faqs = isArabic ? service.packagesFaqsAr : service.packagesFaqsEn
  if (!faqs?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '3rem', textAlign: 'center' }}>FAQ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{faq.q}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'var(--color-text-dim)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Contact anchor ─────────────────────────────────────────────────────────

function ContactAnchor() {
  return <div id="contact" style={{ scrollMarginTop: '80px' }} />
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function MarketingSlugPage({ params }: Props) {
  const { locale, slug } = await params
  const service = getMarketingService(slug)
  if (!service) notFound()

  const isArabic = locale === 'ar'
  const isPackages = service.slug === 'marketing-packages-saudi'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.titleEn,
    description: service.descEn,
    provider: { '@type': 'Organization', name: 'Premiera Live' },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
  }

  const faqs = isPackages
    ? (isArabic ? service.packagesFaqsAr : service.packagesFaqsEn) ?? []
    : (isArabic ? service.faqsAr : service.faqsEn) ?? []
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {isPackages ? (
        <>
          <PackagesHeroSection service={service} isArabic={isArabic} />
          <PackagesTiersSection tiers={service.packagesTiers ?? []} isArabic={isArabic} />
          <WebsiteDevSection service={service} isArabic={isArabic} />
          <WebsiteCareSection service={service} isArabic={isArabic} />
          <ScaleBenefitsSection items={isArabic ? (service.scaleBenefitsAr ?? []) : (service.scaleBenefitsEn ?? [])} isArabic={isArabic} />
          <PackagesFAQLocalSection service={service} isArabic={isArabic} />
          <RelatedSection slugs={service.relatedSlugs} locale={locale} isArabic={isArabic} />
        </>
      ) : (
        <>
          <PageHeroSection service={service} isArabic={isArabic} />
          <WhySection service={service} isArabic={isArabic} />
          <DeliverablesSection service={service} isArabic={isArabic} />
          <ProcessSection service={service} isArabic={isArabic} />
          <IndustriesSection service={service} isArabic={isArabic} />
          <WhyPremieraSection service={service} isArabic={isArabic} />
          <ComplianceSection service={service} isArabic={isArabic} />
          <FAQSection service={service} isArabic={isArabic} />
          <RelatedSection slugs={service.relatedSlugs} locale={locale} isArabic={isArabic} />
        </>
      )}

      <ContactAnchor />
      <ContactActions />
    </>
  )
}
