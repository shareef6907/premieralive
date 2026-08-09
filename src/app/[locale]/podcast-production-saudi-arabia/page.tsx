import HeroVideo from '@/components/HeroVideo'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'
import { MEDIA_BASE } from '@/config/media'

type Props = { params: Promise<{ locale: string }> }

const DOMAIN = 'https://www.premieralive.com'
const PATH_EN = 'podcast-production-saudi-arabia'
const PATH_AR = 'podcast-production-saudi-arabia'

// ----------------------------------------------------------------
// Metadata
// ----------------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH_EN}`

  return {
    title: isArabic
      ? 'إنتاج البودكاست في السعودية | بريمييرا لايف'
      : 'Podcast Production in Saudi Arabia | Premiera Live',
    description: isArabic
      ? 'ننتج البودكاست في السعودية — نصوّر بأربع كاميرات سوني 4K مع استوديو متنقل في موقعك. حلقات شهر كامل في يوم واحد، والتسليم خلال أسبوع.'
      : 'Podcast production in Saudi Arabia — we film on 4 x Sony 4K cameras, mobile studio at your location. A month of episodes filmed in a day, delivered in a week.',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${DOMAIN}/en/${PATH_EN}`,
        'ar-SA': `${DOMAIN}/ar/${PATH_AR}`,
        'x-default': `${DOMAIN}/en/${PATH_EN}`,
      },
    },
    openGraph: {
      title: isArabic
        ? 'إنتاج البودكاست في السعودية | بريمييرا لايف'
        : 'Podcast Production in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'ننتج البودكاست في السعودية — نصوّر بأربع كاميرات سوني 4K مع استوديو متنقل في موقعك. حلقات شهر كامل في يوم واحد، والتسليم خلال أسبوع.'
        : 'Podcast production in Saudi Arabia — we film on 4 x Sony 4K cameras, mobile studio at your location. A month of episodes filmed in a day, delivered in a week.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    robots: { index: true, follow: true },
  }
}

// ----------------------------------------------------------------
// Content
// ----------------------------------------------------------------
const EN = {
  eyebrow: 'PODCAST PRODUCTION',
  h1: 'Podcast Production in Saudi Arabia',
  displayLine: 'A month of episodes. One day of filming.',
  subline: 'We bring the studio to you — four Sony full-frame 4K cameras, studio audio, and lighting built into your space for the day. Edited episodes and social clips delivered within a week.',
  ctaWhatsApp: 'WhatsApp us',
  ctaCall: 'Call',
  ctaEmail: 'Email',

  problemHeading: 'Most corporate podcasts stop at episode 12.',
  problemBody: "Not because the guest was boring. Because nobody could watch it. One locked-off camera, room audio, ninety minutes with no moment worth sharing — and a season that ends before it starts.",

  clipsHeading: 'The episode isn\'t the product. The clips are.',
  clipsBody: 'One camera gives you one angle and a static talking head. Four cameras cover the reverse, the wide, and both singles — every reaction, every cutaway, every moment that actually travels. One shoot day becomes a month of content.',
  stat4Angles: '4',
  stat4Label: 'angles rolling on every second',
  stat1Day: '1',
  stat1Label: 'shoot day',
  stat7Days: '7',
  stat7Label: 'days to delivery',

  studioHeading: "You don't need a studio. We bring one.",
  studioBody: 'Meeting room, office, warehouse, majlis — we arrive early and build it out. Lighting, backdrop, acoustic treatment, four matched cameras, and a separate microphone channel for every speaker. By the time your guest walks in, the room is a studio.',
  studioSub: 'Four Sony full-frame 4K cameras, matched and graded as one package — cinematic depth, clean in any light.',

  shootHeading: 'First-time hosts want to know what the day actually looks like. Here it is.',
  shootTimes: [
    { time: '09:00', label: 'Crew arrives, load in' },
    { time: '11:00', label: 'Lighting and audio set, cameras matched' },
    { time: '12:00', label: 'Guests arrive, sound check' },
    { time: '13:00', label: 'Rolling' },
    { time: '16:00', label: 'Wrap. Full session handed over on a hard drive before we leave' },
    { time: '7 days', label: 'Edited episodes and social clips delivered' },
  ],

  setup1Title: 'Host and guest',
  setup1Body: 'Three cameras. A single on each speaker plus a wide holding both — cut clean, never a static frame.',
  setup2Title: 'Flagship show',
  setup2Body: 'Four cameras. Everything above plus a roaming angle for detail and reaction — built for a clip-first release.',
  setup3Title: 'Signature',
  setup3Body: 'Up to eight cameras. Panels, live audiences, and flagship shows where every reaction needs covering.',

  whereHeading: 'Filming across the Kingdom',
  whereBody: 'We produce podcasts in Riyadh, Jeddah, Al Khobar, Dammam, and Jubail, and travel across the Kingdom and the wider Gulf for flagship shows.',

  faq: [
    { q: 'Do we need our own studio?', a: 'No. We bring the lighting, audio, backdrop, and cameras and build a studio in your space for the day.' },
    { q: 'How many episodes can you film in one day?', a: 'Four, comfortably, with a guest changeover between each. That is a month of weekly episodes from a single shoot.' },
    { q: 'How many speakers can you record?', a: 'Four on the standard setup, each on their own microphone and channel. More on the Signature setup.' },
    { q: 'Do we get the raw footage?', a: 'Yes. The complete session goes onto a hard drive before we pack up.' },
    { q: 'Do you edit in Arabic?', a: 'Yes. Editing, subtitling, and clip cutting in Arabic and English.' },
    { q: 'How fast are the clips delivered?', a: 'Edited episodes and social clips within a week of the shoot.' },
    { q: 'Do you travel outside the Eastern Province?', a: 'Yes — Riyadh, Jeddah, and across the Kingdom.' },
    { q: 'Who owns the footage?', a: 'You do. Full rights to everything we shoot for you.' },
  ],

  contactHeading: "Let's talk.",
  contactSub: 'Ready to start your show, or still figuring it out — either way, we can help.',

  breadcrumbHome: 'Home',
  breadcrumbSelf: 'Podcast Production',

  // Internal links
  linkFilming: 'on-location podcast filming',
  linkMultiCam: 'multi-cam live streaming',
  linkEvent: 'event coverage',
}

const AR = {
  eyebrow: 'إنتاج بودكاست',
  h1: 'إنتاج البودكاست في السعودية',
  displayLine: 'حلقات شهر كامل في يوم تصوير واحد.',
  subline: 'نأتي إليك بالاستوديو كاملاً — أربع كاميرات سوني 4K فل فريم، وصوت استوديو، وإضاءة نبنيها في مكانك ليوم واحد. نسلّم الحلقات والمقاطع القصيرة خلال أسبوع.',
  ctaWhatsApp: 'تواصل عبر واتساب',
  ctaCall: 'اتصل بنا',
  ctaEmail: 'راسلنا',

  problemHeading: 'معظم برامج البودكاست تتوقف عند الحلقة الثانية عشرة',
  problemBody: 'لا لأن الضيف ممل، بل لأن الحلقة لا تُشاهَد. كاميرا واحدة ثابتة، وصوت من الغرفة، وتسعون دقيقة بلا لحظة واحدة تستحق المشاركة — وموسم ينتهي قبل أن يبدأ.',

  clipsHeading: 'الحلقة ليست المنتج. المقاطع هي المنتج.',
  clipsBody: 'كاميرا واحدة تعطيك زاوية واحدة ولقطة ثابتة. أربع كاميرات تغطي الزاوية العكسية والواسعة وكل متحدث على حدة — كل ردّ فعل، وكل لحظة تصلح للنشر. يوم تصوير واحد يتحوّل إلى محتوى شهر كامل.',
  stat4Angles: '٤',
  stat4Label: 'زوايا تصوير في كل لحظة',
  stat1Day: '١',
  stat1Label: 'يوم تصوير واحد',
  stat7Days: '٧',
  stat7Label: 'التسليم خلال أيام',

  studioHeading: 'لا تحتاج إلى استوديو. نأتي به إليك.',
  studioBody: 'قاعة اجتماعات أو مكتب أو مجلس — نصل مبكراً ونجهّز المكان بالكامل: إضاءة، وخلفية، ومعالجة صوتية، وأربع كاميرات متطابقة، وميكروفون مستقل لكل متحدث. قبل أن يصل ضيفك، تكون الغرفة استوديو.',
  studioSub: 'أربع كاميرات سوني 4K فل فريم، متطابقة ومعالجة لوناً كحزمة واحدة — عمق سينمائي ونقاء في أي إضاءة.',

  shootHeading: 'من ينتج بودكاست لأول مرة يريد أن يعرف كيف يمر اليوم. إليك التفاصيل.',
  shootTimes: [
    { time: '٩:٠٠', label: 'وصول الفريق والتجهيز' },
    { time: '١١:٠٠', label: 'ضبط الإضاءة والصوت ومطابقة الكاميرات' },
    { time: '١٢:٠٠', label: 'استقبال الضيوف واختبار الصوت' },
    { time: '١٣:٠٠', label: 'بدء التصوير' },
    { time: '١٦:٠٠', label: 'الانتهاء وتسليم الجلسة كاملة على قرص صلب قبل المغادرة' },
    { time: 'خلال ٧ أيام', label: 'تسليم الحلقات المونتَجة والمقاطع القصيرة' },
  ],

  setup1Title: 'مضيف وضيف',
  setup1Body: 'ثلاث كاميرات. كاميرا لكل متحدث وكاميرا واسعة تجمعهما — مونتاج نظيف بلا لقطة ثابتة.',
  setup2Title: 'البرنامج الأساسي',
  setup2Body: 'أربع كاميرات. كل ما سبق مع زاوية متحركة لالتقاط التفاصيل وردود الفعل — مصمم للنشر بالمقاطع القصيرة.',
  setup3Title: 'الإعداد المميز',
  setup3Body: 'حتى ثماني كاميرات. للحلقات الحوارية، والجمهور المباشر، والبرامج التي لا تحتمل تفويت أي ردّ فعل.',

  whereHeading: 'نصوّر في مختلف مناطق المملكة',
  whereBody: 'ننتج البودكاست في الرياض وجدة والخبر والدمام والجبيل، ونسافر إلى مختلف مناطق المملكة ودول الخليج للبرامج الكبرى.',

  faq: [
    { q: 'هل نحتاج إلى استوديو خاص؟', a: 'لا. نأتي بالإضاءة والصوت والخلفية والكاميرات ونبني استوديو في مكانك لليوم.' },
    { q: 'كم حلقة يمكنكم تصويرها في يوم واحد؟', a: 'أربع بشكل مريح، مع تبديل ضيف بين كل حلقة. هذا شهر من الحلقات الأسبوعية من يوم تصوير واحد.' },
    { q: 'كم متحدثاً يمكنكم تسجيلهم؟', a: 'أربعة في الإعداد القياسي، كلّ على ميكروفون وقناة منفصلة. المزيد في الإعداد المميز.' },
    { q: 'هل نحصل على المواد الخام؟', a: 'نعم. الجلسة الكاملة توضع على قرص صلب قبل أن نغادر.' },
    { q: 'هل ت монтируون باللغة العربية؟', a: 'نعم. المونتاج والتعليق والترجمة والمقاطع القصيرة بالعربية والإنجليزية.' },
    { q: 'متى تُسلَّم المقاطع؟', a: 'الحلقات المونتَجة والمقاطع القصيرة خلال أسبوع من التصوير.' },
    { q: 'هل تسافرون خارج المنطقة الشرقية؟', a: 'نعم — الرياض وجدة وبقية المملكة.' },
    { q: 'من يملك المواد المصوّرة؟', a: 'أنت. الحقوق الكاملة لكل ما نصوّره لك.' },
  ],

  contactHeading: 'لنتحدث.',
  contactSub: 'مستعد تطلّع على العرض، أو لسه تفكّر — في الحالتين، نقدر نساعد.',

  breadcrumbHome: 'الرئيسية',
  breadcrumbSelf: 'إنتاج البودكاست',

  linkFilming: 'تصوير البودكاست في الموقع',
  linkMultiCam: 'البث المباشر متعدد الكاميرات',
  linkEvent: 'تغطية الفعاليات',
}

// ----------------------------------------------------------------
// WhatsApp pre-fill URLs
// ----------------------------------------------------------------
const WHATSAPP_URL = `https://wa.me/966500440235?text=${encodeURIComponent("Hi, I'd like to talk about podcast production")}`
const WHATSAPP_URL_AR = `https://wa.me/966500440235?text=${encodeURIComponent("مرحباً، أريد التحدث عن إنتاج البودكاست")}`

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------
export default async function PodcastProductionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'
  const t = isArabic ? AR : EN

  const canonical = `${DOMAIN}/${locale}/${PATH_EN}`

  const heroPoster = 'https://premiera-live-media.s3.us-east-1.amazonaws.com/page-headers/podcast-hero-poster.webp'
  const heroWebM = 'https://premiera-live-media.s3.us-east-1.amazonaws.com/page-headers/podcast-hero.webm'
  const heroMp4 = 'https://premiera-live-media.s3.us-east-1.amazonaws.com/page-headers/podcast-hero.mp4'

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', name: 'Home', item: `${DOMAIN}/${locale}`, position: 1 },
              { '@type': 'ListItem', name: t.breadcrumbSelf, item: canonical, position: 2 },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: t.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Podcast Production',
            name: isArabic ? 'إنتاج البودكاست | بريمييرا لايف' : 'Podcast Production | Premiera Live',
            description: isArabic
              ? 'ننتج البودكاست في السعودية — نصوّر بأربع كاميرات سوني 4K مع استوديو متنقل في موقعك.'
              : 'Podcast production in Saudi Arabia — we film on 4 x Sony 4K cameras, mobile studio at your location.',
            provider: {
              '@type': 'Organization',
              name: isArabic ? 'بريمييرا لايف' : 'Premiera Live',
              url: DOMAIN,
            },
            areaServed: {
              '@type': 'Place',
              name: 'Saudi Arabia',
            },
            url: canonical,
          }),
        }}
      />

      {/* Breadcrumb */}
      <div style={{
        maxWidth: '80rem', margin: '0 auto',
        padding: '5rem clamp(1.25rem, 5vw, 4rem) 1.25rem',
        display: 'flex', gap: '0.5rem', alignItems: 'center',
        fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
        color: 'var(--color-text-faint)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}>
        <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {t.breadcrumbHome}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-dim)' }}>{t.breadcrumbSelf}</span>
      </div>

      {/* ─── HERO ─── */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0A0A0B',
        direction: isArabic ? 'rtl' : 'ltr',
      }}>
        {/* Poster/placeholder — next/image for LCP optimisation */}
        <Image
          src={heroPoster}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          loading="eager"
          fetchPriority="high"
          priority
        />

        <HeroVideo
          poster={heroPoster}
          webm={heroWebM}
          mp4={heroMp4}
          width={1920}
          height={1080}
        />

        {/* Dark gradient overlay for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.85) 100%)',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '80rem',
          margin: '0 auto',
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          textAlign: 'center',
          width: '100%',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 'var(--eyebrow)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            marginBottom: '1.5rem',
          }}>
            {t.eyebrow}
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#F5F4F0',
            lineHeight: 1.0,
            letterSpacing: '0.01em',
            marginBottom: '1.5rem',
          }}>
            {t.h1}
          </h1>

          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            color: 'var(--color-gold)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}>
            {t.displayLine}
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(245,244,240,0.8)',
            lineHeight: 1.7,
            maxWidth: '60ch',
            margin: '0 auto 2.5rem',
          }}>
            {t.subline}
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a
              href={isArabic ? WHATSAPP_URL_AR : WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'var(--color-gold)', color: '#0A0A0B',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700,
                textDecoration: 'none', borderRadius: '9999px',
              }}
            >
              {t.ctaWhatsApp}
            </a>
            <a
              href="tel:+966500440235"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'transparent',
                color: '#F5F4F0',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
                textDecoration: 'none', borderRadius: '9999px',
                border: '1px solid rgba(245,244,240,0.4)',
              }}
            >
              {t.ctaCall}
            </a>
            <a
              href={`mailto:ceo@premieralive.com?subject=${encodeURIComponent('Podcast Production Enquiry')}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'transparent',
                color: '#F5F4F0',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
                textDecoration: 'none', borderRadius: '9999px',
                border: '1px solid rgba(245,244,240,0.4)',
              }}
            >
              {t.ctaEmail}
            </a>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 3rem)',
          color: 'var(--color-text)',
          lineHeight: 1.2,
          marginBottom: '1.5rem',
          maxWidth: '24ch',
        }}>
          {t.problemHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)',
          lineHeight: 1.8,
          maxWidth: '60ch',
        }}>
          {t.problemBody}
        </p>
      </Section>

      {/* ─── THE CLIPS ARGUMENT ─── */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 3rem)',
          color: 'var(--color-text)',
          lineHeight: 1.2,
          marginBottom: '1.5rem',
        }}>
          {t.clipsHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)',
          lineHeight: 1.8,
          maxWidth: '60ch',
          marginBottom: '3rem',
        }}>
          {t.clipsBody}
        </p>

        {/* Three stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid var(--color-card-border)',
          paddingTop: '2.5rem',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              color: 'var(--color-gold)',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {t.stat4Angles}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)',
              lineHeight: 1.5,
            }}>
              {t.stat4Label}
            </p>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              color: 'var(--color-gold)',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {t.stat1Day}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)',
              lineHeight: 1.5,
            }}>
              {t.stat1Label}
            </p>
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              color: 'var(--color-gold)',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {t.stat7Days}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)',
              lineHeight: 1.5,
            }}>
              {t.stat7Label}
            </p>
          </div>
        </div>
      </Section>

      {/* ─── THE MOBILE STUDIO ─── */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 3rem)',
          color: 'var(--color-text)',
          lineHeight: 1.2,
          marginBottom: '1.5rem',
        }}>
          {t.studioHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)',
          lineHeight: 1.8,
          maxWidth: '60ch',
          marginBottom: '1rem',
        }}>
          {t.studioBody}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body-sm)',
          color: 'rgba(245,244,240,0.5)',
          lineHeight: 1.7,
          maxWidth: '55ch',
        }}>
          {t.studioSub}
        </p>
      </Section>

      {/* ─── SHOOT DAY ─── */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '2.5rem',
        }}>
          {t.shootHeading}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          maxWidth: '680px',
        }}>
          {t.shootTimes.map((item, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '1.5rem',
              alignItems: 'start',
              padding: '1.25rem 0',
              borderBottom: i < t.shootTimes.length - 1
                ? '1px solid var(--color-card-border)'
                : 'none',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'var(--color-gold)',
                fontWeight: 600,
                minWidth: '5ch',
                lineHeight: 1.2,
                paddingTop: '0.1rem',
              }}>
                {item.time}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body)',
                color: 'var(--color-text-dim)',
                lineHeight: 1.6,
              }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SETUPS ─── */}
      <Section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { title: t.setup1Title, body: t.setup1Body },
            { title: t.setup2Title, body: t.setup2Body },
            { title: t.setup3Title, body: t.setup3Body },
          ].map((card) => (
            <div key={card.title} style={{
              padding: '2rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                color: 'var(--color-text)',
                fontWeight: 600,
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}>
                {card.title}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)',
                lineHeight: 1.7,
              }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── WHERE WE WORK ─── */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {t.whereHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)',
          lineHeight: 1.8,
          maxWidth: '60ch',
        }}>
          {t.whereBody}
        </p>

        {/* Internal links */}
        <div style={{
          marginTop: '2.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-card-border)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem 1.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body-sm)',
        }}>
          <span style={{ color: 'var(--color-text-dim)' }}>
            {isArabic ? 'related:' : 'related:'}{' '}
          </span>
          <Link
            href={`/${locale}/services/podcast-filming-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {t.linkFilming}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/multi-cam-live-streaming-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {t.linkMultiCam}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/event-coverage-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {t.linkEvent}
          </Link>
        </div>
      </Section>

      {/* ─── FAQ ─── */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          fontSize: 'var(--eyebrow)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '3rem',
        }}>
          FAQ
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '720px' }}>
          {t.faq.map((item, i) => (
            <details key={i} style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <summary style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'var(--body)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}>
                {item.q}
                <span style={{
                  color: 'var(--color-gold)',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}>
                  +
                </span>
              </summary>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)',
                lineHeight: 1.7,
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--color-card-border)',
              }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.25rem, 5vw, 4rem)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: 'var(--color-text)',
          lineHeight: 1.0,
          marginBottom: '1.25rem',
        }}>
          {t.contactHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          {t.contactSub}
        </p>
        <ContactActions />
      </section>

      {/* ─── STICKY MOBILE BAR ─── */}
      <div style={{
        display: 'none',
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '1rem clamp(1rem, 4vw, 2rem)',
        background: 'rgba(10,10,11,0.95)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid var(--color-card-border)',
        gap: '0.75rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
        className="sticky-mobile-bar"
      >
        <a
          href={isArabic ? WHATSAPP_URL_AR : WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.75rem 1.5rem',
            background: 'var(--color-gold)', color: '#0A0A0B',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700,
            textDecoration: 'none', borderRadius: '9999px',
            flex: '2 1 200px',
            justifyContent: 'center',
          }}
        >
          {t.ctaWhatsApp}
        </a>
        <a
          href="tel:+966500440235"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.75rem 1.25rem',
            background: 'transparent', color: '#F5F4F0',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none', borderRadius: '9999px',
            border: '1px solid rgba(245,244,240,0.4)',
            flex: '1 1 120px',
            justifyContent: 'center',
          }}
        >
          {t.ctaCall}
        </a>
        <a
          href={`mailto:ceo@premieralive.com?subject=${encodeURIComponent('Podcast Production Enquiry')}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.75rem 1.25rem',
            background: 'transparent', color: '#F5F4F0',
            fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none', borderRadius: '9999px',
            border: '1px solid rgba(245,244,240,0.4)',
            flex: '1 1 120px',
            justifyContent: 'center',
          }}
        >
          {t.ctaEmail}
        </a>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .sticky-mobile-bar { display: flex !important; }
        }
        details[open] summary span { transform: rotate(45deg); }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </>
  )
}
