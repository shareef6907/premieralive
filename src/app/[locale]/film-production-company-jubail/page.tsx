import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'film-production-company-jubail'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'شركة إنتاج أفلام في الجبيل | بريمييرا لايف'
      : 'Film Production Company in Jubail | Premiera Live',
    description: isArabic
      ? 'إنتاج أفلام في الجبيل للمصانع والموردين ومواقع الطاقة. مقرنا في الخبر، ونصوّر الجبيل بطاقمنا ومعداتنا.'
      : 'Film production in Jubail for factories, suppliers, and energy sites. We are based in Al Khobar and shoot Jubail with our own crew and equipment.',
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
        ? 'شركة إنتاج أفلام في الجبيل | بريمييرا لايف'
        : 'Film Production Company in Jubail | Premiera Live',
      description: isArabic
        ? 'إنتاج أفلام في الجبيل للمصانع والموردين ومواقع الطاقة. مقرنا في الخبر، ونصوّر الجبيل بطاقمنا ومعداتنا.'
        : 'Film production in Jubail for factories, suppliers, and energy sites. We are based in Al Khobar and shoot Jubail with our own crew and equipment.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'شركة إنتاج أفلام في الجبيل | بريمييرا لايف'
        : 'Film Production Company in Jubail | Premiera Live',
      description: isArabic
        ? 'إنتاج أفلام في الجبيل للمصانع والموردين ومواقع الطاقة. مقرنا في الخبر، ونصوّر الجبيل بطاقمنا ومعداتنا.'
        : 'Film production in Jubail for factories, suppliers, and energy sites. We are based in Al Khobar and shoot Jubail with our own crew and equipment.',
    },
  }
}

