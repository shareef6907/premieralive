import type { VerticalData } from "./index";

export const accountingConsulting: VerticalData = {
  cities: ["manama", "al-khobar", "riyadh", "jeddah", "dammam", "riffa"],
  en: {
    headline: "Accounting AI: Client Data Never Leaves Your Firm",
    intro: "Accounting and consulting firms in Bahrain and Saudi Arabia handle some of the most sensitive data in any industry: audited financial statements, tax filings, payroll records, merger and acquisition data, and client strategic plans. Sending any of this to a cloud-based AI service is not just a privacy risk — it may constitute a breach of your professional liability insurance, your engagement letters, and applicable law. Premiera Local AI is built for this constraint. We install a private AI system on your office hardware, with your client data loaded into a RAG knowledge base that only your staff can access. The AI assists with audit document review, tax research, financial report summarisation, client memo drafting, and regulatory compliance checking — all without any data leaving your network.",
    useCasesTitle: "Accounting & Consulting Use Cases",
    useCases: [
      { title: "Audit Document Review", prompt: '"Review these 20 pages of accounts payable reconciliations and identify: reconciling items older than 90 days, patterns of recurring adjustments, and potential control weaknesses."', benefit: "Senior auditors can direct their review to flagged items rather than reading every line. Time saved on routine review goes toward higher-value advisory services." },
      { title: "Tax Research", prompt: '"What are the current Bahrain corporate income tax provisions applicable to a trading company with BHD 800,000 annual revenue? Include thresholds and exemptions."', benefit: "Advisors can verify tax positions and draft client recommendations in one session." },
      { title: "Financial Report Summarisation", prompt: '"Summarise the key financial highlights and risk factors from this 40-page audited financial statement for a non-financial reader."', benefit: "Partners can prepare client presentations and board summaries in a fraction of the normal time." },
    ],
    confidentiality: "Your client financial data is the product of months or years of professional work. Premiera Local AI ensures it never touches an external server. We provide data processing agreements for all engagements.",
    recommendedPackage: "The Professional package (BHD 750 / SAR 7,499) is the right starting point for most accounting firms. For firms with multiple engagement teams, the Business package provides separate knowledge bases per client.",
    hardwareNote: "A dedicated workstation or small server is recommended. We recommend 32 GB RAM minimum for active audit season workloads.",
    objectionsTitle: "Common Objections from Accounting Firms",
    objections: [
      { q: "Does the AI understand IFRS and Bahrain/Saudi tax law?", a: "Yes. We load relevant regulatory documents during installation and tune the model for financial terminology." },
      { q: "What about our professional liability insurance requirements?", a: "We provide a comprehensive data processing agreement and system architecture documentation for your insurer." },
      { q: "Can we isolate data by client?", a: "Yes. The Business package supports per-client knowledge bases with individual access controls." },
    ],
    cta: "Book a free assessment for your accounting firm",
  },
  ar: {
    headline: "ذكاء اصطناعي للمحاسبة: بيانات العملاء لا تغادر مكتبك أبدًا",
    intro: "تدير مكاتب المحاسبة والاستشارات في البحرين والسعودية بعضًا من أكثر البيانات حساسية: البيانات المالية المدققة وإقرارات الضرائب وسجلات كشوف المرتبات وبيانات الاندماج والاستحواذ وخطط العملاء الاستراتيجية. إرسال أي من هذا إلى خدمة ذكاء اصطناعي سحابية قد يشكل انتهاكًا لبوليصة تأمين المسؤولية المهنية واتفاقيات الارتباط الخاصة بك. بريمييرا لايف مبنية لهذا القيد. نركّب نظام ذكاء اصطناعي خاص على أجهزتك المكتبية، مع بيانات عملائك محملة في قاعدة معارف RAG لا يستطيع الوصول إليها إلا فريقك.",
    useCasesTitle: "حالات استخدام المحاسبة والاستشارات",
    useCases: [
      { title: "مراجعة وثائق التدقيق", prompt: '"راجع هذه الصفحات العشرين من مطابقات الحسابات الدائنة وحدد: البنود المطابقة الأقدم من 90 يومًا وأنماط التعديلات المتكررة وضعف الضبط المحتمل."', benefit: "يمكن للمراجعين الأوليين توجيه مراجعتهم إلى البنود المُعلَّمة بدلًا من قراءة كل سطر." },
      { title: "البحث الضريبي", prompt: '"ما أحكام ضريبة الدخل الشركات البحرينية الحالية المطبقة على شركة تجارية بإيرادات سنوية 800,000 دينار؟ تتضمن العتبات والإعفاءات."', benefit: "يمكن للمستشارين التحقق من المواقف الضريبية وصياغة توصيات العملاء في جلسة واحدة." },
      { title: "تلخيص التقارير المالية", prompt: '"لخص النقاط المالية الرئيسية وعوامل الخطر من هذه البيانات المالية المدققة (40 صفحة) لقارئ غير مالي."', benefit: "يمكن للشركاء إعداد عروض العملاء وتلخيصات مجلس الإدارة في جزء صغير من الوقت." },
    ],
    confidentiality: "بيانات العملاء المالية هي نتاج أشهر أو سنوات من العمل المهني. تضمن بريمييرا لايف عدم لمسها لخادم خارجي. نقدم اتفاقيات معالجة البيانات لجميع الارتباطات.",
    recommendedPackage: "باقة الاحترافية (500 دينار / 4,999 ريال) هي نقطة البداية الصحيحة لمعظم مكاتب المحاسبة. للشركات ذات فرق الارتباط المتعددة، توفر باقة الأعمال قواعد معرفية منفصلة لكل عميل.",
    hardwareNote: "محطة عمل مخصصة أو خادم صغير موصى به. نوصي بـ 32 غيغابايت كحد أدنى لأحمال موسم التدقيق النشط.",
    objectionsTitle: "اعتراضات شائعة من مكاتب المحاسبة",
    objections: [
      { q: "هل يفهم الذكاء الاصطناعي معايير التقارير المالية الدولية وقانون الضرائب البحريني/السعودي؟", a: "نعم. نحمل الوثائق التنظيمية ذات الصلة أثناء التركيب ونُعدّ النموذج للمصطلحات المالية." },
      { q: "ماذا عن متطلبات بوليصة تأمين المسؤولية المهنية لدينا؟", a: "نقدم اتفاقية معالجة بيانات شاملة ووثائق بنية النظام التي يمكنك تقديمها لشركة التأمين." },
      { q: "هل يمكننا عزل البيانات حسب العميل؟", a: "نعم. تدعم باقة الأعمال قواعد معرفية لكل عميل مع ضوابط وصول فردية." },
    ],
    cta: "احجز تقييمًا مجانيًا لمكتب المحاسبة",
  },
};
