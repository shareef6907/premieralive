import type { VerticalData } from "./index";

export const clinics: VerticalData = {
  cities: ["manama", "al-khobar", "riyadh", "jeddah", "dammam", "muharraq"],
  en: {
    headline: "AI Inside Your Clinic. Patient Records Never Leave.",
    intro: "Medical clinics in Bahrain and Saudi Arabia operate under strict patient confidentiality obligations. DHA, NHRA, and SFDA regulations all require that patient data — including medical histories, diagnostic reports, and treatment plans — remains under the clinic's direct control. Cloud-based AI tools cannot satisfy these requirements without explicit patient consent frameworks that most clinics do not have. Premiera Local AI provides a fully offline AI system that your clinical staff can use for protocol lookup, patient communication drafting, insurance correspondence, and clinical note summarisation — without any patient data leaving your clinic's network. The system runs on Ollama with medical-terminology-aware models and is configured during your on-site installation. We support PDF, Word, and structured data files for your protocols and procedure manuals. No internet required during installation or daily use.",
    useCasesTitle: "Clinical Use Cases",
    useCases: [
      { title: "Protocol Lookup & Verification", prompt: '"What is the standard pre-operative checklist for day-case laparoscopic cholecystectomy under Bahrain DHA guidelines? Summarise the key steps."', benefit: "Nurses and junior doctors can verify protocols against the latest guidelines in real time, without scrolling through PDFs during a busy clinic session." },
      { title: "Insurance Correspondence", prompt: '"Draft a pre-authorisation letter to BDF insurance for a 45-year-old male patient requiring upper GI endoscopy. Include relevant ICD-10 codes and clinical justification."', benefit: "Front desk staff produce accurate, complete authorisation requests in minutes — reducing claim rejections from incomplete submissions." },
      { title: "Clinical Note Summarisation", prompt: '"Summarise the key clinical findings from this consultation note in 150 words, suitable for a referral letter to a specialist."', benefit: "GPs and specialists can prepare referral letters in a fraction of the time, with consistent quality across the clinic." },
    ],
    confidentiality: "Patient data under NHRA and DHA jurisdiction must remain within the clinic's controlled environment. Premiera Local AI has no outbound connectivity. We provide a formal data processing agreement for your compliance officer.",
    recommendedPackage: "Professional package (BHD 750 / SAR 7,499) is ideal for most clinics with 3–10 staff. Multi-doctor clinics should consider the Business package for server deployment.",
    hardwareNote: "A dedicated workstation or mini-PC with 16 GB RAM serves a single-clinic setup. For multi-branch clinics, we recommend a network-attached server — available from BHD 1,500 with setup.",
    objectionsTitle: "Common Objections from Medical Clinics",
    objections: [
      { q: "Does local AI handle medical terminology accurately?", a: "Yes. Qwen 3 and DeepSeek-R1 include strong medical vocabulary in both English and Arabic. We tune the model during setup for your specialty." },
      { q: "What if our IT team needs remote support?", a: "Remote support is available through a secure, logged tunnel — access is initiated by you, not us. Patient data is never transmitted during a support session." },
      { q: "Can we use this for multi-branch clinics?", a: "Yes. The Business package supports server deployment across multiple branches on the same network, with individual access controls per branch." },
    ],
    cta: "Book a free clinic assessment",
  },
  ar: {
    headline: "ذكاء اصطناعي داخل عيادتك. بيانات المرضى لا تغادر أبدًا.",
    intro: "تعمل العيادات الطبية في البحرين والسعودية تحت التزامات صارمة بسرية المرضى. تتطلب لوائح هيئة الصحة الرقمية (DHA) والهيئة الوطنية لتنظيم المهن الصحية (NHRA) وهيئة الغذاء والدواء (SFDA) أن تظل بيانات المرضى — بما في ذلك التواريخ الطبية وتقارير التشخيص وخطط العلاج — تحت سيطرة العيادة المباشرة. لا تستطيع أدوات الذكاء الاصطناعي السحابية تلبية هذه المتطلبات بدون أطر موافقة صريحة لا تملكها معظم العيادات. توفر بريمييرا لايف نظام ذكاء اصطناعي كامل دون اتصال يمكن لفريقك السريري استخدامه للبحث في البروتوكولات وصياغة التواصل مع المرضى والمراسلات التأمينية وتلخيص الملاحظات السريرية — دون مغادرة أي بيانات مرضى لشبكة عيادتك.",
    useCasesTitle: "حالات استخدام سريرية",
    useCases: [
      { title: "البحث في البروتوكولات والتحقق منها", prompt: '"ما قائمة الفحص السابقة للتخدير القياسية لعملية استئصال المرارة بالمنظار اليومية تحت إرشادات هيئة الصحة الرقمية البحرينية؟ لخص الخطوات الرئيسية."', benefit: "يمكن للممرضات والأطباء المبتدئين التحقق من البروتوكولات مقابل أحدث الإرشادات في الوقت الفعلي." },
      { title: "المراسلات التأمينية", prompt: '"صيغ خطاب طلب تصريح مسبق لشركة تأمين BDF لرجل عمره 45 عامًا يحتاج تنظير علوي للجهاز الهضمي. تضمن رموز ICD-10 والتبرير السريري."', benefit: "ينتج موظفو الاستقبال طلبات تصريح دقيقة وكاملة في دقائق — مما يقلل رفض المطالبات." },
      { title: "تلخيص الملاحظات السريرية", prompt: '"لخص النتائج السريرية الرئيسية من ملاحظة الاستشارة هذه في 150 كلمة، مناسبة لخطاب إحالة إلى أخصائي."', benefit: "يمكن للأطباء إعداد خطابات الإحالة في جزء صغير من الوقت، بجودة متسقة." },
    ],
    confidentiality: "يجب أن تبقى بيانات المرضى بموجب اختصاص NHRA وDHA ضمن البيئة الخاضعة للتحكم في العيادة. ليس لبريمييرا لايف اتصال صادر. نقدم اتفاقية معالجة بيانات رسمية لمسؤول الامتثال لديك.",
    recommendedPackage: "باقة الاحترافية (500 دينار / 4,999 ريال) مثالية لمعظم العيادات ذات 3–10 موظفين. العيادات متعددة الأطباء يجب أن تفكر في باقة الأعمال للتركيب على الخادم.",
    hardwareNote: "محطة عمل مخصصة أو PC صغير بذاكرة 16 غيغابايت يخدم إعداد عيادة واحدة. للعيادات ذات الفروع المتعددة، نوصي بخادم متصل بالشبكة — متاح من 1,500 دينار مع التركيب.",
    objectionsTitle: "اعتراضات شائعة من العيادات الطبية",
    objections: [
      { q: "هل يتعامل الذكاء الاصطناعي المحلي مع المصطلحات الطبية بدقة؟", a: "نعم. تتضمن نماذج Qwen 3 وDeepSeek-R1 مفردات طبية قوية بالعربية والإنجليزية. نُعدّ النموذج أثناء التركيب لتخصصك." },
      { q: "ماذا لو احتاج فريق تكنولوجيا المعلومات لدينا دعمًا عن بُعد؟", a: "الدعم عن بُعد متاح من خلال نفق آمن وموثّق — يبدأ الوصول من جانبك، وليس من جانبنا. لا تُنقل بيانات المرضى أبدًا أثناء جلسة الدعم." },
      { q: "هل يمكننا استخدام هذا للعيادات ذات الفروع المتعددة؟", a: "نعم. تدعم باقة الأعمال نشر الخادم عبر فروع متعددة على نفس الشبكة، مع ضوابط وصول فردية لكل فرع." },
    ],
    cta: "احجز تقييمًا مجانيًا للعيادة",
  },
};
