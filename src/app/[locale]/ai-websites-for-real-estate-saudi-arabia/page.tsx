import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-real-estate-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي للعقار في السعودية | بريمييرا لايف'
      : 'AI Websites for Real Estate in Saudi Arabia | Premiera Live',
    description: isArabic
      ? 'نبني مواقع عقارية ثنائية اللغة مدعومة بالذكاء الاصطناعي لشركات التطوير والوساطة في السعودية — بحث عقاري ذكي وتوصيات ووكلاء محادثة ومحتوى تلقائي.'
      : 'We build bilingual, AI-powered real estate websites for developers and brokers in Saudi Arabia — intelligent property search, recommendations, automated content, and lead qualification built in.',
    alternates: {
      canonical,
      languages: {
        'en-SA': `${DOMAIN}/en/${PATH}`,
        'ar-SA': `${DOMAIN}/ar/${PATH}`,
        'x-default': `${DOMAIN}/en/${PATH}`,
      },
    },
    openGraph: {
      title: isArabic
        ? 'مواقع ذكاء اصطناعي للعقار في السعودية | بريمييرا لايف'
        : 'AI Websites for Real Estate in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'نبني مواقع عقارية ثنائية اللغة مدعومة بالذكاء الاصطناعي لشركات التطوير والوساطة في السعودية — بحث ذكي ووكلاء محادثة ومحتوى تلقائي.'
        : 'We build bilingual, AI-powered real estate websites for developers and brokers in Saudi Arabia — intelligent search, chat assistants, and automated property content built in.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي للعقار في السعودية | بريمييرا لايف'
        : 'AI Websites for Real Estate in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'نبني مواقع عقارية ثنائية اللغة مدعومة بالذكاء الاصطناعي لشركات التطوير والوساطة في السعودية.'
        : 'Bilingual, AI-driven real estate websites for developers and brokers across Saudi Arabia.',
    },
  }
}

export default async function AIWebsitesRealEstatePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'مواقع ذكاء اصطناعي للعقار في السعودية' : 'AI Websites for Real Estate in Saudi Arabia'

  const h1En = 'AI Websites for Real Estate in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي للعقار في السعودية'

  const heroEn =
    'Premiera Live builds bilingual, AI-powered websites for real estate developers and brokers in Saudi Arabia. The sites we ship are not generic templates with a chatbot widget bolted on — they are built around the way property is actually searched, qualified, and closed in the Kingdom: bilingual Arabic and English, intelligent property search that understands natural language, lead qualification that works in WhatsApp and on the website, and automated property descriptions generated from your project data. The same team designs, builds, integrates the AI layer, and launches it from our base in the Eastern Province.'
  const heroAr =
    'تبني بريمييرا لايف مواقع ثنائية اللغة مدعومة بالذكاء الاصطناعي لشركات تطوير العقارات والوسطاء في السعودية. ليست المواقع التي نشحنها قوالب جاهزة مع ودجت دردشة مُلحَق بها — بل تُبنى حول الطريقة التي يُبحث بها العقار فعلًا ويُؤهَّل ويُغلق في المملكة: ثنائية اللغة بالعربية والإنجليزية، بحث عقاري ذكي يفهم اللغة الطبيعية، تأهيل يعمل في واتساب وعلى الموقع، وأوصاف عقارية تلقائية تُولَّد من بيانات مشروعك. يتولى الفريق المسؤول نفسه التصميم والبناء وتكامل طبقة الذكاء الاصطناعي والإطلاق من قاعدتنا في المنطقة الشرقية.'

  const whyHeadingEn = 'Why real estate sites in Saudi need AI now'
  const whyHeadingAr = 'لماذا تحتاج المواقع العقارية في السعودية إلى الذكاء الاصطناعي الآن'

  const whyEn =
    'The Saudi property market has changed more in three years than in the previous fifteen. Buyers and renters are not browsing — they are asking. They ask the project page, they ask the broker on a call, they ask the WhatsApp number, and they ask again in English to a colleague. A static listing site that was good enough in 2019 cannot answer those questions today. AI does three specific jobs in a Saudi real estate site that no template does well. First, it lets a buyer ask in their own words — in Arabic or English — and get the right shortlist, instead of fighting filters that assume a Western buyer profile. Second, it qualifies the lead while the broker is asleep — answering the questions a Saudi buyer always asks first (location, developer, payment plan, handover date, master plan, schools) and only routing the serious enquiries to a human. Third, it produces and updates the property content at the speed projects actually launch — new towers, new phases, new off plan releases — without your team writing a fresh description every Friday night.'
  const whyAr =
    'تغيّر السوق العقاري السعودي في ثلاث سنوات أكثر مما تغيّر في خمس عشرة سنة سابقة. لم يعد المتسوّق يتصفح — بل يسأل. يسأل صفحة المشروع، ويسأل الوسيط في المكالمة، ويسأل رقم واتساب، ويعود للسؤال بالإنجليزية لزميل. لا يستطيع موقع قوائم ثابت كان كافيًا في 2019 الإجابة على هذه الأسئلة اليوم. يؤدي الذكاء الاصطناعي ثلاث مهام محددة في موقع عقاري سعودي لا يؤديها أي قالب بشكل جيد. أولًا، يتيح للمشتري أن يسأل بكلماته — بالعربية أو الإنجليزية — ويحصل على قائمة مختصرة صحيحة، بدل أن يصطدم بفلاتر تفترض ملف مشتري غربي. ثانيًا، يؤهّل العميل المحتمل بينما الوسيط نائم — يجيب عن الأسئلة التي يسألها المشتري السعودي أولًا دومًا (الموقع والمطور وخطة الدفع وتاريخ التسليم والمخطط العام والمدارس) ولا يحوّل إلا الاستفسارات الجادة إلى شخص. ثالثًا، ينتج ويحدّث المحتوى العقاري بالسرعة التي تُطلق بها المشاريع فعلًا — أبراج جديدة ومراحل جديدة وإصدارات على الخارطة — دون أن يكتب فريقك وصفًا جديدًا كل ليلة جمعة.'

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'Natural-language property search',
      body: 'A search bar that understands queries written in full sentences — "three-bedroom apartment in north Riyadh with a maid room and a balcony" — and returns a real shortlist from your inventory, with the filters the buyer actually meant.',
    },
    {
      title: 'Bilingual AI assistant',
      body: 'A trained assistant on your website that answers the project, payment plan, handover, and amenities questions in Arabic and English, with the tone of your brand and the accuracy of your team.',
    },
    {
      title: 'WhatsApp and web lead qualification',
      body: 'The assistant runs on the website and on WhatsApp, qualifies the enquiry, books a viewing or callback, and only hands serious leads to your sales team with full context.',
    },
    {
      title: 'Automated property descriptions',
      body: 'Project descriptions, tower brochures, and unit-level descriptions generated from your master plan and unit data — produced in both languages, ready for the site and for ad campaigns.',
    },
    {
      title: 'Project microsites',
      body: 'Dedicated microsites for new launches and giga-project phases — built and launched quickly, with their own search, AI assistant, and lead flow, linked back to the main platform.',
    },
    {
      title: 'Integrations that real estate uses',
      body: 'CRM, payment-plan calculators, viewing schedulers, developer APIs, and property-data feeds integrated so leads, units, and conversations stay connected to your sales process.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'بحث عقاري باللغة الطبيعية',
      body: 'شريط بحث يفهم الاستفسارات المكتوبة بجمل كاملة — "شقة ثلاث غرف في شمال الرياض مع غرفة خادمة وشرفة" — ويعيد قائمة مختصرة حقيقية من عقاراتك، بالفلاتر التي قصدها المشتري فعلًا.',
    },
    {
      title: 'مساعد ذكي ثنائي اللغة',
      body: 'مساعد مدرَّب على موقعك يجيب عن أسئلة المشروع وخطة الدفع والتسليم والمرافق بالعربية والإنجليزية، بنبرة علامتك ودقة فريقك.',
    },
    {
      title: 'تأهيل العملاء عبر واتساب والويب',
      body: 'يعمل المساعد على الموقع وعلى واتساب، ويؤهّل الاستفسار ويحجز معاودة أو زيارة، ولا يحوّل إلا العملاء الجادين إلى فريق المبيعات بسياق كامل.',
    },
    {
      title: 'أوصاف عقارية أوتوماتيكية',
      body: 'أوصاف المشروع وكوشات الأبراج وأوصاف الوحدات تُولَّد من المخطط العام وبيانات الوحدات — تُنتج باللغتين، جاهزة للموقع وللحملات الإعلانية.',
    },
    {
      title: 'مواقع microsites للمشاريع',
      body: 'مواقع microsites مخصصة للإطلاقات الجديدة ومراحل المشاريع العملاقة — تُبنى وتُطلق بسرعة، ببحث خاص ومساعد ذكي وتدفق عملاء، مرتبطة بالمنصة الرئيسية.',
    },
    {
      title: 'تكاملات يستخدمها القطاع العقاري',
      body: 'تكامل مع CRM وحاسبات خطة الدفع وجدولة المعاينات وواجهات المطورين وتغذية بيانات العقارات كي تبقى العملاء والوحدات والمحادثات متصلة بعملية المبيعات لديك.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn =
    'We build these sites for Saudi developers, brokers, and mixed-use project marketing teams. Residential developers launching towers and master-planned communities use the platform to handle enquiry volume across Arabic and English. Commercial and mixed-use developers use it to qualify tenant leads before routing to leasing. Brokerages use it to scale their agents without scaling headcount. And for the teams behind giga-project marketing — Diriyah, Roshn, NEOM-aligned developments, and the major Riyadh compounds — the same architecture is what makes a bilingual microsite launchable in days, not months.'
  const fitAr =
    'نبني هذه المواقع للمطورين والوسطاء وفرق تسويق المشاريع متعددة الاستخدامات في السعودية. يستخدمها المطورون السكنيون الذين يطلقون أبراجًا ومجتمعات مخططة لإدارة حجم الاستفسارات بالعربية والإنجليزية. ويستخدمها المطورون التجاريون ومتعددو الاستخدامات لتأهيل العملاء قبل التحويل إلى التأجير. وتستخدمها في الظاهرات لإعداد وكيل مستقل دون زيادة عدد الموظفين. وللفرق التي تقف خلف تسويق المشاريع العملاقة — الدرعية وروشن والتطورات المرتبطة بنيوم والمجمعات الكبرى في الرياض — فإن الهندسة نفسها هي التي تجعل إطلاق microsite ثنائي اللغة ممكنًا في أيام لا أشهر.'

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Discovery and inventory review',
      body: 'We sit with your sales and marketing teams to understand the inventory, the lead flow, and the questions buyers actually ask. The AI is only as good as the data and the brief behind it.',
    },
    {
      step: 'Information architecture and AI scope',
      body: 'We design the site map, the search behaviour, the assistant scope, and the integration points with your CRM and your data feeds — agreed before any code is written.',
    },
    {
      step: 'Design and front-end build',
      body: 'Bilingual design system, project pages, search interface, and assistant UI — built mobile-first, because most Saudi buyers first meet your project on a phone.',
    },
    {
      step: 'AI training and integration',
      body: 'The assistant is trained on your project content, FAQ, payment plans, and inventory data. WhatsApp and CRM integration is wired in alongside it, not after.',
    },
    {
      step: 'Launch, monitor, refine',
      body: 'We launch with monitoring in place, review the first weeks of real conversations, and refine the assistant’s answers, the search ranking, and the qualification logic based on what buyers actually do.',
    },
  ]
  const processAr = [
    {
      step: 'الاكتشاف ومراجعة المخزون',
      body: 'نجلس مع فريقي المبيعات والتسويق لفهم المخزون وتدفق العملاء والأسئلة التي يسألها المشترون فعلًا. الذكاء الاصطناعي لا يكون أفضل من البيانات والاستبيان خلفه.',
    },
    {
      step: 'هندسة المعلومات ونطاق الذكاء الاصطناعي',
      body: 'نصمم خريطة الموقع وسلوك البحث ونطاق المساعد ونقاط التكامل مع CRM وتغذية البيانات — نتفق عليها قبل كتابة أي سطر.',
    },
    {
      step: 'التصميم وبناء الواجهة الأمامية',
      body: 'نظام تصميم ثنائي اللغة وصفحات المشاريع وواجهة البحث وواجهة المساعد — تُبنى أولًا للهاتف، لأن معظم المشترين السعوديين يقابلون مشروعك أولًا على الجوال.',
    },
    {
      step: 'تدريب الذكاء الاصطناعي والتكامل',
      body: 'يُدرَّب المساعد على محتوى مشروعك والأسئلة الشائعة وخطط الدفع وبيانات المخزون. ويُربط تكامل واتساب وCRM في الوقت نفسه لا بعده.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body: 'نطلق الموقع مع المراقبة، ونراجع الأسابيع الأولى من المحادثات الفعلية، ونحسّن إجابات المساعد وترتيب البحث ومنطق التأهيل بناءً على ما يفعله المشترون فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn =
    'The site is built on a modern web stack that your team can manage after handover. The assistant layer is configured, not coded from scratch each time — which is what lets a new project microsite go live in days. The same platform pattern works whether your inventory lives in a developer CRM, a brokerage system, or a spreadsheet that your sales team actually uses. We do not lock your content into a closed CMS. Your team gets a content management system they can run, with the AI layer running on top as a service that is reviewed and refined with us on an ongoing basis.'
  const stackAr =
    'يُبنى الموقع على مكدس ويب حديث يستطيع فريقك إدارته بعد التسليم. تُكوَّن طبقة المساعد ولا تُكتب من الصفر في كل مرة — وهذا ما يتيح إطلاق microsite مشروع جديد في أيام. يعمل نمط المنصة نفسه سواء كان مخزونك في CRM مطور أو نظام وساطة أو جدول بيانات يستخدمه فريق المبيعات فعلًا. لا نقفل محتواك في نظام إدارة محتوى مغلق. يحصل فريقك على نظام إدارة محتوى يستطيع تشغيله، مع طبقة ذكاء اصطناعي تعمل فوقه كخدمة نراجعها ونحسّنها معك بشكل مستمر.'

  const faqData = [
    {
      qEn: 'Is the AI assistant trained on our specific projects?',
      aEn: 'Yes — we train it on your project content, payment plans, unit data, FAQ, and tone of voice. Generic assistants that know nothing about your inventory are not what we build.',
      qAr: 'هل يُدرَّب المساعد الذكي على مشاريعنا المحددة؟',
      aAr: 'نعم — ندرّبه على محتوى مشروعك وخطط الدفع وبيانات الوحدات والأسئلة الشائعة ونبرة صوتك. لا نبني مساعدين عامين لا يعرفون شيئًا عن مخزونك.',
    },
    {
      qEn: 'Does the site work in Arabic and English?',
      aEn: 'Yes — bilingual Arabic and English is built in as standard, with full RTL support, Arabic voice search, and Arabic-language training data for the assistant.',
      qAr: 'هل يعمل الموقع بالعربية والإنجليزية؟',
      aAr: 'نعم — ثنائية اللغة العربية والإنجليزية مبنية كأساس، مع دعم كامل للـ RTL والبحث الصوتي بالعربية وبيانات تدريب عربية للمساعد.',
    },
    {
      qEn: 'How does it integrate with our CRM and WhatsApp?',
      aEn: 'We integrate with the CRMs commonly used by Saudi developers and brokerages, and we configure the assistant to qualify and route into your existing WhatsApp Business setup. The architecture is designed around what your sales team actually uses.',
      qAr: 'كيف يتكامل مع CRM وواتساب لدينا؟',
      aAr: 'نتكامل مع أنظمة CRM الشائعة التي يستخدمها المطورون والوسطاء في السعودية، ونُعدّ المساعد لتأهيل العملاء وتوجيههم إلى إعداد واتساب بزنس القائم لديك. تُصمَّم الهندسة حول ما يستخدمه فريق المبيعات فعلًا.',
    },
    {
      qEn: 'How long does a build like this take?',
      aEn: 'A focused project microsite is typically launched within a few weeks. A full developer or brokerage platform — bilingual, with AI assistant, CRM integration, and project microsites — runs on a longer timeline scoped to inventory size and integration depth.',
      qAr: 'كم يستغرق بناء كهذا؟',
      aAr: 'يُطلق microsite مشروع مركّز عادةً خلال أسابيع قليلة. أما منصة مطور أو وساطة كاملة — ثنائية اللغة مع مساعد ذكي وتكامل CRM ومواقع microsites للمشاريع — فتسير على جدول أطول يُحدَّد وفق حجم المخزون وعمق التكامل.',
    },
    {
      qEn: 'Can the assistant handle off-plan and ready properties differently?',
      aEn: 'Yes — the assistant is configured to differentiate between off-plan inventory (with payment-plan logic, master-plan context, and handover information) and ready stock (with viewing availability and move-in details).',
      qAr: 'هل يستطيع المساعد التعامل مع العقارات على الخارطة والجاهزة بشكل مختلف؟',
      aAr: 'نعم — يُعدّ المساعد للتفريق بين مخزون على الخارطة (مع منطق خطة الدفع وسياق المخطط العام ومعلومات التسليم) والمخزون الجاهز (مع توفر المعاينة وتفاصيل الانتقال).',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const ctaLabel = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkDigital = isArabic ? 'المنصات الرقمية' : 'digital platforms'
  const linkWebsites = isArabic ? 'بناء مواقع الأعمال' : 'business website development'
  const linkAI = isArabic ? 'المساعدون الذكياء والأتمتة' : 'AI assistants and automation'
  const linkApps = isArabic ? 'تطوير التطبيقات' : 'app development'
  const linkPlatforms = isArabic ? 'بناء منصات الأعمال' : 'business platform development'

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
              { '@type': 'ListItem', name: cornerLabel, item: `https://www.premieralive.com/${locale}/${PATH}`, position: 2 },
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
        <Link href={`/${locale}/digital`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {isArabic ? 'المنصات الرقمية' : 'Digital'}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-dim)' }}>{cornerLabel}</span>
      </div>

      {/* H1 + Hero */}
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

      {/* Why AI now */}
      <Section elevated>
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
        }}>
          {isArabic ? whyAr : whyEn}
        </p>
      </Section>

      {/* Capabilities */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? capabilitiesHeadingAr : capabilitiesHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? capabilitiesAr : capabilitiesEn).map((s, i) => (
            <div key={i} style={{
              padding: '1.5rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-text)',
                lineHeight: 1.2,
                marginBottom: '0.75rem',
                letterSpacing: '0.01em',
              }}>
                {s.title}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who it is built for */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? fitHeadingAr : fitHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? fitAr : fitEn}
        </p>
      </Section>

      {/* Process */}
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
          {(isArabic ? processAr : processEn).map((s, i) => (
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
                {String(i + 1).padStart(2, '0')} — {s.step}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.6,
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? stackHeadingAr : stackHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? stackAr : stackEn}
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

      {/* Related */}
      <Section>
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
          <span style={{ color: 'var(--color-text-dim)' }}>{relatedLabel}{' '}</span>
          <Link
            href={`/${locale}/digital`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkDigital}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/business-website-development-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkWebsites}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/ai-assistants-automation-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkAI}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/app-development-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkApps}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/business-platform-development-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPlatforms}
          </Link>
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