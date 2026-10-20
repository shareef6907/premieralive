/**
 * City-specific content for Premiera Local AI public site.
 */

export const BAHRAIN_CITIES = ["manama", "riffa", "muharraq", "isa-town", "hamad-town", "aali", "saar"] as const;
export const SAUDI_CITIES = ["riyadh", "jeddah", "dammam", "al-khobar", "dhahran", "jubail", "mecca", "medina", "tabuk", "abha"] as const;

export interface CityFaq { q: string; qAr: string; a: string; aAr: string; }
export interface CityWho { vertical: string; verticalAr: string; emphasis: string; emphasisAr: string; }

export interface CityContent {
  country: string; countryAr: string; name: string; nameAr: string;
  desc: string; descAr: string;
  whoWeServe: CityWho[];
  howItWorks: string; howItWorksAr: string;
  faq: CityFaq[];
  cities: string[];
}

// Bahrain cities
export const CITIES_BH: Record<string, CityContent> = {
  manama: {
    country: "Bahrain", countryAr: "البحرين", name: "Manama", nameAr: "المنامة",
    desc: "Manama is the commercial capital of Bahrain, home to most of the country's law firms, financial institutions, and professional services offices. The city's Financial Harbour and Diplomatic Area host international companies that handle highly sensitive client data daily. Manama-based businesses face the same AI privacy challenge as any major financial centre — they need the productivity gains of AI but cannot risk client confidentiality.",
    descAr: "المنامة هي العاصمة التجارية للبحرين، موطن غالبية مكاتب المحاماة والمؤسسات المالية ومكاتب الخدمات المهنية. تستضيف منطقة الميناء المالي والمنطقة الدبلوماسية شركات دولية تتعامل مع بيانات العملاء الحساسة يوميًا.",
    whoWeServe: [
      { vertical: "Law Firms", verticalAr: "مكاتب المحاماة", emphasis: "Client privilege environments for Bahrain Bar Association members", emphasisAr: "بيئات سرية العملاء لأعضاء نقابة المحامين البحرينيين" },
      { vertical: "Financial Consultancy", verticalAr: "الاستشارات المالية", emphasis: "Client financial data that must never leave your office", emphasisAr: "البيانات المالية للعملاء التي يجب ألا تغادر مكتبك أبدًا" },
      { vertical: "Clinics & Medical", verticalAr: "العيادات والمراكز الطبية", emphasis: "NHRA-compliant patient confidentiality", emphasisAr: "الامتثال لسرية المرضى وفق هيئة الصحة الرقمية البحرينية" },
    ],
    howItWorks: "For Manama businesses, installation is typically scheduled within 5 business days of your assessment call. A single-machine installation takes 3-4 hours. For offices with multiple staff or larger document libraries, we schedule a half-day session. We train your team on the day and leave a printed guide.",
    howItWorksAr: "لشركات المنامة، يُجدوَل التركيب عادةً خلال 5 أيام عمل. يستغرق تركيب جهاز واحد 3-4 ساعات. نُدرّب فريقك في اليوم ونترك دليلًا مطبوعًا.",
    faq: [
      { q: "Do you offer same-week installation in Manama?", qAr: "هل تقدمون التركيب في نفس الأسبوع في المنامة؟", a: "Yes. For urgent requirements, we can typically schedule within 2-3 business days in Manama.", aAr: "نعم. للمتطلبات العاجلة، يمكننا عادةً جدولة التركيب خلال 2-3 أيام عمل في المنامة." },
      { q: "Is your Bahrain installation service available in other cities?", qAr: "هل خدمة التركيب البحرينية متاحة في مدن أخرى؟", a: "Yes. We serve Muharraq, Riffa, Hamad Town, A'ali, and Saar.", aAr: "نعم. نخدم المحرق ورفيع ومدينة حمد وعالي وسار." },
      { q: "What languages does the AI support?", qAr: "ما اللغات التي يدعمها الذكاء الاصطناعي؟", a: "Both Arabic and English are fully supported. We configure the system for bilingual environments from day one.", aAr: "كلتا اللغتين العربية والإنجليزية مدعومتان بالكامل." },
    ],
    cities: ["muharraq", "riffa", "hamad-town"],
  },

  riffa: {
    country: "Bahrain", countryAr: "البحرين", name: "Riffa", nameAr: "رفيع",
    desc: "Riffa is one of Bahrain's largest residential areas and a growing commercial hub, particularly for SMEs and family businesses. The area has seen significant development in retail, dining, and professional services over the past decade. Riffa-based businesses that serve clients across Bahrain need AI tools that are both powerful and secure.",
    descAr: "رفيع هي إحدى أكبر المناطق السكنية في البحرين ومحور تجاري متنامٍ، خاصة للشركات الصغيرة والمتوسطة والعائلية. شهد المنطقة نموًا كبيرًا في التجزئة والخدمات المهنية.",
    whoWeServe: [
      { vertical: "Family Law Practices", verticalAr: "مكاتب المحاماة العائلية", emphasis: "Sensitive family law matters handled with full client confidentiality", emphasisAr: "مسائل القانون العائلي الحساسة تُعالَج مع سرية كاملة للعملاء" },
      { vertical: "Dental & Medical Clinics", verticalAr: "عيادات الأسنان والطب", emphasis: "Patient records and treatment plans never leave the clinic", emphasisAr: "سجلات المرضى وخطط العلاج لا تغادر العيادة أبدًا" },
      { vertical: "Accountants & Tax Advisors", verticalAr: "المحاسبون والمستشارون الضريبيون", emphasis: "Financial data for Bahraini families and small businesses", emphasisAr: "البيانات المالية للعائلات البحرينية والشركات الصغيرة" },
    ],
    howItWorks: "Installation in Riffa follows the same process as Manama: assessment call, hardware check, on-site installation, document loading, and training. We schedule installations in Riffa on Tuesdays and Thursdays by default. Travel is included at no extra charge.",
    howItWorksAr: "يتبع التركيب في رفيع نفس العملية المتبعة في المنامة. نُجدوِل التركيبات في رفيع يومي الثلاثاء والخميس افتراضيًا. السفر مشمول بدون رسوم إضافية.",
    faq: [
      { q: "Is there an extra travel charge for Riffa installation?", qAr: "هل هناك رسوم سفر إضافية لتركيب رفيع؟", a: "No. Travel to Riffa is included in our standard service area. No extra charges apply.", aAr: "لا. السفر إلى رفيع مشمول في منطقتنا الخدمية القياسية." },
      { q: "How long does a typical Riffa installation take?", qAr: "كم تستغرق عملية التركيب النموذجية في رفيع؟", a: "A single-machine installation takes 3-4 hours on-site. We schedule half-day sessions for multi-machine deployments.", aAr: "يستغرق تركيب جهاز واحد 3-4 ساعات ميدانيًا." },
      { q: "Can we schedule installation on a weekend?", qAr: "هل يمكننا جدولة التركيب في عطلة نهاية الأسبوع؟", a: "Yes. Weekend installations in Riffa are available on request.", aAr: "نعم. التركيبات في عطلة نهاية الأسبوع في رفيع متاحة عند الطلب." },
    ],
    cities: ["manama", "hamad-town", "muharraq"],
  },

  muharraq: {
    country: "Bahrain", countryAr: "البحرين", name: "Muharraq", nameAr: "المحرق",
    desc: "Muharraq is Bahrain's second city and a major centre for traditional commerce, small industry, and healthcare. The island is home to Bahrain International Airport, the Muharraq Souq, and several significant healthcare facilities. Muharraq's business community is characterised by established family businesses, industrial companies, and healthcare providers.",
    descAr: "المحرق هي ثاني أكبر مدينة في البحرين ومحور رئيسي للتجارة التقليدية والصناعة الصغيرة والرعاية الصحية. تضم الجزيرة مطار البحرين الدولي وسوق المحرق.",
    whoWeServe: [
      { vertical: "Industrial & Trading Companies", verticalAr: "الشركات الصناعية والتجارية", emphasis: "Supply chain data and supplier contracts kept fully private", emphasisAr: "بيانات سلسلة التوريد وعقود الموردين محفوظة بشكل خاص تمامًا" },
      { vertical: "Healthcare Providers", verticalAr: "مقدمو الرعاية الصحية", emphasis: "Patient confidentiality for island clinics and medical centres", emphasisAr: "سرية المرضى لعيادات ومراكز الجزيرة الطبية" },
      { vertical: "Small Law Practices", verticalAr: "مكاتب المحاماة الصغيرة", emphasis: "Cost-effective AI for solo practitioners and small firms", emphasisAr: "ذكاء اصطناعي فعال من حيث التكلفة للممارسين المستقلين والمكاتب الصغيرة" },
    ],
    howItWorks: "We serve Muharraq on Mondays and Wednesdays. Installation includes hardware assessment, offline setup, document loading, and staff training. Multi-machine deployments on Muharraq Island can be completed in a single half-day session.",
    howItWorksAr: "نخدم المحرق يومي الاثنين والأربعاء. يشمل التركيب فحص الأجهزة والإعداد دون اتصال وتحميل الوثائق وتدريب الموظفين.",
    faq: [
      { q: "Do you serve Muharraq Island?", qAr: "هل تخدمون جزيرة المحرق؟", a: "Yes. We serve all locations on Muharraq Island, including the industrial areas.", aAr: "نعم. نخدم جميع المواقع على جزيرة المحرق." },
      { q: "What about Muharraq's industrial companies?", qAr: "ماذا عن الشركات الصناعية في المحرق؟", a: "We work with industrial companies across Bahrain including Muharraq. The Business package supports server deployment for industrial settings.", aAr: "نعمل مع الشركات الصناعية في جميع أنحاء البحرين بما في ذلك المحرق." },
      { q: "Can you install at healthcare facilities on Muharraq?", qAr: "هل يمكنكم التركيب في المرافق الصحية في المحرق؟", a: "Yes. We have experience installing at clinics and medical centres across Muharraq.", aAr: "نعم. لدينا خبرة في التركيب في العيادات والمراكز الطبية عبر المحرق." },
    ],
    cities: ["manama", "riffa", "saar"],
  },

  "isa-town": {
    country: "Bahrain", countryAr: "البحرين", name: "Isa Town", nameAr: "مدينة عيسى",
    desc: "Isa Town is one of Bahrain's most densely populated residential areas and is also home to a growing number of schools, educational institutions, and small professional offices. Schools in Isa Town need AI tools that are safe for students and powerful for teachers — Premiera Local AI's kiosk mode and student-safe configuration are specifically designed for this environment.",
    descAr: "مدينة عيسى هي إحدى أكثر المناطق السكنية كثافة سكانية في البحرين وموطن لعدد متنامٍ من المدارس والمؤسسات التعليمية. تحتاج المدارس في مدينة عيسى إلى أدوات ذكاء اصطناعي آمنة للطلاب وقوية للمعلمين.",
    whoWeServe: [
      { vertical: "Schools (K-12)", verticalAr: "المدارس (K-12)", emphasis: "Student-safe AI with kiosk mode for K-12 environments", emphasisAr: "ذكاء اصطناعي آمن للطلاب مع وضع kiosk لبيئات K-12" },
      { vertical: "Tutorial Centres", verticalAr: "مراكز التعلم", emphasis: "AI-assisted lesson planning and assessment design", emphasisAr: "التخطيط للدروس وتصميم التقييم بمساعدة الذكاء الاصطناعي" },
      { vertical: "Small Professional Offices", verticalAr: "مكاتب مهنية صغيرة", emphasis: "Affordable AI for single practitioners", emphasisAr: "ذكاء اصطناعي بأسعار معقولة للممارسين المستقلين" },
    ],
    howItWorks: "We install at schools and educational institutions in Isa Town on a schedule that minimises disruption to classes. Our school installation includes kiosk configuration, teacher training, and a full hardware setup. We work around your academic calendar.",
    howItWorksAr: "نركّب في المدارس والمؤسسات التعليمية في مدينة عيسى حسب جدول يقلل من تعطيل الفصول. يشمل تركيب مدرستنا إعداد kiosk وتدريب المعلمين وإعداد كامل للأجهزة.",
    faq: [
      { q: "Do you install at schools in Isa Town?", qAr: "هل تركّبون في المدارس في مدينة عيسى؟", a: "Yes. We have installed AI systems at schools across Bahrain including the Isa Town educational district.", aAr: "نعم. ركّبنا أنظمة ذكاء اصطناعي في مدارس عبر البحرين." },
      { q: "Can students use the AI at schools?", qAr: "هل يمكن للطلاب استخدام الذكاء الاصطناعي في المدارس؟", a: "Yes, in kiosk mode. Students can access a curated, teacher-controlled interface.", aAr: "نعم، في وضع kiosk. يمكن للطلاب الوصول إلى واجهة مُعدّة ومُتحكَّم بها من قبل المعلم." },
      { q: "What is the minimum hardware for a school?", qAr: "ما الحد الأدنى من الأجهزة للمدرسة؟", a: "We recommend a dedicated school server. Hardware typically costs BHD 800-2,000 depending on school size.", aAr: "نوصي بخادم مخصص للمدرسة. تتراوح تكلفة الأجهزة عادةً من 800-2,000 دينار حسب الحجم." },
    ],
    cities: ["hamad-town", "manama", "riffa"],
  },

  "hamad-town": {
    country: "Bahrain", countryAr: "البحرين", name: "Hamad Town", nameAr: "مدينة حمد",
    desc: "Hamad Town is one of Bahrain's largest and fastest-growing towns, known for its residential communities, retail centres, and increasingly, commercial offices. The town is home to a diverse business community ranging from retail and F&B to professional services and construction companies. Hamad Town businesses need AI tools that are practical, affordable, and secure.",
    descAr: "مدينة حمد هي إحدى أكبر المدن وأكثرها نموًا في البحرين، موطن مجتمع أعمال متنوع يتراوح بين التجزئة والخدمات المهنية. تحتاج شركات مدينة حمد إلى أدوات ذكاء اصطناعي عملية وبأسعار معقولة وآمنة.",
    whoWeServe: [
      { vertical: "Construction & Engineering", verticalAr: "البناء والهندسة", emphasis: "Project document management and technical specification Q&A", emphasisAr: "إدارة مستندات المشاريع والاستعلام من المواصفات التقنية" },
      { vertical: "Retail Businesses", verticalAr: "شركات التجزئة", emphasis: "Customer data protection and inventory management AI", emphasisAr: "حماية بيانات العملاء وإدارة المخزون بالذكاء الاصطناعي" },
      { vertical: "Professional Offices", verticalAr: "المكاتب المهنية", emphasis: "Affordable, private AI for growing businesses", emphasisAr: "ذكاء اصطناعي خاص وبأسعار معقولة للشركات المتنامية" },
    ],
    howItWorks: "Hamad Town is included in our standard service area for Manama-based installations. We schedule on-site installation within 5 business days of your assessment. Travel is included at no extra charge.",
    howItWorksAr: "مدينة حمد مشمولة في منطقتنا الخدمية القياسية لتركيبات المنامة. نُجدوِل التركيب الميداني خلال 5 أيام عمل. السفر مشمول بدون رسوم إضافية.",
    faq: [
      { q: "Is Hamad Town included in your standard service area?", qAr: "هل مدينة حمد مشمولة في منطقتك الخدمية القياسية؟", a: "Yes. We serve Hamad Town as part of our standard Bahrain service area.", aAr: "نعم. نخدم مدينة حمد كجزء من منطقتنا الخدمية القياسية في البحرين." },
      { q: "How quickly can you install in Hamad Town?", qAr: "ما سرعة التركيب في مدينة حمد؟", a: "Typically within 5 business days of your assessment.", aAr: "عادةً خلال 5 أيام عمل من تقييمك." },
      { q: "Do you support businesses with multiple locations?", qAr: "هل تدعمون الشركات ذات المواقع المتعددة؟", a: "Yes. The Business package supports multi-site deployment.", aAr: "نعم. تدعم باقة الأعمال النشر متعدد المواقع." },
    ],
    cities: ["manama", "isa-town", "aali"],
  },

  aali: {
    country: "Bahrain", countryAr: "البحرين", name: "A'ali", nameAr: "عالي",
    desc: "A'ali is a major commercial and industrial hub in Bahrain, famous for its pottery and craft industries but increasingly home to logistics companies, warehouses, and light manufacturing operations. The area also hosts Bahrain Nights W.L.L., our registered Bahrain operating entity. A'ali-based businesses serve both the Bahrain market and regional export markets.",
    descAr: "عالي هي مركز تجاري وصناعي رئيسي في البحرين. تستضيف المنطقة أيضًا Bahrain Nights W.L.L.، كياننا التشغيلي المسجل في البحرين.",
    whoWeServe: [
      { vertical: "Manufacturing & Industry", verticalAr: "التصنيع والصناعة", emphasis: "Technical documentation and specification management", emphasisAr: "إدارة الوثائق والمواصفات التقنية" },
      { vertical: "Logistics Companies", verticalAr: "شركات الخدمات اللوجستية", emphasis: "Shipping documents and customs compliance Q&A", emphasisAr: "الاستعلام من وثائق الشحن والامتثال الجمركي" },
      { vertical: "Trading & Distribution", verticalAr: "التجارة والتوزيع", emphasis: "Supplier contracts and inventory management", emphasisAr: "عقود الموردين وإدارة المخزون" },
    ],
    howItWorks: "We serve A'ali as part of our Bahrain service area. Installation is typically scheduled within 5 business days. A'ali's commercial and industrial zones are easily accessible from our Manama base.",
    howItWorksAr: "نخدم عالي كجزء من منطقتنا الخدمية في البحرين. يُجدوَل التركيب عادةً خلال 5 أيام عمل. المناطق التجارية والصناعية في عالي يسهل الوصول إليها.",
    faq: [
      { q: "Is A'ali in your standard Bahrain service area?", qAr: "هل عالي في منطقتك الخدمية القياسية في البحرين؟", a: "Yes. A'ali is served as part of our standard Bahrain service area.", aAr: "نعم. تُخدم عالي كجزء من منطقتنا الخدمية القياسية في البحرين." },
      { q: "Do you work with manufacturing companies in A'ali?", qAr: "هل تعمل مع شركات التصنيع في عالي؟", a: "Yes. We have experience working with manufacturing and industrial companies in A'ali.", aAr: "نعم. لدينا خبرة في العمل مع شركات التصنيع والصناعة في عالي." },
      { q: "Can the AI handle technical specifications for manufacturing?", qAr: "هل يمكن للذكاء الاصطناعي التعامل مع المواصفات التقنية للتصنيع؟", a: "Yes. The RAG system handles PDF, Excel, and Word technical documents.", aAr: "نعم. يتعامل نظام RAG مع وثائق PDF وExcel وWord التقنية." },
    ],
    cities: ["hamad-town", "manama", "saar"],
  },

  saar: {
    country: "Bahrain", countryAr: "البحرين", name: "Saar", nameAr: "سار",
    desc: "Saar is one of Bahrain's most prestigious residential areas, home to international families, embassy residences, and high-net-worth individuals. The area has a distinct commercial character with boutique professional services, private clinics, and exclusive retail. Saar-based businesses serve an affluent clientele that expects the highest standards of confidentiality.",
    descAr: "سار هي إحدى أكثر المناطق السكنية فخامة في البحرين. تتميز بطابعها التجاري المميز مع الخدمات المهنية البوتيكية والعيادات الخاصة والتجزئة الحصرية.",
    whoWeServe: [
      { vertical: "Private Clinics", verticalAr: "العيادات الخاصة", emphasis: "Patient privacy for exclusive medical practices in Saar", emphasisAr: "خصوصية المرضى للممارسات الطبية الحصرية في سار" },
      { vertical: "Family Law Firms", verticalAr: "مكاتب قانون العائلة", emphasis: "Highly sensitive family law matters handled with full security", emphasisAr: "مسائل قانون العائلة الحساسة للغاية تُعالَج بأمان كامل" },
      { vertical: "Wealth Management", verticalAr: "إدارة الثروات", emphasis: "Financial data protection for private wealth advisory", emphasisAr: "حماية البيانات المالية للاستشارات الخاصة لإدارة الثروات" },
    ],
    howItWorks: "We serve Saar as part of our premium Bahrain service offering. Installations in Saar are scheduled discreetly and can be arranged outside business hours on request.",
    howItWorksAr: "نخدم سار كجزء من عرضنا الخدمي المتميز في البحرين. تُجدوَل التركيبات في سار بشكل سري ويمكن ترتيبها خارج ساعات العمل عند الطلب.",
    faq: [
      { q: "Do you offer discreet installation in Saar?", qAr: "هل تقدمون التركيب السري في سار؟", a: "Yes. We understand the importance of discretion for Saar businesses.", aAr: "نعم. نفهم أهمية السرية لشركات سار." },
      { q: "Is Saar in your standard Bahrain service area?", qAr: "هل سار في منطقتك الخدمية القياسية في البحرين؟", a: "Yes. Saar is included in our standard Bahrain service area.", aAr: "نعم. سار مشمولة في منطقتنا الخدمية القياسية في البحرين." },
      { q: "Do you serve private clinics in Saar?", qAr: "هل تخدمون العيادات الخاصة في سار؟", a: "Yes. We have installed AI systems at several private medical practices in Saar.", aAr: "نعم. ركّبنا أنظمة ذكاء اصطناعي في عدة ممارسات طبية خاصة في سار." },
    ],
    cities: ["manama", "muharraq", "aali"],
  },
};

