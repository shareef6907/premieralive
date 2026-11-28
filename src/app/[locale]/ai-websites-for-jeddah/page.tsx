import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-jeddah'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي لجدة | بريمييرا لايف'
      : 'AI Websites for Jeddah | Premiera Live',
    description: isArabic
      ? 'نبني مواقع ثنائية اللغة لشركات جدة تجيب عن أسئلة العملاء وتقود الطلبات الجادة إلى فريق المبيعات.'
      : 'Bilingual AI websites for Jeddah companies that answer buyer questions and route qualified enquiries to your team.',
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
        ? 'مواقع ذكاء اصطناعي لجدة | بريمييرا لايف'
        : 'AI Websites for Jeddah | Premiera Live',
      description: isArabic
        ? 'مواقع ثنائية اللغة لشركات جدة تجيب عن أسئلة المشترين وتقود الطلبات المؤهلة إلى فريقك.'
        : 'Bilingual websites for Jeddah companies that answer buyer questions and route qualified leads to your team.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي لجدة | بريمييرا لايف'
        : 'AI Websites for Jeddah | Premiera Live',
      description: isArabic
        ? 'مواقع ثنائية اللغة لشركات جدة تجيب عن الأسئلة العملية وتوجّه الطلبات الجادة إلى الفريق.'
        : 'Bilingual sites for Jeddah companies that answer practical questions and route serious enquiries to the team.',
    },
  }
}

