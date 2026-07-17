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
  const whatWeHandleLabel = isArabic ? 'ما الذي ندير له' : 'WHAT WE HANDLE'
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
            ? 'تتلاشى الحملات المتفرقة سريعًا. نعمل بنظام الاشتراك الشهري لأن نتائج التسويق الحقيقية تأتي من الاستمرارية — ننشر ونختبر ونحسّن كل شهر. تحصل على فريق يعرف علامتك، وخطة توافق عليها مسبقًا، وأرقام تحاسبنا عليها.'
            : "One-off campaigns fade. We work on monthly retainers because real marketing results come from consistency — publishing, testing, and improving every single month. You get a team that knows your brand, a plan you approve in advance, and numbers you can hold us to."}
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

      {/* Section 2 — Why most marketing fails here */}
      <section style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '1.5rem',
          }}>
            {isArabic ? 'ما نقدم' : 'WHAT WE DO'}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-text)', lineHeight: 1.0,
            letterSpacing: '0.01em', marginBottom: '2.5rem',
          }}>
            {isArabic
              ? 'لماذا يفشل معظم التسويق هنا'
              : 'Why most marketing fails here.'}
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
            color: 'var(--color-text-dim)', lineHeight: 1.7,
            marginBottom: '3rem',
            maxWidth: '600px',
          }}>
            {isArabic
              ? 'تكسر ثلاثة أشياء التسويق لدى الشركات السعودية، وتتكرر هي نفسها في كل مرة تقريبًا.'
              : 'Three things break marketing for Saudi businesses, and it is almost always the same three.'}
          </p>

          {/* Three failure blocks */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Block 1 */}
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
                {isArabic
                  ? 'لا يصل المحتوى أبدًا.'
                  : 'The content never comes.'}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {isArabic
                  ? 'تُعتمد الاستراتيجية، وتُبنى الروزنامة، ثم يجب أن يصوّر أحدهم شيئًا فعلًا. ترسل الوكالة بريفًا لمصوّر مستقل، ويكون مشغولًا، فيتأخر التصوير أسبوعين، وتُطلق الحملة بلقطات أرشيفية وشعار ممدود.'
                  : 'The strategy gets approved. The calendar gets built. Then someone has to actually shoot something. The agency briefs a freelancer, the freelancer is busy, the shoot slips two weeks, and the campaign launches with stock footage and a stretched logo.'}
              </p>
            </div>

            {/* Block 2 */}
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
                {isArabic
                  ? 'تُترجم العربية ولا تُكتب.'
                  : 'The Arabic is translated.'}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {isArabic
                  ? 'تُقرأ التعليقات المكتوبة بالإنجليزية ثم الممرّرة على مترجم كما هي بالضبط. يلاحظ الجمهور السعودي ذلك من السطر الأول، ويمرّر. لا تكون العربية إعدادًا تشغّله في النهاية — بل هي المكان الذي تبدأ منه الكتابة.'
                  : "Captions written in English and pushed through a translator read exactly like that. Saudi audiences notice in the first line, and they scroll. Arabic is not a setting you switch on at the end — it is where the writing starts."}
              </p>
            </div>

            {/* Block 3 */}
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
                {isArabic
                  ? 'لا أحد يملك السلسلة كاملة.'
                  : "Nobody owns the whole chain."}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {isArabic
                  ? 'تدير وكالة الإعلانات، وتبني أخرى الموقع، وتنتج ثالثة المحتوى. وحين لا يتحوّل العملاء المحتملون، يلوم كل طرف الطرفين الآخرين — وتدفع أنت ثمن الجدال.'
                  : "One agency runs the ads. Another built the website. A third makes the content. When the leads do not convert, all three blame the other two — and you pay for the argument."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — What we do differently */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        maxWidth: '80rem', margin: '0 auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? 'ما نقدم' : 'WHAT WE DO'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: 'var(--color-text)', lineHeight: 1.0,
          letterSpacing: '0.01em', marginBottom: '3rem',
        }}>
          {isArabic
            ? 'ما الذي نفعله بشكل مختلف'
            : 'What we do differently.'}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Card 1 */}
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
              {isArabic
                ? 'نحن شركة أفلام تدير التسويق أيضًا.'
                : 'We are a film company that also runs marketing.'}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
            }}>
              {isArabic
                ? 'ينتج محتواك الفريق نفسه الذي يصوّر أفلامًا تجارية لعلامات عالمية — أكثر من 15 عامًا، وأكثر من 1,000 مشروع، وأكثر من 20 علامة عالمية. لا نرسل بريفًا لمصوّر مستقل ونتمنى. نصوّره بأنفسنا. وحين يستهلك المحتوى نفسه في الأسبوع الثالث، نصوّر المزيد. يُصوَّر معظم محتوى التواصل في هذا السوق بهاتف على يد متدرب. ولا يلزم أن يكون محتواك كذلك.'
                : "Your content is produced by the same crew that shoots commercial films for global brands — 15+ years, 1,000+ projects, 20+ global brands. We do not brief a freelancer and hope. We shoot it ourselves. And when creative fatigues in week three, we shoot more. Most social content in this market is filmed on a phone by an intern. Yours does not have to be."}
            </p>
          </div>

          {/* Card 2 */}
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
              {isArabic
                ? 'نبني الموقع الذي تصل إليه النقرة.'
                : 'We build the website the ad lands on.'}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
            }}>
              {isArabic
                ? 'تتوقف معظم الوكالات عند النقرة. نشغّل أكثر من 25 منصة خاصة بنا — بنيناها ورتّبناها وندير تشغيلها، حيث لا يوجد عميل نلومه. وحين تكون صفحة الهبوط هي العائق، وهي كذلك غالبًا، نصلحها بدل أن نكتب عنها تقريرًا وننتظر مطوّر شخص آخر.'
                : "Most agencies stop at the click. We run 25+ platforms of our own — built, ranked, and operated by us, where there was no client to blame. When your landing page is the bottleneck, and it usually is, we fix it instead of writing it up in a report and waiting on someone else's developer."}
            </p>
          </div>

          {/* Card 3 */}
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
              {isArabic
                ? 'نكتب بالعربية، لا إليها.'
                : 'We write in Arabic, not into it.'}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
            }}>
              {isArabic
                ? 'نكتب كل تعليق وإعلان وصفحة أصالةً بالعربية والإنجليزية. استعلامات مختلفة، ونية مختلفة، وإيقاع مختلف. لا يمر شيء على مترجم. وحين يكون جمهورك ثنائي اللغة، نكتب النسختين من الصفر.'
                : "Every caption, ad, and page is written natively in Arabic and English. Different queries, different intent, different rhythm. Nothing goes through a translator. Where your audience is bilingual, both versions are written from scratch."}
            </p>
          </div>

          {/* Card 4 */}
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
              {isArabic
                ? 'نصمّم الالتزام من البداية، ولا نراجعه في النهاية.'
                : 'Compliance is designed in, not checked at the end.'}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
              color: 'var(--color-text-dim)', lineHeight: 1.7,
            }}>
              {isArabic
                ? 'نخطط كل إنتاج وفق معايير الإعلان في المملكة من مرحلة قائمة اللقطات — لباس محتشم، وبلا استعراض للثراء، وبلا أطفال في المحتوى الترويجي، وبلا ادعاءات لا نستطيع إثباتها. ننفّذ التعاون مع صنّاع المحتوى حصريًا عبر مرخّصين في منصة موثوق. نقدّم تسويقًا ينمّي علامتك — ويحميها.'
                : "Every production is planned to Saudi advertising standards from the shot list stage — modest dress, no wealth flaunting, no children in promotional content, no claims we cannot support. Creator collaborations run exclusively through Mawthooq-licensed talent. Marketing that grows your brand — and protects it."}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — What we handle (7 service link cards) */}
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
            {whatWeHandleLabel}
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
        </div>
      </section>

      {/* Section 5 — How It Works */}
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
      </section>

      {/* Section 6 — Retainers, not projects */}
      <section style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-text)', lineHeight: 1.0,
            letterSpacing: '0.01em', marginBottom: '1.5rem',
          }}>
            {isArabic
              ? 'اشتراكات شهرية، لا مشاريع متفرقة'
              : 'Retainers, not projects.'}
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--body)',
            color: 'var(--color-text-dim)', lineHeight: 1.7,
            maxWidth: '560px', margin: '0 auto 2rem',
          }}>
            {isArabic
              ? 'نعمل بثلاث باقات — الأساس والنمو والريادة. كل واحدة نظام متكامل لا قائمة مهام. ويعتمد أين تبدأ على موضع عملك اليوم، ونحدده معك في مكالمة.'
              : 'We work in three tiers — Foundation, Growth, and Scale. Each one is a complete system rather than a list of tasks. Where you start depends on where your business is today, and we work that out together on a call.'}
          </p>
          <Link
            href={`/${urlLocale}/marketing/marketing-packages-saudi`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              background: 'transparent',
              border: '1px solid var(--color-gold)',
              color: 'var(--color-gold)',
              fontFamily: 'var(--font-display)', fontSize: '0.8rem',
              letterSpacing: '0.1em', textDecoration: 'none',
              borderRadius: '9999px', fontWeight: 700,
            }}
          >
            {isArabic ? 'اطّلع على الباقات' : 'See the packages'}
          </Link>
        </div>
      </section>

      {/* Section 7 — Final CTA */}
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
