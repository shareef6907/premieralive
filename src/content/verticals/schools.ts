import type { VerticalData } from "./index";

export const schools: VerticalData = {
  cities: ["manama", "al-khobar", "riyadh", "jeddah", "riffa", "dammam"],
  en: {
    headline: "AI for Schools: Safe for Students, Powerful for Teachers",
    intro: "Schools across Bahrain and Saudi Arabia are under increasing pressure to integrate AI into the classroom — while simultaneously facing the most stringent data protection requirements of any vertical. Student data is among the most sensitive personal information that an institution handles, and both Bahrain's personal data protection law and Saudi Arabia's PDPL impose clear restrictions on how it can be processed. Premiera Local AI was designed with this tension at its centre. The system runs entirely offline, in kiosk mode if required, with student data entirely separated from any external system. Teachers use it for lesson planning, assessment rubric development, administrative drafting, and professional development. Students can access it in a supervised, curated environment that you control. The school retains full ownership of all data. No student interaction history is stored, and the knowledge base is populated only with school-approved content.",
    useCasesTitle: "School-Specific Use Cases",
    useCases: [
      { title: "Lesson Plan Generation", prompt: '"Create a 5-lesson unit plan for Grade 8 Science covering the water cycle, aligned to the British Curriculum. Include learning objectives, activities, and assessment criteria."', benefit: "A teacher can produce a draft unit plan in 10 minutes instead of three hours of after-school prep time." },
      { title: "Assessment & Rubric Design", prompt: '"Design a rubric for a Year 10 English oral presentation. 4 criteria, 4 performance levels, in Arabic and English. Include descriptors for each cell."', benefit: "Consistent, transparent assessment criteria produced quickly — shared with students in advance to support differentiated learning." },
      { title: "Administrative Drafting", prompt: '"Draft a parent communication letter for a school in Bahrain announcing a revised attendance policy, in both Arabic and English. Tone: professional, friendly, 300 words each."', benefit: "The admissions and admin team can produce high-quality parent communications in minutes, in both languages required by Bahrain's bilingual school environment." },
    ],
    confidentiality: "No student data is stored, transmitted, or used for any purpose beyond the immediate query. The system has no internet connectivity, and we provide a full data processing agreement for your school's legal review.",
    recommendedPackage: "Schools K-12 is our dedicated school package (BHD 2,000–4,000 + hardware). It includes a school server deployment, kiosk mode configuration, student-safe presets, teacher training, and an annual support retainer. Contact us for a custom quote.",
    hardwareNote: "We recommend a dedicated school server (specs provided during assessment). Hardware cost typically ranges from BHD 800–2,000 depending on school size. We supply a full hardware recommendation document before any commitment.",
    objectionsTitle: "Common Objections from Schools",
    objections: [
      { q: "Can students accidentally access inappropriate content?", a: "Kiosk mode locks the interface to a curated set of tools. Students cannot browse the web, access external models, or modify settings. Teachers control what goes into the knowledge base." },
      { q: "How do we ensure AI doesn't generate inaccurate academic content?", a: "All AI output is a drafting tool — not a source. We train teachers to use it as a productivity accelerator, not a replacement for academic judgement." },
      { q: "What about parental consent requirements?", a: "We provide documentation that helps your school address parental consent as part of your AI policy. We provide the architecture that makes compliance straightforward." },
    ],
    cta: "Get a custom school quote",
  },
  ar: {
    headline: "ذكاء اصطناعي للمدارس: آمن للطلاب، قوي للمعلمين",
    intro: "تواجه المدارس في البحرين والسعودية ضغوطًا متزايدة لدمج الذكاء الاصطناعي في الفصل الدراسي — بينما تواجه في الوقت نفسه أكثر متطلبات حماية البيانات صرامة من أي قطاع آخر. بيانات الطلاب من أكثر المعلومات الشخصية حساسية التي تتعامل معها المؤسسة، وتفرض كل من قانون حماية البيانات الشخصية البحريني وقانون حماية البيانات السعودي (PDPL) قيودًا واضحة على كيفية معالجتها. صُممت بريمييرا لايف مع الأخذ بهذه المسألة في مركزها. يعمل النظام بالكامل دون اتصال، في وضع kiosk إذا لزم الأمر، مع فصل بيانات الطلاب بالكامل عن أي نظام خارجي.",
    useCasesTitle: "حالات استخدام خاصة بالمدارس",
    useCases: [
      { title: "إنتاج خطط الدروس", prompt: '"أنشئ خطة وحدة من 5 دروس لعلوم الصف الثامن تغطي دورة الماء، متوافقة مع المنهج البريطاني. تشمل أهداف التعلم والأنشطة ومعايير التقييم."', benefit: "يمكن للمعلم إنتاج مسودة خطة وحدة في 10 دقائق بدلًا من ثلاث ساعات من وقت التحضير بعد المدرسة." },
      { title: "تصميم التقييم ومعاييره", prompt: '"صمم معيارًا لعرض شفهي باللغة الإنجليزية للسنة 10. 4 معايير، 4 مستويات أداء، بالعربية والإنجليزية. تتضمن أوصافًا لكل خلية."', benefit: "معايير تقييم متسقة وشفافة تُنتَج بسرعة — تُشارك مع الطلاب مسبقًا لدعم التعلم المتمايز." },
      { title: "صياغة الإدارية", prompt: '"صيغ خطاب تواصل مع أولياء الأمور لمدرسة في البحرين تعلن عن سياسة حضور معدلة، بالعربية والإنجليزية. النبرة: مهنية، ودية، 300 كلمة لكل منهما."', benefit: "يمكن لفريق القبول والإدارة إنتاج اتصالات عالية الجودة مع أولياء الأمور في دقائق، باللغتين المطلوبتين." },
    ],
    confidentiality: "لا تُخزَّن بيانات الطلاب أو تُنقل أو تُستخدم لأي غرض يتجاوز الاستعلام الفوري. ليس للنظام اتصال إنترنت، ويمكننا تقديم اتفاقية معالجة بيانات كاملة لمراجعة المدرسة القانونية.",
    recommendedPackage: "المدارس K-12 هي باقتنا المخصصة للمدارس (2,000–4,000 دينار + الأجهزة). تشمل نشر خادم المدرسة وإعداد وضع kiosk وإعدادات آمنة للطلاب وتدريب المعلمين وعقد دعم سنوي. تواصل معنا لعرض سعر مخصص.",
    hardwareNote: "نوصي بخادم مخصص للمدرسة (المواصفات تُقدَّم أثناء التقييم). تتراوح تكلفة الأجهزة عادةً من 800–2,000 دينار حسب حجم المدرسة. نقدم مستند توصية أجهزة كامل قبل أي التزام.",
    objectionsTitle: "اعتراضات شائعة من المدارس",
    objections: [
      { q: "هل يمكن للطلاب الوصول إلى محتوى غير لائق بالخطأ؟", a: "يُقفل وضع kiosk الواجهة على مجموعة من الأدوات المنسّقة. لا يمكن للطلاب تصفح الويب أو الوصول إلى نماذج خارجية أو تعديل الإعدادات. يتحكم المعلمون فيما يدخل قاعدة المعرفة." },
      { q: "كيف نضمن أن الذكاء الاصطناعي لا ينتج محتوى أكاديميًا غير دقيق؟", a: "كل مخرجات الذكاء الاصطناعي أداة صياغة — وليست مصدرًا. نُدرّب المعلمين على استخدامها كمتسارع إنتاجية، وليس بديلاً عن الحكم الأكاديمي." },
      { q: "ماذا عن متطلبات موافقة الوالدين؟", a: "نقدم وثائق تساعد مدرستك على معالجة موافقة الوالدين كجزء من سياسة الذكاء الاصطناعي الخاصة بك. لا نتخذ قرارات حول إطار الموافقة الخاص بك — لكننا نقدم البنية التي تجعله واضحًا." },
    ],
    cta: "احصل على عرض سعر مخصص للمدرسة",
  },
};
