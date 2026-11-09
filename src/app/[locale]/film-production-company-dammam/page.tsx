import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'film-production-company-dammam'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'شركة إنتاج أفلام في الدمام | بريمييرا لايف'
      : 'Film Production Company in Dammam | Premiera Live',
    description: isArabic
      ? 'إنتاج أفلام في الدمام للشركات والوكالات والفعاليات. مقرنا في الخبر، ونصوّر الدمام والظهران والجبيل دون رسوم سفر.'
      : 'Film production in Dammam for companies, agencies, and events. We are based in Al Khobar and shoot Dammam, Dhahran, and Jubail without a travel premium.',
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
        ? 'شركة إنتاج أفلام في الدمام | بريمييرا لايف'
        : 'Film Production Company in Dammam | Premiera Live',
      description: isArabic
        ? 'إنتاج أفلام في الدمام للشركات والوكالات والفعاليات. مقرنا في الخبر، ونصوّر الدمام والظهران والجبيل دون رسوم سفر.'
        : 'Film production in Dammam for companies, agencies, and events. We are based in Al Khobar and shoot Dammam, Dhahran, and Jubail without a travel premium.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'شركة إنتاج أفلام في الدمام | بريمييرا لايف'
        : 'Film Production Company in Dammam | Premiera Live',
      description: isArabic
        ? 'إنتاج أفلام في الدمام للشركات والوكالات والفعاليات. مقرنا في الخبر، ونصوّر الدمام والظهران والجبيل دون رسوم سفر.'
        : 'Film production in Dammam for companies, agencies, and events. We are based in Al Khobar and shoot Dammam, Dhahran, and Jubail without a travel premium.',
    },
  }
}

