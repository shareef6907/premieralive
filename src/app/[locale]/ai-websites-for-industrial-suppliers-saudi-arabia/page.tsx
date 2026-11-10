import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-industrial-suppliers-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي لموردي الصناعة في السعودية | بريمييرا لايف'
      : 'AI Websites for Industrial Suppliers in Saudi Arabia',
    description: isArabic
      ? 'نبني مواقع ثنائية اللغة لموردي الصناعات في السعودية — بحث في المواصفات، وطلبات عروض فورية، وفريق يرد على استفسارات المشترين.'
      : 'We build bilingual websites for industrial and manufacturing suppliers in Saudi Arabia — spec search, RFQ handling, and buyer enquiry answering.',
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
        ? 'مواقع ذكاء اصطناعي لموردي الصناعة في السعودية | بريمييرا لايف'
        : 'AI Websites for Industrial Suppliers in Saudi Arabia',
      description: isArabic
        ? 'مواقع ثنائية اللغة لموردي الصناعة: بحث في المواصفات، وطلبات عروض فورية، وردود ذكية على استفسارات المشترين.'
        : 'Bilingual sites for industrial suppliers: spec search, RFQ handling, and smart answers to buyer enquiries.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي لموردي الصناعة في السعودية | بريمييرا لايف'
        : 'AI Websites for Industrial Suppliers in Saudi Arabia',
      description: isArabic
        ? 'مواقع ثنائية اللغة لموردي الصناعات في السعودية مبنية على المواصفات وطلبات العروض.'
        : 'Bilingual websites for industrial and manufacturing suppliers in Saudi Arabia.',
    },
  }
}

export default async function AIWebsitesIndustrialSuppliersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'مواقع ذكاء اصطناعي لموردي الصناعة في السعودية'
    : 'AI Websites for Industrial Suppliers in Saudi Arabia'

  const h1En = 'AI Websites for Industrial Suppliers in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي لموردي الصناعة في السعودية'

  const heroEn =
    'Premiera Live builds bilingual websites for industrial and manufacturing suppliers who sell to buyers who already know what they want. A procurement engineer in Jubail, a maintenance supervisor in Riyadh, and a project buyer in Dammam do not browse. They arrive with a specification, a part number, a load rating, a material grade, a delivery window, and a tender pack, and they leave when they have an answer they can put in front of their manager. The websites that win that traffic are the ones that let a buyer specify, search, and submit an enquiry without an email attachment, and that answer the recurring questions — lead times, certifications, tolerances, minimum order quantities, customs documentation — in the buyer’s own language at the moment they are deciding. We design and build those sites ourselves: the catalogue, the specification search, the request-for-quote flow, the documents behind each product line, and the content that keeps the pages ranking across the Kingdom.'
  const heroAr =
    'تبني بريمييرا لايف مواقع ثنائية اللغة لموردي الصناعات والتوريد الصناعي الذين يبيعون لمشترين يعرفون بالفعل ما يريدون. لا يتصفّح مهندس مشتريات في الجبيل ولا مشرف صيانة في الرياض ولا مشترٍ للمشروع في الدمام. يصلون بمواصفة أو رقم قطعة أو حمل مقنن أو درجة خامة أو نافذة تسليم أو ملف مناقصة، ويغادرون حين يتوصلون بجواب يعرضونه على مديرهم. والمواقع التي تفوز بهذا الزوار هي التي تتيح للمشتري أن يحدّد المواصفة ويبحث ويرسل استفسارًا دون مرفق بريد إلكتروني، وأن يجيب عن الأسئلة المتكررة — مدد التسليم والشهادات والهوامش المسموحة والحد الأدنى للطلب ووثائق التخليص — بلغته في لحظة اتخاذه القرار. نصمم هذه المواقع ونبنيها بأنفسنا: الكتالوج وبحث المواصفات ومسار طلب عرض السعر والوثائق خلف كل خط منتجات، والمحتوى الذي يُبقي هذه الصفحات في مراتب البحث عبر المملكة.'

  const whyHeadingEn = 'Industrial buying does not browse, it specifies'
  const whyHeadingAr = 'الشراء الصناعي لا يتصفّح بل يحدّد المواصفة'

  const whyEn =
    'A consumer can be tempted by a photograph. A procurement professional cannot. When someone needs a valve, a bearing set, a stainless fastener, a control panel, or a filtration skid, the decision is driven by parameters that have to match exactly: the connection size, the pressure rating, the material standard, the temperature range, the certification attached to that particular batch, and the delivery date the project actually needs. If your website makes them email a request for a PDF datasheet to find out whether the standard matches, you have added a step to every enquiry and given a competitor with a searchable specification a reason to win the same buyer. Search in this market is not brand awareness. It is a buyer typing a technical phrase into a search box at a workstation, often in English even when the rest of the site is Arabic, and expecting the site to understand the parameters rather than the marketing language. AI earns its place by reading your own product data and answering parameter questions precisely — the same way it does for a retail catalogue, except that a single wrong dimension in a buyer’s comparison table is a much more expensive error than an inaccurate colour description.'
  const whyAr =
    'يمكن للمستهلك أن ينجذب بصورة. ولا يمكن للمشتري المحترف. عندما يحتاج أحدهم صمامًا أو مجموعة محامل أو مثبّتًا من الستانلس ستيل أو لوحة تحكم أو وحدة ترشيح، يقود القرار معايير يجب أن تتطابق تمامًا: مقاس التوصيل وتصنيف الضغط ومعيار الخامة ومدى الحرارة والشهادة المرتبطة بتلك الدفعة تحديدًا وتاريخ التسليم الذي يحتاجه المشروع فعلًا. وإذا جعل موقعك يرسله بريدًا إلكترونيًا ليحصل على ورقة بيانات حتى يعرف المعيار مطابقًا من عدمه، فقد أضفت خطوة إلى كل استفسار ومنحت منافسًا يملك مواصفات قابلة للبحث سببًا للفوز بالمشتري نفسه. البحث في هذا السوق ليس وعيًا بالعلامة التجارية. إنما مشترٍ يكتب عبارة فنية في خانة بحث على جهاز مكتبي، بالإنجليزية غالبًا حتى لو كان بقية الموقع بالعربية، ويتوقع أن يفهم الموقع المعايير لا لغة التسويق. يجد الذكاء الاصطناعي مكانه بقراءة بيانات منتجاتك الخاصة والإجابة عن أسئلة المعايير بدقة — على النمط نفسه الذي يجيب به في كتالوج التجزئة، إلا أن خطأً واحدًا في البُعد ضمن جدول مقارنة المشتري أكثر كلفة بكثير من وصف لون غير دقيق.'

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'Specification search that reads parameters',
      body: 'Search that understands how engineers actually ask for things — a standard designation, a pressure class, a material grade, a size range, a certification name — and returns the right product lines from a catalogue organised the way your ERP exports it, not the way a brochure would present it.',
    },
    {
      title: 'A request-for-quote flow that captures everything',
      body: 'A structured enquiry form that collects the quantity, the target specification, the required delivery window, and the project context once, so the sales team receives a complete request instead of a two-line email that triggers a dozen clarifying questions.',
    },
    {
      title: 'An assistant grounded in your documents',
      body: 'An assistant trained on your datasheets, standard specifications, and certificate records that answers what a buyer asks before they contact you — with the tolerance, the certification scope, and the current lead time — and hands the conversation to a person when the answer affects a quotation.',
    },
    {
      title: 'Product and document libraries that stay current',
      body: 'Product lines, technical subpages, and downloadable documents generated from your own product master data and maintained in both languages, so a revised tolerance or a renamed certificate propagates to every page that mentions it instead of living in one PDF nobody updates.',
    },
    {
      title: 'Bilingual search, in the language the buyer uses',
      body: 'Full Arabic and English coverage with correct hreflang between them, structured data on the same pattern as the rest of the site, and metadata written around the specification terms your buyers search rather than around the category name alone.',
    },
    {
      title: 'Connectors to the systems you already run',
      body: 'ERP, inventory, and document management wired in so stock levels, lead times, and revision dates on the site come from the system that holds the truth, and an enquiry reaches the person who handles quotations.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'بحث في المواصفات يفهم المعايير',
      body: 'بحث يفهم الطريقة التي يطلب بها المهندسون بالفعل — رمز معيار أو فئة ضغط أو درجة خامة أو نطاق مقاس أو اسم شهادة — ويعيد خطوط المنتجات الصحيحة من كتالوج منظم كما تصدّره نظم تخطيطك لا كما يعرضه كتيّب تسويقي.',
    },
    {
      title: 'مسار طلب عرض سعر يلتقط كل شيء',
      body: 'نموذج استفسار منظّم يجمع الكمية والمواصفة المطلوبة ونافذة التسليم وسياق المشروع مرة واحدة، فيصل إلى فريق المبيعات طلبًا مكتملًا بدل رسالة من سطرين تستدعي عشرات الأسئلة للتوضيح.',
    },
    {
      title: 'مساعد مبني على وثائقك',
      body: 'مساعد يُدرَّب على أوراق بياناتك ومواصفاتك وسجلات شهاداتك، فيجيب بما يسأل عنه المشتري قبل أن يتواصل معك — بحد التسامح ونطاق الشهادة ومدّة التسليم الحالية — ويحوّل المحادثة إلى شخص حين تؤثر الإجابة في عرض السعر.',
    },
    {
      title: 'مكتبات منتجات ووثائق تبقى محدَّثة',
      body: 'خطوط المنتجات والصفحات الفنية الفرعية والوثائق القابلة للتنزيل تُولَّد من بيانات منتجاتك الفعلية وتُصان باللغتين، فينتشر حد تسامح مُعدَّل أو شهادة أُعيدت تسميتها إلى كل صفحة تذكرها بدل أن تبقى في ملف PDF لا أحد يحدّثه.',
    },
    {
      title: 'بحث ثنائي اللغة بلغة المشتري',
      body: 'تغطية كاملة بالعربية والإنجليزية مع hreflang صحيح بينهما، وبيانات منظّمة على النمط نفسه لبقية الموقع، وبيانات وصف مكتوبة حول مصطلحات المواصفات التي يبحث بها مشتروك لا حول اسم التصنيف وحده.',
    },
    {
      title: 'تكاملات مع الأنظمة التي تستخدمها',
      body: 'ربط نظم تخطيط الموارد والمخزون وإدارة الوثائق، فتأتي مستويات المخزون ومدّد التسليم وتواريخ المراجعة من النظام الذي يحتفظ بالحقيقة، ويصل الاستفسار إلى من يتعامل مع عروض الأسعار.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn =
    'We build these sites for manufacturers and distributors whose product range is technical enough that a photograph and a slogan cannot carry it: component and spare-part suppliers, hydraulic and pneumatic distributors, electrical and control-panel builders, filtration and fluid-handling suppliers, packaging and materials converters, and specialist fabricators quoting against drawings. It also suits the supplier who has already won the specification and now needs the market to find them when a buyer searches the technical phrase rather than the brand, and the exporter who is being considered for a project and needs a site a procurement team in another market can read without translating it. The common thread is a catalogue where the deciding attribute is a number — a rating, a tolerance, a grade, a dimension — and a customer who reaches the site with that number already in mind. A supplier with a handful of stock items and a supplier with several hundred product lines both fit, provided the data behind the site is in a form the AI layer can actually read.'
  const fitAr =
    'نبني هذه المواقع للمصنّعين والموزّعين الذين يكون نطاق منتجاتهم تقنيًا بما يكفي لأن صورة وشعارًا لا يحملانه: موردو المكوّنات وقطع الغيار، وموزّعو المعدات الهيدروليكية والهوائية، وبنّاء اللوحات الكهربائية ولوحات التحكم، وموردو الترشيح ومناولة السوائل، ومحوّلو التغليف والمواد، والمصنّعون المتخصصون الذين يقدّمون عروضهم مقابل رسومات. كما يناسب المورد الذي فاز بالمواصفة بالفعل ويحتاج الآن أن يجده السوق عندما يبحث المشتري عن العبارة الفنية لا عن العلامة التجارية، والمصدّر الذي يُرشَّح لمشروع ويحتاج موقعًا يقرأه فريق مشتريات في سوق آخر دون ترجمة. الخيط الجامع بينها كتالوج تكون فيه الخاصية الحاسمة رقمًا — تصنيف أو حد تسامح أو درجة أو بُعد — وعميل يصل إلى الموقع والرقم في ذهنه مسبقًا. وينطبق ذلك على مورد يملك بضعة أصناف فقط وعلى مورد يملك مئات خطوط المنتجات، شرط أن تكون البيانات خلف الموقع بصيغة تستطيع طبقة الذكاء الاصطناعي قراءتها فعلًا.'

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Data and catalogue audit',
      body: 'We look at your actual product master data, how attributes are named, what your datasheets contain, how requests for quotation arrive today, and which questions every enquiry starts with. The assistant is only as good as the data behind it, and a catalogue whose attributes are inconsistent cannot be rescued by the front end.',
    },
    {
      step: 'Scope of the AI layer',
      body: 'We decide what the site must answer, where a buyer must be handed to a person, and which internal systems feed the assistant — ERP, inventory, document management, and your own approved specifications.',
    },
    {
      step: 'Design and front-end build',
      body: 'Bilingual design system, product and sub-category pages, the specification search and filters, the enquiry flow, and the assistant interface — built for a desktop workstation as much as for a phone, because the first version of this buyer usually arrives on one.',
    },
    {
      step: 'AI training and integration',
      body: 'The assistant is trained on your datasheets, specifications, and certificate records, and the ERP, inventory, and document connectors are wired in alongside it rather than afterwards.',
    },
    {
      step: 'Launch, monitor, refine',
      body: 'We launch with monitoring in place, review the first weeks of real searches and real enquiries, and refine the answers, the search behaviour, and the technical content based on what buyers actually ask for.',
    },
  ]

  const processAr = [
    {
      step: 'مراجعة البيانات والكتالوج',
      body: 'ننظر إلى بيانات منتجاتك الفعلية، وكيف تُسمّى الخصائص، وما تحتويه أوراق البيانات، وكيف تصل طلبات عروض الأسعار اليوم، وأي الأسئلة تبدأ بها كل استفسارات. لا يكون المساعد أفضل من البيانات التي تقف خلفه، ولا تستطيع الواجهة الأمامية إنقاذ كتالوج خصائصه غير متسقة.',
    },
    {
      step: 'نطاق طبقة الذكاء الاصطناعي',
      body: 'نحدد ما يجب أن يجيب عنه الموقع، وأين يجب تسليم المشتري إلى شخص، وأي أنظمة داخلية تغذّي المساعد — نظم تخطيط الموارد والمخزون وإدارة الوثائق ومواصفاتك المعتمدة.',
    },
    {
      step: 'التصميم وبناء الواجهة الأمامية',
      body: 'نظام تصميم ثنائي اللغة وصفحات المنتجات والتصنيفات الفرعية وبحث المواصفات والمرشحات ومسار الاستفسار وواجهة المساعد — تُبنى لأجهزة المكتب كما تُبنى للجوال، لأن أول نسخة من هذا المشتري تصل غالبًا على جهاز مكتبي.',
    },
    {
      step: 'تدريب الذكاء الاصطناعي والتكامل',
      body: 'يُدرَّب المساعد على أوراق بياناتك ومواصفاتك وسجلات شهاداتك، وتُربط تكاملات نظم تخطيط الموارد والمخزون والوثائق في الوقت نفسه لا بعده.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body: 'نطلق الموقع مع المراقبة، ونراجع الأسابيع الأولى من عمليات البحث والاستفسارات الفعلية، ونحسّن الإجابات وسلوك البحث والمحتوى الفني بناءً على ما يطلبه المشترون فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn =
    'The site is built on a modern web stack your technical and commercial teams can operate after handover, and the AI layer is configured rather than rebuilt for every project — which is what lets a new product line or a revised specification page go live in days rather than weeks. The same platform pattern works whether your product data sits in the ERP, in spreadsheets your engineers actually maintain, or in a document system that holds the current revision. We do not lock your catalogue into a closed system with no way out, and we do not rebuild your document flow every time an internal revision is issued. Your team gets a content management system it can run, with the AI layer on top as a service we review and refine with you as the range grows. Where you already run the operation, we connect to it rather than asking you to move.'
  const stackAr =
    'يُبنى الموقع على مكدس ويب حديث يستطيع فريقوك التقنية والتجاري تشغيله بعد التسليم، وتُكوَّن طبقة الذكاء الاصطناعي ولا تُعاد من الصفر في كل مشروع — وهذا ما يتيح إطلاق خط منتجات جديد أو صفحة مواصفة مُعدَّلة في أيام لا أسابيع. يعمل نمط المنصة نفسه سواء كانت بيانات منتجاتك في نظام تخطيط الموارد أو في جداول بيانات يحافظ عليها مهندسوك فعلًا أو في نظام وثائق يحتفظ بالمراجعة الحالية. لا نقفل كتالوجك في نظام مغلق بلا مخرج، ولا نعيد بناء مسار وثائقك في كل مرة صدرت فيها مراجعة داخلية. يحصل فريقك على نظام إدارة محتوى يستطيع تشغيله، مع طبقة ذكاء اصطناعي فوقه كخدمة نراجعها ونحسّنها معك كلما اتسّع النطاق. وإذا كنت تدير عملك اليوم في نظام معيّن، فإننا نتصل به بدل أن نطلب منك نقل عملك.'

  const faqData = [
    {
      qEn: 'Can a buyer search by specification instead of by product name?',
      aEn: 'Yes. That is the central design decision. The search reads the attributes buyers type — a standard designation, a pressure class, a material grade, a size range, a certification — and the filters on the listing pages expose the same attributes, so a buyer arriving with a requirement can narrow the range without knowing your internal product names.',
      qAr: 'هل يستطيع المشتري البحث بالمواصفة بدل اسم المنتج؟',
      aAr: 'نعم. هذا قرار التصميم المركزي. يقرأ البحث الخصائص التي يكتبها المشترون — رمز معيار أو فئة ضغط أو درجة خامة أو نطاق مقاس أو شهادة — وتعرض المرشحات في صفحات القوائم الخصائص نفسها، فيستطيع المشتري الذي يصل بطلب تضييق النطاق دون أن يعرف أسماء منتجاتك الداخلية.',
    },
    {
      qEn: 'Will the assistant quote me a price or confirm stock?',
      aEn: 'No, and we configure it that way deliberately. The assistant answers specification and documentation questions from your own records. Anything that depends on a live quotation, a lead time for a specific quantity, or a stock commitment is handed to your team, because an answer that sounds precise but is not binding is the kind of error that damages a supplier relationship.',
      qAr: 'هل يقدّم المساعد لي سعرًا أو يؤكّد التوفّر؟',
      aAr: 'لا، ونضبطه على هذا النحو عن قصد. يجيب المساعد عن أسئلة المواصفات والوثائق من سجلاتك. وكل ما يعتمد على عرض سعر حي أو مدّة تسليم لكمية بعينها أو التزام بمخزون يُحال إلى فريقك، لأن الإجابة التي تبدو دقيقة لكنها غير ملزِمة هي نوع الخطأ الذي يضر بعلاقة المورّد.',
    },
    {
      qEn: 'Our datasheets are in English and our customers are in the Gulf. Can both work?',
      aEn: 'Yes. Every page is built in Arabic and English with correct hreflang between them, and technical content can keep its original standard designations and certificate names in English where those are the recognised references, while the surrounding explanation is written for an Arabic-speaking technical reader.',
      qAr: 'أوراق بياناتنا بالإنجليزية وعملاؤنا في الخليج. هل يعمل الاثنان؟',
      aAr: 'نعم. تُبنى كل صفحة بالعربية والإنجليزية مع hreflang صحيح بينهما، ويمكن أن يحتفظ المحتوى الفني برموز المعايير وأسماء الشهادات الأصلية بالإنجليزية حيث تكون هي المراجع المعروفة، بينما تُكتب الشرح المحيط لقارئ فني يتحدث العربية.',
    },
    {
      qEn: 'Do you also produce the industrial and safety film for the same company?',
      aEn: 'Yes. Our film team shoots inside working industrial and energy facilities across Saudi Arabia — safety and training films, operational documentaries, and facility content — under the site’s own safety protocol and with the access agreed in advance with the people who run the site.',
      qAr: 'هل تنتجون أيضًا أفلام الصناعة والسلامة للشركة نفسها؟',
      aAr: 'نعم. يصوّر فريقنا الأفلام داخل المنشآت الصناعية ومنشآت الطاقة العاملة في أنحاء السعودية — أفلام السلامة والتدريب والأفلام التشغيلية ومحتوى المنشآت — ضمن بروتوكول السلامة المعتمد في الموقع ومع موافقة مسبقة على الدخول من الجهة التي تدير الموقع.',
    },
    {
      qEn: 'How long does a site like this take to build?',
      aEn: 'It depends on the size of the product range and how clean your data is. A focused range with tidy records is a different job from several hundred lines with inconsistent attributes, and we scope it with you before committing to a timeline. The first usable pages and search go live before the full range is migrated, so the site earns traffic while the catalogue is still being completed.',
      qAr: 'كم يستغرق بناء موقع كهذا؟',
      aAr: 'يعتمد على حجم نطاق المنتجات ونظافة بياناتك. النطاق المحدود بسجلات مرتّبة عمل مختلف عن مئات الخطوط بخصائص غير متسقة، ونحدّد النطاق معك قبل الالتزام بجدول زمني. وتُطلق الصفحات القابلة للاستخدام والبحث قبل اكتمال نقل الكتالوج كله، فيكسب الموقع زياراته بينما لا يزال الكتالوج قيد الإكمال.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkDigital = isArabic ? 'المنصات الرقمية' : 'digital platforms'
  const linkWebsites = isArabic ? 'بناء مواقع الأعمال' : 'business website development'
  const linkAI = isArabic ? 'المساعدون الذكياء والأتمتة' : 'AI assistants and automation'
  const linkApps = isArabic ? 'تطوير التطبيقات' : 'app development'
  const linkIndustrial = isArabic ? 'أفلام السلامة والتدريب' : 'industrial and safety films'
  const linkCorporate = isArabic ? 'إنتاج الفيديو المؤسسي' : 'corporate video production'

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
            href={`/${locale}/training-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkIndustrial}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/corporate-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCorporate}
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
