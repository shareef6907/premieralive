import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getMarketingService, getRelatedServices, MARKETING_SLUGS } from '@/config/marketingServices'
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
      <div style={{ maxWidth: '720px', marginInline: 'auto', textAlign: 'center', paddingBlock: '4rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          {label}
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {text}
        </h1>
      </div>
    </Section>
  )
}

function PageHeroSection({ service }: { service: NonNullable<ReturnType<typeof getMarketingService>> }) {
  const isArabic = false
  const heroText = (service as { packagesHeroEn?: string }).packagesHeroEn ?? service.heroEn
  return (
    <Section>
      <div style={{ maxWidth: '720px', marginInline: 'auto', textAlign: 'center', paddingBlock: '4rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          PREMIERA LIVE
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {isArabic ? service.titleAr : service.titleEn}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)', color: 'rgba(245,244,240,0.65)', lineHeight: 1.7, maxWidth: '640px', marginInline: 'auto' }}>
          {heroText}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'var(--color-gold)', color: '#0A0A0B', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.08em', fontWeight: 700, borderRadius: '100px', textDecoration: 'none' }}>
            Call to Discuss
          </a>
        </div>
      </div>
    </Section>
  )
}

function WhySection({ text }: { text: string }) {
  if (!text) return null
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>WHY THIS MATTERS</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', color: 'var(--color-text)', marginBottom: '1.5rem', lineHeight: 1.15 }}>Why it works</h2>
        {paragraphs.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.65)', lineHeight: 1.8, marginBottom: '1rem' }}>{para}</p>
        ))}
      </div>
    </Section>
  )
}

function DeliverablesSection({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>WHAT WE DELIVER</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', color: 'var(--color-text)', marginBottom: '2rem', lineHeight: 1.15 }}>What you get</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
              <CheckCircle2 size={18} strokeWidth={1.5} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '3px' }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.7)', lineHeight: 1.65 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function ProcessSection({ steps }: { steps: { label: string; text: string }[] }) {
  if (!steps?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>HOW WE WORK</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', color: 'var(--color-text)', marginBottom: '2rem', lineHeight: 1.15 }}>The process</h2>
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

function IndustriesSection({ text }: { text: string }) {
  if (!text) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>INDUSTRIES WE SERVE</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.8 }}>{text}</p>
      </div>
    </Section>
  )
}

function WhyPremieraSection({ text }: { text: string }) {
  if (!text) return null
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>WHY PREMIERA LIVE</p>
        {paragraphs.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.65)', lineHeight: 1.8, marginBottom: '1rem' }}>{para}</p>
        ))}
      </div>
    </Section>
  )
}

function ComplianceSection({ text }: { text: string }) {
  if (!text) return null
  return (
    <Section>
      <div style={{ background: 'rgba(201,162,75,0.05)', border: '1px solid rgba(201,162,75,0.15)', borderRadius: '8px', padding: '2rem', maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>Compliance-First</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.75 }}>{text}</p>
      </div>
    </Section>
  )
}

