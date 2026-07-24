import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'
import ServiceCard from '@/components/ServiceCard'
import { SERVICES } from '@/config/services'
import type { ServiceSlug } from '@/config/services'

const CINEMATIC_SLUGS = SERVICES.slice(0, 8).map((s) => s.slug as ServiceSlug)

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const domain = 'https://www.premieralive.com'
  const canonical = `${domain}/${locale}/film-production-company-saudi-arabia`
  return {
    title: isArabic
      ? 'شركة إنتاج أفلام في السعودية | بريمييرا لايف'
      : 'Film Production Company in Saudi Arabia | Premiera Live',
    description: isArabic
      ? 'تعمل بريمييرا لايف شركةَ إنتاج أفلام في الخبر، وننتج الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير والرسوم المتحركة للشركات في أنحاء السعودية. أكثر من 15 عامًا وأكثر من 1,000 مشروع بطاقم داخلي.'
      : 'Premiera Live is a film production company in Al Khobar producing commercial films, corporate videos, documentaries, photography, and animation for businesses across Saudi Arabia. 15+ years, 1,000+ projects, in-house crew.',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${domain}/en/film-production-company-saudi-arabia`,
        'ar-SA': `${domain}/ar/film-production-company-saudi-arabia`,
        'x-default': `${domain}/en/film-production-company-saudi-arabia`,
      },
    },
    openGraph: {
      title: isArabic
        ? 'شركة إنتاج أفلام في السعودية | بريمييرا لايف'
        : 'Film Production Company in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'تعمل بريمييرا لايف شركةَ إنتاج أفلام في الخبر، وننتج الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير والرسوم المتحركة للشركات في أنحاء السعودية.'
        : 'Premiera Live is a film production company in Al Khobar producing commercial films, corporate videos, documentaries, photography, and animation for businesses across Saudi Arabia.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'شركة إنتاج أفلام في السعودية | بريمييرا لايف'
        : 'Film Production Company in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'تعمل بريمييرا لايف شركةَ إنتاج أفلام في الخبر، وننتج الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير والرسوم المتحركة للشركات في أنحاء السعودية.'
        : 'Premiera Live is a film production company in Al Khobar producing commercial films, corporate videos, documentaries, photography, and animation for businesses across Saudi Arabia.',
    },
  }
}

export default async function FilmProductionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerstoneLabel = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'Film Production Company in Saudi Arabia'
  const h1En = 'Film Production Company in Saudi Arabia'
  const h1Ar = 'شركة إنتاج أفلام في السعودية'
  const heroEn = 'Premiera Live is a film production company based in Al Khobar, producing commercial films, corporate videos, documentaries, professional photography, and animation for businesses across Saudi Arabia. Every frame is shot by our own crew, on our own cinema-line cameras, and finished in-house — no subcontracted freelancers, no coordination layers, one team accountable from the first call to the final delivery.'
  const heroAr = 'تعمل بريمييرا لايف شركةَ إنتاج أفلام من مقرها في الخبر، وننتج الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير الاحترافي والرسوم المتحركة للشركات في أنحاء السعودية. يصوّر طاقمنا كل لقطة بكاميراتنا السينمائية، وننهي كل شيء داخليًا — بلا مصوّرين مستقلين من الباطن، وبلا طبقات تنسيق، وبفريق واحد مسؤول من أول مكالمة حتى التسليم النهائي.'
  const produceHeadingEn = 'What we produce'
  const produceHeadingAr = 'ما الذي ننتجه'
  const whyHeadingEn = 'Why a production company, not an agency'
  const whyHeadingAr = 'لماذا شركة إنتاج، لا وكالة'
  const whyEn = 'Agencies coordinate. Production companies produce. When you hire an agency, your film is briefed to a freelancer the agency has never filmed with; when the freelancer is busy, your shoot slips, and when the result disappoints, the layers blame each other.\nWe own every stage — direction, cameras, lighting, sound, edit, colour, and delivery — with the same team on every project. That is why the work holds a consistent standard, why timelines hold, and why one phone number is responsible for the outcome. And because we also build websites and run marketing in-house, the film you invest in is planned for where it will actually live: your site, your campaigns, your channels.'
  const whyAr = 'تنسّق الوكالات، وتُنتج شركات الإنتاج. حين تتعاقد مع وكالة، يُرسل فيلمك بريفًا إلى مصوّر مستقل لم تصوّر معه الوكالة من قبل؛ وحين ينشغل، يتأخر تصويرك؛ وحين تخيّب النتيجة، تتبادل الطبقات اللوم.\nنملك كل مرحلة — الإخراج والكاميرات والإضاءة والصوت والمونتاج والألوان والتسليم — بالفريق نفسه في كل مشروع. لهذا يحافظ العمل على مستوى ثابت، وتصمد الجداول، ويتحمّل رقم هاتف واحد مسؤولية النتيجة. ولأننا نبني المواقع وندير التسويق داخليًا أيضًا، نخطط الفيلم الذي تستثمر فيه للمكان الذي سيعيش فيه فعلًا: موقعك وحملاتك وقنواتك.'
  const citiesHeadingEn = 'Where we film'
  const citiesHeadingAr = 'أين نصوّر'
  const citiesEn = "We are the Eastern Province's local production company — Al Khobar, Dammam, Dhahran, and Jubail are home ground, with no travel premium and no imported crews. We also produce across Riyadh, Jeddah, and the wider Kingdom, and our team has filmed throughout the Gulf for over fifteen years."
  const citiesAr = 'نعمل من الخبر بوصفنا شركة الإنتاج المحلية للمنطقة الشرقية — الخبر والدمام والظهران والجبيل أرضنا، بلا رسوم سفر وبلا طواقم مستوردة. وننتج أيضًا في الرياض وجدة وبقية مناطق المملكة، وقد صوّر فريقنا في أنحاء الخليج لأكثر من خمسة عشر عامًا.'
  const processHeadingEn = 'How a production runs'
  const processHeadingAr = 'كيف يسير الإنتاج'
  const gearHeadingEn = 'What we shoot on'
  const gearHeadingAr = 'بماذا نصوّر'
  const gearEn = 'Sony cinema-line 4K cameras with prime lenses, professional lighting, dedicated audio, and live multi-camera switching for events and podcasts. The same sensor family trusted on broadcast productions worldwide — and enough of it to field four-camera shoots without renting a single body.'
  const gearAr = 'نصوّر بكاميرات Sony السينمائية بدقة 4K وعدسات برايم وإضاءة احترافية وصوت مخصص وتبديل مباشر متعدد الكاميرات للفعاليات والبودكاست. عائلة الحساسات نفسها الموثوقة في إنتاجات البث حول العالم — وبعدد يكفي لتشغيل تصوير بأربع كاميرات دون استئجار كاميرا واحدة.'
  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const ctaLabel = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'

  const processSteps = [
    {
      en: 'Discovery call',
      ar: 'مكالمة تعريفية',
      descEn: 'We map your goal, audience, and where the film will be used.',
      descAr: 'نحدد هدفك وجمهورك وأين سيُستخدم الفيلم.',
    },
    {
      en: 'Treatment and plan',
      ar: 'المعالجة والخطة',
      descEn: 'Script, shot list, locations, and schedule, approved by you before anything rolls.',
      descAr: 'سيناريو وقائمة لقطات ومواقع وجدول، توافق عليها قبل أن يبدأ أي تصوير.',
    },
    {
      en: 'Production day',
      ar: 'يوم الإنتاج',
      descEn: 'Our crew arrives with cameras, lighting, and sound. Your team focuses on being on camera, not running logistics.',
      descAr: 'يصل طاقمنا بالكاميرات والإضاءة والصوت. يركّز فريقك على الظهور أمام الكاميرا لا على إدارة اللوجستيات.',
    },
    {
      en: 'Post-production',
      ar: 'ما بعد الإنتاج',
      descEn: 'Edit, colour grade, sound mix, and graphics, in-house.',
      descAr: 'مونتاج وتصحيح ألوان ومزج صوت وجرافيك، داخليًا.',
    },
    {
      en: 'Delivery',
      ar: 'التسليم',
      descEn: 'Final films in every format your channels need, with the raw footage available on request.',
      descAr: 'أفلام نهائية بكل الصيغ التي تحتاجها قنواتك، مع إتاحة المواد الخام عند الطلب.',
    },
  ]

  const faqData = [
    {
      qEn: 'Do you film outside Al Khobar?',
      aEn: 'Yes — across the Eastern Province, Riyadh, Jeddah, and the whole Kingdom. Our crews travel with full equipment.',
      qAr: 'هل تصوّرون خارج الخبر؟',
      aAr: 'نعم — في أنحاء المنطقة الشرقية والرياض وجدة والمملكة كلها. تنتقل طواقمنا بكامل المعدات.',
    },
    {
      qEn: 'Do you handle the full production or only filming?',
      aEn: 'The full chain — concept, script, filming, edit, colour, sound, and delivery, all in-house.',
      qAr: 'هل تتولون الإنتاج كاملًا أم التصوير فقط؟',
      aAr: 'السلسلة كاملة — الفكرة والسيناريو والتصوير والمونتاج والألوان والصوت والتسليم، كل ذلك داخليًا.',
    },
    {
      qEn: 'How far in advance should we book?',
      aEn: 'Two weeks is comfortable for most corporate shoots; larger campaigns need more. Urgent timelines are sometimes possible — ask.',
      qAr: 'قبل كم يجب أن نحجز؟',
      aAr: 'يكفي أسبوعان لمعظم تصوير الشركات؛ وتحتاج الحملات الأكبر وقتًا أطول. تتاح أحيانًا جداول عاجلة — اسألنا.',
    },
    {
      qEn: 'Do we own the footage?',
      aEn: 'Yes. Final films are yours, and raw footage is available on request.',
      qAr: 'هل نملك المواد المصوّرة؟',
      aAr: 'نعم. الأفلام النهائية ملك لك، والمواد الخام متاحة عند الطلب.',
    },
    {
      qEn: 'Can you film in Arabic and English?',
      aEn: 'Yes — bilingual productions are our normal, from scripting to subtitles, written natively in both.',
      qAr: 'هل تصوّرون بالعربية والإنجليزية؟',
      aAr: 'نعم — الإنتاج ثنائي اللغة عملنا المعتاد، من السيناريو إلى الترجمة، مكتوبًا أصالةً باللغتين.',
    },
    {
      qEn: 'What does a production cost?',
      aEn: 'Every production is scoped to its goal — length, locations, crew size, and post. Call to discuss and we will quote precisely.',
      qAr: 'كم يكلف الإنتاج؟',
      aAr: 'يُحدد نطاق كل إنتاج وفق هدفه — المدة والمواقع وحجم الطاقم وما بعد الإنتاج. اتصل بنا للنقاش وسنقدّم عرضًا دقيقًا.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  // 8 cinematic services from services.ts
  const cinematicServices = SERVICES.slice(0, 8).map((s) => ({
    slug: s.slug,
    nameEn: s.nameEn,
    nameAr: s.nameAr,
    shortEn: s.nameEn.replace(' in Saudi Arabia', ''),
    shortAr: s.nameAr.replace(' في السعودية', ''),
  }))

  return (
    <>
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', name: 'Home', item: 'https://www.premieralive.com', position: 1 },
              { '@type': 'ListItem', name: cornerstoneLabel, item: `https://www.premieralive.com/${locale}/film-production-company-saudi-arabia`, position: 2 },
            ],
          }),
        }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((f) => ({
              '@type': 'Question',
              name: isArabic ? f.qAr : f.qEn,
              acceptedAnswer: {
                '@type': 'Answer',
                text: isArabic ? f.aAr : f.aEn,
              },
            })),
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
        <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>{homeLabel}</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-dim)' }}>{cornerstoneLabel}</span>
      </div>

      {/* H1 + Hero para */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: 'var(--color-text)', lineHeight: 1.0,
          letterSpacing: '0.01em', marginBottom: '2rem',
        }}>
          {isArabic ? h1Ar : h1En}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '72ch', margin: '0 auto',
        }}>
          {isArabic ? heroAr : heroEn}
        </p>
      </section>

      {/* What we produce — 8 blocks */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? produceHeadingAr : produceHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {cinematicServices.map((svc) => (
            <ServiceCard
              key={svc.slug}
              slug={svc.slug}
              shortEn={svc.shortEn}
              shortAr={svc.shortAr}
              locale={locale}
              isArabic={isArabic}
            />
          ))}
        </div>
      </Section>

      {/* Why a production company, not an agency */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? whyHeadingAr : whyHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
          whiteSpace: 'pre-line',
        }}>
          {isArabic ? whyAr : whyEn}
        </p>
      </Section>

      {/* Where we film */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? citiesHeadingAr : citiesHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? citiesAr : citiesEn}
        </p>
      </Section>

      {/* How a production runs — 5 steps */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '3rem', textAlign: 'center',
        }}>
          {isArabic ? processHeadingAr : processHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {processSteps.map((step, i) => (
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
                {String(i + 1).padStart(2, '0')} — {isArabic ? step.ar : step.en}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.6,
              }}>
                {isArabic ? step.descAr : step.descEn}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* What we shoot on */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? gearHeadingAr : gearHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? gearAr : gearEn}
        </p>
      </Section>

      {/* FAQ */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '3rem',
        }}>
          FAQ
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '720px' }}>
          {faqData.map((item, i) => (
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
                {isArabic ? item.qAr : item.qEn}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {isArabic ? item.aAr : item.aEn}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
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
          {ctaHeading}
        </h2>
        <ContactActions />
      </section>
    </>
  )
}
