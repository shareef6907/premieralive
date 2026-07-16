import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import ContactActions from '@/components/ContactActions'
import { MARKETING_SLUGS, getServiceLabel } from '@/config/marketingServices'
import { MEDIA_BASE } from '@/config/media'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const domain = 'https://www.premieralive.com'
  const canonical = `${domain}/${locale}/marketing`
  return {
    title: isArabic ? 'خدمات التسويق | بريمييرا لايف' : 'Marketing Services | Premiera Live',
    description: isArabic
      ? 'تسويق استراتيجي وإبداعي مبني للتحويل — من إدارة التواصل الاجتماعي إلى إعلانات الأداء ومساعدات الذكاء الاصطناعي.'
      : 'Strategic, creative marketing built to convert — from social media and performance ads to AI-powered lead automation. Serving Saudi Arabia and the Gulf.',
    openGraph: {
      title: isArabic ? 'خدمات التسويق | بريمييرا لايف' : 'Marketing Services | Premiera Live',
      description: isArabic
        ? 'تسويق استراتيجي وإبداعي مبني للتحويل — من إدارة التواصل الاجتماعي إلى إعلانات الأداء ومساعدات الذكاء الاصطناعي.'
        : 'Strategic, creative marketing built to convert — from social media and performance ads to AI-powered lead automation. Serving Saudi Arabia and the Gulf.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
      images: [{ url: `${MEDIA_BASE}/homepage-photos/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic ? 'خدمات التسويق | بريمييرا لايف' : 'Marketing Services | Premiera Live',
      description: isArabic
        ? 'تسويق استراتيجي وإبداعي مبني للتحويل — من إدارة التواصل الاجتماعي إلى إعلانات الأداء ومساعدات الذكاء الاصطناعي.'
        : 'Strategic, creative marketing built to convert — from social media and performance ads to AI-powered lead automation. Serving Saudi Arabia and the Gulf.',
    },
    alternates: {
      canonical,
      languages: {
        'en-SA': `${domain}/en/marketing`,
        'ar-SA': `${domain}/ar/marketing`,
        'x-default': `${domain}/en/marketing`,
      },
    },
  }
}

// Briefing-exact copy only — no invented content

const HOW_IT_WORKS = [
  {
    en: 'Audit & Strategy',
    ar: 'التدقيق والاستراتيجية',
    descEn: 'We review your current channels, audience, and competitors — then build a plan with clear goals.',
    descAr: 'نراجع قنواتك الحالية وجمهورك ومنافسيك، ثم نبني خطة بأهداف واضحة.',
  },
  {
    en: 'Content Production',
    ar: 'إنتاج المحتوى',
    descEn: 'Film, photography, copywriting, and design — all aligned to your brand and optimized for each platform.',
    descAr: 'أفلام وتصوير وكتابة وتصميم — كلها متوافقة مع علامتك ومُحسّنة لكل منصة.',
  },
  {
    en: 'Campaign Launch',
    ar: 'إطلاق الحملات',
    descEn: 'We activate paid and organic channels simultaneously — so your message reaches the right people at the right time.',
    descAr: 'نفعّل القنوات المدفوعة والعضوية في وقت واحد — ليوصلك رسالتك إلى الأشخاص المناسبين في الوقت المناسب.',
  },
  {
    en: 'Analytics & Optimisation',
    ar: 'التحليل والتحسين',
    descEn: 'We track every riyal spent and report on what is actually driving revenue — then adjust weekly.',
    descAr: 'نتتبع كل ريال يُنفق ونبلّغ عما يدفع الإيرادات فعلاً، ثم نعدّل كل أسبوع.',
  },
  {
    en: 'Scale or Pause',
    ar: 'التوسيع أو الإيقاف',
    descEn: "When something works, we scale it. When it doesn't, we stop it fast. No contracts that lock you in.",
    descAr: 'حين ينجح شيء، نوسّعه. وحين لا ينجح، نوقفه بسرعة. لا عقود تُقيّدك.',
  },
]

// Email & SMS removed — 4 capabilities remain
const CAPABILITIES = [
  {
    en: 'Social Media Management',
    ar: 'إدارة وسائل التواصل',
    descEn: 'Daily posting, community management, and growth strategy across Instagram, LinkedIn, X, and more.',
    descAr: 'نشر يومي وإدارة مجتمع واستراتيجية نمو عبر إنستغرام ولينكدإن وإكس والمزيد.',
  },
  {
    en: 'Performance Marketing',
    ar: 'التسويق الأدائي',
    descEn: 'Google, Meta, and X ads that track to revenue — not vanity metrics. You see exactly what each riyal returns.',
    descAr: 'إعلانات قوقل وميتا وإكس تتتبع الإيرادات — لا أرقاماً صورية. ترى بالضبط ما يُعيده كل ريال.',
  },
  {
    en: 'Content Creation',
    ar: 'إنتاج المحتوى',
    descEn: 'Cinema-grade film, photography, and design — packaged for every platform your customers use.',
    descAr: 'أفلام وتصوير وتصميم بمستوى سينمائي — مُهيّأ لكل منصة يستخدمها عملاؤك.',
  },
  {
    en: 'Analytics & Reporting',
    ar: 'التحليل والتقارير',
    descEn: 'A real-time dashboard showing traffic, leads, conversions, and revenue per channel — updated daily.',
    descAr: 'لوحة معلومات فورية تعرض الزيارات والعملاء المحتملين والتحويلات والإيرادات لكل قناة — محدّثة يومياً.',
  },
]

// Tier deliverables — Shareef supplies actual list items in next PR
const TIER_DELIVERABLES = {
  essential: {
    en: ['One primary platform', 'Monthly content calendar', 'Publishing & community management', 'Monthly report'],
    ar: ['منصة رئيسية واحدة', 'تقويم محتوى شهري', 'نشر وإدارة مجتمع', 'تقرير شهري'],
  },
  growth: {
    en: ['Multi-platform management', 'Paid ads management', 'SEO foundations', 'Reporting twice a month'],
    ar: ['إدارة منصات متعددة', 'إدارة الإعلانات المدفوعة', 'أساسيات تحسين محركات البحث', 'تقارير نصف شهرية'],
  },
  premier: {
    en: ['Everything in Growth', 'Dedicated strategy lead', 'Video content (Cinematic Production)', 'Weekly reporting'],
    ar: ['كل ما في النمو', 'قائد استراتيجية مخصص', 'محتوى فيديو (الإنتاج السينمائي)', 'تقارير أسبوعية'],
  },
}

const TIERS = [
  {
    id: 'essential',
    labelEn: 'ESSENTIAL',
    labelAr: 'الأساس',
    taglineEn: 'For businesses building a consistent presence.',
    taglineAr: 'للأعمال التي تبني حضوراً مستمراً.',
  },
  {
    id: 'growth',
    labelEn: 'GROWTH',
    labelAr: 'النمو',
    taglineEn: 'For businesses ready to scale.',
    taglineAr: 'للأعمال الجاهزة للتوسع.',
  },
  {
    id: 'premier',
    labelEn: 'PREMIER',
    labelAr: 'الريادة',
    taglineEn: 'Full-funnel marketing.',
    taglineAr: 'تسويق قاع قمع كامل.',
  },
]

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: urlLocale } = await params
  setRequestLocale(urlLocale)
  const isArabic = urlLocale === 'ar'

  const ctaLabel = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'
  const howItWorksLabel = isArabic ? 'كيف نعمل' : 'HOW IT WORKS'
  const capabilitiesLabel = isArabic ? 'ما نقدّمه' : 'CAPABILITIES'
  const plansLabel = isArabic ? 'اختر خطتك' : 'CHOOSE YOUR PLAN'
  const complianceLabel = isArabic ? 'مهمتنا' : 'OUR COMMITMENT'
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'

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
        <Link href={`/${urlLocale}`} style={{ color: 'inherit', textDecoration: 'none' }}>{homeLabel}</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-dim)' }}>
          {isArabic ? 'خدمات التسويق' : 'Marketing Services'}
        </span>
      </div>

      {/* Hero */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem) clamp(5rem, 10vw, 8rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? 'خدمات التسويق' : 'MARKETING SERVICES'}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: 'var(--color-text)', lineHeight: 1.0,
          letterSpacing: '0.01em', marginBottom: '1.5rem',
        }}>
          {isArabic
            ? 'ينمو أثرك شهرًا بعد شهر.'
            : 'Growth that compounds, month after month.'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.7,
          maxWidth: '560px', margin: '0 auto 2.5rem',
        }}>
          {isArabic
            ? 'من إدارة السوشيال ميديا إلى الإعلانات المدفوعة — نفهم ما يدفع الإيرادات فعلاً.'
            : 'From social media to performance ads — we focus on what actually drives revenue.'}
        </p>
        <a
          href={`/${urlLocale}#contact`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.875rem 2rem',
            background: 'var(--color-gold)', color: '#0A0A0B',
            fontFamily: 'var(--font-display)', fontSize: '0.8rem',
            letterSpacing: '0.1em', textDecoration: 'none',
            borderRadius: '9999px', fontWeight: 700,
          }}
        >
          <Phone size={16} color="#0A0A0B" strokeWidth={2.5} />
          {ctaLabel}
        </a>
      </section>

      {/* How It Works — FIX: locale-correct rendering per card */}
      <section style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '3rem', textAlign: 'center',
          }}>
            {howItWorksLabel}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {HOW_IT_WORKS.map((step, i) => (
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
        </div>
      </section>

      {/* Capabilities — 5 cards, no Email & SMS */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '3rem', textAlign: 'center',
        }}>
          {capabilitiesLabel}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {CAPABILITIES.map((cap, i) => (
            <div key={i} style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 'var(--body-sm)', color: 'var(--color-text)',
                marginBottom: '0.5rem',
              }}>
                {isArabic ? cap.ar : cap.en}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.6,
              }}>
                {isArabic ? cap.descAr : cap.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans — capability strip + three tier cards, centered, equal heights */}
      <section id="essential" style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '3rem', textAlign: 'center',
          }}>
            {plansLabel}
          </p>

          {/* Capability strip */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--body-sm)',
            color: 'var(--color-text-dim)',
            textAlign: 'center',
            marginBottom: '2.5rem',
            letterSpacing: '0.02em',
          }}>
            {isArabic
              ? 'إدارة وسائل التواصل · إنتاج المحتوى · إدارة الإعلانات المدفوعة · تحسين محركات البحث · التقارير الشهرية'
              : 'Social Media Management · Content Creation · Paid Ads Management · SEO · Monthly Reporting'}
          </p>

          {/* Three tier cards — grid with fixed min-height, equal columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}>
            {TIERS.map((tier) => {
              const deliverables = TIER_DELIVERABLES[tier.id as keyof typeof TIER_DELIVERABLES]
              const deliverablesList = isArabic ? deliverables.ar : deliverables.en
              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  style={{
                    padding: '2rem',
                    background: '#16161B',
                    border: '1px solid var(--color-card-border)',
                    borderRadius: 'var(--radius)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {/* Tier name */}
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    color: '#C9A24B',
                    letterSpacing: '0.02em',
                  }}>
                    {isArabic ? tier.labelAr : tier.labelEn}
                  </p>

                  {/* One-line positioning */}
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                    color: 'var(--color-text-dim)', lineHeight: 1.7,
                  }}>
                    {isArabic ? tier.taglineAr : tier.taglineEn}
                  </p>

                  {/* Deliverables list */}
                  <ul style={{
                    listStyle: 'none', padding: 0, margin: 0,
                    display: 'flex', flexDirection: 'column', gap: '0.625rem',
                    flex: 1,
                  }}>
                    {deliverablesList.map((item: string, idx: number) => (
                      <li key={idx} style={{
                        fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                        color: 'var(--color-text-dim)',
                        paddingLeft: isArabic ? 0 : '1rem',
                        paddingRight: isArabic ? '1rem' : 0,
                        borderLeft: isArabic ? 'none' : '2px solid var(--color-card-border)',
                        borderRight: isArabic ? '2px solid var(--color-card-border)' : 'none',
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA — always at card bottom */}
                  <a
                    href={`/${urlLocale}#contact`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                      padding: '0.75rem 1.5rem',
                      background: '#C9A24B', color: '#0A0A0B',
                      fontFamily: 'var(--font-display)', fontSize: '0.75rem',
                      letterSpacing: '0.1em', textDecoration: 'none',
                      borderRadius: '9999px', fontWeight: 700,
                      marginTop: 'auto',
                    }}
                  >
                    <Phone size={14} color="#0A0A0B" strokeWidth={2.5} />
                    {isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compliance block */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)', lineHeight: 1.8,
          maxWidth: '600px', margin: '0 auto',
        }}>
          {isArabic
            ? 'تعمل بريمييرا لايف وفق معايير المحتوى الخاصة بهيئة الإعلام المرئي والمسموع في المملكة العربية السعودية. نضمن التزام جميع المواد الإبداعية بالأنظمة المعمول بها.'
            : "Premiera Live operates in compliance with Saudi Arabia's advertising and content regulations. All creative materials are reviewed to meet regulatory standards before publishing."}
        </p>
      </section>

      {/* Our Services — internal linking map */}
      <section style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2rem',
        }}>
          {isArabic ? 'خدماتنا' : 'OUR SERVICES'}
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
          justifyContent: 'center',
        }}>
          {MARKETING_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${urlLocale}/marketing/${slug}`}
              style={{
                display: 'inline-block',
                padding: '0.5rem 1.25rem',
                background: '#16161B',
                border: '1px solid rgba(201,162,75,0.2)',
                borderRadius: '100px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'rgba(245,244,240,0.7)',
                textDecoration: 'none',
                textTransform: 'capitalize',
              }}
            >
              {getServiceLabel(slug, isArabic)}
            </Link>
          ))}
        </div>
      </section>

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
          {isArabic ? 'هل أنت مستعد للبدء؟' : 'READY TO GET STARTED?'}
        </h2>
        <ContactActions />
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)', marginTop: '1.5rem',
        }}>
          {isArabic ? 'نرد خلال يوم عمل واحد.' : 'Replies within one business day.'}
        </p>
      </section>
    </>
  )
}
