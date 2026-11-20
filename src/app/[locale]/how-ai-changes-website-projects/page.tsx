import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'how-ai-changes-website-projects'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  const title = isArabic
    ? 'كيف يغيّر الذكاء الاصطناعي مشاريع المواقع في السعودية'
    : 'How AI Changes Website Projects in Saudi Arabia'
  const description = isArabic
    ? 'دليل عملي: ما الذي يتغير في مشروع موقعك حين تدخل المساعدات الذكية وأنظمة الذكاء الاصطناعي، ومتى يكون مفيدًا ومتى لا يكون.'
    : 'A practical guide to what changes in your website project when AI assistants are added, where they genuinely help, and where they do not.'

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

export default async function AiWebsiteProjectGuidePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'كيف يغيّر الذكاء الاصطناعي مشاريع المواقع'
    : 'How AI changes website projects'

  const h1En = 'How AI Changes Website Projects in Saudi Arabia'
  const h1Ar = 'كيف يغيّر الذكاء الاصطناعي مشاريع المواقع في السعودية'

  const heroEn =
    'Most Saudi businesses now arrive at a website conversation with the same question: should this site have AI in it? Sometimes the answer is yes, and sometimes it is no, and the difference is not technical taste. It is whether your business has a repeat question, a repeat request, or a repeat follow-up that currently reaches a human. A site for a clinic with a booking form that staff answer by hand every morning has a different AI case from a brochure site for a law practice, and neither has the same case as a restaurant whose guests write in Arabic at midnight asking about table availability. This guide is written for the person who signs the work rather than the person who builds it: a founder, a marketing lead, a business owner, or an operations manager. It explains what actually changes in a website project when an AI assistant is part of the scope, where the cost in effort sits, what you have to prepare before it can be useful, and the honest reasons to leave it out. We build AI-powered websites and software for businesses across Saudi Arabia from our base in Al Khobar, and we work with clients in Riyadh, Jeddah, Dammam, Tabuk and other cities, so what follows is drawn from how these projects are actually scoped and delivered.'
  const heroAr =
    'يصل معظم الأعمال السعودية اليوم إلى نقاش حول الموقع بالسؤال نفسه: هل ينبغي أن يحتوي هذا الموقع على ذكاء اصطناعي؟ وتكون الإجابة أحيانًا نعم وأحيانًا لا، والفرق ليس ذوقًا تقنيًا، بل وجود سؤال متكرر أو طلب متكرر أو متابعة متكررة تصل إلى إنسان اليوم. فموقع عيادة فيه نموذج حجز يجيب عنه الموظفون يدويًا كل صباح له حالة مختلفة عن موقع تعريفي لمكتب محاماة، ولا حالة أيّهما كحالة مطعم يكتب ضيوفه بالعربية في منتصف الليل ليسألوا عن توفر الطاولات. كُتب هذا الدليل لمن يوقّع العمل لا من يبنيه: مؤسس، أو مسؤول تسويق، أو صاحب عمل، أو مدير عمليات. يشرح ما الذي يتغير فعليًا في مشروع الموقع حين يكون مساعد ذكي جزءًا من النطاق، وأين يقع الجهد، وما الذي ينبغي تجهيزه قبل أن يصبح نافعًا، والأسباب الصادقة لتركه خارج المشروع. نبني مواقع وبرمجيات مزوّدة بالذكاء الاصطناعي للأعمال في أنحاء السعودية انطلاقًا من مقرنا في الخبر، ونعمل مع عملاء في الرياض وجدة والدمام وتبوك ومدن أخرى، فكل ما يلي مبني على كيفية تحديد نطاق هذه المشاريع وتنفيذها فعليًا.'

  const modelHeadingEn = 'What actually changes when AI enters the scope'
  const modelHeadingAr = 'ما الذي يتغير فعلًا حين يدخل الذكاء الاصطناعي في نطاق المشروع'

  const modelEn =
    'It is tempting to describe an AI-enabled website as a website with an extra feature. That framing produces the wrong brief and the wrong expectation, so it is worth being precise about what is different. In a conventional build, the site is finished when the pages are designed, the content is loaded, the forms send, and the pages are visible in search results. The work is complete and the site begins its life as a set of finished surfaces. In an AI-enabled build, the site is finished when those surfaces exist and something on them can answer a real question correctly, in the language it was asked, and hand the conversation to a person when it should. That is a different finish line. It means the project is no longer only about pages and layouts; it is also about the material the assistant will answer from, the questions it is allowed to touch, and the review process that keeps it honest after launch. The consequences run through everything. Content has to be written for retrieval rather than only for reading. Ownership of the answers becomes a business question rather than a marketing one. Testing changes character, because the failure mode of an assistant is a confident wrong answer rather than a broken link. And the ongoing cost is different too: a static site is largely done, while an assistant is a system that has to be watched. None of this is a reason to avoid AI in a website. It is a reason to decide deliberately which of it you are actually buying.'
  const modelAr =
    'يميل الناس إلى وصف الموقع المزوّد بالذكاء الاصطناعي بأنه موقع بميزة إضافية. لكن هذه الصياغة تنتج بريفًا خاطئًا وتوقعًا خاطئًا، ويستحق الأمر دقة. فالموقع التقليدي يكتمل حين تُصمَّم الصفحات، ويُحمَّل المحتوى، وتعمل النماذج، وتظهر الصفحات في نتائج البحث. عندها ينتهي العمل، وتبدأ حياة الموقع كصفحات مكتملة. أما الموقع المزوّد بالذكاء الاصطناعي فيكتمل حين توجد تلك الصفحات، ويستطيع شيء منها أن يجيب سؤالًا حقيقيًا إجابة صحيحة، وباللغة التي سُئل بها، ثم يحوّل المحادثة إلى إنسان عند اللزوم. وهذه نقطة انتهاء مختلفة. وهي تعني أن المشروع لم يعد يتعلق بالصفحات والتخطيطات فحسب، بل يصبح أيضًا عن المادة التي سيجيب منها المساعد، والأسئلة التي يُسمح له بلمسها، وعملية المراجعة التي تُبقيه صادقًا بعد الإطلاق. وتتجاوز النتائج ذلك كله. فيجب أن يُكتب المحتوى ليُسترجع لا ليُقرأ فحسب. ويتحوّل ملكية الإجابات إلى مسألة عمل لا مسألة تسويق. وتتغير طبيعة الاختبار، لأن عطل المساعد إجابة واثقة خاطئة لا رابط مكسور. كما تتغير الكلفة المستمرة: الموقع الثابت ينتهي تقريبًا، أما المساعد فهو نظام يحتاج إلى متابعة. وليس في هذا سبب لتجنّب الذكاء الاصطناعي في الموقع، بل سبب لاتخاذ قرار متعمد بشأن أي أجزاءه التي تشتريها فعلًا.'

  const layersHeadingEn = 'Three layers, and only one of them is the assistant'
  const layersHeadingAr = 'ثلاث طبقات، واحدة منها فقط هي المساعد'

  const layersEn = [
    {
      title: 'The visible layer: the site itself',
      body: 'Design, pages, speed, search visibility, and the way a person moves from a search result to a contact form. Almost every business still needs this layer to be right, and nothing about AI replaces it. A site that answers questions beautifully but is slow, unclear, or invisible in search has not solved the problem it was commissioned to solve. We treat this as the foundation that has to exist before an assistant adds anything.',
    },
    {
      title: 'The connected layer: what the site talks to',
      body: 'The booking system, the CRM, the catalogue, the ticketing tool, the messaging channel your customers already use. This layer decides whether an assistant can do real work or only talk about it. An assistant with no access to your systems can answer a question and then hand over an enquiry that someone has to type into a spreadsheet again. An assistant connected to the same systems your team already works in can complete the booking, log the lead, and update the record. This layer is ordinary engineering, and it is usually where most of the build effort sits.',
    },
    {
      title: 'The assistant layer: the conversation',
      body: 'The part people mean when they say AI. It answers, it qualifies, it follows up. It is also the layer that carries the most risk, because a confident wrong answer is worse for a business than no answer at all. A confident wrong answer in a film portfolio costs a wasted enquiry. A confident wrong answer about a clinical procedure, a legal position, a payment term, or a delivery date costs something considerably worse. This is why the assistant layer needs a written boundary, a defined handoff, and a review process, and why it should never be the first thing you add to a site.',
    },
  ]

  const layersAr = [
    {
      title: 'الطبقة المرئية: الموقع نفسه',
      body: 'التصميم والصفحات والسرعة وظهور محركات البحث، وطريقة انتقال الشخص من نتيجة بحث إلى نموذج تواصل. وما زال معظم الأعمال يحتاج هذه الطبقة لتكون صحيحة، ولا يغيّر الذكاء الاصطناعي ذلك. فالموقع الذي يجيب عن الأسئلة ببراعة لكنه بطيء أو غامض أو غائب عن البحث لم يحل المشكلة التي كلّفته بحلّها. ونتعامل مع هذه الطبقة على أنها الأساس الذي يجب أن يوجد قبل أن يضيف المساعد أي شيء.',
    },
    {
      title: 'الطبقة المتصلة: ما يتحدث إليه الموقع',
      body: 'نظام الحجز، ونظام إدارة العملاء، والكتالوج، وأداة التذاكر، وقناة المراسلة التي يستخدمها عملاؤك بالفعل. تحدد هذه الطبقة ما إذا كان المساعد قادرًا على عمل حقيقي أم يتكلم عن العمل فقط. فالمساعد الذي لا يصل إلى أنظمتك قد يجيب عن سؤال ثم يسلّم استفسارًا يتعين على أحد أن يكتبه في ملف ورقي من جديد. أما المساعد المتصل بالأنظمة نفسها التي يعمل بها فريقك فيستطيع إتمام الحجز وتسجيل العميل وتحديث السجل. وهذه طبقة هندسة عادية، وهي غالبًا ما تستهلك أكثر جهد البناء.',
    },
    {
      title: 'طبقة المساعد: المحادثة',
      body: 'الجزء الذي يقصده الناس حين يقولون ذكاءً اصطناعيًا. يجيب ويؤهّل ويتابع. وهي أيضًا الطبقة الأكثر خطرًا، لأن الإجابة الواثقة الخاطئة أسوأ على العمل من انعدام الإجابة. فالإجابة الواثقة الخاطئة في ملف أعمال فيلم تكلّف استفسارًا ضائعًا، والإجابة الواثقة الخاطئة عن إجراء عولجي أو موقف قانوني أو شرط دفع أو موعد توصيل تكلّف شيئًا أثقل بكثير. لهذا تحتاج طبقة المساعد حدًّا مكتوبًا وتسليمًا محددًا وعملية مراجعة، ولهذا لا ينبغي أن تكون أول ما تضيفه إلى موقعك.',
    },
  ]

  const prepareHeadingEn = 'What you have to prepare before it can be useful'
  const prepareHeadingAr = 'ما الذي ينبغي تجهيزه قبل أن يصبح نافعًا'

  const prepareEn =
    'An assistant is only as good as the material it is allowed to answer from, and that material is a business deliverable, not a technical one. Before a project can start, somebody has to decide what is true about the business and write it down: the services and their limits, the prices and terms you are willing to publish, the delivery or lead times, the returns and cancellations, the opening hours, the escalation path, and the questions your team answers every single day in nearly the same words. That last one matters more than people expect. The repeat questions are the whole business case, because they are the only volume where answering automatically saves real time. In a Saudi business that usually means questions asked in Arabic by customers who are messaging outside working hours, and questions that arrive in English from people who work with an international counterparty. When the answers are not written down anywhere, an assistant cannot be trained on them, and the team ends up maintaining the same knowledge in the chat window instead of on the website where it belongs. The second preparation is about limits. Decide in advance which subjects the assistant must not answer on its own. For many businesses this is a short and specific list: medical advice, legal interpretation, anything that creates a contractual commitment, anything that depends on a price that changes, and anything the assistant has not been given current information about. Writing that list before launch is far easier than correcting it afterwards, and it is the difference between a deployment that holds its shape and one that erodes trust within weeks.'
  const prepareAr =
    'المساعد لا يكون أفضل إلا بقدر المادة التي يُسمح له بالإجابة منها، وهذه المادة مخرَج من العمل لا مخرَج تقني. وقبل بدء المشروع، لا بد أن يقرر أحد ما هو الصحيح عن العمل ويكتبه: الخدمات وحدودها، والأسعار والشروط التي أنتم مستعدون لنشرها، ومدد التسليم أو التوريد، وسياسة الإرجاع والإلغاء، ومواعيد العمل، ومسار التصعيد، والأسئلة التي يجيب عنها فريقكم كل يوم بالصيغة نفسها تقريبًا. وآخر هذه البنود أهم مما يبدو. الأسئلة المتكررة هي حالة العمل كلها، لأنها الحجم الوحيد الذي يوفّر فيه الإجابة الآلية وقتًا حقيقيًا. وفي العمل السعودي، تعني الأسئلة غالبًا أسئلة يطرحها العملاء بالعربية عبر الرسائل خارج ساعات العمل، وأسئلة تأتي بالإنجليزية من أشخاص يتعاملون مع جهة دولية. وحين لا تكون الإجابات مكتوبة في أي مكان، لا يمكن تدريب المساعد عليها، فينتهي الأمر إلى أن يحتفظ الفريق بالمعرفة نفسها في نافذة المحادثة بدل أن يضعها في الموقع حيث تنتمي. أما التجهيز الثاني فهو عن الحدود. قرر مسبقًا أي المواضيع لا يجوز للمساعد الإجابة عنها منفردًا. وللأعمال كثيرة تكون هذه قائمة قصيرة ومحددة: النصيحة الطبية، والتفسير القانوني، وكل ما ينشئ التزامًا تعاقديًا، وكل ما يعتمد على سعر متغير، وكل ما لا تتوفر للمساعد حوله معلومة حديثة. وكتابة هذه القائمة قبل الإطلاق أسهل بكثير من تصحيحها بعده، وهي الفرق بين نشر يحفظ شكله ونشر يستهلك الثقة خلال أسابيع.'

  const scopeHeadingEn = 'What changes in the way the project runs'
  const scopeHeadingAr = 'ما الذي يتغير في طريقة إدارة المشروع'

  const scopeEn = [
    {
      title: 'The brief needs a second half',
      body: 'A traditional website brief describes the business and the pages. An AI-enabled brief has to add the repeat questions, the answers to them, the subjects that are out of bounds, and the moment a human takes over. Half of the project is now content in a form the assistant can use, and that content has to be written and approved before the assistant is switched on, not after.',
    },
    {
      title: 'Testing becomes a conversation, not a checklist',
      body: 'A broken button is obvious and gets fixed. A plausible wrong answer is neither. Testing an assistant means asking it the questions your customers actually ask — including the awkward ones, the ones with two valid answers, and the ones whose answer changed last month — and reading the replies as a business owner would read them, looking for anything that could not be defended.',
    },
    {
      title: 'Launch is the midpoint, not the finish',
      body: 'The site goes live and the assistant starts handling real conversations, which is when the real material surfaces: the question nobody thought to write an answer for, the wording a customer used that means something different from what you assumed. The first weeks of live conversations are the most informative part of the project, and they only happen if there is an agreed way to review them and correct what comes up.',
    },
    {
      title: 'Ownership has to be named',
      body: 'Somebody in the business has to own the assistant’s answers after launch, the same way somebody owns the website content. Without a named owner, errors are noticed by customers rather than by you, and corrections happen in the chat window instead of in the source material, so the same mistake returns. This is the least technical part of the project and the one most often left unassigned.',
    },
    {
      title: 'The languages are not interchangeable',
      body: 'In the Kingdom, a bilingual site is not one site with a translation switch. The register, the level of formality, the way questions are actually phrased, and the terms customers use for your products all differ between Arabic and English. An assistant that answers correctly in one language and awkwardly in the other damages the brand in the language where it feels less natural, and that is usually the language the business leads with.',
    },
  ]

  const scopeAr = [
    {
      title: 'يحتاج البريف إلى نصف ثانٍ',
      body: 'بريف الموقع التقليدي يصف العمل والصفحات. أما بريف الموقع المزوّد بالذكاء الاصطناعي فعليه أن يضيف الأسئلة المتكررة وإجاباتها والمواضيع المحظورة واللحظة التي يتدخل فيها الإنسان. صار نصف المشروع محتوى في صيغة يستطيع المساعد استخدامها، وهذا المحتوى يجب أن يُكتب ويُعتمد قبل تشغيل المساعد لا بعده.',
    },
    {
      title: 'الاختبار يصبح محادثة لا قائمة تحقق',
      body: 'الزر المعطوب واضح ويُصلح. أما الإجابة الخاطئة المعقولة فلا هي ولا ذاك. واختبار المساعد يعني أن تسأله الأسئلة التي يطرحها عملاؤك فعلًا — بما فيها الصعبة، وبما فيها ذات إجابتين صحيحتين، وبما فيها التي تغيرت إجابتها الشهر الماضي — وأن تقرأ الردود كما يقرأها صاحب العمل، بعين ما يبحث عن أي شيء لا يمكن الدفاع عنه.',
    },
    {
      title: 'الإطلاق هو المنتصف لا النهاية',
      body: 'يُنشر الموقع ويبدأ المساعد في التعامل مع محادثات حقيقية، وعندها تظهر المادة الحقيقية: السؤال الذي لم يفكر أحد في كتابة إجابة له، والعبارة التي استخدمها عميل ومعناها مختلف عن ما افترضته. والأسابيع الأولى من المحادثات المباشرة هي أكثر أجزاء المشروع إفادة، وهي تحدث فقط إذا كان هناك طريقة متفق عليها لمراجعتها وتصحيح ما يرد فيها.',
    },
    {
      title: 'يجب تسمية المسؤول',
      body: 'لا بد أن يكون في العمل من يملك إجابات المساعد بعد الإطلاق، كما يوجد من يملك محتوى الموقع. ومن دون مالك مسمى، تُكتشف الأخطاء من العملاء لا منك، وتُصحَّح في نافذة المحادثة بدل المادة المصدرية، فتعود الأخطاء نفسها. وهذه أقل جزء تقني في المشروع وأكثر ما يُترك بلا تحديد.',
    },
    {
      title: 'اللغتان ليستا متكافئتين',
      body: 'في المملكة، الموقع ثنائي اللغة ليس موقعًا واحدًا مع مفتاح ترجمة. فدرجة الخطاب، ومستوى الرسمية، وصياغة الأسئلة الفعلية، والمصطلحات التي يستخدمها العملاء لمنتجاتك تختلف كلها بين العربية والإنجليزية. والمساعد الذي يجيب إجابة صحيحة بإحدى اللغتين وعبارة رخيكة في الأخرى يضر بالعلامة في اللغة التي تبدو فيها أقل طبيعية، وهي عادةً اللغة التي تفتتح بها الشركة أعمالها.',
    },
  ]

  const faqData = [
    {
      qEn: 'How is an AI website different from a website with a chat widget?',
      aEn: 'A chat widget is a separate window that talks to a general model which knows nothing about your business unless someone has connected it to your material and your systems. An AI assistant is built on your own approved content and connected to the tools your team already uses, so it can answer from your policies, complete a booking, log a lead, and hand over properly when it should. The distinction is the source of the answer and the ability to act on it, not the presence of a chat window.',
      qAr: 'بماذا يختلف الموقع المزوّد بالذكاء الاصطناعي عن موقع فيه نافذة محادثة؟',
      aAr: 'نافذة المحادثة نافذة منفصلة تتحدث إلى نموذج عام لا يعرف عن عملك شيئًا ما لم يصله أحد بمادتك وبأنظمتك. أما المساعد الذكي فيُبنى على محتواك المعتمد ويرتبط بالأدوات التي يستخدمها فريقك، فيجيب من سياساتك، ويكمل الحجز، ويسجّل العميل، ويسلّم الأمر بشكل صحيح عند اللزوم. والفرق هو مصدر الإجابة وقدرتها على التصرف، لا وجود نافذة محادثة.',
    },
    {
      qEn: 'Does our website need to be rebuilt to have AI on it?',
      aEn: 'Usually not. If your current site is fast, clear, visible in search, and does what it should, an assistant can be added to it and connected to the systems behind it. A rebuild is worth considering when the current site cannot carry the change at all — it is slow, it cannot be maintained, or its content cannot be edited by the people who should own it. In that case the conversation is about the site, not about AI.',
      qAr: 'هل يحتاج موقعنا إلى إعادة بناء كي يضم الذكاء الاصطناعي؟',
      aAr: 'عادة لا. فإذا كان موقعك الحالي سريعًا وواضحًا وظاهرًا في البحث ويؤدي ما ينبغي، فيمكن إضافة مساعد إليه وربطه بالأنظمة التي خلفه. أما إعادة البناء فتجري التفكير فيها حين لا يستطيع الموقع الحالي حمل التغيير أصلًا — كان بطيئًا، أو تعذّر صيانته، أو لم يعد بالإمكان تعديل محتواه من قِبل الذين ينبغي أن يملكوه. وفي هذه الحالة يكون الحديث عن الموقع لا عن الذكاء الاصطناعي.',
    },
    {
      qEn: 'How much of our team’s time will this take?',
      aEn: 'The heaviest part is not the technology, it is the writing and the answering of questions from people who know the business. In practice that means a few conversations with whoever answers your customer questions, plus someone to write down the answers properly and a named owner for corrections afterwards. We can carry the engineering and the testing; we cannot write the answers for you, because we do not know your business.',
      qAr: 'كم من وقت فريقنا سيستغرق هذا؟',
      aAr: 'أثقل جزء ليس التقنية، بل كتابة الإجابات عن الأسئلة على يد من يعرف العمل. ومن حيث الممارسة، يعني ذلك بضع محادثات مع من يجيب عن أسئلة عملائك، مع شخص يكتب الإجابات كتابة صحيحة ومالك مسمى للتصحيحات لاحقًا. ونستطيع نحن تحمل الهندسة والاختبار، ولا نستطيع أن نكتب الإجابات عنكم لأننا لا نعرف عملكم.',
    },
    {
      qEn: 'What happens if the assistant gives a wrong answer?',
      aEn: 'That is the reason for the written boundary, the handoff, and the review process, and it is why the assistant is grounded in your own approved material rather than allowed to improvise. Every assistant we deploy is told what it may answer, what must reach a person, and how to hand over with the customer’s message and context attached. We test against the questions your team actually receives, and we watch early conversations before the assistant is left to work more on its own.',
      qAr: 'ماذا يحدث إن أعطى المساعد إجابة خاطئة؟',
      aAr: 'هذا هو سبب الحد المكتوب والتسليم وعملية المراجعة، ولهذا يُبنى المساعد على مادتك المعتمدة بدل أن يُسمح له بالاختراع. كل مساعد ننشره يُبلَّغ بما يجوز له الإجابة عنه، وما يجب أن يصل إلى إنسان، وكيف يسلّم مع رسالة العميل والسياق المرفق. ونختبره على الأسئلة التي يصل فريقك فعلًا، ونراقب المحادثات المبكرة قبل أن يترك المساعد يعمل بمفرده أكثر.',
    },
    {
      qEn: 'Will Arabic and English behave the same way?',
      aEn: 'Not automatically. The assistant is configured to answer in the language the customer wrote in and to switch when the customer switches, and the internal records it creates follow the language your team works in. But the answers themselves still have to be written in both languages with the right register and the right terms, and an answer that reads naturally in English can sound wrong in Arabic if it was translated rather than written.',
      qAr: 'هل يتصرف المساعد بالعربية والإنجليزية بالطريقة نفسها؟',
      aAr: 'ليس تلقائيًا. يُعدّ المساعد ليجيب باللغة التي كتب بها العميل وأن يتحول حين يتحول العميل، وتسجّل السجلات الداخلية التي ينشئها باللغة التي يعمل بها فريقك. لكن الإجابات نفسها لا تزال تحتاج إلى أن تُكتب باللغتين بدرجة خطاب ومصطلحات صحيحة، والإجابة التي تقرأ طبيعيًا بالإنجليزية قد تبدو خاطئة بالعربية إن ترجمت بدل أن تُكتب.',
    },
  ]

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkDigital = isArabic ? 'المنصات الرقمية' : 'digital platforms'
  const linkAssistants = isArabic ? 'المساعدون الأذكياء والأتمتة' : 'AI assistants and automation'
  const linkWebsites = isArabic ? 'بناء مواقع الأعمال' : 'business website development'
  const linkClinics = isArabic ? 'مواقع الذكاء الاصطناعي للعيادات' : 'AI websites for clinics'
  const linkRestaurants = isArabic ? 'مواقع الذكاء الاصطناعي للمطاعم' : 'AI websites for restaurants'

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

      {/* What actually changes */}
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

      {/* Three layers */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? layersHeadingAr : layersHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? layersAr : layersEn).map((s, i) => (
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

      {/* What to prepare */}
      <Section elevated>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}>
          {isArabic ? prepareHeadingAr : prepareHeadingEn}
        </p>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--body)',
          color: 'var(--color-text-dim)', lineHeight: 1.8,
          maxWidth: '68ch',
        }}>
          {isArabic ? prepareAr : prepareEn}
        </p>
      </Section>

      {/* How the project runs */}
      <Section>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 500,
          fontSize: 'var(--eyebrow)', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
          marginBottom: '2.5rem', textAlign: 'center',
        }}>
          {isArabic ? scopeHeadingAr : scopeHeadingEn}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {(isArabic ? scopeAr : scopeEn).map((s, i) => (
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
            href={`/${locale}/digital`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkDigital}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/services/ai-assistants-automation-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkAssistants}
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
            href={`/${locale}/ai-websites-for-clinics-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkClinics}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/ai-websites-for-restaurants-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkRestaurants}
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
