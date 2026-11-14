import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-hotels-hospitality-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي للفنادق والضيافة | بريمييرا لايف'
      : 'AI Hotel Websites for Saudi Hospitality',
    description: isArabic
      ? 'نبني مواقع ثنائية اللغة للفنادق والمنتجعات: حجز مباشر، وأسئلة عن الغرف والخدمات، ومحتوى متعدد اللغات يعمل على الجوال.'
      : 'We build bilingual hotel and resort websites with direct booking, answers about rooms and amenities, and multilingual content that works on mobile.',
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
        ? 'مواقع الذكاء الاصطناعي للفنادق والضيافة | بريمييرا لايف'
        : 'AI Hotel Websites for Saudi Hospitality',
      description: isArabic
        ? 'مواقع ثنائية اللغة للفنادق والمنتجعات: حجز مباشر، وإجابات فورية عن الغرف والخدمات، وتجربة سريعة على الجوال.'
        : 'Bilingual hotel and resort sites with direct booking, instant answers about rooms and amenities, and a fast mobile experience.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع الذكاء الاصطناعي للفنادق والضيافة | بريمييرا لايف'
        : 'AI Hotel Websites for Saudi Hospitality',
      description: isArabic
        ? 'مواقع فنادق ومنتجعات ثنائية اللغة مبنية للحجز المباشر وإجابات الضيوف الفورية.'
        : 'Bilingual hotel and resort websites built for direct booking and instant guest answers.',
    },
  }
}

export default async function AIWebsitesHotelsHospitalityPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'مواقع ذكاء اصطناعي للفنادق والضيافة في السعودية'
    : 'AI Websites for Hotels and Hospitality in Saudi Arabia'

  const h1En = 'AI Websites for Hotels and Hospitality in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي للفنادق والضيافة في السعودية'
  const heroEn = `A hotel website carries one of the hardest jobs in hospitality: convincing a guest to book directly instead of continuing the search they already started on a booking platform. That guest is often travelling, often on a phone, and often comparing two properties at once. They want to know whether the room is quiet, whether breakfast is included, whether the property suits families, and whether the dates they have in mind are actually available. A page of glossy photographs and a reservation button answers none of that without a phone call. Premiera Live builds bilingual hotel and resort websites where an AI assistant answers the practical questions from your own published information — room types, inclusions, check-in times, facilities, distance from the airport, family arrangements, and local attractions — and carries the guest through to the moment they are ready to enquire or reserve. The same site stays useful after the visit, because multilingual pages about destinations, seasonal experiences, and what to do nearby give a property something to rank for beyond its own name.`
  const heroAr = `يحمل موقع الفندق واحدة من أصعب مهام الضيافة: إقناع الضيف بالحجز المباشر بدل أن يكمل بحثه الذي بدأه على منصة حجز. وغالبًا ما يكون الضيف مسافرًا، ويحمل هاتفه، ويقارن بين منشأتين في الوقت نفسه. يريد معرفة هل الغرفة هادئة، وهل الإفطار مشمول، وهل المنشأة مناسبة للعائلات، وهل التواريخ التي ينويها متاحة فعلًا. صفحة مليئة بالصور اللامعة وزر حجز لا تجيب عن شيء من ذلك دون مكالمة هاتفية. تبني بريمييرا لايف مواقع فنادق ومنتجعات ثنائية اللغة يرد فيها مساعد ذكاء اصطناعي على الأسئلة العملية انطلاقًا من معلوماتك المنشورة — أنواع الغرف والمشمولات وأوقات الدخول والمرافق وقرب المطار وترتيبات العائلات والمعالم القريبة — ويقود الضيف حتى لحظة جاهزيته للاستفسار أو الحجز.

ويظل الموقع مفيدًا بعد الزيارة، لأن الصفحات متعددة اللغات عن الوجهات والتجارب الموسمية وما يمكن فعله بالقرب تمنح المنشأة ما تتصدّر به نتائج البحث إضافة إلى اسمها. ومن المهم هنا أن يكون المساعد جزءًا من تجربة الحجز لا إضافة جانبية: يعرض للضيف نوع الغرفة المناسب لما ذكره من طلبه، ويشرح ما يشمله السعر المنشور في صفحاتك دون أن يقرّر شيئًا لا تملك أنت تأكيده، ثم ينقله إلى فريق الحجوزات في الخطوة التالية. وبهذا الشكل يتوقف دور الضيف عن التنقل بين صفحة بصور ومكالمة هاتفية، وتبدأ الرحلة من سؤال واضح يجد له جوابًا داخل الموقع نفسه بلغة يفهمها.`

  const whyHeadingEn = 'Guests decide before they enquire, not after'
  const whyHeadingAr = 'الضيف يقرر قبل أن يستفسر لا بعده'

  const whyEn = `Hospitality search behaves differently from most buying journeys. A guest arrives with a place in mind, a date range, and a set of conditions that their previous experience taught them to filter on. The questions sound simple — is breakfast served, can families stay, is there a pool, does the room have a bath, how far is the airport — but each one is a qualification step. If the website only publishes a room gallery and a booking engine, the guest either makes a call to the front desk or leaves to search again. Every question that cannot be answered on the page is a question where a competitor with a more complete site can answer first. The second reason AI matters here is language. Saudi hospitality serves guests from different markets, and guests often search before they can comfortably call. Arabic-first content with a reliable English version, and an assistant that answers in the language of the visit, removes the barrier that pushes a guest toward a platform listing rather than the property itself. The assistant is grounded in your published information, hands a conversation to your team when a question concerns a specific booking, and is configured so it never invents availability, rates, or arrangements that your team has not confirmed.`
  const whyAr = `يسلك البحث في الضيافة مسارًا مختلفًا عن معظم مسارات الشراء. يصل الضيف بمكان في ذهنه، ونطاق تواريخ، وشروط اعتاده عليها من تجربته السابقة. تبدو الأسئلة بسيطة — هل يُقدَّم الإفطار، وهل يمكن للعائلات الإقامة، وهل يوجد مسبح، وهل في الغرفة حمام، وكم تبعد المطار — لكن كل سؤال منها يمثل مرحلة تأهيل. وإذا لم ينشر الموقع سوى معرض غرف ومحرك حجز، فإن الضيف يتصل بمكتب الاستقبال أو يعود إلى البحث من جديد. وكل سؤال لا يمكن الإجابة عنه في الصفحة هو سؤال يسبقك فيه منافس يملك موقعًا أكثر اكتمالًا. وتزداد أهمية هذا كله في المواسم التي يرتفع فيها الطلب: حين يتساوى عدد الغرف المتاحة مع عدد الباحثين عن غرفة، لا يتقدم بالضرورة من يحجز أسرع، بل من يشرح نفسه أوضح. فالوصف الفعّال في هذه اللحظة هو الذي يجيب قبل أن يتصل الضيف لا بعد أن يتصل، لا الذي يكرر عبارات تسويقية عن تجربة لا يعرف الضيف بعد.

والسبب الثاني لأهمية الذكاء الاصطناعي هنا هو اللغة. تخدم الضيافة السعودية ضيوفًا من أسواق مختلفة، وكثيرًا ما يبحث الضيف قبل أن يجد نفسه مرتاحًا للاتصال. المحتوى العربي أولًا مع نسخة إنجليزية موثوقة، ومساعد يجيب بلغة الزائر، يزيل الحاجز الذي يدفع الضيف إلى إدراج منشأتك في منصة بدلًا من موقعك. ويستند المساعد إلى معلوماتك المنشورة، ويحوّل المحادثة إلى فريقك حين يتعلق السؤال بحجز بعينه، ويُضبط بحيث لا يخترع توفرًا أو أسعارًا أو ترتيبات لم يؤكدها فريقك. وتحتاج هذه المعالجة أن تكون مبنية على محتوى محدث ومنظم، لا على ذاكرة نموذج خارجي: فالسؤال عن أوقات الدخول أو سياسة الإلغاء أو نوع الإفطار لا يحتمل تخمينًا. ولذلك نربط المساعد بمحتوى منشأتك وبياناتك التشغيلية، ونحدد بوضوح متى يتوقف عند حد المعلومة المنشورة ويحوّل الضيف إلى إنسان.`

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'A guest assistant that answers from your own records',
      body:
        'An assistant grounded in your published room types, inclusions, policies, and facility information, so a guest can resolve the practical questions that would otherwise become a call to the front desk.',
    },
    {
      title: 'Room and rate pages built for comparison',
      body:
        'Room detail pages that state the bed configuration, capacity, floor area, view category, and what is included, presented in a consistent structure so a guest can compare options without opening a third-party listing.',
    },
    {
      title: 'A booking path that does not break on a phone',
      body:
        'A mobile-first enquiry and reservation flow with short forms, clear availability entry points, and a handoff to your booking system or reservations team, designed for a guest on a slow connection.',
    },
    {
      title: 'Multilingual destination and experience content',
      body:
        'Arabic and English pages about local attractions, seasonal events, dining, and nearby experiences, each written for a guest planning a trip rather than a generic travel template.',
    },
    {
      title: 'Family, group, and accessibility information in plain sight',
      body:
        'Practical sections covering the arrangements made for children, group occupancy, accessibility of rooms and facilities, and what the property can and cannot offer, placed where guests actually look for it.',
    },
    {
      title: 'Connections to the systems the property already runs',
      body:
        'Reservations, availability, and property management tools wired into the site so published information stays aligned with what the team can actually deliver on the day of arrival.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'مساعد ضيوف يجيب من سجلاتك',
      body:
        'مساعد يستند إلى أنواع الغرف والمشمولات والسياسات ومعلومات المرافق المنشورة لديك، فيتمكن الضيف من حل الأسئلة العملية التي كانت ستتحول إلى اتصال بمكتب الاستقبال. ويعرف المساعد أين يتوقف: أي سؤال يعتمد على حالة حجز بعينه أو على ترتيب لم يؤكده فريقك يمرره إلى فريقك مع تلخيص لما سأل عنه الضيف حتى لا يضطر إلى إعادة الشرح من البداية.',
    },
    {
      title: 'صفحات غرف وأسعار مبنية للمقارنة',
      body:
        'صفحات تفصيلية لكل غرفة توضّح نوع السرير والطاقة والمساحة ونوع الإطاحة وما هو مشمول، ضمن بنية متسقة يتيح للضيف مقارنة الخيارات دون فتح إدراج في منصة خارجية. وتعرض كل صفحة أيضًا ما يهم المسافر فعليًا: عدد الأشخاص المسموح، وسياسة الإزعاج، وسهولة الوصول إلى المصعد، وهل النافذة قابلة للفتح، وما إذا كانت الغرفة مناسبة لمن يعمل من الغرفة. هذه التفاصيل هي التي يبحث عنها الضيف قبل أن يبدأ مقارنة التكلفة، ومن دونها يصبح القرار قرار ثقة لا قرار معلومات.',
    },
    {
      title: 'مسار حجز لا ينكسر على الجوال',
      body:
        'مسار استفسار وحجز مصمم للجوال أولًا، بنماذج قصيرة ومداخل واضحة لتواريخ التوفر وتسليم إلى نظام الحجز أو فريق الحجوزات، مصمم لضيف على شبكة بطيئة. ولا يطلب الموقع من الضيف إنشاء حساب لمجرد رؤية سعر، ولا يقطع المسار عند خطوة لمجرد أن المستخدم غيّر لصفحته. وكل خطوة تحمل مؤشر تقدم معروفًا، حتى يعرف الضيف ما تبقى عليه قبل أن يرسل طلبه.',
    },
    {
      title: 'محتوى وجهات وتجارب متعدد اللغات',
      body:
        'صفحات عربية وإنجليزية عن المعالم المحلية والفعاليات الموسمية والمطاعم والتجارب القريبة، كل منها مكتوبة لضيف يخطط لرحلة لا لقالب سياحي عام. ويتناول المحتوى ما يبحث عنه الضيف فعلًا: كم يستغرق الطريق إلى المطار في ساعة الذروة، وأين أقرب مركز تسوق، وما التجربة المناسبة للعائلة مع أطفال، وأي مطعم يمكن الحجز فيه مسبقًا. وهذا المحتوى هو ما يمنح المنشأة حضورًا في نتائج البحث طوال العام لا في مواسم الإشغال فقط، وهو ما يحوّل الزائر إلى ضيف يذكر المنشأة في رحلته القادمة.',
    },
    {
      title: 'معلومات العائلات والمجموعات وإمكانية الوصول في موضع واضح',
      body:
        'أقسام عملية تتناول ترتيبات الأطفال وإشغال المجموعات وإمكانية الوصول إلى الغرف والمرافق، وما يمكن للمنشأة تقديمه وما لا يمكن، في المكان الذي يبحث فيه الضيف فعلًا. ولا تقتصر هذه المعلومات على صفحة واحدة بعيدة؛ فتُذكر المعلومات المهمة في صفحة الغرفة نفسها، لأن الضيف لا يبحث عن سياسة إمكانية الوصول قبل أن يحجز، بل يبحث عن غرفة مناسبة ثم يقرأ ما جمعناه عنها.',
    },
    {
      title: 'تكاملات مع الأنظمة التي يعمل بها المنشأة',
      body:
        'ربط الحجز والتوفر وأدوات إدارة المنشأة بالموقع، فتبقى المعلومات المنشورة متوائمة مع ما يستطيع الفريق تقديمه فعليًا يوم الوصول. ويشمل ذلك مزامنة أنواع الغرف وأوصافها مع نظام الحجز، وإظهار حالة السعة المتاحة عند الحاجة، وتوجيه الطلبات الجديدة إلى القناة التي يديرها فريقك. بهذه الطريقة يتوقف التناقض الذي يفسد الحجوزات: صفحة تقول إن الغرفة على مسافة قريبة من المصعد بينما يسجل النظام غير ذلك.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn = `We build these sites for hotels, furnished apartments, resorts, and hospitality groups that receive genuine direct-booking interest and still lose part of it to booking platforms. A small property with ten rooms needs the same clarity as the multi-property group: a guest must be able to understand what they are booking before they commit, and the team must be able to answer consistently when the site hands an enquiry to a person. It also suits a resort that has rich local content — a coastal location, a heritage town, a mountain region, a desert camp — and has never turned that content into search traffic, because the material sits in brochures and social posts instead of pages that can be found and read in both languages. A serviced apartment operator with monthly stays faces a related problem: the questions are about cleaning, utilities, minimum stay, and neighbourhood, and those answers belong on the page as clearly as the room photographs. In every case the site is judged by one outcome: whether a guest who is ready to book can complete the first steps without needing to telephone reception, and whether the pages around the booking give that guest a reason to stay with the property rather than compare another option.`
  const fitAr = `نبني هذه المواقع للفنادق والشقق المفروشة والمنتجعات ومجموعات الضيافة التي تستقبل اهتمامًا حقيقيًا بالحجز المباشر، ثم تفقد جزءًا منه إلى منصات الحجز. تحتاج منشأة صغيرة بعشر غرف إلى وضوح نفسه الذي تحتاجه المجموعة متعددة المنشآت: يجب أن يفهم الضيف ما سيحجزه قبل أن يلتزم، وأن يستطيع الفريق الإجابة باتساق حين يسلّم الموقع الاستفسار إلى شخص. كما يناسب منتجعًا يملك محتوى محليًا غنيًا — موقعًا ساحليًا أو مدينة تراثية أو منطقة جبلية أو مخيم صحراوي — ولم يحوّل هذا المحتوى بعد إلى زيارات بحث، لأن المادة موجودة في الكتيبات ومنشورات التواصل الاجتماعي بدل صفحات يمكن العثور عليها وقراءتها باللغتين. ويواجه مشغّل الشقق المفروشة الإقامات الشهرية مشكلة مشابهة: فالأسئلة تتعلق بالتنظيف والخدمات المشمولة والحد الأدنى للإقامة والحي المحيطة، وهذه الإجابات مكانها الصفحة كما مكانها صور الغرف. ويُقاس الموقع في كل حالة بنتيجة واحدة: هل يستطيع الضيف الجاهز للحجز إكمال الخطوات الأولى دون الحاجة إلى الاتصال بمكتب الاستقبال، وهل تمنح الصفحات المحيطة بالحجز ذلك الضيف سببًا للبقاء مع المنشأة بدل مقارنة خيار آخر.

ويظهر هذا الفرق بوضوح عند مقارنة منشأتين متقاربتين: واحدة تشرح ما يتضمنه كل نوع غرفة وكم يستغرق الطريق إلى المطار وما هي خيارات النقل من المطار، والأخرى تعرض صورًا جميلة وأسعارًا مرتبطة بمنصة خارجية. الأولى تمنح الزائر ما يحتاجه ليقرر ويؤكد، والثانية تجعله يخرج من الموقع ليكمل خارجًا. والفرق ليس في الصور ولا في التصميم، بل في هل يجد الزائر إجاباته في الصفحة أم لا. ولذلك نبني المحتوى على أسئلة الضيف الحقيقية ونكتبه بلغته، ونجعل الوصول إلى المعلومة أسرع من الوصول إلى زر الحجز، لأن الضيف الذي لم يجد إجابته بعد لن يكمل الطلب مهما كان التصميم أنيقًا.`

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Property and guest journey audit',
      body:
        'We review what guests ask before they book, which of those questions the site already answers, where enquiries come from, and which properties or stay types need their own pages.',
    },
    {
      step: 'Scope of the content and the assistant',
      body:
        'We decide what the assistant may answer, which information must stay under staff control, and which languages and guest segments the first release must serve.',
    },
    {
      step: 'Design and bilingual build',
      body:
        'The design system, room pages, enquiry and booking paths, facility information, and destination content are built in Arabic and English from the start, not added as a translation layer later.',
    },
    {
      step: 'Assistant grounding and system connections',
      body:
        'The assistant is grounded in your own published content and policies, and the reservation, availability, and property systems are connected alongside it rather than afterwards.',
    },
    {
      step: 'Launch, observe, refine',
      body:
        'We launch with monitoring in place, review the questions guests actually ask and the paths they abandon, and refine the content, the assistant boundaries, and the booking experience.',
    },
  ]

  const processAr = [
    {
      step: 'مراجعة المنشأة ورحلة الضيف',
      body:
        'نراجع ما يسأل عنه الضيف قبل الحجز، وأي هذه الإجابات يقدمها الموقع اليوم، ومن أين تأتي الاستفسارات، وأي منشآت أو أنواع إقامة تحتاج صفحات خاصة. ونجمع في هذه المرحلة الأسئلة التي تتكرر على مكتب الاستقبال، لأنها غالبًا هي الأسئلة التي لا يجيب عنها أي جزء من الموقع حاليًا، وهي فرصة أن تكون نقطة البداية في بناء طبقة الذكاء الاصطناعي.',
    },
    {
      step: 'نطاق المحتوى والمساعد',
      body:
        'نحدد ما يمكن للمساعد الإجابة عنه، وأي معلومات يجب أن تبقى تحت رقابة الموظفين، وأي اللغات وشرائح الضيوف يجب أن تخدمها النسخة الأولى. ونكتب هذه الحدود في نص صريح يفهمه الفريق قبل الإطلاق: ما يُجاب عنه، وما يُحوَّل، وما لا يُذكر إطلاقًا. وحين تكون هذه الحدود مكتوبة يصبح سلوك المساعد قابلًا للتنبؤ، ويصبح دور الفريق في الحالات الاستثنائية واضحًا بدل أن يكون تخمينًا. ونراجع هذه القائمة مع كل مسؤول في المنشأة، لأن الفريق الذي يعرف ما يستطيع المساعد قوله لا يحتاج إلى تصحيح ما قاله أمام الضيف.',
    },
    {
      step: 'التصميم والبناء ثنائي اللغة',
      body:
        'يُبنى نظام التصميم وصفحات الغرف ومسارات الاستفسار والحجز ومعلومات المرافق ومحتوى الوجهات بالعربية والإنجليزية من البداية، لا كطبقة ترجمة تضاف لاحقًا. ويشمل ذلك ضبط اتجاه النص العربي وتنسيق الأرقام والتواريخ وصياغة النصوص بطول مناسب للقراءة على الجوال، لأن الضيف يقرأ وهو واقف في ممر أو يجلس في مركبة قبل أن يصل إلى الغرفة.',
    },
    {
      step: 'تدريب المساعد وربط الأنظمة',
      body:
        'يُستند المساعد إلى محتواك المنشور وسياساتك، وتُربط أنظمة الحجز والتوفر وإدارة المنشأة في الوقت نفسه لا بعده. ويُختبر المساعد قبل الإطلاق على أسئلة حقيقية صيغت بكلمات الزائر الفعلية لا بلغة الشركة، حتى نكتشف الأسئلة التي يسيئ المساعد فهمها ونصحح المصدر الذي يعتمد عليه بدل إضافة استثناءات فوقه.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body:
        'نطلق الموقع مع المراقبة، ونراجع الأسئلة التي يطرحها الضيوف فعليًا والمسارات التي يتركونها، ونحسّن المحتوى وحدود المساعد وتجربة الحجز. وتُستخدم هذه المراجعة لتحديث صفحات المنشأة سريعًا: فلا يبقى وصف غرفة قديمًا منشورًا بعد أن تغيّرت، ولا يفشل المساعد في سؤال جديد يظهر بعد إطلاقه.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn = `The site is built on a modern web stack your commercial and reservations teams can operate after handover, and the assistant is configured against your content rather than rebuilt for every property or season. That is what lets a new room type, a seasonal experience, or an updated policy reach the site without a full redevelopment, and it is what keeps the Arabic and English versions in step because both are produced from the same source structure. Where you already run a property management system, a reservation engine, or a channel manager, we connect the site to those rather than asking your team to maintain a second version of availability. You keep ownership of the site, the content, the data model, and the accounts. The AI layer sits on top as a service we review and refine with you, and the boundaries between what the assistant answers and what a person confirms are part of the design rather than a setting you discover after a guest receives the wrong answer.`
  const stackAr = `يُبنى الموقع على مكدس ويب حديث يستطيع فريقوك التجاري وفريق الحجوزات تشغيله بعد التسليم، ويُضبط المساعد على محتواك بدل أن يُعاد بناؤه في كل منشأة أو موسم. وهذا ما يتيح إطلاق نوع غرفة جديد أو تجربة موسمية أو سياسة محدَّثة دون إعادة تطوير كاملة، وما يبقي النسختين العربية والإنجليزية متزامنتين لأنهما تُنتجان من البنية نفسها. وإذا كنت تدير اليوم نظام إدارة منشأة أو محرك حجز أو مدير قنوات، فإننا نربط الموقع بتلك الأنظمة بدل أن نطلب من فريقك صيانة نسخة ثانية من التوفر. وتبقى ملكية الموقع والمحتوى ونموذج البيانات والحسابات لك. وتُوضع طبقة الذكاء الاصطناعي فوقه كخدمة نراجعها ونحسّنها معك، وتكون الحدود بين ما يجيب عنه المساعد وما يؤكده شخص جزءًا من التصميم لا إعدادًا تكتشفه بعد أن يتلقى ضيف إجابة خاطئة.

ولا يعني هذا أن المحتوى يبقى جامدًا. فنحن نراجع صفحات المنشأة دوريًا مع فريق التسويق ونحدّث ما تغيّر فعلًا: موسم جديد، مرفق أُغلق، باقة جديدة، أو سياسة تعديل. وهذه المراجعة جزء من الخدمة لا عبء يُحمّل على فريقك الذي يشغله النزلاء أصلًا. كما نبني المحتوى بحيث ينمو مع عدد منشآتك: الشركة التي تدير منشأة واحدة تحصل على موقع واحد بلغة واحدة واضحة، والمجموعة التي تدير عدة منشآت تحصل على بنية تسمح بتكرار الصفحة مع اختلاف المدينة والمرافق والسياسة، دون أن يتحول المحتوى إلى قالب واحد يُعاد نسخه بالمدينة بدل أن يُكتب لكل منشأة. وهذا الفارق هو ما يحمي المحتوى من أن يبدو مكررًا لمحركات البحث، ويحمي الضيف من أن يقرأ معلومة لا تنطبق على مكانه.`

  const faqData = [
    {
      qEn: 'Will the assistant promise room availability or rates?',
      aEn:
        'No. It answers from published property information and hands anything specific to a reservation to your team, because an invented availability answer is the kind of mistake a guest experiences immediately.',
      qAr: 'هل يَعِد المساعد بتوفر الغرف أو بأسعارها؟',
      aAr:
        'لا. يجيب من معلومات المنشأة المنشورة ويحوّل ما يتعلق بحجز بعينه إلى فريقك، لأن الإجابة المختلقة عن التوفر هي خطأ يشعر به الضيف فورًا.',
    },
    {
      qEn: 'Can guests book directly on the site?',
      aEn:
        'The site is built around a direct enquiry and reservation path that connects to your own booking or property system, so the guest can move from a room page to an enquiry without being sent out to a generic contact form.',
      qAr: 'هل يستطيع الضيوف الحجز مباشرة عبر الموقع؟',
      aAr:
        'يُبنى الموقع حول مسار استفسار وحجز مباشر يتصل بنظام الحجز أو نظام المنشأة لديك، فينتقل الضيف من صفحة الغرفة إلى الاستفسار دون تحويله إلى نموذج تواصل عام.',
    },
    {
      qEn: 'Our guests speak several languages. How does that work?',
      aEn:
        'Arabic and English are the foundation, and the assistant answers in the language of the visit. Where a guest segment needs another language, we scope the content and translation approach with you rather than relying on machine translation.',
      qAr: 'يتحدث ضيوفنا بلغات عدة. كيف تعمل هذه المعالجة؟',
      aAr:
        'العربية والإنجليزية هما الأساس، ويجيب المساعد بلغة الزائر. وحيث تحتاج شريحة ضيوف لغة أخرى، نحدد معك نطاق المحتوى وأسلوب الترجمة بدل الاعتماد على الترجمة الآلية.',
    },
    {
      qEn: 'Can you produce film content for the same property?',
      aEn:
        'Yes. Our film team shoots across Saudi Arabia, including hotel, resort, and hospitality content — brand films, event coverage, and photography — with the crew travelling to the location.',
      qAr: 'هل تنتجون محتوى أفلام للمنشأة نفسها؟',
      aAr:
        'نعم. يصوّر فريقنا الأفلام في أنحاء السعودية، بما في ذلك محتوى الفنادق والمنتجعات والضيافة — والأفلام التعريفية وتغطية الفعاليات والتصوير — ويصل الفريق إلى الموقع.',
    },
    {
      qEn: 'How long does a hotel website take to build?',
      aEn:
        'It depends on how much content exists, how many room types and properties are involved, and whether a reservation system is already in place. We scope that with you first, and we release the pages that can start earning traffic while the rest of the content is completed.',
      qAr: 'كم يستغرق بناء موقع فندق؟',
      aAr:
        'يعتمد على حجم المحتوى الموجود وعدد أنواع الغرف والمنشآت المشاركة، وعلى ما إذا كان نظام الحجز قائمًا بالفعل. نحدد ذلك النطاق معك أولًا، ونطلق الصفحات القادرة على جلب الزيارات بينما يكتمل بقية المحتوى.',
    },
  ]

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkDigital = isArabic ? 'المنصات الرقمية' : 'digital platforms'
  const linkWebsites = isArabic ? 'بناء مواقع الأعمال' : 'business website development'
  const linkAI = isArabic ? 'المساعدون الذكياء والأتمتة' : 'AI assistants and automation'
  const linkApps = isArabic ? 'تطوير التطبيقات' : 'app development'
  const linkEvents = isArabic ? 'تغطية الفعاليات' : 'event coverage'
  const linkPhotography = isArabic ? 'التصوير الاحترافي' : 'professional photography'

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
            href={`/${locale}/services/event-coverage-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkEvents}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/professional-photography-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPhotography}
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
