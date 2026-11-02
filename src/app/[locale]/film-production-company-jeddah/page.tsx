import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'film-production-company-jeddah'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'شركة إنتاج أفلام في جدة | بريمييرا لايف'
      : 'Film Production Company in Jeddah | Premiera Live',
    description: isArabic
      ? 'نصوّر في جدة للشركات والوكالات والمشاريع للتقارير السنوية وتغطية الفعاليات والإعلانات. نسافر من الخبر بكامل المعدات.'
      : 'Film production in Jeddah for corporate, agency, and event work. We travel from Al Khobar with full equipment — cameras, lighting, sound, and edit.',
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
        ? 'شركة إنتاج أفلام في جدة | بريمييرا لايف'
        : 'Film Production Company in Jeddah | Premiera Live',
      description: isArabic
        ? 'نصوّر في جدة للشركات والوكالات والمشاريع للتقارير السنوية وتغطية الفعاليات والإعلانات. نسافر من الخبر بكامل المعدات.'
        : 'Film production in Jeddah for corporate, agency, and event work. We travel from Al Khobar with full equipment — cameras, lighting, sound, and edit.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'شركة إنتاج أفلام في جدة | بريمييرا لايف'
        : 'Film Production Company in Jeddah | Premiera Live',
      description: isArabic
        ? 'نصوّر في جدة للشركات والوكالات والمشاريع للتقارير السنوية وتغطية الفعاليات والإعلانات. نسافر من الخبر بكامل المعدات.'
        : 'Film production in Jeddah for corporate, agency, and event work. We travel from Al Khobar with full equipment — cameras, lighting, sound, and edit.',
    },
  }
}

