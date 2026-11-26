import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'corporate-film-production-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  const title = isArabic
    ? 'إنتاج الأفلام المؤسسية في السعودية | بريمييرا لايف'
    : 'Corporate Film Production in Saudi Arabia | Premiera Live'
  const description = isArabic
    ? 'إنتاج الأفلام المؤسسية في السعودية — فيلم علامة، ومقدمة تنفيذي، وسرد داخلي، وتغطيات فعاليات. فريق واحد من السيناريو حتى التسليم.'
    : 'Corporate film production in Saudi Arabia — brand films, executive profiles, internal stories, and event recaps. One team from script to delivery.'

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
    robots: { index: true, follow: true },
  }
}

export default async function CorporateFilmProductionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'إنتاج الأفلام المؤسسية' : 'Corporate Film Production'

  const h1En = 'Corporate Film Production in Saudi Arabia'
  const h1Ar = 'إنتاج الأفلام المؤسسية في السعودية'

  const heroEn =
    'A corporate film is not a commercial with a company logo on it. It is a piece of communication with a specific audience, a specific message, and a specific thing you want the viewer to do afterwards — and that means it is judged on whether it works, not on whether it looks expensive. Premiera Live produces corporate films for Saudi organisations: the brand film a company uses when it introduces itself to a new audience, the executive profile a leadership team uses when it needs to be remembered by the people it works with, the internal film a business plays in its own offices, and the event recap that turns a two-day conference into material that keeps working for the rest of the year. The same team writes the script, runs the shoot, and finishes the edit, because the point where a corporate film usually goes wrong is the gap between the people who agreed on the message and the people who filmed it. We work in Arabic and English throughout, because most Saudi organisations communicate with two audiences at once, and they rarely want the same film for both.'
  const heroAr =
    'الفيلم المؤسسي ليس إعلانًا أُلصقت عليه شعار الشركة. إنه رسالة لها جمهور محدد، ورسالة محددة، وشيء محدد تريد أن يفعله المشاهد بعد المشاهدة — ولذلك يُحكم عليه بالأداء لا بالمظهر. تنتج بريمييرا لايف أفلامًا مؤسسية للمنظمات السعودية: فيلم العلامة الذي تستخدمه الشركة حين تتقدّم بجهة جديدة، وبروفايل التنفيذيين الذي يحتاجه فريق القيادة ليُذكر لدى من يعمل معهم، والفيلم الداخلي الذي تعرضه الشركة في مقرها، وتلخيص الفعالية الذي يحوّل مؤتمرًا استمر يومين إلى مادة تستمر في العمل بقية العام. الفريق نفسه يكتب السيناريو ويجري التصوير ويكمل المونتاج، لأن النقطة التي يفشل عندها الفيلم المؤسسي عادةً هي الفجوة بين من اتفقوا على الرسالة ومن صوّروا. نعمل بالعربية والإنجليزية على مدار العملية، لأن معظم المنظمات السعودية تخاطب جمهورين في الوقت نفسه، ونادرًا ما تريد الفيلم نفسه لكليهما.'

  const whyHeadingEn = 'What a corporate film is actually for'
  const whyHeadingAr = 'ما الغرض الحقيقي من الفيلم المؤسسي'

  const whyEn =
    'Corporate films fail in a specific way. They are made by people who are good at making films, for an audience nobody defined. The result is something beautifully shot that nobody changes their behaviour because of. We start from the opposite end: what is this film for? Is it for a recruitment pipeline, for a client deciding between two suppliers, for investors, for employees who have never seen how the business works, or for a standing audience that already trusts you? Each of those needs a different film, and they are not interchangeable. A film built for recruitment cannot also be the film you show to a regulator, because the first one has to be about people and the second one has to be about process. So we agree on the audience and the single action the film is meant to produce before a single frame is planned. That decision governs everything after it: the length, the tone, whether the camera ever leaves the building, who is allowed to speak, and whether the piece is delivered in one language or two. It is also what keeps the shoot from expanding. Once the message and the audience are fixed, the shot list is a consequence rather than a negotiation, and the film finishes inside a plan instead of drifting past one.'
  const whyAr =
    'تفشل الأفلام المؤسسية بطريقة محددة. تصنعها أشخاص يجيدون صناعة الأفلام، لجمهور لم يحدده أحد. فتأتي النتيجة فيلماً مصوّرًا ببراعة لا يغيّر أحد سلوكه بسببه. نبدأ من الجهة المقابلة: ما الغرض من هذا الفيلم؟ أهو لمسار توظيف، أم لعميل يختار بين مورّدين، أم للمستثمرين، أم لموظفين لم يروا من قبل كيف يعمل العمل، أم لجمهور قائم يثق بك أصلًا؟ كل واحد من هذه يحتاج فيلمًا مختلفًا، وليست هذه الأفلام بدائل عن بعضها. لا يمكن للفيلم المبني للتوظيف أن يكون في الوقت نفسه الفيلم الذي تعرضه على جهة تنظيمية، لأن الأول يجب أن يتحدث عن الناس والثاني عن العملية. لذلك نتفق على الجمهور وعلى الإجراء الواحد الذي يُفترض أن يدفعه الفيلم قبل أن تُخطّط أي لقطة. وهذا القرار يحكم كل ما يأتي بعده: الطول، والنبرة، وهل تغادر الكاميرا المبنى أصلًا، ومن يحق له الكلام، وهل يُسلَّم الفيلم بلغة واحدة أم بلغتين. وهو أيضًا ما يمنع التصوير من التوسّع. فبعد تثبيت الرسالة والجمهور تصبح قائمة اللقطات نتيجةً للمعطيات لا تفاوضًا، فينتهي الفيلم ضمن خطة بدل أن يتجاوزها.'

  const typesHeadingEn = 'The films we produce'
  const typesHeadingAr = 'الأفلام التي ننتجها'

  const typesEn = [
    {
      title: 'Brand films',
      body: 'The film a company puts in front of an audience that does not know it yet. Built around what the organisation actually does rather than what it says it does, and cut so that it works on a screen at a trade event and on a phone in someone’s hand.',
    },
    {
      title: 'Executive and leadership profiles',
      body: 'A principal, a managing director, or a technical leader who needs to be heard. Interview-led, shot with deliberate lighting and clean audio, and edited so the authority comes from what is said rather than from how it is framed.',
    },
    {
      title: 'Internal films and employer stories',
      body: 'What the business does, made for the people inside it. Used in recruitment, in onboarding, and in the moments where a company needs to explain itself internally — the plant tour, the process walkthrough, the story of a long-serving team.',
    },
    {
      title: 'Event recaps and highlight films',
      body: 'A conference, an exhibition, a launch, or an annual gathering turned into a film that works after the room has emptied. Shot across the day and cut for the audiences that could not attend, then trimmed for social.',
    },
    {
      title: 'Case study and project films',
      body: 'The work itself as the subject — a completed build, a delivered system, a finished film. Good for a company whose credibility rests on what it has done rather than on what it intends to do.',
    },
    {
      title: 'Onboarding and training films',
      body: 'Structured instructional content for teams that onboard, certify, and refresh. We produce these on the same crew and the same workflow, with the script written as a task and the filming done where the work happens.',
    },
  ]

  const typesAr = [
    {
      title: 'أفلام العلامة',
      body: 'الفيلم الذي تضعه الشركة أمام جمهور لا يعرفها بعد. يُبنى حول ما تفعله المؤسسة فعليًا لا حول ما تقول إنها تفعله، ويُقتطع بحيث يعمل على شاشة في فعالية وعلى هاتف في يد أحدهم.',
    },
    {
      title: 'بروفايلات التنفيذيين والقيادات',
      body: 'رئيس أو مدير عام أو قائد فنّي يحتاج إلى أن يُسمع. يعتمد على المقابلة، ويُصوَّر بإضاءة مقصودة وصوت نظيف، ويُركَّب المونتاج بحيث تأتي القوة من الكلام لا من طريقة تأطيره.',
    },
    {
      title: 'الأفلام الداخلية وقصص雇主',
      body: 'ما يفعله العمل، مصنوعًا لمن هم داخله. يُستخدم في التوظيف وفي الاستقبال وفي اللحظات التي تحتاج فيها الشركة إلى تفسير نفسها داخليًا — جولة في المصنع، وشرح لخطوات العمل، وحكاية فريق قديم.',
    },
    {
      title: 'تلخيص الفعاليات وأفلام أبرز اللحظات',
      body: 'مؤتمر أو معرض أو إطلاق أو تجمع سنوي يتحول إلى فيلم يعمل بعد أن تفرغ القاعة. يُصوَّر على مدار اليوم ويُقطَع لجمهور لم يحضر، ثم يُقصَّر للنشر الاجتماعي.',
    },
    {
      title: 'أفلام دراسات الحالة والمشاريع',
      body: 'العمل نفسه موضوعًا للفيلم — مشروع مكتمل أو نظام مُسلَّم أو فيلم منجز. تناسب الشركة التي تستند مصداقيتها إلى ما أنجزته لا إلى ما تنوي إنجازه.',
    },
    {
      title: 'أفلام الاستقبال والتدريب',
      body: 'محتوى تعليمي منظّم للفرق التي تستقبل الموظف الجديد وتؤكّد احترافياتها وتُحدّث معرّفتها. ننتجها بالطاقم نفسه وبسير العمل نفسه، مع كتابة السيناريو كمهمة وتصويره حيثما يجري العمل.',
    },
  ]

  const processHeadingEn = 'How a corporate film is made'
  const processHeadingAr = 'كيف يُنتج الفيلم المؤسسي'

  const processEn = [
    {
      step: 'Audience and objective',
      body: 'We agree on who is watching and what you want them to do afterwards. Everything about the film — its length, its language, its tone, and where it will be published — follows from that answer rather than from a template.',
    },
    {
      step: 'Script and interview',
      body: 'For an interview-led film we write the questions, not the answers, and we prepare the subject properly so the film is not a first attempt. For a scripted film we write the narration and the structure, and we storyboard anything that has to be demonstrated on screen.',
    },
    {
      step: 'Planning the shoot',
      body: 'We plan against your working day rather than against a studio calendar. If the film needs a working environment, the shoot is scheduled around the hours when that environment is genuinely operating — not an empty version of it staged for camera.',
    },
    {
      step: 'Production day',
      body: 'Cinema cameras, deliberate lighting, and properly recorded audio, with a crew small enough to work inside a live workplace without stopping it. For interviews we control the environment completely, because a background full of movement is not a background.',
    },
    {
      step: 'Post-production',
      body: 'Edit, colour grade, sound mix, and motion graphics where the film needs them. We master the audio for a phone speaker as well as for a conference room, because that is where most corporate films are actually watched.',
    },
    {
      step: 'Delivery and versions',
      body: 'A clean master, vertical cuts for social, subtitled versions in the languages you need, and a written note on what is in each file. Where the film has to run in two languages, the Arabic and English versions are planned together rather than translated afterwards.',
    },
  ]

  const processAr = [
    {
      step: 'الجمهور والهدف',
      body: 'نتفق على من سيشاهد وماذا تريده أن يفعل بعد المشاهدة. كل شيء في الفيلم — طوله ولغته ونبرته وموضع نشره — يتبع هذه الإجابة لا قالبًا جاهزًا.',
    },
    {
      step: 'السيناريو والمقابلة',
      body: 'في الفيلم المبني على المقابلة نكتب الأسئلة لا الإجابات، ونُهيّئ الموضوع جيدًا حتى لا يكون الفيلم محاولة أولى. أما الفيلم المكتوب فنكتب له التعليق والبنية، ونرسم اللوحات لما يجب أن يُظهَر على الشاشة.',
    },
    {
      step: 'تخطيط التصوير',
      body: 'نخطط وفق يوم عملكم لا وفق تقويم الاستوديو. وإذا كان الفيلم يحتاج بيئة عمل، فيُجدوَل التصوير ضمن الساعات التي تكون فيها تلك البيئة عاملة فعلًا — لا نسخة فارغة منها مُعدّة للكاميرا.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'كاميرات سينمائية، وإضاءة مقصودة، وتسجيل صوت صحيح، بطاقم صغير بما يكفي للعمل داخل مكان عامل دون إيقافه. وفي المقابلات نتحكم بالبيئة كليًا، لأن خلفية مليئة بالحركة ليست خلفية.',
    },
    {
      step: 'ما بعد الإنتاج',
      body: 'مونتاج، وتلوين، ومزج صوت، ورسوم متحركة حيث يحتاجها الفيلم. ونضبط الصوت الأساسي لمكبر الهاتف كما نضبطه لقاعة المؤتمرات، لأن هناك تُشاهد معظم الأفلام المؤسسية فعليًا.',
    },
    {
      step: 'التسليم والنسخ',
      body: 'نسخة رئيسية نظيفة، ومقاطع عمودية للنشر الاجتماعي، ونسخ مترجمة للغات التي تحتاجها، وملف مكتوب يوضّح محتوى كل ملف. وإذا كان على الفيلم أن يعمل بلغتين، فتُخطَّط النسختان معًا لا أن تُترجم إحداهما بعد الأخرى.',
    },
  ]

  const usageHeadingEn = 'Where the film gets used'
  const usageHeadingAr = 'أين يُستخدم الفيلم'

  const usageEn =
    'A corporate film usually has a longer life than the brief suggests, and the version that works on a trade show screen is rarely the version that works in an email or on a careers page. We plan for that range from the start. One cut is built for the screen in the room and for the client presentation, with the story complete. Another is shorter and is cut for people who arrive on a link with sound off, which means it carries its meaning in the picture and in the captions rather than in the dialogue. A third is a set of short clips that can be cut around each speaker for social. And because we also build websites and digital platforms, the film can be published inside a site we build for you, hosted with the platform, captioned for search, and connected to a form or a booking flow rather than sitting as a file on a drive that nobody can find. When a company needs one film to serve a recruitment pipeline, a client pitch, an investor update, and an internal onboarding flow, that is one production with four deliveries, not four productions. It is also cheaper and it stays consistent — the same colour, the same grade, the same way of talking about the business.'
  const usageAr =
    'لل فيلم المؤسسي عمر أطول مما يقترح الطلب عادةً، والنسخة التي تعمل على شاشة في فعالية نادرًا ما تكون هي النسخة التي تعمل في رسالة بريدية أو في صفحة توظيف. نخطّط لهذا المدى منذ البداية. تُبنى نسخة للغرفة والعرض على العميل، وفيها القصة مكتملة. وتُبنى أخرى أقصر لجمهور يصل عبر رابط والصوت مطفأ، فتحمل المعنى في الصورة وفي الترجمة لا في الحوار. وتُبنى ثالثة مجموعة مقاطع قصيرة يمكن اقتصاصها حول كل متحدث للنشر الاجتماعي. ولأننا نبني المواقع والمنصات الرقمية أيضًا، يمكن نشر الفيلم داخل موقع نبنيه لك، أو استضافته مع المنصة، أو ترجمته لأغراض البحث، أو ربطه بنموذج أو مسار حجز، بدل أن يبقى ملفًا على قرص لا يجده أحد. وإذا احتاجت شركة فيلمًا واحدًا يخدم مسار التوظيف وعرضًا على عميل وتحديثًا للمستثمرين وتدفق استقبال داخلي، فهذا إنتاج واحد بأربعة مخرجات لا أربعة إنتاجات. وهو أقل كلفة ويحافظ على الاتساق — اللون نفسه، والتدرّج نفسه، وطريقة الحديث عن العمل نفسها.'

  const faqData = [
    {
      qEn: 'How long does a corporate film take to produce?',
      aEn: 'It depends on how much of your operation the film needs to show. A studio interview with one speaker can be produced on a short schedule. A film that has to capture a working site, several teams, and multiple locations needs real planning time before the shoot as well as editing time after it. We give you a schedule with dates before the shoot is booked, not after it is finished.',
      qAr: 'كم يستغرق إنتاج فيلم مؤسسي؟',
      aAr: 'يعتمد على مقدار العمل الذي يحتاج الفيلم إظهاره. فالمقابلة في الاستوديو مع متحدث واحد يمكن إنتاجها في مدة قصيرة، أما الفيلم الذي يجب أن يلتقط موقعًا عاملًا وعدة فرق ومواقع متعددة فيحتاج وقت تخطيط حقيقي قبل التصوير ووقت مونتاج بعده. ونقدّم جدولًا زمنيًا بالتواريخ قبل حجز التصوير لا بعد انتهائه.',
    },
    {
      qEn: 'Do we need to be in the studio, or will you come to us?',
      aEn: 'Either. For an interview-led film the environment matters more than the building, so we can set up in your office or in a space you control. For a film that has to show how your operation actually runs, the location is the content, and we come to you. Our office is in Al Khobar and we travel across Saudi Arabia for shoots.',
      qAr: 'هل نحتاج إلى الاستوديو أم أنتم تأتيون إلينا؟',
      aAr: 'الأمر بينكم وبيننا. في الفيلم المبني على المقابلة تكون البيئة أهم من المبنى، فنستطيع الإعداد في مكتبكم أو في مساحة تتحكمون بها. أما إذا كان على الفيلم أن يُظهر كيف يعمل عملكم فعليًا، فالموقع هو المحتوى، ونأتي إليكم. مقرنا في الخبر، ونسافر في مختلف أنحاء المملكة للتصوير.',
    },
    {
      qEn: 'Can you produce the same film in Arabic and English?',
      aEn: 'Yes, and we plan both versions together rather than translating one after the other. That means the Arabic and English edits are built from the same script and the same shoot, so they carry the same message and the same level of production. Where a film is delivered with subtitles only, we produce separate caption files for each language.',
      qAr: 'هل تنتجون الفيلم نفسه بالعربية والإنجليزية؟',
      aAr: 'نعم، ونخطّط النسختين معًا بدل أن نترجم إحداهما بعد الأخرى. أي أن مونتاجي العربية والإنجليزية يُبنىان من السيناريو نفسه ويوم التصوير نفسه، فيحملان الرسالة نفسها ومستوى الإنتاج نفسه. وإذا سُلّم الفيلم بترجمة نصية فقط، ننتج ملفات ترجمة منفصلة لكل لغة.',
    },
    {
      qEn: 'What do we get at the end?',
      aEn: 'A clean master, shorter cuts for social, and caption files in the languages you need, with a written note describing what is in each file. You own the footage and the finished films. If the film is hosted on a site or platform we build for you, it is delivered there as part of the project rather than sent as a separate attachment.',
      qAr: 'ماذا نسلّم في النهاية؟',
      aAr: 'نسخة رئيسية نظيفة، ومقاطع أقصر للنشر الاجتماعي، وملفات ترجمة للغات التي تحتاجها، مع ملف مكتوب يوضّح محتوى كل ملف. والمواد المصوّرة والأفلام النهائية ملككم. وإذا استُضيف الفيلم على موقع أو منصة نبنيها لكم، فيُسلَّم هناك ضمن المشروع لا كمرفق منفصل.',
    },
    {
      qEn: 'Can you film at our site without disrupting operations?',
      aEn: 'Yes. We plan shoot windows with your team in advance, work with a crew small enough to move through a live facility, and agree the shot list before the day so we are not improvising in your working space. If a process has to be shown, we film it as it runs rather than staging it for the camera.',
      qAr: 'هل يمكنكم التصوير في موقعنا دون تعطيل العمل؟',
      aAr: 'نعم. نخطط نوافذ التصوير مع فريقكم مسبقًا، ونعمل بطاقم صغير بما يكفي للتنقل داخل منشأة عاملة، ونتفق على قائمة اللقطات قبل يوم التصوير حتى لا نبتكر في مساحة عملكم. وإذا كان هناك إجراء يجب إظهاره، نصوّره كما يجري لا كإعدادٍ للكاميرا.',
    },
    {
      qEn: 'How do you handle people who appear in the film?',
      aEn: 'We work to your internal policy and the site rules we are given, and we plan the shot list around them before the day. Most organisations ask us to avoid confidential screens, badges, or documents on camera. If someone prefers not to appear, we shoot the work and the hands rather than the face.',
      qAr: 'كيف تتعاملون مع من يظهر في الفيلم؟',
      aAr: 'نعمل وفق سياستكم الداخلية وقواعد الموقع التي تُطلعنا عليها، ونخطط قائمة اللقطات على هذا الأساس قبل يوم التصوير. تطلب معظم المؤسسات عدم إظهار شاشات أو بطاقات أو مستندات سرية أمام الكاميرا. وإذا رأى أحدهم عدم المظهر، نصوّر العمل واليدين بدل الوجه.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'لنصنع فيلمًا يعمل كما ينبغي.' : "Let's Make a Film That Works."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
  const linkCommercial = isArabic ? 'الأفلام الإعلانية' : 'commercial film production'
  const linkTraining = isArabic ? 'فيديوهات التدريب' : 'training video production'
  const linkPodcast = isArabic ? 'إنتاج البودكاست' : 'podcast production'
  const linkEvents = isArabic ? 'تغطية الفعاليات' : 'event coverage'
  const linkPhotography = isArabic ? 'التصوير الاحترافي' : 'professional photography'
  const linkJubail = isArabic ? 'إنتاج الأفلام في الجبيل' : 'film production in Jubail'

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
              { '@type': 'ListItem', name: 'Home', item: `${DOMAIN}/${locale}`, position: 1 },
              { '@type': 'ListItem', name: isArabic ? 'إنتاج الأفلام' : 'Film Production', item: `${DOMAIN}/${locale}/film-production-company-saudi-arabia`, position: 2 },
              { '@type': 'ListItem', name: cornerLabel, item: `${DOMAIN}/${locale}/${PATH}`, position: 3 },
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

      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Corporate Film Production',
            name: isArabic ? 'إنتاج الأفلام المؤسسية | بريمييرا لايف' : 'Corporate Film Production | Premiera Live',
            description: isArabic
              ? 'إنتاج الأفلام المؤسسية في السعودية — أفلام علامة وبروفايلات تنفيذيين وتلخيصات فعاليات.'
              : 'Corporate film production in Saudi Arabia — brand films, executive profiles, and event recaps.',
            provider: {
              '@type': 'Organization',
              name: isArabic ? 'بريمييرا لايف' : 'Premiera Live',
              url: DOMAIN,
            },
            areaServed: {
              '@type': 'Place',
              name: 'Saudi Arabia',
            },
            url: `${DOMAIN}/${locale}/${PATH}`,
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

      {/* What a corporate film is actually for */}
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

      {/* The films we produce */}
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

      {/* How a corporate film is made */}
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

      {/* Where the film gets used */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? usageHeadingAr : usageHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? usageAr : usageEn}
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
          {faqs.map((item, i) => (
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
                {item.q}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.7,
              }}>
                {item.a}
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
            href={`/${locale}/training-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkTraining}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/podcast-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPodcast}
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
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/film-production-company-jubail`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkJubail}
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
