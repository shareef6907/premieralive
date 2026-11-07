import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-ecommerce-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي للمتاجر الإلكترونية في السعودية | بريمييرا لايف'
      : 'AI Websites for E-commerce in Saudi Arabia | Premiera Live',
    description: isArabic
      ? 'نبني متاجر إلكترونية ثنائية اللغة مدعومة بالذكاء الاصطناعي في السعودية — بحث ذكي عن المنتجات، وتوصيات شخصية، ومساعد يرد على أسئلة العملاء.'
      : 'We build bilingual, AI-powered e-commerce websites in Saudi Arabia — smart product search and an assistant that answers shopper questions.',
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
        ? 'مواقع ذكاء اصطناعي للمتاجر الإلكترونية في السعودية | بريمييرا لايف'
        : 'AI Websites for E-commerce in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'متاجر إلكترونية ثنائية اللغة مدعومة بالذكاء الاصطناعي: بحث ذكي، وتوصيات شخصية، ومساعد لأسئلة المنتجات.'
        : 'Bilingual e-commerce websites with smart product search, personalised recommendations, and a product assistant.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي للمتاجر الإلكترونية في السعودية | بريمييرا لايف'
        : 'AI Websites for E-commerce in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'متاجر إلكترونية ثنائية اللغة مدعومة بالذكاء الاصطناعي للمتاجر في السعودية.'
        : 'Bilingual, AI-driven e-commerce websites for Saudi retailers.',
    },
  }
}

