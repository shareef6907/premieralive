import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'film-production-company-riyadh'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'شركة إنتاج أفلام في الرياض | بريمييرا لايف'
      : 'Film Production Company in Riyadh | Premiera Live',
    description: isArabic
      ? 'نصوّر في الرياض للشركات والوكالات والجهات الحكومية — طاقم داخلي وكاميرات سينمائية ومونتاج داخلي. نسافر من الخبر بكامل المعدات.'
      : 'Film production in Riyadh for corporates, agencies, and government clients — in-house crew, cinema-line cameras, in-house edit. We travel from Al Khobar.',
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
        ? 'شركة إنتاج أفلام في الرياض | بريمييرا لايف'
        : 'Film Production Company in Riyadh | Premiera Live',
      description: isArabic
        ? 'نصوّر في الرياض للشركات والوكالات والجهات الحكومية — طاقم داخلي وكاميرات سينمائية ومونتاج داخلي.'
        : 'Film production in Riyadh for corporates, agencies, and government clients — in-house crew, cinema-line cameras, and in-house edit.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'شركة إنتاج أفلام في الرياض | بريمييرا لايف'
        : 'Film Production Company in Riyadh | Premiera Live',
      description: isArabic
        ? 'نصوّر في الرياض للشركات والوكالات والجهات الحكومية — طاقم داخلي وكاميرات سينمائية ومونتاج داخلي.'
        : 'Film production in Riyadh for corporates, agencies, and government clients — in-house crew, cinema-line cameras, and in-house edit.',
    },
  }
}

