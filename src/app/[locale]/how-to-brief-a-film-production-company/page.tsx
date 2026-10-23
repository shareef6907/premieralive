import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'how-to-brief-a-film-production-company'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'كيف تكتب ملف مشروع لشركة إنتاج سينمائي | بريمييرا لايف'
      : 'How to Brief a Film Production Company | Premiera Live',
    description: isArabic
      ? 'دليل عملي لإعداد ملف مشروع واضح قبل التواصل مع شركة إنتاج: الأهداف، والجمهور، وقائمة اللقطات، وحقوق الاستخدام، والجدول الزمني، ونقاط الموافقة.'
      : 'A practical guide to writing a clear creative brief before you approach a film production company — objectives, audience, shot list, rights, timeline, and approvals.',
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
        ? 'كيف تكتب ملف مشروع لشركة إنتاج سينمائي | بريمييرا لايف'
        : 'How to Brief a Film Production Company | Premiera Live',
      description: isArabic
        ? 'دليل عملي لإعداد ملف مشروع واضح قبل التواصل مع شركة إنتاج في السعودية.'
        : 'A practical guide to writing a clear creative brief before you approach a production company in Saudi Arabia.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'كيف تكتب ملف مشروع لشركة إنتاج سينمائي | بريمييرا لايف'
        : 'How to Brief a Film Production Company | Premiera Live',
      description: isArabic
        ? 'دليل عملي لإعداد ملف مشروع واضح قبل التواصل مع شركة إنتاج في السعودية.'
        : 'How to prepare a clear creative brief before commissioning a film in Saudi Arabia.',
    },
  }
}

export default async function BriefFilmProductionCompanyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'كيف تكتب ملف مشروع لشركة إنتاج سينمائي'
    : 'How to brief a film production company'

  const h1En = 'How to Brief a Film Production Company'
  const h1Ar = 'كيف تكتب ملف مشروع لشركة إنتاج سينمائي'

  const heroEn =
    'Most production problems are decided before a single frame is shot. They are decided in the brief — the document that tells a production team what the film has to achieve, who it is for, what it must contain, and how you will judge it when it is finished. A weak brief produces the thing everyone feared: a beautiful film that does not do its job. A clear brief lets a production company quote accurately, crew properly, and shoot once instead of three times. This guide is written from the production side, for clients commissioning work in Saudi Arabia — whether a corporate film for an internal audience, a commercial for a launch, an event film that needs to be cut the same week, or a podcast series that has to publish on a schedule. It covers what goes into a brief that works, what to leave out, and which questions to ask before you sign anything.'
  const heroAr =
    'معظم مشكلات الإنتاج تُحسم قبل تصوير الإطار الأول. تُحسم في ملف المشروع — المستند الذي يشرح لفريق الإنتاج ما الذي يجب أن يحققه الفيلم، ولمن، وما الذي يجب أن يحتويه، وكيف ستُقيسه عند الانتهاء. ملف المشروع الضعيف ينتج ما خافه الجميع: فيلم جميل لا يؤدي وظيفته. أما الملف الواضح فيتيح لشركة الإنتاج تسعيرًا دقيقًا وتجهيز فريق تصوير بشكل صحيح والتصوير مرة واحدة بدل ثلاث مرات. كُتب هذا الدليل من جانب الإنتاج، موجّهًا للعملاء الذين يكلّفون أعمالًا في السعودية — سواء فيلم مؤسسي لجمهور داخلي، أو إعلان تجاري لإطلاق، أو فيلم تغطية فعالية يحتاج إلى المونتاج في الأسبوع نفسه، أو سلسلة بودكاست يجب نشرها وفق جدول. يتناول ما الذي يدخل في ملف مشروع فعّال، وما الذي يُترك، وأي الأسئلة تُطرح قبل التوقيع على أي شيء.'

  const whyHeadingEn = 'Why the brief decides the outcome'
  const whyHeadingAr = 'لماذا يحسم ملف المشروع النتيجة'

  const whyEn =
    'A film has a fixed number of production days and a fixed number of decisions. The brief is where those decisions get made. If you cannot say what the film should make the viewer feel, do, or understand, then no amount of craft in the edit can invent that for you — the camera will shoot something competent and generic, because that is all the information it was given. The second reason matters just as much: cost. A production company builds a quote from the brief. A brief that says "a short film about our company" produces a number with a wide error margin. A brief that specifies audience, duration, deliverables, number of locations, on-screen talent, and how the footage will be used produces a number you can actually plan against. The third reason is time. Every unknown in the brief becomes a question that pauses production — waiting for an answer, a location confirmation, or an approval from someone who was never in the original conversation. Write it down once, properly, and those pauses largely disappear.'
  const whyAr =
    'للفيلم عدد ثابت من أيام الإنتاج وعدد ثابت من القرارات. ملف المشروع هو المكان الذي تُتخذ فيه تلك القرارات. إن لم تستطع أن تقول ما الذي يجب أن يشعر به المشاهد أو يفعله أو يفهمه، فلن يختلقه أي إتقان في المونتاج نيابةً عنك — ستلتقط الكاميرا شيئًا كفؤًا ومعمّمًا، لأن ذلك كل ما أُعطي لها من معلومات. والسبب الثاني لا يقل أهمية: التكلفة. تبني شركة الإنتاج عرض السعر من ملف المشروع. والملف الذي يقول "فيلم قصير عن شركتنا" ينتج رقمًا به هامش خطأ واسع. أما الملف الذي يحدد الجمهور والمدة والمخرجات وعدد المواقع والمظهرين على الشاشة وكيفية استخدام اللقطات، فيُنتج رقمًا يمكنك التخطيط على أساسه فعلًا. والسبب الثالث هو الوقت. كل مجهول في الملف يتحول إلى سؤال يوقف الإنتاج — انتظارًا لِردّ أو لتأكيد موقع أو لموافقة من شخص لم يكن في المحادثة الأصلية. دوّنه مرة واحدة بشكل صحيح، وتختفي تلك التوقفات إلى حدٍّ بعيد.'

  const sectionsEn = [
    {
      heading: 'Start with the objective, not the format',
      body:
        'The first line of a brief should state what the film is for, in one sentence, before any mention of length, style, or reference. "To explain how our new inspection process works to new technical staff" is an objective. "A three-minute corporate video" is a format. Objectives survive contact with reality when trends change and formats do not. Write the objective first, then let the production company propose the format that serves it — duration, structure, and tone are their professional judgement, and they will make better choices than you will if the objective is clear.',
    },
    {
      heading: 'Define the audience precisely',
      body:
        '"Our customers" is too broad to direct a shoot. Who exactly is watching? New clients at a trade exhibition? Existing employees who need to understand a process change? Procurement officers evaluating suppliers? Candidates assessing whether the company is worth joining? Each of these audiences needs a different opening, a different amount of technical detail, and a different ending. State the audience, their level of knowledge before watching, and the one thing they should be able to repeat afterwards. This single section prevents the most common failure: a film that tries to speak to everyone and lands with no one.',
    },
    {
      heading: 'Specify the shots, not the adjectives',
      body:
        'Every brief should contain a shot list. It does not have to be a camera-ready document — a clear list of the moments that must appear is enough. An opening that establishes the problem, the process or product in action, the people behind it, and the outcome. Describe each one in plain terms: "a technician running the calibration", "the handover moment between two shifts", "the control room during peak load". Describing the moment rather than the feeling gives the crew something to find, and gives the editor the material the film actually needs. Avoid briefs built entirely from adjectives like "cinematic", "premium", or "dynamic" — those describe a mood to someone who already knows how to create it, and mean nothing to a crew on location.',
    },
    {
      heading: 'Answer the rights and usage question now',
      body:
        'Rights are the part clients most often leave until the end, and the part that causes the most friction later. Where will the film run? Your own channels only, or paid advertising? Will it be shown at an event in another country? How long will it stay online? Will you need raw footage for your own social channels — and if so, edited or unedited? Clear answers on usage rights affect how the shoot is planned, because material intended for a broad campaign needs to be captured with more coverage and more clean audio than a film that only lives on an internal screen. Settling this in the brief keeps it from becoming an argument after delivery.',
    },
    {
      heading: 'Name one decision-maker and one approver',
      body:
        'Productions stall when feedback arrives from everyone. Agree, at briefing stage, who gives creative direction during the shoot, and who signs off the final edit — and make sure those are specific people with the authority to decide. If feedback is collected from a wider group, nominate one of them to filter it into a single voice. Also state how many rounds of revisions are included and what triggers additional ones. Agreeing the approval path in writing is the cheapest scheduling protection available to either side.',
    },
    {
      heading: 'Get location and access questions answered early',
      body:
        'For any shoot that leaves the studio, the location question is usually the biggest source of schedule risk. Who owns the site, and when can it be filmed? Are there visitor restrictions, security procedures, or quiet hours? Is there power, is there parking for the van, is there a room to set up in, and how do the crew get load-in access? Does the location need to be cleared for filming, and does that approval take time? Answering these in advance is the difference between a shoot day that begins on time and one that loses hours to a locked gate. If the filming is in another city, agree travel days as working days from the start rather than treating them as overhead.',
    },
    {
      heading: 'Agree the schedule and the turnaround',
      body:
        'A production schedule should state the shoot dates, the review milestones, and the final delivery date — with the review windows built in rather than assumed. Clients often expect the final film the same day the footage wraps. It is worth being direct about why a cut needs time: selecting from the rushes, choosing takes, building a structure, sound mixing, colour, and then reviewing. Each round of review is also time on the calendar. Agree in advance when you want to give feedback and how long the production company should hold for it, so that a holiday, a week of travel, or a quiet period does not silently become the reason a film misses its date.',
    },
    {
      heading: 'Plan the deliverables, not just the film',
      body:
        'A modern film rarely lives in one place. Decide what else you need from the shoot: vertical cutdowns for social, a silent captioned version, a version without music for trade-show playback, still photographs pulled from the shoot days, and interview transcripts that your marketing team can turn into written content. Producing these at the same time as the main cut costs far less than returning to the footage later, and it changes what gets captured on the day — because the shot list and audio plan were built with those deliverables in mind from the start. List every deliverable in the brief, with its duration and format.',
    },
    {
      heading: 'Write the brief so it can be handed over',
      body:
        'A useful test: assume the person receiving your brief knows nothing about your company. Explain the background in two or three sentences, state the objective, describe the audience, list the shots, settle rights, name the approvals, fix the schedule, and list the deliverables. Then give it to someone on your own team who has never met the production company. If they cannot picture the film and say roughly what length it will be, the brief is not finished. Every production company works this way, and the ones who produce well will thank you for it — a precise brief lets them quote the real job instead of padding the estimate to cover the unknowns.',
    },
  ]

  const sectionsAr = [
    {
      heading: 'ابدأ بالهدف لا بالشكل',
      body:
        'يجب أن يبدأ أول سطر في ملف المشروع ببيان الغرض من الفيلم في جملة واحدة، قبل أي ذكر للطول أو الأسلوب أو الأمثلة المرجعية. "نشرح كيف تعمل عملية الفحص الجديدة لدينا للموظفين الفنيين الجدد" هدف. "فيديو مؤسسي مدته ثلاث دقائق" شكل. الأهداف تصمد أمام تغيّر المذاهب، أما الأشكال فلا تصمد. اكتب الهدف أولًا، ثم دع شركة الإنتاج تختار الشكل الذي يخدمه — الطول والبنية والنبرة هي حكمهم المهني، وستكون قراراتهم أفضل من قراراتك إذا كان الهدف واضحًا.',
    },
    {
      heading: 'حدّد الجمهور بدقة',
      body:
        '"عملاؤنا" واسع أكثر من اللازم لتوجيه التصوير. من يشاهد تحديدًا؟ عملاء جدد في معرض تجاري؟ موظفون حاليون يحتاجون لفهم تغيير في العملية؟ مسؤولو المشتريات الذين يقيّمون الموردون؟ مرشحون يقيّمون جدوى الانضمام إلى الشركة؟ كل فئة من هذه الجمهور تحتاج مقدمة مختلفة ودرجة مختلفة من التفاصيل التقنية ونهاية مختلفة. حدّد الجمهور، ومستوى معرفتهم قبل المشاهدة، والشيء الواحد الذي يجب أن يكونوا قادرين على تكراره بعد المشاهدة. هذا القسم وحده يمنع أخطر 실패 شائع: فيلم يحاول مخاطبة الجميع فلا يصل إلى أحد.',
    },
    {
      heading: 'حدّد اللقطات لا الصفات',
      body:
        'يجب أن يحتوي كل ملف مشروع على قائمة لقطات. لا يلزم أن تكون مستندًا جاهزًا للتصوير — تكفي قائمة واضحة للحظات التي يجب أن تظهر. مقدمة تعرّف بالمشكلة، ثم المنتج أو الخدمة قيد التنفيذ، ثم الأشخاص خلفها، ثم النتيجة. صِف كل واحدة بلغة واضحة: "فني يُجري المعايرة"، "لحظة تسليم المناوبة بين ورديتين"، "غرفة التحكم في وقت الذروة". وصف اللحظة لا الإحساس يمنح الفريق شيئًا يبحث عنه، ويمنح المونتج المادة التي يحتاجها الفيلم فعلًا. وتجنّب ملفات المشروع المبنية كليًا على صفات مثل "سينمائي" أو "راقٍ" أو "ديناميكي" — فهي تصف مزاجًا لمن يعرف اصطلاحه أصلًا، ولا تعني شيئًا لفريق في موقع التصوير.',
    },
    {
      heading: 'أجيب عن سؤال الحقوق والاستخدام الآن',
      body:
        'الحقوق هي الجزء الذي يؤجله العملاء أكثر من غيره، وهو الجزء الذي يولّد أكبر احتكاك لاحقًا. أين سيُعرض الفيلم؟ على قنواتك فقط أم في إعلانات مدفوعة؟ هل سيُعرض في فعالية في بلد آخر؟ كم مدة بقائه منشورًا؟ هل تحتاجون اللقطات الخام لقنواتكم الاجتماعية، وإذا نعم، مُحرَّرة أم غير مُحرَّرة؟ الإجابات الواضحة عن حقوق الاستخدام تؤثر في التخطيط للتصوير، لأن المادة المخصصة لحملة واسعة تحتاج تغطية أكبر وصوتًا أنظف من فيلم يقتصر على شاشة داخلية. حسم هذا في ملف المشروع يمنع أن يتحول إلى خلاف بعد التسليم.',
    },
    {
      heading: 'سمِّ صاحب القرار والمُعتمد',
      body:
        'تتوقف الإنتاجات عندما يأتي ملاحظات من الجميع. اتفقوا في مرحلة صياغة الملف على من يوجّه إبداعيًا أثناء التصوير، ومن يعتمد المونتج النهائي — على أن يكونا أشخاصًا محدذين ذوي الصلاحية. إذا جُمعت الملاحظات من مجموعة أوسع، عيّن أحدهم ليُصفّيها إلى صوت واحد. واذكر أيضًا عدد جلات التعديل المشمولة وما الذي يُعدّ تعديلًا إضافيًا. الاتفاق على مسار الاعتماد كتابةً أرخص وسيلة جدولة متاحة لأي من الطرفين.',
    },
    {
      heading: 'أجيب عن أسئلة الموقع والتصالح مبكرًا',
      body:
        'في أي تصوير يخرج من الاستوديو، يكون الموقع أكبر مصدر لمخاطر الجدول. من يملك الموقع، ومتى يمكن تصويره؟ هل هناك قيود للزوار أو إجراءات أمنية أو ساعات هدوء؟ هل توجد كهرباء، وهل هناك موقف لشاحنة الفريق، وغرفة للتجهيز، وكيف يدخل المعدات؟ هل يحتاج الموقع إلى تصريح للتصوير، وكم يستغرق هذا التصريح؟ الإجابة عن هذه الأسئلة مسبقًا هي الفرق بين يوم تصوير يبدأ في وقته وآخر يفقد ساعات خلف بوابة مقفلة. وإذا كان التصوير في مدينة أخرى، اتفق على أن أيام السفر أيام عمل من البداية بدل اعتبارها أيامًا إضافية.',
    },
    {
      heading: 'اتفق على الجدول الزمني ومدة التسليم',
      body:
        'ينبغي أن يحدد جدول الإنتاج أيام التصوير ومحطات المراجعة وتاريخ التسليم النهائي — مع إدراج نوافذ المراجعة بدل افتراضها. غالبًا ما يتوقع العميل الفيلم النهائي في يوم انتهاء التصوير نفسه. من الأنبل أن تشرح بوضوح سبب احتياج المونتج إلى وقت: الاختيار من اللقطات، وتوثيق أفضل اللقطات، وبناء البنية، وخلط الصوت، والتدرّج اللوني، ثم المراجعة. وكل جلة مراجعة وقت إضافي في التقويم. اتفق مسبقًا على متى تريد تقديم ملاحظاتك وكم مدة الانتظار التي تطلبها من شركة الإنتاج، حتى لا تتحول عطلة أو أسبوع سفر أو فترة هدوء بهدوء إلى سبب فوات موعد الفيلم.',
    },
    {
      heading: 'خطّط المخرجات لا الفيلم فقط',
      body:
        'نادرًا ما يعيش الفيلم الحديث في مكان واحد. حدّد ما تحتاجه أيضًا من يوم التصوير: نسخ عمودية لمنصات التواصل، ونسخة صامتة مع ترجمة، ونسخة بلا موسيقى للتشغيل في المعارض، وصور فوتوغرافية مستخرجة من أيام التصوير، ونصوص المقابلات التي يمكن لفريق التسويق تحويلها إلى محتوى مكتوب. إنتاجها في وقت واحد مع المونتج الرئيسي يكلّف أقل بكثير من العودة إلى اللقطات لاحقًا، وهو يغيّر ما يُلتقط في يوم التصوير — لأن قائمة اللقطات وخطة الصوت بُنيتا مع هذه المخرجات في الحسبان منذ البداية. اذكر كل مخرج في ملف المشروع مع مدته وصيغته.',
    },
    {
      heading: 'اكتب ملف المشروع بحيث يمكن تسليمه',
      body:
        'اختبار مفيد: افترض أن من يستلم ملفك لا يعرف شيئًا عن شركتك. اشرح الخلفية في جملتين أو ثلاث، واذكر الهدف، وصف الجمهور، وسرد اللقطات، وحسم الحقوق، وسمِّ المعتمدين، وثبّت الجدول، ثم اعرض المخرجات. ثم أعطِه لشخص في فريقك لم يقابل شركة الإنتاج من قبل. إن لم يستطع تصور الفيلم ولا تقدير طوله تقريبًا، فملف المشروع غير مكتمل. كل شركة إنتاج تعمل بهذه الطريقة، والشركات التي تُنتج جيدًا ستشكرك على ذلك — فملف دقيق يتيح لها تسعير المهمة الحقيقية بدل تبطين العرض لتغطية المجهولات.',
    },
  ]

  const faqData = [
    {
      qEn: 'How long should a creative brief be?',
      aEn: 'Two pages is usually enough for a corporate or commercial film, longer if the project has many locations or deliverables. Length is not the measure — completeness is. If every decision the production team would otherwise have to ask about is answered, the brief is long enough.',
      qAr: 'كم ينبغي أن يكون طول ملف المشروع؟',
      aAr: 'صفحتان تكفيان عادةً لفيلم مؤسسي أو تجاري، وأطول إذا كان المشروع متعدد المواقع أو المخرجات. الطول ليس المقياس — الاكتمال هو المقياس. إن أجبتَ عن كل قرار كان فريق التصوير سيحتاج لسؤالك عنه، فملف المشروع طويل بما يكفي.',
    },
    {
      qEn: 'What if I do not know what shots I want?',
      aEn: 'That is normal, and it is part of what the production company is for. Describe the objective, the audience, and the moments that matter to your business — a customer moment, a process, a place, a person — and let the crew propose the shot list from your description. A brief does not need to be written in camera language; it needs to be clear about what the film has to achieve.',
      qAr: 'ماذا لو لم أكن أعرف أي اللقطات أريد؟',
      aAr: 'هذا طبيعي، وهو جزء مما تتقنه شركة الإنتاج. صف الهدف والجمهور واللحظات المهمة لعملك — لحظة عميل، أو عملية، أو مكان، أو شخص — ودع الفريق يقترح قائمة اللقطات من وصفك. لا يحتاج ملف المشروع إلى أن يُكتب بلغة الكاميرا؛ يحتاج إلى أن يكون واضحًا فيما يجب أن يحققه الفيلم.',
    },
    {
      qEn: 'How many rounds of revisions should a brief include?',
      aEn: 'Decide this in advance and put it in writing — how many rounds are included, what counts as a revision, and what triggers an additional one. A revision is typically a change of direction; a correction of an error is not. Defining the terms while both sides are still agreeable prevents the disagreement from happening after the edit is delivered.',
      qAr: 'كم جلة تعديل ينبغي أن يتضمنها ملف المشروع؟',
      aAr: 'احسم هذا مسبقًا واكتبه — عدد الجلات المشمولة، وما الذي يُعدّ تعديلًا، وما الذي يستدعي جلة إضافية. التعديل غالبًا هو تغيير في الاتجاه، أما تصحيح الخطأ فلا يُعدّ تعديلًا. تعريف المصطلحات بينما يكون الطرفان متفقين يمنع الخلاف بعد تسليم المونتج.',
    },
    {
      qEn: 'Should I supply the locations and crew access?',
      aEn: 'Tell the production company what you know about the location — ownership, permissions, visitor rules, power, parking, and load-in. Many production companies handle permits and access arrangements as part of the job, but only if the brief tells them the location is fixed. If the site is not yet secured, say so explicitly, because it changes the schedule.',
      qAr: 'هل يفترض عليّ أن أوفّر',
      aAr: 'أخبر شركة الإنتاج بما تعرفه عن الموقع — الملكية والتصاريح وقواعد الزوار والكهرباء والمواقف ومدخل المعدات. كثير من شركات الإنتاج تتولى التصاريح وترتيبات الوصول ضمن عملها، لكن ذلك فقط إذا أخبرتهم في الملف بأن الموقع محدد. وإذا لم يُحسم الموقع بعد، فاذكر ذلك صراحة، لأنه يغيّر الجدول الزمني.',
    },
    {
      qEn: 'How early should we book before a campaign or event date?',
      aEn: 'Earlier than most clients expect. The constraint is rarely the shooting day itself — it is the preparation behind it: confirming the brief, aligning on the shot list, clearing the location, and scheduling the people who approve. Those steps sit in front of the shoot, not behind it, so a fixed campaign date should work backwards from it and allow the preparation to happen first.',
      qAr: 'متى ينبغي أن نحجز قبل تاريخ حملة أو فعالية؟',
      aAr: 'في وقت أبكر مما يتوقع معظم العملاء. القيد نادرًا ما يكون يوم التصوير نفسه — بل هو التحضير قبله: تثبيت ملف المشروع، والاتفاق على قائمة اللقطات، وتصفية الموقع، وجدولة من يوافق. هذه الخطوات تسبق التصوير لا تليه، لذا ينبغي أن ينطلق التاريخ الثابت للحملة من الوراء ويترك وقتًا للتحضير أولًا.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic
    ? 'لديك مشروع قيد التصوير؟'
    : 'Have a production coming up?'
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkPillar = isArabic
    ? 'شركة إنتاج سينمائي في السعودية'
    : 'film production company in Saudi Arabia'
  const linkCommercial = isArabic ? 'إنتاج الأفلام التجارية' : 'commercial film production'
  const linkCorporate = isArabic ? 'إنتاج الفيديو المؤسسي' : 'corporate video production'
  const linkEvent = isArabic ? 'تغطية الفعاليات' : 'event coverage'
  const linkPodcast = isArabic ? 'إنتاج البودكاست' : 'podcast production'

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
          {isArabic ? 'الإنتاج السينمائي' : 'Film production'}
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

      {/* Why the brief decides the outcome */}
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

      {/* Guide sections */}
      <Section>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '2.5rem',
          maxWidth: '720px', margin: '0 auto',
        }}>
          {(isArabic ? sectionsAr : sectionsEn).map((s, i) => (
            <div key={i} style={{
              padding: '1.75rem',
              background: 'var(--color-card)',
              border: '1px solid var(--color-card-border)',
              borderRadius: 'var(--radius)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--color-text)',
                lineHeight: 1.2,
                marginBottom: '1rem',
                letterSpacing: '0.01em',
              }}>
                {s.heading}
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 'var(--body-sm)',
                color: 'var(--color-text-dim)', lineHeight: 1.75,
              }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '720px', margin: '0 auto' }}>
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
          maxWidth: '720px', margin: '0 auto',
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
            href={`/${locale}/services/corporate-video-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkCorporate}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/event-coverage-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkEvent}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/podcast-production-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPodcast}
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