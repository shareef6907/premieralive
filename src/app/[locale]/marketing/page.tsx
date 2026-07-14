import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Marketing Services | Premiera Live',
  description: 'Strategic, creative marketing built to convert — from social media and performance ads to AI-powered lead automation. Serving Saudi Arabia and the Gulf.',
  alternates: {
    canonical: 'https://www.premieralive.com/en/marketing',
    languages: {
      en: 'https://www.premieralive.com/en/marketing',
      ar: 'https://www.premieralive.com/ar/marketing',
    },
  },
}

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
    en: 'AI Lead Automation',
    ar: 'أتمتة العملاء المحتملين بالذكاء الاصطناعي',
    descEn: 'WhatsApp AI captures, qualifies, and follows up with every lead — automatically, 24/7.',
    descAr: 'يلتقط مساعد واتساب الذكي كل عميل محتمل ويصنّفه ويتابعه تلقائياً، على مدار الساعة.',
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
    descEn: 'When something works, we scale it. When it doesn\'t, we stop it fast. No contracts that lock you in.',
    descAr: 'حين ينجح شيء، نوسّعه. وحين لا ينجح، نوقفه بسرعة. لا عقود تُقيّدك.',
  },
]

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
    en: 'WhatsApp AI',
    ar: 'واتساب الذكاء الاصطناعي',
    descEn: 'An AI assistant trained on your business that answers, qualifies, and books leads inside WhatsApp.',
    descAr: 'مساعد ذكي يُدرَّب على أعمالك يجيب ويصنّف ويحجز العملاء المحتملين داخل واتساب.',
  },
  {
    en: 'Email & SMS Marketing',
    ar: 'التسويق بالبريد والإس إم إس',
    descEn: 'Automated sequences that nurture leads and re-engage customers — in Arabic and English.',
    descAr: 'تسلسلات آلية تُربّي العملاء المحتملين وإعادة تفاعل العملاء — بالعربية والإنجليزية.',
  },
  {
    en: 'Analytics & Reporting',
    ar: 'التحليل والتقارير',
    descEn: 'A real-time dashboard showing traffic, leads, conversions, and revenue per channel — updated daily.',
    descAr: 'لوحة معلومات فورية تعرض الزيارات والعملاء المحتملين والتحويلات والإيرادات لكل قناة — محدّثة يومياً.',
  },
]

const TIERS = [
  {
    id: 'essential',
    labelEn: 'Essential',
    labelAr: 'الأساسية',
    priceEn: 'From AED 9,500/month',
    priceAr: 'يبدأ من ٩٫٥٠٠ درهم/شهرياً',
    taglineEn: 'Everything you need to show up professionally and start generating leads.',
    taglineAr: 'كل ما تحتاجه لتظهر بشكل احترافي وتبدأ في استقطاب العملاء.',
    itemsEn: [
      'Social media management (2 platforms)',
      '12 pieces of content per month',
      'Basic performance ads (AED 5K budget managed)',
      'WhatsApp AI lead assistant',
      'Monthly performance report',
    ],
    itemsAr: [
      'إدارة وسائل التواصل (منصتان)',
      '١٢ قطعة محتوى شهرياً',
      'إعلانات أدائية أساسية (إدارة ميزانية ٥ آلاف درهم)',
      'مساعد ذكي على واتساب لاستقطاب العملاء',
      'تقرير أداء شهري',
    ],
  },
  {
    id: 'growth',
    labelEn: 'Growth',
    labelAr: 'النمو',
    priceEn: 'From AED 19,500/month',
    priceAr: 'يبدأ من ١٩٫٥٠٠ درهم/شهرياً',
    taglineEn: 'Full-funnel marketing with paid ads at scale and a dedicated content studio.',
    taglineAr: 'تسويق قاع قمع كامل مع إعلانات مدفوعة بالتوسع واستوديو محتوى مخصص.',
    itemsEn: [
      'Everything in Essential',
      'Social media management (4 platforms)',
      '24 pieces of content per month',
      'Advanced performance ads (AED 15K budget managed)',
      'Email & SMS automation',
      'Bi-weekly strategy calls',
    ],
    itemsAr: [
      'كل ما في الأساسية',
      'إدارة وسائل التواصل (٤ منصات)',
      '٢٤ قطعة محتوى شهرياً',
      'إعلانات أدائية متقدمة (إدارة ميزانية ١٥ ألف درهم)',
      'أتمتة البريد الإلكتروني والإس إم إس',
      'مكالمات استراتيجية نصف أسبوعية',
    ],
  },
  {
    id: 'premier',
    labelEn: 'Premier',
    labelAr: 'بريميير',
    priceEn: 'Custom pricing',
    priceAr: 'تسعير مخصص',
    taglineEn: 'A full in-house marketing team — without the overhead. For brands that are serious about growth.',
    taglineAr: 'فريق تسويق داخلي كامل — بلا تكاليف ثابتة. للعلامات الجادة في النمو.',
    itemsEn: [
      'Everything in Growth',
      'Full content studio (film, photo, design)',
      'Unlimited content pieces',
      'Unlimited ad budget managed',
      'Custom AI systems & automations',
      'Dedicated account manager',
      'Weekly reporting & strategy',
    ],
    itemsAr: [
      'كل ما في النمو',
      'استوديو محتوى كامل (فيلم وتصوير وتصميم)',
      'قطع محتوى غير محدودة',
      'إدارة ميزانية إعلانية غير محدودة',
      'أنظمة وأتمتة ذكاء اصطناعي مخصصة',
      'مدير حساب مخصص',
      'تقارير واستراتيجية أسبوعية',
    ],
  },
]