export default async function AIWebsitesJeddahPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'مواقع ذكاء اصطناعي لجدة' : 'AI Websites for Jeddah'

  const h1En = 'AI Websites for Jeddah'
  const h1Ar = 'مواقع ذكاء اصطناعي لجدة'

  const heroEn = `Jeddah has a specific way of buying that a generic website cannot serve. The city hosts port and logistics operators, tourism groups operating across the coast and the heritage districts, university research groups and spin-outs, healthcare groups with campuses spread between the city and the wider region, and a long tail of established family firms whose reputation travels through relationships rather than through marketing. All of them arrive at a website with a question in hand, and all of them are deciding something different. A logistics coordinator is checking whether you handle a specific lane and a specific service. A hospitality buyer wants to know whether you can publish availability and content in a way they can trust. A research spin-out wants to explain a technical process to a non-specialist without losing the reader. A family firm wants to look as serious as the companies it quotes against. The common thread is that each of them wants the detail that proves fit, in the first screenful, in their own language. We build exactly that for Jeddah businesses: bilingual websites where the AI assistant is grounded in your own published material, where the qualification happens before anyone on your team spends time on the enquiry, and where the site holds its own next to the two other tabs in the same search result. We work from our base in Al Khobar and deliver to Jeddah clients remotely and on site, with the same company that handles the film and video work for businesses in the city.`
  const heroAr = `تتمتع جدة بطريقة شراء بعينها لا يستطيع الموقع العام أن يخدمها. تضم المدينة مشغلي الموانئ والخدمات اللوجستية، ومجموعات السياحة العاملة على الساحل وفي الأحياء التاريخية، ومجموعات البحث الجامعي والشركات الناشئة المنبثقة منها، ومجموعات الرعاية الصحية التي تنتشر عياداتها بين المدينة والمنطقة، وطولًا من الشركات العائلية الراسخة التي تنتشر سمعةً عبر العلاقات لا عبر التسويق. وجميعهم يصلون إلى الموقع ومعهم سؤال، وكل منهم يحكم على شيء مختلف. منسّق لوجستي يتحقق من أنكم تتعاملون مع مسار وخدمة بعينهما. مشترٍ في الضيافة يريد أن يعرف إن كان بإمكانكم نشر الحجوزات والمحتوى بطريقة يثق بها. شركة ناشئة من أبحاث جامعة تريد أن تشرح عملية تقنية لغير المتخصص من دون أن تفقد القارئ. شركة عائلية تريد أن تبدو جادة بالقدر الذي تنافس عليه. والقاسم المشترك أن كل واحد منهم يريد التفصيل الذي يثبت الملاءمة، في الشاشة الأولى، وب لغته هو. نبني هذا بالضبط لشركات جدة: مواقع ثنائية اللغة يكون فيها المساعد الذكي مستندًا إلى موادكم المنشورة، وتتم فيها عملية التأهيل قبل أن يتعب أحد من فريقكم في الاستفسار، ويصمد الموقع أمام التبويبين الآخرين في نتيجة البحث نفسها. نعمل من مقرنا في الخبر ونسلّم لعملائنا في جدة عن بُعد وعلى الموقع، بالشركة نفسها التي تتولى أعمال الأفلام والفيديو للأعمال في المدينة.`

  const whyHeadingEn = 'Why Jeddah buyers are hard to satisfy with a brochure'
  const whyHeadingAr = 'لماذا يصعب إرضاء مشتري جدة بكتيّب تسويقي'

  const whyEn = `The first thing to understand about Jeddah is that it is several markets with one name. The Kingdom's commercial port sits inside the city, and the companies around it — freight forwarding, customs-linked logistics, terminal services, industrial supply — are judged by counterparties who already know the trade and want no surprises in the details. Alongside that sits the visitor economy, which runs on a completely different clock: a hotel group cannot answer a guest at 2am on a Thursday with a slow page, and a heritage or destination operator has to publish information that changes and stays accurate. Alongside that again sits the knowledge economy, where a research group, a hospital group, or a university spin-out is trying to explain something specialised to a buyer who is not a specialist but who has to justify a decision internally. And running through all three is the family business, which has a name, an address people know, and no appetite for a website that reads like a template. The failure mode is a site that tries to serve all four audiences at once, which produces a page that satisfies none of them. The second Jeddah-specific factor is language, and it is stronger here than in many other Saudi markets. A Jeddah company may run its contracts in English, its workforce in Arabic, its customer-facing content in both, and its investor or board reporting in a third register entirely. A site that offers one language and treats the other as a machine-translated afterthought sends exactly the wrong signal, because the reader can tell within one paragraph. That is why every site we build for Jeddah has its Arabic and English versions written and structured together from the first draft, and why the assistant is set to hold a real conversation in either. The third factor is that the buyer on the coast is often deciding something that cannot be reversed easily, so the site has to carry the detail that lets them decide without a phone call.`
  const whyAr = `أول ما ينبغي فهمه عن جدة أنها عدة أسواق تحمل اسمًا واحدًا. الميناء التجاري للمملكة يقع داخل المدينة، وتُحاكم الشركات المحيطة به — وكلاء الشحن والخدمات اللوجستية المرتبطة بالجمارك وخدمات المحطات والتوريد الصناعي — من نظراء يعرفون التجارة جيدًا ولا يريدون مفاجآت في التفاصيل. إلى جانب ذلك تقع اقتصاد الزائر، الذي يعمل على إيقاع مختلف تمامًا: لا تستطيع مجموعة فنادق أن تجيب عن نداء ضيف في الساعة الثانية بعد ظهر يوم خميس بصفحة بطيئة، ولا يستطيع مشغّل وجهات تراثية أن ينشر معلومات متغيرة تبقى دقيقة. وإلى جانب ذلك تقع اقتصاد المعرفة، حيث تحاول مجموعة بحثية أو مجموعة مستشفيات أو شركة ناشئة من جامعة أن تشرح شيئًا متخصصًا لمشترٍ ليس متخصصًا لكنه مطالب بتبرير قراره داخليًا. ويمر عبر هذه الثلاثة جميعًا الشركة العائلية، لها اسم وعنوان يعرفه الناس، ولا رغبة لها في موقع يبدو قالبًا جاهزًا. والنمط الفاشل هو موقع يحاول خدمة هذه الشرائح الأربع دفعة واحدة، فينتج صفحة لا ترضي أحدًا منها. والعامل الثاني المرتبط بجدة هو اللغة، وهو أقوى هنا مما هو في كثير من أسواق السعودية الأخرى. فقد تكون شركة في جدة تدير عقودها بالإنجليزية، وتوظف بالعربية، وتنشر محتواها الموجّه للعملاء باللغتين، وترفع تقاريرها لمساهميها بلغة ثالثة. والموقع الذي يقدّم لغة واحدة ويعامل الأخرى كترجمة آلية متأخرة يوجّه إشارة خاطئة تمامًا، لأن القارئ يشعر بذلك في الفقرة الأولى. لهذا السبب يُبنى كل موقع نعمل عليه لجدة بلغتيه معًا منذ المسودة الأولى، ويُضبط المساعد على إدارة حوار حقيقي بأي منهما. والعامل الثالث أن المشتري على الساحل غالبًا ما يحكم على قرار لا يمكن التراجع فيه بسهولة، فيجب أن يحمل الموقع التفصيل الذي يتيح له الحسم دون مكالمة هاتفية.`

  const capabilitiesHeadingEn = 'What we build into a Jeddah site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في موقع جدة'

  const capabilitiesEn = [
    {
      title: 'An assistant grounded in your own published material',
      body:
        'The assistant answers from what your company has already published — the services you handle, the sectors you serve, how an engagement usually runs, and what you decline — so a buyer can resolve the practical question without waiting for a callback.',
    },
    {
      title: 'Service and sector pages written for how buyers search',
      body:
        'Pages organised around the service or sector the visitor is looking for rather than around internal department names, each answering the question that visitor actually arrived with before they contact anyone.',
    },
    {
      title: 'Enquiries that arrive already qualified',
      body:
        'A structured enquiry form that captures what the visitor needs, which sector it belongs to, and where they are in their process, so the first conversation begins with information instead of a blank page of notes.',
    },
    {
      title: 'Arabic and English written together, not translated afterwards',
      body:
        'Both versions written and structured from the first draft, so neither becomes a thin summary of the other, and the assistant holds a real conversation in either language without the tell of machine translation.',
    },
    {
      title: 'Content your own team can maintain after handover',
      body:
        'A structure the internal team can operate once we hand it over, so adding a service line, revising a description, or publishing an update does not require a developer or a rebuild.',
    },
    {
      title: 'A clear line between what the site states and what a person confirms',
      body:
        'The site states what the company does and how the process generally runs. The assistant hands anything that depends on a specific request, a specific quote, or a specific commitment to a person with the visitor’s context attached.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'مساعد يستند إلى موادك المنشورة',
      body:
        'يجيب المساعد مما نشرته الشركة بالفعل — الخدمات التي تتولاها والقطاعات التي تخدمها وكيف يسير التعاقد عادةً وما الذي تتجنّبه — فيتمكن المشتري من حل السؤال العملي دون انتظار معاودة الاتصال.',
    },
    {
      title: 'صفحات خدمات وقطاعات مكتوبة على طريقة بحث المشترين',
      body:
        'صفحات تُنظَّم حول الخدمة أو القطاع الذي يبحث عنه الزائر لا حول أسماء الأقسام الداخلية، وتُكتب كل واحدة للإجابة عن السؤال الذي جاء من أجله ذلك الزائر قبل أن يتواصل مع أحد.',
    },
    {
      title: 'استفسارات تصل مؤهلة سلفًا',
      body:
        'نموذج استفسار منظم يلتقط ما يحتاجه الزائر والقطاع الذي يندرج تحته ومرحلة العملية التي يمر بها، فتصلك المحادثة الأولى بمعلومة بدل صفحة فارغة من الملاحظات.',
    },
    {
      title: 'العربية والإنجليزية مكتوبتان معًا لا مترجمتان لاحقًا',
      body:
        'تُكتب النسختان وتُبنيان معًا منذ المسودة الأولى، فلا تتحول إحداهما إلى ملخص رقيق للأخرى، ويحافظ المساعد على حوار حقيقي بأي من اللغتين من دون أثر الترجمة الآلية.',
    },
    {
      title: 'محتوى يستطيع فريقك إدارته بعد التسليم',
      body:
        'بنية يستطيع الفريق الداخلي تشغيلها بعد التسليم، فإضافة خط خدمة أو تعديل وصف أو نشر تحديث لا تتطلب مطوّرًا ولا إعادة بناء.',
    },
    {
      title: 'خط واضح بين ما يقوله الموقع وما يؤكده الإنسان',
      body:
        'يصف الموقع ما تقوم به الشركة وكيف يسير المسار عمومًا، ويسلّم المساعد كل ما يعتمد على طلب بعينه أو عرض بعينه أو التزام بعينه إلى إنسان مع إرفاق سياق الزائر.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn = `We build these sites for Jeddah businesses that have real substance to publish and have never moved it onto the web in a form a buyer can use. It suits a company whose team already answers the same questions every week — what the engagement involves, how the process runs, which requests you take and which you decline — while that knowledge sits in people's heads, in email threads, or in documents nobody opens. It suits a business whose website was built once for a brochure and has not been touched since, where the enquiry form still works but nothing on the site helps a buyer decide. It suits a company working across two audiences at once: a board or a regional partner that wants English, a customer base that wants Arabic, and a sales team that needs both on the same page depending on who is reading. And it suits the company in Jeddah that has just outgrown the site it started with — a growing operation, a new sector, or a new service line that the current site simply cannot explain. In every case the site is judged by one outcome: whether a buyer who arrives from search in Jeddah can establish what the company does, whether it fits their situation, and what the next step is, without a single phone call to find out.`
  const fitAr = `نبني هذه المواقع لشركات جدة التي لديها مادة حقيقية للنشر ولم تنقلها إلى الويب بالشكل الذي ينفع المشتري. وهي مناسبة لشركة يكون فيها فريقها يجيب عن الأسئلة نفسها كل أسبوع — ما الذي ينطوي عليه التعاقد، وكيف يسير المسار، وما الطلبات التي تقبلها الشركة وما الطلبات التي تتجنّبها — بينما تبقى هذه المعرفة في رؤوس الناس أو في رسائل البريد أو في مستندات لا يفتحها أحد. وهي مناسبة لأعمال بُني موقعها مرة واحدة للعرض على بروشور ولم يُس منذ ذلك الحين، فيظل نموذج الاستفسار يعمل دون أن يساعد شيء في الموقع المشتري على اتخاذ قرار. وهي مناسبة لشركة تعمل جمهورين معًا: مجلس إدارة أو شريك إقليمي يريد الإنجليزية، وقاعدة عملاء تريد العربية، وفريق مبيعات يحتاج الاثنين في الصفحة نفسها بحسب من يقرأ. وهي كذلك مناسبة للشركة في جدة التي تجاوزت للتو حجم الموقع الذي بدأت به — عملية متنامية أو قطاع جديد أو خط خدمة جديد لا يستطيع الموقع الحالي تفسيره. ويُقاس الموقع في كل حالة بنتيجة واحدة: هل يستطيع مشتري يصل من البحث في جدة أن يحدد ما تفعله الشركة، وهل تناسبه حالته، وما الخطوة التالية، دون مكالمة هاتفية واحدة ليعرف ذلك.`

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Buyer and enquiry review',
      body:
        'We look at what the business actually sells, which requests it wants more of and which it turns down, what the sales team is asked every week, and where enquiries currently arrive with too little context to be useful.',
    },
    {
      step: 'Scope of content and assistant boundaries',
      body:
        'We decide what the assistant may answer, which questions always reach a person, and which services or sectors deserve their own pages rather than a paragraph inside a general page.',
    },
    {
      step: 'Bilingual design and build',
      body:
        'The structure, service pages, enquiry path, and explanatory sections are built in Arabic and English together, on a foundation the client’s own team can maintain after handover.',
    },
    {
      step: 'Assistant grounding and enquiry preparation',
      body:
        'The assistant is connected to the company’s published material, and the enquiry form is prepared to capture what the team actually needs in order to respond properly the first time.',
    },
    {
      step: 'Launch, observe, refine',
      body:
        'We launch with monitoring in place, review the questions visitors ask and the pages they leave from, and refine the content and the assistant boundaries based on what we actually see.',
    },
  ]

  const processAr = [
    {
      step: 'مراجعة المشترين والاستفسارات',
      body:
        'نراجع ما تبيعه الشركة فعليًا، وما تريد من الطلبات أكثر وما ترفضه، وما يسأل عنه فريق المبيعات كل أسبوع، وأين تصل الاستفسارات حاليًا بمحتوى لا يكفي لتكون نافعة.',
    },
    {
      step: 'نطاق المحتوى وحدود المساعد',
      body:
        'نحدد ما يمكن للمساعد الإجابة عنه، وأي الأسئلة تصل إلى إنسان دائمًا، وأي الخدمات أو القطاعات تستحق صفحاتها الخاصة بدل فقرة داخل صفحة عامة.',
    },
    {
      step: 'التصميم والبناء ثنائي اللغة',
      body:
        'تُبنى البنية وصفحات الخدمات ومسار الاستفسار والأقسام التوضيحية بالعربية والإنجليزية معًا، على أساس يستطيع فريق العميل إدارته بعد التسليم.',
    },
    {
      step: 'تدريب المساعد وتجهيز نموذج الاستفسار',
      body:
        'يُربط المساعد بمواد الشركة المنشورة، ويُجهَّز نموذج الاستفسار ليالتقط ما يحتاجه الفريق فعلًا ليرد ردًا صحيحًا من المرة الأولى.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body:
        'نطلق الموقع مع المراقبة، ونراجع الأسئلة التي يطرحها الزوار والصفحات التي يتركونها، ونحسّن المحتوى وحدود المساعد بناءً على ما نراه فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your operation'
  const stackHeadingAr = 'كيف يتموضع في عملية أعمالك'

  const stackEn = `The site does not sit apart from how your business actually sells — it becomes the front of it. Your team keeps control of what the buyer reads: service pages, sector pages, and policy statements are content your team updates, reviews, and versions, with a record of what changed and when. The assistant layer is configured rather than improvised, so a question answered on one afternoon is answered from the same approved material every time, and anything that touches a specific commitment, a contract term, or a price is handed to a person with the context attached. Where you already run a CRM, a booking tool, a document workflow, or a client portal, the site connects to those rather than asking your team to maintain a second copy of the same information. The company keeps ownership of the site, the content, the documents, and the accounts, and the AI layer sits on top as a service we review and refine together. The same architecture scales: a focused microsite for a single service line or a single district launch quickly when you need one, without the full platform build. For clients in Jeddah we work the way we work on the film side — remotely where the work allows it, and on site when the project needs a face-to-face conversation, with our base remaining in Al Khobar.`
  const stackAr = `لا يقف الموقع بمعزل عن الطريقة التي تبيع بها عملك فعليًا — بل يصبح واجهته الأمامية. يبقى فريقك ماسكًا بما يقرأه المشتري: صفحات الخدمات وصفحات القطاعات وبيانات السياسات محتوى يحدّثه فريقك ويراجعه ويؤرّخه، مع سجل لما تغيّر ومتى. وتُضبط طبقة المساعد ولا تُبتكر ارتجالًا، فالسؤال الذي يُجاب عنه بعد ظهر يوم يُجاب من المادة المعتمدة نفسها في كل مرة، وأي ما يمس التزامًا بعينه أو شرط عقد أو سعرًا يُحوَّل إلى إنسان مع السياق مرفقًا. وإذا كان لديكم نظام إدارة علاقات مع العملاء أو أداة حجز أو سير عمل للمستندات أو بوابة عميل، فإن الموقع يتصل بتلك الأنظمة بدل أن يطلب من فريقك صيانة نسخة ثانية من المعلومة نفسها. وتبقى ملكية الموقع والمحتوى والمستندات والحسابات للشركة، وتُوضع طبقة الذكاء الاصطناعي فوقه كخدمة نراجعها ونحسّنها معًا. وتُقاس نفس الهندسة: microsite مركّز لخط خدمة واحد أو حي واحد يُطلق بسرعة حين تحتاجه، دون أن تمر بالبناء الكامل للمنصة. وللعملاء في جدة نعمل بالطريقة نفسها التي نعمل بها في جانب الأفلام: عن بُعد حيثما يسمح العمل، وعلى الموقع حين يحتاج المشروع إلى حوار مباشر، وتبقى قاعدتنا في الخبر.`

  const faqData = [
    {
      qEn: 'Where is your base, and how do you work with Jeddah clients?',
      aEn:
        'Our base is in Al Khobar, which is where the company and our team are based. We serve Jeddah clients remotely and on site as the project requires. Nothing on this page claims a presence in Jeddah that does not exist.',
      qAr: 'أين مقرّكم، وكيف تعملون مع عملائكم في جدة؟',
      aAr:
        'مقرّنا في الخبر، وهناك تكون الشركة ومقرّ فريقنا. ونخدم عملائنا في جدة عن بُعد وعلى الموقع حسب ما يتطلبه المشروع. ولا تتضمن هذه الصفحة أي حضور في جدة غير قائم.',
    },
    {
      qEn: 'How is this different from a normal business website?',
      aEn:
        'A normal site describes the company and waits. This one answers the questions that decide the outcome — what the work involves, how the process runs, which requests you take — and qualifies the enquiry before anyone on the team spends time on it.',
      qAr: 'بماذا يختلف هذا عن موقع أعمال عادي؟',
      aAr:
        'الموقع العادي يصف الشركة وينتظر. وهذا الموقع يجيب عن الأسئلة التي تحدد النتيجة — ما الذي ينطوي عليه العمل، وكيف يسير المسار، وما الطلبات التي تقبلها الشركة — ويؤهّل الاستفسار قبل أن يتعب أحد الفريق في الرد عليه.',
    },
    {
      qEn: 'What does the AI assistant actually do on the site?',
      aEn:
        'It answers practical, factual questions from the company’s own published material, and routes everything that depends on a specific request to a person, with the visitor’s context attached so nothing has to be repeated.',
      qAr: 'ماذا يفعل المساعد الذكي فعليًا في الموقع؟',
      aAr:
        'يجيب عن الأسئلة العملية والوقائعية من مواد الشركة المنشورة، ويحوّل كل ما يعتمد على طلب بعينه إلى إنسان مع إرفاق سياق الزائر، فلا يتكرر شيء.',
    },
    {
      qEn: 'Can our own team update the content afterwards?',
      aEn:
        'Yes. The structure is built for the client’s team to maintain after handover, so adding a service, revising a description, or publishing an update does not require a developer.',
      qAr: 'هل يستطيع فريقنا تحديث المحتوى لاحقًا؟',
      aAr:
        'نعم. بُنيت البنية ليتمكن فريق العميل من إدارتها بعد التسليم، فإضافة خدمة أو تعديل وصف أو نشر تحديث لا تتطلب مطوّرًا.',
    },
    {
      qEn: 'Do you also produce film and video for Jeddah clients?',
      aEn:
        'Yes. Our crew travels from Al Khobar to Jeddah and shoots on location across the city, and our editors deliver from our own suite. The same company that builds the website handles the film and video work.',
      qAr: 'هل تنتجون أيضًا أفلامًا وفيديو لعملاء في جدة؟',
      aAr:
        'نعم. يسافر طاقمنا من الخبر إلى جدة ويصوّر في مواقع مختلفة في المدينة، وتُسلَّم المونتاجات من استوديونا. والشركة نفسها التي تبني الموقع تتولى أعمال الأفلام والفيديو.',
    },
  ]

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkDigital = isArabic ? 'المنصات الرقمية' : 'digital platforms'
  const linkWebsites = isArabic ? 'بناء مواقع الأعمال' : 'business website development'
  const linkAI = isArabic ? 'المساعدون الذكياء والأتمتة' : 'AI assistants and automation'
  const linkPlatforms = isArabic ? 'بناء منصات الأعمال' : 'business platform development'
  const linkRiyadh = isArabic ? 'مواقع الذكاء الاصطناعي للرياض' : 'AI websites for Riyadh'
  const linkJeddahFilm = isArabic ? 'شركة إنتاج أفلام في جدة' : 'film production company in Jeddah'

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

      {/* Why Jeddah buyers */}
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
            href={`/${locale}/services/business-platform-development-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPlatforms}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/ai-websites-for-riyadh`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkRiyadh}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/film-production-company-jeddah`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkJeddahFilm}
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
