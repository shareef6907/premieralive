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
    title: isArabic
      ? 'شركة أفلام ومواقع ذكية في الخبر | بريمييرا لايف'
      : 'About Premiera Live | Film & AI Company in Al Khobar',
    description: isArabic
      ? 'بريمييرا لايف شركة إنتاج أفلام وبناء مواقع ذكية في الخبر — أفلام ومواقع وتطبيقات ومساعدات ذكية، كل شيء داخليًا.'
      : 'Film production and AI software company in Al Khobar — films, websites, apps, and AI assistants, all built in-house.',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${domain}/en/about`,
        'ar-SA': `${domain}/ar/about`,
        'x-default': `${domain}/en/about`,
      },
    },
    openGraph: {
      title: isArabic
        ? 'شركة أفلام ومواقع ذكية في الخبر | بريمييرا لايف'
        : 'About Premiera Live | Film & AI Company in Al Khobar',
      description: isArabic
        ? 'بريمييرا لايف شركة إنتاج أفلام وبناء مواقع ذكية في الخبر — أفلام ومواقع وتطبيقات ومساعدات ذكية، كل شيء داخليًا.'
        : 'Film production and AI software company in Al Khobar — films, websites, apps, and AI assistants, all built in-house.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'شركة أفلام ومواقع ذكية في الخبر | بريمييرا لايف'
        : 'About Premiera Live | Film & AI Company in Al Khobar',
      description: isArabic
        ? 'بريمييرا لايف شركة إنتاج أفلام وبناء مواقع ذكية في الخبر — أفلام ومواقع وتطبيقات ومساعدات ذكية، كل شيء داخليًا.'
        : 'Film production and AI software company in Al Khobar — films, websites, apps, and AI assistants, all built in-house.',
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
  const filmHubBodyEn = 'Commercial films, corporate videos, documentaries, professional photography, animation and CGI, event coverage, multi-cam live streaming, and podcast filming. Shot by our own crew on cinema cameras, edited in-house.'
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

  const filmPillarLabelEn = 'Read what film production with us involves'
  const filmPillarLabelAr = 'اقرأ تفاصيل إنتاج الأفلام معنا'
  const aiPillarLabelEn = 'See the AI software and platforms we build'
  const aiPillarLabelAr = 'اطّلع على المنصات والبرمجيات الذكية التي نبنيها'
  const guidePillarLabelEn = 'Read our guide to briefing a film production company'
  const guidePillarLabelAr = 'اقرأ دليلنا حول كيفية إعداد موجز المشروع للشركة المنتجة'
  const servicesHubLabelEn = 'Browse every service'
  const servicesHubLabelAr = 'تصفّح كل الخدمات'

  const whyBothHeadingEn = 'Why film and software sit in the same company'
  const whyBothIntroEn = 'Most businesses end up buying their film and their website from two suppliers who never speak to each other. The film gets approved, the site gets built, and then the two pieces argue — different words, different colours, different promises — because nobody was handed both at the same time. We work differently. The crew and the engineers sit on the same team, so the story and the platform it lives on are designed together, from the same brief and the same idea of what you are trying to say.'
  const whyBothHeadingAr = 'لماذا يجتمع الإنتاج السينمائي والبرمجيات في شركة واحدة'
  const whyBothIntroAr = 'تنتهي أغلب الشركات إلى شراء فيلمها وموقعها من مورّدين اثنين لا يتحدثان إلى بعضهما. فيُعتمد الفيلم، ويُبنى الموقع، ثم تختلف النسختان — كلمات مختلفة، وألوان مختلفة، ووعود مختلفة — لأن أحدًا لم يتسلّم القطعتين معًا. نعمل نحن بطريقة مختلفة. يجلس طاقم التصوير والمهندسون في فريق واحد، فتُصمَّم القصة والمنصة التي تعيش عليها من الموجز نفسه، ومن الفكرة نفسها عمّا تريد قوله.'
  const whyBothPointsEn = [
    { t: 'One brief, two outputs', d: 'The same brief, the same message hierarchy, and the same call to action flow through the film and the site. What the audience sees in the first ten seconds is what they can act on in the browser an hour later.' },
    { t: 'One point of accountability', d: 'When the campaign underperforms, there is a single company on the hook for why — not a film agency pointing at the media plan and a web agency pointing at the content. The cause and the fix sit in the same conversation.' },
    { t: 'One team that owns the whole path', d: 'A shoot in Riyadh, the edits, the captions, the landing page, and the assistant that answers the enquiries it generates — all handled by the group that already knows the material, rather than handed across a gap in a calendar.' },
    { t: 'One language across both', d: 'Arabic and English are handled in the same room, in the same workflow, for the film and for the software. Nothing gets translated twice, and nothing arrives half-finished because a language was not specified in the brief.' },
  ]
  const whyBothPointsAr = [
    { t: 'موجز واحد ومخرجان', d: 'ينتقل الموجز نفسه وترتيب الرسائل نفسه ومسار الدعوة إلى الإجراء نفسه بين الفيلم والموقع. فما يراه الجمهور في أول عشر ثوانٍ هو نفسه ما يمكنه فعله في المتصفح بعد ساعة.' },
    { t: 'مسؤولية واحدة', d: 'حين لا تحقق الحملة هدفها، تكون هناك شركة واحدة مسؤولة عن السبب — لا وكالة أفلام تحيل السبب إلى خطة الإعلام، ولا وكالة مواقع تحيله إلى المحتوى. السبب والإصلاح في المحادثة نفسها.' },
    { t: 'فريق واحد يملك المسار كاملًا', d: 'التصوير في الرياض، والمونتاج، والترجمة، والصفحة الهبوط، والمساعد الذي يردّ على الاستفسارات التي يولّدها — يتولاها الفريق الذي يعرف المادة أصلًا، بدل أن تنتقل بين فجوة في التقويم.' },
    { t: 'لغة واحدة في الجهتين', d: 'تُعالَج العربية والإنجليزية في الغرفة نفسها، وفي سير العمل نفسه، في الفيلم وفي البرمجيات. لا شيء يُترجم مرتين، ولا شيء يصل منجزًا إلى نصفه لأن لغة لم تُحدَّد في الموجز.' },
  ]
  const faqHeading = isArabic ? 'أسئلة يطرحها العملاء' : 'Questions clients ask us'
  const faqItems = [
    { q: 'Where is Premiera Live based, and do you work with clients outside Al Khobar?', a: 'Our base is in Al Khobar, in the Eastern Province. We work with businesses across the Kingdom — Riyadh, Jeddah, Dammam, Jubail, and the rest of Saudi Arabia — and our crews travel to the location rather than asking you to come to us.' },
    { q: 'Do you handle both the film and the website, or do I need two suppliers?', a: 'Both, in one company. The film crew and the engineering team sit under the same roof, so a launch film and the platform it lives on are built by the people accountable for the same outcome. You can also engage either side on its own if that is what the project needs.' },
    { q: 'Can you build a website that includes an AI assistant?', a: 'Yes. The AI assistant work is part of our digital practice rather than a product bolted on at the end. We build the assistant on your own material — your services, your policies, your written answers — and connect it to the tools you already run.' },
    { q: 'Do you work in Arabic and English?', a: 'Everything we deliver is bilingual. Films are edited and subtitled in both languages, and the websites, applications, and AI assistants we build are made to work in Arabic and English from the start — because most Saudi audiences use both in the same week.' },
    { q: 'How does a project start?', a: 'With a conversation about the outcome rather than the deliverable. We look at what you are trying to achieve, what you already have, and what is missing, then come back with a scope and a plan. You can brief us with a document, or start from a single message.' },
  ]
  const faqItemsAr = [
    { q: 'أين مقر بريمييرا لايف، وهل تعملون مع عملاء خارج الخبر؟', a: 'مقرنا الخبر في المنطقة الشرقية، وهي نقطة انطلاقنا لكل مشروع. ونعمل مع الشركات في أنحاء المملكة — الرياض وجدة والدمام والجبيل وبقية مناطق السعودية — وتنتقل طواقمنا إلى موقع المشروع بدل أن نطلب منكم القدوم إلينا. أي أن المدينة التي يعمل فيها عملك هي المدينة التي نصوّر فيها، لا المكان الذي نترك فيه المعدات.' },
    { q: 'هل تتولّون الفيلم والموقع معًا، أم أحتاج إلى مورّدين اثنين؟', a: 'كلاهما في شركة واحدة. فريق التصوير وفريق الهندسة تحت سقف واحد، فيُنتجان فيلم الإطلاق والمنصة التي سيعيش عليها بتحمّل مسؤولية النتيجة نفسها. بدايةً نبدأ من الهدف: ما الذي تريد أن يحدث بعد أن يرى الجمهور الفيلم أو يتصفّح الموقع، ومن ثم نحدّد المخرجات التي تخدم هذا الهدف — فيلم، أو موقع، أو الاثنين معًا. ويمكنك التعاقد مع أحدهما وحده إذا كان هذا ما يحتاجه مشروعك، دون أن نضيف ما لا تحتاجه.' },
    { q: 'هل تبون مواقع يتضمّن مساعدًا ذكيًا؟', a: 'نعم. عمل المساعد الذكي جزء من ممارستنا الرقمية، وليس منتجًا يُضاف في النهاية على حدة. نبني المساعد على مادتك أنت — خدماتك وسياساتك وإجاباتك المكتوبة — ثم نربطه بالأدوات التي تستخدمها اليوم مثل نظام تسجيل العملاء أو التقويم أو قنوات المراسلة التي يصل عبرها عملاؤك. النتيجة مساعد يعرف ملف عملك، ويجيب عن الأسئلة المتكررة بحدود واضحة، ويحوّل ما يحتاج شخصًا إلى إنسان. ونختبره على الأسئلة التي يصل فريقك فعلًا قبل إطلاقه.' },
    { q: 'هل تعملون بالعربية والإنجليزية؟', a: 'كل ما نسلّمه ثنائي اللغة. تُمونتج الأفلام وتُترجم في اللغتين، وتُبنى المواقع والتطبيقات والمساعدات الذكية لتعمل بالعربية والإنجليزية منذ البداية. ونكتب المحتوى ونصمم الواجهات بالعربية أصلًا لا كترجمة عن الإنجليزية، لأن معظم الجمهور السعودي يستخدم اللغتين في الأسبوع نفسه، والرسالة التي تقرؤها بالعربية تستحق أن تكون مصوغة بالعربية.' },
    { q: 'كيف يبدأ المشروع؟', a: 'بمحادثة حول النتيجة المطلوبة لا حول المخرجات. ننظر إلى ما تريد تحقيقه، وما لديك بالفعل، وما ينقصك، ثم نعود إليك بنطاق عمل وخطة. يمكنك أن تخبرنا بمستند، أو أن تبدأ برسالة واحدة. بعد ذلك نتفق على نطاق المشروع وما الذي يشمله وما الذي لا يشمله، حتى لا يختلف الطرفان على ما دار في النقاش.' },
  ]

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
            telephone: '+966****0235',
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

      {/* JSON-LD — FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: (isArabic ? faqItemsAr : faqItems).map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
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
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)', lineHeight: 1.15,
          letterSpacing: '0.01em', marginBottom: '1.5rem',
        }}>
          {storyHeading}
        </h2>
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
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)', lineHeight: 1.15,
          letterSpacing: '0.01em', marginBottom: '2.5rem',
        }}>
          {doHeading}
        </h2>
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

      {/* Why film and software sit in the same company */}
      <Section>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)', lineHeight: 1.15,
          letterSpacing: '0.01em', marginBottom: '1.5rem',
        }}>
          {isArabic ? whyBothHeadingAr : whyBothHeadingEn}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
          marginBottom: '2.5rem',
        }}>
          {isArabic ? whyBothIntroAr : whyBothIntroEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? whyBothPointsAr : whyBothPointsEn).map((item, i) => (
            <div key={i} style={{
              padding: '1.5rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-gold)',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
                letterSpacing: '0.01em',
              }}>
                {item.t}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {item.d}
              </p>
            </div>
          ))}
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
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)', lineHeight: 1.15,
          letterSpacing: '0.01em', marginBottom: '1.5rem',
        }}>
          {whereHeading}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? whereAr : whereEn}
        </p>
      </Section>

      {/* Related pages — internal links to the landing pages */}
      <Section>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)', lineHeight: 1.15,
          letterSpacing: '0.01em', marginBottom: '2rem',
        }}>
          {isArabic ? 'تعرّف علينا أكثر' : 'Get to know us further'}
        </h2>
        <ul style={{
          listStyle: 'none', padding: 0, margin: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          <li style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <Link
              href={`/${locale}/film-production-company-saudi-arabia`}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 'var(--body-sm)', color: 'var(--color-gold)',
                textDecoration: 'none', letterSpacing: '0.05em',
              }}
            >
              {isArabic ? filmPillarLabelAr : filmPillarLabelEn}
            </Link>
          </li>
          <li style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <Link
              href={`/${locale}/ai-websites-for-riyadh`}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 'var(--body-sm)', color: 'var(--color-gold)',
                textDecoration: 'none', letterSpacing: '0.05em',
              }}
            >
              {isArabic ? aiPillarLabelAr : aiPillarLabelEn}
            </Link>
          </li>
          <li style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <Link
              href={`/${locale}/how-to-brief-a-film-production-company`}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 'var(--body-sm)', color: 'var(--color-gold)',
                textDecoration: 'none', letterSpacing: '0.05em',
              }}
            >
              {isArabic ? guidePillarLabelAr : guidePillarLabelEn}
            </Link>
          </li>
          <li style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--color-card)',
            border: '1px solid var(--color-card-border)',
            borderRadius: 'var(--radius)',
          }}>
            <Link
              href={`/${locale}/services`}
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 'var(--body-sm)', color: 'var(--color-gold)',
                textDecoration: 'none', letterSpacing: '0.05em',
              }}
            >
              {isArabic ? servicesHubLabelAr : servicesHubLabelEn}
            </Link>
          </li>
        </ul>
      </Section>

      {/* FAQ */}
      <Section elevated>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)', lineHeight: 1.15,
          letterSpacing: '0.01em', marginBottom: '2.5rem',
        }}>
          {faqHeading}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '72ch' }}>
          {(isArabic ? faqItemsAr : faqItems).map((item, i) => (
            <div key={i} style={{
              padding: '1.5rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-body)', fontWeight: 600,
                fontSize: 'var(--body)', color: 'var(--color-text)',
                marginBottom: '0.75rem', lineHeight: 1.4,
              }}>
                {item.q}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
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
          color: 'var(--color-text)',
          lineHeight: 1.0,
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
