import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-government-suppliers-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي لموردي الجهات الحكومية | بريمييرا لايف'
      : 'AI Websites for Government Suppliers | Premiera Live',
    description: isArabic
      ? 'مواقع ثنائية اللغة لموردي الجهات الحكومية والمقاولين في السعودية — بيانات قدرات وأرشيف مشاريع ومعالجة استفسارات المناقصات.'
      : 'Bilingual AI websites for Saudi government suppliers and contractors — capability data, project archives, and tender enquiry handling.',
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
        ? 'مواقع ذكاء اصطناعي لموردي الجهات الحكومية | بريمييرا لايف'
        : 'AI Websites for Government Suppliers | Premiera Live',
      description: isArabic
        ? 'نبني مواقع ثنائية اللغة لموردي الجهات الحكومية والمقاولين — بيانات قدرات وأرشيف مشاريع ومعالجة استفسارات المناقصات.'
        : 'We build bilingual websites for government suppliers and contractors — capability data, project archives, and tender enquiry handling.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي لموردي الجهات الحكومية | بريمييرا لايف'
        : 'AI Websites for Government Suppliers | Premiera Live',
      description: isArabic
        ? 'مواقع ثنائية اللغة لموردي الجهات الحكومية والمقاولين في السعودية.'
        : 'Bilingual websites for Saudi government suppliers and contractors.',
    },
  }
}

