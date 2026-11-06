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

  const title = isArabic
    ? 'كيف تكتب بريف إنتاج أفلام | بريمييرا لايف'
    : 'How to Brief a Film Production Company | Premiera Live'
  const description = isArabic
    ? 'دليل عملي لتجهيز بريف إنتاج أفلام: ما يحتاجه الطاقم، وما الذي يغيّر الجدول الزمني، وكيف تجهّز الموقع قبل يوم التصوير.'
    : 'How to brief a film production company in Saudi Arabia: what the crew needs, what moves the timeline, and how to prepare a location.'

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

export default async function BriefGuidePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'كيف تكتب بريف إنتاج أفلام' : 'How to brief a film production company'

  const h1En = 'How to Brief a Film Production Company'
  const h1Ar = 'كيف تكتب بريف إنتاج أفلام'

  const heroEn =
    'Most film projects in Saudi Arabia do not fail on the day of the shoot. They fail in the three weeks before it, in a brief that was too vague for a director to act on, a location booked by someone who had never seen it, and a message everyone was sure they already understood. A good brief is not a document. It is a shared picture of what the film has to do, who it has to reach, and what the viewer should do next — and it is the cheapest part of the entire production to get right. This guide is written for the people who commission the work rather than make it: a marketing lead, a communications manager, an operations director, or a founder. It explains what a professional crew actually needs from you, what genuinely moves the schedule, how to prepare a location properly, and where briefs usually go wrong. We produce films, podcasts, event coverage and photography across Saudi Arabia from our base in Al Khobar, and we travel to wherever the work is, so everything here reflects how filming actually happens on a real schedule in the Kingdom.'
  const heroAr =
    'لا يفشل معظم مشاريع الأفلام في السعودية يوم التصوير. بل يفشل قبله بثلاثة أسابيع، حين يكون البريف غامضًا لدرجة لا يستطيع المخرج أن يبني عليه، أو يكون الموقع قد حجزه من لم يره، أو تكون الرسالة التي ظن الجميع أنهم فهموها سلفًا. والبريف الجيد ليس وثيقة، بل صورة مشتركة لما يجب أن يؤديه الفيلم، ولمن يجب أن يصل، وما الذي يفعله المشاهد بعد المشاهدة. وهو أرخص جزء في الإنتاج كله يمكن ضبطه. كُتب هذا الدليل لمن يكلّف العمل لا لمن يصنعه: مسؤول تسويق، أو مدير اتصالات، أو مدير عمليات، أو مؤسس. يشرح ما يحتاجه الطاقم المحترف منك فعلًا، وما الذي يغيّر الجدول الزمني حقًا، وكيف تجهّز الموقع بالطريقة الصحيحة، وأين يخطئ البريف عادةً. ننتج الأفلام والبودكاست وتغطية الفعاليات والتصوير في مختلف مناطق السعودية انطلاقًا من مقرنا في الخبر، ونتنقل إلى حيث يكون العمل، فكل ما هنا مبني على كيف يحدث التصوير فعليًا في جدول عمل حقيقي داخل المملكة.'

  const introHeadingEn = 'What a brief actually is'
  const introHeadingAr = 'ما هو البريف فعليًا'

  const introEn =
    'In film and video production, a brief is the document that tells a production company what problem the film has to solve. That is different from a list of shots, and it is different from a product description. A weak brief says "we need a corporate video about our company". A strong brief says who is watching, what they should believe or do when they finish, what the film has to include, what it must avoid, and what happens in the next step. Everything else — the treatment, the shot list, the schedule, the crew — follows from that. A crew that understands the job can propose a way to do it. A crew that has been handed a shot list has been told how to do a job you may not have thought about, and you will find out in the edit. The other thing worth understanding is that a brief is not a contract. It is a working document that both sides keep returning to, because the project will change. New information arrives, a spokesperson becomes unavailable, a product detail changes. The question at the end of each conversation is always the same: does this new information change what the film is for, or only how we get there? If it is only the second, the brief absorbs it and production continues.'
  const introAr =
    'في إنتاج الأفلام والفيديو، البريف هو المستند الذي يوضّح لشركة الإنتاج المشكلة التي يجب أن يحلّها الفيلم. وهذا يختلف عن قائمة اللقطات، ويختلف أيضًا عن وصف المنتج. فالبريف الضعيف يقول: «نحتاج فيلمًا تعريفيًا عن شركتنا». أما البريف القوي فيحدّد من سيشاهد، وما الذي ينبغي أن يصدّقه أو يفعله بعد المشاهدة، وما الذي يجب أن يتضمنه الفيلم، وما الذي يجب تجنّبه، وماذا يحدث في الخطوة التالية. وكل ما عدا ذلك — المعالجة البصرية وقائمة اللقطات والجدول والطاقم — يتبع من ذلك. فالطاقم الذي يفهم المهمة يستطيع أن يقترح طريقة لإنجازها، أما الطاقم الذي أُعطي قائمة لقطات فقد قيل له كيف ينجز مهمة لم تفكّر فيها، وستكتشف ذلك في المونتاج. ومن المهم أيضًا أن تفهم أن البريف ليس عقدًا، بل هو مستند عمل يعود إليه الطرفان، لأن المشروع سيتغير. تصل معلومات جديدة، أو يتعذر حضور متحدث، أو يتغير تفصيل في المنتج. والسؤال في نهاية كل محادثة واحد: هل تغيّرت هذه المعلومات الهدف من الفيلم، أم طريقة الوصول إليه فقط؟ إن كانت طريقة الوصول فقط، فالبريف يستوعبها ويستمر الإنتاج.'

  const needsHeadingEn = 'What the crew needs from you'
  const needsHeadingAr = 'ما الذي يحتاجه الطاقم منك'

  const needsEn = [
    {
      title: 'The business objective in one sentence',
      body: 'Not the deliverable. The objective. "Launch a service to corporate buyers in the Eastern Province" is an objective. "A two-minute corporate film" is a deliverable. Once the objective is clear, the format is negotiable, and the crew can tell you when a format will not serve the objective.',
    },
    {
      title: 'Who is the audience, and what do they already know',
      body: 'The same film is aimed at a board member who knows the sector, a customer who does not, and an employee who needs a message for an internal town hall. Say which one it is, and say what they already understand, because what they already know is what you can leave out of the film and spend your time on instead.',
    },
    {
      title: 'The one action you want afterwards',
      body: 'Every commercial, corporate film and social cut has an action attached to it: visit a page, call a number, send a message, change a behaviour, apply for something. If you cannot name the action, the film will not have one, and it will be difficult to judge whether it worked.',
    },
    {
      title: 'Approved message and the lines that are fixed',
      body: 'Send the wording you cannot change: the product name, the claim, the offer terms, the official description, the legal line at the end of the advert if there is one. Everything else is negotiable and should be written as negotiable, so the crew can improve it.',
    },
    {
      title: 'Spokespeople, and who is not available',
      body: 'Name the people who will be on camera, the role each of them plays, and the subject they actually know. Also name the people who were suggested and will not be available. A spokesperson who is available for half the shoot changes the shot list, and it is better to know that at the planning stage than on the day.',
    },
    {
      title: 'What must not appear',
      body: 'Confidential screens, other people’s badges and number plates, a competitor’s product on a desk, a facility area that has not been cleared, a claim that has not been approved. This is a short list and it is the one that most often causes a reshoot, so it belongs in the brief from the first conversation rather than in a note on the day.',
    },
    {
      title: 'Existing material',
      body: 'Previous films, brand guidelines, photography, slide decks, the old product video that did not work, the deck you sent to the client last month. It is faster to react to something the crew has seen than to a description of something the crew has not seen.',
    },
    {
      title: 'How the film will be used after delivery',
      body: 'A hero film on the homepage, a cut for social, a version for a trade show loop, a version with no sound for a muted feed. The usage determines the technical delivery: aspect ratios, subtitle files, vertical cuts, and whether the film has to read without narration.',
    },
  ]

  const needsAr = [
    {
      title: 'هدف العمل في جملة واحدة',
      body: 'ليس المُخرَج، بل الهدف. فعبارة «إطلاق خدمة لِشركاء الشركات في المنطقة الشرقية» هدف، أما «فيلم تعريفي مدته دقيقتان» فمُخرَج. وبضوح الهدف تصبح الصيغة قابلة للتفاوض، ويستطيع الطاقم أن ينبّهك حين لا تخدم الصيغةُ الهدفَ.',
    },
    {
      title: 'الجمهور المستهدف وما يعرفه سلفًا',
      body: 'الفيلم نفسه موجّه إلى عضو مجلس إدارة يعرف القطاع، وإلى عميل لا يعرفه، وإلى موظف يحتاج رسالة لاجتماع داخلي. حدّد أيّهم هو الجمهور، وحدّد ما يفهمه سلفًا، فما يعرفه سلفًا هو ما يمكن حذفه من الفيلم لتوفير وقت الشاشة لما يهم فعلًا.',
    },
    {
      title: 'الإجراء الواحد الذي تريده بعد المشاهدة',
      body: 'لكل إعلان أو فيلم مؤسسي أو نسخة تواصل اجتماعي إجراء: زيارة صفحة، أو اتصال برقم، أو إرسال رسالة، أو تغيير سلوك، أو تقديم طلب. وإن لم تستطع تسمية الإجراء، فلن يحتوي الفيلم على إجراء، وسيصعب الحكم على نجاحه لاحقًا.',
    },
    {
      title: 'الرسالة المعتمدة والعبارات الثابتة',
      body: 'أرسل الصياغة التي لا يجوز تغييرها: اسم المنتج، والادعاء، وشروط العرض، والوصف الرسمي، والعنوان القانوني في نهاية الإعلان إن وُجد. أما ما عدا ذلك فقابل للتفاوض، ويجب أن يُكتب بصيغة قابلة للتفاوض ليتمكن الطاقم من تحسينه.',
    },
    {
      title: 'المتحدثون ومن لن يتوفر',
      body: 'سمِّ الأشخاص الذين سيظهرون أمام الكاميرا، ودور كل واحد منهم، والمجال الذي يتقنه فعلًا. وسمِّ أيضًا من رُشّح ثم تعذّر توفره. فمتحدث متاح لنصف أيام التصوير يغيّر قائمة اللقطات، ومن الأفضل أن تعرف ذلك في مرحلة التخطيط لا في يوم التصوير.',
    },
    {
      title: 'ما لا يجوز أن يظهر',
      body: 'شاشات سرية، وبطاقات ولوحات مفاتيح الآخرين، ومنتج منافس على المكتب، وجهة في منشأة لم يتم اعتمادها، وادعاء لم يوافق عليه. هذه قائمة قصيرة، وهي التي تسبب إعادة التصوير أكثر من غيرها، ولذلك تنتمي إلى البريف من أول حديث لا إلى ملاحظة في يوم التصوير.',
    },
    {
      title: 'المواد القائمة',
      body: 'الأفلام السابقة، ودليل الهوية، والتصوير الفوتوغرافي، والعروض التقديمية، وفيديو المنتج القديم الذي لم ينجح، والعرض الذي أرسلته إلى العميل الشهر الماضي. من الأسهل التعليق على شيء رآه الطاقم من وصف شيء لم يره.',
    },
    {
      title: 'كيف سيُستخدم الفيلم بعد التسليم',
      body: 'فيلم رئيسي في الصفحة الرئيسية، ونسخة للنشر، ونسخة لشاشة في معرض، ونسخة بلا صوت لشاشة تُعرض بلا صوت. الاستخدام يحدد التسليم الفني: نسب العرض، وملفات الترجمة، والنسخ العمودية، وهل يجب أن يُقرأ الفيلم دون تعليق صوتي.',
    },
  ]

  const timelineHeadingEn = 'What actually moves the timeline'
  const timelineHeadingAr = 'ما الذي يغيّر الجدول الزمني فعليًا'

  const timelineEn =
    'Clients usually ask about the schedule before anything else, and the honest answer is that the schedule is decided by three things: how much of the organisation is needed on camera, how much control you have over the location, and how many decisions have to be made by people who are not in the production. A crew can work around a tight location window with a small team and a clear shot list. It cannot work around a decision that has to travel from a head office in another city to a director sitting in a van. The single most effective thing you can do is put one person in charge of decisions and make them available during the shoot window. That person can approve a take, settle a question about the product, and confirm a claim on the spot. When that authority sits with someone else, every small question becomes a delay, and delays on a shoot day are not recovered — the crew is paid for the day, and the day has a fixed number of usable hours in it. The second thing that moves the schedule is the location itself. Access that starts late, power that is not where it needs to be, a building that looks completely different in person than it does in a photograph — these all eat the hours you budgeted for the actual filming. The third is weather, in the months when it matters, and the plan for that is not a hope for good conditions but a written alternative for each outdoor sequence: a covered version, an indoor version, and a decision point at which the plan changes. Our own experience is that the difference between a project that runs on time and one that runs long is rarely the quality of the equipment. It is whether the location was walked before the shoot, whether the decisions had an owner in the room, and whether the client knew what the day was going to look like when it started.'
  const timelineAr =
    'يسأل العملاء عن الجدول الزمني قبل أي شيء آخر، والجواب الصادق أن الجدول يحدّده ثلاثة أمور: كم من أفراد الشركة نحتاج أمام الكاميرا، وكم من السيطرة نملك على الموقع، وكم قرارًا يجب أن يتخذه أشخاص ليسوا داخل الإنتاج. فالطاقم يستطيع التكيف مع نافذة ضيقة في الموقع إذا كان صغيرًا وقائمة اللقطات واضحة، لكنه لا يستطيع التكيف مع قرار يجب أن ينتقل من المقر الرئيسي في مدينة أخرى إلى مخرج يجلس داخل سيارة. وأكثر ما يفيدك عمليًا هو تحديد شخص واحد مسؤول عن القرارات وإتاحته خلال نافذة التصوير. ف هذا الشخص يوافق على لقطة، ويحسم سؤالًا عن المنتج، ويؤكد ادعاءً في المكان. أما حين تكون هذه الصلاحية عند غيره، يتحول كل سؤال صغير إلى تأخير، وتأخيرات يوم التصوير لا تُستعاد — فالطاقم مدفوع لأيامه، واليوم عدد ساعاته الصالحة محدود. والشيء الثاني الذي يحرّك الجدول هو الموقع نفسه. فدخول متأخر، وكهرباء ليست في موضعها، ومبنى يبدو مختلفًا تمامًا عند الحضور عمّا يبدو في صورة — كل ذلك يستهلك من الساعات التي خططت لها للتصوير. أما الثالث فهو الطقس، في الأشهر التي يكون فيها مؤثرًا، والخطة لذلك ليست تفاؤلًا بالطقس الجيد بل بديل مكتوب لكل لقطة خارجية: نسخة مغطاة، ونسخة داخلية، ونقطة قرار يُغيَّر عندها الخطة. وخبرتنا أن الفرق بين مشروع يسير في وقته وآخر يتأخر نادرًا ما يكون في جودة المعدات، بل في أن الموقع شوهد قبل التصوير، وفي أن للقرارات مالكًا حاضرًا، وفي أن العميل كان يعرف شكل يومه حين بدأ.'

  const locationHeadingEn = 'How to prepare a location properly'
  const locationHeadingAr = 'كيف تجهّز الموقع بالطريقة الصحيحة'

  const locationEn =
    'Most locations are prepared by someone who was not told what a crew needs, and the result is a room that is clean and completely unusable. A production crew arriving at a building needs to know, before the day, what the space is like at the level of a light meter rather than the level of a floor plan. Walk it. Look at where the sun falls in the morning and in the afternoon, because a window that is beautiful at nine in the morning will blow out at noon and go flat by four. Notice the ceiling height and the colour of the walls, because a room with a low ceiling and a strong colour will shape every decision about lighting that follows. Find the nearest usable power and count the sockets, then decide whether the crew brings its own distribution or draws from the building. Check the noise floor — air handling, an alarm that cannot be muted, a generator outside the window — because a location with uncontrollable sound will shape the shoot more than any creative decision made afterwards. Check what can be moved and what cannot: which furniture can be shifted, which walls can be covered, which signs have to stay exactly where they are because they are a brand standard. Confirm the parking, the lift dimensions, and the route from the loading point to the room, because the equipment case that will not fit in the lift arrives twenty minutes before everything else. And confirm who holds the keys on the day, and that they will be there before the crew is, because a locked door in the morning is a delay that eats the whole first hour. If the location is a client site, tell the site about the shoot in advance and brief them on what will happen — the noise, the lights in the corridor, the fact that a mark will be taped on the floor, and roughly how long it will take. A site that has been warned is calm; a site that finds out on the day is tense, and that tension reaches the footage.'
  const locationAr =
    'جهّز معظم المواقع أشخاص لم يُبلَّغوا بما يحتاجه الطاقم، فتكون النتيجة غرفة نظيفة وغير قابلة للاستخدام إطلاقًا. فعند وصول طاقم الإنتاج إلى مبنى يحتاج إلى معرفة، قبل يوم التصوير، ما شكل المكان على مستوى قياس الإضاءة لا على مستوى مخطط الطابق. فتفقّد المكان. وانظر إلى أين يسقط الضوء صباحًا وبعد الظهر، فالنافذة الجميلة في التاسعة صباحًا تحرق الصورة عند الظهر وتصبح باهتة عند الرابعة. ولاحظ ارتفاع السقف ولون الجدران، فالغرفة ذات السقف المنخفض واللون القوي تشكّل كل قرار لاحق في الإضاءة. وحدّد أقرب مصدر كهرباء عملي وعدّ المقابس، ثم قرّر إن كان الطاقم سيحضر موزّعه أم يسحب الكهرباء من المبنى. وافحص مستوى الضجيج — التكييف، أو إنذار لا يمكن كتمه، أو مولّد خارج النافذة — فالموقع الذي لا يمكن التحكم في صوته سيؤثر في التصوير أكثر من أي قرار إبداعي يُتخذ بعده. وتحقق مما يمكن نقله وما لا يمكن: أي أثاث يمكن إزاحته، وأي جدران يمكن تغطيتها، وأي لوحات يجب أن تبقى في مكانها تمامًا لأنها متطلب من دليل الهوية. وتحقق من المواقف وأبعاد المصعد وطريق الوصول من نقطة التفريغ إلى الغرفة، فالحقيبة التي لا تدخل المصعد تصل قبل كل شيء بعشرين دقيقة. وأكد من يملك مفاتيح الموقع في اليوم، وأن يكون حاضرًا قبل الطاقم، فباب مقفل صباحًا يؤخر كل الساعة الأولى. وإذا كان الموقع موقع عميل، فأبلغ الموقع بالتصوير مسبقًا وبماذا سيحدث: الضجيج، وأضواء الممر، وأن شريطًا لاصقًا سيوضع على الأرض، والمدة التقريبية. الموقع الذي أُبلغ مسبقًا هادئ، والموقع الذي يكتشف الأمر يوم التصوير متوتر، وهذا التوتر يصل إلى الصورة.'

  const mistakesHeadingEn = 'Where briefs go wrong'
  const mistakesHeadingAr = 'أين يخطئ البريف عادةً'

  const mistakesEn = [
    {
      title: 'Briefing a production company with a shot list',
      body: 'You are describing a solution to a problem you have not described. The crew needs to know what the film has to achieve so they can solve it in a way that works for your location, your people and your deadline. Keep the shot list for the edit, if you want one.',
    },
    {
      title: 'Leaving the objective implied',
      body: 'A brief that begins with the format and ends with the format is a spec, not a brief. If the objective is not written anywhere, every interpretation that happens afterwards is a guess, and the guess belongs to whoever is making it — usually the crew, on your budget.',
    },
    {
      title: 'One approval for everything',
      body: 'A script, a casting choice, a location, a music track, a colour grade, a final cut, and a claim on the product. Each of these can stall a project for days if the decision has to climb a hierarchy. Name who can decide each of them and how quickly they can be reached.',
    },
    {
      title: 'Briefing late and expecting a short timeline',
      body: 'A brief that arrives the week of the shoot is not a brief, it is a handover. The pre-production work — researching, writing, storyboarding, casting, logistics, permissions, and scheduling — cannot be compressed at the end. The shoot day itself is the shortest part of the whole project.',
    },
    {
      title: 'Treating the script as approved too early',
      body: 'The script is the cheapest place to change anything. Once a script is locked, every change costs a new shoot day. So the number of rounds of script review should be agreed in advance, and the person who reads the final script should be the same person who approved the brief.',
    },
    {
      title: 'Filming in one language and translating later',
      body: 'A line written in English and delivered in Arabic is a translation, and translations of slogans do not land the same way. If the film has to be bilingual, write and perform both versions. A presenter who is comfortable in both languages is worth more than a script written twice.',
    },
    {
      title: 'Not planning what the footage is for',
      body: 'A three-minute film cut down to fifteen seconds for a feed does not work automatically. The strongest moments in a film are not always the strongest moments in a vertical cut. Decide the deliverables before the shoot, not after the edit, and shoot with them in mind.',
    },
    {
      title: 'Forgetting who is actually watching',
      body: 'The film is not seen by your team first. It is seen by a customer, a candidate, a regulator, or a member of the public — whoever the audience is. Films that sound internal and look internal get shared internally, and then they are never seen by the people who were supposed to act on them.',
    },
  ]

  const mistakesAr = [
    {
      title: 'إعطاء شركة الإنتاج قائمة لقطات',
      body: 'أنت تصف حلًا لم تصف المشكلة. يحتاج الطاقم إلى معرفة ما الذي يجب أن يحققه الفيلم ليحلّ المشكلة بما يناسب موقعك وأشخاصك وموعدك النهائي. واترك قائمة اللقطات للمونتاج إن أردتها.',
    },
    {
      title: 'ترك الهدف ضمنيًا',
      body: 'البريف الذي يبدأ بالصيغة وينتهي بالصيغة مواصفة لا بريف. وإن لم يُكتب الهدف في أي موضع، فكل تفسير لاحق تخمين، والتخمين يقع على من اجراه — عادةً الطاقم، على حسابك.',
    },
    {
      title: 'موافقة واحدة لكل شيء',
      body: 'السيناريو، واختيار مقدّم العرض، والموقع، وموسيقى التصوير، والتدرّج اللوني، والمونتاج النهائي، وادعاء عن المنتج. كل واحد منها قد يوقف المشروع أيامًا إن كان القرار يحتاج إلى تصعيد ضمن سلسلة إدارية. حدّد من يقرر كلًّا منها وكم يستغرق الوصول إليه.',
    },
    {
      title: 'التأخر في التحرير ثم توقع جدولًا قصيرًا',
      body: 'البريف الذي يصل في أسبوع التصوير ليس بريفًا بل تسليمًا. فعمل ما قبل الإنتاج — البحث والكتابة واللوحات واختيار مقدّمي العرض والاستطلاع واللوجستيات والتنسيق — لا يمكن ضغطه في النهاية. ويوم التصوير هو أقصر جزء في المشروع كله.',
    },
    {
      title: 'اعتماد السيناريو مبكرًا أكثر من اللازم',
      body: 'السيناريو هو أرخص مكان لتغيير أي شيء. وبمجرد تثبيته، يكلّف كل تغيير يوم تصوير جديد. ولذلك ينبغي الاتفاق على عدد مراجعات السيناريو مسبقًا، ويقرأ النسخة النهائية الشخص نفسه الذي وافق على البريف.',
    },
    {
      title: 'التصوير بلغة واحدة ثم الترجمة لاحقًا',
      body: 'جملة مكتوبة بالإنجليزية ومؤداة بالعربية هي ترجمة، وترجمة الشعارات لا تصل بالطريقة نفسها. وإذا كان الفيلم ثنائي اللغة، فاكتب وأدِّ النسختين. ومقدّم مرتاح في اللغتين يساوي أكثر من نص مكتوب مرتين.',
    },
    {
      title: 'عدم التخطيط لاستخدام اللقطات',
      body: 'فيلم مدته ثلاث دقائق يقتطع منه خمس عشرة ثانية لصفحة التواصل لا ينجح تلقائيًا. فأقوى اللحظات في الفيلم ليست بالضرورة أقوى اللحظات في النسخة العمودية. قرر المخرجات قبل التصوير لا بعد المونتاج، وصوّر وهي في ذهنك.',
    },
    {
      title: 'نسيان من يشاهد فعلًا',
      body: 'الفيلم لا يراه فريقك أولًا. بل يراه عميل، أو متقدم لوظيفة، أو جهة رقابية، أو أحد من الجمهور — أيًّا كان الجمهور. أما الأفلام التي تبدو داخلية فتنتشر داخليًا، ثم لا يراها من كان المفترض أن يتصرف بناءً عليها.',
    },
  ]

  const faqData = [
    {
      qEn: 'How long should a film production brief be?',
      aEn: 'Two pages is usually enough for a corporate film, and one page can carry a social or event project if it is tight. What matters is not the length but whether the objective, the audience, the fixed wording and the named decision-makers are all on the page. A brief that runs to twelve paragraphs of background and omits the approver is not a brief.',
      qAr: 'كم ينبغي أن يكون طول بريف إنتاج فيلم؟',
      aAr: 'صفحتان تكفيان عادةً لفيلم مؤسسي، وصفحة واحدة قد تكفي لمشروع تواصل اجتماعي أو تغطية فعالية إذا كانت محكمة. والمهم ليس الطول بل وجود الهدف والجمهور والصياغة الثابتة وأصحاب القرار بالاسم في الصفحة. فبريف يمتد إلى اثنتي عشرة فقرة من الخلفية ولا يذكر من يوافق ليس بريفًا.',
    },
    {
      qEn: 'Do I need to prepare a treatment or a script before contacting you?',
      aEn: 'No. A written brief is enough to start, and many of our best projects arrive as a short written brief and a conversation. We will come back with a treatment and a script for you to work on, because the writing is part of the job and it is easier to shape when the crew knows the location and the people.',
      qAr: 'هل أحتاج إلى إعداد معالجة بصرية أو سيناريو قبل التواصل معكم؟',
      aAr: 'لا. يكفي بريف مكتوب للبدء، وكثير من أفضل مشاريعنا تصل في صورة بريف قصير وحوار. وسنعود إليك بمعالجة بصرية وسيناريو تعمل عليهما، فالكتابة جزء من العمل، وهي أسهل في التشكيل حين يعرف الطاقم الموقع والأشخاص.',
    },
    {
      qEn: 'How far ahead should we brief you?',
      aEn: 'As early as the decision to make the film allows. The pre-production stage — research, writing, storyboard, casting, location scouting, permissions, and scheduling around your site — takes longer than the shoot itself. A brief given with several weeks of room lets that work happen properly. A brief given the week of the shoot leaves the crew producing on the day and reviewing at the end, which is the pattern that costs money.',
      qAr: 'كم من الوقت المسبق ينبغي أن نرسل إليكم البريف؟',
      aAr: 'في أبكر وقت يسمح به قرار إنتاج الفيلم. فمرحلة ما قبل الإنتاج — البحث والكتابة واللوحات واختيار مقدّمي العرض واستطلاع الموقع والأذونات والجدولة حول موقعكم — تستغرق أطول من التصوير نفسه. والبريف المُرسل قبل أسابيع يتيح عملًا صحيحًا لهذه المرحلة، والبريف المُرسل في أسبوع التصوير يجعل الطاقم يُنتج في اليوم ويراجع في النهاية، وهي الطريقة التي تكلّف مالًا.',
    },
    {
      qEn: 'Can you work with a brief written only in Arabic, or only in English?',
      aEn: 'Yes. We write and work in both, and a client brief in either language is fine. If the film is bilingual, we will script both versions natively rather than translating one into the other, because a line written for one language usually needs rewriting in the other to land properly.',
      qAr: 'هل يمكنكم العمل ببريف مكتوب بالعربية فقط، أو بالإنجليزية فقط؟',
      aAr: 'نعم. نكتب ونعمل باللغتين، والبريف المكتوب بأي منهما مقبول. وإذا كان الفيلم ثنائي اللغة، فسنكتب النسختين أصالةً لا بالترجمة من إحداهما إلى الأخرى، فالعبارة المكتوبة لإحدى اللغتين تحتاج عادةً إعادة كتابة في الأخرى كي تصل كما ينبغي.',
    },
    {
      qEn: 'Do you need to visit the location before the shoot?',
      aEn: 'Yes, whenever the location is not ours and access allows it. Walking the space before the shoot tells us how the light falls, what the noise floor is, where power is, and what has to move — all of which change the plan. If a visit is not possible, we ask for photographs, a floor plan, and a short video walkthrough, and we build the plan around those.',
      qAr: 'هل تزورون الموقع قبل التصوير؟',
      aAr: 'نعم، متى كان الموقع ليس موقعنا وسمح الدخول. فجولة في المكان قبل التصوير تبيّن لنا كيف يسقط الضوء، وما مستوى الضجيج، وأين الكهرباء، وما الذي يجب نقله — وكل ذلك يغيّر الخطة. وإذا تعذّرت الزيارة، نطلب صورًا ومخطط طابق وفيديو قصيرًا للموقع، ونبني الخطة على أساسها.',
    },
    {
      qEn: 'We already have a script. Can you shoot it?',
      aEn: 'Yes, and many projects start that way. We will read it against the objective and tell you honestly where it is strong and where it will not work on screen — for example a line that is written to be read rather than performed, or a sequence that cannot be filmed in the location you have in mind. That conversation is worth having before the shoot rather than in the edit.',
      qAr: 'لدينا سيناريو بالفعل. هل يمكنكم تصويره؟',
      aAr: 'نعم، وكثير من المشاريع تبدأ من هذه النقطة. سنقرأه في ضوء الهدف ونخبركم بصراحة أين قوته وأين لن ينجح على الشاشة — مثل عبارة كُتبت لتُقرأ لا لتُؤدّى، أو مشهد لا يمكن تصويره في الموقع الذي في ذهنكم. وهذه الجلسة تستحق أن تحدث قبل التصوير لا في المونتاج.',
    },
  ]

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkPillar = isArabic ? 'شركة إنتاج أفلام في السعودية' : 'film production company in Saudi Arabia'
  const linkCorporate = isArabic ? 'الأفلام المؤسسية' : 'corporate video production'
  const linkCommercial = isArabic ? 'إنتاج الإعلانات التجارية' : 'commercial production'
  const linkTraining = isArabic ? 'إنتاج فيديوهات التدريب' : 'training video production'
  const linkDigital = isArabic ? 'بناء المواقع بالذكاء الاصطناعي' : 'AI website development'
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

      {/* What a brief actually is */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? introHeadingAr : introHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? introAr : introEn}
        </p>
      </Section>

      {/* What the crew needs from you */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? needsHeadingAr : needsHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? needsAr : needsEn).map((s, i) => (
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

      {/* What actually moves the timeline */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? timelineHeadingAr : timelineHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? timelineAr : timelineEn}
        </p>
      </Section>

      {/* How to prepare a location properly */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? locationHeadingAr : locationHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? locationAr : locationEn}
        </p>
      </Section>

      {/* Where briefs go wrong */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? mistakesHeadingAr : mistakesHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {(isArabic ? mistakesAr : mistakesEn).map((s, i) => (
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
                {String(i + 1).padStart(2, '0')} — {s.title}
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
            href={`/${locale}/digital`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkDigital}
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
