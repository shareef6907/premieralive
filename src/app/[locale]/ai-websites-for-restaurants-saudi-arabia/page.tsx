import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-restaurants-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي للمطاعم في السعودية | بريمييرا لايف'
      : 'AI Websites for Restaurants in Saudi Arabia | Premiera Live',
    description: isArabic
      ? 'نبني مواقع مطاعم ومقاهي ثنائية اللغة مدعومة بالذكاء الاصطناعي في السعودية — مينيو ذكي، وحجز طاولات، ومعلومات مكونات، وطلبات عبر واتساب.'
      : 'We build bilingual, AI-powered restaurant websites in Saudi Arabia — smart menus, table booking, accurate ingredient answers, and WhatsApp ordering.',
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
        ? 'مواقع ذكاء اصطناعي للمطاعم في السعودية | بريمييرا لايف'
        : 'AI Websites for Restaurants in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'نبني مواقع مطاعم ومقاهي ثنائية اللغة: مينيو ذكي، وحجز طاولات، وإجابات دقيقة عن المكونات، وطلبات عبر واتساب.'
        : 'Bilingual restaurant websites with smart menus, table booking, ingredient answers, and WhatsApp ordering.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي للمطاعم في السعودية | بريمييرا لايف'
        : 'AI Websites for Restaurants in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'مواقع مطاعم ومقاهي ثنائية اللغة مدعومة بالذكاء الاصطناعي في السعودية.'
        : 'Bilingual, AI-driven restaurant websites for Saudi Arabia.',
    },
  }
}

export default async function AIWebsitesRestaurantsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'مواقع ذكاء اصطناعي للمطاعم والمقاهي في السعودية' : 'AI Websites for Restaurants in Saudi Arabia'

  const h1En = 'AI Websites for Restaurants in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي للمطاعم في السعودية'

  const heroEn =
    'Premiera Live builds bilingual, AI-powered websites for restaurants, cafés, and food businesses in Saudi Arabia. The sites we ship are not a PDF menu uploaded to a page — they are built around how people actually order in the Kingdom: a menu that answers dietary and ingredient questions instead of leaving them to the phone, table booking that respects the floor plan your host uses, an assistant that knows your specials and your out-of-stock items, and an ordering flow that ends in the channel your guests already live on. The same team designs, builds, integrates the AI layer, and launches it from our base in the Eastern Province.'
  const heroAr =
    'تبني بريمييرا لايف مواقع ثنائية اللغة مدعومة بالذكاء الاصطناعي للمطاعم والمقاهي وأعمال الأغذية في السعودية. ليست المواقع التي نشحنها قائمة طعام بصيغة PDF مرفوعة على صفحة — بل تُبنى حول الطريقة التي يطلب بها الناس الطعام فعلًا في المملكة: مينيو يجيب عن أسئلة المكونات والحمية بدل تركها إلى الهاتف، وحجز طاولات يحترم مخطط القاعة الذي يستخدمه موظف الاستقبال، ومساعد يعرف أطباقك المميزة والأصناف غير المتوفرة، وتدفق طلب ينتهي في القناة التي يعيش ضيوفك فيها أصلًا. يتولى الفريق المسؤول نفسه التصميم والبناء وتكامل طبقة الذكاء الاصطناعي والإطلاق من قاعدتنا في المنطقة الشرقية.'

  const whyHeadingEn = 'Why restaurant websites in Saudi need AI now'
  const whyHeadingAr = 'لماذا تحتاج مواقع المطاعم في السعودية إلى الذكاء الاصطناعي الآن'

  const whyEn =
    'A Saudi diner decides on a phone, in a queue, or at a table — and the questions they have are specific: what is in this dish, is it spicy, does it contain nuts, is it available right now, can I book four people for Thursday at eight. A PDF menu cannot answer any of them. A good restaurant website answers the first three and hands the rest to a human, but a good restaurant website still has to be updated every time the kitchen runs out of something or the branch changes its hours. That is where AI earns its place. It reads your live menu data and your daily updates, answers ingredient, allergen, spice-level, portion, and availability questions in Arabic and English, and hands over to a person only when the question becomes a reservation, a complaint, or a large order. It also does the work your marketing team repeats every week: writing the seasonal menu descriptions, the branch pages, the offer pages, and the social content for a new item — from the same source of truth your kitchen already updates. The result is a site that stays accurate between shifts without anyone on your team spending an evening on it.'
  const whyAr =
    'يقرّر الضيف السعودي على الجوال، وهو في الطابور، أو وهو جالس على الطاولة — والأسئلة التي يطرحها محددة: ما مكوّنات هذا الطبق، هل هو حار، هل يحتوي على مكسرات، هل هو متوفر الآن، هل أحجز طاولة لأربعة أشخاص الخميس الثامنة. لا تجيب قائمة بصيغة PDF عن أي منها. يجيب موقع مطعم جيد عن الأسئلة الثلاثة الأولى ويحوّل الباقي إلى شخص، لكن موقعًا جيدًا يبقى بحاجة إلى تحديث كلما نفد صنف من المطبخ أو غيّرت الفرع ساعاته. هنا يجد الذكاء الاصطناعي مكانه. يقرأ بيانات المينيو الحي وتحديثاتك اليومية، ويجيب عن أسئلة المكونات والمُسبّبات ومستوى الحرارة وحجم التقديم والتوفّر بالعربية والإنجليزية، ولا يحوّل إلى شخص إلا حين يصبح السؤال حجزًا أو شكوى أو طلبًا كبيرًا. ويؤدي أيضًا العمل الذيكرره فريق التسويق كل أسبوع: كتابة أوصاف المينيو الموسمي وصفحات الفروع وصفحات العروض والمحتوى الاجتماعي لصنف جديد — من المصدر نفسه الذي يحدّثه مطبخك أصلًا. تكون النتيجة موقعًا يبقى دقيقًا بين الورديات دون أن يقضي أحد من فريقك أمسيته عليه.'

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'A menu that answers itself',
      body: 'Dishes, ingredients, spice level, portion size, allergens, and calories handled in both languages, with the items that ran out today automatically marked unavailable — so the answer your guest gets matches what the kitchen can actually serve.',
    },
    {
      title: 'Bilingual AI guest assistant',
      body: 'A trained assistant that knows your menu, your branches, your hours, and your specials, and answers in Arabic or English with the tone of your restaurant — including the questions your staff get asked on the phone all day.',
    },
    {
      title: 'Table booking that matches your floor',
      body: 'Reservation flows built around the seating your host actually manages — party size, section, branch, time slot, and the occasions you host separately — with confirmations and reminders sent the way your guests prefer to be contacted.',
    },
    {
      title: 'WhatsApp ordering and enquiry',
      body: 'The assistant takes the order on the website and on WhatsApp, handles modifications and questions about ingredients, confirms the total and the pickup or delivery details, and hands completed orders to your kitchen system.',
    },
    {
      title: 'Automated menu and branch content',
      body: 'Seasonal menu descriptions, new-item pages, branch pages with their own hours and location details, and offer pages — generated from your own menu and branch data, in both languages, ready for search and for campaigns.',
    },
    {
      title: 'Integrations kitchens already use',
      body: 'Point-of-sale, inventory, ordering platforms, delivery integrations, WhatsApp Business, and reservation tools connected so menu availability, stock, and orders stay in agreement instead of drifting apart.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'مينيو يجيب عن نفسه',
      body: 'الأطباق والمكوّنات ومستوى الحرارة وحجم التقديم والمُسبّبات والسعرات تُدار باللغتين، مع تمييز الأصناف التي نفدت اليوم تلقائيًا كغير متاحة — فيتطابق الجواب الذي يحصل عليه الضيف مع ما يستطيع المطبخ تقديمه فعلًا.',
    },
    {
      title: 'مساعد ذكي ثنائي اللغة للضيوف',
      body: 'مساعد مدرَّب يعرف مينيوك وفروعك وساعاتك وأطباقك المميزة، ويجيب بالعربية أو الإنجليزية بنبرة مطعمك — بما في ذلك الأسئلة التي يطرحها موظفك على الهاتف طوال اليوم.',
    },
    {
      title: 'حجز طاولات يطابق قاعتك',
      body: 'تدفقات حجز مبنية على ترتيب الجلوس الذي يديره موظف الاستقبال فعلًا — عدد الأشخاص والقسم والفرع والوقت المسائي والمناسبات التي تستضيفها على حدة — مع تأكيدات وتذكيرات تُرسل بالطريقة التي يفضّلها ضيوفك.',
    },
    {
      title: 'الطلب والاستفسار عبر واتساب',
      body: 'يستقبل المساعد الطلب على الموقع وعلى واتساب، ويتعامل مع التعديلات وأسئلة المكوّنات، ويؤكّد الإجمالي وتفاصيل الاستلام أو التوصيل، ويسلّم الطلبات المكتملة إلى نظام مطبخك.',
    },
    {
      title: 'محتوى مينيو وفروع يُنتَج تلقائيًا',
      body: 'أوصاف المينيو الموسمي وصفحات الأصناف الجديدة وصفحات الفروع بساعاتها ومواقعها وصفحات العروض — تُولَّد من بيانات مينيوك وفروعك، باللغتين، جاهزة للبحث والحملات.',
    },
    {
      title: 'تكاملات تستخدمها المطاعم',
      body: 'ربط مع نقاط البيع والمخزون ومنصات الطلب والتوصيل وواتساب بزنس وأدوات الحجز، فتبقى توافر الأصناف والمخزون والطلبات متفقة بدل أن تتباعد عن بعضها.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn =
    'We build these sites for independent restaurants and cafés running one or two branches, for multi-branch groups whose menus and hours differ by location, for cloud-kitchen and delivery-first concepts, for hospitality venues with a restaurant inside them, and for food brands that sell packaged products online and need the same catalogue logic for a grocery run and for a delivery order. It also suits restaurants that already have a strong social presence and need a site that turns the attention into a table booking, an order, or a waitlist signup — because on the platforms, the restaurant is a row in a list, while on its own site the menu, the room, and the story are the whole proposition. For a group running several branches, the same content is written once and adapted per branch, rather than copied and pasted with the phone number changed, which is what keeps each branch page useful and honest.'
  const fitAr =
    'نبني هذه المواقع للمطاعم والمقاهي المستقلة التي تعمل فرعًا أو فرعين، وللمجموعات متعددة الفروع التي يختلف فيها المينيو والساعات بين فرع وآخر، ولمفاهيم المطبخ السحابي والتوصيل أولًا، ولأماكن الضيافة التي تضم مطعمًا داخلها، وللعلامات الغذائية التي تبيع منتجات معلّبة عبر الإنترنت وتحتاج منطق الكتالوج نفسه لطلب البقالة وطلب التوصيل. كما يناسب المطاعم التي تملك حضورًا قويًا على منصات التواصل وتحتاج موقعًا يحوّل هذا الانتباه إلى حجز طاولة أو طلب أو تسجيل في قائمة الانتظار — فالمنصات تجعل المطعم صفًا في قائمة، بينما في موقعه يكون المينيو والقاعة والحكاية هي العرض كله. أما للمجموعة التي تدير فروعًا متعددة، فالمحتوى نفسه يُكتب مرة واحدة ويُكيَّف لكل فرع، بدل نسخه ولصقه مع تغيير رقم الهاتف، وهو ما يبقي صفحة كل فرع مفيدة وصادقة.'

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Discovery and menu audit',
      body: 'We sit with you and your kitchen manager, look at what is actually on the menu, what sells, what runs out, and what guests call about. The assistant is only as good as the menu data behind it.',
    },
    {
      step: 'Content and AI scope',
      body: 'We decide what the site must answer, which questions go to a person, and which data sources feed the assistant — your menu sheet, your reservation system, your ordering platform.',
    },
    {
      step: 'Design and front-end build',
      body: 'Bilingual design system, menu pages, branch pages, gallery, and the ordering experience — built mobile-first, because most Saudi guests look up a restaurant on their phone before they leave the house.',
    },
    {
      step: 'AI training and integration',
      body: 'The assistant is trained on your menu, your allergen information, your branches, and your FAQs. Ordering, reservation, and WhatsApp integration is wired in alongside it, not after.',
    },
    {
      step: 'Launch, monitor, refine',
      body: 'We launch with monitoring in place, review the first weeks of real conversations, and refine the answers, the menu accuracy, and the ordering flow based on what guests actually ask.',
    },
  ]
  const processAr = [
    {
      step: 'الاكتشاف ومراجعة المينيو',
      body: 'نجلس معك ومع مدير المطبخ، وننظر إلى ما هو موجود في المينيو فعلًا، وما يُباع، وما ينفد، وما يتصل به الضيوف关于ه. لا يكون المساعد أفضل من بيانات المينيو التي تقف خلفه.',
    },
    {
      step: 'المحتوى ونطاق الذكاء الاصطناعي',
      body: 'نحدد ما يجب أن يجيب عنه الموقع، وأي الأسئلة تُحوَّل إلى شخص، وأي مصادر بيانات تغذّي المساعد — ورقة المينيو ونظام الحجز ومنصة الطلب.',
    },
    {
      step: 'التصميم وبناء الواجهة الأمامية',
      body: 'نظام تصميم ثنائي اللغة وصفحات المينيو وصفحات الفروع والمعرض وتجربة الطلب — تُبنى أولًا للجوال، لأن معظم الضيوف السعوديين يبحثون عن المطعم على جوّالهم قبل مغادرة البيت.',
    },
    {
      step: 'تدريب الذكاء الاصطناعي والتكامل',
      body: 'يُدرَّب المساعد على مينيوك ومعلومات المُسبّبات وفروعك وأسئلتك الشائعة. ويُربط تكامل الطلب والحجز وواتساب في الوقت نفسه لا بعده.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body: 'نطلق الموقع مع المراقبة، ونراجع الأسابيع الأولى من المحادثات الفعلية، ونحسّن الإجابات ودقة المينيو وتدفق الطلب بناءً على ما يسأل عنه الضيوف فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn =
    'The site is built on a modern web stack your team can run after handover, and the AI layer is configured rather than rebuilt for every project — which is what lets a new branch page or a seasonal menu go live in days instead of weeks. The same platform pattern works whether your menu lives in a point-of-sale system, a spreadsheet your manager actually maintains, or a reservation platform that already holds your floor. We do not lock your menu into a closed CMS with no way out, and we do not rebuild your ordering flow when a national delivery platform changes its interface. Your team gets a content management system it can operate, with the AI layer running on top as a service that we review and refine with you on an ongoing basis. Where you already run the operation, we connect to it rather than asking you to move.'
  const stackAr =
    'يُبنى الموقع على مكدس ويب حديث يستطيع فريقه تشغيله بعد التسليم، وتُكوَّن طبقة الذكاء الاصطناعي ولا تُعاد من الصفر في كل مشروع — وهذا ما يتيح إطلاق صفحة فرع جديد أو مينيو موسمي في أيام لا أسابيع. يعمل نمط المنصة نفسه سواء كان مينيوك في نظام نقاط بيع أو في جدول بيانات يديره مديرك فعلًا أو في منصة حجز تحتفظ بقاعتك بالفعل. لا نقفل مينيوك في نظام إدارة محتوى مغلق بلا مخرج، ولا نعيد بناء تدفق الطلب في كل مرة تغيّر فيها واجهة منصة توصيل وطنية. يحصل فريقك على نظام إدارة محتوى يستطيع تشغيله، مع طبقة ذكاء اصطناعي تعمل فوقه كخدمة نراجعها ونحسّنها معك بشكل مستمر. وإذا كانت تدير عملك اليوم في نظام معيّن، فإننا نتصل به بدل أن نطلب منك نقل عملك.'

  const faqData = [
    {
      qEn: 'Can the assistant answer questions about allergens and ingredients?',
      aEn: 'Yes — that is one of the main reasons to have AI on a restaurant site. We train the assistant on your actual ingredient and allergen information, so it answers from your kitchen data rather than guessing from a generic menu template. It is configured to escalate to your team when a question falls outside what your data covers.',
      qAr: 'هل يستطيع المساعد الإجابة عن أسئلة المُسبّبات والمكوّنات؟',
      aAr: 'نعم — هذا من أبرز أسباب وجود الذكاء الاصطناعي في موقع المطعم. ندرّب المساعد على معلومات المكوّنات والمُسبّبات الفعلية لديك، فيجيب من بيانات مطبخك بدل أن يخمّن من قالب مينيو عام. ويُعدّ لتحويل السؤال إلى فريقك متى خرج عن نطاق ما تغطيه بياناتك.',
    },
    {
      qEn: 'Do we need to update the menu on the website every day?',
      aEn: 'No. The menu is managed from one place, and items that are unavailable can be marked from the same dashboard your team uses, or switched off automatically from your point-of-sale feed. The assistant and the menu stay in agreement without someone rewriting pages.',
      qAr: 'هل علينا تحديث المينيو على الموقع كل يوم؟',
      aAr: 'لا. تُدار المينيو من مكان واحد، ويمكن تعليم الأصناف غير المتوفرة من لوحة التحكم نفسها التي يستخدمها فريقك، أو إيقافها تلقائيًا عبر تغذية نقاط البيع. يبقى المساعد والمينيو متفقين دون أن يعيد أحد كتابة الصفحات.',
    },
    {
      qEn: 'Can guests order and book a table through the site?',
      aEn: 'Yes. Ordering can run on the website and on WhatsApp, and table booking can be built around your sections and time slots. Both can be handed off to the ordering platform, reservation system, or WhatsApp Business setup your team already uses.',
      qAr: 'هل يستطيع الضيوف الطلب وحجز الطاولة عبر الموقع؟',
      aAr: 'نعم. يمكن أن يتم الطلب عبر الموقع وعبر واتساب، ويمكن أن يُبنى حجز الطاولة على أقسامك والمواعيد المتاحة. ويمكن تحويل كليهما إلى منصة الطلب أو نظام الحجز أو إعداد واتساب بزنس الذي يستخدمه فريقك.',
    },
    {
      qEn: 'How long does it take to launch a restaurant website with AI?',
      aEn: 'A focused single-branch site is typically launched within a few weeks from brief to launch. A multi-branch build with ordering, reservation, and several integrations runs on a longer timeline scoped to the number of branches and the depth of integration.',
      qAr: 'كم يستغرق إطلاق موقع مطعم مع ذكاء اصطناعي؟',
      aAr: 'يُطلق الموقع المركّز لفرع واحد عادةً خلال أسابيع قليلة من الملخص إلى الإطلاق. أما البناء متعدد الفروع مع الطلب والحجز وعدة تكاملات فتسير على جدول أطول يُحدَّد وفق عدد الفروع وعمق التكامل.',
    },
    {
      qEn: 'Do you also produce the food photography and video for the site?',
      aEn: 'Yes — film production, photography, and short-form video for menus, dishes, and campaigns are all handled by our own team, so the site launches with content that is shot for it rather than borrowed from an old profile.',
      qAr: 'هل تنتجون أيضًا تصوير الطعام والفيديو للموقع؟',
      aAr: 'نعم — إنتاج الأفلام والتصوير والفيديو القصير للمنيو والأطباق والحملات يتولاها فريقنا، فيُطلق الموقع بمحتوى مصوَّر خصيصًا له بدل محتوى مستعار من ملف قديم.',
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
  const linkPhotography = isArabic ? 'التصوير الاحترافي' : 'professional photography'
  const linkCommercial = isArabic ? 'إنتاج الأفلام الإعلانية' : 'commercial film production'

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
            href={`/${locale}/services/professional-photography-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPhotography}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/commercial-film-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCommercial}
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