export default async function FilmProductionDammamPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'شركة إنتاج أفلام في الدمام' : 'Film Production Company in Dammam'

  const h1En = 'Film Production Company in Dammam'
  const h1Ar = 'شركة إنتاج أفلام في الدمام'

  const heroEn =
    'Premiera Live is the local film production company for Dammam. Our crew works the Dammam, Dhahran, and Al Khobar metro continuously — not as a visiting crew sent in for one job — and we produce films for companies, agencies, and event teams across the Eastern Province. We shoot along the Corniche and the waterfront, in the business districts of Dammam and Dhahran, on the industrial and energy corridors running north toward Jubail, and on the causeway route that connects the province to Bahrain. Cameras, lighting, audio, and editing are all ours, and post-production is finished in-house in Al Khobar, a short drive from every location on this page.'
  const heroAr =
    'تعمل بريمييرا لايف شركةَ إنتاج الأفلام المحلية في الدمام. يعمل طاقمنا في نطاق الدمام والظهران والخبر باستمرار — لا كطاقم مستدعٍ لمشروع واحد — وننتج الأفلام للشركات والوكالات وفرق الفعاليات في أنحاء المنطقة الشرقية. نصوّر على الكورنيش والواجهة البحرية، وفي أحياء الأعمال بالدمام والظهران، وعلى الممرات الصناعية وطاقة الطاقة الممتدة شمالًا نحو الجبيل، وعلى طريق الجسر الذي يربط المنطقة بالبحرين. الكاميرات والإضاءة والصوت والمونتاج كلها لنا، وتُنجز أعمال ما بعد الإنتاج داخليًا في الخبر، على مسافة قصيرة من كل موقع في هذه الصفحة.'

  const dammamHeadingEn = 'Why Dammam, why us'
  const dammamHeadingAr = 'لماذا الدمام ولماذا نحن'

  const dammamEn =
    'Dammam is the Eastern Province\'s commercial and administrative centre, and it works differently from Riyadh or Jeddah. There is no long-haul flight, no flight schedule, no hotel block, and no imported crew: our base in Al Khobar is close enough that a camera can be in Dhahran in the morning and in Dammam in the afternoon. That proximity changes what a production costs and how it behaves, because the crew is already here, the equipment is already here, and a reshoot does not need a new travel authorisation — it needs a phone call. It also means the local knowledge is real rather than researched: which office tower lets a crew load in through the service entrance, which stretch of the Corniche holds light at four in the afternoon, which junction on the industrial route backs up when shift change happens, and which client offices in Dhahran can only host a shoot after a certain hour. Dammam also has its own shooting conditions. The humidity off the Gulf is heavy, and the light has a warm, low-contrast quality in the late afternoon that does not exist inland. Equipment needs acclimatisation time when it comes from an air-conditioned interior into that air, and the schedule needs room for it.'
  const dammamAr =
    'تُعدّ الدمام المركز التجاري والإداري للمنطقة الشرقية، وتعمل بطريقة مختلفة عن الرياض أو جدة. لا رحلة طيران طويلة ولا جدول طيران ولا حجز فندق ولا طاقم مستورد: مقرنا في الخبر قريب بما يكفي أن تكون الكاميرا في الظهران صباحًا وفي الدمام بعد الظهر. وتقرب هذه المسافة تغيّر تكلفة الإنتاج وسلوكه، لأن الطاقم موجود هنا والمعدات موجودة هنا، وإعادة التصوير لا تحتاج تصريح سفر جديد بل تحتاج مكالمة. كما أن معرفة المنطقة حقيقية لا مراجَعة: أي برج مكاتب يسمح للطاقم بالدخول من بوابة الخدمة، وأي امتداد من الكورنيش يحتفظ بالإضاءة عند الرابعة عصرًا، وأي تقاطع على الممر الصناعي يتباطأ عند تبديل الورديات، وأي مكاتب عملاء في الظهران لا تستضيف التصوير إلا بعد ساعة معينة. وللدمام كذلك ظروف تصوير خاصة. فالرطوبة القادمة من الخليج ثقيلة، والإضاءة في وقت متأخر من النهار ذات طابع دافئ ومنخفض التباين لا وجود له في الداخل. وتحتاج المعدات وقتًا للتأقلم عند خروجها من داخلية مكيفة إلى ذلك الهواء، ويحتاج الجدول إلى مساحة لذلك.'

  const servicesHeadingEn = 'What we film in Dammam'
  const servicesHeadingAr = 'ماذا نصوّر في الدمام'

  const servicesEn = [
    {
      title: 'Corporate films and headquarters content',
      body: 'Annual reports, leadership messages, internal communications, and recruitment films for companies headquartered in Dammam and Dhahran.',
    },
    {
      title: 'Energy, industrial, and operational work',
      body: 'Safety and training films, operational documentaries, and facility content for the energy and industrial operations along the Dammam–Jubail corridor, shot inside the working site under its safety protocol.',
    },
    {
      title: 'Events, conferences, and exhibitions',
      body: 'Conferences, product launches, exhibitions, and awards functions in the Dammam and Dhahran venue circuit, with multi-camera switching and same-day social cuts when the schedule asks for them.',
    },
    {
      title: 'Commercials and brand campaigns',
      body: 'Campaigns for agencies and in-house brand teams, cut in versions for television, social, and out-of-home, with bilingual deliverables as standard.',
    },
    {
      title: 'Government and public-sector communications',
      body: 'Awareness campaigns, public-service films, and event coverage produced for authorities and organisations based in the province.',
    },
    {
      title: 'Photography and campaign stills',
      body: 'Executive portraits, corporate headshots, event photography, and campaign stills — shot on the same production days to keep the visual language consistent.',
    },
  ]

  const servicesAr = [
    {
      title: 'أفلام الشركات ومحتوى المقر الرئيسي',
      body: 'تقارير سنوية ورسائل قيادية وتواصل داخلي وأفلام توظيف للشركات التي مقرها الدمام والظهران.',
    },
    {
      title: 'أعمال الطاقة والصناعة والعمليات',
      body: 'أفلام سلامة وتدريب ووثائقيات تشغيلية ومحتوى منشآت لعمليات الطاقة والصناعة على ممر الدمام–الجبيل، تُصوَّر داخل موقع العمل وفق إجراءات السلامة فيه.',
    },
    {
      title: 'الفعاليات والمؤتمرات والمعارض',
      body: 'مؤتمرات وإطلاق منتجات ومعارض وحفلات جوائز في قاعات الدمام والظهران، مع تبديل متعدد الكاميرا ومقاطع اجتماعية في اليوم ذاته حين تستوجب الجداول ذلك.',
    },
    {
      title: 'الأفلام الإعلانية وحملات العلامات',
      body: 'حملات للوكالات وفرق العلامات الداخلية، بنسخ مخصصة للتلفزيون والمنصات الاجتماعية والعرض الخارجي، ومخرجات ثنائية اللغة بشكل معياري.',
    },
    {
      title: 'رسائل الجهات الحكومية والقطاع العام',
      body: 'حملات توعية وأفلام خدمية عامة وتغطية فعاليات تُنتَج للجهات والمنظمات التي مقرها في المنطقة.',
    },
    {
      title: 'التصوير الاحترافي وصور الحملات',
      body: 'صور تنفيذية وصور شخصية للشركات وتصوير فعاليات وصور حملات — في أيام الإنتاج نفسها للحفاظ على لغة بصرية متسقة.',
    },
  ]

  const processHeadingEn = 'How a Dammam production runs'
  const processHeadingAr = 'كيف يسير إنتاج في الدمام'

  const processEn = [
    {
      step: 'Brief and scoping',
      body: 'A discovery call covers the goal, audience, where the film will live, languages, and deliverables. We agree on the scope and the locations before anything is booked.',
    },
    {
      step: 'Permits and site clearance',
      body: 'Our producers handle filming permissions, private-property clearance, and coordination with facility safety teams on industrial and energy sites. We confirm the permission status before the shoot date is fixed.',
    },
    {
      step: 'Pre-production scouting',
      body: 'A producer walks the locations in advance — checking the light at the hour you intend to shoot, the access route for equipment, the power and noise situation, and where a full crew can park.',
    },
    {
      step: 'Production day',
      body: 'The crew arrives with cameras, lighting, and sound. Your team focuses on being on camera; we run the set, the schedule, and the contingency for Gulf humidity, access restrictions, or a space that has to be cleared before we can set up.',
    },
    {
      step: 'Post-production and delivery',
      body: 'Edit, colour grade, sound mix, and graphics are finished in-house in Al Khobar. Final films are delivered in every format your channels need, in Arabic and English as standard.',
    },
  ]

  const processAr = [
    {
      step: 'الاجتماع وتحديد النطاق',
      body: 'تغطي مكالمة تعريفية الهدف والجمهور وأين سيُعرض الفيلم واللغات والمخرجات. ونتفق على النطاق وعلى المواقع قبل تثبيت أي حجز.',
    },
    {
      step: 'التصاريح والموافقات على المواقع',
      body: 'يتولى منتجونا أذونات التصوير والموافقات على العقارات الخاصة والتنسيق مع فرق السلامة في المواقع الصناعية ومنشآت الطاقة. ونؤكد حالة الإذن قبل تثبيت يوم التصوير.',
    },
    {
      step: 'الاستطلاع قبل الإنتاج',
      body: 'يمشي منتج على المواقع مسبقًا — ويتحقق من الضوء في الساعة التي تنوي التصوير فيها، ومن مسار دخول المعدات، ومن الكهرباء والضوضاء، ومن مكان توقف الطاقم الكامل.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'يصل الطاقم بالكاميرات والإضاءة والصوت. يركّز فريقك على الظهور أمام الكاميرا، وندير نحن المجموعة والجدول والاستجابة لرطوبة الخليج أو قيود الدخول أو مساحة تحتاج إخلاء قبل أن نبدأ التركيب.',
    },
    {
      step: 'ما بعد الإنتاج والتسليم',
      body: 'يُنجز المونتاج وتصحيح الألوان ومزج الصوت والجرافيك داخليًا في الخبر. تُسلَّم الأفلام النهائية بكل الصيغ التي تحتاجها قنواتك، بالعربية والإنجليزية بشكل معياري.',
    },
  ]

  const logisticsHeadingEn = 'Logistics, in plain language'
  const logisticsHeadingAr = 'اللوجستيات بلغة واضحة'

  const logisticsEn =
    'Dammam is the one market in the Kingdom where a production company can run a shoot without treating it as a travel project. Our equipment moves on our own vehicles from Al Khobar, so gear on set is not dependent on a third-party courier arriving on the same day we do. For work that extends north toward Jubail or east along the industrial route, the plan stays the same: same crew, same equipment, same producer model on the ground, with the schedule built around the distance rather than around a flight search. For multi-day shoots we place the crew close to the location set rather than near the city centre, because in the Dammam metro the difference between Dhahran and Dammam can be fifteen minutes on the map and considerably longer in traffic at the wrong hour. When a project genuinely sits outside the Kingdom, we handle flights and keep the same on-the-ground producer and the same equipment, so the standard of the film does not depend on where the work is.'
  const logisticsAr =
    'تمثّل الدمام السوق الوحيد في المملكة الذي يمكن لشركة إنتاج أن تنفذ فيه تصويرًا دون معاملته كمشروع سفر. تتحرك معداتنا على سياراتنا الخاصة من الخبر، فلا يرتبط وصول المعدات إلى الموقع بشركة شحن خارجية تصل في اليوم نفسه الذي نصل فيه. أما العمل الذي يمتد شمالًا نحو الجبيل أو شرقًا على الممر الصناعي، فالخطة تبقى نفسها: الطاقم نفسه والمعدات نفسها ونموذج المنتج نفسه في الموقع، مع جدول مبني على المسافة لا على البحث عن رحلة طيران. وفي التصويرات الممتدة على أيام نُضع الطاقم قريبًا من مجموعة المواقع لا من مركز المدينة، لأن فارق الدمام والظهران في نطاق المدينة قد يكون خمس عشرة دقيقة على الخريطة وأطول بكثير في حركة المرور في الساعة غير المناسبة. وحين يقع المشروع فعلًا خارج المملكة، نتكفل بحجز الرحلات ونبقي المنتج نفسه في الموقع والمعدات نفسها، فلا تعتمد جودة الفيلم على مكان العمل.'

  const faqData = [
    {
      qEn: 'Are you based in Dammam, or do you travel in from elsewhere?',
      aEn: 'We are based in Al Khobar, in the same metro as Dammam and Dhahran, so we work Dammam as a local team — the crew, the equipment, and the edit suite are all minutes away, not flown in.',
      qAr: 'هل أنتم متمركزون في الدمام أم تصلون من مكان آخر؟',
      aAr: 'مقرنا في الخبر، في النطاق نفسه الذي تقع فيه الدمام والظهران، ولذلك نعمل في الدمام كفريق محلي — الطاقم والمعدات واستوديو المونتاج كلها على مسافة دقائق لا مسافة رحلة.',
    },
    {
      qEn: 'Do you also cover Dhahran and Jubail?',
      aEn: 'Yes — Dhahran, Al Khobar, and Jubail are part of the same working area for us and are covered by the same crews and the same equipment. Dhahran is usually a morning location and Dammam an afternoon one, or the reverse, depending on the light.',
      qAr: 'هل تغطيون الظهران والجبيل أيضًا؟',
      aAr: 'نعم — الظهران والخبر والجبيل جزء من نطاق العمل نفسه لدينا وتغطيها الطواقم والمعدات نفسها. وغالبًا ما يكون الظهران موقعًا صباحيًا والدمام موقعًا بعد الظهر، أو العكس، بحسب الضوء.',
    },
    {
      qEn: 'Can you film inside industrial and energy facilities?',
      aEn: 'We produce safety, training, and operational content inside working facilities along the Dammam–Jubail corridor. Every filming area is agreed in advance with the site safety team, and the crew works to the access and PPE rules that apply on the day.',
      qAr: 'هل تصوّرون داخل المنشآت الصناعية ومنشآت الطاقة؟',
      aAr: 'نعم — ننتج محتوى السلامة والتدريب والعمليات داخل المنشآت العاملة على ممر الدمام–الجبيل. ويُتفق على كل منطقة تصوير مسبقًا مع فريق السلامة في الموقع، ويعمل الطاقم وفق قواعد الدخول ومعدات الوقاية الشخصية المطبقة في ذلك اليوم.',
    },
    {
      qEn: 'How does the Gulf humidity affect a Dammam shoot?',
      aEn: 'It changes the shape of the day. We keep interiors and air-conditioned locations in the hottest part of the afternoon, schedule the waterfront and outdoor work for the cooler hours, and allow acclimatisation time when a camera moves from an air-conditioned interior into humid open air, so lenses do not fog mid-take.',
      qAr: 'كيف تؤثر رطوبة الخليج على تصوير في الدمام؟',
      aAr: 'تغيّر شكل اليوم. فنُبقي التصوير الداخلي والمواقع المكيفة في أشد ساعات بعد الظهر حرارة، ونجعل العمل على الواجهة البحرية وفي الخارج ضمن الساعات الأبرد، ونمنح وقتًا للتأقلم حين تنتقل الكاميرا من داخلية مكيفة إلى هواء مفتوح رطب، حتى لا تتضباب العدسات في منتصف اللقطة.',
    },
    {
      qEn: 'How far in advance should we book a Dammam shoot?',
      aEn: 'Two weeks is comfortable for most corporate, event, and agency work in the province. Facility shoots inside industrial or energy sites need more lead time because the safety clearance and access approval take longer to arrange. Urgent timelines are sometimes possible — call to discuss.',
      qAr: 'قبل كم يجب أن نحجز تصويرًا في الدمام؟',
      aAr: 'يكفي أسبوعان لمعظم أعمال الشركات والفعاليات والوكالات في المنطقة. أما التصوير داخل المواقع الصناعية أو منشآت الطاقة فيحتاج مهلة أطول لأن اعتماد السلامة والموافقة على الدخول تستغرق وقتًا في الإعداد. وتتاح أحيانًا جداول عاجلة — اتصل بنا للنقاش.',
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
  const linkTraining = isArabic ? 'إنتاج فيديوهات التدريب' : 'training video production'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
  const linkRiyadh = isArabic ? 'إنتاج الأفلام في الرياض' : 'film production in Riyadh'
  const linkJeddah = isArabic ? 'إنتاج الأفلام في جدة' : 'film production in Jeddah'

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

      {/* Why Dammam, why us */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? dammamHeadingAr : dammamHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? dammamAr : dammamEn}
        </p>
      </Section>

      {/* What we film in Dammam */}
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

      {/* How a Dammam production runs */}
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
            href={`/${locale}/services/corporate-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCorporate}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/training-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkTraining}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/film-production-company-riyadh`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkRiyadh}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/film-production-company-jeddah`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkJeddah}
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