export default async function FilmProductionJubailPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'شركة إنتاج أفلام في الجبيل' : 'Film Production Company in Jubail'

  const h1En = 'Film Production Company in Jubail'
  const h1Ar = 'شركة إنتاج أفلام في الجبيل'

  const heroEn =
    'Premiera Live produces films in Jubail for industrial operators, suppliers, engineering groups, and the companies that serve them. We are based in Al Khobar and our crew, our vehicles, and our equipment already work the Jubail corridor as part of their regular week — so a Jubail shoot runs on the same footing as any other job we take. We film inside the industrial city and the surrounding industrial areas: production lines, process plants, warehouses and yards, port and logistics operations, corporate offices in the city, and the meeting rooms where the decisions are actually made. Cameras, lighting, sound, editing, and colour are all ours, and post-production is finished in-house in Al Khobar rather than sent out to a third party.'
  const heroAr =
    'تنتج بريمييرا لايف الأفلام في الجبيل لمشغلي الصناعة والموردين ومجموعات الهندسة والشركات التي تخدمهم. ومقرنا في الخبر، ويعمل طاقمنا ومركباتنا ومعداتنا على ممر الجبيل ضمن عملهم الأسبوعي المعتاد — ولذلك يجري التصوير في الجبيل بالأولوية نفسها التي يجري بها أي عمل آخر نتخذه. نصوّر داخل المدينة الصناعية وفي المناطق الصناعية المحيطة بها: خطوط الإنتاج والمصانع والمستودعات والساحات، وعمليات الميناء واللوجستيات، والمكاتب الشركاتية في المدينة، وقاعات الاجتماعات حيث تتخذ القرارات فعليًا. أما الكاميرات والإضاءة والصوت والمونتاج وتصحيح الألوان فكلها لنا، وتُنجز أعمال ما بعد الإنتاج داخليًا في الخبر لا أن تُسلَّم إلى طرف ثالث.'
  const jubailHeadingEn = 'Why Jubail is a different kind of shoot'
  const jubailHeadingAr = 'لماذا الجبيل تصوير من نوع مختلف'

  const jubailEn =
    'Jubail is not a business district with a few factories on the edge. The city was built as an industrial city, and that shapes everything about filming there. A commercial that looks for a glass tower and a car park will not find one, and a documentary that wants a manufacturing floor will find exactly what it came for. The light is different too: much of the industrial area is open ground with hard reflected light off concrete and metal, the sun is high and direct for a large part of the day, and the spaces between facilities mean the wind moves differently than it does in the Dammam metro. Dust, salt haze from the coast, and equipment that has to move across open ground between parking and set all change the plan. So we plan for the site rather than for the city: the shot list is built around what the facility can actually give us, the call times are set to work with the site’s own shift pattern, and the crew positions itself so that nobody has to carry a long lens across a service road at the wrong hour.'
  const jubailAr =
    'الجبيل ليست حيًا تجاريًا تتفرّق فيه مصانع قليلة على أطرافه. بُنيت المدينة مدينةً صناعية، وهذا يغيّر كل ما يتعلق بالتصوير فيها. فالتعليق الإعلاني الذي تبحث عن برج زجاجي وموقف سيارات لن يجدهما، والوثائقي الذي يريد أرضية تصنيع سيجد أمامه بالضبط ما جاء من أجله. والإضاءة مختلفة أيضًا: فمساحات واسعة من المنطقة الصناعية أرضٌ مكشوفة وإضاءةٌ منعكسة قوية عن الخرسانة والمعدن، والشمس مرتفعة مباشرة طوال جزء كبير من اليوم، والمسافات بين المنشآت تجعل الرياح تسلك مسارًا مختلفًا عن مسارها في نطاق الدمام. وتغيّر الغبار ورذاذ الملح من الساحل والمعدات التي تضطر إلى الانتقال عبر أرض مكشوفة بين الموقف والموقع كل ذلك يغيّر الخطة. ولذلك نخطط للموقع لا للمدينة: تُبنى قائمة اللقطات حول ما يمكن للمنشأة أن تمنحه فعلًا، وتُحدَّد أوقات الوصول بما يوافق نمط الورديات في الموقع نفسه، ويضع الطاقم نفسه في مواضعه بحيث لا يضطر أحد إلى حمل عدسة طويلة عبر طريق خدمة في ساعة غير مناسبة.'

  const servicesHeadingEn = 'What we film in Jubail'
  const servicesHeadingAr = 'ماذا نصوّر في الجبيل'

  const servicesEn = [
    {
      title: 'Safety, induction, and training films',
      body: 'Site induction walkthroughs, task-based safety films, and onboarding content made inside the facility and built with the site’s own procedures as the source material.',
    },
    {
      title: 'Operational and process documentaries',
      body: 'Films that explain how a line, a plant, or a supply chain actually runs — from the loading bay to the finished unit — for operating companies and their investors.',
    },
    {
      title: 'Corporate and supplier films',
      body: 'Company profiles, capability decks, and customer-facing films for suppliers and engineering firms who need to show working capability rather than describe it.',
    },
    {
      title: 'Port, yard, and logistics coverage',
      body: 'Container handling, freight movement, and yard operations filmed where the work happens, including drone-permitted establishing shots where the site allows them.',
    },
    {
      title: 'Product and commercial campaigns',
      body: 'Campaigns for industrial and technical brands, cut in versions for television, social, and trade events, with bilingual deliverables as standard.',
    },
    {
      title: 'Event and exhibition coverage',
      body: 'Trade exhibitions, plant open days, and corporate functions in the city’s venue circuit, with multi-camera switching and same-day social cuts when the schedule asks for them.',
    },
  ]

  const servicesAr = [
    {
      title: 'أفلام السلامة والتأهيل والتدريب',
      body: 'جولات تأهيل المواقع وأفلام السلامة المرتبطة بالمهام ومحتوى التهيئة، تُنتَج داخل المنشأة وتُبنى على إجراءات الموقع نفسه بوصفها المادة المصدر.',
    },
    {
      title: 'وثائقيات العمليات والعمليات الصناعية',
      body: 'أفلام تشرح كيف يعمل خط أو مصنع أو سلسلة إمداد فعليًا — من رصيف التحميل إلى المنتج النهائي — للمشغلين وللمستثمرين في هذه القطاعات.',
    },
    {
      title: 'أفلام الشركات والموردين',
      body: 'أفلام تعريفية بالشركات وعروض قدرات وأفلام موجهة للعملاء للموردين وشركات الهندسة الذين يحتاجون إلى إظهار القدرة العملية بدل وصفها.',
    },
    {
      title: 'تغطية الميناء والساحات واللوجستيات',
      body: 'مناولة الحاويات وحركة الشحن وعمليات الساحات، تُصوَّر حيث يجري العمل، مع لقطات تأسيسية بالطائرات المسيّرة متى يسمح الموقع بذلك.',
    },
    {
      title: 'حملات المنتجات والإعلانات',
      body: 'حملات للعلامات الصناعية والتقنية، بنسخ مخصصة للتلفزيون والمنصات الاجتماعية ومعارض القطاع، ومخرجات ثنائية اللغة بشكل معياري.',
    },
    {
      title: 'تغطية الفعاليات والمعارض',
      body: 'معارض تجارية وأيام مفتوحة في المصانع ومناسبات الشركات في قاعات المدينة، مع تبديل متعدد الكاميرا ومقاطع اجتماعية في اليوم ذاته حين تستوجب الجداول ذلك.',
    },
  ]

  const processHeadingEn = 'How a Jubail production runs'
  const processHeadingAr = 'كيف يسير إنتاج في الجبيل'

  const processEn = [
    {
      step: 'Brief and scope',
      body: 'A discovery call covers the goal, the audience, where the film will be used, the languages, and the deliverables. We agree the scope and the locations before anything is booked.',
    },
    {
      step: 'Site clearance and safety coordination',
      body: 'Our producers arrange filming permissions and work with the facility’s safety team to agree access routes, restricted areas, and the personal protective equipment the crew must wear on the day. We confirm clearance before the shoot date is fixed.',
    },
    {
      step: 'Scouting on site',
      body: 'A producer walks the location in advance — checking the light at the hour you intend to shoot, the route equipment takes from the gate to the set, power availability, noise limits, and where the crew can park without blocking operations.',
    },
    {
      step: 'Production day',
      body: 'The crew arrives with cameras, lighting, and sound. Your team focuses on the work and the people on camera; we run the set, the schedule, and the contingency for access restrictions, shifting light, or a space that must be cleared before we can set up.',
    },
    {
      step: 'Post-production and delivery',
      body: 'Edit, colour grade, sound mix, and graphics are finished in-house in Al Khobar. Final films are delivered in every format your channels need, in Arabic and English as standard.',
    },
  ]

  const processAr = [
    {
      step: 'الاجتماع وتحديد النطاق',
      body: 'تغطي مكالمة تعريفية الهدف والجمهور وأين سيُستخدم الفيلم واللغات والمخرجات. ونتفق على النطاق وعلى المواقع قبل تثبيت أي حجز.',
    },
    {
      step: 'الموافقات على الموقع والتنسيق مع السلامة',
      body: 'يتولى منتجونا أذونات التصوير ويعملون مع فريق السلامة في المنشأة للاتفاق على مسارات الدخول والمناطق المقيّدة ومعدات الوقاية الشخصية التي يجب أن يرتديها الطاقم في يوم التصوير. ونؤكد اكتمال الموافقات قبل تثبيت يوم التصوير.',
    },
    {
      step: 'الاستطلاع في الموقع',
      body: 'يمشي منتج على الموقع مسبقًا — ويتحقق من الضوء في الساعة التي تنوي التصوير فيها، ومن مسار المعدات من البوابة إلى موقع التصوير، ومن توفّر الكهرباء وحدود الضوضاء، ومن مكان توقف الطاقم دون تعطيل سير العمل.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'يصل الطاقم بالكاميرات والإضاءة والصوت. يركّز فريقك على العمل وعلى الأشخاص أمام الكاميرا، وندير نحن المجموعة والجدول والاستجابة لقيود الدخول وتغيّر الضوء أو مساحة تحتاج إخلاء قبل أن نبدأ التركيب.',
    },
    {
      step: 'ما بعد الإنتاج والتسليم',
      body: 'يُنجز المونتاج وتصحيح الألوان ومزج الصوت والجرافيك داخليًا في الخبر. وتُسلَّم الأفلام النهائية بكل الصيغ التي تحتاجها قنواتك، بالعربية والإنجليزية بشكل معياري.',
    },
  ]

  const logisticsHeadingEn = 'Working in Jubail from Al Khobar'
  const logisticsHeadingAr = 'العمل في الجبيل انطلاقًا من الخبر'

  const logisticsEn =
    'Our base in Al Khobar is roughly an hour north of the Jubail industrial area along the same coastal route that the working day follows. That distance is short enough that equipment moves on our own vehicles and the crew arrives with everything it needs, and long enough that we treat a Jubail day as a full production day rather than a gap between two other locations. In practice that means we start early, we shoot the site while the operation is running rather than waiting for it to stop, and we hold the equipment on location rather than shuttling back. For a multi-day industrial project the crew stays close to the site set, because the difference between two plants inside the same industrial area can be a long walk across open ground and a gate process at the other end. When a project genuinely sits outside the Kingdom, we handle the flights ourselves and keep the same on-the-ground producer and the same equipment, so the standard of the film does not depend on where the work is.'
  const logisticsAr =
    'يقع مقرنا في الخبر على بُعد ساعة تقريبًا شمالًا من المنطقة الصناعية في الجبيل، على الطريق الساحلي نفسه الذي يسير عليه يوم العمل. وهذا المسار قصير بما يكفي لتتحرك المعدات على سياراتنا الخاصة ويصل الطاقم بكل ما يحتاجه، وطويل بما يكفي لنعامل يوم الجبيل كيوم إنتاج كامل لا كفراغ بين موقعين. ويشمل ذلك عمليًا أن نبدأ مبكرًا، وأن نصوّر الموقع أثناء سير العمل لا في انتظار توقفه، وأن نُبقي المعدات في الموقع بدل تنقلها ذهابًا وإيابًا. وفي المشاريع الصناعية الممتدة على أيام تبقى الطاقم قريبة من مجموعة المواقع، لأن فارق موقعين داخل المنطقة الصناعية نفسها قد يكون مسافة طويلة عبر أرض مكشوفة وإجراءات دخول عند الطرف الآخر. وحين يقع المشروع فعلًا خارج المملكة، نتكفل بحجز الرحلات ونبقي المنتج نفسه في الموقع والمعدات نفسها، فلا تعتمد جودة الفيلم على مكان العمل.'

  const faqData = [
    {
      qEn: 'Are you based in Jubail?',
      aEn: 'No — our office is in Al Khobar, and that is where the crew, the equipment, and the edit suite are based. Jubail is part of the regular working area for our team, which is why we can produce there without an imported crew or a travel premium.',
      qAr: 'هل أنتم متمركزون في الجبيل؟',
      aAr: 'لا — مقرنا في الخبر، وهناك تقيم الطاقم والمعدات واستوديو المونتاج. والجبيل جزء من نطاق العمل المعتاد لفريقنا، ولذلك ننتج فيها دون طاقم مستورد وبلا رسوم سفر.',
    },
    {
      qEn: 'Can you film inside a refinery, plant, or warehouse?',
      aEn: 'Yes. We shoot inside working industrial facilities — production lines, process areas, warehouses, and yards — with every filming area agreed in advance with the site safety team, and the crew works to the access and protective-equipment rules that apply on the day.',
      qAr: 'هل تصوّرون داخل مصفاة أو منشأة أو مستودع؟',
      aAr: 'نعم. نصوّر داخل المنشآت الصناعية العاملة — خطوط الإنتاج ومناطق العمليات والمستودعات والساحات — بعد الاتفاق المسبق مع فريق السلامة في الموقع على كل منطقة تصوير، ويعمل الطاقم وفق قواعد الدخول ومعدات الوقاية الشخصية المطبقة في ذلك اليوم.',
    },
    {
      qEn: 'What does filming in an industrial site need from us?',
      aEn: 'A named contact who can authorise filming, the safety rules that will apply to the crew, and confirmation of which areas are clear. We handle the filming permission itself and coordinate with your safety team directly.',
      qAr: 'ماذا يتطلب التصوير في موقع صناعي منكم؟',
      aAr: 'مسؤولًا محددًا بالاسم يستطيع التصريح بالتصوير، وقواعد السلامة التي ستطبق على الطاقم، وتأكيد المناطق التي خلت. أما إذن التصوير نفسه فنتكفل به ونتنسيق مع فريق السلامة لديكم مباشرة.',
    },
    {
      qEn: 'Do you work with drone coverage in Jubail?',
      aEn: 'We use aerial establishing shots where the site permits them and the conditions allow, with the approval handled in advance. Where airspace or site rules do not permit it, we shoot the same establishing work from the ground so the film is not left with a gap.',
      qAr: 'هل تعملون بالطائرات المسيّرة في الجبيل؟',
      aAr: 'نستخدم اللقطات التأسيسية الجوية متى سمح الموقع والظروف الجوية. وتُجهَّز الموافقة مسبقًا. وحين لا تسمح قواعد الموقع أو قوانين الطيران بالتصوير الجوي، ننفّذ العمل التأسيسي نفسه من الأرض حتى لا يبقى في الفيلم فراغ.',
    },
    {
      qEn: 'Can you produce a film in Arabic and English at the same time?',
      aEn: 'Yes. Bilingual productions are our normal. We script natively in both languages, record voiceover in either, and deliver subtitles or captions for whichever channels you publish on.',
      qAr: 'هل تنتجون فيلمًا بالعربية والإنجليزية معًا؟',
      aAr: 'نعم. الإنتاج ثنائي اللغة هو عملنا المعتاد. نكتب السيناريو أصالةً باللغتين، ونسجل التعليق الصوتي بأي منهما، ونسلّم ترجمة أو نصًا فرعيًا للقنوات التي ستنشر فيها.',
    },
    {
      qEn: 'How far in advance should we book a Jubail shoot?',
      aEn: 'Two to three weeks works for most corporate, supplier, and event work in the city. Facility shoots inside an industrial site need more lead time, because safety clearance and access approval have to be arranged with the site before a date can be confirmed.',
      qAr: 'قبل كم يجب أن نحجز تصويرًا في الجبيل؟',
      aAr: 'يكفي أسبوعان إلى ثلاثة لمعظم أعمال الشركات والموردين والفعاليات في المدينة. أما التصوير داخل موقع صناعي فيحتاج مهلة أطول، لأن اعتماد السلامة والموافقة على الدخول تُنَسَّق مع الموقع قبل تأكيد أي تاريخ.',
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
  const linkDammam = isArabic ? 'إنتاج الأفلام في الدمام' : 'film production in Dammam'
  const linkRiyadh = isArabic ? 'إنتاج الأفلام في الرياض' : 'film production in Riyadh'

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

      {/* Why Jubail is a different kind of shoot */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? jubailHeadingAr : jubailHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? jubailAr : jubailEn}
        </p>
      </Section>

      {/* What we film in Jubail */}
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

      {/* How a Jubail production runs */}
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
            href={`/${locale}/film-production-company-dammam`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkDammam}
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
