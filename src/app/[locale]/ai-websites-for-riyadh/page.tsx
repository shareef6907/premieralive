import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-riyadh'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع الذكاء الاصطناعي للرياض | بريمييرا لايف'
      : 'AI Websites for Riyadh | Premiera Live',
    description: isArabic
      ? 'نبني مواقع ذكاء اصطناعي ثنائية اللغة للرياض تجيب عن أسئلة العملاء وتقود الطلبات الجادة إلى فريق المبيعات في دقائق.'
      : 'Bilingual AI websites for Riyadh businesses. We build sites that answer buyer questions and route qualified enquiries to your team in minutes.',
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
        ? 'مواقع الذكاء الاصطناعي للرياض | بريمييرا لايف'
        : 'AI Websites for Riyadh | Premiera Live',
      description: isArabic
        ? 'مواقع ثنائية اللغة لعلامات الرياض تجيب عن أسئلة المشترين وتقود الطلبات المؤهلة إلى فريقك.'
        : 'Bilingual websites for Riyadh brands that answer buyer questions and route qualified leads to your team.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع الذكاء الاصطناعي للرياض | بريمييرا لايف'
        : 'AI Websites for Riyadh | Premiera Live',
      description: isArabic
        ? 'مواقع ثنائية اللغة لعلامات الرياض تجيب عن الأسئلة العملية وتوجّه الطلبات الجادة إلى الفريق.'
        : 'Bilingual sites for Riyadh brands that answer practical questions and route serious enquiries to the team.',
    },
  }
}

export default async function AIWebsitesRiyadhPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic
    ? 'مواقع ذكاء اصطناعي للرياض'
    : 'AI Websites for Riyadh'

  const h1En = 'AI Websites for Riyadh'
  const h1Ar = 'مواقع الذكاء الاصطناعي للرياض'

  const heroEn = `Most of the Saudi web work that gets talked about is described in the abstract: an assistant on the site, a chatbot in the corner, content generated in bulk. That description lands badly in Riyadh, where the buyers a business actually wants — a procurement lead comparing three suppliers, a director checking whether a firm handles their sector, a customer with a problem they want solved now — arrive from search and decide in the first minute whether the company in front of them is real, capable, and reachable. A generic AI layer does not help them. What helps is a site built around the questions those buyers actually ask, in the language they actually ask them in, answered from material the company has already published and stands behind. Premiera Live builds exactly that for businesses in Riyadh: bilingual websites where the AI assistant is grounded in your own services, sectors, and policies, where the qualification happens before the sales team is involved, and where the site is built to hold its weight against the competitors two tabs away in the same search result. We work from our base in Al Khobar and deliver to Riyadh clients remotely and on site, with the same team that handles the film and video work for companies based in the capital.`
  const heroAr = `أغلب ما يُقال عن العمل على المواقع في السعودية يوصفه الناس بصفة مجرّدة: مساعد ذكي على الموقع، وروبوت في زاوية، ومحتوى يُنتج بالجملة. وهذا الوصف ينطبق على نحو ضعيف في الرياض، حيث يصل المشترون الذين تريدهم أعمالك فعلًا — مسؤول مشتريات يقارن ثلاثة مورّدين، ومدير يتحقق مما إذا كانت الشركة تخدم قطاعه، وعميل لديه مشكلة يريد حلها الآن — من محرك البحث، ويقرّر خلال الدقيقة الأولى إن كانت الشركة التي أمامه حقيقية وكفؤة ويمكن الوصول إليها. والمساعد الذكي العام لا ينفعهم. أما ما ينفعهم فهو موقع مبني حول الأسئلة التي يطرحها المشترون فعلًا، باللغة التي يطرحونها بها، مُجابًا من مواد نشرتها الشركة بنفسها وتلتزم بها. تبني بريمييرا لايف هذا بالتحديد للأعمال في الرياض: مواقع ثنائية اللغة يكون فيها المساعد الذكي مستندًا إلى خدماتك وقطاعاتك وسياساتك، وتتم فيها عملية التأهيل قبل تدخّل فريق المبيعات، ويكون الموقع مبنيًا ليصمد أمام منافسيه في تبويبين آخرين ضمن نتيجة البحث نفسها. نعمل من مقرنا في الخبر ونسلّم لعملائنا في الرياض عن بُعد وعلى الموقع، بالفريق نفسه الذي يتولى أعمال الأفلام والفيديو للشركات التي مقرها في العاصمة.`

  const whyHeadingEn = 'Why Riyadh buyers behave differently online'
  const whyHeadingAr = 'لماذا يتصرف مشترون الرياض بشكل مختلف على الإنترنت'

  const whyEn = `Riyadh is not one market with a bigger population. It is several markets stacked on top of each other, and they look for different things on the same website. A hospital procurement officer, a contracting company, a training provider, a law office, and a restaurant group all search from the same city on the same devices, and they each arrive with a different question and a different definition of what counts as a credible supplier. The failure mode is a site that tries to speak to all of them at once. It becomes generic, the specific detail that would let a buyer confirm fit disappears, and the buyer leaves to compare two competitors who had the courage to be specific. The second Riyadh-specific factor is language. The same person may run a business with English contracts, deal with staff in Arabic, and read marketing material in both, often depending on who is in the room and what the meeting is about. A site that offers one language and treats the other as a machine-translated afterthought signals to exactly the decision-makers in the capital that the company will be equally careless with the work itself. That is why every Riyadh site we build has its Arabic and English versions written and structured together, with the assistant able to hold a real conversation in either. The third factor is timing. In a city where most decisions are made by people with a full schedule and several suppliers in front of them, the site has to do the qualifying work on its own, because the alternative is that the first person to call picks up the enquiry and spends the next half hour explaining what the company does.`
  const whyAr = `الرياض ليست سوقًا واحدًا بعدد أكبر من السكان. إنها عدة أسواق مكدّسة فوق بعضها، ولكل منها ما تبحث عنه على الموقع نفسه. مسؤول مشتريات في مستشفى، وشركة مقاولات، ومقدّم تدريب، ومكتب محاماة، ومجموعة مطاعم؛ جميعهم يبحثون من المدينة نفسها وعلى الأجهزة نفسها، وكل واحد منهم يصل بسؤال مختلف وتعريف مختلف لما يُعدّ مورّدًا موثوقًا. والنمط الفاشل هو موقع يحاول مخاطبة الجميع دفعة واحدة. فيصبح عامًّا، ويختفي التفصيل الذي كان能让 المشتري يؤكد الملاءمة، فيغادر ليقارن بين منافسين كانا شجاعين بما يكفي ليكونا محددين. والعامل الثاني المرتبط بالرياض هو اللغة. فالشخص نفسه قد يدير أعمالًا بعقود إنجليزية، ويتعامل مع الموظفين بالعربية، ويقرأ المواد التسويقية باللغتين، وغالبًا بحسب من في الغرفة وموضوع الاجتماع. والموقع الذي يقدّم لغة واحدة ويعامل الأخرى كترجمة آلية متأخرة يوجّه إشارة إلى صانعي القرار في العاصمة تحديدًا بأن الشركة ستُهمل العمل نفسه بالقدر نفسه. لهذا السبب يُبنى كل موقع نعمل عليه في الرياض بلغتيه معًا منذ البنية الأولى، ويكون فيه المساعد قادرًا على إدارة حوار حقيقي بأي منهما. والعامل الثالث هو التوقيت. فمدينة تجري فيها أغلب القرارات على يد أشخاص جدولهم مزدحم وأمامهم عدة مورّدين، لا بد أن يقوم الموقع بمهمة التأهيل بنفسه، لأن البديل هو أن يتصل أول من يرد على الاستفسار فيقضي نصف ساعة في شرح ما تفعله الشركة.`

  const capabilitiesHeadingEn = 'What we build into a Riyadh site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في موقع الرياض'

  const capabilitiesEn = [
    {
      title: 'An assistant grounded in your own material',
      body:
        'The assistant answers from what your company has already published — the sectors you serve, how your process runs, what a first meeting involves, what you do not take on — so a buyer can resolve the practical questions without waiting for a callback.',
    },
    {
      title: 'Sector pages built for how buyers search',
      body:
        'Pages organised around the sector or service the buyer is looking for, rather than around your internal department names, each written to answer the first question that visitor actually has.',
    },
    {
      title: 'Enquiries that arrive already qualified',
      body:
        'A structured enquiry form that captures what the buyer needs, which sector it belongs to, and where they are in the process, so the first conversation starts from information instead of from a blank page of notes.',
    },
    {
      title: 'Arabic and English built together, not translated afterwards',
      body:
        'Both versions written and structured from the first draft, so neither becomes a thin summary of the other, and the assistant holds a real conversation in either language.',
    },
    {
      title: 'Content structured so your team can maintain it',
      body:
        'A structure the internal team can operate after handover, so adding a sector, revising a service description, or updating a policy does not require a developer or a rebuild.',
    },
    {
      title: 'Clear boundaries between what the site says and what a person confirms',
      body:
        'The site states what the company does and how the process generally runs. The assistant hands anything that depends on a specific case or a specific request to a person with the visitor’s context attached.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'مساعد يستند إلى موادك المنشورة',
      body:
        'يجيب المساعد مما نشرته الشركة بالفعل — القطاعات التي تخدمها، وكيف يسير المسار، وما الذي تنطوي عليه الجلسة الأولى، وما لا تقبله الشركة — فيتمكن المشتري من حل الأسئلة العملية دون انتظار معاودة الاتصال.',
    },
    {
      title: 'صفحات مبنية على طريقة بحث المشترين',
      body:
        'صفحات تُنظَّم حول القطاع أو الخدمة التي يبحث عنها المشتري لا حول أسماء الأقسام الداخلية لديك، وتُكتب كل واحدة للإجابة عن أول سؤال يملكه ذلك الزائر فعلًا.',
    },
    {
      title: 'استفسارات تصل مؤهلة سلفًا',
      body:
        'نموذج استفسار منظم يلتقط ما يحتاجه المشتري، والقطاع الذي يندرج تحته، ومرحلة العملية التي يمر بها، فتصلك المحادثة الأولى بمعلومة بدل صفحة فارغة من الملاحظات.',
    },
    {
      title: 'العربية والإنجليزية مبنيتان معًا لا مترجمتان لاحقًا',
      body:
        'تُكتب النسختان وتُبنيان معًا منذ المسودة الأولى، فلا تتحول إحداهما إلى ملخص رقيق للأخرى، ويحافظ المساعد على حوار حقيقي بأي من اللغتين.',
    },
    {
      title: 'محتوى منظم يستطيع فريقك إدارته',
      body:
        'بنية يستطيع الفريق الداخلي تشغيلها بعد التسليم، فإضافة قطاع أو تعديل وصف خدمة أو تحديث سياسة لا تتطلب مطوّرًا ولا إعادة بناء.',
    },
    {
      title: 'حدود واضحة بين ما يقوله الموقع وما يؤكده الإنسان',
      body:
        'يصف الموقع ما تقوم به الشركة وكيف يسير المسار عمومًا، ويسلّم المساعد أي ما يعتمد على حالة بعينها أو طلب بعينه إلى إنسان مع سياق ما وصفه الزائر.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn = `We build these sites for businesses based in Riyadh that have real substance to publish and have never moved any of it onto the web in a form a buyer can use. It suits a company whose internal team already answers the same questions every week — what the engagement involves, what the process looks like, which requests you take and which you decline — but where that knowledge sits in people's heads, in email threads, or in documents nobody opens. It also suits a business whose website was built once for a brochure and has not been touched since, where the enquiry form still works but nothing on the site helps a buyer decide. And it suits a company working across two audiences at once: a board that wants English, a client base that wants Arabic, a sales team that needs both in the same page depending on who is reading it. In every case the site is judged by one outcome: whether a buyer who arrives from search in Riyadh can establish what the company does, whether it fits their situation, and what the next step is, without a single phone call to find out.`
  const fitAr = `نبني هذه المواقع للشركات التي مقرها في الرياض ولديها مادة حقيقية للنشر، ولم تنقل أيًّا منها إلى الويب بالشكل الذي ينفع المشتري. وهي مناسبة لشركة يكون فيها فريقها الداخلي يجيب عن الأسئلة نفسها كل أسبوع — ما الذي ينطوي عليه التعاقد، وكيف يبدو المسار، وما الطلبات التي تقبلها الشركة وما الطلبات التي تتجنّبها — بينما تبقى هذه المعرفة في رؤوس الناس أو في رسائل بريد أو في مستندات لا يفتحها أحد. وهي كذلك مناسبة لأعمال بُني موقعها مرة واحدة للعرض على بروشور ولم يُس منذ ذلك الحين، فيظل نموذج الاستفسار يعمل دون أن يساعد شيء في الموقع المشتري على اتخاذ قرار. وهي مناسبة أيضًا لشركة تعمل جمهورين معًا: مجلس إدارة يريد الإنجليزية، وقاعدة عملاء تريد العربية، وفريق مبيعات يحتاج الاثنين في الصفحة نفسها بحسب من يقرأ. ويُقاس الموقع في كل حالة بنتيجة واحدة: هل يستطيع مشتري يصل من البحث في الرياض أن يحدد ما تفعله الشركة، وهل تناسبه حالته، وما الخطوة التالية، دون مكالمة هاتفية واحدة ليعرف ذلك.`

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
        'We decide what the assistant may answer, which questions always reach a person, and which sectors deserve their own pages rather than a paragraph inside a general page.',
    },
    {
      step: 'Bilingual design and build',
      body:
        'The structure, sector pages, enquiry path, and explanatory sections are built in Arabic and English together, on a foundation the client’s own team can maintain after handover.',
    },
    {
      step: 'Assistant grounding and enquiry preparation',
      body:
        'The assistant is connected to the company’s published material and the enquiry form is prepared to capture what the team actually needs in order to respond properly.',
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
        'نحدد ما يمكن للمساعد الإجابة عنه، وأي الأسئلة تصل إلى إنسان دائمًا، وأي القطاعات تستحق صفحاتها الخاصة بدل فقرة داخل صفحة عامة.',
    },
    {
      step: 'التصميم والبناء ثنائي اللغة',
      body:
        'تُبنى البنية وصفحات القطاعات ومسار الاستفسار والأقسام التوضيحية بالعربية والإنجليزية معًا، على أساس يستطيع فريق العميل إدارته بعد التسليم.',
    },
    {
      step: 'تدريب المساعد وتجهيز نموذج الاستفسار',
      body:
        'يُربط المساعد بمواد الشركة المنشورة، ويُجهَّز نموذج الاستفسار ليالتقط ما يحتاجه الفريق فعلًا ليرد ردًا صحيحًا.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body:
        'نطلق الموقع مع المراقبة، ونراجع الأسئلة التي يطرحها الزوار والصفحات التي يتركونها، ونحسّن المحتوى وحدود المساعد بناءً على ما نراه فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn = `The site is built on a stack your own team can operate after handover, and the assistant is configured against the company’s content rather than rebuilt for every new sector or every revision. That is what lets a new service line reach the site without a redevelopment, and what keeps the Arabic and English versions in step because both come from the same source. Where the business already runs a CRM, a booking tool, a document workflow, or a client portal, the site connects to those rather than asking your team to maintain a second copy of the same information. The company keeps ownership of the site, the content, the documents, and the accounts. The AI layer sits on top as a service we review and refine together, and the boundary between what the assistant answers and what a person confirms is part of the design rather than a setting discovered after a buyer has been given a misleading answer about a specific quote. For clients in Riyadh we work the same way we work on the film side: remotely where the work allows it, and on site when the project needs a face-to-face conversation, with our base remaining in Al Khobar.`
  const stackAr = `يُبنى الموقع على مكدس يستطيع فريقك تشغيله بعد التسليم، ويُضبط المساعد على محتوى الشركة بدل أن يُعاد بناؤه في كل قطاع جديد أو في كل مراجعة. وهذا ما يتيح إضافة خط خدمة جديد إلى الموقع دون إعادة تطوير، وما يبقي النسختين العربية والإنجليزية متزامنتين لأنهما تُنتجان من المصدر نفسه. وإذا كان العمل يشغّل اليوم نظام إدارة علاقات مع العملاء، أو أداة حجز، أو سير عمل للمستندات، أو بوابة عميل، فإن الموقع يتصل بتلك الأنظمة بدل أن يطلب من فريقك صيانة نسخة ثانية من المعلومة نفسها. وتبقى ملكية الموقع والمحتوى والمستندات والحسابات للشركة. وتُوضع طبقة الذكاء الاصطناعي فوقه كخدمة نراجعها ونحسّنها معًا، ويكون الفصل بين ما يجيب عنه المساعد وما يؤكده الإنسان جزءًا من التصميم لا إعدادًا يُكتشف بعد أن يتلقى المشتري إجابة مضللة عن عرض سعر بعينه. وللعملاء في الرياض نعمل بالطريقة نفسها التي نعمل بها في جانب الأفلام: عن بُعد حيثما يسمح العمل، وعلى الموقع حين يحتاج المشروع إلى حوار مباشر، وتبقى قاعدتنا في الخبر.`

  const faqData = [
    {
      qEn: 'Where is your base, and how do you work with Riyadh clients?',
      aEn:
        'Our base is in Al Khobar, which is where the company is based and where our team works. We serve Riyadh clients remotely and on site as the project requires. Nothing on this page claims a presence in Riyadh that does not exist.',
      qAr: 'أين مقرّكم، وكيف تعملون مع عملائكم في الرياض؟',
      aAr:
        'مقرّنا في الخبر، وهناك تكون الشركة ومقرّ فريقنا. ونخدم عملائنا في الرياض عن بُعد وعلى الموقع حسب ما يتطلبه المشروع. ولا تتضمن هذه الصفحة أي حضور في الرياض غير قائم.',
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
        'It answers practical, factual questions from the company’s own published material and routes everything that depends on a specific request to a person, with the visitor’s context attached so nothing is repeated.',
      qAr: 'ماذا يفعل المساعد الذكي فعليًا في الموقع؟',
      aAr:
        'يجيب عن الأسئلة العملية والوقائعية من مواد الشركة المنشورة، ويحوّل كل ما يعتمد على طلب بعينه إلى إنسان مع إرفاق سياق الزائر، فلا يتكرر شيء.',
    },
    {
      qEn: 'Can our own team update the content afterwards?',
      aEn:
        'Yes. The structure is built for the client’s team to maintain after handover, so adding a sector or revising a service description does not require a developer.',
      qAr: 'هل يستطيع فريقنا تحديث المحتوى لاحقًا؟',
      aAr:
        'نعم. بُنيت البنية ليتمكن فريق العميل من إدارتها بعد التسليم، فإضافة قطاع أو تعديل وصف خدمة لا تتطلب مطوّرًا.',
    },
    {
      qEn: 'Do you also produce film and video for Riyadh clients?',
      aEn:
        'Yes. Our crew travels from Al Khobar to Riyadh and shoots on location across the capital, and our editors deliver from our own suite. The same company that builds the site handles the film and video work.',
      qAr: 'هل تنتجون أيضًا أفلامًا وفيديو لعملاء في الرياض؟',
      aAr:
        'نعم. يسافر طاقمنا من الخبر إلى الرياض ويصوّر في مواقع مختلفة في العاصمة، وتُسلَّم المونتاجات من استوديونا. والشركة نفسها التي تبني الموقع تتولى أعمال الأفلام والفيديو.',
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
