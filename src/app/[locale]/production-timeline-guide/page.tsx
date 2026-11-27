import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'production-timeline-guide'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  const title = isArabic
    ? 'ما الذي يؤثّر في مدة إنتاج الفيلم؟'
    : 'What Affects Production Timelines'
  const description = isArabic
    ? 'دليل عملي يشرح ما الذي يطيل جدول إنتاج الفيلم في السعودية: الموافقات، الموقع، الطقس، السفر، التصوير، والمونتاج.'
    : 'A practical guide to what actually lengthens a production schedule in Saudi Arabia: approvals, location, weather, travel, shoot days, and post.'

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

export default async function ProductionTimelinePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'ما الذي يؤثّر في مدة إنتاج الفيلم' : 'what affects production timelines'

  const h1En = 'What Affects Production Timelines'
  const h1Ar = 'ما الذي يؤثّر في مدة إنتاج الفيلم'

  const heroEn =
    'A production schedule is usually agreed as a single number — two weeks, three weeks, a month — and the number is treated as a promise. In practice that number is an output, not an input. It falls out of decisions that have to be made before anyone picks up a camera: who approves the script, when the location is confirmed, whether the people you want on camera are available on the day, whether the weather permits the shot you planned, and how far the crew has to travel. This guide is written for the person who has to answer the question "when will it be ready?" — a marketing lead, a communications manager, a founder, or an internal producer — rather than the external producer running the shoot. It explains the stages where time is usually lost, the ones where it is usually saved, and the small number of decisions that move a delivery date more than anything else. It is written for Saudi Arabia, where a shoot may be in Al Khobar, Riyadh, Jeddah, or a site outside the main cities, and where the working week, the climate, and the approval chain inside an organisation all shape the calendar in ways that a generic production guide does not cover. We produce films, corporate videos, event coverage, podcasts, and photography across Saudi Arabia from our base in Al Khobar, and we travel to sites across the Kingdom, so the patterns described here are the ones we actually plan around.'
  const heroAr =
    'يُتفق على جدول الإنتاج عادةً كرقم واحد — أسبوعان، أو ثلاثة، أو شهر — ويُعامَل هذا الرقم كوعد. والواقع أن هذا الرقم ناتج لا مُدخَل. فهو ينتج عن قرارات يجب اتخاذها قبل أن يحمل أحد كاميرا: من يعتمد السيناريو، ومتى يُؤكَّد الموقع، وهل يتوفر من تريد ظهورهم في يوم التصوير، وهل يسمح الطقس باللقطة التي خططت لها، وكم يبعد فريق التصوير. كُتب هذا الدليل لمن عليه الإجابة عن سؤال «متى يكون جاهزًا؟» — مسؤول تسويق أو مدير اتصالات أو مؤسس أو منتج داخلي — لا لمنتج التصوير الخارجي. يشرح المراحل التي تُهدر فيها الوقت عادة، وتلك التي يُختصر فيها، والقرارات القليلة التي تحرّك موعد التسليم أكثر من غيرها. كُتب لكل السعودية، حيث قد يكون التصوير في الخبر أو الرياض أو جدة أو موقع خارج المدن الرئيسية، وحيث يصنع أسبوع العمل والمناخ وسلسلة الموافقات الداخلية في الجهة شكل التقويم، على نحو لا تغطيه أدلة الإنتاج العامة. ننتج الأفلام وأفلام الشركات وتغطية الفعاليات والبودكاست والتصوير في أنحاء السعودية انطلاقًا من مقرنا في الخبر، ونتنقل إلى المواقع فيأنحاء المملكة، فالأنماط الموضحة هنا هي التي نخطط حولها فعليًا.'

  const modelHeadingEn = 'Why a schedule is an output and not an input'
  const modelHeadingAr = 'لماذا الجدول ناتج لا مُدخَل'

  const modelEn =
    'Most schedule disputes are not caused by a crew working slowly. They are caused by a decision that was assumed rather than made. Someone assumes a location is available, someone assumes a spokesperson can be in the room, someone assumes the script is signed off because the creative team liked it. Each assumption is reasonable and each one is invisible until the day it fails, at which point it is expensive. A producer who plans well does not work faster. They make the dependent items visible early, so that a problem appears while there is still a week to solve it rather than the night before. This is the practical meaning of a realistic timeline: it is not a pessimistic one, it is an honest one. It assumes the things that usually happen — approvals take a round or two, a location needs a walkthrough, a shoot day loses time to setup and reset, and post-production has a review step in it. The alternative is a schedule built on the best case, which makes everyone look efficient for about a week and then breaks. When we quote a timeline to a Saudi client, we separate the stages rather than presenting one figure, because the stages are controlled by different people. Pre-production is mostly controlled by the client, because the approvals, the access, and the decisions sit with the people who own the organisation. The shoot day is controlled by the crew, and it is usually the most predictable part of the whole schedule. Post-production is controlled by both, because the client controls the review rounds and the crew controls the work. When a date slips, knowing which stage it slipped in tells you what to fix. A date slipping in pre-production is usually an internal decision-making problem. A date slipping after the shoot is usually a review-round problem. Treating them the same is why timelines get worse instead of getting corrected.'
  const modelAr =
    'معظم الخلافات حول الجدول لا سببها بطء الطاقم، بل قرارٌ افُترض بدل أن يُتخذ. فشخص يفترض أن الموقع متاح، وآخر يفترض أن المتحدث سيكون في الغرفة، وثالث يفترض أن السيناريو معتمد لأن الفريق الإبداعي أعجبه. كل افتراض منطقي، وكل واحد خفي حتى اليوم الذي يفشل فيه، وحينها يصبح باهظًا. والمنتج الذي يخطط جيدًا لا يعمل أسرع، بل يجعل العناصر المترابطة ظاهرة مبكرًا، فتظهر المشكلة بينما ما زال أمامك أسبوع لحلها لا في ليلة قبل التصوير. وهذا هو المعنى العملي للجدول الواقعي: ليس متشائمًا، بل صادق. إذ يفترض الأشياء التي تحدث عادة — تحتاج الموافقات جولة أو جولتين، ويحتاج الموقع جولة استطلاع، ويخسر يوم التصوير وقتًا في التركيب وإعادة الضبط، ويشمل ما بعد الإنتاج جولة مراجعة. والبديل هو جدول مبني على أفضل الأحوال، فيبدو الجميع كفؤاء في العمل لمدة أسبوع ثم ينهار. وحогда نقدّم جدولًا زمنيًا لعميل سعودي، نفصل المراحل بدل تقديم رقم واحد، لأن المراحل يسيطر عليها أشخاص مختلفون. فمرحلة ما قبل الإنتاج يسيطر عليها العميل في معظمها، إذ выборات الموافقات والدخول والقرارات تعود إلى الذين يملكون الجهة. ويوم التصوير يسيطر عليه الطاقم، وهو غالبًا أكثر أجزاء الجدول قابلية للتنبؤ. أما ما بعد الإنتاج فيسيطر عليه الطرفان معًا، إذ يسيطر العميل على جولات المراجعة والطاقم على العمل. وحين يتأخر موعد، فمعرفة المرحلة التي تأخر فيها تبيّن لك ما يجب إصلاحه. فالتأخير في ما قبل الإنتاج غالبًا مشكلة في اتخاذ القرار الداخلي، والتأخير بعد التصوير غالبًا مشكلة في جولات المراجعة. ومعاملة الأمرين على نحو واحد هو سبب تدهور الجداول بدل تصحيحها.'

  const stagesHeadingEn = 'Where the time actually goes'
  const stagesHeadingAr = 'أين يذهب الوقت فعلًا'

  const stagesEn = [
    {
      title: 'The approval round',
      body: 'This is the single largest variable in almost every schedule, and it is entirely on the client side. A script or a shot list typically needs one round of comments from the people who own the message, the legal side, and the approval itself, and each round takes time proportional to how busy those people are rather than to the size of the document. The way to protect the schedule is not to ask for a faster review. It is to ask for a smaller number of reviewers, a single named decision-maker, and a written list of what "approved" means. In practice, three people who each comment separately take longer than one person who collects all the comments and returns one set. We build the approval structure into the plan rather than discovering it on the day.',
    },
    {
      title: 'Location confirmation and access',
      body: 'A location is not secured when a venue replies "yes, that date works". It is secured when the producer has walked it, confirmed the power, confirmed the access route, confirmed that the rooms can be used for the hours the shoot needs, and confirmed who will open the building. Until then it is a possibility on a calendar. This stage overlaps with the shoot day itself, which is why it is worth doing earlier than it feels necessary — the walkthrough does not have to wait until the script is finished, because the physical constraints of a space rarely change with the copy.',
    },
    {
      title: 'The shoot day itself',
      body: 'A day that is planned for eight hours of shooting will usually deliver less. Setup, lighting, sound checks, resets between setups, breaks, and the natural rhythm of people warming up on camera all consume time, and the amount consumed depends on how many locations are in the day and how different they are from each other. One location with several setups in it is efficient. Four locations across a city is a different production, and treating them as one long day is how schedules break. The plan that protects the day is a shot list with a priority order, so that if the schedule slips, the crew shoots the material that matters most and treats the rest as a bonus rather than as a casualty.',
    },
    {
      title: 'Weather and light',
      body: 'This is the factor most likely to be underestimated by clients who are used to working in a temperate climate. In much of Saudi Arabia, outdoor work is constrained by heat for much of the year, which pushes exterior shooting towards the early morning and late afternoon, and it means the usable daylight window is narrower than it appears on a calendar. Dust and haze can affect the look of an image and affect the choice of a day far more than the forecast suggests. The practical response is not to plan a day around a forecast, which is not a reliable instrument at this scale, but to design the day so that the essential material can be shot indoors and the exterior work is the flexible part. Then a bad weather day costs time rather than the project.',
    },
    {
      title: 'Travel and logistics',
      body: 'A crew that works out of Al Khobar and travels to Riyadh, Jeddah, or another city is not just adding driving time. It is adding a travel day, an accommodation decision, a setup day that starts earlier because the crew has to be on site before anyone, and a day that cannot easily be shortened because the crew cannot leave before the schedule allows. If the shoot is a single day in a city far from the base, the setup is usually the previous day, which makes it a two-day commitment for one day of material. That is not a problem to be solved; it is a fact to be planned for, and it changes the delivery date. It is also the reason crews that travel build the travel days into the plan rather than treating them as padding to be squeezed out on the day.',
    },
    {
      title: 'Post-production and review',
      body: 'Post-production is where a schedule most often comes apart, and the reason is usually the same: too many review rounds, spread too far apart. Every round needs time to gather the reviewers, and every round risks introducing changes that send the edit back. The number of rounds is a decision, not a natural consequence of the work, and it should be agreed in advance — how many rounds, who reviews, and what happens when two reviewers disagree. One consolidated set of notes per round, delivered together, is worth more than three separate emails. A cut, a revision, and a final polish is a workable shape for most projects and it protects the date far better than an open-ended revision period.',
    },
  ]

  const stagesAr = [
    {
      title: 'جولة الموافقات',
      body: 'هذا أكبر متغيّر منفرد في كل جدول تقريبًا، وهو كامل في جانب العميل. فغالبًا ما يحتاج السيناريو أو قائمة اللقطات إلى جولة ملاحظات من أصحاب الرسالة ومن الجانب القانوني ومن الاعتماد نفسه، وتستغرق كل جولة وقتًا يتناسب مع انشغال هؤلاء الأشخاص لا مع حجم المستند. فطريقة حماية الجدول ليست أن تطلب مراجعة أسرع، بل أن تطلب عددًا أقل من المراجعين، وجهة اعتماد واحدة محددة، وقائمة مكتوبة لما تعنيه «معتمد». ومن حيث الممارسة، يستغرق الوقت من ثلاثة أشخاص يراجعون على حدة أطول مما يستغرقه شخص واحد يجمع الملاحظات ويعيد مجموعة واحدة. نبني هيكل الموافقات داخل الخطة بدل اكتشافه في اليوم.',
    },
    {
      title: 'تأكيد الموقع والدخول',
      body: 'لا يكون الموقع محسومًا حين يجيب началь «نعم، ذلك التاريخ يناسبنا»، بل يكون محسومًا حين يمشي فيه المنتج ويتأكد من الكهرباء ومسار الدخول، ومن أن الغرف يمكن استخدامها بالساعات التي يحتاجها التصوير، ومن سيُفتح المبنى. وقبل ذلك يبقى الموقع احتمالًا على تقويم. وهذه المرحلة تتداخل مع يوم التصوير نفسه، ولذلك يستحق فعلها أبكر مما يبدو ضروريًا — فالجولة لا تحتاج انتظار انتهاء السيناريو، لأن القيود الجسدية للمكان نادرًا ما تتغير بتغير النص.',
    },
    {
      title: 'يوم التصوير نفسه',
      body: 'اليوم المخطط له بثماني ساعات تصوير يعطي عادةً أقل من ذلك. فالتركيب، والإضاءة، وفحوص الصوت، وإعادة الضبط بين كل إعداد، والاستراحات، والإيقاع الطبيعي للأشخاص أمام الكاميرا، كلها تستهلك وقتًا، وحجم ما يُستهلك يعتمد على عدد المواقع في اليوم وعلى اختلافها عن بعضها. فالموقع الواحد بعدة إعدادات داخله إنتاج كفء. وأربعة مواقع داخل مدينة إنتاج آخر، ومعاملة الأربعة كأنها يوم طويل واحد هي سبب انهيار الجداول. والخطة التي تحمي اليوم هي قائمة لقطات مرتبة بالأولوية، بحيث إن تأخر الجدول صوّر الطاقم المادة المهمة أولًا، واعتبر الباقي إضافة لا ضحية.',
    },
    {
      title: 'الطقس والضوء',
      body: 'هذا العامل الأكثر احتمالًا لأن يقدّره العملاء أقل مما ينبغي، وهم معتادون على العمل في مناخ معتدل. ففي معظم أنحاء السعودية تكون الأعمال الخارجية مقيّدة بالحرارة في جزء كبير من العام، ما يدفع التصوير الخارجي إلى وقت مبكر من الصباح ووقت متأخر من بعد الظهيرة، ويجعل نافذة الضوء القابل للاستخدام أضيق مما يبدو على التقويم. كما أن الغبار والضباب يؤثران في مظهر الصورة وفي اختيار اليوم أكثر مما توحي به التوقعات. والرد العملي ليس التخطيط ليوم على أساس توقعات الطقس، لأنها ليست أداة موثوقة بهذا الحجم، بل تصميم اليوم بحيث يمكن تصوير المادة الأساسية في الداخل وتكون الأعمال الخارجية هي الجزء المرن. عندئذ يكلّف اليوم السيئ وقتًا لا المشروع.',
    },
    {
      title: 'السفر والخدمات اللوجستية',
      body: 'الطاقم الذي يعمل من الخبر ويسافر إلى الرياض أو جدة أو مدينة أخرى لا يضيف وقت قيادة فحسب، بل يضيف يوم سفر، وقرارًا بشأن الإقامة، ويوم تجهيز يبدأ أبكر لأن على الطاقم الحضور قبل الجميع، ويومًا لا يمكن تقصيره بسهولة لأن الطاقم لا يستطيع المغادرة قبل يسمح الجدول. فإذا كان التصوير يومًا واحدًا في مدينة بعيدة عن القاعدة، فالتجهيز يكون عادة اليوم السابق، أي التزامًا بيومين مقابل يوم واحد من المادة. وهذه ليست مشكلة تُحل، بل واقعٌ يُخطط له، وهو ما يغيّر موعد التسليم. وهو أيضًا سبب أن الطواقم التي تسافر تبني أيام السفر داخل الخطة بدل معاملتها كحشو يُختصر في اليوم نفسه.',
    },
    {
      title: 'ما بعد الإنتاج والمراجعة',
      body: 'ما بعد الإنتاج هو المكان الذي يتفكك فيه الجدول غالبًا، والسبب عادةً واحد: جولات مراجعة أكثر من اللازم، متباعدة زمنيًا. فكل جولة تحتاج وقتًا لجمع المراجعين، وكل جولة قد تُدخل تغييرات تعيد المونتاج إلى الوراء. وعدد الجولات قرار لا نتيجة طبيعية للعمل، وينبغي الاتفاق عليه مسبقًا — كم جولة، ومن يراجع، وماذا يحدث عند اختلاف مراجعين. ومجموعة ملاحظات موحّدة في كل جولة، تصل معًا، أنفع من ثلاث رسائل بريد منفصلة. والقص الناقص ثم التنقيح ثم اللمسة النهائية شكل صالح لأغلب المشاريع، وهو يحمي الموعد أفضل بكثير من فترة مراجعة مفتوحة.',
    },
  ]

  const controlHeadingEn = 'The decisions that actually move the date'
  const controlHeadingAr = 'القرارات التي تحرّك الموعد فعليًا'

  const controlEn =
    'A client who wants a predictable date can do a small number of things, and none of them require any special relationship with the production company. The first is to name a single decision-maker. Comments that arrive from several people at once are faster than comments that arrive separately, and a project with three approvers who each respond individually takes longer than one with one approver who responds on behalf of the team. The second is to decide the approval structure before the work starts: how many rounds, who reviews, and how disagreements are resolved. The third is to confirm the location early, and to accept a walkthrough before the script is finished, because physical constraints are the ones that cannot be negotiated later. The fourth is to tell the producer early what the film has to achieve, so the crew can build a shot list around the priority rather than shooting everything and cutting later. The fifth is to agree the review rounds in the schedule rather than in the edit, so that the post-production stage has a shape rather than an open end. And the sixth is to distinguish between what is fixed and what is flexible. A date for a trade show, a launch, or a regulatory deadline is a hard constraint, and a project built around it should be planned with fewer elements. A date that exists because a report was due at the end of the quarter is a soft constraint, and can absorb a week without anything breaking. Most schedule problems come from treating the two the same way. Our producers plan around these realities when we produce films and corporate video across Saudi Arabia from our base in Al Khobar, and they will tell you plainly which parts of your timeline are genuinely fixed and which ones are not.'
  const controlAr =
    'ويمكن للعميل الذي يريد موعدًا متوقعًا أن يفعل عددًا قليلًا من الأمور، ولا يتطلب أي منها علاقة خاصة بشركة الإنتاج. والأول هو تحديد جهة اعتماد واحدة. فالتعليقات التي تصل من عدة أشخاص في وقت واحد أسرع من التي تصل منفصلة، والمشروع الذي له ثلاثة معتمدين يردّ كل واحد منهم على حدة يستغرق وقتًا أطول من مشروع واحد له معتمد واحد يرد نيابة عن الفريق. والثاني هو حسم هيكل الموافقات قبل بدء العمل: كم جولة، ومن يراجع، وكيف تُحسم الخلافات. والثالث هو تأكيد الموقع مبكرًا، وقبول جولة استطلاع قبل انتهاء السيناريو، لأن القيود الجسدية هي القيود التي لا يمكن التفاوض عليها لاحقًا. والرابع هو إخبار المنتج مبكرًا بما يجب أن يحققه الفيلم، حتى يبني الطاقم قائمة لقطات حول الأولوية بدل تصوير كل شيء والقص لاحقًا. والخامس هو الاتفاق على جولات المراجعة ضمن الجدول بدل تركها للمونتاج، فتأخذ مرحلة ما بعد الإنتاج شكلًا بدل أن تبقى مفتوحة. والسادس هو التمييز بين الثابت والمرن. فموعد معرض تجاري أو إطلاق أو موعد تنظيمي قيد ثابت، والمشروع المبني حوله ينبغي التخطيط له بعناصر أقل. والموعد الذي وُجد لأن تقريرًا كان مستحقًا في نهاية الربع قيد مرن، ويتحمل أسبوعًا دون أن ينكسر شيء. ومعظم مشكلات الجدول تنشأ من معاملة الاثنين على نحو واحد. ومنتجاتونا يخططون حول هذه الوقائع حين ننتج الأفلام وأفلام الشركات في أنحاء السعودية انطلاقًا من مقرنا في الخبر، وسنقول لك بوضوح أي أجزاء من جدولك الزمني ثابت فعلًا وأيها ليس كذلك.'

  const faqData = [
    {
      qEn: 'How long does a film production take in Saudi Arabia?',
      aEn: 'It depends on how much of the work is decided before the shoot and how many approval rounds the project carries. A single-location film with one approver can move quickly once the shoot is behind it, while a multi-city or multi-stakeholder project takes longer for reasons that have little to do with the filming itself. The useful question at the start is how many separate decisions the project needs, because that is what the schedule is really made of.',
      qAr: 'كم يستغرق إنتاج فيلم في السعودية؟',
      aAr: 'يعتمد على مقدار ما يُحسم قبل التصوير وعلى عدد جولات الموافقات التي يحملها المشروع. فيمكن أن يتحرك فيلم في موقع واحد بجهة اعتماد واحدة بسرعة بعد انتهاء التصوير، بينما يستغرق مشروع متعدد المدن أو متعدد الأطراف وقتًا أطول لأسباب لا علاقة لها بالتصوير نفسه. والسؤال المفيد في البداية هو كم قرارًا منفصلًا يحتاجه المشروع، لأن الجدول مبني عليها في الحقيقة.',
    },
    {
      qEn: 'What is the most common cause of a delayed delivery?',
      aEn: 'Approvals, and the number of them. Most delays are not technical: they come from a script or a cut waiting on someone, or from several reviewers sending separate comments instead of one consolidated set. It is also why the approval structure is agreed at the start rather than discovered when the first cut arrives.',
      qAr: 'ما السبب الأكثر شيوعًا لتأخر التسليم؟',
      aAr: 'الموافقات وعددها. فمعظم التأخيرات ليست تقنية: تعود إلى سيناريو أو مونتاج ينتظر شخصًا، أو إلى عدة مراجعين يرسلون ملاحظات منفصلة بدل مجموعة موحّدة. ولذلك أيضًا يُتفق على هيكل الموافقات في البداية لا عند وصول أول مونتاج.',
    },
    {
      qEn: 'Does shooting outside the main Saudi cities take longer?',
      aEn: 'It usually does, and the reason is logistics rather than the filming. A crew travelling to a site away from its base needs an earlier setup, a travel commitment, and a day that cannot easily be cut short, so a one-day shoot often occupies a two-day block. We plan the travel into the schedule rather than treating it as padding, because the alternative is discovering it on the day and losing the margin that was supposed to absorb something else.',
      qAr: 'هل يستغرق التصوير خارج المدن السعودية الرئيسية وقتًا أطول؟',
      aAr: 'عادة نعم، والسبب الخدمات اللوجستية لا التصوير نفسه. فالطاقم المسافر إلى موقع بعيد عن قاعدته يحتاج تجهيزًا أبكر والتزامًا بالسفر ويومًا لا يمكن تقصيره بسهولة، فيشغل تصوير يوم واحد كتلة يومين في كثير من الأحيان. نخطط السفر داخل الجدول بدل معاملته كحشو، لأن البديل هو اكتشافه في اليوم وفقدان الهامش الذي كان مفترضًا أن يمتص مشكلة أخرى.',
    },
    {
      qEn: 'How many times will I need to review the film?',
      aEn: 'That is a decision to make before the edit, not after it. Most projects work within a small number of rounds — a first cut, a revision, and a final polish — and agreeing that shape in advance protects the date better than an open-ended revision period. The other half of the answer is how the review happens: one consolidated set of notes per round, delivered together, is worth far more than separate comments arriving piecemeal.',
      qAr: 'كم مرة سأراجع الفيلم؟',
      aAr: 'هذا قرار يُتخذ قبل المونتاج لا بعده. فمعظم المشاريع تعمل ضمن عدد صغير من الجولات — نسخة أولى، ثم تنقيح، ثم لمسة نهائية — والاتفاق على هذا الشكل مسبقًا يحمي الموعد أفضل من فترة مراجعة مفتوحة. والنصف الآخر من الإجابة هو كيفية إجراء المراجعة: مجموعة ملاحظات موحّدة في كل جولة تصل معًا أنفع بكثير من تعليقات منفصلة تصل على دفعات.',
    },
    {
      qEn: 'What can we do to protect an urgent date?',
      aEn: 'Be honest about which part of the date is genuinely fixed, because a date tied to an external event and a date tied to an internal reporting cycle behave very differently. When the date is hard, the answer is fewer elements: a smaller location footprint, fewer approval rounds, a narrower shot list with a clear priority, and agreement that certain coverage is optional rather than assumed. What does not work is compressing every stage equally, because the stage that is already tight is the one that will give way on the day.',
      qAr: 'ما الذي يمكننا فعله لحماية موعد عاجل؟',
      aAr: 'كن صريحًا مع أي جزء من الموعد ثابت فعلًا، لأن الموعد المرتبط بحدث خارجي والموعد المرتبط بدورة تقارير داخلية يتصرفان بصور مختلفة تمامًا. وحين يكون الموعد قاسيًا فالجواب عناصر أقل: نطاق أصغر للموقع، وجولات موافقات أقل، وقائمة لقطات أضيق بأولوية واضحة، والاتفاق على أن التغطية الإضافية اختيارية لا مفترضة. وما لا ينفع هو ضغط كل المراحل بالتساوي، لأن المرحلة الأكثر ضيقًا هي التي ستنهار في اليوم.',
    },
  ]

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
  const linkBrief = isArabic ? 'كيف تكتب بريف إنتاج فيلم' : 'how to brief a production company'
  const linkLocation = isArabic ? 'كيف تجهّز موقعك للتصوير' : 'prepare a film shoot location'
  const linkCorporate = isArabic ? 'الأفلام المؤسسية' : 'corporate video production'
  const linkEvents = isArabic ? 'تغطية الفعاليات' : 'event coverage'
  const linkServices = isArabic ? 'كل خدمات الإنتاج' : 'all production services'

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

      {/* Why a schedule is an output */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? modelHeadingAr : modelHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? modelAr : modelEn}
        </p>
      </Section>

      {/* Where the time actually goes */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? stagesHeadingAr : stagesHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? stagesAr : stagesEn).map((s, i) => (
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

      {/* The decisions that actually move the date */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? controlHeadingAr : controlHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? controlAr : controlEn}
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
            href={`/${locale}/film-production-company-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPillar}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/how-to-brief-a-film-production-company`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkBrief}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/prepare-location-for-film-shoot`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkLocation}
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
            {linkEvents}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkServices}
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
