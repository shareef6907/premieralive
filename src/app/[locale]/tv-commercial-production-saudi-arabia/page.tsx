import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'tv-commercial-production-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  const title = isArabic
    ? 'إنتاج الإعلانات التلفزيونية في السعودية | بريمييرا لايف'
    : 'TV Commercial Production in Saudi Arabia | Premiera Live'
  const description = isArabic
    ? 'إنتاج إعلانات تلفزيونية في السعودية — سيناريو وتصوير سينمائي ومونتاج نسخ متعددة للتلفزيون والمنصات الرقمية.'
    : 'TV commercial production in Saudi Arabia — concept, cinematic shooting, and edits cut for television and digital platforms from one crew.'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'en-SA': `${DOMAIN}/en/${PATH}`,
        'ar-SA': `${DOMAIN}/ar/${PATH}`,
        'x-default': `${DOMAIN}/en/${PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function TvCommercialPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'إنتاج الإعلانات التلفزيونية' : 'TV Commercial Production'

  const h1En = 'TV Commercial Production in Saudi Arabia'
  const h1Ar = 'إنتاج الإعلانات التلفزيونية في السعودية'

  const heroEn =
    'A television commercial is not a long film cut down to thirty seconds. It has to work in a slot where the viewer is not looking for it, in a sound that is often half the volume of the room, and against a channel change that happens the instant the idea stops earning attention. That constraint is the whole craft. Premiera Live produces TV commercials for Saudi brands — concept, script, casting, production, colour, sound, and every cut the campaign needs — with one crew responsible from the first brief to the final deliverable. We shoot on cinema equipment with our own crew, we finish the grade and the mix in-house, and we deliver the broadcast master alongside the versions the rest of the campaign runs on. Whether the spot is for a national network, a regional channel, a streaming service, or a screen in a mall, the discipline is the same: the first three seconds have to be worth the next twenty-seven.'
  const heroAr =
    'الإعلان التلفزيوني ليس فيلمًا طويلًا مقصوصًا إلى ثلاثين ثانية. عليه أن ينجح في فاصل زمني لا يبحث فيه المشاهد عنه، وفي صوت كثيرًا ما يكون نصف صوت الغرفة، أمام زر تغيير القناة الذي يُضغط في اللحظة التي تتوقف فيها الفكرة عن كسب الانتباه. هذا القيد هو جوهر الحرفة كلها. تنتج بريمييرا لايف الإعلانات التلفزيونية للعلامات السعودية — من الفكرة والسيناريو واختيار الممثلين إلى الإنتاج والتلوين والصوت وكل نسخ الحملة — بفريق واحد مسؤول من الموجز الأول حتى التسليم النهائي. نصوّر بمعدات سينمائية بطاقمنا الخاص، وننهي التلوين ومزج الصوت داخليًا، ونسلّم نسخة البث إلى جانب النسخ التي تُشغَّل في بقية الحملة. سواء كان الإعلان لشبكة وطنية أو قناة إقليمية أو منصة بث أو شاشة في مركز تجاري، فالقاعدة واحدة: أول ثلاث ثوانٍ تستحق السبع والعشرين بعدها.'

  const whyHeadingEn = 'What a thirty-second slot actually demands'
  const whyHeadingAr = 'ما الذي يتطلبه فعلًا فاصل الثلاثين ثانية'

  const whyEn =
    'Every decision in a television commercial is made inside a constraint the audience never sees. The runtime is fixed, so the number of ideas is fixed. A thirty-second spot has room for one idea and one feeling — a second message does not get diluted, it gets cut. The sound has to work at any volume because a Saudi living room at nine in the evening is not a screening room, and a phone speaker in a shop corridor is even less forgiving. The image has to read in the first second because viewers reach for the remote faster than they reach for patience. And the delivery has to survive a translation into Arabic and English, a cropped vertical version for social, and a fifteen-second cut for pre-roll — because a campaign that only works in its original format is a campaign that runs once. We plan for those versions from the script stage rather than after the edit, so the extra cuts are made from the same material and read as the same idea rather than as separate films that happen to share a logo. That is the difference between a commercial that was produced and a commercial that was designed.'
  const whyAr =
    'كل قرار في الإعلان التلفزيوني يُتخذ ضمن قيد لا يراه الجمهور. المدة ثابتة، فعدد الأفكار ثابت. في إعلان من ثلاثين ثانية يتسع لفكرة واحدة وإحساس واحد — أما الفكرة الثانية فلا تضعف، بل تُحذف. والصوت يجب أن يعمل عند أي مستوى صوت، فغرفة المعيشة السعودية في التاسعة مساءً ليست قاعة عرض، ومكبر الهاتف في ممر محل أقل تسامحًا بكثير. والصورة يجب أن تُقرأ في الثانية الأولى، لأن المشاهد يمد يده إلى الريموت أسرع مما يمدها إلى الصبر. والتسليم يجب أن ينجو من الترجمة إلى العربية والإنجليزية، ومن القص العمودي للمنصات الاجتماعية، ومن النسخة الخماسية عشرة التي تسبق الفيديو — لأن الحملة التي لا تعمل إلا في صيغتها الأصلية هي حملة تُشغَّل مرة واحدة. نخطط لهذه النسخ من مرحلة السيناريو لا بعد المونتاج، فتُصنع النسخ الإضافية من المادة نفسها وتُقرأ كفكرة واحدة لا كأفلام منفيلة تشترك في شعار. هذا هو الفرق بين إعلان أُنتج وإعلان صُمِّم.'

  const typesHeadingEn = 'What we produce'
  const typesHeadingAr = 'ما الذي ننتجه'

  const typesEn = [
    {
      title: 'National television spots',
      body: 'Broadcast-standard films built for a network slot — with the clean handles, safe areas, and loudness the broadcaster expects, delivered as the master the station requires.',
    },
    {
      title: 'Regional and local campaigns',
      body: 'Campaigns built for a specific market or a set of stores, where the audience is local, the message is direct, and the versions are cut for the channels that actually reach them.',
    },
    {
      title: 'Product and launch films',
      body: 'A product that has to be understood in seconds: how it works, what it does for the person using it, and the one image that carries the whole idea.',
    },
    {
      title: 'Brand and image campaigns',
      body: 'Commercials that carry the idea of the brand rather than the specification of a product — built around a tone, a world, and a way of speaking that the whole campaign can repeat.',
    },
    {
      title: 'Commercials with a spokesperson',
      body: 'Films built around a presenter or an on-camera team member, written so the lines sound spoken rather than read, and shot so the performance holds across every cut of the campaign.',
    },
    {
      title: 'Multi-version campaign packages',
      body: 'One shoot delivered as a set of matched cuts — the main film, the shorter cut, the vertical version, and the still frames — so the campaign runs in every place it is booked without a second production.',
    },
  ]

  const typesAr = [
    {
      title: 'إعلانات التلفزيون الوطنية',
      body: 'أفلام مطابقة لمتطلبات البث وموجهة لفاصل زمني على الشبكة — بمؤشرات صورة نظيف ومناطق آمنة ومستوى صوت يطابق ما تتوقعه القناة، تُسلَّم النسخة الرئيسية التي تطلبها الشبكة.',
    },
    {
      title: 'الحملات الإقليمية والمحلية',
      body: 'حملات مصممة لسوق محدد أو لمجموعة فروع، حيث يكون الجمهور محليًا والرسالة مباشرة والنسخ مقصوصة للقنوات التي تصله فعلًا.',
    },
    {
      title: 'أفلام المنتجات والإطلاقات',
      body: 'منتج يجب أن يُفهم خلال ثوانٍ: كيف يعمل، وما الذي يفعله بالشخص الذي يستخدمه، والصورة الواحدة التي تحمل الفكرة كلها.',
    },
    {
      title: 'حملات العلامة والصورة',
      body: 'إعلانات تحمل فكرة العلامة بدل مواصفات المنتج — مبنية على نبرة وعالم وطريقة كلام تتكرر في الحملة كلها.',
    },
    {
      title: 'إعلانات تقديمية بشخصية متحدث',
      body: 'أفلام مبنية حول مقدّم أو عضو فريق أمام الكاميرا، مكتوبة تبدو منطوقة لا مقروءة، ومصوَّرة بحيث يبقى الأداء ثابتًا في كل نسخ الحملة.',
    },
    {
      title: 'حزم حملات متعددة النسخ',
      body: 'تصوير واحد يُسلَّم مجموعة نسخ متطابقة — الفيلم الرئيسي، والنسخة الأقصر، والنسخة العمودية، وصور الإطار — لتعمل الحملة في كل مكان تُحجز فيه دون إنتاج ثانٍ.',
    },
  ]

  const processHeadingEn = 'How a commercial gets made'
  const processHeadingAr = 'كيف يُصنع الإعلان'

  const processEn = [
    {
      step: 'The brief behind the brief',
      body: 'We start with the business objective, not the shot list. What has to be true after the spot airs? Who is watching, what do they already believe about the brand, and what single idea would change that? We write that down before anyone talks about locations.',
    },
    {
      step: 'Concept and script',
      body: 'Written for the ear and for the stopwatch. A script that has to be read aloud gets tested out loud, because a line that works on the page can fall flat in a living room. The script arrives with timings that leave room for the silence a good commercial depends on.',
    },
    {
      step: 'Casting and pre-production',
      body: 'Casting, location scouting, wardrobe, and the paper work that lets a shoot happen on schedule — permits, contracts, and clearances agreed before the crew is loaded, so the day is spent filming rather than waiting.',
    },
    {
      step: 'Production day',
      body: 'Cinema cameras, a crew that has worked together before, and a schedule built around light and locations rather than around convenience. Most of the day is spent waiting for the light to be right and the frame to be right — that wait is the work.',
    },
    {
      step: 'Post, grade, and sound',
      body: 'Edit, colour, and sound design finished by the same team that shot it, so the picture is graded for how it was lit and the mix is built for the channels it will run on rather than for a monitor in the edit room.',
    },
    {
      step: 'Versions and delivery',
      body: 'The main film, the shorter cut, the vertical cut, the still frames, and the caption files — all from the same grade and mix, delivered with the broadcast specs the channels require and with the source files kept so a later revision is quick.',
    },
  ]

  const processAr = [
    {
      step: 'الموجز خلف الموجز',
      body: 'نبدأ بهدف العمل لا بقائمة اللقطات. ما الذي يجب أن يتحقق بعد عرض الإعلان؟ من يشاهد، وما الذي يعتقده الجمهور عن العلامة أصلًا، وما الفكرة الواحدة التي تغيّر ذلك؟ نكتب ذلك قبل أن يتحدث أحد عن المواقع.',
    },
    {
      step: 'الفكرة والسيناريو',
      body: 'يُكتب للأذن ومؤقّت التصوير معًا. فالسيناريو الذي سيُقرأ بصوت مسموع يُختبر منطوقًا، لأن الجملة الناجحة على الورق قد تسقط في غرفة معيشة. ويصل السيناريو بتوقيتات تترك مجالًا للصمت الذي تعتمد عليه الإعلانات الجيدة.',
    },
    {
      step: 'اختيار الممثلين وما قبل الإنتاج',
      body: 'اختيار الممثلين، ومعاينة المواقع، وتنسيق الأزياء، والأوراق التي تجعل التصوير ممكزًا في موعده — التصاريح والعقود وإخلاءات الاستخدام متفق عليها قبل تحميل الطاقم، فيُقضى اليوم في التصوير لا في الانتظار.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'كاميرات سينمائية، وطاقم عمل معًا من قبل، وجدول مبني على الضوء والمواقع لا على الراحة. ومعظم اليوم يذهب في انتظار الضوء الصحيح والإطار الصحيح — وهذا الانتظار هو العمل نفسه.',
    },
    {
      step: 'المعالجة والتلوين والصوت',
      body: 'مونتاج وتلوين وتصميم صوت ينهيها الفريق نفسه الذي صوّر، فيُلوَّن الصورة وفق إضاءتها، ويُبنى المزج للقنوات التي سيُعرض عليها الإعلان لا لشاشة في غرفة المونتاج.',
    },
    {
      step: 'النسخ والتسليم',
      body: 'الفيلم الرئيسي، والنسخة الأقصر، والنسخة العمودية، وصور الإطار، وملفات الترجمة — كلها من التلوين والمزج نفسه، وتُسلَّم بالمواصفات التي تطلبها القنوات مع حفظ ملفات المصدر ليكون أي تعديل لاحق سريعًا.',
    },
  ]

  const deliveryHeadingEn = 'How the commercial gets used'
  const deliveryHeadingAr = 'كيف يُستخدم الإعلان'

  const deliveryEn =
    'A commercial that only exists as a thirty-second file is a commercial that has been made once. The useful version of the work is a set of matched cuts that a media team can place without going back to the producer: the main film for a channel slot, a shorter cut for the same campaign, a vertical version for social, a vertical version with the caption baked in for sound-off feeds, and a set of still frames for outdoor, print, and in-store placement. All of them come from the same grade and the same mix, so the spot looks like itself wherever it lands. There is a second reason to plan for this early. Saudi campaigns increasingly run in both languages, and a commercial that was written in one language cannot simply be redubbed — the line breaks, the emphasis, and the visual rhythm that supported the voice all have to be rebuilt for the other. We script and shoot with that in mind rather than treating the second language as a version delivered at the end. Because we also build websites and digital platforms, the same campaign can be wired into the site that the company already owns — with the media plan and the site managed as one piece of work rather than two teams handling two things that were never connected.'
  const deliveryAr =
    'الإعلان الذي لا وجود له إلا في ملف من ثلاثين ثانية هو إعلان أُنتج مرة واحدة. أما النسخة المفيدة من العمل فهي مجموعة نسخ متطابقة يستطيع فريق الإعلام وضعها دون الرجوع إلى المُنتِج: الفيلم الرئيسي لفاصل زمني على قناة، ونسخة أقصر للحملة نفسها، ونسخة عمودية للمنصات الاجتماعية، ونسخة عمودية بترجمة مطبوعة لخلاصات المشاهدة بلا صوت، ومجموعة صور إطار للاستخدام في الخارج والمطبوعات وداخل المتجر. وكلها من التلوين والمزج نفسه، فيبدو الإعلان كأنه نفسه أينما وصل. وهناك سبب ثانٍ للتخطيط المبكر لهذه النسخ. فالحملات السعودية تُشغَّر بشكل متزايد باللغتين، والإعلان المكتوب بلغة واحدة لا يُعَدَم بالترجمة البسيطة — فمواضع الوقوف في الجمل، وموضع التشديد، والإيقاع البصري الذي دعم الصوت، كلها عناصر يجب بناؤها من جديد للغة الأخرى. ونكتب ونصوّر وأنت هذا في الحسبان بدل تعامل اللغة الثانية كنسخة تُسلَّم في النهاية. ولأننا نبني المواقع والمنصات الرقمية أيضًا، يمكن توصيل الحملة نفسها بالموقع الذي تملكه الشركة أصلًا — مع إدارة خطة الإعلام والموقع كقطعة عمل واحدة بدل فريقين يتعاملان بشيئين لم يربطهما شيء.'

  const faqData = [
    {
      qEn: 'Do you produce commercials for television networks, or only for social?',
      aEn: 'Television networks, regional channels, streaming platforms, and social — and usually the same campaign needs several of them. We deliver to broadcast delivery specifications with clean handles and correct safe areas, alongside the social cuts, so one shoot covers the whole plan.',
      qAr: 'هل تنتجون إعلانات لشبكات التلفزيون أم للمنصات الاجتماعية فقط؟',
      aAr: 'لشبكات التلفزيون والقنوات الإقليمية ومنصات البث والمنصات الاجتماعية — وغالبًا ما تحتاج الحملة نفسها إلى أكثر من واحدة منها. نسلّم بمواصفات البث مع مؤشرات صورة نظيفة ومناطق آمنة صحيحة، إلى جانب نسخ التواصل، فيغطي تصوير واحد الخطة كلها.',
    },
    {
      qEn: 'How long does a commercial take to produce?',
      aEn: 'A single film is usually planned as a small number of clear stages — concept and script, pre-production, the shoot day, and post. Multi-version campaigns and campaigns with several locations take longer because the schedule is what grows, not the crew. We agree the schedule against a real deadline before the shoot rather than discovering the constraint afterwards.',
      qAr: 'كم يستغرق إنتاج الإعلان؟',
      aAr: 'الفيلم الواحد يُخطط عادةً على مراحل واضحة قليلة — فكرة وسيناريو، وما قبل الإنتاج، ويوم التصوير، والمعالجة. أما الحملات متعددة النسخ وذات المواقع المتعددة فتستغرق وقتًا أطول لأن الجدول هو ما ينمو لا الطاقم. ونتفق على الجدول مقابل موعد نهائي حقيقي قبل التصوير لا أن نكتشف القيد بعده.',
    },
    {
      qEn: 'Can you deliver the commercial in both Arabic and English?',
      aEn: 'Yes. For campaigns running in both languages we write each version natively, because a line written for English usually needs a different rhythm in Arabic to land the same way. Where a presenter appears on camera, the performance is shot so it holds for both. The client gets two masters rather than one film and a translation.',
      qAr: 'هل تسلّمون الإعلان بالعربية والإنجليزية؟',
      aAr: 'نعم. وللحملات التي تُشغَّر باللغتين نكتب كل نسخة أصالةً، لأن الجملة المكتوبة للإنجليزية تحتاج عادةً إيقاعًا مختلفًا بالعربية لتصل بال أثر نفسه. وإذا ظهر مقدّم على الشاشة، نصوّر الأداء بحيث يثبت للغتين. ويحصل العميل على نسختين رئيسيتين لا على فيلم واحد وترجمة.',
    },
    {
      qEn: 'Do you handle casting and location, or do we provide them?',
      aEn: 'We handle casting, location scouting, permits, and the scheduling, and we work with a location you already have when it suits the idea. If you have a venue or a product location that matters to the commercial, we plan the shoot around it from the first day rather than using it as an afterthought.',
      qAr: 'هل تتولون اختيار الممثلين والموقع أم نوفرهما؟',
      aAr: 'نتولى اختيار الممثلين ومعاينة المواقع والتصاريح والجدولة، ونعمل مع موقع تملكه أصلًا عندما يكون مناسبًا للفكرة. وإذا كان لديك قاعة أو موقع منتج مهم للإعلان، نخطط التصوير حوله منذ اليوم الأول لا نستخدمه كفكرة لاحقة.',
    },
    {
      qEn: 'What do you need from us before shooting?',
      aEn: 'A clear objective for the commercial, the product or service in plain terms, any claims that must appear, the languages and channels it will run on, and the deadline it has to meet. If the brief arrives early, the shoot runs short and the edit has options. If it arrives the night before, the same content still gets made — but the choices are made in a hurry.',
      qAr: 'ما الذي تحتاجونه منا قبل التصوير؟',
      aAr: 'هدف واضح للإعلان، والمنتج أو الخدمة بصيغة مباشرة، وأي ادعاءات يجب أن تظهر، واللغات والقنوات التي سيُشغَّر فيها، والموعد النهائي الواجب الوفاء به. فإذا وصل الموجز مبكرًا، قصّر التصوير وأتاح المونتاج خيارات أكثر. وإذا وصل في الليلة التي تسبق التصوير، يُنتج المحتوى نفسه — لكن القرارات تُتخذ على عجل.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkService = isArabic ? 'الأفلام الإعلانية' : 'commercial film production'
  const linkCorporate = isArabic ? 'الأفلام المؤسسية' : 'corporate video production'
  const linkAnimation = isArabic ? 'الرسوم المتحركة والمؤثرات' : 'animation and CGI'
  const linkPhotography = isArabic ? 'التصوير الاحترافي' : 'professional photography'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
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

      {/* What a thirty-second slot actually demands */}
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

      {/* What we produce */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? typesHeadingAr : typesHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? typesAr : typesEn).map((s, i) => (
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

      {/* How a commercial gets made */}
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

      {/* How the commercial gets used */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? deliveryHeadingAr : deliveryHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? deliveryAr : deliveryEn}
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
            {linkService}
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
            href={`/${locale}/services/animation-cgi-studio-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkAnimation}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/professional-photography-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPhotography}
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