function SaudiFlag() {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <rect width="20" height="14" fill="#006C35" />
      <rect x="0" y="3.5" width="20" height="1.4" fill="white" />
      <rect x="0" y="7" width="20" height="1.4" fill="white" />
      <rect x="0" y="10.5" width="20" height="1.4" fill="white" />
      <text x="1.5" y="10.5" fontSize="6" fill="#006C35" fontWeight="bold">الله</text>
    </svg>
  )
}

export default async function MarketingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = await getLocale()
  const isArabic = locale === 'ar'

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP ?? '966500000000'
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(
    isArabic ? 'أرغب في مناقشة خدمات التسويق.' : 'Hi, I\'d like to discuss your marketing services.'
  )}&type=phone_number&app_absent=0`

  const ctaLabel = isArabic ? 'احجز جلسة استراتيجية' : 'BOOK A STRATEGY SESSION'
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
        <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>{homeLabel}</Link>
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
            ? 'نبني تسويقاً يعمل فعلاً — استراتيجي ومبدع ومبني لزيادة التحويل.'
            : 'We build marketing that actually works — strategic, creative, and built to convert.'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.7,
          maxWidth: '560px', margin: '0 auto 2.5rem',
        }}>
          {isArabic
            ? 'من إدارة السوشيال ميديا إلى الإعلانات المدفوعة ومساعد واتساب الذكي — نفهم ما يدفع الإيرادات فعلاً.'
            : 'From social media to performance ads and WhatsApp AI — we focus on what actually drives revenue.'}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2rem',
            background: 'var(--color-gold)', color: '#0A0A0B',
            fontFamily: 'var(--font-display)', fontSize: '0.8rem',
            letterSpacing: '0.1em', textDecoration: 'none',
            borderRadius: '9999px', fontWeight: 700,
          }}
        >
          <SaudiFlag />
          {ctaLabel}
        </a>
      </section>

      {/* How It Works */}
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
                  {String(i + 1).padStart(2, '0')} — {isArabic ? step.en : step.ar}
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

      {/* Capabilities */}
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

      {/* Plans */}
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}>
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                id={tier.id}
                style={{
                  padding: '2rem',
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-card-border)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontWeight: 600,
                    fontSize: 'var(--body)', color: 'var(--color-text)',
                    marginBottom: '0.25rem',
                  }}>
                    {isArabic ? tier.labelAr : tier.labelEn}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    color: 'var(--color-gold)',
                    marginBottom: '0.75rem',
                  }}>
                    {isArabic ? tier.priceAr : tier.priceEn}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                    color: 'var(--color-text-dim)', lineHeight: 1.6,
                  }}>
                    {isArabic ? tier.taglineAr : tier.taglineEn}
                  </p>
                </div>
                <ul style={{
                  listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: '0.625rem',
                }}>
                  {(isArabic ? tier.itemsAr : tier.itemsEn).map((item, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
                      fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                      color: 'var(--color-text-dim)', lineHeight: 1.5,
                    }}>
                      <span style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '0.1em' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--color-gold)', color: '#0A0A0B',
                    fontFamily: 'var(--font-display)', fontSize: '0.75rem',
                    letterSpacing: '0.1em', textDecoration: 'none',
                    borderRadius: '9999px', fontWeight: 700,
                    marginTop: '0.5rem',
                  }}
                >
                  {isArabic ? 'احجز جلسة' : 'BOOK A CALL'}
                </a>
              </div>
            ))}
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
            ? 'تعمل بريميرا لايف وفق معايير المحتوى الخاصة بهيئة الإعلام المرئي والمسموع في المملكة العربية السعودية. نضمن التزام جميع المواد الإبداعية بالأنظمة المعمول بها.'
            : 'Premiera Live operates in compliance with Saudi Arabia\'s Saudi Media Quality Certification requirements. All creative materials are reviewed to meet regulatory standards.'}
        </p>
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
          }}
        >
          <SaudiFlag />
          {isArabic ? 'ابدأ عبر واتساب' : 'Start on WhatsApp'}
        </a>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
          color: 'var(--color-text-faint)', marginTop: '1rem',
        }}>
          {isArabic ? 'نرد خلال يوم عمل واحد.' : 'Replies within one business day.'}
        </p>
      </section>
    </>
  )
}
