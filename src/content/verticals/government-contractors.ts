import type { VerticalData } from "./index";

export const governmentContractors: VerticalData = {
  cities: ["riyadh", "jeddah", "dammam", "al-khobar", "manama", "tabuk"],
  en: {
    headline: "Government Contractor AI: Tender Intelligence, Project Data, Fully Secure",
    intro: "Government contractors in Saudi Arabia and Bahrain operate in one of the most demanding information environments in the region. Tender documents, project specifications, procurement correspondence, and classified project data are subject to strict confidentiality requirements that go far beyond normal commercial privacy. Cloud-based AI tools are simply not an option for most government contract work — the risk of data exposure through an external service, even inadvertent, can disqualify a contractor from future tenders. Premiera Local AI provides a completely air-gapped AI system that your team can use for tender document analysis, project specification review, procurement Q&A, and internal team correspondence — all without any data leaving your office network. This is the only AI deployment model that satisfies the security requirements of most government procurement environments.",
    useCasesTitle: "Government Contractor Use Cases",
    useCases: [
      { title: "Tender Document Analysis", prompt: '"Review this government tender package (200 pages) and summarise: the scope of work, key compliance requirements, any liquidated damages clauses, and the payment schedule."', benefit: "Business development teams can complete first-pass tender analysis in a fraction of the time, with more complete coverage than manual reading." },
      { title: "Project Specification Q&A", prompt: '"What are the material specifications required for the concrete work in this infrastructure tender? List all relevant standards referenced and any deviation from standard GACO specifications."', benefit: "Technical teams can verify compliance requirements against actual tender documents in real time." },
      { title: "Procurement Correspondence", prompt: '"Draft a formal response to this government procurement office query regarding our submitted proposal. Reference our proposal ref: RFB-2024-0891. Tone: formal, technical, professional."', benefit: "Tender teams can respond to government queries faster, with consistent quality and proper documentation." },
    ],
    confidentiality: "Tender submissions, project data, and procurement correspondence are subject to strict confidentiality requirements. Premiera Local AI has no internet connectivity and can be deployed in air-gapped environments.",
    recommendedPackage: "Business package (on quote) is recommended for government contractors, as most require multi-machine or server deployment with custom configuration and SLA.",
    hardwareNote: "We support air-gapped deployment (no network connectivity at all) as well as isolated network configurations. Hardware specifications provided during assessment.",
    objectionsTitle: "Common Objections from Government Contractors",
    objections: [
      { q: "Our IT security policy prohibits any external network connectivity.", a: "We support fully air-gapped deployment — no network connectivity whatsoever. The system is delivered on portable hardware and never connects to any external network." },
      { q: "How do we get updates without internet access?", a: "We deliver model updates and software patches on encrypted portable drives during your support retainer visits. Zero internet required." },
      { q: "Can this work in a secure facility with no network at all?", a: "Yes. Premiera Local AI is specifically designed for air-gapped environments. We have experience deploying in secure facilities across the GCC." },
    ],
    cta: "Book a secure assessment for your organisation",
  },
  ar: {
    headline: "ذكاء اصطناعي لمقاولي الجهات الحكومية: ذكاء المناقصات، بيانات المشاريع، مؤمّن بالكامل",
    intro: "يعمل مقاولو الجهات الحكومية في السعودية والبحرين في أحد أكثر بيئات المعلومات تطلبًا في المنطقة. وثائق المناقصات ومواصفات المشاريع والمراسلات المتعلقة بالمشتريات وبيانات المشاريع السرية تخضع لمتطلبات سرية صارمة تتجاوز بكثير الخصوصية التجارية العادية. أدوات الذكاء الاصطناعي السحابية ليست خيارًا ببساطة لمعظم أعمال المقاولات الحكومية — خطر كشف البيانات من خلال خدمة خارجية، حتى دون قصد، يمكن أن يستبعد مقاولًا من المناقصات المستقبلية.",
    useCasesTitle: "حالات استخدام مقاولي الجهات الحكومية",
    useCases: [
      { title: "تحليل وثائق المناقصات", prompt: '"راجع حزمة المناقصة الحكومية هذه (200 صفحة) ولخص: نطاق العمل ومتطلبات الامتثال الرئيسية وأي بنود أضرار ناجحة وجدول الدفعات."', benefit: "يمكن لفرق تطوير الأعمال إكمال تحليل المناقصة الأولى في جزء من الوقت، مع تغطية أكثر اكتمالًا من القراءة اليدوية." },
      { title: "الاستعلام من مواصفات المشاريع", prompt: '"ما المواصفات المادية المطلوبة لأعمال الخرسانة في هذه المناقصة للبنية التحتية؟ اذكر جميع المعايير ذات الصلة المُشار إليها وأي انحراف عن مواصفات GACO القياسية."', benefit: "يمكن للفرق التقنية التحقق من متطلبات الامتثال مقابل وثائق المناقصة الفعلية في الوقت الفعلي." },
      { title: "المراسلات المتعلقة بالمشتريات", prompt: '"صيغ ردًا رسميًا على استفسار مكتب المشتريات الحكومي بخصوص مقترحنا المقدم. المرجع: RFB-2024-0891. النبرة: رسمية، تقنية، مهنية."', benefit: "يمكن لفرق المناقصات الاستجابة لاستفسارات الحكومة بشكل أسرع، بجودة متسقة وتوثيق صحيح." },
    ],
    confidentiality: "تقديمات المناقصات وبيانات المشاريع والمراسلات المتعلقة بالمشتريات تخضع لمتطلبات سرية صارمة. ليس لبريمييرا لايف اتصال إنترنت ويمكن نشرها في بيئات air-gapped.",
    recommendedPackage: "باقة الأعمال (حسب العرض) موصى بها لمقاولي الجهات الحكومية، حيث تتطلب معظمها نشر أجهزة متعددة أو خادم مع تخصيص وعقد خدمة.",
    hardwareNote: "ندعم النشر air-gapped (بدون اتصال شبكة على الإطلاق) وكذلك تكوينات الشبكة المعزولة. المواصفات المقدمة أثناء التقييم.",
    objectionsTitle: "اعتراضات شائعة من مقاولي الجهات الحكومية",
    objections: [
      { q: "سياسة أمن تكنولوجيا المعلومات لدينا تحظر أي اتصال شبكة خارجي.", a: "ندعم النشر air-gapped بالكامل — بدون اتصال شبكة على الإطلاق. يُسلَّم النظام على أجهزة محمولة ولا يتصل أبدًا بأي شبكة خارجية." },
      { q: "كيف نحصل على التحديثات بدون وصول للإنترنت؟", a: "نسلّم تحديثات النموذج وإصلاحات البرامج على أقراص محمولة مشفرة أثناء زيارات عقد الدعم. لا حاجة للإنترنت." },
      { q: "هل يمكن أن يعمل هذا في منشأة آمنة بدون شبكة على الإطلاق؟", a: "نعم. صُممت بريمييرا لايف خصيصًا لبيئات air-gapped. لدينا خبرة في النشر في المنشآت الآمنة عبر مجلس التعاون الخليجي." },
    ],
    cta: "احجز تقييمًا آمنًا لمؤسستك",
  },
};