export default async function AIWebsitesEcommercePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'مواقع ذكاء اصطناعي للمتاجر الإلكترونية في السعودية'
    : 'AI Websites for E-commerce in Saudi Arabia'

  const h1En = 'AI Websites for E-commerce in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي للمتاجر الإلكترونية في السعودية'

  const heroEn =
    'Premiera Live builds bilingual, AI-powered storefronts for online retailers in Saudi Arabia. We design and build these ourselves — the catalogue pages, the search, the product pages, the assistant that answers questions mid-purchase, and the content that keeps those pages ranking. The stores we ship are built around how Saudi shoppers actually buy: they search in Arabic and English and expect both to work, they decide on a phone, they ask questions about size, fabric, ingredients, or delivery before they commit, and they expect to reach a human quickly when the answer matters. The result is a store that sells from search results, answers at midnight without a shift roster, and stays current without someone rewriting a hundred product pages by hand.'
  const heroAr =
    'تبني بريمييرا لايف متاجر إلكترونية ثنائية اللغة مدعومة بالذكاء الاصطناعي للتجّار عبر الإنترنت في السعودية. نصمم ونبنيها بأنفسنا — صفحات الكتالوج والبحث وصفحات المنتجات والمساعد الذي يجيب عن الأسئلة أثناء الشراء، والمحتوى الذي يُبقي هذه الصفحات في مراتب البحث. تُبنى المتاجر التي نشحنها حول الطريقة التي يشتري بها المتسوّق السعودي فعليًا: يبحث بالعربية والإنجليزية ويتوقع أن تعمل اللغتان، ويقرّر على الجوال، ويسأل عن المقاس أو القماش أو المكوّنات أو التوصيل قبل أن يلتزم بالشراء، ويتوقع الوصول إلى شخص حقيقي بسرعة حين تكون الإجابة مهمة. تكون النتيجة متجرًا يبيع من نتائج البحث، ويجيب في منتصف الليل دون جدول ورديات، ويبقى محدَّثًا دون أن يعيد أحد كتابة مئة صفحة منتج يدويًا.'

  const whyHeadingEn = 'Why online stores in Saudi need more than a cart'
  const whyHeadingAr = 'لماذا تحتاج المتاجر الإلكترونية في السعودية أكثر من سلة تسوّق'

  const whyEn =
    'Most stores in the Kingdom already have a checkout. The gap is everything that happens before it. A shopper on a phone in Riyadh or Jeddah sees a product in a search result, lands on the page, and has three questions: does it come in my size, is the material what the description says, and when does it arrive. If the page answers only the first — or none — the shopper leaves and buys from a marketplace listing that showed a faster delivery date. Search-driven retail makes this worse, not better, because the traffic arriving on a product page has already been filtered by the search term and expects the page to resolve the purchase, not just display the product. AI earns its place here by reading your catalogue and your inventory, and answering product questions in Arabic and English on the page itself, in a way that is specific to the SKU the shopper is looking at rather than generic copy. It also runs the repetitive work a small retail team cannot keep up with: rewriting product descriptions when a material or supplier changes, generating the seasonal landing pages a campaign needs, keeping variant pages consistent across hundreds of items, and answering the same delivery, returns, and sizing questions thousands of times a week so your team handles only the exceptions.'
  const whyAr =
    'معظم المتاجر في المملكة تملك سلة تسوّق بالفعل. الفجوة هي كل ما يحدث قبلها. يرى المتسوّق على جوّال في الرياض أو جدة منتجًا في نتيجة بحث، ويصل إلى الصفحة، وثلاثة أسئلة تشغل ذهنه: هل يأتي بمقاسي، وهل الخامة كما يصفها الوصف، ومتى يصل. إذا كانت الصفحة تجيب عن الأول فقط — أو لا تجيب عن أي منها — يترك المتسوّق الشراء ويشتري من منتج على منصة مبيعات يعرض موعد توصيل أسرع. يجعل البحث في المتاجر هذه المشكلة أسوأ لا أفضل، لأن الزائر إلى صفحة المنتج تكون قد ضُحّيت كلمة بحثه بالفعل، فيتوقع أن تحسم الصفحة الشراء لا أن تعرض المنتج فقط. يجد الذكاء الاصطناعي مكانه هنا بقراءة الكتالوج والمخزون، والإجابة عن أسئلة المنتجات بالعربية والإنجليزية على الصفحة نفسها، بطريقة خاصة بالقطعة التي ينظر إليها المتسوّق لا بنسخ عامة. كما يتولى العمل المتكرر الذي يتعذّر على فريق تجزئة صغير مواكبته: إعادة كتابة أوصاف المنتجات عند تغيّر خامة أو مورّد، وتوليد صفحات المواسم التي تحتاجها الحملة، والحفاظ على اتساق صفحات الخيارات عبر مئات الأصناف، والإجابة آلاف المرات أسبوعيًا عن أسئلة التوصيل والإرجاع والمقاسات نفسها، فيتعامل فريقك مع الاستثناءات وحدها.'

  const capabilitiesHeadingEn = 'What we build into the store'
  const capabilitiesHeadingAr = 'ماذا نُدمج في المتجر'

  const capabilitiesEn = [
    {
      title: 'Search that understands how people ask',
      body: 'A storefront search that handles the way shoppers type in Arabic and English — including partial words, brand names, model references, and everyday words like "sleeveless" or "for summer" — and still returns the right products when your catalogue is organised the way a warehouse organises it, not the way a marketer would.',
    },
    {
      title: 'A product assistant trained on your catalogue',
      body: 'An assistant that reads your actual product data, sizing charts, material specifications, stock, and shipping rules, and answers the shopper on the product page in Arabic or English — escalating to your team on orders, refunds, and anything a customer should discuss with a person.',
    },
    {
      title: 'Variant and size guidance',
      body: 'Clear size and variant presentation with availability handled per option, so a shopper sees what is genuinely in stock before adding anything to the cart — which returns, exchanges, and cancelled orders all trace back to.',
    },
    {
      title: 'Content generated from your own catalogue',
      body: 'Product descriptions, category landing pages, seasonal pages, and campaign pages written from your real attributes, inventory, and imagery — in both languages, on the same source of truth your team already updates, rather than paraphrased from a generic template.',
    },
    {
      title: 'Bilingual SEO for every category',
      body: 'Category, product, and collection pages built for search in both languages, with correct hreflang, structured data on the same pattern as the rest of the site, and metadata that reflects what the page actually sells.',
    },
    {
      title: 'Connectors to the tools you already run',
      body: 'Inventory, order management, courier, payment gateway, and messaging integrations wired so stock on the site matches stock on the shelf, and a confirmed order arrives where your team already looks for it.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'بحث يفهم طريقة السؤال',
      body: 'بحث في المتجر يتعامل مع الطريقة التي يكتب بها المتسوّق بالعربية والإنجليزية — بما في ذلك الكلمات الجزئية وأسماء العلامات وأرقام الطرازات وكلمات مثل «بلا أكمام» أو «للصيف» — ويعيد المنتجات الصحيحة حتى عندما يكون الكتالوج منظمًا كما ينظّمه المستودع لا كما كان سينظّمه مسئول التسويق.',
    },
    {
      title: 'مساعد منتجات مدرَّب على كتالوجك',
      body: 'مساعد يقرأ بيانات منتجاتك الفعلية وجداول المقاسات ومواصفات الخامات والمخزون وقواعد الشحن، ويجيب عن سؤال المتسوّق في صفحة المنتج بالعربية أو الإنجليزية — ويحوّل إلى فريقك في الطلبات والاسترجاع وكل ما ينبغي أن يتحدث فيه العميل مع شخص.',
    },
    {
      title: 'إرشاد دقيق بالمقاسات والخيارات',
      body: 'عرض واضح للمقاسات والخيارات مع معالجة التوفّر لكل خيار، فيرى المتسوّق ما هو متوفر فعلًا قبل أن يضيف إلى السلة — وكل المرتجعات والاستبدال والطلبات الملغاة ترجع في النهاية إلى هذه النقطة.',
    },
    {
      title: 'محتوى يُولَّد من كتالوجك',
      body: 'أوصاف المنتجات وصفحات التصنيفات وصفحات المواسم وصفحات الحملات تُكتب من خصائصك ومخزونك وصورك الفعلية — باللغتين، من المصدر نفسه الذي يحدّثه فريقك، لا منقولة عن قالب عام.',
    },
    {
      title: 'تحسين بحث ثنائي اللغة لكل تصنيف',
      body: 'صفحات التصنيفات والمنتجات والمجموعات تُبنى للبحث باللغتين، مع hreflang صحيح وبيانات منظّمة على النمط نفسه لبقية الموقع، وبيانات وصف تعكس ما تبيعه الصفحة حقًا.',
    },
    {
      title: 'تكاملات مع الأدوات التي تستخدمها',
      body: 'ربط المخزون وإدارة الطلبات والشحن وبوابة الدفع والرسائل، فيتطابق المخزون على الموقع مع المخزون على الرف، ويصل الطلب المؤكَّد إلى حيث ينظر فريقك بالفعل.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn =
    'We build these stores for independent online retailers selling a catalogue of a few dozen to a few hundred products, for brands that moved from social commerce to their own storefront and now need the search, the content, and the assistant, for retailers who already run a physical shop in Al Khobar, Dammam, or Riyadh and want the same catalogue online without maintaining it twice, for multi-brand marketplaces and distributor catalogues with many overlapping lines, and for businesses selling to other businesses where the buyer wants to search a specification sheet rather than browse a grid. The common thread is a catalogue that changes often enough that hand-written product pages fall behind within weeks, and a customer base that expects to be answered in their own language at the moment they are deciding. For a retailer running several collections, the same logic applies as elsewhere: content is written once from the catalogue and adapted per collection, rather than copied between pages with the product name swapped — which is what keeps each collection page worth ranking and worth reading.'
  const fitAr =
    'نبني هذه المتاجر للتجّار المستقلين الذين يبيعون كتالوجًا من عشرات إلى بضع مئات من المنتجات، وللعلامات التي انتقلت من البيع عبر منصات التواصل إلى متجرها الخاص وتحتاج الآن إلى البحث والمحتوى والمساعد، وللتجّار الذين يديرون متجرًا فعليًا في الخبر أو الدمام أو الرياض ويريدون الكتالوج نفسه على الإنترنت دون صيانته مرتين، وللمتاجر متعددة العلامات وكتالوجات الموزعين التي تتقاطع خطوطها، وللأعمال التي تبيع للشركات الأخرى حيث يريد المشتري أن يبحث في ورقة مواصفات لا أن يتصفح شبكة صور. الخيط الجامع بينها كتالوج يتغير كثيرًا بما يكفي لتمتنع صفحات المنتجات المكتوبة يدويًا عن مواكبته خلال أسابيع، وقاعدة عملاء تتوقع أن يُجاب في لغتها لحظة اتخاذها للقرار. أما التجّار الذين يديرون عدة مجموعات، فالنطق نفسه يسري كما في كل مكان: يُكتب المحتوى مرة واحدة من الكتالوج ويُكيَّف لكل مجموعة، بدل نسخه بين الصفحات مع تغيير اسم المنتج — وهو ما يبقي كل صفحة مجموعة جديرة بالمراتب والجدارة بالقراءة.'

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Catalogue and stock audit',
      body: 'We look at your actual product data, your variants, your sizing, your stock rules, and the questions customers ask most. The assistant is only as good as the catalogue behind it, and a badly structured catalogue cannot be rescued by the front end.',
    },
    {
      step: 'Scope of the AI layer',
      body: 'We decide what the store must answer, where a shopper must be handed to a person, and which systems feed the assistant — inventory, order management, and your own product information.',
    },
    {
      step: 'Design and front-end build',
      body: 'Bilingual design system, category and product pages, the search and filter experience, and the assistant interface — built mobile-first, because most Saudi online shoppers decide on a phone.',
    },
    {
      step: 'AI training and integration',
      body: 'The assistant is trained on your catalogue, your policies, and your FAQs, and the inventory, order, and messaging connectors are wired in alongside it rather than afterwards.',
    },
    {
      step: 'Launch, monitor, refine',
      body: 'We launch with monitoring in place, review the first weeks of real searches and real conversations, and refine the answers, the search behaviour, and the product content based on what shoppers actually look for.',
    },
  ]

  const processAr = [
    {
      step: 'مراجعة الكتالوج والمخزون',
      body: 'ننظر إلى بيانات منتجاتك الفعلية وخياراتها ومقاساتها وقواعد مخزونها والأسئلة الأكثر تكرارًا من العملاء. لا يكون المساعد أفضل من الكتالوج الذي يقف خلفه، ولا يستطيع الواجهة الأمامية إنقاذ كتالوج مشوَّه.',
    },
    {
      step: 'نطاق طبقة الذكاء الاصطناعي',
      body: 'نحدد ما يجب أن يجيب عنه المتجر، وأين يجب تسليم المتسوّق إلى شخص، وأي أنظمة تغذّي المساعد — المخزون وإدارة الطلبات ومعلومات منتجاتك الخاصة.',
    },
    {
      step: 'التصميم وبناء الواجهة الأمامية',
      body: 'نظام تصميم ثنائي اللغة وصفحات التصنيفات والمنتجات وتجربة البحث والتصفية وواجهة المساعد — تُبنى أولًا للجوال، لأن معظم المتسوّقين السعوديين يقرّرون الشراء على جوّال.',
    },
    {
      step: 'تدريب الذكاء الاصطناعي والتكامل',
      body: 'يُدرَّب المساعد على كتالوجك وسياساتك وأسئلتك الشائعة، وتُربط تكاملات المخزون والطلبات والرسائل في الوقت نفسه لا بعده.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body: 'نطلق المتجر مع المراقبة، ونراجع الأسابيع الأولى من عمليات البحث والمحادثات الفعلية، ونحسّن الإجابات وسلوك البحث ومحتوى المنتجات بناءً على ما يبحث عنه المتسوّقون فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn =
    'The store is built on a modern web stack your team can operate after handover, and the AI layer is configured rather than rebuilt for every project — which is what lets a new collection page or a seasonal landing page go live in days rather than weeks. The same platform pattern works whether your catalogue lives in a marketplace account, a spreadsheet your staff actually maintains, or an inventory system that already holds the truth. We do not lock your catalogue into a closed system with no way out, and we do not rebuild your checkout every time a payment provider changes its interface. Your team gets a content management system it can run, with the AI layer on top as a service we review and refine with you as the catalogue grows. Where you already run the operation, we connect to it rather than asking you to move.'
  const stackAr =
    'يُبنى المتجر على مكدس ويب حديث يستطيع فريقه تشغيله بعد التسليم، وتُكوَّن طبقة الذكاء الاصطناعي ولا تُعاد من الصفر في كل مشروع — وهذا ما يتيح إطلاق صفحة مجموعة جديدة أو صفحة موسمية في أيام لا أسابيع. يعمل نمط المنصة نفسه سواء كان كتالوجك في حساب على منصة مبيعات أو في جدول بيانات يديره موظفوك فعلًا أو في نظام مخزون يحتفظ بالحقيقة بالفعل. لا نقفل كتالوجك في نظام مغلق بلا مخرج، ولا نعيد بناء صفحة الدفع في كل مرة تغيّرت فيها واجهة مزوّد الدفع. يحصل فريقك على نظام إدارة محتوى يستطيع تشغيله، مع طبقة ذكاء اصطناعي فوقه كخدمة نراجعها ونحسّنها معك كلما نما الكتالوج. وإذا كنت تدير عملك اليوم في نظام معيّن، فإننا نتصل به بدل أن نطلب منك نقل عملك.'

  const faqData = [
    {
      qEn: 'Can the assistant tell customers when a product will be back in stock?',
      aEn: 'It can answer from the inventory data it is connected to, and where a restock date is not recorded, it says so rather than estimating. Stock that is not tracked in the system cannot be answered accurately by anything, which is why we connect to the inventory rather than working from a copy of the catalogue.',
      qAr: 'هل يستطيع المساعد أن يخبر العملاء بمتى يعود المنتج إلى المخزون؟',
      aAr: 'يستطيع الإجابة من بيانات المخزون المتصل بها، وإذا لم يكن تاريخ إعادة التوريد مسجلًا فإنه يقول ذلك بدلًا من تقديره. فالمخزون غير المتعقب في النظام لا يمكن لأي شيء الإجابة عنه بدقة، ولهذا نتصل بالمخزون بدل العمل على نسخة من الكتالوج.',
    },
    {
      qEn: 'Do we have to rewrite every product description by hand?',
      aEn: 'No. Descriptions, category copy, and seasonal pages can be generated from your own product attributes, materials, and imagery in both languages, and reviewed by your team. You keep editorial control over anything that needs it, and the store stops depending on someone rewriting pages whenever a supplier changes a detail.',
      qAr: 'هل علينا إعادة كتابة كل وصف منتج يدويًا؟',
      aAr: 'لا. يمكن توليد الأوصاف ونصوص التصنيفات وصفحات المواسم من خصائص منتجاتك وخاماتها وصورك في اللغتين، ثم يراجعها فريقك. يبقى لك التحكم التحريري فيما يحتاجه، ويتوقف المتجر على انتظار أحد إعادة كتابة الصفحات كلما غيّر مورّد تفصيلًا.',
    },
    {
      qEn: 'Can customers order in Arabic and English on the same store?',
      aEn: 'Yes. Both languages are first-class throughout — navigation, product pages, filters, the assistant, and the checkout flow — with correct hreflang between the two so search engines treat them as one store rather than competing copies of each other.',
      qAr: 'هل يستطيع العملاء الطلب بالعربية والإنجليزية على المتجر نفسه؟',
      aAr: 'نعم. اللغتان أساسيتان في كل شيء — التنقل وصفحات المنتجات والمرشحات والمساعد وتدفق الدفع — مع hreflang صحيح بينهما حتى تتعامل محركات البحث معهما كمتجر واحد لا كنسختين متنافستين.',
    },
    {
      qEn: 'Will this work with the payment and shipping tools we already use?',
      aEn: 'Yes. The build connects to the payment gateway, courier, inventory, and order-management tools you already run rather than asking you to change them. We confirm the specific connectors during discovery, because which systems a store uses varies by business.',
      qAr: 'هل سيعمل هذا مع أدوات الدفع والشحن التي نستخدمها بالفعل؟',
      aAr: 'نعم. يتصل البناء ببوابة الدفع وشركة التوصيل ونظام المخزون وأدوات إدارة الطلبات التي تستخدمها بالفعل بدل أن نطلب منك تغييرها. ونؤكّد الوصلات المحددة في مرحلة الاكتشاف، لأن الأنظمة التي يستخدمها المتجر تختلف بين عمل وآخر.',
    },
    {
      qEn: 'Do you also produce the product photography and video for the store?',
      aEn: 'Yes — product photography, product video, and short-form content for campaigns are produced by our own team, so the store launches with content shot for it rather than borrowed images with mismatched crops and inconsistent backgrounds.',
      qAr: 'هل تنتجون أيضًا تصوير المنتجات والفيديو للمتجر؟',
      aAr: 'نعم — تصوير المنتجات وفيديو المنتج والمحتوى القصير للحملات ينتجها فريقنا، فيُطلق المتجر بمحتوى مصوَّر خصيصًا له بدل صور مستعارة بقصّات غير متطابقة وخلفية غير متسقة.',
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
