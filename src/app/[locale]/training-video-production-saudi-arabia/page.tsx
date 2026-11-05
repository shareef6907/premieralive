import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'training-video-production-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  const title = isArabic
    ? 'إنتاج فيديوهات التدريب في السعودية | بريمييرا لايف'
    : 'Training Video Production in Saudi Arabia | Premiera Live'
  const description = isArabic
    ? 'ننتج فيديوهات تدريب للموظفين في السعودية — سلّم دراسي، وتصوير في الموقع، ومونتاج ثنائي اللغة لفرق تتدرّب بالتدريج.'
    : 'Training video production in Saudi Arabia — a script, on-site filming, and bilingual editing for teams that onboard and certify at scale.'

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

export default async function TrainingVideoPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'إنتاج فيديوهات التدريب' : 'Training Video Production'

  const h1En = 'Training Video Production in Saudi Arabia'
  const h1Ar = 'إنتاج فيديوهات التدريب في السعودية'

  const heroEn =
    'A training video is not a slide deck with a voice on it. It is a piece of performance that has to hold attention while it teaches something an employee will be asked to do correctly on the floor. Premiera Live builds training films for Saudi companies — from the first written module to the final caption file — with the same team on script, shooting, editing, and delivery. We film in your workplace, in your own equipment area, and on your own process, because training that is filmed somewhere other than where the work happens does not transfer when the employee goes back to the floor. Every module is produced to be usable in an onboarding plan, a safety induction, or a recurring refresher cycle, and delivered in Arabic and English because most Saudi teams run both languages in the same workplace.'
  const heroAr =
    'فيديو التدريب ليس شرائح عرض بصوت عليها. إنّه أداء ينبغي أن يحافظ على الانتباه وهو يشرح مهارة يُطلب من الموظف تنفيذها بشكل صحيح على أرض العمل. تبني بريمييرا لايف أفلام تدريب للشركات السعودية — من أول وحدة مكتوبة إلى آخر ملف ترجمة — بالفريق نفسه في كتابة السيناريو والتصوير والمونتاج والتسليم. نصوّر في موقع عملك، وفي منطقة معداتك، وعلى عمليتك أنت، لأن التدريب الذي يُصوَّر في مكان غير المكان الذي يجري فيه العمل لا ينتقل إلى الموظف حين يعود إلى أرض المشغل. وننتج كل وحدة لتكون صالحة للاستخدام في خطة استقبال أو تعريف بالسلامة أو دورة تحديث دورية، ونسلّمها بالعربية والإنجليزية لأن معظم الفرق السعودية تعمل باللغتين في مكان العمل نفسه.'

  const whyHeadingEn = 'Why training films behave differently'
  const whyHeadingAr = 'لماذا تختلف أفلام التدريب'

  const whyEn =
    'Training content has a different job from every other film we make. A commercial has one job — make the audience want something. A training film has several, and all of them have to hold at once: the employee has to understand the procedure, remember it a week later, follow it exactly when the supervisor is not watching, and apply it to a situation that is never quite the one filmed. That is why a training film fails in predictable ways. When the content is too long, people drop off before the point that matters. When it is filmed in a studio, the employee cannot map it to the machine in front of them. When it is in one language, half the shift cannot use it without an interpreter in the room, and every minute of that interpretation is a minute the training is not teaching. We build the module around the smallest complete unit of competence — one task, done correctly, from start to finish — and we film it where the task happens. That structure is what makes it usable in an induction session, watchable on a phone in a maintenance corridor, and reviewable before an audit.'
  const whyAr =
    'محتوى التدريب مهمة مختلفة عن كل فيلم آخر ننتجه. للإعلان مهمة واحدة — أن يريد الجمهور شيئًا. أما فيلم التدريب فلديه عدة مهام، ولا بد أن تصمد جميعها معًا: أن يفهم الموظف الإجراء، وأن يتذكره بعد أسبوع، وأن يطبقه بدقة حين لا يراقبه المشرف، وأن يكيّفه على موقف ليس هو المصوَّر قط. ولهذا تفشل أفلام التدريب بطرق متوقعة. فإذا طال المحتوى، ينصرف الناس قبل الجزء المهم. وإذا صُوِّر في استوديو، لا يستطيع الموظف مطابقته على الآلة التي أمامه. وإذا كان بلغة واحدة، لا يستطيع نصف المناوبة الاستفادة منه دون مترجم في الغرفة، وكل دقيقة من ذلك الترجمة هي دقيقة لا يدرّب فيها التدريب. نبني الوحدة حول أصغر وحدة كاملة للكفاءة — مهمة واحدة، تُنفَّذ بشكل صحيح من أولها إلى آخرها — ونصوّرها حيث تجري المهمة. وهذا البناء هو ما يجعلها صالحة لجلسة تعريف، وللمشاهدة على هاتف في ممر صيانة، وقابلة للمراجعة قبل تدقيق السلامة.'

  const typesHeadingEn = 'What we produce'
  const typesHeadingAr = 'ما الذي ننتجه'

  const typesEn = [
    {
      title: 'Onboarding and induction films',
      body: 'The first week, filmed once and reused for every new hire. Company overview, site layout, the way work is briefed and handed over, and the housekeeping every new employee needs before touching equipment.',
    },
    {
      title: 'Safety and compliance films',
      body: 'Procedures filmed at the point of work — machine entry, personal protective equipment, permit steps, and emergency response — for the site safety team, the induction folder, and the toolbox talk that follows it.',
    },
    {
      title: 'Process and procedure films',
      body: 'The step sequence that lives in a printed work instruction: assembly, inspection, handover, quality checks. Shot at the workstation with the real tooling, so the frame and the manual describe the same action.',
    },
    {
      title: 'Software and system walkthroughs',
      body: 'Screen-recorded walkthroughs of the systems your teams actually use — an ERP screen, a planning board, a CRM record — with a presenter on camera explaining what to click and why it matters.',
    },
    {
      title: 'Refreshers and change communication',
      body: 'Short modules that go out when a procedure, a machine, or a regulation changes. Short enough to be watched in a shift handover, and versioned so the old module can be pulled from circulation.',
    },
    {
      title: 'Manager and supervisor training',
      body: 'Films for the people who brief others — how to run a toolbox talk, how to coach, how to give feedback on the floor. Built for the audience that already carries responsibility on site.',
    },
  ]

  const typesAr = [
    {
      title: 'أفلام الاستقبال والتعريف',
      body: 'الأسبوع الأول، يُصوَّر مرة واحدة ويُعاد استخدامه لكل موظف جديد. نظرة عامة على الشركة، وتخطيط الموقع، وطريقة شرح العمل وتسليمه، وأمور السلامة التي يحتاجها كل موظف جديد قبل أن يلمس المعدات.',
    },
    {
      title: 'أفلام السلامة والامتثال',
      body: 'إجراءات تُصوَّر في موضع العمل — دخول الآلة، ومعدات الوقاية الشخصية، وخطوات التصريح، والاستجابة للطوارئ — لفريق السلامة في الموقع، ولمجلد التعريف، ولحديث Toolbox الذي يليه.',
    },
    {
      title: 'أفلام العمليات والإجراءات',
      body: 'تسلسل الخطوات المكتوب في تعليمات العمل المطبوعة: التجميع، والفحص، والتسليم، وضوابط الجودة. تُصوَّر في محطة العمل بالأدوات الحقيقية، حتى يصف الإطار والدليل الإجراء نفسه.',
    },
    {
      title: 'شروحات الأنظمة والبرامج',
      body: 'شروحات مسجّلة للشاشات للأنظمة التي تستخدمها فرقك فعلًا — شاشة في نظام تخطيط الموارد، ولوحة تخطيط، وسجل في نظام إدارة العلاقات — مع مقدم على الشاشة يشرح ما يُنقر عليه ولماذا يهم.',
    },
    {
      title: 'أفلام التحديث وتغيير الإجراءات',
      body: 'وحدات قصيرة تخرج عند تغيّر إجراء أو آلة أو لائحة. أقصر بما يكفي لتُشاهد في تسليم المناوبة، ومُرقّمة بحيث يمكن سحب الوحدة القديمة من التداول.',
    },
    {
      title: 'تدريب المديرين والمشرفين',
      body: 'أفلام لمن يشرحون غيرهم — كيف يديرون حديث Toolbox، وكيف يدرّبون، وكيف يقدّمون الملاحظات على أرض العمل. مصممة لجمهور يحمل المسؤولية في الموقع أصلًا.',
    },
  ]

  const processHeadingEn = 'How a training film is made'
  const processHeadingAr = 'كيف يُنتج فيلم التدريب'

  const processEn = [
    {
      step: 'Competence mapping',
      body: 'Before anything is filmed, we sit with the subject-matter owner and agree on what the viewer must be able to do at the end. We write that as a task, not a topic — because "understand the lockout procedure" is a topic, and "isolate the energy source, verify zero, and apply the tag" is a task.',
    },
    {
      step: 'Script and storyboard',
      body: 'A written script with timings, the language each line is delivered in, and a storyboard showing what the frame holds. We keep every module short enough that a person watching it once has no reason to stop.',
    },
    {
      step: 'Planning the shoot with the site',
      body: 'We plan the shoot around the working day, not around the studio calendar. The team films during agreed windows when the process can safely stop, when the location is clear, and when the people in the frame are the people who actually do the job.',
    },
    {
      step: 'Production day',
      body: 'Camera, lighting, and sound on location, with a small crew that can work inside a live facility without disrupting it. Where a task has to be demonstrated at real speed, we film it at real speed rather than slowing it down for the camera.',
    },
    {
      step: 'Editing, subtitles, and delivery',
      body: 'Edit for clarity, colour for consistency with your existing material, sound mixed for a phone speaker and for a room. We deliver a clean master, short vertical cuts for a learning platform or WhatsApp, and caption files for every language you need.',
    },
    {
      step: 'Handover and versioning',
      body: 'Every module is delivered with a source file, a caption set, and a written version note so the next revision is quick. When a procedure changes, we update the affected module instead of re-shooting the whole library.',
    },
  ]

  const processAr = [
    {
      step: 'رسم خريطة الكفايات',
      body: 'قبل تصوير أي شيء، نجلس مع مسؤول المادة ونتفق على ما يجب أن يكون قادرًا على فعله المشاهد في النهاية. نكتب ذلك كمهمة لا كموضوع — فعبارة «يفهم إجراء عزل الطاقة» موضوع، وعبارة «يعزل مصدر الطاقة، ويتحقق من انعدام الجهد، ويضع البطاقة» مهمة.',
    },
    {
      step: 'السيناريو واللوحات',
      body: 'سيناريو مكتوب يتضمن التوقيتات، واللغة التي يُنطق بها كل سطر، ولوحات تعرض ما يحمله كل إطار. ونحافظ على قصر كل وحدة بحيث لا يجد المشاهد الذي يشاهدها مرة واحدة سببًا للتوقف.',
    },
    {
      step: 'تخطيط التصوير مع الموقع',
      body: 'نخطط للتصوير حول يوم العمل لا حول تقويم الاستوديو. ويصوّر الفريق ضمن نوافذ متفق عليها يتوقف فيها العمل بأمان، وتكون فيها الموقع خاليًا، ويكون فيها من يظهر في الإطار من يؤدي المهمة فعلًا.',
    },
    {
      step: 'يوم الإنتاج',
      body: 'كاميرا وإضاءة وصوت في الموقع، بطاقم صغير يعمل داخل منشأة عاملة دون تعطيلها. وحيث يلزم عرض مهمة بسرعتها الحقيقية، نصوّرها بسرعتها الحقيقية لا بتمديدها من أجل الكاميرا.',
    },
    {
      step: 'المونتاج والترجمة والتسليم',
      body: 'مونتاج للوضوح، وتلوين للاتساق مع موادك القائمة، ومزج صوت يعمل على مكبر الهاتف وفي القاعة. ونسلّم نسخة رئيسية نظيفة، ومقاطع عمودية قصيرة لمنصة تعليمية أو واتساب، وملفات ترجمة لكل لغة تحتاجها.',
    },
    {
      step: 'التسليم والإصدارات',
      body: 'تُسلَّم كل وحدة مع ملف المصدر ومجموعة الترجمات وملف نسخة مكتوب ليكون تعديل النسخة التالية سريعًا. وعندما يتغير إجراء، نحدّث الوحدة المتأثرة بدل إعادة تصوير المكتبة كلها.',
    },
  ]

  const deliveryHeadingEn = 'How the films get used'
  const deliveryHeadingAr = 'كيف تُستخدم الأفلام'

  const deliveryEn =
    'A training film that sits on a shared drive is a training film nobody opens. We design for the places where your people already are. One version is built for the induction room, with the trainer able to pause on a step and talk over it. Another is cut for a phone, silent by default with captions on, so it can be watched in a corridor between two jobs without hunting for headphones. A third is a short loop that plays on a screen in the workshop, which is how a lot of procedure knowledge actually reaches the people doing the work. Because we also build websites and digital platforms, the same module can sit inside a learning page that tracks completion, inside a client portal where staff sign off on what they have watched, or inside the site that the company already owns — with the training content managed alongside the rest of the business rather than shipped as a separate file that nobody maintains. If you are also building an onboarding platform or an internal tool, the video work and the software work are planned in the same conversation, which is where the two usually go wrong independently.'
  const deliveryAr =
    'فيديو التدريب الذي يبقى على مجلد مشترك هو فيديو تدريب لا يفتحه أحد. نصمم للأماكن التي يوجد فيها فريقك أصلًا. تُبنى نسخة لجلسة التعريف، يستطيع فيها المدرّب إيقاف العرض عند خطوة والتعليق عليها. وتُبنى أخرى للهاتف، صامتة افتراضيًا مع الترجمات مفعّلة، حتى تُشاهد في ممر بين مهمتين دون البحث عن سماعة. وتُبنى نسخة ثالثة حلقة قصيرة تُعرض على شاشة في الورشة، وهكذا يصل قدر كبير من معرفة الإجراءات إلى من ينفذون العمل فعلًا. ولأننا نبني المواقع والمنصات الرقمية أيضًا، يمكن أن تستقر الوحدة نفسها داخل صفحة تعليمية تتابع الإتمام، أو داخل بوابة عملاء يعتمد فيها الموظفون ما شاهدوه، أو داخل الموقع الذي تملكه الشركة أصلًا — مع إدارة المحتوى التدريبي إلى جانب بقية العمل بدل شحنه ملفًا منفصلًا لا يصونه أحد. وإذا كنت تبني منصة استقبال أو أداة داخلية، فإن عمل الفيديو يُخطط في الحوار نفسه مع عمل البرمجيات، وهو حيث يذهب الاثنان إلى الخطأ بمفرده عادةً.'

  const faqData = [
    {
      qEn: 'Do you film on site or in a studio?',
      aEn: 'On site, wherever the work happens. A procedure film is only useful if the viewer can match the frame to the machine, the tool, or the bench in front of them. We film in your facility, at the workstation, during windows the site has agreed.',
      qAr: 'هل تصوّرون في الموقع أم في الاستوديو؟',
      aAr: 'في الموقع، حيثما يجري العمل. وفيلم التدريب لا ينفع إلا إذا استطاع المشاهد مطابقة الإطار مع الآلة أو الأداة أو طاولة العمل أمامه. ونصوّر في منشأتك، عند محطة العمل، ضمن نوافذ يوافق عليها الموقع.',
    },
    {
      qEn: 'Can you produce training videos in Arabic and English?',
      aEn: 'Yes — bilingual training is standard for us. We can script natively in either language, film the presenter in both, and deliver separate Arabic and English masters with caption files, so a bilingual shift can use the module without an interpreter translating line by line.',
      qAr: 'هل تنتجون فيديوهات التدريب بالعربية والإنجليزية؟',
      aAr: 'نعم — التدريب ثنائي اللغة هو معيارنا. نكتب السيناريو أصالةً بإحدى اللغتين، ونصوّر المقدّم باللغتين، ونسلّم نسختين رئيسيتين بالعربية والإنجليزية مع ملفات ترجمة، حتى تتمكن المناوبة الثنائية اللغة من استخدام الوحدة دون مترجم يترجم سطرًا سطرًا.',
    },
    {
      qEn: 'How long should one training module be?',
      aEn: 'Short enough that someone watches it once without stopping. For a single task that usually means a few minutes. Longer courses are built as a set of short modules that can be delivered in an induction session or assigned one at a time, which is easier to track than one long film nobody finishes.',
      qAr: 'كم ينبغي أن تكون مدة وحدة التدريب؟',
      aAr: 'قصيرة بما يكفي ليشاهدها أحد مرة واحدة دون توقف. و مهمة واحدة تكون عادةً بضع دقائق. أما الدورات الأطول فتُبنى مجموعة وحدات قصيرة يمكن تقديمها في جلسة تعريف أو إسنادها واحدة تلو الأخرى، وهذا أسهل في المتابعة من فيلم طويل لا يكمله أحد.',
    },
    {
      qEn: 'Who writes the script — us or you?',
      aEn: 'Either, and the best version is usually a joint one. If your subject-matter expert writes the technical content, we shape it into a script with timings, visuals, and a spoken structure that holds attention. If you need help building the module from scratch, we draft it and your expert reviews the accuracy before we film anything.',
      qAr: 'من يكتب السيناريو — أنتم أم نحن؟',
      aAr: 'إمّا أنتم وإمّا نحن، والنسخة الأفضل عادةً مشتركة. فإذا كتب خبيركم المحتوى الفني، نحوّله إلى سيناريو بتوقيتات ولقطات وبنية منطقية تحافظ على الانتباه. وإذا احتجتم بناء الوحدة من الصفر، نصوغها ونراجع خبرتكم دقة المحتوى قبل أن نصوّر شيئًا.',
    },
    {
      qEn: 'How do you handle footage of people at work, and their privacy?',
      aEn: 'We work to your internal policy and the site rules we are given. Most companies ask us to avoid showing confidential screens, badges, or documents, and we plan the shot list around that before the day. If a person does not want to appear, we shoot the task and the hands, not the face — and that usually makes better training material anyway.',
      qAr: 'كيف تتعاملون مع تصوير العاملين أثناء العمل وحقوق خصوصيتهم؟',
      aAr: 'نعمل وفق سياستكم الداخلية وقواعد الموقع التي تُطلعنا عليها. تطلب معظم الشركات عدم إظهار شاشات أو بطاقات أو مستندات سرية، ونخطط لقائمة اللقطات على هذا الأساس قبل يوم التصوير. وإذا لم يرد أحد الظهور، نصوّر المهمة واليدين لا الوجه — وهذا عادةً يعطي مادة تدريبية أفضل.',
    },
    {
      qEn: 'What happens when a procedure changes?',
      aEn: 'You come back to us with the change and we update the affected module rather than re-shooting the library. Keeping the source file, the caption set, and a short version note with every delivery is what makes that a short job instead of a new production.',
      qAr: 'ماذا يحدث إذا تغيّر إجراء؟',
      aAr: 'تعود إلينا بالتغيير فنحدّث الوحدة المتأثرة بدل إعادة تصوير المكتبة كلها. والحفاظ على ملف المصدر ومجموعة الترجمات وملف نسخة موجز مع كل تسليم هو ما يجعل ذلك عملًا قصيرًا بدل إنتاج جديد.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkCorporate = isArabic ? 'الأفلام المؤسسية' : 'corporate video production'
  const linkDocumentary = isArabic ? 'الوثائقيات' : 'documentary production'
  const linkEvents = isArabic ? 'تغطية الفعاليات' : 'event coverage'
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

      {/* Why training films behave differently */}
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

      {/* How a training film is made */}
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

      {/* How the films get used */}
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
            href={`/${locale}/services/corporate-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCorporate}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/documentary-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkDocumentary}
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
