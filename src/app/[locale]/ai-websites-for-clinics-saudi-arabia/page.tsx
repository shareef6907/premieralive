import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import ContactActions from '@/components/ContactActions'
import Section from '@/components/Section'

const DOMAIN = 'https://www.premieralive.com'
const PATH = 'ai-websites-for-clinics-saudi-arabia'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isArabic = locale === 'ar'
  const canonical = `${DOMAIN}/${locale}/${PATH}`

  return {
    title: isArabic
      ? 'مواقع ذكاء اصطناعي للعيادات في السعودية | بريمييرا لايف'
      : 'AI Websites for Clinics in Saudi Arabia | Premiera Live',
    description: isArabic
      ? 'نبني مواقع عيادات ثنائية اللغة مدعومة بالذكاء الاصطناعي في السعودية — بحث طبيب ذكي وحجز مواعيد وفق التأمين وتوجيه المرضى وأتمتة المحتوى الطبي.'
      : 'We build bilingual, AI-powered clinic websites in Saudi Arabia — intelligent doctor search, insurance-aware booking, patient triage, and automated medical content built in.',
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
        ? 'مواقع ذكاء اصطناعي للعيادات في السعودية | بريمييرا لايف'
        : 'AI Websites for Clinics in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'نبني مواقع عيادات ثنائية اللغة مدعومة بالذكاء الاصطناعي للقطاع الصحي الخاص في السعودية.'
        : 'Bilingual, AI-powered clinic websites for the private healthcare sector across Saudi Arabia.',
      url: canonical,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic
        ? 'مواقع ذكاء اصطناعي للعيادات في السعودية | بريمييرا لايف'
        : 'AI Websites for Clinics in Saudi Arabia | Premiera Live',
      description: isArabic
        ? 'مواقع عيادات ثنائية اللغة مدعومة بالذكاء الاصطناعي في السعودية.'
        : 'Bilingual, AI-powered clinic websites in Saudi Arabia.',
    },
  }
}