export default async function AIWebsitesGovernmentSuppliersPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'مواقع ذكاء اصطناعي لموردي الجهات الحكومية في السعودية'
    : 'AI Websites for Government Suppliers in Saudi Arabia'

  const h1En = 'AI Websites for Government Suppliers in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي لموردي الجهات الحكومية في السعودية'

  const heroEn =
    'Premiera Live builds bilingual, AI-powered websites for the companies that bid on public sector work in Saudi Arabia — contractors, suppliers, and specialist vendors working with ministries, government agencies, and semi-government entities. A tender website has one job, and it is not to look impressive: it has to be found, understood, and trusted by a buyer who is checking dozens of similar vendors. That means a site where your capabilities are structured the way procurement teams read them, where your project archive and certificates are current, and where an assistant can answer the standard qualification questions at any hour without an inaccurate answer ever reaching a committee. We design, build, train the AI layer, and launch from our base in the Eastern Province, working with suppliers across the Kingdom.'
  const heroAr =
    'تبني بريمييرا لايف مواقع ثنائية اللغة مدعومة بالذكاء الاصطناعي للشركات التي تتقدم بعروضها في مشاريع الجهات العامة في السعودية — المقاولون والموردون والموردون المتخصصون الذين يعملون مع الوزارات والجهات الحكومية والشركات شبه الحكومية. مهمة موقع المناقصات واحدة، وليست أن يبدو مبهرًا: أن يُكتشف، وأن يُفهم، وأن يثق به مشترٍ يطابق عشرات الموردين المشابهين. يعني ذلك موقعًا تكون فيه قدراتك مهيكلة بالطريقة التي يقرأ بها فريق المشتريات، وأرشيف مشاريعك وشهاداتك محدّثًا، ومساعد يجيب عن أسئلة التأهيل المعتادة في أي ساعة دون أن تصل إجابة غير دقيقة إلى اللجنة أبدًا. نُصمّم ونبني وندرب طبقة الذكاء الاصطناعي ونُطلق من قاعدتنا في المنطقة الشرقية، ونعمل مع موردين في أنحاء المملكة.'

  const whyHeadingEn = 'Why a tender website behaves differently'
  const whyHeadingAr = 'لماذا يتصرف موقع المناقصات بشكل مختلف'

  const whyEn =
    'A company selling to consumers competes for attention. A company bidding on public sector work competes for credibility, and credibility is assessed differently. The buyer is usually working through a long qualification chain, and the documents that matter — capability statements, project archives, certifications, licences, and references — are checked in a fixed order. Most supplier websites are built as marketing brochures instead, so the exact material that a procurement officer needs is either missing or buried in a PDF that has not been updated since it was created. The second difference is timing. Enquiries do not arrive on a schedule. A tender opens, a bid deadline lands, and a contractor on the other side of the Kingdom needs to know in minutes whether you cover their scope, hold the relevant classification, and can be reached — not tomorrow. The third is that the questions are predictable and repetitive, and they are the same on every bid. This is exactly the kind of work an assistant does well: answering the qualification questions that arrive every week from your own approved material, gathering what a buyer tells it, and routing the serious enquiry to the person who can respond — while the content the committee reads is written, verified, and under your control.'
  const whyAr =
    'الشركة التي تبيع للمستهلك تنافس على الانتباه. أما الشركة التي تتقدم بعروضها في مشاريع القطاع العام فتنافس على المصداقية، والمصداقية تُقيَّم بطريقة مختلفة. يعمل المشتري عادةً عبر سلسلة تحقق طويلة، وتُراجع المستندات المهمة — بيانات القدرات وأرشيف المشاريع والشهادات والتراخيص والمراجع — بترتيب ثابت. معظم مواقع الموردين تُبنى ككتيبات تسويقية بدلًا من ذلك، فيكون المحتوى الذي يحتاجه موظف المشتريات مفقودًا أو مدفونًا في ملف PDF لم يُحدَّث منذ إنشائه. والفرق الثاني هو التوقيت. الاستفسارات لا تصل وفق جدول. يُفتتح مناقصة، ويحدد موعد إقفال العرض، ويحتاج مقاول في الطرف الآخر من المملكة أن يعرف خلال دقائق إن كنتم تغطون نطاقه، ولديكم التصنيف المطلوب، ويمكن التواصل معكم — لا غدًا. الفرق الثالث أن الأسئلة متوقعة ومتكررة، وهي نفسها في كل عرض. وهذا بالضبط نوع العمل الذي يتقنه المساعد الذكي: الإجابة عن أسئلة التأهيل التي تصل كل أسبوع من موادّكم المعتمدة، وتخزين ما يخبره به المشتري، وتوجيه الاستفسار الجاد إلى من يقدر على الرد — بينما المحتوى الذي تقرأه اللجنة مكتوب وموثّق ويبقى تحت سيطرتكم.'

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'Structured capability statements',
      body: 'Your scope, classifications, certifications, licences, and project references laid out in the order procurement teams read them — so the qualification check is passed without a phone call, and without a single invented claim.',
    },
    {
      title: 'A live project archive',
      body: 'Completed and ongoing projects published as structured pages, filterable by sector, contract value band, and location — maintained from one dashboard so the archive never goes stale between tenders.',
    },
    {
      title: 'Tender enquiry assistant',
      body: 'An assistant trained on your capabilities, sectors, and approved answers, handling the standard qualification questions in Arabic and English — and passing anything that touches a bid decision to a person.',
    },
    {
      title: 'Bid document request handling',
      body: 'Enquiries asking for tender documents, addenda, or documentation are collected, qualified against the scope, and routed to the right commercial contact with the buyer’s details attached.',
    },
    {
      title: 'Certificate and compliance library',
      body: 'A structured, date-aware library of certifications and compliance documents, with expiry flagged internally so an out-of-date document is caught before a reviewer does.',
    },
    {
      title: 'Arabic and English parity',
      body: 'Every page, document, and enquiry path available in both languages with full right-to-left support — because evaluation committees and buyers do not read in one language only.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'بيانات قدرات مهيكلة',
      body: 'نطاق عملك وتصنيفاتك وشهاداتك وتراخيصك ومراجع مشاريعك مرتبة بالترتيب الذي يقرأ به فريق المشتريات — فينجح التحقق من الأهلية دون مكالمة ودون أي ادعاء مختلق.',
    },
    {
      title: 'أرشيف مشاريع حي',
      body: 'المشاريع المنجزة والجارية منشورة كصفحات مهيكلة، قابلة للتصفية حسب القطاع وفئة قيمة العقد والموقع — تُدار من لوحة واحدة حتى لا يتقادم الأرشيف بين المناقصات.',
    },
    {
      title: 'مساعد استفسارات المناقصات',
      body: 'مساعد مُدرَّب على قدراتك وقطاعاتك وإجاباتك المعتمدة، يعالج أسئلة التأهيل المعتادة بالعربية والإنجليزية — ويحوّل كل ما يمس قرار العرض إلى شخص.',
    },
    {
      title: 'معالجة طلبات مستندات العروض',
      body: 'الاستفسارات التي تطلب مستندات المناقصة أو الملاحق أو التوثيق تُجمع وتُؤهل مقابل النطاق وتُوجَّه إلى جهة الاتصال التجارية الصحيحة مع بيانات المشتري مرفقة.',
    },
    {
      title: 'مكتبة شهادات ومطابقة',
      body: 'مكتبة مهيكلة للشهادات ومستندات المطابقة تُراعي التواريخ، مع تنبيه داخلي عند قرب انتهاء صلاحية أي مستند قبل أن يلاحظه المراجع.',
    },
    {
      title: 'تكافؤ عربي وإنجليزي',
      body: 'كل صفحة ومستند ومسار استفسار متاح باللغتين مع دعم كامل للـ RTL — لأن لجان التقييم والمشترين لا يقرأون بلغة واحدة فقط.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn =
    'We build these sites for Saudi companies that supply into the public sector: general contractors and specialist subcontractors, engineering and maintenance firms, equipment and materials suppliers, and the consultancy or technology vendors bidding alongside them. The strongest fit is a company that already wins work but loses time — the one with a full project archive, current certificates, and a capable commercial team, but a website that still describes the company in the past tense. If your team loses hours every month re-answering the same qualification questions by email, rebuilding tender replies from scratch, and chasing certificates across shared drives, this is the layer that removes that work. We also build the site for the companies entering public sector supply for the first time and need to present themselves to a procurement committee convincingly from day one.'
  const fitAr =
    'نبني هذه المواقع للشركات السعودية التي تورد إلى القطاع العام: المقاولون العامون والمقاولون المتخصصون وشركات الهندسة والصيانة وموردو المعدات والمواد والاستشاريون وبائعو التقنية الذين يتنافسون معهم. أقوى حالة مناسبة هي شركة تحصد أعمالًا بالفعل لكن تهدر الوقت — التي تملك أرشيف مشاريع كامل وشهادات سارية وفريق تجاري قادر، لكن موقعها ما زال يصف الشركة بصيغة الماضي. إذا كان فريقك يخسر ساعات كل شهر في إعادة الإجابة عن أسئلة التأهيل نفسها بالبريد، وإعادة بناء ردود المناقصات من الصفر، ومتابعة الشهادات عبر مجلدات مشتركة، فهذه الطبقة تزيل ذلك العمل. نبني الموقع أيضًا للشركات التي تدخل التوريد للقطاع العام لأول مرة وتحتاج أن تقدّم نفسها أمام لجنة المشتريات بثقة من اليوم الأول.'

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Qualification document review',
      body: 'We go through your capability statements, certificates, licences, and project archive with your commercial team, and map what a procurement reviewer needs to find against what the site currently shows.',
    },
    {
      step: 'Structure and information architecture',
      body: 'We design the site map around how vendors are evaluated — capability, sectors, projects, certifications, contact — and agree what the assistant may answer before anything is built.',
    },
    {
      step: 'Design and build',
      body: 'Bilingual design system and a fast, mobile-first build, because evaluation committees and procurement officers review supplier sites on phones and laptops in the same week.',
    },
    {
      step: 'Assistant training and integrations',
      body: 'The assistant is trained on your own approved material and connected to the channels your enquiries actually arrive on — email, WhatsApp, or a form on the site.',
    },
    {
      step: 'Launch and content maintenance',
      body: 'We launch with monitoring in place, review the first enquiries, and keep the archive, certificates, and assistant answers current as your business and your scopes change.',
    },
  ]
  const processAr = [
    {
      step: 'مراجعة مستندات التأهيل',
      body: 'نراجع بيانات قدراتك وشهاداتك وتراخيصك وأرشيف مشاريعك مع فريقك التجاري، ونقابل ما يحتاجه مراجع المشتريات إلى إيجاده بما يعرضه الموقع حاليًا.',
    },
    {
      step: 'الهيكلة وهندسة المعلومات',
      body: 'نصمم خريطة الموقع حول طريقة تقييم الموردين — القدرات والقطاعات والمشاريع والشهادات والتواصل — ونتفق على ما يمكن للمساعد الإجابة عنه قبل بناء أي شيء.',
    },
    {
      step: 'التصميم والبناء',
      body: 'نظام تصميم ثنائي اللغة وبنية سريعة تُبنى أولًا للهاتف، لأن لجان التقييم وموظفي المشتريات يراجعون مواقع الموردين على الجوال واللابتوب في الأسبوع نفسه.',
    },
    {
      step: 'تدريب المساعد والتكاملات',
      body: 'يُدرَّب المساعد على موادّكم المعتمدة ويُربط القنوات التي تصل استفساراتكم فعلًا — البريد أو واتساب أو نموذج على الموقع.',
    },
    {
      step: 'الإطلاق وصيانة المحتوى',
      body: 'نُطلق الموقع مع المراقبة، ونراجع أول الاستفسارات، ونُبقي الأرشيف والشهادات وإجابات المساعد محدّثة مع تغيّر أعمالكم ونطاقاتكم.',
    },
  ]

  const stackHeadingEn = 'How it sits in your commercial operation'
  const stackHeadingAr = 'كيف يتموضع في عملية التأجير التجارية'

  const stackEn =
    'The site does not sit apart from how your business actually sells — it becomes the front of it. Your commercial team keeps control of what the committee reads: capability statements, project pages, and certificate records are content your team updates, reviewed, and versioned, with an audit trail on what changed and when. The assistant layer is configured rather than improvised, so a qualification question answered on a Tuesday afternoon is answered from the same approved material every time, and any question that touches pricing, contract terms, or a bid decision is handed to a person with the context attached. Where a bid register already exists — a spreadsheet, a CRM, or a shared drive — we connect to it rather than asking you to maintain a second system. And the same architecture scales: a capability microsite for a single sector or framework launches quickly when you need to bid under a specific classification.'
  const stackAr =
    'لا يقف الموقع بمعزل عن الطريقة التي تبيع بها عملك فعليًا — بل يصبح واجهته الأمامية. يبقى فريقك التجاري ماسكًا بما تقرأه اللجنة: بيانات القدرات وصفحات المشاريع وسجلات الشهادات محتوى يحدّثه فريقك ويراجعه ويؤرّخه، مع سجل تدقيق لما تغيّر ومتى. تُضبط طبقة المساعد ولا تُبتكر ارتجالًا، فالسؤال المؤهل الذي يُجاب عنه بعد ظهر الثلاثاء يُجاب من المادة المعتمدة نفسها في كل مرة، وأي سؤال يمس التسعير أو شروط العقد أو قرار التقديم يُحوَّل إلى شخص مع السياق مرفقًا. وإذا كان لدىكم سجلُّ عروض بالفعل — جدول بيانات أو نظام CRM أو مجلد مشترك — نتكامل معه بدل أن نطلب منكم صيانة نظام ثانٍ. وتُقاس نفس الهندسة: microsite للقدرات في قطاع أو إطار محدد يُطلق بسرعة حين تحتاجون للتقديم ضمن تصنيف بعينه.'

  const faqData = [
    {
      qEn: 'Will an AI assistant be appropriate for a site that bids on government work?',
      aEn: 'Yes — the assistant handles informational qualification questions drawn from your own approved material and routes anything involving a bid decision, commercial terms, or a specific tender to a person. It is configured with a written boundary of what it may and may not answer.',
      qAr: 'هل يناسب المساعد الذكي موقعًا يتقدم بعروضه للأعمال الحكومية؟',
      aAr: 'نعم — يتعامل المساعد مع أسئلة التأهيل المعلوماتية المستمدة من موادّكم المعتمدة، ويحوّل كل ما يتعلق بقرار العرض أو الشروط التجارية أو مناقصة بعينها إلى شخص. ويُعدّ بحدّ مكتوب لما يمكنه الإجابة عنه وما لا يمكن.',
    },
    {
      qEn: 'Can the site be submitted as part of a tendering package?',
      aEn: 'It is built as a capability and evidence site — structured capability statements, a project archive, certification records, and enquiry handling — which is what a supplier website needs to do. We do not make claims about any specific platform’s submission rules.',
      qAr: 'هل يمكن تقديم الموقع كجزء من حزمة المناقصة؟',
      aAr: 'يُبنى الموقع كموسوعة للقدرات والأدلة — بيانات قدرات مهيكلة وأرشيف مشاريع وسجلات شهادات ومعالجة استفسارات — وهذا ما يحتاجه موقع المورد. ولا ندّعي معرفة قواعد التقديم في أي منصة بعينها.',
    },
    {
      qEn: 'How do you handle certificates that expire?',
      aEn: 'Certificate records carry their own validity dates in the content system, so the site always shows the current approved version, and expiry is flagged internally to your team before a lapsed document is found by someone else.',
      qAr: 'كيف تتعاملون مع الشهادات المنتهية؟',
      aAr: 'تحمل سجلات الشهادات تواريخ صلاحيتها داخل نظام المحتوى، فيعرض الموقع دائمًا النسخة المعتمدة الحالية، ويُنبَّه فريقك داخليًا قبل أن يكتشف أحدهم مستندًا منتهي الصلاحية.',
    },
    {
      qEn: 'Is the site bilingual in both directions?',
      aEn: 'Yes — every page, project record, and enquiry path is available in Arabic and English with full right-to-left support, and the assistant answers in the language the enquiry was written in.',
      qAr: 'هل الموقع ثنائي اللغة في الاتجاهين؟',
      aAr: 'نعم — كل صفحة وسجل مشروع ومسار استفسار متاح بالعربية والإنجليزية مع دعم كامل للـ RTL، والمساعد يجيب بلغة الاستفسار الذي كُتب به.',
    },
    {
      qEn: 'How long does a build like this take?',
      aEn: 'A focused capability site for one sector or framework is typically launched within a few weeks. A full platform — bilingual, with a structured project archive, certificate library, and assistant — runs on a longer timeline scoped to the size of the archive and the number of integrations.',
      qAr: 'كم يستغرق بناء كهذا؟',
      aAr: 'يُطلق موقع قدرات مركّز لقطاع أو إطار واحد عادةً خلال أسابيع قليلة. أما المنصة الكاملة — ثنائية اللغة، مع أرشيف مشاريع مهيكَل ومكتبة شهادات ومساعد — فتسير على جدول أطول يُحدَّد وفق حجم الأرشيف وعدد التكاملات.',
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
  const linkPlatforms = isArabic ? 'بناء منصات الأعمال' : 'business platform development'
  const linkIndustrial = isArabic ? 'مواقع الذكاء الاصطناعي لموردي الصناعة' : 'AI websites for industrial suppliers'

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

      {/* Why a tender site is different */}
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
            href={`/${locale}/ai-websites-for-industrial-suppliers-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkIndustrial}
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