function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem', textAlign: 'center' }}>FAQ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', color: 'var(--color-text)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{faq.q}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.55)', lineHeight: 1.75 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function RelatedSection({ slugs, locale }: { slugs: string[]; locale: string }) {
  if (!slugs?.length) return null
  const related = getRelatedServices(slugs)
  if (!related.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>RELATED SERVICES</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {related.map((s) => (
            <a key={s.slug} href={`/${locale}/marketing/${s.slug}`} style={{ display: 'inline-block', padding: '0.5rem 1.25rem', background: '#16161B', border: '1px solid rgba(201,162,75,0.2)', borderRadius: '100px', fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.7)', textDecoration: 'none' }}>
              {s.titleEn}
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Packages page sections ──────────────────────────────────────────────────

function PackagesHeroSection({ service }: { service: NonNullable<ReturnType<typeof getMarketingService>> }) {
  const isArabic = false
  const heroText = (service as { packagesHeroEn?: string }).packagesHeroEn ?? service.heroEn
  return (
    <Section>
      <div style={{ maxWidth: '720px', marginInline: 'auto', textAlign: 'center', paddingBlock: '4rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
          PREMIERA LIVE
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--color-text)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
          {isArabic ? service.titleAr : service.titleEn}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)', color: 'rgba(245,244,240,0.65)', lineHeight: 1.7, maxWidth: '640px', marginInline: 'auto' }}>
          {heroText}
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', background: 'var(--color-gold)', color: '#0A0A0B', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.08em', fontWeight: 700, borderRadius: '100px', textDecoration: 'none' }}>
            Call to Discuss
          </a>
        </div>
      </div>
    </Section>
  )
}

function PackagesTiersSection({ tiers }: { tiers: MarketingTier[] }) {
  if (!tiers?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '1000px', marginInline: 'auto' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch', flexWrap: 'wrap', justifyContent: 'center' }}>
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function WebsiteDevSection({ service }: { service: NonNullable<ReturnType<typeof getMarketingService>> }) {
  if (!service.websiteDevEn) return null
  return (
    <Section>
      <div style={{ maxWidth: '640px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>WEBSITE DEVELOPMENT</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{service.websiteDevEn}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {(service.websiteDevItemsEn ?? []).map((item, i) => (
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

function WebsiteCareSection({ service }: { service: NonNullable<ReturnType<typeof getMarketingService>> }) {
  if (!service.websiteCareEn) return null
  return (
    <Section>
      <div style={{ maxWidth: '640px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>ONGOING WEBSITE CARE</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body)', color: 'rgba(245,244,240,0.6)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{service.websiteCareEn}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {(service.websiteCareItemsEn ?? []).map((item, i) => (
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

function ScaleBenefitsSection({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <Section>
      <div style={{ background: 'rgba(201,162,75,0.05)', border: '1px solid rgba(201,162,75,0.15)', borderRadius: '8px', padding: '2rem', maxWidth: '640px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '1rem' }}>Premium Benefits for Scale Clients</p>
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

function PackagesFAQLocalSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs?.length) return null
  return (
    <Section>
      <div style={{ maxWidth: '680px', marginInline: 'auto' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--eyebrow)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem', textAlign: 'center' }}>FAQ</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {faqs.map((faq, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', color: 'var(--color-text)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{faq.q}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)', color: 'rgba(245,244,240,0.55)', lineHeight: 1.75 }}>{faq.a}</p>
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

  const isPackages = service.slug === 'marketing-packages-saudi'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.titleEn,
    description: service.descEn,
    provider: { '@type': 'Organization', name: 'Premiera Live' },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
  }

  const faqs = isPackages ? (service.packagesFaqsEn ?? []) : (service.faqsEn ?? [])
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
          <PackagesHeroSection service={service} />
          <PackagesTiersSection tiers={service.packagesTiers ?? []} />
          <WebsiteDevSection service={service} />
          <WebsiteCareSection service={service} />
          <ScaleBenefitsSection items={service.scaleBenefitsEn ?? []} />
          <PackagesFAQLocalSection faqs={service.packagesFaqsEn ?? []} />
          <RelatedSection slugs={service.relatedSlugs} locale={locale} />
        </>
      ) : (
        <>
          <PageHeroSection service={service} />
          <WhySection text={service.whyEn} />
          <DeliverablesSection items={service.deliverablesEn} />
          <ProcessSection steps={service.processStepsEn} />
          <IndustriesSection text={service.industriesEn} />
          <WhyPremieraSection text={service.whyPremieraEn} />
          <ComplianceSection text={service.complianceEn} />
          <FAQSection faqs={service.faqsEn} />
          <RelatedSection slugs={service.relatedSlugs} locale={locale} />
        </>
      )}

      <ContactAnchor />
      <ContactActions />
    </>
  )
}
