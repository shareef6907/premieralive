import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import PlatformCard from '@/components/PlatformCard'
import { MEDIA_BASE } from '@/config/media'
import ContactActions from '@/components/ContactActions'

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

// 8 platforms — copy from Shareef verbatim
const PLATFORMS = [
  {
    id: 'film-production-bahrain',
    nameEn: 'FilmProductionBahrain.com',
    nameAr: 'FilmProductionBahrain.com',
    url: 'https://filmproductionbahrain.com',
    imageKey: 'filmproductionbahrain.com',
    descEn: 'Film production portfolio and enquiry platform — designed, built, and maintained in-house.',
    descAr: 'نعرض أعمال الإنتاج السينمائي ونستقبل الطلبات عبر منصة بنيناها بالكامل.',
  },
  {
    id: 'bahrain-nights',
    nameEn: 'BahrainNights.com',
    nameAr: 'BahrainNights.com',
    url: 'https://bahrainnights.com',
    imageKey: 'bahrainnights.com',
    descEn: 'Venue and event discovery for Bahrain — thousands of listings, automated event ingestion, newsletters, and partner booking. Built and operated by us.',
    descAr: 'نشغّل منصة اكتشاف الأماكن والفعاليات في البحرين — آلاف القوائم، وإدخال آلي للفعاليات، ونشرة بريدية، وحجز عبر الشركاء.',
  },
  {
    id: 'events-bahrain',
    nameEn: 'EventsBahrain.com',
    nameAr: 'EventsBahrain.com',
    url: 'https://eventsbahrain.com',
    imageKey: 'eventsbahrain.com',
    descEn: 'Event listings and discovery, running on the same platform infrastructure we build for clients.',
    descAr: 'ندرج فعاليات البحرين ونتيح اكتشافها على البنية نفسها التي نبنيها لعملائنا.',
  },
  {
    id: 'student-photos',
    nameEn: 'StudentPhotos.com',
    nameAr: 'StudentPhotos.com',
    url: 'https://studentphotos.com',
    imageKey: 'studentphotos.com',
    descEn: 'School photography sales platform — private galleries per student, online ordering, local payment gateway, and automated watermarking.',
    descAr: 'نبيع صور المدارس عبر منصة كاملة: معارض خاصة لكل طالب، وطلب إلكتروني، وبوابة دفع محلية، وعلامة مائية آلية.',
  },
  {
    id: 'podcast-bahrain',
    nameEn: 'PodcastBahrain.com',
    nameAr: 'PodcastBahrain.com',
    url: 'https://podcastbahrain.com',
    imageKey: 'podcastbahrain.com',
    descEn: 'Podcast production booking and showcase platform.',
    descAr: 'نتيح حجز إنتاج البودكاست وعرض الأعمال عبر منصة بنيناها.',
  },
  {
    id: 'videography-bahrain',
    nameEn: 'VideographyBahrain.com',
    nameAr: 'VideographyBahrain.com',
    url: 'https://videographybahrain.com',
    imageKey: 'videographybahrain.com',
    descEn: 'Videography portfolio and enquiry platform.',
    descAr: 'نعرض أعمال التصوير ونستقبل الطلبات عبر منصة مخصصة.',
  },
  {
    id: 'cinematic-web-works',
    nameEn: 'CinematicWebWorks.com',
    nameAr: 'CinematicWebWorks.com',
    url: 'https://cinematicwebworks.com',
    imageKey: 'cinematicwebworks.com',
    descEn: 'Our enterprise web development arm — the team behind the platforms on this page.',
    descAr: 'نطوّر أنظمة المؤسسات — وهذا الفريق نفسه بنى المنصات المعروضة هنا.',
  },
  {
    id: 'property-coorg',
    nameEn: 'PropertyCoorg.com',
    nameAr: 'PropertyCoorg.com',
    url: 'https://propertycoorg.com',
    imageKey: 'propertycoorg.com',
    descEn: 'Property listings platform for the Coorg region in India.',
    descAr: 'ندرج العقارات في منطقة كورغ بالهند عبر منصة بنيناها.',
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
                <img
                  src={`${MEDIA_BASE}/Digital/${platform.imageKey}.png`}
                  alt={platform.nameEn}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                />
              }
              name={isArabic ? platform.nameAr : platform.nameEn}
              description={isArabic ? platform.descAr : platform.descEn}
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
          <ContactActions />
        </div>
      </section>
    </>
  )
}
