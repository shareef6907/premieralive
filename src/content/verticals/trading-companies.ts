import type { VerticalData } from "./index";

export const tradingCompanies: VerticalData = {
  cities: ["jeddah", "dammam", "riyadh", "al-khobar", "manama", "jubail"],
  en: {
    headline: "Trading & Distribution AI: Supply Chain Intelligence, Fully Private",
    intro: "Trading and distribution companies in Saudi Arabia and Bahrain operate across complex supply chains, managing supplier contracts, pricing sheets, inventory data, customs documentation, and client accounts — often across multiple markets simultaneously. The speed and accuracy of information access directly impacts margins, relationships, and compliance. Cloud-based AI services that ingest your supplier lists and pricing intelligence introduce significant competitive and regulatory risk. Premiera Local AI keeps all of your trading data — supplier contracts, price lists, inventory records, and customs correspondence — inside your office network. Your team can query the knowledge base for supplier contract analysis, pricing intelligence, and logistics documentation — all without any commercially sensitive data leaving the building.",
    useCasesTitle: "Trading & Distribution Use Cases",
    useCases: [
      { title: "Supplier Contract Analysis", prompt: '"Review this supplier agreement and flag: any exclusive distribution clauses, minimum order quantities, and any terms that conflict with our standard purchase order terms."', benefit: "Procurement managers can review supplier agreements in 30 minutes instead of half a day." },
      { title: "Pricing Sheet Q&A", prompt: '"Compare our current pricing for fast-moving consumer goods across Bahrain and Saudi Arabia. Flag any products where our pricing is more than 10% above regional average from our uploaded market data."', benefit: "Sales teams can respond to client pricing queries in minutes, backed by your actual market data." },
      { title: "Customs Documentation", prompt: '"Summarise the key requirements for importing these goods into Saudi Arabia under the current SASO regulations. List any documents required and lead times."', benefit: "Logistics teams can prepare import documentation faster and with fewer errors." },
    ],
    confidentiality: "Your supplier relationships, pricing intelligence, and customer accounts are commercially sensitive. Premiera Local AI ensures this information never reaches a third-party system.",
    recommendedPackage: "Professional package (BHD 750 / SAR 7,499) for trading offices with up to 10 users. Business package for companies with multiple branches or server deployment.",
    hardwareNote: "A workstation or small server with 16–32 GB RAM is sufficient for most trading operations. We assess your specific inventory and documentation volume during the site visit.",
    objectionsTitle: "Common Objections from Trading Companies",
    objections: [
      { q: "We have thousands of SKUs — can the AI handle our product database?", a: "Yes. The RAG system handles large structured and unstructured datasets. We configure chunking for your specific inventory format." },
      { q: "Can multiple branches access the same knowledge base?", a: "Yes. The Business package supports networked deployment with branch-level access controls." },
      { q: "How do we keep pricing data separate from other users?", a: "Individual logins with role-based access controls ensure that pricing data is only visible to authorised personnel." },
    ],
    cta: "Book a free assessment for your trading company",
  },
  ar: {
    headline: "ذكاء اصطناعي للشركات التجارية والتوزيع: ذكاء سلسلة التوريد، خاص تمامًا",
    intro: "تعمل الشركات التجارية وشركات التوزيع في السعودية والبحرين عبر سلاسل توريد معقدة، تدير عقود الموردين وقوائم الأسعار وبيانات المخزون والوثائق الجمركية وحسابات العملاء — غالبًا عبر أسواق متعددة في وقت واحد. سرعة ودقة الوصول إلى المعلومات تؤثر مباشرة على الهوامش والعلاقات والامتثال. introdu أدوات الذكاء الاصطناعي السحابية مخاطر تنافسية وتنظيمية كبيرة. تحافظ بريمييرا لايف على جميع بيانات التداول — عقود الموردين وقوائم الأسعار وسجلات المخزون والمراسلات الجمركية — داخل شبكة مكتبك.",
    useCasesTitle: "حالات استخدام الشركات التجارية والتوزيع",
    useCases: [
      { title: "تحليل عقود الموردين", prompt: '"راجع اتفاقية المورد هذه وحدد: أي بنود توزيع حصرية وأي كميات طلب دنيا وأي شروط تتعارض مع شروط أمر الشراء القياسية لدينا."', benefit: "يمكن لمديري المشتريات مراجعة اتفاقيات الموردين في 30 دقيقة بدلًا من نصف يوم." },
      { title: "الاستعلام من قوائم الأسعار", prompt: '"قارن تسعيرنا الحالي للسلع الاستهلاكية سريعة الحركة عبر البحرين والسعودية. سلط الضوء على أي منتجات يكون تسعيرنا فيها أكثر من 10٪ فوق المتوسط الإقليمي."', benefit: "يمكن لفرق المبيعات الاستجابة لاستفسارات تسعير العملاء في دقائق، مدعومة ببيانات السوق الفعلية لديك." },
      { title: "الوثائق الجمركية", prompt: '"لخص المتطلبات الرئيسية لاستيراد هذه البضائع إلى المملكة العربية السعودية بموجب لوائح SASO الحالية. اذكر أي وثائق مطلوبة وأوقات التنفيذ."', benefit: "يمكن لفرق الخدمات اللوجستية إعداد وثائق الاستيراد بشكل أسرع وبأقل أخطاء." },
    ],
    confidentiality: "علاقات الموردين واستخبارات التسعير وحسابات العملاء حساسة تجاريًا. تضمن بريمييرا لايف عدم وصول هذه المعلومات إلى نظام طرف ثالث.",
    recommendedPackage: "باقة الاحترافية (500 دينار / 4,999 ريال) لمكاتب التداول حتى 10 مستخدمين. باقة الأعمال للشركات ذات الفروع المتعددة أو نشر الخادم.",
    hardwareNote: "محطة عمل أو خادم صغير بـ 16–32 غيغابايت كافي لمعظم عمليات التداول. نُقيّم حجم مخزونك ووثائقك المحددة أثناء الزيارة الميدانية.",
    objectionsTitle: "اعتراضات شائعة من الشركات التجارية",
    objections: [
      { q: "لدينا آلاف من رموز المنتجات — هل يمكن للذكاء الاصطناعي التعامل مع قاعدة بيانات منتجاتنا؟", a: "نعم. يتعامل نظام RAG مع مجموعات البيانات المهيكلة وغير المهيكلة الكبيرة. نُعدّ التقسيم لتنسيق مخزونك المحدد." },
      { q: "هل يمكن للفروع المتعددة الوصول إلى نفس قاعدة المعرفة؟", a: "نعم. تدعم باقة الأعمال النشر الشبكي مع ضوابط الوصول على مستوى الفرع." },
      { q: "كيف نُبقي بيانات التسعير منفصلة عن المستخدمين الآخرين؟", a: "الحسابات الفردية مع ضوابط الوصول المستندة إلى الأدوار تضمن أن بيانات التسعير مرئية للموظفين المُصرَّح لهم فقط." },
    ],
    cta: "احجز تقييمًا مجانيًا للشركة التجارية",
  },
};
