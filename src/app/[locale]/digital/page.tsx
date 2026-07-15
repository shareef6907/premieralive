import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import PlatformCard from '@/components/PlatformCard'

export const metadata: Metadata = {
  title: 'Digital Platforms | Premiera Live',
  description: 'Real software we built and operate — platforms that run businesses across the Gulf.',
  alternates: {
    canonical: 'https://www.premieralive.com/en/digital',
    languages: {
      en: 'https://www.premieralive.com/en/digital',
      ar: 'https://www.premieralive.com/ar/digital',
    },
  },
}

// 10 platforms we built and operate
// Image keys and description copy come from Shareef in a future PR
const PLATFORMS = [
  {
    id: 'film-production-bahrain',
    name: 'FilmProductionBahrain.com',
    url: 'https://filmproductionbahrain.com',
    imageKey: 'platform-film-production-bahrain',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'bahrain-nights',
    name: 'BahrainNights.com',
    url: 'https://bahrainnights.com',
    imageKey: 'platform-bahrain-nights',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'events-bahrain',
    name: 'EventsBahrain.com',
    url: 'https://eventsbahrain.com',
    imageKey: 'platform-events-bahrain',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'student-photos',
    name: 'StudentPhotos.com',
    url: 'https://studentphotos.com',
    imageKey: 'platform-student-photos',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'podcast-bahrain',
    name: 'PodcastBahrain.com',
    url: 'https://podcastbahrain.com',
    imageKey: 'platform-podcast-bahrain',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'videography-bahrain',
    name: 'VideographyBahrain.com',
    url: 'https://videographybahrain.com',
    imageKey: 'platform-videography-bahrain',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'bangalore-life',
    name: 'BangaloreLife.com',
    url: 'https://bangalorelife.com',
    imageKey: 'platform-bangalore-life',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'cinematic-web-works',
    name: 'CinematicWebWorks.com',
    url: 'https://cinematicwebworks.com',
    imageKey: 'platform-cinematic-web-works',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'thursday-football',
    name: 'ThursdayFootball.com',
    url: 'https://thursdayfootball.com',
    imageKey: 'platform-thursday-football',
    description: 'TODO: copy from Shareef',
  },
  {
    id: 'property-coorg',
    name: 'PropertyCoorg.com',
    url: 'https://propertycoorg.com',
    imageKey: 'platform-property-coorg',
    description: 'TODO: copy from Shareef',
  },
]

export default async function DigitalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: urlLocale } = await params
  setRequestLocale(urlLocale)
  const isArabic = urlLocale === 'ar'

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500000000'
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(
    isArabic ? 'أرغب في مناقشة خدمات رقمية.' : 'Hi, I\'d like to discuss your digital services.'
  )}&type=phone_number&app_absent=0`

  return (
    <>
      {/* Breadcrumb */}
      <div style={{
        maxWidth: '80rem', margin: '0 auto',
        padding: '5rem clamp(1.25rem, 5vw, 4rem) 1.25rem',
        display: 'flex', gap: '0.5rem', alignItems: 'center',
        fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
        color: 'var(--color-text-faint)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}>
        <Link href={`/${urlLocale}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {isArabic ? 'الرئيسية' : 'Home'}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-dim)' }}>
          {isArabic ? 'رقمي' : 'Digital'}
        </span>
      </div>

      {/* Page header */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? 'التجارب الرقمية' : 'DIGITAL EXPERIENCES'}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: 'var(--color-text)', lineHeight: 1.0,
          letterSpacing: '0.01em', marginBottom: '1.5rem',
        }}>
          {isArabic ? 'من المنصات التي بنيناها' : 'Some of the Platforms we Built'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.7,
          maxWidth: '520px', margin: '0 auto',
        }}>
          {isArabic
            ? 'برمجيات حقيقية، بنيناها ونشغّلها فريق بريميرا لايف — ليست تصاميمAgency.'
            : 'Real software, built and operated by Premiera Live — not agency mockups.'}
        </p>
      </section>

      {/* Platform cards */}
      <section style={{
        padding: '0 clamp(1.25rem, 5vw, 4rem) clamp(6rem, 10vw, 10rem)',
        maxWidth: '80rem', margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {PLATFORMS.map((platform) => (
            <PlatformCard
              key={platform.id}
              href={platform.url}
              imageSlot={
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-sm)',
                  color: 'var(--color-text-faint)',
                  letterSpacing: '0.05em',
                }}>
                  IMAGE: {platform.imageKey}
                </span>
              }
              name={platform.name}
              description={platform.description}
              linkLabel={isArabic ? 'زيارة المنصة ←' : 'Visit Platform →'}
              isArabic={isArabic}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        background: 'var(--color-bg-elevated)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-text)', lineHeight: 1.0,
            letterSpacing: '0.01em', marginBottom: '2rem',
          }}>
            {isArabic ? 'هل تريد منصة مثل هذه؟' : 'READY TO BUILD YOUR PLATFORM?'}
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.875rem 2rem',
              background: 'var(--color-gold)', color: '#0A0A0B',
              fontFamily: 'var(--font-display)', fontSize: '0.8rem',
              letterSpacing: '0.1em', textDecoration: 'none',
              borderRadius: '9999px', fontWeight: 700,
            }}
          >
            {isArabic ? 'احجز جلسة استراتيجية' : 'BOOK A STRATEGY SESSION'}
          </a>
        </div>
      </section>
    </>
  )
}
