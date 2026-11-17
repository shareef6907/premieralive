import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-law-firms-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع الذكاء الاصطناعي لمكاتب المحاماة | بريمييرا لايف'
      : 'AI Websites for Law Firms in Saudi Arabia',
    description: isArabic
      ? 'نبني مواقع ذكاء اصطناعي ثنائية اللغة لمكاتب المحاماة في السعودية تجيب عن أسئلة العملاء وتشرح مجالات الممارسة وتؤهل طلبات الاستشارة.'
      : 'Bilingual AI websites for law firms in Saudi Arabia. We build sites that answer client questions, explain practice areas, and qualify consultations.',
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
        ? 'مواقع الذكاء الاصطناعي لمكاتب المحاماة | بريمييرا لايف'
        : 'AI Websites for Law Firms in Saudi Arabia',
      description: isArabic
        ? 'مواقع ثنائية اللغة لمكاتب المحاماة تجيب عن أسئلة العملاء، وتشرح مجالات الممارسة، وتؤهّل طلبات الاستشارة قبل وصولها إلى المحامي.'
        : 'Bilingual sites for law firms that answer client questions, explain practice areas, and qualify consultations before they reach a lawyer.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع الذكاء الاصطناعي لمكاتب المحاماة | بريمييرا لايف'
        : 'AI Websites for Law Firms in Saudi Arabia',
      description: isArabic
        ? 'مواقع ثنائية اللغة لمكاتب المحاماة تجيب عن الأسئلة العملية وتقود العميل المحتمل إلى الاستشارة المناسبة.'
        : 'Bilingual law firm websites that answer practical questions and route prospects to the right consultation.',
    },
  }
}

export default async function AIWebsitesLawFirmsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'مواقع ذكاء اصطناعي لمكاتب المحاماة في السعودية'
    : 'AI Websites for Law Firms in Saudi Arabia'

  const h1En = 'AI Websites for Law Firms in Saudi Arabia'
  const h1Ar = 'مواقع الذكاء الاصطناعي لمكاتب المحاماة في السعودية'

  const heroEn = `A potential client does not arrive at a law firm's website with a fully formed legal question. They arrive with a situation — a contract they are not sure they can exit, a payment that has been delayed, a dispute with a counterparty, a company formation decision, a family matter they cannot discuss openly — and they are trying to work out two things before they ever contact anyone: whether this is a problem a law firm handles, and whether they would be comfortable raising it here. The second question is the one most law firm websites fail. They publish a list of practice areas, a biography of the founder, a phone number, and a contact form that opens an empty inbox. The visitor is left to translate their own situation into one of the headings on the page, and to decide whether the firm is credible from a paragraph of general language. Premiera Live builds bilingual websites for law firms in Saudi Arabia where an AI assistant answers the practical, factual questions from the firm's own published material — practice areas, the process a matter typically follows, what documents a consultation needs, how the firm works, what happens after a consultation, and which matters the firm takes on and which it does not — and carries the visitor to the point where they can request a consultation with the context already attached.`
  const heroAr = `لا يصل العميل المحتمل إلى موقع مكتب المحاماة ومعه سؤال قانوني مكتمل. يصل ومعه موقف — عقد لا يعرف إن كان يستطيع إنهاءه، أو دفعة متأخرة، أو نزاع مع طرف آخر، أو قرار بتأسيس شركة، أو مسألة أسرية لا يجرؤ على مناقشتها علنًا — ويحاول أن يحسم أمرين قبل أن يتصل بأحد: هل هذه مشكلة يعالجها مكتب المحاماة، وهل سيشعر بالارتياح وهو يطرحها هنا. السؤال الثاني هو الذي تفشل فيه مواقع مكاتب المحاماة أكثر من غيرها. فنشر الموقع قائمة بمجالات الممارسة، وسيرة المؤسس، ورقم هاتف، ونموذج تواصل يفتح صندوق بريد فارغًا. فيترك الزائر ترجمة موضعه إلى واحدة من العناوين المنشورة على الصفحة، ويقرر وحده مدى مصداقية المكتب من فقرة عامة. تبني بريمييرا لايف مواقع ثنائية اللغة لمكاتب المحاماة في السعودية يرد فيها مساعد ذكاء اصطناعي على الأسئلة العملية من مواد المكتب المنشورة — مجالات الممارسة، ومسار المتابعة المعتاد، والمستندات التي يحتاجها الاستشارة، وطريقة عمل المكتب، وما الذي يحدث بعد الاستشارة، وما هي القضايا التي يقبلها المكتب وما لا يقبلها — ويقود الزائر إلى اللحظة التي يطلب فيها استشارة وقد رُفق بسياقه بالفعل.`

  const whyHeadingEn = 'Why a general practice-area list is not enough'
  const whyHeadingAr = 'لماذا لا تكفي قائمة عامة بمجالات الممارسة'

  const whyEn = `The legal market in Saudi Arabia searches on specifics. Someone typing into a search engine at eleven at night about a stalled construction contract is looking for something quite different from someone researching corporate formation for a new venture, and a third person is looking for the right forum and the right sequence of steps for a commercial dispute. Each of these searches carries an implicit question about fit, and each is badly served by a page whose main content is a list of headings. A website that only states what the firm does forces every visitor to do the qualifying work, and the visitors who do that work are rarely the ones who contact you first, because they are also the ones most likely to be comparing three firms side by side in separate tabs. The second reason an assistant matters here is that the question a visitor cannot easily ask is a factual question, and factual questions about process are exactly what a law firm already knows and has published. Whether the firm handles matters before the general authority, whether the first consultation is charged, which documents clients typically bring, how long a routine file takes to progress, how the firm communicates updates — these are not legal opinions and they are not case-specific advice. They are published information, and answering them accurately at the moment of asking is the difference between a comfortable enquiry and a visitor who leaves to find a website that feels easier to deal with. We ground the assistant strictly in your own published material, set explicit boundaries on what it will not answer, and route everything that touches a specific matter to a person.`
  const whyAr = `البحث في السوق القانوني السعودي يجري على التفاصيل. فمن يكتب في محرك بحث عند الحادية عشرة ليلًا عن عقد إنشاء متعثر يبحث عن شيء مختلف تمامًا عن من يبحث في تأسيس شركة لمشروع جديد، وعن ثالث يبحث عن الجهة المختصة وتسلسل الخطوات الصحيح في نزاع تجاري. يحمل كل بحث من هذه البحوث سؤالًا ضمنيًا عن ملاءمة المكتب، وكلها تخدمها صفحات ضعيفة حين يكون محتواها الرئيسي قائمة بعناوين. والموقع الذي يفعل ذلك يجبر كل زائر على تنفيذ مهمة التأهيل نيابة عن المكتب، والزائرون الذين ينجزون هذه المهمة نادرًا ما يكونون أول من يتواصلون، لأنهم في الغالب يقارنون ثلاثة مكاتب في علامات تبويب منفصلة. والسبب الثاني لأهمية المساعد هنا أن السؤال الذي لا يجرؤ الزائر على طرحه سؤال وقعي، وأسئلة الوقائع عن المسار هي ما يعرفه المكتب أصلًا وينشره. فهل يعالج المكتب القضايا قبل الجهة العامة، وهل تُحتسب الاستشارة الأولى، وما المستندات التي يحضرها العميل عادة، وكم يستغرق ملف اعتيادي حتى يتقدم، وكيف يوصل المكتب تحديثاته — هذه ليست آراء قانونية ولا مشورة في قضية بعينها، بل معلومات منشورة. والإجابة عنها بدقة في لحظة السؤال هي الفرق بين استفسار مريح وزائر يغادر بحثًا عن موقع يبدو أسهل التعامل معه. ونربط المساعد حصرًا بموادك المنشورة، ونضع حدودًا صريحة لما لا يجيب عنه، ونحوّل كل ما يمس قضية بعينه إلى إنسان.`

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'An assistant that answers from the firm’s own material',
      body:
        'An assistant grounded in your published practice areas, process descriptions, policies, and document lists, so a visitor can resolve the practical questions that would otherwise become an unanswered voicemail or an email that gets forgotten.',
    },
    {
      title: 'Practice area pages built around real client situations',
      body:
        'Pages organised around the situation a client is actually in rather than around the internal name of a department, with the first question each visitor is likely to ask answered at the top of the page.',
    },
    {
      title: 'A consultation request that arrives with context',
      body:
        'A structured enquiry form that captures the practice area, the stage the matter is at, and what the visitor needs, so the first conversation with the firm starts from information rather than from a blank page of notes.',
    },
    {
      title: 'Bilingual content built in, not translated afterwards',
      body:
        'Arabic and English versions written and structured together from the first draft, so the two sides of the site carry the same detail and neither becomes a thin summary of the other.',
    },
    {
      title: 'Clear boundaries between what the site says and what a lawyer says',
      body:
        'The site states what the firm does and how the process generally runs. It does not give legal advice, and the assistant is configured to hand any question that depends on a specific matter to the team.',
    },
    {
      title: 'Answers to the questions clients ask before they contact anyone',
      body:
        'Sections covering first consultations, documents to bring, fees and billing explained in general terms, communication expectations, and the differences between practice areas — written for a first-time client, not for a colleague.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'مساعد يجيب من مواد المكتب نفسها',
      body:
        'مساعد يستند إلى مجالات الممارسة المنشورة لديك، وأوصاف المسار، والسياسات، وقوائم المستندات، فيتمكن الزائر من حل الأسئلة العملية التي كانت ستتحول إلى رسالة صوتية لا يُرد عليها أو بريد إلكتروني يُنسى. ويعرف المساعد أين يتوقف: أي سؤال يعتمد على قضية بعينه يمرره إلى فريقك مع تلخيص للوضع الذي وصفه الزائر، فلا يضطر إلى إعادة الشرح من البداية.',
    },
    {
      title: 'صفحات مجالات الممارسة مبنية على مواقف العملاء الحقيقية',
      body:
        'صفحات تُنظَّم حول الموقف الذي يمر به العميل فعليًا لا حول الاسم الداخلي للقسم، ويُجاب في أعلى الصفحة عن أول سؤال يُتوقع أن يطرحه الزائر. وهذا الترتيب يغيّر النتيجة: فالزائر لا يحتاج إلى قراءة الموقع كاملًا ليعرف إن كان هذا هو المكتب المناسب، بل يجد الجواب قبل أن يقرأ ما هو مكتوب تحته.',
    },
    {
      title: 'طلب استشارة يصل مع سياقه',
      body:
        'نموذج استفسار منظم يلتقط مجال الممارسة ومرحلة القضية وما يحتاجه الزائر، فتصل المحادثة الأولى مع المكتب وفي يده معلومة بدل صفحة فارغة من الملاحظات. ولا يطلب النموذج من الزائر سردًا طويلًا لمشكلة قد لا يفهمها بعد، بل يكتب ما يعرفه بلغته.',
    },
    {
      title: 'محتوى ثنائي اللغة مبني من البداية',
      body:
        'تُكتب النسختان العربية والإنجليزية وتُبنى معًا منذ المسودة الأولى، فتحملان التفصيل نفسه ولا تتحول إحداهما إلى ملخص رقيق للأخرى. ويشمل ذلك ضبط اتجاه النص العربي وطول الفقرات التي يقرأها العميل على الجوال، لأن أغلب الزوار يتصفحون الموقع من الهاتف قبل أن يتواصلوا.',
    },
    {
      title: 'حدود واضحة بين ما يقوله الموقع وما يقوله المحامي',
      body:
        'يصف الموقع ما يقوم به المكتب وكيف يسير المسار عمومًا. ولا يقدم استشارة قانونية، ويُعدّ المساعد ليسلّم أي سؤال يعتمد على قضية بعينه إلى الفريق. وهذه الحدود ليست تفصيلًا في صفحة الشروط، بل جزء من تصميم الموقع نفسه: يعرف الزائر ما الذي يمكنه الاعتماد عليه وما الذي يحتاج إلى إنسان.',
    },
    {
      title: 'إجابات عن الأسئلة التي يطرحها العملاء قبل أن يتواصلوا',
      body:
        'أقسام تتناول الاستشارة الأولى، والمستندات المطلوبة، وطريقة احتساب الأتعاب وتوضيحها بصيغة عامة، وتوقعات التواصل، والفوارق بين مجالات الممارسة — كلها مكتوبة لعميل جديد لا لزميل في المهنة. وهذه الأقسام هي ما يمنح المكتب حضورًا في البحث عن أسئلة يطرحها من لا يجرؤ على السؤال بعد ذلك.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn = `We build these sites for law firms and legal offices in Saudi Arabia that handle a genuine flow of consultations and still find that their enquiries arrive thin — a name, a phone number, and a request to call back that reveals nothing about the matter. It suits a firm with several practice areas where the website lists all of them at the same weight and a visitor cannot tell which one them actually needs, because in most cases the visitor does not know either. It suits a firm that has written good material internally — engagement letters, document checklists, process notes, answers to the questions the reception team answers every day — and has never moved any of it onto the site, where it would do the qualifying work automatically. It also suits a firm working in a second language: an office whose clients sometimes arrive in English and sometimes in Arabic, or whose own internal documents exist in one language while its public presence is in another. In every case the site is judged by one outcome: whether someone who arrives with a real problem can identify whether this firm is the right one, understand what the next step looks like, and reach the team without needing to explain the situation from the beginning.`
  const fitAr = `نبني هذه المواقع لمكاتب المحاماة والمكاتب القانونية في السعودية التي تستقبل تدفقًا حقيقيًا من طلبات الاستشارة، وتجد رغم ذلك أن الاستفسارات تصل ضعيفة المحتوى — اسم ورقم هاتف ورغبة في معاودة الاتصال، بلا ما يكشف عن طبيعة القضية. وهي مناسبة لمكتب يتعامل مع عدة مجالات ممارسة يعرضها الموقع بالوزن نفسه، فلا يستطيع الزائر أن يعرف أيّها يحتاج فعلًا، وغالبًا لا يعرف الزائر نفسه. وهي مناسبة أيضًا لمكتب كتب مواد جيدة في داخله — خطابات التعاقد وقوائم المستندات وملاحظات المسار والإجابات عن الأسئلة التي يجيب عنها موظف الاستقبال يوميًا — ولم ينقل أيًّا منها إلى الموقع حيث تصنع هذا العمل التأهيلي تلقائيًا. وهي كذلك مناسبة لمكتب يعمل بلغة ثانية: مكتب يصله العملاء أحيانًا بالإنجليزية وأحيانًا بالعربية، أو توجد وثائقه الداخلية بلغة بينما حضوره العام بلغة أخرى. ويُقاس الموقع في كل حالة بنتيجة واحدة: هل يستطيع شخص يصل بمشكلة حقيقية أن يعرف إن كان هذا المكتب هو المناسب، ويفهم شكل الخطوة التالية، ويصل إلى الفريق دون حاجة إلى شرح وضعه من البداية.`

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Practice area and enquiry audit',
      body:
        'We review what the firm actually advises on, which matters it accepts and which it declines, what the reception team is asked every week, and where enquiries currently arrive with too little context to be useful.',
    },
    {
      step: 'Scope of the content and the assistant',
      body:
        'We decide what the assistant may answer, which questions always reach a lawyer, and what the site states plainly about the practice rather than leaving the visitor to infer.',
    },
    {
      step: 'Bilingual design and build',
      body:
        'The design system, practice area pages, consultation path, and explanatory sections are built in Arabic and English together, on a structure the firm can maintain after handover.',
    },
    {
      step: 'Assistant grounding and document preparation',
      body:
        'The assistant is connected to the firm’s own published material and the document checklists are prepared, so the two things a visitor asks for most often — what this is and what do I bring — are answered consistently.',
    },
    {
      step: 'Launch, observe, refine',
      body:
        'We launch with monitoring in place, review the questions visitors actually ask and the pages they leave from, and refine the content and the assistant boundaries based on what we see.',
    },
  ]

  const processAr = [
    {
      step: 'مراجعة مجالات الممارسة والاستفسارات',
      body:
        'نراجع ما يقدّم فيه المكتب المشورة فعليًا، وما يقبله من القضايا وما لا يقبله، وما يسأل عنه موظف الاستقبال كل أسبوع، وأين تصل الاستفسارات حاليًا بمحتوى لا يكفي لتكون نافعة. وتُجمع في هذه المرحلة الأسئلة المتكررة لأنها غالبًا ما تكون هي التي يجيب عنها المكتب شفهيًا ولا يجدها أحد مكتوبة في أي مكان.',
    },
    {
      step: 'نطاق المحتوى والمساعد',
      body:
        'نحدد ما يمكن للمساعد الإجابة عنه، وأي الأسئلة تصل إلى محامي دائمًا، وما الذي يذكره الموقع صراحة عن المكتب بدل أن يتركه للزائر يستنتجه. وتُكتب هذه الحدود بنص يفهمه الفريق قبل الإطلاق، حتى يكون سلوك المساعد متوقعًا والقرار واضحًا.',
    },
    {
      step: 'التصميم والبناء ثنائي اللغة',
      body:
        'يُبنى نظام التصميم وصفحات مجالات الممارسة ومسار الاستشارة والأقسام التوضيحية بالعربية والإنجليزية معًا، على بنية يستطيع المكتب تشغيلها بعد التسليم دون الحاجة إلى تعديل الشيفرة لكل تحديث.',
    },
    {
      step: 'تدريب المساعد وتجهيز قوائم المستندات',
      body:
        'يُربط المساعد بمواد المكتب المنشورة وتُجهَّز قوائم المستندات لكل نوع من الطلبات، فيُجاب سؤال الزائر الأكثر تكرارًا — ما هذا، وماذا أحضر — باتساق في كل مرة. ويُختبر المساعد قبل الإطلاق على أسئلة صيغت بلغة الزائر لا بلغة المكتب.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body:
        'نطلق الموقع مع المراقبة، ونراجع الأسئلة التي يطرحها الزوار فعلًا والصفحات التي يتركونها، ونحسّن المحتوى وحدود المساعد بناءً على ما نراه. ثم نعيد فحص صفحات المجالات دوريًا مع المكتب، فلا تبقى معلومة قديمة منشورة بعد أن تغيّرت.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn = `The site is built on a stack your own team can operate after handover, and the assistant is configured against the firm’s content rather than rebuilt for every new practice area or every revision of the process. That is what lets a new service line reach the site without a redevelopment, and what keeps the Arabic and English versions in step because both come from the same source. Where the firm already runs a case management system, a document workflow, or a consultation scheduling tool, we connect the site to those rather than asking your team to maintain a second copy of the same information. The firm keeps ownership of the site, the content, the documents, and the accounts. The AI layer sits on top as a service we review and refine together, and the line between what the assistant answers and what a lawyer confirms is part of the design rather than a setting discovered after a visitor has been given a misleading answer about their own case.`
  const stackAr = `يُبنى الموقع على مكدس يستطيع المكتب تشغيله بعد التسليم، ويُضبط المساعد على محتوى المكتب بدل أن يُعاد بناؤه في كل مجال جديد أو في كل مراجعة للعملية. وهذا ما يتيح إضافة خط خدمة جديد إلى الموقع دون إعادة تطوير، وما يبقي النسختين العربية والإنجليزية متزامنتين لأنهما تُنتجان من المصدر نفسه. وإذا كان المكتب يشغّل اليوم نظام إدارة ملفات أو سير عمل للمستندات أو أداة لجدولة الاستشارات، فإننا نربط الموقع بتلك الأنظمة بدل أن نطلب من الفريق صيانة نسخة ثانية من المعلومة نفسها. وتبقى ملكية الموقع والمحتوى والمستندات والحسابات للمكتب. وتُوضع طبقة الذكاء الاصطناعي فوقه كخدمة نراجعها ونحسّنها معًا، ويكون الفصل بين ما يجيب عنه المساعد وما يؤكده المحامي جزءًا من التصميم لا إعدادًا يُكتشف بعد أن يتلقى الزائر إجابة مضللة عن قضيته.`

  const faqData = [
    {
      qEn: 'Will the assistant give legal advice about my case?',
      aEn:
        'No. It answers factual questions from the firm’s published material — practice areas, process, documents, policies. Anything that depends on a specific matter is handed to a lawyer with the visitor’s context attached.',
      qAr: 'هل يقدّم المساعد استشارة قانونية عن قضيتي؟',
      aAr:
        'لا. يجيب عن الأسئلة الوقائعية من مواد المكتب المنشورة — مجالات الممارسة والمسار والمستندات والسياسات. وأي ما يعتمد على قضية بعينه يُحوَّل إلى محامٍ مع سياق ما وصفه الزائر.',
    },
    {
      qEn: 'How is this different from a normal law firm website?',
      aEn:
        'A normal site lists practice areas and waits. This one answers the questions that decide whether the firm is the right one — what the process involves, what a consultation needs, what the firm does not take on — before the visitor sends anything.',
      qAr: 'بماذا يختلف هذا عن موقع مكتب محاماة عادي؟',
      aAr:
        'الموقع العادي يسرد مجالات الممارسة وينتظر. وهذا الموقع يجيب عن الأسئلة التي تحدد إن كان المكتب هو المناسب — ما الذي ينطوي عليه المسار، وما تحتاجه الاستشارة، وما لا يقبله المكتب — قبل أن يرسل الزائر أي شيء.',
    },
    {
      qEn: 'Can we update the practice areas and documents ourselves?',
      aEn:
        'Yes. The content structure is set up for the firm’s team to maintain after handover, so adding a practice area, updating a document checklist, or revising a process does not require a developer.',
      qAr: 'هل يمكننا تحديث مجالات الممارسة والمستندات بأنفسنا؟',
      aAr:
        'نعم. بُنيت بنية المحتوى ليتمكن فريق المكتب من إدارتها بعد التسليم، فإضافة مجال ممارسة أو تحديث قائمة مستندات أو تعديل مسار لا تتطلب مطوّرًا.',
    },
    {
      qEn: 'Do you also produce video for law firms?',
      aEn:
        'Yes. Our film team shoots across Saudi Arabia, including legal and corporate video content — firm introductions, event coverage, and photography — with the crew travelling to the location.',
      qAr: 'هل تنتجون أيضًا محتوى فيديو لمكاتب المحاماة؟',
      aAr:
        'نعم. يصوّر فريقنا الأفلام في أنحاء السعودية، بما في ذلك المحتوى القانوني والمؤسسي — والأفلام التعريفية بالمكتب، وتغطية الفعاليات، والتصوير الفوتوغرافي — ويصل الفريق إلى الموقع.',
    },
    {
      qEn: 'How long does a law firm website take to build?',
      aEn:
        'It depends on how many practice areas need pages, how much published material already exists, and how much of the site needs to connect to systems you already run. We scope that first, and release the pages that can start earning traffic while the rest of the content is completed.',
      qAr: 'كم يستغرق بناء موقع مكتب محاماة؟',
      aAr:
        'يعتمد على عدد مجالات الممارسة التي تحتاج صفحات، وعلى حجم المواد المنشورة الموجودة، وعلى ما يحتاج من الموقع الاتصال بأنظمة تشغّلها بالفعل. نحدد ذلك النطاق أولًا، ونطلق الصفحات القادرة على جلب الزيارات بينما يكتمل بقية المحتوى.',
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