export default async function FilmProductionRiyadhPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'شركة إنتاج أفلام في الرياض' : 'Film Production Company in Riyadh'

  const h1En = 'Film Production Company in Riyadh'
  const h1Ar = 'شركة إنتاج أفلام في الرياض'

  const heroEn =
    'Premiera Live produces films in Riyadh for corporates, agencies, and government clients. Our crew travels from our base in Al Khobar with full equipment — cinema-line cameras, lighting, audio, and an in-house edit suite — and shoots on location across the capital: KAFD, KAFD Tower, Diriyah, King Abdullah Financial District, the diplomatic quarter, and the wider Riyadh region. Every stage from script to final delivery is handled by the same team, with no subcontracted freelancers and no coordination layers in between.'
  const heroAr =
    'تنتج بريمييرا لايف الأفلام في الرياض للشركات والوكالات والجهات الحكومية. ينتقل طاقمنا من مقرنا في الخبر بكامل المعدات — كاميرات سينمائية وإضاءة وصوت واستوديو مونتاج داخلي — ويصوّر في مواقع مختلفة في العاصمة: مركز الملك عبدالله المالي والدرعية والحي الدبلوماسي ومناطق الرياض كافة. تتولى المرحلة نفسها من السيناريو حتى التسليم النهائي الفريق نفسه، بلا مصوّرين مستقلين من الباطن وبلا طبقات تنسيق.'

  const riyadhHeadingEn = 'Why Riyadh, why us'
  const riyadhHeadingAr = 'لماذا الرياض ولماذا نحن'

  const riyadhEn =
    'Riyadh is the country’s commercial centre, and the bulk of our corporate, agency, and government work happens here. The city is also one of the most demanding locations in the region to film in: tight security perimeters around government districts, permits that take longer than the shoot itself, summer heat that reshapes outdoor schedules, and traffic windows that decide when a crew can actually move. We plan for all of that before we land. Our producers handle permits, location clearance, and the coordination with on-site security and protocol teams in advance, so the production day runs to the minute, not the hour. Because the same crew that briefs the project in Riyadh is the one that shoots it, edits it, and delivers it, decisions that would normally bounce between three parties are made on the call.'
  const riyadhAr =
    'الرياض المركز التجاري للبلاد، ويجري الجزء الأكبر من أعمالنا للشركات والوكالات والجهات الحكومية هنا. وتُعدّ المدينة من أكثر مواقع التصوير تطلبًا في المنطقة: أطواق أمنية مشددة حول الأحياء الحكومية، وتصاريح تستغرق وقتًا أطول من التصوير نفسه، وحرارة صيف تعيد تشكيل الجدول الخارجي، ونوافذ مرورية تحدد متى يستطيع الطاقم التنقل فعلًا. نخطط لكل ذلك قبل الوصول. يتولى منتجونا التصاريح والموافقات الأمنية والتنسيق مع فرق البروتوكول في الموقع مسبقًا، كي يسير يوم التصوير بدقائقه لا بساعاته. ولأن الطاقم نفسه الذي يستعرض المشروع في الرياض هو الذي يصوّره ويحرّره ويسلّمه، تُتخذ القرارات التي تتنقل عادة بين ثلاثة أطراف في المكالمة نفسها.'

  const servicesHeadingEn = 'What we film in Riyadh'
  const servicesHeadingAr = 'ماذا نصوّر في الرياض'

  const servicesEn = [
    {
      title: 'Corporate films',
      body: 'Annual reports, internal communications, leadership messages, and brand films for listed companies and family groups headquartered in the capital.',
    },
    {
      title: 'Government and public-sector work',
      body: 'Awareness campaigns, ministerial messages, training films, and event coverage produced to the protocol standards required by ministries and authorities.',
    },
    {
      title: 'Commercials and brand films',
      body: 'Cinema-grade campaigns for agencies and brand teams, with versions cut for TV, social, and out-of-home, and bilingual deliverables as standard.',
    },
    {
      title: 'Event coverage',
      body: 'Conferences, product launches, summits, and award ceremonies, with multi-camera switching and same-day social cuts when timelines demand it.',
    },
    {
      title: 'Documentary and editorial',
      body: 'Long-form films on companies, sectors, and major projects, including site visits to industrial sites, giga-projects, and heritage locations.',
    },
    {
      title: 'Photography',
      body: 'Executive portraits, corporate headshots, event photography, and campaign stills — shot on the same production days to keep the visual language consistent.',
    },
  ]

  const servicesAr = [
    {
      title: 'أفلام الشركات',
      body: 'تقارير سنوية ورسائل داخلية ورسائل قيادية وأفلام علامة للشركات المدرجة والمجموعات العائلية التي تتخذ الرياض مقرًا لها.',
    },
    {
      title: 'أعمال الجهات الحكومية والقطاع العام',
      body: 'حملات توعية ورسائل وزارية وأفلام تدريبية وتغطية فعاليات وفق معايير البروتوكول التي تتطلبها الوزارات والجهات.',
    },
    {
      title: 'الأفلام الإعلانية وأفلام العلامة',
      body: 'حملات بمستوى سينمائي للوكالات وفرق العلامات، بنسخ مخصصة للتلفزيون والمنصات الاجتماعية والعرض الخارجي، ومخرجات ثنائية اللغة بشكل معياري.',
    },
    {
      title: 'تغطية الفعاليات',
      body: 'مؤتمرات وإطلاق منتجات وقمم وحفلات توزيع جوائز، مع تبديل متعدد الكاميرا ومقاطع اجتماعية في اليوم ذاته حين تستوجب الجداول ذلك.',
    },
    {
      title: 'الوثائقي والتحريري',
      body: 'أفلام طويلة عن الشركات والقطاعات والمشاريع الكبرى، تشمل زيارات مواقع للمواقع الصناعية والمشاريع العملاقة والمواقع التراثية.',
    },
    {
      title: 'التصوير الاحترافي',
      body: 'صور تنفيذية وصور شخصية للشركات وتصوير فعاليات وصور حملات — في أيام الإنتاج نفسها للحفاظ على لغة بصرية متسقة.',
    },
  ]

  const processHeadingEn = 'How a Riyadh production runs'
  const processHeadingAr = 'كيف يسير إنتاج في الرياض'

  const processEn = [
    {
      step: 'Brief and scoping',
      body: 'A discovery call covers the goal, audience, where the film will live, languages, and deliverables. We agree on the scope before a single permit is requested.',
    },
    {
      step: 'Permits and logistics',
      body: 'Our producers handle filming permits, location clearance, and security coordination for government and private sites. We confirm travel, accommodation, and equipment transport from our base in Al Khobar.',
    },
    {
      step: 'Pre-production on the ground',
      body: 'A producer scouts the Riyadh location in advance, finalises shot lists with your team, and walks the route with on-site security where required.',
    },
    {
      step: 'Production day',
      body: 'The crew arrives with cameras, lighting, and sound. Your team focuses on being on camera; we run the set, the schedule, and the contingency for heat, traffic, or prayer-time windows.',
    },
    {
      step: 'Post-production and delivery',
      body: 'Edit, colour grade, sound mix, and graphics are finished in-house in Al Khobar. Final films are delivered in every format your channels need, in Arabic and English as standard.',
    },
  ]

  const processAr = [
    {
      step: 'الاجتماع وتحديد النطاق',
      body: 'تغطي مكالمة تعريفية الهدف والجمهور وأين سيُعرض الفيلم واللغات والمخرجات. نتفق على النطاق قبل طلب أي تصريح.',
    },
    {
      step: 'التصاريح واللوجستيات',
      body: 'يتولى منتجونا تصاريح التصوير والموافقات الأمنية والتنسيق الأمني للمواقع الحكومية والخاصة. ونؤكد السفر والإقامة ونقل المعدات من مقرنا في الخبر.',
    },
    {
      step: 'ما قبل الإنتاج في الموقع',
      body: 'يستطلع منتج الموقع في الرياض مسبقًا، ويثبت قوائم اللقطات مع فريقك، ويمشي المسار مع الأمن في الموقع عند الحاجة.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'يصل الطاقم بالكاميرات والإضاءة والصوت. يركّز فريقك على الظهور أمام الكاميرا، وندير نحن المجموعة والجدول والاستجابة للحرارة أو المرور أو نوافذ الصلاة.',
    },
    {
      step: 'ما بعد الإنتاج والتسليم',
      body: 'يُنجز المونتاج وتصحيح الألوان ومزج الصوت والجرافيك داخليًا في الخبر. تُسلَّم الأفلام النهائية بكل الصيغ التي تحتاجها قنواتك، بالعربية والإنجليزية بشكل معياري.',
    },
  ]

  const logisticsHeadingEn = 'Logistics, in plain language'
  const logisticsHeadingAr = 'اللوجستيات بلغة واضحة'

  const logisticsEn =
    'Travel from our Al Khobar base to Riyadh is a six-hour run that we treat as standard. Our crew drives with the gear in our own vehicles, so equipment arrival on set is not dependent on third-party freight. Accommodation and transport in Riyadh are arranged by our producers in advance, and a producer is on location from the prep day through the wrap. For projects that need to fly — shoots outside the capital, multi-city campaigns, or remote industrial sites — we handle flight bookings and the same on-the-ground producer model, with the same crew and the same equipment regardless of where the work takes us.'
  const logisticsAr =
    'يعتبر السفر من مقرنا في الخبر إلى الرياض ست ساعات نتعامل معها بوصفها أمرًا معتادًا. يقود طاقمنا بسياراتنا الخاصة ومعه المعدات، فلا يرتبط وصول المعدات إلى الموقع بشركة شحن خارجية. يتولى منتجونا الإقامة والتنقل في الرياض مسبقًا، ويكون المنتج موجودًا في الموقع من يوم التحضير حتى نهاية التصوير. وللمشاريع التي تستوجب السفر جوًا — التصوير خارج العاصمة أو الحملات متعددة المدن أو المواقع الصناعية النائية — نتكفل بحجز الرحلات ونموذج المنتج نفسه في الموقع، بالطاقم نفسه والمعدات نفسها بصرف النظر عن مكان العمل.'

  const faqData = [
    {
      qEn: 'Is your team based in Riyadh?',
      aEn: 'No — our base is in Al Khobar, and our crew travels to Riyadh for every production. That means you get the same team on every shoot, not whoever happens to be free in the city.',
      qAr: 'هل فريقكم متمركز في الرياض؟',
      aAr: 'لا — مقرنا في الخبر، ويسافر طاقمنا إلى الرياض لكل إنتاج. هذا يعني أنك تحصل على الفريق نفسه في كل تصوير، لا على من يتوفر في المدينة.',
    },
    {
      qEn: 'How do you handle filming permits in Riyadh?',
      aEn: 'Our producers handle the full permit process for government districts, private compounds, and commercial sites. We confirm the permit status before we book travel, so the production day is not at risk of being stopped on arrival.',
      qAr: 'كيف تتعاملون مع تصاريح التصوير في الرياض؟',
      aAr: 'يتولى منتجونا عملية التصاريح كاملة للأحياء الحكومية والخصوصات الخاصة والمواقع التجارية. ونؤكد حالة التصريح قبل حجز السفر، حتى لا يتعرض يوم الإنتاج لخطر الإيقاف عند الوصول.',
    },
    {
      qEn: 'Can you film at government sites and ministries?',
      aEn: 'Yes — we have produced work for government and semi-government clients, and we follow the protocol and security coordination each site requires. Permits and clearances are scoped in the pre-production phase.',
      qAr: 'هل تصوّرون في المواقع الحكومية والوزارات؟',
      aAr: 'نعم — أنتجنا أعمالًا لجهات حكومية وشبه حكومية، ونلتزم بالبروتوكول والتنسيق الأمني الذي يتطلبه كل موقع. تُحدد التصاريح والموافقات في مرحلة ما قبل الإنتاج.',
    },
    {
      qEn: 'How long should we book in advance?',
      aEn: 'For most corporate shoots in Riyadh, two to three weeks is comfortable. Larger campaigns, multi-day event coverage, or work requiring government permits need more lead time. Urgent timelines are sometimes possible — call to discuss.',
      qAr: 'قبل كم يجب أن نحجز؟',
      aAr: 'يكفي أسبوعان إلى ثلاثة لمعظم تصوير الشركات في الرياض. وتحتاج الحملات الأكبر وتغطية الفعاليات متعددة الأيام والأعمال التي تستوجب تصاريح حكومية مهلة أطول. تتاح أحيانًا جداول عاجلة — اتصل بنا للنقاش.',
    },
    {
      qEn: 'Do you produce in Arabic and English?',
      aEn: 'Yes — bilingual productions are our normal. We script natively in both languages, cast voiceover in either, and subtitle or caption as needed for the channels you will publish on.',
      qAr: 'هل تنتجون بالعربية والإنجليزية؟',
      aAr: 'نعم — الإنتاج ثنائي اللغة هو عملنا المعتاد. نكتب السيناريو أصالةً باللغتين، ونختار التعليق الصوتي بأي منهما، ونضيف الترجمة أو النص الفرعي حسب القنوات التي ستنشر فيها.',
    },
    {
      qEn: 'What about the summer heat?',
      aEn: 'Outdoor shoots in Riyadh between June and August are planned around early-morning and golden-hour windows, with interiors and air-conditioned locations slotted in for the middle of the day. We build this into the schedule before the day arrives, not after.',
      qAr: 'ماذا عن حرارة الصيف؟',
      aAr: 'يُخطط للتصوير الخارجي في الرياض بين يونيو وأغسطس حول نوافذ الصباح الباكر والساعة الذهبية، مع جدولة التصوير الداخلي والمواقع المكيفة في منتصف النهار. ونبني ذلك في الجدول قبل وصول اليوم، لا بعده.',
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
  const linkPodcast = isArabic ? 'إنتاج البودكاست' : 'podcast production'

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

      {/* Why Riyadh, why us */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? riyadhHeadingAr : riyadhHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? riyadhAr : riyadhEn}
        </p>
      </Section>

      {/* What we film in Riyadh */}
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

      {/* How a Riyadh production runs */}
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
            href={`/${locale}/podcast-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPodcast}
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
