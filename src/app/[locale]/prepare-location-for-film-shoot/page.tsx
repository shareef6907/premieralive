import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'prepare-location-for-film-shoot'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  const title = isArabic
    ? 'كيف تجهّز موقعك لتصوير فيلم'
    : 'How to Prepare a Film Shoot Location'
  const description = isArabic
    ? 'دليل عملي لتجهيز موقع التصوير: الضوء والكهرباء والضوضاء والدخول والتصاريح الداخلية قبل وصول الطاقم.'
    : 'Practical guide to preparing a film shoot location: light, power, noise, access, and internal approvals before the crew arrives.'

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

export default async function PrepareLocationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'كيف تجهّز موقعك لتصوير فيلم' : 'How to prepare a location for a film shoot'

  const h1En = 'How to Prepare a Location for a Film Shoot'
  const h1Ar = 'كيف تجهّز موقعك لتصوير فيلم'

  const heroEn =
    'A clean meeting room is not a film set. The difference between a room that photographs well and a room that consumes a production day is usually found before the crew arrives: where the light falls, where the power is, what the noise sounds like when the doors are closed, and how long it takes to get a full crew and its equipment into the building. In Saudi Arabia, the first two are shaped by the climate and the building, and the last two are shaped by the organisation that owns the site. This guide is for the person who books the location — an office manager, an events lead, a facilities coordinator, or a business owner — rather than the producer who will shoot there. It explains what to check during a walkthrough, what information to send before the shoot, what to clear with your own organisation, and how to protect the schedule on the day. It is not a technical lighting manual and it does not prescribe a look for your film. Its purpose is simpler: to make sure the room behaves predictably so the crew can concentrate on the people and the message instead of solving the building on shoot day. We produce films, corporate videos, event coverage, podcasts, and photography across Saudi Arabia from our base in Al Khobar, and we travel to sites across the Kingdom, so the advice here reflects the conditions crews actually work in.'
  const heroAr =
    'لا تتحول قاعة اجتماعات نظيفة إلى موقع تصوير. فالفرق بين غرفة تُصوَّر جيدًا وغرفة تستهلك يوم إنتاج يتحدد عادة قبل وصول الطاقم: من أين يسقط الضوء، وأين الكهرباء، وكيف يبدو الصوت حين تُغلق الأبواب، وكم يستغرق إدخال طاقم كامل ومعداته إلى المبنى. وفي السعودية يتحدد العامل الأول والثاني من المناخ والمبنى، ويتحدد العامل الثالث والرابع من الجهة التي تدير الموقع. كُتب هذا الدليل لمن يحجز الموقع — مسؤول مكتب أو مسؤول فعاليات أو منسق مرافق أو صاحب عمل — لا لمنتج التصوير. يشرح ما الذي ينبغي فحصه في الجولة، وما المعلومات التي ترسل قبل التصوير، وما الذي تستدعيه جهتك الداخلية، وكيف تحمي الجدول في اليوم نفسه. وهو ليس دليل إضاءة تقنيًا ولا يفرض على فيلمك مظهرًا معينًا. غرضه أبسط: أن تتصرف الغرفة بصورة متوقعة، فيركّز الطاقم على الأشخاص والرسالة بدل أن يعالج المبنى في يوم التصوير. ننتج الأفلام وأفلام الشركات وتغطية الفعاليات والبودكاست والتصوير في أنحاء السعودية انطلاقًا من مقرنا في الخبر، ونتنقل إلى المواقع فيأنحاء المملكة، فتشير الإرشادات هنا إلى الظروف التي يعمل فيها الطواقم فعليًا.'

  const modelHeadingEn = 'What a location actually has to do'
  const modelHeadingAr = 'ما الذي يجب أن يؤديه الموقع فعلًا'

  const modelEn =
    'A shooting location is asked to do several jobs at once, and clients usually notice only the first one. It has to be visually controllable, so that the crew can shape the image rather than accept whatever the room happens to do. It has to be acoustically predictable, because dialogue recorded in an unpredictable room cannot be repaired cleanly afterwards. It has to be operationally workable, so that people, equipment, and power can move through it without interrupting the work already in progress. And it has to be secure, so that confidential material is not visible, audible, or visible to visitors. These four requirements often compete. A large open space has good depth and poor sound control. A small room controls sound and loses depth. A busy corridor gives access and gives no control. The useful question is not whether the room is attractive in a photograph; it is whether the crew can predict what will happen in it. Our producers normally walk a site before the shoot and ask the same questions in the same order: how does the light move through the day, what can be heard when the room is quiet, where can the equipment go, and what cannot be moved. The answers decide the shot plan. If the location cannot answer those questions, the producer will build a plan around the limitation instead of waiting to discover it on the day.'
  const modelAr =
    'يُطلب من موقع التصوير أن يؤدي عدة مهام في وقت واحد، ويلاحظ العملاء عادة المهمة الأولى وحدها. ينبغي أن يتيح التحكم البصري، حتى يستطيع الطاقم تشكيل الصورة بدل قبول ما تصنعه الغرفة. وينبغي أن تكون الاستجابة الصوتية متوقعة، لأن الحوار المسجل في غرفة غير متوقعة لا يمكن إصلاحه بعد ذلك. وينبغي أن يكون الموقع قابلًا للتشغيل، حتى يتحرك الناس والمعدات والكهرباء فيه دون مقاطعة العمل الجاري. وينبغي أن يكون آمنًا، حتى لا تظهر المواد السرية أو تُسمع أو تظهر للزوار. وتتعارض هذه المتطلبات أحيانًا. فالمساحة المفتوحة الواسعة تمنح عمقًا جيدًا وتحكمًا صوتيًا ضعيفًا، والغرفة الضيقة تتحكم في الصوت وتفقد العمق، والممر المزدحم يتيح الدخول ولا يتيح التحكم. والسؤال المفيد ليس هل تبدو الغرفة جذابة في صورة، بل هل يستطيع الطاقم التنبؤ بما سيحدث فيها. ويمشي منتجونا عادة على الموقع قبل التصوير ويسألون الأسئلة نفسها بالترتيب نفسه: كيف يتحرك الضوء خلال اليوم، وماذا يُسمع حين تكون الغرفة هادئة، وأين يمكن وضع المعدات، وما الذي لا يمكن نقله. وتحدد الإجابات خطة اللقطات. وإذا لم يجب الموقع عن هذه الأسئلة، سيبني المنتج خطةً حول القيد بدل الانتظار حتى يكتشفه في اليوم نفسه.'

  const walkthroughHeadingEn = 'The walkthrough: what to check, in what order'
  const walkthroughHeadingAr = 'الجولة: ما الذي تفحصه وبأي ترتيب'

  const walkthroughEn = [
    {
      title: 'Walk the route before you walk the room',
      body: 'Start at the point where the equipment will be unloaded and follow the route to the room. Count stairs, measure the lift, note every turn, and check where a case can be set down without blocking a corridor. A location can be perfect and still fail because a case cannot turn in the corridor outside it.',
    },
    {
      title: 'Watch the light at the hour you intend to shoot',
      body: 'Stand where the subject will stand and look at the windows through the day, not at midday. Light that enters directly will wash out a face; light that moves across a wall gives the camera something to work with. Note which direction the windows face and when direct sun reaches them, because that is the difference between a controllable room and a room the crew has to fight.',
    },
    {
      title: 'Find the power and count the sockets',
      body: 'Locate the nearest distribution board, count the available outlets, and check whether the building permits drawing from it or expects the crew to bring its own distribution. Ask about any circuit that is already shared with lifts, air handling, or signage, because a circuit that drops during a take is a problem that cannot be fixed in the edit.',
    },
    {
      title: 'Listen with the doors closed',
      body: 'Turn off the air handling for a moment if you are allowed to, and stand in the room without speaking. Note the hum, the air movement, the sound of traffic or generators outside, and whether the room reflects speech back at you. This is not a sound test and it does not require equipment; it tells the producer whether dialogue will need a treated room or a different position.',
    },
    {
      title: 'Ask what cannot be moved',
      body: 'Furniture, wall finishes, signage, artwork, screens, and branding often have to remain exactly where they are because they belong to the site or follow a brand standard. Ask early, because a room cannot be designed around a fixed element the crew only learns about on arrival.',
    },
    {
      title: 'Confirm access and arrival times',
      body: 'Establish who will open the building, who will be on site throughout, and how early the crew may arrive and how late it may finish. A locked entrance at the start of the day consumes the first usable hour, and a building that must be cleared at a fixed hour can cut a planned sequence short without warning.',
    },
  ]

  const walkthroughAr = [
    {
      title: 'امشِ في الطريق قبل أن تمشِ في الغرفة',
      body: 'ابدأ من نقطة تفريغ المعدات واتبع الطريق إلى الغرفة. عدّ الدرجات، وقِس المصعد، وسجّل كل منعطف، وحدّد أين يمكن وضع الحقيبة دون حجب الممر. قد تكون الغرفة مثالية وتفشل لأن حقيبة لا تستطيع الالتفاف في الممر خارجها.',
    },
    {
      title: 'راقب الضوء في الساعة التي تنوي التصوير فيها',
      body: 'قف حيث سيقف الموضوع وانظر إلى النوافذ خلال اليوم لا عند الظهر. فالدخول المباشر للضوء يغسل الوجه، وحركة الضوء على الجدار تمنح الكاميرا ما تعمل به. وسجّل اتجاه النوافذ والوقت الذي يصل فيه الشمس إليها مباشرة، فهذا هو الفرق بين غرفة قابلة للتحكم وغرفة تنازعها الطاقم.',
    },
    {
      title: 'حدّد مصدر الكهرباء وعدّ المقابس',
      body: 'اعثر على أقرب لوحة توزيع، وعدّ المقابس المتاحة، وتحقق مما إذا كان المبنى يسمح بالسحب من اللوحة أم يتوقع أن يحضر الطاقم موزّعه. واسأل عن أي دائرة مشتركة مع المصاعد أو التكييف أو اللوحات الإعلانية، فالدائرة التي تتوقف أثناء اللقطة مشكلة لا يمكن إصلاحها في المونتاج.',
    },
    {
      title: 'استمع والأبواب مغلقة',
      body: 'أوقف التكييف للحظة إن سمح لك ذلك، وقف في الغرفة دون كلام. وسجّل الطنين وحركة الهواء وصوت المرور أو المولدات في الخارج، وما إذا كانت الغرفة تعيد الصوت إليك. وهذا ليس اختبار صوت ولا يحتاج معدات، لكنه يعلم المنتج ما إذا كان الحوار يحتاج غرفة معالجة أو موقعًا مختلفًا.',
    },
    {
      title: 'اسأل عمّا لا يمكن نقله',
      body: 'الأثاث وواجهات الجدران واللوحات والأعمال الفنية والشاشات والشعارات تبقى في مواضعها غالبًا لأنها ملك للموقع أو تتبع دليل هوية. واسأل مبكرًا، فالغرفة لا يمكن أن يُصمم محيطها بعنصر ثابت لا يعرفه الطاقم إلا عند الوصول.',
    },
    {
      title: 'أكد الدخول وأوقات الوصول',
      body: 'حدّد من سيفتح المبنى، ومن سيكون موجودًا في الموقع طوال الوقت، وكم مبكرًا قد يصل الطاقم ومتى ينتهي. فالباب المقفل في بداية اليوم يستهلك أول ساعة صالحة، والمبنى الذي يجب إخلاؤه في ساعة محددة قد يقطع تسلسلًا مخططًا دون إنذار.',
    },
  ]

  const decisionsHeadingEn = 'What to clear before the shoot day'
  const decisionsHeadingAr = 'ما الذي تستدعيه قبل يوم التصوير'

  const decisionsEn =
    'Most location problems are not technical. They are approval problems that arrive on the morning of the shoot. A manager may need to approve moving furniture, a colleague may need to agree to appear on camera, an information team may need to remove a screen from view, and a facilities team may need to keep a circuit free during a certain window. Each of these decisions is small on its own, and each becomes expensive when it has to be made while the crew is waiting. The useful preparation is therefore a short list of decisions, not a long list of equipment. Write down the filming date, the arrival and finish times, the rooms involved, the people who will appear, the furniture that may move, the screens and documents that must not be visible, the circuit that must stay free, and the name of the person who can approve a change on the day. Send that list to everyone involved before the shoot, not on the morning of it. Then confirm it once, by a short conversation, with the person who holds the keys and the person who can approve changes. In practice, the biggest schedule protection is not a plan for a technical failure; it is a short chain of decisions that does not have to leave the building to be resolved.'
  const decisionsAr =
    'معظم مشكلات الموقع ليست تقنية، بل مشكلات موافقات تصل صباح يوم التصوير. فقد يحتاج مدير إلى الموافقة على نقل أثاث، أو موافقة زميل على الظهور أمام الكاميرا، أو إزالة شاشة من مجال الرؤية، أو إبقاء دائرة كهربائية خالية خلال نافذة محددة. كل قرار من هذه القرارات صغير بذاته، وكل واحد منها يصبح مكلفًا حين يُتخذ والطاقم ينتظر. وتجهيز النافعة المفيد هنا قائمة قصيرة من القرارات، لا قائمة طويلة من المعدات. اكتب تاريخ التصوير، ووقت الوصول والختام، والغرف المشمولة، والأشخاص الذين سيظهرون، والأثاث الذي يمكن نقله، والشاشات والمستندات التي يجب ألا تكون ظاهرة، والدائرة التي يجب أن تبقى خالية، واسم من يستطيع اعتماد التغيير في اليوم. وأرسل هذه القائمة إلى كل معني قبل التصوير لا صباحه. ثم أكدها مرة في محادثة قصيرة مع من يحتفظ بالمفاتيح ومن يستطيع اعتماد التغييرات. ومن حيث الممارسة، فأكبر حماية للجدول ليست خطة لأي فشل تقني، بل سلسلة قصيرة من القرارات لا تحتاج إلى مغادرة المبنى لحلها.'

  const dayHeadingEn = 'On the day: protect the schedule without running the shoot'
  const dayHeadingAr = 'في يوم التصوير: احمِ الجدول من دون أن تدير التصوير'

  const dayEn =
    'The client’s role on the day is narrow and valuable: make access easy, make decisions fast, and keep the space stable. That means the person responsible for the site is present or immediately reachable, the keys and access route are ready before the crew arrives, and any change to the room is communicated to one person rather than to the whole crew. It also means protecting the people in the room from the pressure of the schedule. Talent who is told repeatedly that the crew is waiting tends to rush, and rushed interviews carry the tension into the footage. A clear schedule, a quiet space to prepare in, and a single point of contact remove more delay than any extra equipment. When something does go wrong, the most useful response is to solve it quickly and quietly. A practical location is one where the crew can focus on the film because the building has already stopped being interesting.'
  const dayAr =
    'دور العميل في اليوم ضيق ومفيد: يسهّل الدخول، ويسرّع القرارات، ويحافظ على استقرار المكان. ويعني ذلك حضور المسؤول عن الموقع أو إتاحة الوصول إليه فورًا، ووجود المفاتيح ومسار الدخول جاهزين قبل وصول الطاقم، وتوصيل أي تغيير في الغرفة إلى شخص واحد لا إلى الطاقم كله. ويعني أيضًا حماية الأشخاص في الغرفة من ضغط الجدول. فالمتحدث الذي يُقال له مرارًا إن الطاقم ينتظر يتعجل، والمقابلات المتعجلة تنقل التوتر إلى الصورة. أما الجدول الواضح، والمكان الهادئ للاستعداد، وجهة اتصال واحدة، فيزيلان أكثر مما تزيله أي إضافة إلى المعدات. وحين يقع خطأ ما، يكون أنجع رد هو حلّه بسرعة وهدوء. فالموقع العملي هو الموقع الذي يركّز فيه الطاقم على الفيلم لأن المبنى لم يعد يستدعي الاهتمام.'
  const faqData = [
    {
      qEn: 'How early should we prepare the location before the shoot?',
      aEn: 'A walkthrough shortly before the shoot is enough for most rooms, but the internal approvals should begin earlier because they involve people rather than furniture. The walkthrough confirms light, power, sound, and access; the approvals move signs, screens, and decisions. Start the approvals when the date is confirmed and use the walkthrough to check what those decisions have changed.',
      qAr: 'كم من الوقت ينبغي تجهيز الموقع قبل التصوير؟',
      aAr: 'تكفي جولة قبل التصوير بوقت قريب معظم الغرف، أما الموافقات الداخلية فينبغي أن تبدأ مبكرًا لأنها تتعلق بأشخاص لا بأثاث. فالجولة تؤكد الضوء والكهرباء والصوت والدخول، والموافقات تنقل اللوحات والشاشات وتتخذ القرارات. ابدأ الموافقات عند تأكيد التاريخ، واستخدم الجولة للتحقق مما غيّرته تلك القرارات.',
    },
    {
      qEn: 'Do we need to remove everything from the room before the crew arrives?',
      aEn: 'Usually not, and emptying the room can remove the context that makes it useful. What matters is that the crew knows what can be moved and what cannot. Clear the working surfaces, remove confidential or personal material that would be visible, and tell the producer about anything fixed to the wall or floor.',
      qAr: 'هل نحتاج إلى إفراغ الغرفة بالكامل قبل وصول الطاقم؟',
      aAr: 'لا يلزم ذلك عادةً، وإفراغ الغرفة قد يزيل السياق الذي يجعلها مفيدة. المهم أن يعرف الطاقم ما يمكن نقله وما لا يمكن. نظّف أسطح العمل، وأزل المواد السرية أو الشخصية التي قد تظهر، وأعلم المنتج بكل عنصر مثبت في الجدار أو الأرض.',
    },
    {
      qEn: 'What if the room is noisy and we cannot change it?',
      aEn: 'Tell the producer during the walkthrough rather than on the day. A noisy room does not stop a shoot, but it changes the plan: the position of the subject, the direction of the camera, the way the dialogue is recorded, and sometimes the decision to move the scene. The producer can work with a known constraint; a constraint discovered at the start of the day has no time left to shape the plan.',
      qAr: 'ماذا نفعل إذا كانت الغرفة صاخبة ولا يمكننا تغييرها؟',
      aAr: 'أبلغ المنتج في جولة الاستطلاع لا في يوم التصوير. فالغرفة الصاخبة لا توقف التصوير، لكنها تغيّر الخطة: موضع الموضوع، واتجاه الكاميرا، وطريقة تسجيل الحوار، وأحيانًا قرار نقل المشهد. ويستطيع المنتج العمل مع قيد معروف، أما القيد الذي يكتشف في بداية اليوم فلا وقت له ليؤثر في الخطة.',
    },
    {
      qEn: 'Who should be on site during the shoot?',
      aEn: 'One person with authority over the space and quick access to the people who can approve changes is enough. They should know the filming schedule, the rooms in use, and who is appearing, so they can answer questions without searching. A large delegation is less useful than one informed contact with the authority to act.',
      qAr: 'من ينبغي أن يكون في الموقع أثناء التصوير؟',
      aAr: 'يكفي شخص واحد يملك صلاحية التصرف في المكان ويصل سريعًا إلى من يستطيع اعتماد التغييرات. وينبغي أن يعرف جدول التصوير والغرف المستخدمة ومن سيظهر، حتى يجيب عن الأسئلة دون بحث. والوفد الكبير أقل نفعًا من جهة اتصال واحدة على اطلاع تملك الصلاحية للتصرف.',
    },
    {
      qEn: 'Can we shoot outside the normal working hours?',
      aEn: 'It is possible, but it changes the plan rather than simply extending it. Working outside normal hours can reduce activity in the building and give more control of the light, while also changing access, staffing, security, and the availability of the people who can make decisions. Tell the producer as early as possible so those effects are planned for rather than discovered.',
      qAr: 'هل يمكننا التصوير خارج ساعات العمل المعتادة؟',
      aAr: 'يمكن ذلك، لكنه يغيّر الخطة لا يمدها فحسب. فالعمل خارج ساعات العمل المعتادة قد يقلل الحركة في المبنى ويمنح تحكمًا أكبر في الضوء، لكنه يغيّر كذلك الدخول والتأمين وتوافر من يمكنهم اتخاذ القرارات. فأبلغ المنتج في أبكر وقت ممكن لتكون هذه الآثار مخططًا لها لا مكتشفة.',
    },
  ]

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
  const linkBrief = isArabic ? 'كيف تكتب بريف إنتاج فيلم' : 'how to brief a production company'
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

      {/* What a location actually has to do */}
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

      {/* The walkthrough */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? walkthroughHeadingAr : walkthroughHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? walkthroughAr : walkthroughEn).map((s, i) => (
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

      {/* What to clear before the shoot day */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? decisionsHeadingAr : decisionsHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? decisionsAr : decisionsEn}
        </p>
      </Section>

      {/* On the day */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? dayHeadingAr : dayHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? dayAr : dayEn}
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
            href={`/${locale}/how-to-brief-a-film-production-company`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkBrief}
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
