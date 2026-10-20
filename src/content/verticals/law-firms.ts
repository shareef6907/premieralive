import type { VerticalData } from "./index";

export const lawFirms: VerticalData = {
  cities: ["manama", "al-khobar", "riyadh", "jeddah", "dammam", "riffa"],
  en: {
    headline: "AI That Understands Attorney-Client Privilege",
    intro: "Law firms in Bahrain and Saudi Arabia face a specific tension: they need powerful AI for case research, contract review, and client communication — but they cannot risk client confidentiality. Sending case files to cloud AI services violates bar association standards, data residency requirements, and professional ethics. Premiera Local AI solves this at the root. We install a complete, private AI system inside your office, on hardware you already own. Your case files, client communications, and legal research never leave your building.",
    useCasesTitle: "Real Work, Done Offline",
    useCases: [
      { title: "Case Law Research", prompt: '"Summarise the key holdings from these 50 pages of Bahrain civil court decisions. Flag any cases that set precedent for contractual breach of warranty claims."', benefit: "Associates complete research in under an hour instead of a full afternoon." },
      { title: "Contract Clause Analysis", prompt: '"Review this commercial lease agreement and identify: any unusual termination clauses, any provisions that conflict with Bahrain landlord-tenant law, and any indemnity clauses that should be flagged for client review."', benefit: "Partners catch problematic clauses before client signature, reducing liability exposure." },
      { title: "Client Memo Drafting", prompt: '"Draft a memo summarising the status of this employment dispute for the client. Include: key facts, legal issues, recommended next steps, and an estimate of costs and timeline."', benefit: "Client communication drafts in minutes instead of hours." },
    ],
    confidentiality: "Your case files, client communications, and legal research never leave your office. Premiera Local AI is installed on your own hardware — not a cloud server. Every query, every document loaded into the knowledge base, stays entirely within your local network.",
    recommendedPackage: "Professional package (BHD 750 / SAR 7,499) for solo practitioners and small firms with up to 5 users. Business package for larger firms with multiple practice groups or server deployment.",
    hardwareNote: "A workstation or small server with 16-32 GB RAM is sufficient for most law firm document libraries. We assess your specific case volume and library size during the site visit.",
    objectionsTitle: "Common Questions from Law Firms",
    objections: [
      { q: "Does it work for Arabic legal documents?", qAr: "هل يعمل مع الوثائق القانونية العربية؟", a: "Yes. The system supports both Arabic and English. We configure it for your primary language of practice.", aAr: "نعم. يدعم النظام كلتا اللغتين العربية والإنجليزية." },
      { q: "Can we load our existing case files?", qAr: "هل يمكننا تحميل ملفات القضايا الحالية؟", a: "Yes. PDF, Word, and plain text documents can all be loaded into the knowledge base. We configure chunking for legal document formats.", aAr: "نعم. يمكن تحميل ملفات PDF وWord والنص العادي في قاعدة المعرفة." },
      { q: "Does this comply with Bahrain Bar Association standards?", qAr: "هل يتوافق مع معايير نقابة المحامين البحرينية؟", a: "Yes. Because all data stays on your own hardware with no external transmission, it satisfies the most stringent confidentiality requirements.", aAr: "نعم. لأن جميع البيانات تبقى على أجهزتك الخاصة دون أي إرسال خارجي، يلبي أكثر متطلبات السرية صرامة." },
    ],
    cta: "Book a free assessment for your law firm",
  },
  ar: {
    headline: "ذكاء اصطناعي يفهم سرية المحامي وموكله",
    intro: "تواجه مكاتب المحاماة في البحرين والمملكة العربية السعودية توترًا محددًا: تحتاج إلى ذكاء اصطناعي قوي لبحث القضايا ومراجعة العقود والتواصل مع العملاء — لكنها لا تستطيع المخاطرة بسرية العملاء. إرسال ملفات القضايا إلى خدمات الذكاء الاصطناعي السحابية ينتهك معايير نقابة المحامين ومتطلبات إقامة البيانات والأخلاقيات المهنية.",
    useCasesTitle: "عمل حقيقي، يعمل بدون اتصال",
    useCases: [
      { title: "بحث القانون القضائي", prompt: '"لخص المبادئ الأساسية من هذه الصفحات العشرين من قرارات المحكمة المدنية البحرينية. سلط الضوء على أي قضايا وضعت سوابق لمطالبات الإخلال الضمني بالعقد."', benefit: "يكمل المساعدون البحث في أقل من ساعة بدلاً من نصف يوم." },
      { title: "تحليل بنود العقود", prompt: '"راجع عقد إيجار التجاري هذا وحدد: أي بنود إنهاء غير عادية، أي أحكام تتعارض مع قانون المؤجر والمستأجر البحريني، وأي بنود تعويض يجب وضع علامة عليها للمراجعة."', benefit: "يكتشف الشركاء البنود الإشكالية قبل توقيع العميل، مما يقلل التعرض للمسؤولية." },
      { title: "صياغة مذكرات العملاء", prompt: '"صيغ مذكرة تلخص حالة نزاع التوظيف هذا للعميل. تشمل: الحقائق الرئيسية، المسائل القانونية، الخطوات التالية الموصى بها."', benefit: "مسودات التواصل مع العملاء في دقائق بدلاً من ساعات." },
    ],
    confidentiality: "ملفات القضايا والتواصل مع العملاء والبحث القانوني لا تغادر مكتبك أبدًا. بريمييرا لايف مركبة على أجهزتك الخاصة — ليست خادمًا سحابيًا.",
    recommendedPackage: "باقة الاحترافية (500 دينار / 4,999 ريال) للممارسين المستقلين والمكاتب الصغيرة. باقة الأعمال للمكاتب الكبيرة.",
    hardwareNote: "محطة عمل أو خادم صغير بـ 16-32 غيغابايت كافي لمعظم مكتبات الوثائق القانونية.",
    objectionsTitle: "أسئلة شائعة من مكاتب المحاماة",
    objections: [
      { q: "هل يعمل مع الوثائق القانونية العربية؟", qAr: "هل يعمل مع الوثائق القانونية العربية؟", a: "Yes. The system supports both Arabic and English.", aAr: "نعم. يدعم النظام كلتا اللغتين العربية والإنجليزية." },
      { q: "هل يمكننا تحميل ملفات القضايا الحالية؟", qAr: "هل يمكننا تحميل ملفات القضايا الحالية؟", a: "Yes. PDF, Word, and plain text documents can all be loaded.", aAr: "نعم. يمكن تحميل ملفات PDF وWord والنص العادي." },
      { q: "هل يتوافق مع معايير نقابة المحامين؟", qAr: "هل يتوافق مع معايير نقابة المحامين؟", a: "Yes. All data stays on your own hardware with no external transmission.", aAr: "نعم. جميع البيانات تبقى على أجهزتك الخاصة دون أي إرسال خارجي." },
    ],
    cta: "احجز تقييمًا مجانيًا لمكتب المحاماة",
  },
};