export default async function FilmProductionJeddahPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'شركة إنتاج أفلام في جدة' : 'Film Production Company in Jeddah'

  const h1En = 'Film Production Company in Jeddah'
  const h1Ar = 'شركة إنتاج أفلام في جدة'

  const heroEn =
    'Premiera Live produces films in Jeddah for companies, agencies, and project teams. Our crew travels from our base in Al Khobar with full equipment — cinema cameras, lighting, audio, and an in-house edit suite — and shoots across the city: the Corniche and the waterfront promenade, the historic district around Al-Balad, the Jeddah Central and its business towers, the port and industrial corridors along the coast, and the beaches and desert edges beyond the city limits. Every stage from script to final delivery is handled by the same team, with no subcontracted freelancers and no coordination layers in between.'
  const heroAr =
    'تنتج بريمييرا لايف الأفلام في جدة للشركات والوكالات وفرق المشاريع. ينتقل طاقمنا من مقرنا في الخبر بكامل المعدات — كاميرات سينمائية وإضاءة وصوت واستوديو مونتاج داخلي — ويصوّر في أنحاء المدينة: الكورنيش والممشى على الواجهة البحرية، والحي التاريخي حول البلد، وجدة سنترال وأبراجها، والميناء والممرات الصناعية على الساحل، والشواطئ وحواف الصحراء خارج حدود المدينة. تتولى المرحلة نفسها من السيناريو حتى التسليم النهائي الفريق نفسه، بلا مصوّرين مستقلين من الباطن وبلا طبقات تنسيق.'

  const jeddahHeadingEn = 'Why Jeddah, why us'
  const jeddahHeadingAr = 'لماذا جدة ولماذا نحن'

  const jeddahEn =
    'Jeddah is the Kingdom’s commercial port and the largest city in the West. Projects here often sit on the coast and move inland in the same week: a corporate headquarters in the business district on one day, a heritage location in the old town on the next, a container terminal or an industrial facility on the third. That spread is the reason filming here needs a producer who understands the city rather than a crew that has flown in for one location. Our producers scout Jeddah in advance, sequence the days around the shoot rather than around the map, and keep the same crew on every location of the project. The heat and humidity on the coast shape the shooting day in ways the inland schedule does not: lens fogging and condensation on the move between air-conditioned interiors and the waterfront, colour that shifts between open shade and direct coastal sun, and a slower working rhythm that affects how many setups a day can realistically hold. We plan for all of it before we travel, so the day runs to the schedule instead of around it.'
  const jeddahAr =
    'تستضيف جدة الميناء التجاري للمملكة وأكبر مدن الغرب. وكثيرًا ما تبدأ مشاريعنا على الساحل ثم تنتقل إلى الداخل في الأسبوع نفسه: مقر شركة في الحي التجاري يومًا، وموقع تاريخي في البلد في اليوم التالي، وميناء أو منشأة صناعية في اليوم الثالث. وهذا التباعد بين المواقع هو ما يجعل التصوير في جدة يحتاج منتجًا يعرف المدينة لا طاقمًا وصل بالطائرة لموقع واحد. ويستطلع منتجونا جدة مسبقًا، ويرتبون الأيام حول التصوير لا حول الخريطة، ويحتفظون بالطاقم نفسه في كل موقع من مواقع المشروع. ويؤثر الحر والرطوبة على الساحل في يوم التصوير على نحو لا تعرفه الجداول الداخلية: تضباب العدسات وتكاثف البخار عند الانتقال بين الداخليات المكيفة والواجهة البحرية، وتبدّل الألوان بين الظل المفتوح والشمس الساحلية المباشرة، وإيقاع عمل أبطأ يحدد عدد المشاهد التي يمكن إنجازها في اليوم الواحد. ونخطط لكل ذلك قبل السفر، ليسافر اليوم مع الجدول لا حوله.'

  const servicesHeadingEn = 'What we film in Jeddah'
  const servicesHeadingAr = 'ماذا نصوّر في جدة'

  const servicesEn = [
    {
      title: 'Corporate films and annual reports',
      body: 'Headquarters films, leadership messages, internal communications, and annual report inserts for companies and family offices based in the city.',
    },
    {
      title: 'Port, logistics, and industrial work',
      body: 'Operational films for the port corridor, freight and logistics operators, and industrial facilities on the coastal routes — shot where the work actually happens, with safety protocol observed.',
    },
    {
      title: 'Heritage and tourism content',
      body: 'Films on the historic district, the old town streets, and the coastal identity of the city for tourism bodies, museums, and destination campaigns.',
    },
    {
      title: 'Commercials and brand campaigns',
      body: 'Cinema-grade campaigns for agencies and in-house brand teams, cut in versions for television, social, and out-of-home, with bilingual deliverables as standard.',
    },
    {
      title: 'Event coverage and conferences',
      body: 'Conferences, product launches, exhibitions, and awards functions, with multi-camera switching and same-day social cuts when the schedule demands them.',
    },
    {
      title: 'Photography and campaign stills',
      body: 'Executive portraits, corporate headshots, event photography, and campaign stills — shot on the same production days to keep the visual language consistent.',
    },
  ]

  const servicesAr = [
    {
      title: 'أفلام الشركات والتقارير السنوية',
      body: 'أفلام المقر الرئيسي والرسائل القيادية والتواصل الداخلي ولقطات التقارير السنوية للشركات ومكاتب الإدارة العائلية التي مقرها المدينة.',
    },
    {
      title: 'أعمال الميناء واللوجستيات والصناعة',
      body: 'أفلام تشغيلية لممر الميناء ومشغلي الشحن واللوجستيات والمنشآت الصناعية على الساحل — تُصوَّر حيث يجري العمل فعليًا مع الالتزام بإجراءات السلامة.',
    },
    {
      title: 'محتوى التراث والسياحة',
      body: 'أفلام عن الحي التاريخي وشوارع البلد وهوية الساحلية للمدينة، موجهة إلى الجهات السياحية والمتاحف وحملات الوجهات.',
    },
    {
      title: 'الأفلام الإعلانية وحملات العلامات',
      body: 'حملات بمستوى سينمائي للوكالات وفرق العلامات الداخلية، بنسخ مخصصة للتلفزيون والمنصات الاجتماعية والعرض الخارجي، ومخرجات ثنائية اللغة بشكل معياري.',
    },
    {
      title: 'تغطية الفعاليات والمؤتمرات',
      body: 'مؤتمرات وإطلاق منتجات ومعارض وحفلات جوائز، مع تبديل متعدد الكاميرا ومقاطع اجتماعية في اليوم ذاته حين تستوجب الجداول ذلك.',
    },
    {
      title: 'التصوير الاحترافي وصور الحملات',
      body: 'صور تنفيذية وصور شخصية للشركات وتصوير فعاليات وصور حملات — في أيام الإنتاج نفسها للحفاظ على لغة بصرية متسقة.',
    },
  ]

  const processHeadingEn = 'How a Jeddah production runs'
  const processHeadingAr = 'كيف يسير إنتاج في جدة'

  const processEn = [
    {
      step: 'Brief and scoping',
      body: 'A discovery call covers the goal, audience, where the film will live, languages, and deliverables. We agree on the scope, and on the locations, before a single permit is requested.',
    },
    {
      step: 'Permits and location clearance',
      body: 'Our producers handle filming permissions, private-property clearance, and coordination with port or industrial site safety teams. We confirm the permit status before travel is booked.',
    },
    {
      step: 'Pre-production scouting in the city',
      body: 'A producer walks the locations before the shoot — checking the coastal light at different hours, the access route for equipment, the power and noise situation, and the parking a full crew needs in a dense neighbourhood.',
    },
    {
      step: 'Production day',
      body: 'The crew arrives with cameras, lighting, and sound. Your team focuses on being on camera; we run the set, the schedule, and the contingency for coastal humidity, access restrictions, or a building that needs to be cleared before we can set up.',
    },
    {
      step: 'Post-production and delivery',
      body: 'Edit, colour grade, sound mix, and graphics are finished in-house in Al Khobar. Final films are delivered in every format your channels need, in Arabic and English as standard.',
    },
  ]

  const processAr = [
    {
      step: 'الاجتماع وتحديد النطاق',
      body: 'تغطي مكالمة تعريفية الهدف والجمهور وأين سيُعرض الفيلم واللغات والمخرجات. ونتفق على النطاق وعلى المواقع قبل طلب أي تصريح.',
    },
    {
      step: 'التصاريح والموافقات على المواقع',
      body: 'يتولى منتجونا أذونات التصوير والموافقات على العقارات الخاصة والتنسيق مع فرق السلامة في مواقع الميناء والمنشآت الصناعية. ونؤكد حالة التصريح قبل حجز السفر.',
    },
    {
      step: 'الاستطلاع في المدينة قبل الإنتاج',
      body: 'يمشي منتج على المواقع قبل التصوير — ويتحقق من الضوء الساحلي في ساعات مختلفة، ومن مسار دخول المعدات، ومن الكهرباء والضوضاء، ومن موقف السيارات الذي يحتاجه طاقم كامل في حي كثيف.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'يصل الطاقم بالكاميرات والإضاءة والصوت. يركّز فريقك على الظهور أمام الكاميرا، وندير نحن المجموعة والجدول والاستجابة للرطوبة الساحلية أو قيود الدخول أو مبنى يحتاج إخلاء قبل أن نبدأ التركيب.',
    },
    {
      step: 'ما بعد الإنتاج والتسليم',
      body: 'يُنجز المونتاج وتصحيح الألوان ومزج الصوت والجرافيك داخليًا في الخبر. تُسلَّم الأفلام النهائية بكل الصيغ التي تحتاجها قنواتك، بالعربية والإنجليزية بشكل معياري.',
    },
  ]

  const logisticsHeadingEn = 'Logistics, in plain language'
  const logisticsHeadingAr = 'اللوجستيات بلغة واضحة'

  const logisticsEn =
    'Travel from our Al Khobar base to Jeddah is a long run that we treat as a standard production trip, not an exception. Our crew drives with the gear in our own vehicles, so equipment arrival on set does not depend on third-party freight moving on the same schedule as us. When the project needs more than a road production — a shoot beyond the city, a coastal location with no vehicle access, or a location that only makes sense from the air — we handle flights and the same on-the-ground producer model, with the same crew and the same equipment regardless of where the work takes us. For multi-day shoots we plan accommodation around the locations rather than around the city centre, because in Jeddah a fifteen-minute difference on a map can mean a very different call time in real traffic.'
  const logisticsAr =
    'يعتبر السفر من مقرنا في الخبر إلى جدة رحلة طويلة نتعامل معها بوصفها إنتاجًا معتادًا لا استثناء. يقود طاقمنا بسياراتنا الخاصة ومعه المعدات، فلا يرتبط وصول المعدات إلى الموقع بشركة شحن خارجية تتحرك وفق جدولنا نفسه. وعندما يحتاج المشروع إلى ما يتجاوز التصوير البرّي — تصوير خارج المدينة، أو موقع ساحلي لا يصل إليه طريق مناسب للمركبات، أو موقع لا يظهر معناه إلا من الجو — نتكفل بحجز الرحلات ونموذج المنتج نفسه في الموقع، بالطاقم نفسه والمعدات نفسها بصرف النظر عن مكان العمل. أما في التصويرات الممتدة على أيام فنخطّط للإقامة حول المواقع لا حول مركز المدينة، لأن فارق خمس عشرة دقيقة على الخريطة قد يعني وقت حضور مختلفًا تمامًا في حركة المرور الفعلية.'

  const faqData = [
    {
      qEn: 'Is your team based in Jeddah?',
      aEn: 'No — our base is in Al Khobar, and our crew travels to Jeddah for every production. That means you get the same team on every shoot, not whoever happens to be free in the city.',
      qAr: 'هل فريقكم متمركز في جدة؟',
      aAr: 'لا — مقرنا في الخبر، ويسافر طاقمنا إلى جدة لكل إنتاج. وهذا يعني أنك تحصل على الفريق نفسه في كل تصوير، لا على من كان متاحًا في المدينة.',
    },
    {
      qEn: 'How do you handle filming permissions in Jeddah?',
      aEn: 'Our producers handle the permission process for heritage locations, private properties, commercial sites, and controlled industrial areas. We confirm the permission status before travel is booked, so the production day is not at risk of being stopped on arrival.',
      qAr: 'كيف تتعاملون مع أذونات التصوير في جدة؟',
      aAr: 'يتولى منتجونا عملية الأذونات كاملة للمواقع التاريخية والعقارات الخاصة والمواقع التجارية والمناطق الصناعية المقيّدة. ونؤكد حالة الإذن قبل حجز السفر، حتى لا يتعرض يوم الإنتاج لخطر الإيقاف عند الوصول.',
    },
    {
      qEn: 'Can you film at the port and industrial sites?',
      aEn: 'Yes — we produce operational and documentary content on the coastal industrial routes, working with the site safety teams and following the access rules that apply on the day. Every filming area is agreed in advance with the people who run the site.',
      qAr: 'هل تصوّرون في الميناء والمواقع الصناعية؟',
      aAr: 'نعم — ننتج محتوى تشغيليًا ووثائقيًا في الممرات الصناعية الساحلية، بالتعاون مع فرق السلامة واتباع قواعد الدخول المطبقة في ذلك اليوم. ويُتفق على كل منطقة تصوير مسبقًا مع الجهة التي تدير الموقع.',
    },
    {
      qEn: 'How do coastal heat and humidity affect the shoot day?',
      aEn: 'They change how the day is built. We keep interiors and air-conditioned locations in the hottest part of the day, schedule the open coastal and heritage work for the cooler hours, and allow equipment acclimatisation time when a camera comes from air conditioning into humid air, so lenses do not fog mid-take.',
      qAr: 'كيف يؤثر حر الساحل ورطوبته على يوم التصوير؟',
      aAr: 'يغيران طريقة بناء اليوم. فنُبقي التصوير الداخلي والمواقع المكيفة في أشد ساعات اليوم حرارة، ونجعل العمل المفتوح في الساحل والبلد ضمن الساعات الأبرد، ونمنح المعدات وقتًا للتأقلم حين تخرج الكاميرا من التكييف إلى هواء رطب، حتى لا تتضباب العدسات في منتصف اللقطة.',
    },
    {
      qEn: 'How far in advance should we book?',
      aEn: 'Two to three weeks is comfortable for most corporate and event work in Jeddah. Heritage locations, controlled industrial sites, and larger campaigns need more lead time because the permissions take longer to clear. Urgent timelines are sometimes possible — call to discuss.',
      qAr: 'قبل كم يجب أن نحجز؟',
      aAr: 'يكفي أسبوعان إلى ثلاثة لمعظم أعمال الشركات والفعاليات في جدة. وتحتاج المواقع التاريخية والمواقع الصناعية المقيّدة والحملات الأكبر مهلة أطول لأن الأذونات تستغرق وقتًا في الاعتماد. وتتاح أحيانًا جداول عاجلة — اتصل بنا للنقاش.',
    },
    {
      qEn: 'Do you produce in Arabic and English?',
      aEn: 'Yes — bilingual productions are our normal. We script natively in both languages, cast voiceover in either, and subtitle or caption as needed for the channels you will publish on.',
      qAr: 'هل تنتجون بالعربية والإنجليزية؟',
      aAr: 'نعم — الإنتاج ثنائي اللغة هو عملنا المعتاد. نكتب السيناريو أصالةً باللغتين، ونختار التعليق الصوتي بأي منهما، ونضيف الترجمة أو النص الفرعي حسب القنوات التي ستنشر فيها.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const ctaLabel = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkCorporate = isArabic ? 'أفلام الشركات' : 'corporate video'
  const linkCommercial = isArabic ? 'الأفلام الإعلانية' : 'commercial film'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
  const linkRiyadh = isArabic ? 'إنتاج الأفلام في الرياض' : 'film production in Riyadh'
  const linkEvents = isArabic ? 'تغطية الفعاليات' : 'event coverage'

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
        <Link href={`/${locale}/film-production-company-saudi-arabia`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {isArabic ? 'إنتاج الأفلام' : 'Film Production'}
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

      {/* Why Jeddah, why us */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? jeddahHeadingAr : jeddahHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? jeddahAr : jeddahEn}
        </p>
      </Section>

      {/* What we film in Jeddah */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? servicesHeadingAr : servicesHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? servicesAr : servicesEn).map((s, i) => (
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

      {/* How a Jeddah production runs */}
      <Section elevated>
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

      {/* Logistics */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? logisticsHeadingAr : logisticsHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? logisticsAr : logisticsEn}
        </p>
      </Section>

      {/* FAQ */}
      <Section elevated>
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
            href={`/${locale}/film-production-company-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPillar}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/commercial-film-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCommercial}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/corporate-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCorporate}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/event-coverage-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkEvents}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/film-production-company-riyadh`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkRiyadh}
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
