import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'
import { SERVICES } from '@/config/services'

const STATS = [
  { num: '15+', labelEn: 'Years of Experience', labelAr: 'عاماً من الخبرة' },
  { num: '1,000+', labelEn: 'Projects Delivered', labelAr: 'مشروع منجز' },
  { num: '20+', labelEn: 'Global Brands', labelAr: 'علامة عالمية' },
  { num: '25+', labelEn: 'Platforms Mastered', labelAr: 'منصة نتقنها' },
]

const EN_ENTITY = 'Premiera Live is a film production company headquartered in Al Khobar, Saudi Arabia. Built on more than fifteen years of filmmaking and production experience across the Gulf, the company helps organisations across Saudi Arabia tell their stories through commercial films, corporate videos, documentaries, professional photography, and animation. Alongside production, Premiera Live designs business websites, digital platforms, and technology solutions that help brands grow.'

const AR_ENTITY = 'تعمل بريمييرا لايف شركةَ إنتاج أفلام من مقرها في الخبر بالمملكة العربية السعودية. تأسست على أكثر من خمسة عشر عامًا من خبرة صناعة الأفلام والإنتاج في الخليج، وتساعد المؤسسات في أنحاء السعودية على سرد قصصها عبر الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير الاحترافي والرسوم المتحركة. وإلى جانب الإنتاج، تصمم بريمييرا لايف مواقع الأعمال والمنصات الرقمية والحلول التقنية التي تساعد العلامات على النمو.'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const domain = 'https://www.premieralive.com'
  const canonical = `${domain}/${locale}/about`
  return {
    title: isArabic ? 'عن بريمييرا لايف | شركة إنتاج أفلام في الخبر' : 'About Premiera Live | Film Production Company in Al Khobar',
    description: isArabic
      ? 'تعمل بريمييرا لايف شركةَ إنتاج أفلام من مقرها في الخبر بالسعودية — تأسست على أكثر من 15 عامًا من خبرة الإنتاج في الخليج. أفلام ومواقع وتسويق، كل شيء داخليًا.'
      : 'Premiera Live is a film production company headquartered in Al Khobar, Saudi Arabia — built on more than 15 years of production experience across the Gulf. Films, websites, and marketing, all in-house.',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${domain}/en/about`,
        'ar-SA': `${domain}/ar/about`,
        'x-default': `${domain}/en/about`,
      },
    },
    openGraph: {
      title: isArabic ? 'عن بريمييرا لايف | شركة إنتاج أفلام في الخبر' : 'About Premiera Live | Film Production Company in Al Khobar',
      description: isArabic
        ? 'تعمل بريمييرا لايف شركةَ إنتاج أفلام من مقرها في الخبر بالسعودية — تأسست على أكثر من 15 عامًا من خبرة الإنتاج في الخليج.'
        : 'Premiera Live is a film production company headquartered in Al Khobar, Saudi Arabia — built on more than 15 years of production experience across the Gulf.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic ? 'عن بريمييرا لايف | شركة إنتاج أفلام في الخبر' : 'About Premiera Live | Film Production Company in Al Khobar',
      description: isArabic
        ? 'تعمل بريمييرا لايف شركةَ إنتاج أفلام من مقرها في الخبر بالسعودية — تأسست على أكثر من 15 عامًا من خبرة الإنتاج في الخليج.'
        : 'Premiera Live is a film production company headquartered in Al Khobar, Saudi Arabia — built on more than 15 years of production experience across the Gulf.',
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const aboutLabel = isArabic ? 'عن الشركة' : 'About'
  const entityLabel = isArabic ? 'ما هي بريمييرا لايف' : 'The Company'
  const storyHeading = isArabic ? 'من أين جئنا' : 'Where we come from'
  const doHeading = isArabic ? 'ما الذي نفعله' : 'What we do'
  const whereHeading = isArabic ? 'أين نعمل' : 'Where we work'
  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const ctaLabel = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'
  const filmHub = isArabic ? 'إنتاج الأفلام — حرفتنا الأساسية' : 'Film production — our core craft'
  const filmHubBodyEn = 'Commercial films, corporate videos, documentaries, professional photography, animation and CGI, event coverage, multi-cam live streaming, and podcast filming. Shot by our own crew on cinema-line cameras, edited in-house.'
  const filmHubBodyAr = 'ننتج الأفلام التجارية وأفلام الشركات والوثائقيات والتصوير الاحترافي والرسوم المتحركة وتغطية الفعاليات والبث المباشر متعدد الكاميرات وتصوير البودكاست. نصوّر بطاقتنا الخاص على كاميرات سينمائية، ونمنتج داخليًا.'
  const webHub = isArabic ? 'المواقع والمنصات' : 'Websites and platforms'
  const webHubBodyEn = 'Custom-coded business websites, apps, booking systems, and client portals — no templates, no page builders. Built by the same company that films your story.'
  const webHubBodyAr = 'نبني مواقع الأعمال والتطبيقات وأنظمة الحجز وبوابات العملاء بكود مخصص — بلا قوالب وبلا أدوات جاهزة. يبنيها الفريق نفسه الذي يصوّر قصتك.'
  const mktHub = isArabic ? 'تسويق يتراكم أثره' : 'Marketing that compounds'
  const mktHubBodyEn = 'Monthly retainers covering social media, paid advertising, SEO, and content — written natively in Arabic and English, planned to Saudi advertising standards from the first shot list.'
  const mktHubBodyAr = 'ندير اشتراكات شهرية تغطي وسائل التواصل والإعلانات المدفوعة وتحسين محركات البحث والمحتوى — نكتبها أصالةً بالعربية والإنجليزية، ونخططها وفق معايير الإعلان في المملكة من أول قائمة لقطات.'

  const storyEn = `For over fifteen years, our team has produced films, campaigns, and platforms across the Gulf — for broadcasters, motorsport, aviation, hospitality, and government. More than 1,000 projects. More than 20 global brands. The lesson every one of them taught us is the same: great creative without technology stalls, and technology without story is invisible.\nPremiera Live was founded in Al Khobar in 2026 to bring both to Saudi Arabia as one company — the film crew and the engineering team under the same roof, accountable to the same result.`

  const storyAr = `أنتج فريقنا على مدى أكثر من خمسة عشر عامًا أفلامًا وحملات ومنصات في أنحاء الخليج — لجهات البث ورياضة المحركات والطيران والضيافة والقطاع الحكومي. أكثر من 1,000 مشروع، وأكثر من 20 علامة عالمية. وعلّمنا كل مشروع منها الدرس نفسه: يتعثر الإبداع العظيم بلا تقنية، وتبقى التقنية بلا قصة غير مرئية.\nتأسست بريمييرا لايف في الخبر عام 2026 لتجمع الاثنين في السعودية داخل شركة واحدة — فريق التصوير وفريق الهندسة تحت سقف واحد، ومسؤولية واحدة عن النتيجة.`

  const whereEn = 'We are based in Al Khobar and serve businesses across the Eastern Province — Dammam, Dhahran, and Jubail — as well as Riyadh, Jeddah, and the rest of the Kingdom. Our crews travel; your production happens where your business is.'
  const whereAr = 'مقرنا الخبر، ونخدم الشركات في أنحاء المنطقة الشرقية — الدمام والظهران والجبيل — إضافة إلى الرياض وجدة وبقية مناطق المملكة. تنتقل طواقمنا إليك؛ يحدث إنتاجك حيث يوجد عملك.'

  return (
    <>
      {/* JSON-LD — LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Premiera Live',
            url: 'https://www.premieralive.com',
            telephone: '+966500440235',
            email: 'ceo@premieralive.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Spaces Ajdan Walk, Corniche 5, PO Box 34414',
              addressLocality: 'Al Khobar',
              addressCountry: 'SA',
            },
            description: EN_ENTITY,
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
        <span style={{ color: 'var(--color-text-dim)' }}>{aboutLabel}</span>
      </div>

      {/* H1 + Entity block */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: 'var(--color-text)', lineHeight: 1.0,
          letterSpacing: '0.01em', marginBottom: '2.5rem',
        }}>
          {isArabic ? 'عن بريمييرا لايف' : 'About Premiera Live'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'var(--color-text)', lineHeight: 1.75,
          maxWidth: '72ch', margin: '0 auto',
          fontWeight: 500,
        }}>
          {isArabic ? AR_ENTITY : EN_ENTITY}
        </p>
      </section>

      {/* Story — Where we come from */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {storyHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
          whiteSpace: 'pre-line',
        }}>
          {isArabic ? storyAr : storyEn}
        </p>
      </Section>

      {/* What we do — 3 hub blocks */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem',
        }}>
          {doHeading}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Film hub */}
          <div style={{
            padding: '1.75rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              letterSpacing: '0.01em',
            }}>
              {filmHub}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}>
              {isArabic ? filmHubBodyAr : filmHubBodyEn}
            </p>
            <Link
              href={`/${locale}/services`}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-gold)', textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              {isArabic ? 'عرض خدمات الإنتاج →' : 'View production services →'}
            </Link>
          </div>

          {/* Web hub */}
          <div style={{
            padding: '1.75rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              letterSpacing: '0.01em',
            }}>
              {webHub}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}>
              {isArabic ? webHubBodyAr : webHubBodyEn}
            </p>
            <Link
              href={`/${locale}/digital`}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-gold)', textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              {isArabic ? 'عرض المواقع والمنصات →' : 'View websites and platforms →'}
            </Link>
          </div>

          {/* Marketing hub */}
          <div style={{
            padding: '1.75rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'var(--color-gold)',
              marginBottom: '1rem',
              letterSpacing: '0.01em',
            }}>
              {mktHub}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}>
              {isArabic ? mktHubBodyAr : mktHubBodyEn}
            </p>
            <Link
              href={`/${locale}/marketing`}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-gold)', textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              {isArabic ? 'عرض التسويق →' : 'View marketing services →'}
            </Link>
          </div>
        </div>
      </Section>

      {/* Stats row — reuse existing STATS */}
      <Section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--color-card-border)',
          borderBottom: '1px solid var(--color-card-border)',
        }}
        className="about-stats-grid"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2.5rem 1rem',
                borderRight: i < STATS.length - 1 ? '1px solid var(--color-card-border)' : 'none',
                textAlign: 'center',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                color: 'var(--color-gold)',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                {stat.num}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--eyebrow)',
                color: 'var(--color-text-faint)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderRight: isArabic ? '1px solid var(--color-card-border)' : 'none',
                borderLeft: isArabic ? 'none' : '1px solid var(--color-card-border)',
                paddingInline: '1.5rem',
              }}>
                {isArabic ? stat.labelAr : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Where we work */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {whereHeading}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? whereAr : whereEn}
        </p>
      </Section>

      {/* Company details block */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)',
          lineHeight: 1.7,
          marginBottom: '0.25rem',
        }}>
          {isArabic ? 'شركة بريمييرا لايف | سجل تجاري: 7054807941' : 'Premiera Live Company | CR: 7054807941'}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)',
          lineHeight: 1.7,
        }}>
          {isArabic
            ? 'Spaces Ajdan Walk, Corniche 5, PO Box 34414, Al Khobar, Kingdom of Saudi Arabia'
            : 'Spaces Ajdan Walk, Corniche 5, PO Box 34414, Al Khobar, Kingdom of Saudi Arabia'}
        </p>
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

      <style>{`
        @media (max-width: 639px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .about-stats-grid > div:nth-child(1),
          .about-stats-grid > div:nth-child(2) {
            border-bottom: 1px solid var(--color-card-border);
          }
        }
      `}</style>
    </>
  )
}
