import type { VerticalData } from "./index";

export const realEstate: VerticalData = {
  cities: ["manama", "al-khobar", "riyadh", "jeddah", "dammam", "dhahran"],
  en: {
    headline: "Real Estate AI: Property Data, Contract Intelligence, Always Available",
    intro: "Real estate companies in Bahrain and Saudi Arabia manage large volumes of structured and unstructured data: property listings, lease agreements, title deeds, market analyses, vendor contracts, and client communications. The pace of the Gulf property market means that agents who can access and synthesise this information fastest have a direct competitive advantage. Cloud-based AI tools introduce a significant risk: client data, pricing intelligence, and transaction details sent to external servers could be used for competitive intelligence by third parties. Premiera Local AI keeps all of your property data — including client lists, deal histories, and market research — inside your office network. Your agents can query the knowledge base for comparable sales data, draft lease clauses, prepare client presentations, and handle due diligence documents — all without any data leaving the building.",
    useCasesTitle: "Real Estate Use Cases",
    useCases: [
      { title: "Due Diligence Document Review", prompt: '"Review this set of property due diligence documents and summarise: title chain, outstanding encumbrances, zoning compliance issues, and any clauses requiring legal review."', benefit: "An agent can complete the first-pass due diligence review in under an hour instead of a full morning of document reading." },
      { title: "Client Presentation Generation", prompt: '"Create a property investment summary for a Gulf-based family office. Focus on capital appreciation potential, rental yield, and exit strategy. Include comparable transactions in Al Khobar."', benefit: "High-quality investor presentations produced in one session — not assembled over several days of research." },
      { title: "Lease Clause Drafting", prompt: '"Draft a commercial lease escalation clause for a retail property in Bahrain, covering annual rent increase capped at 5%, with CPI fallback. In Arabic and English."', benefit: "Standard contracts drafted quickly, reviewed by your legal team in minutes." },
    ],
    confidentiality: "Your deal pipeline, client intelligence, and pricing data are among your most sensitive competitive assets. Premiera Local AI ensures none of this information is shared with any external system, third party, or cloud service.",
    recommendedPackage: "For most real estate offices with 3–10 agents, the Professional package (BHD 750 / SAR 7,499) covers RAG over your property database, document intelligence, and team access. Larger agencies should consider the Business package.",
    hardwareNote: "A shared workstation or mini-server attached to your office network is sufficient for most agencies. We recommend 16–32 GB RAM depending on your property database size.",
    objectionsTitle: "Common Objections from Real Estate Companies",
    objections: [
      { q: "Our property database is very large — can the AI handle it?", a: "Yes. The RAG system is designed for large document collections. We configure chunking and retrieval parameters during installation for optimal performance over your specific database." },
      { q: "Can we restrict access by agent?", a: "Yes. Individual logins allow you to control which agents access which knowledge base sections. Senior agents can access full deal histories; junior agents access listing data only." },
      { q: "What about our existing property management software?", a: "Premiera Local AI works alongside your existing software. We can help you export relevant documents from most property management systems for ingestion into the RAG knowledge base." },
    ],
    cta: "Book a free assessment for your real estate company",
  },
  ar: {
    headline: "ذكاء اصطناعي للعقارات: بيانات العقارات، ذكاء العقود، متاح دائمًا",
    intro: "تدير شركات العقارات في البحرين والسعودية أحجامًا كبيرة من البيانات المهيكلة وغير المهيكلة: قوائم العقارات واتفاقيات الإيجار وسندات الملكية وتحليلات السوق وعقود الموردين واتصالات العملاء. يعني إيقاع سوق العقارات في الخليج أن الوكلاء الذين يمكنهم الوصول إلى هذه المعلومات وتجميعها بشكل أسرع لديهم ميزة تنافسية مباشرة. introduce أدوات الذكاء الاصطناعي السحابية مخاطر كبيرة: بيانات العملاء واستخبارات التسعير وتفاصيل المعاملات المرسلة إلى خوادم خارجية يمكن أن تُستخدم للاستخبارات التنافسية. تحافظ بريمييرا لايف على جميع بيانات العقارات داخل شبكة مكتبك.",
    useCasesTitle: "حالات استخدام العقارات",
    useCases: [
      { title: "مراجعة وثائق العناية الواجبة", prompt: '"راجع مجموعة وثائق العناية الواجبة لهذا العقار ولخص: سلسلة الملكية والقيود المعلقة ومشاكل الامتثال للمنطقة وأي بنود تتطلب مراجعة قانونية."', benefit: "يمكن للوكيل إكمال مراجعة العناية الواجبة الأولى في أقل من ساعة بدلًا من صباح كامل من قراءة الوثائق." },
      { title: "إنتاج عرض تقديمي للعميل", prompt: '"أنشئ ملخص استثمار عقاري لمكتب عائلة في الخليج. ركز على تقدير رأس المال وعائد الإيجار واستراتيجية الخروج. تضمن معاملات حديثة قابلة للمقارنة في الخبر."', benefit: "عروض تقديمية للمستثمرين عالية الجودة تُنتَج في جلسة واحدة — وليست مجمعة على مدى عدة أيام." },
      { title: "صياغة بنود الإيجار", prompt: '"صيغ بند تصعيد إيجار تجاري لعقار تجزئة في البحرين، يغطي زيادة الإيجار السنوية بحد أقصى 5٪، مع احتياطي CPI. بالعربية والإنجليزية."', benefit: "تُصيغ العقود القياسية بسرعة، يراجعها فريقك القانوني في دقائق." },
    ],
    confidentiality: "خط أنابيب صفقاتك واستخبارات العملاء وبيانات التسعير من أكثر أصولك التنافسية حساسية. تضمن بريمييرا لايف عدم مشاركة أي من هذه المعلومات مع أي نظام خارجي أو طرف ثالث أو خدمة سحابية.",
    recommendedPackage: "لمكتب العقارات مع 3–10 وكلاء، تغطي باقة الاحترافية (500 دينار / 4,999) RAG على قاعدة بيانات العقارات والمستندات وفريق الوصول. الوكالات الأكبر يجب أن تفكر في باقة الأعمال.",
    hardwareNote: "محطة عمل مشتركة أو خادم صغير متصل بشبكتك المكتبية كافية لمعظم الوكالات. نوصي بـ 16–32 غيغابايت حسب حجم قاعدة بيانات العقارات لديك.",
    objectionsTitle: "اعتراضات شائعة من شركات العقارات",
    objections: [
      { q: "قاعدة بيانات العقارات لدينا كبيرة جدًا — هل يمكن للذكاء الاصطناعي التعامل معها؟", a: "نعم. نظام RAG مصمم لمجموعات الوثائق الكبيرة. نُعدّ معلمات التقسيم والاسترجاع أثناء التركيب لأداء أمثل." },
      { q: "هل يمكننا تقييد الوصول حسب الوكيل؟", a: "نعم. الحسابات الفردية تسمح لك بالتحكم في أي الوكلاء يصل إلى أي قسم من قاعدة المعرفة." },
      { q: "ماذا عن برنامج إدارة العقارات الحالي لدينا؟", a: "تعمل بريمييرا لايف جنبًا إلى جنب مع برنامجك الحالي. يمكننا المساعدة في التصدير من معظم الأنظمة." },
    ],
    cta: "احجز تقييمًا مجانيًا لشركة العقارات",
  },
};