export default async function AIWebsitesClinicsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const isArabic = locale === 'ar'

  // -----------------------------------------------------------------
  // Copy
  // -----------------------------------------------------------------
  const homeLabel = isArabic ? 'الرئيسية' : 'Home'
  const cornerLabel = isArabic ? 'مواقع ذكاء اصطناعي للعيادات في السعودية' : 'AI Websites for Clinics in Saudi Arabia'

  const h1En = 'AI Websites for Clinics in Saudi Arabia'
  const h1Ar = 'مواقع ذكاء اصطناعي للعيادات في السعودية'

  const heroEn =
    'Premiera Live builds bilingual, AI-powered websites for private clinics and polyclinics in Saudi Arabia. The sites we ship are not marketing brochures with an appointment widget bolted on — they are built around how patients actually choose a doctor in the Kingdom: bilingual Arabic and English, a doctor search that understands specialty, location, gender preference, and insurance network, appointment booking that respects real clinic schedules, patient triage that routes the right enquiry to the right front desk, and ongoing medical content generated from your own doctors’ expertise. The same team designs, builds, integrates the AI layer, and launches it from our base in the Eastern Province.'
  const heroAr =
    'تبني بريمييرا لايف مواقع ثنائية اللغة مدعومة بالذكاء الاصطناعي للعيادات والعيادات التخصصية الخاصة في السعودية. ليست المواقع التي نشحنها كتيبات تسويقية مع ودجت حجز مُلحَق بها — بل تُبنى حول كيف يختار المريض الطبيب فعلًا في المملكة: ثنائية اللغة بالعربية والإنجليزية، بحث أطباء يفهم التخصص والموقع وتفضيل الجنس وشبكة التأمين، حجز مواعيد يحترم جداول العيادة الفعلية، توجيه مرضى يوصل الاستفسار الصحيح إلى المكتب الأمامي الصحيح، ومحتوى طبي مستمر يُولّد من خبرة أطبائك أنفسهم. يتولى الفريق المسؤول نفسه التصميم والبناء وتكامل طبقة الذكاء الاصطناعي والإطلاق من قاعدتنا في المنطقة الشرقية.'

  const whyHeadingEn = 'Why clinic websites in Saudi need AI now'
  const whyHeadingAr = 'لماذا تحتاج مواقع العيادات في السعودية إلى الذكاء الاصطناعي الآن'

  const whyEn =
    'The way Saudi patients pick a clinic has changed more in three years than in the previous fifteen. They are not reading clinic homepages in order — they are asking. They ask Google in Arabic, they ask the insurance company’s directory in English, they ask a friend on WhatsApp, and they ask the clinic chatbot the same question in three different ways before they ever speak to a receptionist. A static clinic site that was good enough in 2019 — a list of doctors, an address, a phone number — cannot answer those questions today. AI does three specific jobs in a Saudi clinic site that no template does well. First, it lets a patient search by what they actually mean — "female dermatologist in Al Khobar who takes Bupa and has evening slots this week" — instead of fighting a directory that assumes a Western, English-only, single-specialty world. Second, it qualifies and routes the enquiry while the front desk is busy — confirming specialty, insurance eligibility, location preference, and appointment urgency, then handing the right booking to the right receptionist with full context. Third, it produces and updates the medical content your clinic should be writing anyway — specialty pages, condition pages, doctor bios, FAQ in Arabic — at the speed your practice actually grows, without your team rewriting the same dermatology page every quarter.'
  const whyAr =
    'تغيّرت الطريقة التي يختار بها المريض السعودي العيادة في ثلاث سنوات أكثر مما تغيّرت في خمس عشرة سنة سابقة. لم يعد يقرأ صفحات العيادة بالترتيب — بل يسأل. يسأل جوجل بالعربية، ويسأل دليل شركة التأمين بالإنجليزية، ويسأل صديقه على واتساب، ويسأل شات بوت العيادة السؤال نفسه بثلاث طرق مختلفة قبل أن يكلّم موظف الاستقبال. لا تستطيع موقع عيادة ثابت كان كافيًا في 2019 — قائمة أطباء وعنوان ورقم هاتف — الإجابة على هذه الأسئلة اليوم. يؤدي الذكاء الاصطناعي ثلاث مهام محددة في موقع عيادة سعودي لا يؤديها أي قالب بشكل جيد. أولًا، يتيح للمريض أن يبحث بما يقصده فعلًا — "طبيبة جلدية في الخبر تقبل بوبا ولديها مواعيد مسائية هذا الأسبوع" — بدل أن يصطدم بدليل يفترض عالَمًا غربيًا أحادي اللغة والتخصص. ثانيًا، يؤهّل ويوجّه الاستفسار بينما مكتب الاستقبال مشغول — يتأكد من التخصص وأهلية التأمين وتفضيل الموقع ودرجة استعجال الموعد، ثم يوصل الحجز الصحيح إلى موظف الاستقبال الصحيح بسياق كامل. ثالثًا، ينتج ويحدّث المحتوى الطبي الذي ينبغي على عيادتك كتابته أصلًا — صفحات التخصص والحالات وسير الأطباء والأسئلة الشائعة بالعربية — بالسرعة التي ينمو بها عملك فعلًا، دون أن يعيد فريقك كتابة صفحة الجلدية نفسها كل ربع سنة.'

  const capabilitiesHeadingEn = 'What we build into the site'
  const capabilitiesHeadingAr = 'ماذا نُدمج في الموقع'

  const capabilitiesEn = [
    {
      title: 'Natural-language doctor and clinic search',
      body: 'A search bar that understands queries written in full sentences in Arabic or English — "pediatric dentist in Al Khobar who takes Tawuniya on weekends" — and returns a real shortlist from your roster, with the filters the patient actually meant.',
    },
    {
      title: 'Bilingual AI patient assistant',
      body: 'A trained assistant on your website that answers specialty, insurance, location, and appointment questions in Arabic and English, with the tone of your clinic and the accuracy of your front desk — not a generic health chatbot with liability caveats on every line.',
    },
    {
      title: 'Insurance and approval-aware booking',
      body: 'Booking flows that respect the insurance networks each doctor actually accepts, the approval rules your front desk actually enforces, and the slot structure your scheduling system actually uses — not a generic calendar widget.',
    },
    {
      title: 'Patient triage and routing',
      body: 'The assistant qualifies the enquiry by urgency, specialty, and insurance, then routes it to the right receptionist, the right WhatsApp number, or the right callback queue — with the patient’s context attached.',
    },
    {
      title: 'Automated medical content',
      body: 'Specialty pages, condition explainers, doctor bios, and FAQ generated from your clinicians’ own expertise, in Arabic and English, ready for the site and for search campaigns — reviewed and signed off by your medical team.',
    },
    {
      title: 'Specialty and branch microsites',
      body: 'Dedicated microsites for a new branch, a new specialty, or a campaign launch — built and launched quickly with their own booking flow, AI assistant, and lead routing, linked back to the main clinic platform.',
    },
    {
      title: 'Integrations clinics already use',
      body: 'EMR, practice management, scheduling, insurance verification, WhatsApp Business, and patient CRM integrated so bookings, conversations, and clinical context stay connected to how your clinic actually runs.',
    },
  ]

  const capabilitiesAr = [
    {
      title: 'بحث أطباء وطبيعة العيادة باللغة الطبيعية',
      body: 'شريط بحث يفهم الاستفسارات المكتوبة بجمل كاملة بالعربية أو الإنجليزية — "طبيب أسنان أطفال في الخبر يقبل التعاونية في عطلة نهاية الأسبوع" — ويعيد قائمة مختصرة حقيقية من كادرك، بالفلاتر التي قصدها المريض فعلًا.',
    },
    {
      title: 'مساعد ذكي ثنائي اللغة للمرضى',
      body: 'مساعد مدرَّب على موقعك يجيب عن أسئلة التخصص والتأمين والموقع والمواعيد بالعربية والإنجليزية، بنبرة عيادتك ودقة مكتب الاستقبال — لا شات بوت صحي عام يضيف إخلاء مسؤولية على كل سطر.',
    },
    {
      title: 'حجز واعٍ لشبكات التأمين والموافقات',
      body: 'تدفقات حجز تحترم شبكات التأمين التي يقبلها كل طبيب فعلًا، وقواعد الموافقة التي يطبقها مكتبك الأمامي فعلًا، وهيكل المواعيد الذي يستخدمه نظام الجدولة لديك فعلًا — لا ودجت تقويم عام.',
    },
    {
      title: 'توجيه وفرز المرضى',
      body: 'يؤهّل المساعد الاستفسار حسب الاستعجال والتخصص والتأمين، ثم يوجّهه إلى موظف الاستقبال الصحيح أو رقم واتساب الصحيح أو طابور المعاودة الصحيح — مع سياق المريض مرفقًا.',
    },
    {
      title: 'محتوى طبي أوتوماتيكي',
      body: 'صفحات التخصص وشروحات الحالات وسير الأطباء والأسئلة الشائعة تُولَّد من خبرة أطبائك أنفسهم، بالعربية والإنجليزية، جاهزة للموقع وللحملات الإعلانية — يراجعها ويوقّعها فريقك الطبي.',
    },
    {
      title: 'مواقع microsites للتخصصات والفروع',
      body: 'مواقع microsites مخصصة لفرع جديد أو تخصص جديد أو إطلاق حملة — تُبنى وتُطلق بسرعة بتدفق حجز ومساعد ذكي وتوجيه عملاء خاص، مرتبطة بمنصة العيادة الرئيسية.',
    },
    {
      title: 'تكاملات تستخدمها العيادات فعلًا',
      body: 'تكامل مع EMR وإدارة العيادة والجدولة والتحقق من التأمين وواتساب بزنس وCRM للمرضى كي تبقى الحجوزات والمحادثات والسياق السريري متصلة بكيفية عمل عيادتك فعليًا.',
    },
  ]

  const fitHeadingEn = 'Who this is built for'
  const fitHeadingAr = 'لمن نبني هذا الحل'

  const fitEn =
    'We build these sites for private clinics, polyclinics, dental groups, dermatology and cosmetic centers, physiotherapy practices, and specialty day-surgery providers across Saudi Arabia. Single-specialty clinics use the platform to handle enquiry volume in Arabic and English without scaling front-desk headcount. Multi-specialty groups use it to route enquiries to the right branch and the right doctor from a single site. Dental and dermatology chains use it to manage location- and gender-specific booking across branches. And for the medical teams behind newer Saudi healthcare brands — Vision 2030-aligned clinics, day-surgery groups, women’s health centers, and pediatric networks — the same architecture is what makes a new specialty microsite launchable in days, with the booking logic and insurance rules already wired in.'
  const fitAr =
    'نبني هذه المواقع للعيادات الخاصة والعيادات التخصصية ومجموعات طب الأسنان ومراكز الجلدية والتجميل وعيادات العلاج الطبيعي ومراكز جراحة اليوم الواحد التخصصية في أنحاء السعودية. تستخدمها العيادات أحادية التخصص لإدارة حجم الاستفسارات بالعربية والإنجليزية دون زيادة عدد موظفي الاستقبال. وتستخدمها المجموعات متعددة التخصص لتوجيه الاستفسارات إلى الفرع الصحيح والطبيب المتوقع من موقع واحد. وتستخدمها سلاسل الأسنان والجلدية لإدارة حجوزات خاصة بالموقع وبالجنس عبر الفروع. وللفرق الطبية وراء العلامات التجارية الصحية السعودية الأحدث — عيادات مرتبطة برؤية 2030 ومجموعات جراحة اليوم الواحد ومراكز صحة المرأة وشبكات طب الأطفال — فإن الهندسة نفسها هي التي تجعل إطلاق microsite لتخصص جديد ممكنًا في أيام، مع منطق الحجز وقواعد التأمين مدمجة فعلًا.'

  const processHeadingEn = 'How a build like this runs'
  const processHeadingAr = 'كيف يسير بناء كهذا'

  const processEn = [
    {
      step: 'Discovery with clinical and front-desk teams',
      body: 'We sit with your doctors, your reception, and your medical director to understand how patients are actually booked today, which insurance networks matter, and which questions the front desk answers fifty times a day. The AI is only as good as the operational reality behind it.',
    },
    {
      step: 'Information architecture and AI scope',
      body: 'We design the site map, the doctor search behaviour, the assistant scope, and the integration points with your EMR, scheduling, and insurance workflows — agreed with your medical director before any code is written.',
    },
    {
      step: 'Design and front-end build',
      body: 'Bilingual design system, doctor and specialty pages, search interface, assistant UI, and booking flow — built mobile-first, because most Saudi patients first meet your clinic on a phone, often late at night.',
    },
    {
      step: 'AI training and integration',
      body: 'The assistant is trained on your doctor roster, accepted insurance networks, scheduling rules, and clinical FAQ — reviewed by your medical team. WhatsApp, EMR, and scheduling integration is wired in alongside it, not after.',
    },
    {
      step: 'Launch, monitor, refine',
      body: 'We launch with monitoring in place, review the first weeks of real patient conversations, and refine the assistant’s answers, the booking logic, and the triage routing based on what patients actually do and what your front desk actually sees.',
    },
  ]
  const processAr = [
    {
      step: 'الاكتشاف مع الفرق الطبية وفريق الاستقبال',
      body: 'نجلس مع أطبائك وموظفي الاستقبال والمدير الطبي لفهم كيف يُحجز المرضى فعلًا اليوم، وشبكات التأمين المهمة، والأسئلة التي يجيب عنها مكتب الاستقبال خمسين مرة في اليوم. الذكاء الاصطناعي لا يكون أفضل من الواقع التشغيلي خلفه.',
    },
    {
      step: 'هندسة المعلومات ونطاق الذكاء الاصطناعي',
      body: 'نصمم خريطة الموقع وسلوك بحث الأطباء ونطاق المساعد ونقاط التكامل مع EMR والجدولة وسير عمل التأمين — نتفق عليها مع المدير الطبي قبل كتابة أي سطر.',
    },
    {
      step: 'التصميم وبناء الواجهة الأمامية',
      body: 'نظام تصميم ثنائي اللغة وصفحات الأطباء والتخصصات وواجهة البحث وواجهة المساعد وتدفق الحجز — تُبنى أولًا للهاتف، لأن معظم المرضى السعوديين يقابلون عيادتك أولًا على الجوال، وكثيرًا في وقت متأخر من الليل.',
    },
    {
      step: 'تدريب الذكاء الاصطناعي والتكامل',
      body: 'يُدرَّب المساعد على كادر الأطباء وشبكات التأمين المقبولة وقواعد الجدولة والأسئلة الشائعة السريرية — يراجعها فريقك الطبي. ويُربط تكامل واتساب وEMR والجدولة في الوقت نفسه لا بعده.',
    },
    {
      step: 'الإطلاق والمراقبة والتحسين',
      body: 'نطلق الموقع مع المراقبة، ونراجع الأسابيع الأولى من محادثات المرضى الفعلية، ونحسّن إجابات المساعد ومنطق الحجز وتوجيه الفرز بناءً على ما يفعله المرضى فعلًا وما يراه مكتب الاستقبال فعلًا.',
    },
  ]

  const stackHeadingEn = 'How it sits in your stack'
  const stackHeadingAr = 'كيف يتموضع في بنيتك التقنية'

  const stackEn =
    'The site is built on a modern web stack that your marketing and operations teams can manage after handover. The assistant layer is configured, not coded from scratch each time — which is what lets a new specialty microsite go live in days. The same platform pattern works whether your scheduling lives in a dedicated EMR, a practice management system, or a spreadsheet your front desk actually uses. We do not lock your clinical and operational content into a closed CMS. Your team gets a content management system they can run, with the AI layer running on top as a service that is reviewed and refined with you and your medical director on an ongoing basis.'
  const stackAr =
    'يُبنى الموقع على مكدس ويب حديث يستطيع فريقاك التسويقي والتشغيلي إدارته بعد التسليم. تُكوَّن طبقة المساعد ولا تُكتب من الصفر في كل مرة — وهذا ما يتيح إطلاق microsite تخصص جديد في أيام. يعمل نمط المنصة نفسه سواء كان جدولتك في EMR مخصص أو نظام إدارة عيادة أو جدول بيانات يستخدمه مكتب الاستقبال فعلًا. لا نقفل محتواك السريري والتشغيلي في نظام إدارة محتوى مغلق. يحصل فريقك على نظام إدارة محتوى يستطيع تشغيله، مع طبقة ذكاء اصطناعي تعمل فوقه كخدمة نراجعها ونحسّنها معك ومع المدير الطبي بشكل مستمر.'

  const faqData = [
    {
      qEn: 'Is the AI assistant trained on our specific doctors and specialties?',
      aEn: 'Yes — we train it on your doctor roster, accepted insurance networks, scheduling rules, specialty FAQ, and clinical content you approve. Generic health assistants that know nothing about your clinic are not what we build, and we do not launch the assistant without your medical director’s sign-off on its answers.',
      qAr: 'هل يُدرَّب المساعد الذكي على أطبائنا وتخصصاتنا المحددة؟',
      aAr: 'نعم — ندرَّبه على كادر الأطباء لديك وشبكات التأمين المقبولة وقواعد الجدولة والأسئلة الشائعة السريرية والمحتوى الذي توافق عليه. لا نبني مساعدين صحيين عامين لا يعرفون شيئًا عن عيادتك، ولا نطلق المساعد دون موافقة فريقك الطبي على إجاباته.',
    },
    {
      qEn: 'Does the site work in Arabic and English?',
      aEn: 'Yes — bilingual Arabic and English is built in as standard, with full RTL support, Arabic voice search, and Arabic-language training data for the assistant. The medical content your team writes is reviewed in both languages before publishing.',
      qAr: 'هل يعمل الموقع بالعربية والإنجليزية؟',
      aAr: 'نعم — ثنائية اللغة العربية والإنجليزية مبنية كأساس، مع دعم كامل للـ RTL والبحث الصوتي بالعربية وبيانات تدريب عربية للمساعد. يُراجع المحتوى الطبي الذي يكتبه فريقك باللغتين قبل النشر.',
    },
    {
      qEn: 'How does it integrate with our EMR, scheduling, and WhatsApp?',
      aEn: 'We integrate with the EMR and practice management systems commonly used by Saudi private clinics, with insurance eligibility services, and with WhatsApp Business. The booking flow is wired to your real scheduling rules, not a generic calendar widget, and the assistant hands the right booking to the right receptionist with the patient context attached.',
      qAr: 'كيف يتكامل مع EMR والجدولة وواتساب لدينا؟',
      aAr: 'نتكامل مع أنظمة EMR وإدارة العيادة الشائعة التي تستخدمها العيادات الخاصة السعودية، ومع خدمات أهلية التأمين، ومع واتساب بزنس. يُربط تدفق الحجز بقواعد الجدولة الفعلية لديك لا ودجت تقويم عام، ويحوّل المساعد الحجز الصحيح إلى موظف الاستقبال الصحيح بسياق المريض مرفقًا.',
    },
    {
      qEn: 'How long does a build like this take?',
      aEn: 'A focused specialty or branch microsite is typically launched within a few weeks. A full clinic or polyclinic platform — bilingual, with AI assistant, EMR and scheduling integration, insurance-aware booking, and microsites — runs on a longer timeline scoped to the number of doctors, branches, and integrations in scope.',
      qAr: 'كم يستغرق بناء كهذا؟',
      aAr: 'يُطلق microsite تخصص أو فرع مركّز عادةً خلال أسابيع قليلة. أما منصة عيادة أو عيادة متعددة التخصصات كاملة — ثنائية اللغة مع مساعد ذكي وتكامل EMR وجدولة وحجز واعٍ للتأمين ومواقع microsites — فتسير على جدول أطول يُحدَّد وفق عدد الأطباء والفروع والتكاملات في النطاق.',
    },
    {
      qEn: 'Can the assistant differentiate between specialties, branches, and insurance networks?',
      aEn: 'Yes — the assistant is configured to differentiate between specialties (so a dermatology question does not get routed to a dental slot), between branches (so a Riyadh patient is not booked into an Al Khobar branch), and between insurance networks (so the booking respects what each doctor actually accepts).',
      qAr: 'هل يستطيع المساعد التمييز بين التخصصات والفروع وشبكات التأمين؟',
      aAr: 'نعم — يُعدّ المساعد للتفريق بين التخصصات (حتى لا يُحوَّل سؤال جلدية إلى موعد أسنان)، وبين الفروع (حتى لا يُحجز مريض الرياض في فرع الخبر)، وبين شبكات التأمين (حتى يحترم الحجز ما يقبله كل طبيب فعلًا).',
    },
    {
      qEn: 'Who reviews the medical content the AI generates?',
      aEn: 'Your medical team does. The AI drafts the specialty pages, condition explainers, FAQ, and doctor bios in Arabic and English from the source material you provide. Nothing goes live until your medical director or a designated clinician reviews and approves it. The AI does not invent clinical claims on its own.',
      qAr: 'من يراجع المحتوى الطبي الذي يولّده الذكاء الاصطناعي؟',
      aAr: 'فريقك الطبي. يصوغ الذكاء الاصطناعي مسودات صفحات التخصص وشروحات الحالات والأسئلة الشائعة وسير الأطباء بالعربية والإنجليزية من المصدر الذي تقدّمه. لا يُنشر شيء حتى يراجعه المدير الطبي أو طبيب مكلَّف ويوافق عليه. لا يبتكر الذكاء الاصطناعي ادعاءات سريرية من تلقاء نفسه.',
    },
  ]

  const faqs = isArabic
    ? faqData.map((f) => ({ q: f.qAr, a: f.aAr }))
    : faqData.map((f) => ({ q: f.qEn, a: f.aEn }))

  const ctaHeading = isArabic ? 'نبني معًا شيئًا يستحق التذكر.' : "Let's Build Something Remarkable."
  const ctaLabel = isArabic ? 'اتصل بنا للنقاش' : 'Call to Discuss'
  const relatedLabel = isArabic ? 'ذات صلة:' : 'related:'
  const linkDigital = isArabic ? 'المنصات الرقمية' : 'digital platforms'
  const linkWebsites = isArabic ? 'بناء مواقع الأعمال' : 'business website development'
  const linkAI = isArabic ? 'المساعدون الذكياء والأتمتة' : 'AI assistants and automation'
  const linkApps = isArabic ? 'تطوير التطبيقات' : 'app development'
  const linkPlatforms = isArabic ? 'بناء منصات الأعمال' : 'business platform development'
  const linkRealEstate = isArabic ? 'مواقع ذكاء اصطناعي للعقار' : 'AI websites for real estate'

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
            href={`/${locale}/services/business-platform-development-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkPlatforms}
          </Link>
          <span style={{ color: 'var(--color-text-faint)' }}>·</span>
          <Link
            href={`/${locale}/ai-websites-for-real-estate-saudi-arabia`}
            style={{ color: 'var(--color-gold)', textDecoration: 'none' }}
          >
            {linkRealEstate}
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