// Saudi cities
export const CITIES_SA: Record<string, CityContent> = {
  riyadh: {
    country: "Saudi Arabia", countryAr: "المملكة العربية السعودية", name: "Riyadh", nameAr: "الرياض",
    desc: "Riyadh is the capital of Saudi Arabia and one of the largest cities in the Middle East, home to thousands of government ministries, multinational corporations, financial institutions, and professional services firms. The city's Vision 2030 economy has created demand for AI tools that meet the highest standards of data security and regulatory compliance. Riyadh-based businesses face particular challenges around data residency.",
    descAr: "الرياض هي عاصمة المملكة العربية السعودية وإحدى أكبر المدن في الشرق الأوسط، موطن لآلاف الوزارات الحكومية والشركات متعددة الجنسيات. خلق اقتصاد رؤية 2030 طلبًا على أدوات ذكاء اصطناعي تلبي أعلى معايير أمن البيانات.",
    whoWeServe: [
      { vertical: "Government Contractors", verticalAr: "مقاولو الجهات الحكومية", emphasis: "Air-gapped AI for Saudi government procurement compliance", emphasisAr: "ذكاء اصطناعي air-gapped للامتثال للمشتريات الحكومية السعودية" },
      { vertical: "Law Firms & Legal Practices", verticalAr: "مكاتب المحاماة", emphasis: "Client privilege and SAMA-compliant data handling", emphasisAr: "سرية العملاء والامتثال لمعالجة البيانات وفق ساما" },
      { vertical: "Financial Services", verticalAr: "الخدمات المالية", emphasis: "Investment data and client portfolio information kept fully private", emphasisAr: "بيانات الاستثمار ومعلومات محفظة العملاء محفوظة بشكل خاص تمامًا" },
    ],
    howItWorks: "For Riyadh businesses, we schedule installation visits typically within 7-10 business days of your assessment. Our technician travels from Al Khobar and can install multiple machines or configure a server deployment in a single visit.",
    howItWorksAr: "لشركات الرياض، نُجدوِل زيارات التركيب عادةً خلال 7-10 أيام عمل من تقييمك. يسافر تقنيانا من الخبر ويمكنه تركيب أجهزة متعددة في زيارة واحدة.",
    faq: [
      { q: "How long does installation take in Riyadh?", qAr: "كم تستغرق عملية التركيب في الرياض؟", a: "We travel from Al Khobar for Riyadh installations. Typical single-machine installation is 3-4 hours.", aAr: "نسافر من الخبر لتركيبات الرياض. التركيب النموذجي لجهاز واحد 3-4 ساعات." },
      { q: "Is travel from Al Khobar included in the price?", qAr: "هل السفر من الخبر مشمول في السعر؟", a: "For Riyadh, a standard travel arrangement is included in the quoted price.", aAr: "للرياض، الترتيب السفري القياسي مشمول في السعر المُسعَّر." },
      { q: "Do you install in government buildings in Riyadh?", qAr: "هل تركّبون في المباني الحكومية في الرياض؟", a: "We install on client hardware in corporate offices. For government contractors, we support air-gapped deployment.", aAr: "نركّب على أجهزة العميل. لمقاولي الجهات الحكومية، ندعم النشر air-gapped." },
    ],
    cities: ["jeddah", "dammam", "al-khobar"],
  },

  jeddah: {
    country: "Saudi Arabia", countryAr: "المملكة العربية السعودية", name: "Jeddah", nameAr: "جدة",
    desc: "Jeddah is Saudi Arabia's commercial capital and main gateway city, home to the King Abdullah Economic City, major port operations, and the largest concentration of international businesses in the Kingdom. Jeddah-based businesses handle enormous volumes of trade documentation, customs paperwork, and cross-border transaction data.",
    descAr: "جدة هي العاصمة التجارية للمملكة العربية السعودية ومدينة البوابة الرئيسية، موطن مدينة الملك عبدالله الاقتصادية وعمليات الميناء الرئيسية وأكبر تجمع للشركات الدولية في المملكة.",
    whoWeServe: [
      { vertical: "Trading & Distribution", verticalAr: "التجارة والتوزيع", emphasis: "Import/export documentation and customs compliance", emphasisAr: "وثائق الاستيراد/التصدير والامتثال الجمركي" },
      { vertical: "International Law Firms", verticalAr: "مكاتب المحاماة الدولية", emphasis: "Cross-border transaction data and client confidentiality", emphasisAr: "بيانات المعاملات عبر الحدود وسرية العملاء" },
      { vertical: "Logistics & Shipping", verticalAr: "الخدمات اللوجستية والشحن", emphasis: "Port documentation and shipping contract analysis", emphasisAr: "وثائق الموانئ وتحليل عقود الشحن" },
    ],
    howItWorks: "We serve Jeddah with installation visits typically scheduled within 7-10 business days. Our Al Khobar-based team travels to Jeddah regularly, and we can often coordinate multiple Jeddah installations in a single trip.",
    howItWorksAr: "نخدم جدة بزيارات تركيب عادةً ما تُجدوَل خلال 7-10 أيام عمل. يسافر فريقنا المقيم في الخبر إلى جدة بانتظام، ويمكننا غالبًا تنسيق عدة تركيبات في جدة في رحلة واحدة.",
    faq: [
      { q: "How do you handle Jeddah installations from Al Khobar?", qAr: "كيف تتعاملون مع تركيبات جدة من الخبر؟", a: "We travel from Al Khobar to Jeddah regularly. We can often coordinate multiple Jeddah installations in a single trip.", aAr: "نسافر من الخبر إلى جدة بانتظام. يمكننا غالبًا تنسيق عدة تركيبات في جدة في رحلة واحدة." },
      { q: "Do you work with Jeddah trading companies?", qAr: "هل تعملون مع شركات التداول في جدة؟", a: "Yes. Jeddah's position as Saudi Arabia's main trade hub means we work extensively with trading companies.", aAr: "نعم. تعني مكانة جدة كمركز تجاري رئيسي أننا نعمل بشكل مكثف مع شركات التداول." },
      { q: "What about Saudi customs and SASO compliance?", qAr: "ماذا عن الجمارك السعودية ولوائح SASO؟", a: "We configure the AI with SASO regulatory knowledge and load your customs documentation into the knowledge base.", aAr: "نُعدّ الذكاء الاصطناعي بمعرفة تنظيمية SASO." },
    ],
    cities: ["riyadh", "mecca", "dammam"],
  },

  dammam: {
    country: "Saudi Arabia", countryAr: "المملكة العربية السعودية", name: "Dammam", nameAr: "الدمام",
    desc: "Dammam is the capital of Saudi Arabia's Eastern Province and a major commercial centre, serving as the regional hub for the oil and gas industry, petrochemicals, and heavy industry. Dammam-based businesses are uniquely positioned to benefit from Premiera Local AI's local installation model, with proximity to our Al Khobar base meaning particularly convenient installation visits.",
    descAr: "الدمام هي عاصمة المنطقة الشرقية للمملكة العربية السعودية ومحور تجاري رئيسي، تخدم كمركز إقليمي لصناعة النفط والغاز والبتروكيماويات والصناعة الثقيلة.",
    whoWeServe: [
      { vertical: "Oil & Gas Companies", verticalAr: "شركات النفط والغاز", emphasis: "Technical documentation and engineering specification Q&A", emphasisAr: "الاستعلام من الوثائق التقنية والمواصفات الهندسية" },
      { vertical: "Professional Services", verticalAr: "الخدمات المهنية", emphasis: "Client confidentiality for accounting and legal firms", emphasisAr: "سرية العملاء لمكاتب المحاسبة والقانون" },
      { vertical: "Healthcare Providers", verticalAr: "مقدمو الرعاية الصحية", emphasis: "Patient records and medical protocol management", emphasisAr: "إدارة سجلات المرضى وبروتوكولات طبية" },
    ],
    howItWorks: "Dammam is extremely well-served from our Al Khobar base — often the same day or next-day installation is possible. We serve Dammam and the surrounding Industrial Areas as part of our core Eastern Province service area at no travel premium.",
    howItWorksAr: "الدمام مُخدَمة بشكل ممتاز من قاعدتنا في الخبر — غالبًا ما يكون التركيب في نفس اليوم أو اليوم التالي ممكنًا. نخدم الدمام والمناطق الصناعية المحيطة بدون قسط سفر.",
    faq: [
      { q: "How quickly can you install in Dammam?", qAr: "ما سرعة التركيب في الدمام؟", a: "Dammam is extremely close to our Al Khobar base — same-day or next-day installation is often possible.", aAr: "الدمام قريبة جدًا من قاعدتنا في الخبر — غالبًا ما يكون التركيب في نفس اليوم أو اليوم التالي ممكنًا." },
      { q: "Do you serve the Dammam Industrial Areas?", qAr: "هل تخدمون المناطق الصناعية في الدمام؟", a: "Yes. We serve all Dammam Industrial Areas, including the Saudi Aramco area and Ras Tanura.", aAr: "نعم. نخدم جميع المناطق الصناعية في الدمام." },
      { q: "Do you work with oil and gas companies in Dammam?", qAr: "هل تعملون مع شركات النفط والغاز في الدمام؟", a: "Yes. We have experience working with oil and gas companies in Dammam and the surrounding areas.", aAr: "نعم. لدينا خبرة في العمل مع شركات النفط والغاز في الدمام." },
    ],
    cities: ["al-khobar", "dhahran", "jubail"],
  },
};

// Merged export
import { CITIES_MORE } from "./cities-more";

export const CITIES = { ...CITIES_BH, ...CITIES_SA, ...CITIES_MORE };
