import { MEDIA_BASE } from './media'

// ---------------------------------------------------------------------------
// Service definitions — one per SEO landing page
// slug, names, hero image, and all page copy
// ---------------------------------------------------------------------------

export type ServiceSlug =
  | 'commercial-film-production-saudi-arabia'
  | 'corporate-video-production-saudi-arabia'
  | 'professional-photography-saudi-arabia'
  | 'animation-cgi-studio-saudi-arabia'
  | 'documentary-production-saudi-arabia'
  | 'event-coverage-saudi-arabia'
  | 'multi-cam-live-streaming-saudi-arabia'
  | 'business-website-development-saudi-arabia'
  | 'business-software-development-saudi-arabia'
  | 'landing-page-design-saudi-arabia'
  | 'booking-system-development-saudi-arabia'
  | 'business-platform-development-saudi-arabia'
  | 'client-portal-development-saudi-arabia'
  | 'ai-assistants-automation-saudi-arabia'
  | 'website-maintenance-saudi-arabia'

export interface ServicePage {
  slug: ServiceSlug
  shortName: string        // used for hero image filename: service-headers/<shortName>.jpg
  nameEn: string
  nameAr: string
  heroImage: string         // full URL
  valuePropEn: string
  valuePropAr: string
  whatWeDeliverEn: string[]
  whatWeDeliverAr: string[]
  howWeWorkEn: { step: string; desc: string }[]
  howWeWorkAr: { step: string; desc: string }[]
  whereWeWorkEn: string
  whereWeWorkAr: string
  faqEn: { q: string; a: string }[]
  faqAr: { q: string; a: string }[]
  ctaMessageEn: string
  ctaMessageAr: string
  relatedSlugs: ServiceSlug[]
}

const SB = MEDIA_BASE + '/service-headers/'

export const SERVICES: ServicePage[] = [
  // ── CINEMATIC PRODUCTION ─────────────────────────────────────────────────
  {
    slug: 'commercial-film-production-saudi-arabia',
    shortName: 'commercial-film',
    nameEn: 'Commercial Film Production in Saudi Arabia',
    nameAr: 'إنتاج الأفلام الإعلانية في السعودية',
    heroImage: SB + 'commercial-film.jpg',
    valuePropEn: 'Cinema-grade commercials for brands that need to be remembered — concept to final cut, delivered by the team behind campaigns for global names.',
    valuePropAr: 'ننتج أفلاماً إعلانية بمستوى سينمائي للعلامات التي تحتاج أن تُذكر — من الفكرة إلى المونتاج النهائي، بفريق يملك خبرة حملات للعلامات العالمية.',
    whatWeDeliverEn: [
      'Scripting and creative development',
      'Cinema-camera production',
      'Professional sound design and colour grade',
      'Versions cut for TV, YouTube, and social platforms',
      'Arabic and English deliverables',
    ],
    whatWeDeliverAr: [
      'كتابة السيناريو والتطوير الإبداعي',
      'التصوير بكاميرات سينمائية',
      'تصميم صوت احترافي وتلوين',
      'نسخ مخصصة للتلفزيون ويوتيوب والمنصات الاجتماعية',
      'مخرجات بالعربية والإنجليزية',
    ],
    howWeWorkEn: [
      { step: 'Discover', desc: 'We learn the product, the audience, and what the campaign needs to achieve.' },
      { step: 'Concept', desc: 'Script, storyboards, and a visual look that fits the brand.' },
      { step: 'Production', desc: 'Shoot with cinema equipment, professional crew, and proper planning.' },
      { step: 'Delivery', desc: 'Grade, sound, and every format your campaign needs across all platforms.' },
    ],
    howWeWorkAr: [
      { step: 'الاكتشاف', desc: 'نفهم المنتج والجمهور وما تحتاجه الحملة لتحقيقه.' },
      { step: 'التصوّر', desc: 'السيناريو والStoryboards والمظهر البصري الذي يناسب العلامة.' },
      { step: 'الإنتاج', desc: 'التصوير بمعدات سينمائية وطاقم محترف وتخطيط دقيق.' },
      { step: 'التسليم', desc: 'التلوين والصوت وكل تنسيقات الحملة التي تحتاجها عبر المنصات.' },
    ],
    whereWeWorkEn: 'We produce commercials across Saudi Arabia — for brands in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and across the Gulf from our base in the region.',
    whereWeWorkAr: 'ننتج الأفلام الإعلانية في أرجاء السعودية — لعلامات في الرياض وجدة والخبر والدمام والجبيل — وعبر الخليج من قاعدتنا في المنطقة.',
    faqEn: [
      { q: 'How long does a commercial take to produce?', a: 'Most commercials are typically delivered within a week of the shoot; complex multi-version campaigns can take longer.' },
      { q: 'Can you produce Arabic and English versions?', a: 'Yes — we deliver in both languages as standard, with professional Arabic voiceover and translation built into our process.' },
      { q: 'Do you work with existing brand guidelines?', a: 'We either follow your existing guidelines or develop the visual style in coordination with your team before production begins.' },
    ],
    faqAr: [
      { q: 'كم يستغرق إنتاج فيلم إعلاني؟', a: 'يُسلَّم معظم الأفلام الإعلانية خلال أسبوع من التصوير عادةً؛ قد تستغرق الحملات المعقدة متعددة النسخ وقتاً أطول.' },
      { q: 'هل تنتجون نسخاً عربية وإنجليزية؟', a: 'نعم — نسلّم باللغتين بشكل أساسي، مع تعليق صوتي عربي احترافي وترجمة ضمن مراحل العمل.' },
      { q: 'هل تعملون وفق دليل الهوية الموجود لدينا؟', a: 'نلتزم بدليل هويتك القائم، أو نطوّر الأسلوب البصري بالتنسيق مع فريقك قبل بدء التصوير.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a commercial film production.',
    ctaMessageAr: 'أرغب في مناقشة إنتاج فيلم إعلاني.',
    relatedSlugs: ['corporate-video-production-saudi-arabia', 'professional-photography-saudi-arabia', 'animation-cgi-studio-saudi-arabia'],
  },
  {
    slug: 'corporate-video-production-saudi-arabia',
    shortName: 'corporate-video',
    nameEn: 'Corporate Video Production in Saudi Arabia',
    nameAr: 'إنتاج الأفلام المؤسسية في السعودية',
    heroImage: SB + 'corporate-video.jpg',
    valuePropEn: 'Corporate films that actually represent your organisation — not generic talking heads, but content built for your audience and your objectives.',
    valuePropAr: 'أفلام مؤسسية تعكس مؤسستك فعلاً — ليست لقطات نمطية مكررة، بل محتوى يُبنى لجمهورك ولأهدافك.',
    whatWeDeliverEn: [
      'Brand and message development',
      'Filming with cinema and broadcast-quality cameras',
      'Professional presenter and interview segments',
      'Motion graphics and post-production',
      'Internal communications and training content',
    ],
    whatWeDeliverAr: [
      'تطوير العلامة والرسالة',
      'التصوير بكاميرات سينمائية وبثية احترافية',
      'مقدم برامج ولقاءات مقابلة احترافية',
      'الرسوم المتحركة وما بعد الإنتاج',
      'محتوى الاتصالات الداخلية والتدريب',
    ],
    howWeWorkEn: [
      { step: 'Brief', desc: 'We identify the audience, the key message, and what outcome the film needs to drive.' },
      { step: 'Script', desc: 'Structured narrative, interview questions, and shot list built around your talking points.' },
      { step: 'Production', desc: 'Filming with proper lighting and sound — on location, in studio, or both.' },
      { step: 'Post', desc: 'Edit, grade, motion graphics, and sound design — final delivery in the formats you need.' },
    ],
    howWeWorkAr: [
      { step: 'الاستبيان', desc: 'نحدد الجمهور والرسالة الأساسية والنتيجة التي يجب أن يحققها الفيلم.' },
      { step: 'السيناريو', desc: 'سردية منظمة وأسئلة المقابلة وقائمة اللقطات مبنية حول نقاطك.' },
      { step: 'الإنتاج', desc: 'التصوير بإضاءة وصوت مناسبين — في الموقع أو الاستوديو أو كليهما.' },
      { step: 'ما بعد الإنتاج', desc: 'المونتاج والتلوين والرسوم المتحركة والتصميم الصوتي — تسليم نهائي بالتنسيقات المطلوبة.' },
    ],
    whereWeWorkEn: 'We produce corporate films for organisations across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve clients throughout the Gulf region.',
    whereWeWorkAr: 'ننتج الأفلام المؤسسية للمنظمات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم عملاءنا في مختلف دول الخليج.',
    faqEn: [
      { q: 'What types of corporate films do you produce?', a: 'Brand films, internal communications, training and onboarding videos, event recaps, executive profiles, and investor content — any format that serves a business objective.' },
      { q: 'Can you film on-site at our offices?', a: 'Yes. We bring full production equipment and crew to your location, or we film in our studio — whichever suits the project better.' },
      { q: 'How do you handle Arabic and English?', a: 'We script, film, and deliver bilingual content as standard, including subtitling, voiceover, or full localised versions.' },
    ],
    faqAr: [
      { q: 'ما أنواع الأفلام المؤسسية التي تنتجونها؟', a: 'أفلام العلامة، والاتصالات الداخلية، ومقاطع التدريب والاستقبال، وتلخيصات الفعاليات، وبروفايلات التنفيذيين، ومحتوى المستثمرين — أي تنسيق يخدم هدفاً تجارياً.' },
      { q: 'هل يمكنكم التصوير في مكاتنا؟', a: 'نعم. نحضر معدات الإنتاج الكاملة والطاقم إلى موقعكم، أو نصوّر في استوديوينا — حسب ما يناسب المشروع.' },
      { q: 'كيف تتعاملون مع العربية والإنجليزية؟', a: 'نكتب ونسجّل ونسلّم محتوى ثنائي اللغة بشكل أساسي، بما في ذلك الترجمات النصية أو التعليق الصوتي أو النسخ المحلية الكاملة.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a corporate video production.',
    ctaMessageAr: 'أرغب في مناقشة إنتاج فيلم مؤسسي.',
    relatedSlugs: ['commercial-film-production-saudi-arabia', 'event-coverage-saudi-arabia', 'professional-photography-saudi-arabia'],
  },
  {
    slug: 'professional-photography-saudi-arabia',
    shortName: 'photography',
    nameEn: 'Professional Photography in Saudi Arabia',
    nameAr: 'التصوير الاحترافي في السعودية',
    heroImage: SB + 'photography.jpg',
    valuePropEn: 'Professional image-making for brands that understand the difference a great photograph makes — from product and campaign shoots to corporate portraiture.',
    valuePropAr: 'إنتاج صور احترافية للعلامات التي تدرك أثر الصورة الممتازة — من تصوير المنتجات والحملات إلى البورتريه المؤسسي.',
    whatWeDeliverEn: [
      'Product and catalogue photography',
      'Campaign and editorial shoots',
      'Corporate and executive portraiture',
      'Architecture and interior photography',
      'Brand and lifestyle content',
    ],
    whatWeDeliverAr: [
      'تصوير المنتجات والكتالوجات',
      'جلسات الحملات والتحرير',
      'البورتريه المؤسسي والتنفيذي',
      'تصوير العمارة والداخليات',
      'محتوى العلامة ونمط الحياة',
    ],
    howWeWorkEn: [
      { step: 'Concept', desc: 'We define the visual direction that serves your brand and your audience.' },
      { step: 'Production', desc: 'Professional lighting, camera, and direction on location or in studio.' },
      { step: 'Post', desc: 'Retouching, colour grading, and delivery in web, print, and social formats.' },
    ],
    howWeWorkAr: [
      { step: 'التصوّر', desc: 'نحدد الاتجاه البصري الذي يخدم علامتك وجمهورك.' },
      { step: 'الإنتاج', desc: 'إضاءة احترافية وكاميرا وتوجيه في الموقع أو الاستوديو.' },
      { step: 'ما بعد الإنتاج', desc: 'المعالجة اللونية وتعديل الألوان والتسليم بصيغ الويب والطباعة والاجتماع.' },
    ],
    whereWeWorkEn: 'We work with brands and agencies across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and deliver to clients throughout the Gulf.',
    whereWeWorkAr: 'نعمل مع العلامات والوكالات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونسلّم لعملاءنا في مختلف دول الخليج.',
    faqEn: [
      { q: 'Do you offer same-day delivery for photography?', a: 'Standard turnaround is three to five business days for edited selects, with express options available depending on project size.' },
      { q: 'Can you shoot on-location?', a: 'Yes — we bring full studio-quality lighting and equipment to your chosen location anywhere in Saudi Arabia and the Gulf.' },
      { q: 'What file formats do you deliver?', a: 'We deliver high-resolution JPEG and RAW files, optimised web versions, and format-specific exports for print or digital use.' },
    ],
    faqAr: [
      { q: 'هل تقدّمون تسليم الصور في نفس اليوم؟', a: 'المدة المعتادة للتسليم هي ثلاثة إلى خمسة أيام عمل للصور المعدلة، مع خيارات سريعة حسب حجم المشروع.' },
      { q: 'هل يمكنكم التصوير في الموقع؟', a: 'نعم — نحضر معدات الاستوديو والإضاءة الكاملة إلى موقعكم المختار في أي مكان في السعودية والخليج.' },
      { q: 'ما صيغ التسليم؟', a: 'نسلّم ملفات JPEG وRAW عالية الدقة، ونسخ محسّنة للويب، وصيغ مصدّرة مخصصة للطباعة أو الاستخدام الرقمي.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a professional photography project.',
    ctaMessageAr: 'أرغب في مناقشة مشروع تصوير احترافي.',
    relatedSlugs: ['commercial-film-production-saudi-arabia', 'corporate-video-production-saudi-arabia', 'event-coverage-saudi-arabia'],
  },
  {
    slug: 'animation-cgi-studio-saudi-arabia',
    shortName: 'animation-cgi',
    nameEn: 'Animation and CGI Studio in Saudi Arabia',
    nameAr: 'استوديو الرسوم المتحركة والمؤثرات في السعودية',
    heroImage: SB + 'animation-cgi.jpg',
    valuePropEn: 'Animation and CGI work that makes the unshootable look real — for product visualisation, explainers, idents, and commercial content that needs to stand out.',
    valuePropAr: 'أعمال الرسوم المتحركة والمؤثرات التي تجعل ما لا يُصوَّر حقيقياً — للتصوّر المنتجي والشروحات وهويات الشركات ومحتوى الإعلان الذي يحتاج للتميّز.',
    whatWeDeliverEn: [
      '3D product visualisation and rendering',
      'Motion graphics and brand animation',
      'Explainer and educational animation',
      'Commercial CGI and VFX',
      'Animated social content',
    ],
    whatWeDeliverAr: [
      'تصوّر المنتجات ثلاثي الأبعاد وعرضها',
      'الرسوم المتحركة وهويات العلامات',
      'رسوم الشروحات والتعليم',
      'المؤثرات والإعلانات ثلاثية الأبعاد',
      'محتوى رسوم متحركة للمنصات الاجتماعية',
    ],
    howWeWorkEn: [
      { step: 'Brief', desc: 'We clarify the objective, audience, and the role animation plays in the overall campaign.' },
      { step: 'Design', desc: 'Storyboarding and style frames — we agree the look before animation begins.' },
      { step: 'Production', desc: '3D modelling, animation, rendering, and compositing at the resolution and quality your project demands.' },
      { step: 'Delivery', desc: 'Final renders in every format and resolution your platforms need.' },
    ],
    howWeWorkAr: [
      { step: 'الاستبيان', desc: 'نوضّح الهدف والجمهور والدور الذي تؤديه الرسوم المتحركة في الحملة.' },
      { step: 'التصميم', desc: 'الـ Storyboards والإطارات الأسلوبية — نتفق على المظهر قبل بدء الرسوم المتحركة.' },
      { step: 'الإنتاج', desc: 'نمذجة ثلاثية الأبعاد والحركة والرendering والتركيب بالدقة والجودة التي يحتاجها مشروعك.' },
      { step: 'التسليم', desc: 'مونتاج نهائي بكل تنسيق ودقة يحتاجها مشروعك.' },
    ],
    whereWeWorkEn: 'We deliver animation and CGI work to clients across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and across the Gulf region.',
    whereWeWorkAr: 'نقدّم أعمال الرسوم المتحركة والمؤثرات للعملاء في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — وعبر دول الخليج.',
    faqEn: [
      { q: 'What software do you use for CGI and animation?', a: 'We use a range of industry-standard tools including Cinema 4D, Blender, and After Effects, selected per project requirements.' },
      { q: 'Can animation explain complex products?', a: 'Yes — product visualisation and explainer animation are two of our most requested services. We translate complex concepts into clear, watchable content.' },
      { q: 'What turnaround times apply?', a: 'Animation projects are typically delivered within 2–3 days; extensive CGI sequences can take longer.' },
    ],
    faqAr: [
      { q: 'ما البرمجيات التي تستخدمونها للرسوم المتحركة والمؤثرات؟', a: 'نستخدم مجموعة من الأدوات المعيارية في الصناعة تشمل Cinema 4D وBlender وAfter Effects، نختارها حسب متطلبات كل مشروع.' },
      { q: 'هل يمكن للرسوم المتحركة شرح المنتجات المعقدة؟', a: 'نعم — تصوّر المنتجات ورسوم الشروحات هما من أكثر خدماتنا طلباً. نترجم المفاهيم المعقدة إلى محتوى واضح وقابل للمشاهدة.' },
      { q: 'ما مدة التسليم للمشاريع المتحركة؟', a: 'نسلّم مشاريع الرسوم المتحركة خلال يومين إلى ثلاثة أيام عادةً، وقد تستغرق المشاهد المعقدة وقتاً أطول.' },
    ],
    ctaMessageEn: 'I\'d like to discuss an animation or CGI project.',
    ctaMessageAr: 'أرغب في مناقشة مشروع رسوم متحركة أو مؤثرات.',
    relatedSlugs: ['commercial-film-production-saudi-arabia', 'multi-cam-live-streaming-saudi-arabia', 'documentary-production-saudi-arabia'],
  },
  {
    slug: 'documentary-production-saudi-arabia',
    shortName: 'documentary',
    nameEn: 'Documentary Production in Saudi Arabia',
    nameAr: 'إنتاج الأفلام الوثائقية في السعودية',
    heroImage: SB + 'documentary.jpg',
    valuePropEn: 'Documentary filmmaking that earns attention — real stories, real people, structured and shot to hold an audience and communicate something that matters.',
    valuePropAr: 'صناعة الأفلام الوثائقية التي تستحق الانتباه — قصص حقيقية وأشخاص حقيقيون، تُبنى وتُصوَّر لامتصاص الجمهور والتواصل حول شيء يهم.',
    whatWeDeliverEn: [
      'Research and narrative development',
      'On-location filming with broadcast-quality cameras',
      'Interview and observational cinematography',
      'Archival footage and graphics integration',
      'Full post-production including edit, grade, and sound',
    ],
    whatWeDeliverAr: [
      'البحث وتطوير السردية',
      'التصوير في الموقع بكاميرات البث',
      'الكاميرا بالمقابلة والملاحظة',
      'دمج المواد الأرشيفية والرسوم',
      'ما بعد الإنتاج الكامل من مونتاج وتلوين وصوت',
    ],
    howWeWorkEn: [
      { step: 'Research', desc: 'We develop the story structure, identify key contributors, and plan the shoot around access and narrative requirements.' },
      { step: 'Production', desc: 'Filming with the right kit for every environment — controlled studio or real-world locations.' },
      { step: 'Post', desc: 'Structured edit, colour grade, sound design, and any graphics or archival integration required.' },
    ],
    howWeWorkAr: [
      { step: 'البحث', desc: 'نطوّر بنية القصة ونحدد المساهمين الرئيسيين ونخطط التصوير حول متطلبات الوصول والسردية.' },
      { step: 'الإنتاج', desc: 'التصوير بالمعدات المناسبة لكل بيئة — استوديو محكوم أو مواقع واقعية.' },
      { step: 'ما بعد الإنتاج', desc: 'مونتاج منظم وتلوين وتصميم صوتي وأي رسوم أو مواد أرشيفية مطلوبة.' },
    ],
    whereWeWorkEn: 'We produce documentary content for clients and organisations across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and work throughout the Gulf.',
    whereWeWorkAr: 'ننتج محتوى وثائقياً للعملاء والمنظمات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونعمل عبر دول الخليج.',
    faqEn: [
      { q: 'What topics do you documentary?', a: 'We work across corporate, cultural, social, and brand documentary — any subject that has a real story worth telling in this form.' },
      { q: 'How long are your documentaries?', a: 'Format is driven by purpose. We produce short-form documentaries (five to fifteen minutes) through to long-form hour-plus pieces, depending on the story and where it will be seen.' },
      { q: 'Can you work with non-professional contributors?', a: 'Yes — one of our core skills is directing real people on camera in a way that feels natural and communicates authentically.' },
    ],
    faqAr: [
      { q: 'ما المواضيع التي تصوّرونها وثائقياً؟', a: 'نعمل في الوثائقي المؤسسي والثقافي والاجتماعي وهويات العلامات — أي موضوع يملك قصة حقيقية تستحق أن تُروى بهذا الشكل.' },
      { q: 'ما مدة الأفلام الوثائقية التي تنتجونها؟', a: 'التنسيق مدفوع بالغرض. ننتج وثائقيات قصيرة (من خمس إلى خمس عشرة دقيقة) وصولاً إلى الأعمال الطويلة التي تزيد عن ساعة، حسب القصة وأين ستُعرض.' },
      { q: 'هل يمكنكم العمل مع مشاركين غير محترفين؟', a: 'نعم — من مهاراتنا الأساسية إخراج الأشخاص الحقيقيين أمام الكاميرا بطريقة تبدو طبيعية وتتواصل بصدق.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a documentary project.',
    ctaMessageAr: 'أرغب في مناقشة مشروع فيلم وثائقي.',
    relatedSlugs: ['commercial-film-production-saudi-arabia', 'corporate-video-production-saudi-arabia', 'event-coverage-saudi-arabia'],
  },
  {
    slug: 'event-coverage-saudi-arabia',
    shortName: 'event-coverage',
    nameEn: 'Event Coverage in Saudi Arabia',
    nameAr: 'تغطية الفعاليات في السعودية',
    heroImage: SB + 'event-coverage.jpg',
    valuePropEn: 'Professional event coverage that captures what actually happened — not just a record, but a document of the experience your audience cares about.',
    valuePropAr: 'تغطية احترافية للفعاليات توثّق ما حدث فعلاً — ليست مجرد سجل، بل توثيق للتجربة التي يهتم بها جمهورك.',
    whatWeDeliverEn: [
      'Multi-camera event filming',
      'Highlight reels and same-day edits',
      'Speaker and keynote capture',
      'Attendee and atmosphere footage',
      'Social cuts for post-event marketing',
    ],
    whatWeDeliverAr: [
      'تصوير فعاليات بعدة كاميرات',
      'مونتاج أبرز اللقطات وتحريرات يوم التسليم',
      'التقاط الكلمات والجلسات الرئيسية',
      'مقاطع الحضور والأجواء',
      'قصاصات اجتماعية للتسويق بعد الحدث',
    ],
    howWeWorkEn: [
      { step: 'Scout', desc: 'We review the venue, schedule, and key moments so we can plan camera positions and coverage before the event.' },
      { step: 'Production', desc: 'Professional multi-camera setup, run-and-gun crew, and a director managing live coverage.' },
      { step: 'Post', desc: 'Edited highlight reel, full-length recordings of sessions, and social-formatted cuts ready for your channels.' },
    ],
    howWeWorkAr: [
      { step: 'الاستكشاف', desc: 'نراجع المكان والجدول واللحظات الرئيسية حتى نتمكن منخطيط مواضع الكاميرات والتغطية قبل الحدث.' },
      { step: 'الإنتاج', desc: 'إعداد احترافي بعدة كاميرات وطاقم تصوير مرن ومخرج يدير التغطية مباشرة.' },
      { step: 'ما بعد الإنتاج', desc: 'مونتاج أبرز اللقطات وتسجيلات الجلسات كاملةً وقصاصات اجتماعية جاهزة لقنواتك.' },
    ],
    whereWeWorkEn: 'We cover events throughout Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and provide on-location crews across the Gulf.',
    whereWeWorkAr: 'نغطي الفعاليات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونوفّر طواقم تصوير في الموقع عبر دول الخليج.',
    faqEn: [
      { q: 'Can you deliver highlight content the same day?', a: 'Event films are typically delivered within 1–2 days of the event.' },
      { q: 'How many cameras do you bring?', a: 'Standard coverage is two to four cameras depending on event size. We assess the schedule and key moments to determine the right setup.' },
      { q: 'Do you handle live streaming as well?', a: 'Yes — we offer multi-cam live streaming as a separate service, or integrated with on-site event coverage.' },
    ],
    faqAr: [
      { q: 'هل يمكنكم تسليم أبرز اللقطات في نفس اليوم؟', a: 'نسلّم الأفلام الوثائقية للفعاليات خلال يوم إلى يومين من الحدث عادةً.' },
      { q: 'كم كاميرا تحضرون؟', a: 'التغطية المعيارية هي اثنتان إلى أربع كاميرات حسب حجم الحدث. نقيّم الجدول واللحظات الرئيسية لتحديد الإعداد المناسب.' },
      { q: 'هل تتولون البث المباشر أيضاً؟', a: 'نعم — نقدّم البث المباشر بعدة كاميرات كخدمة منفصلة، أو مدمجة مع تغطية الفعالية في الموقع.' },
    ],
    ctaMessageEn: 'I\'d like to discuss event coverage for an upcoming event.',
    ctaMessageAr: 'أرغب في مناقشة تغطية فعالية قادمة.',
    relatedSlugs: ['multi-cam-live-streaming-saudi-arabia', 'corporate-video-production-saudi-arabia', 'commercial-film-production-saudi-arabia'],
  },
  {
    slug: 'multi-cam-live-streaming-saudi-arabia',
    shortName: 'live-streaming',
    nameEn: 'Multi-Cam Live Streaming in Saudi Arabia',
    nameAr: 'البث المباشر متعدد الكاميرات في السعودية',
    heroImage: SB + 'live-streaming.jpg',
    valuePropEn: 'Professional live streaming with multiple cameras and crew — for events, launches, conferences, and broadcasts that need to represent your brand correctly.',
    valuePropAr: 'بث مباشر احترافي بعدة كاميرات وطاقم — للفعاليات وإطلاقات المنتجات والمؤتمرات والبثّات التي تحتاج لتمثيل علامتك بشكل صحيح.',
    whatWeDeliverEn: [
      'Multi-camera live switching',
      'Professional encoding and streaming setup',
      'Custom branded overlays and lower thirds',
      'Speaker and panel capture',
      ' simulive and on-demand replay options',
    ],
    whatWeDeliverAr: [
      'تحويل مباشر بعدة كاميرات',
      'إعداد ترميز وبث احترافي',
      'تراكبات وـ Lower thirds مخصصة بالعلامة',
      'التقاط الكلمات والجلسات',
      'خيارات البث المؤجل وإعادة المشاهدة',
    ],
    howWeWorkEn: [
      { step: 'Platform', desc: 'We recommend and configure the right streaming platform for your audience — YouTube, Vimeo, or a custom embed.' },
      { step: 'Production', desc: 'Multi-camera setup, vision mixing, graphics, and a dedicated streaming operator managing the broadcast.' },
      { step: 'Delivery', desc: 'Live broadcast managed end-to-end, with recorded archive and edited replay if requested.' },
    ],
    howWeWorkAr: [
      { step: 'المنصة', desc: 'نوصي ونُعدّ المنصة المناسبة لبثكم — يوتيوب أو Vimeo أو تضمين مخصص.' },
      { step: 'الإنتاج', desc: 'إعداد عدة كاميرات وخلط الصور والرسوم ومُشغّل بث مخصص يدير الإرسال.' },
      { step: 'التسليم', desc: 'بث مباشر مُدار من البداية إلى النهاية، مع أرشيف مسجل وإعادة مونتاج إذا طُلب.' },
    ],
    whereWeWorkEn: 'We stream live events across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and manage broadcasts for clients throughout the Gulf.',
    whereWeWorkAr: 'نبثّ الفعاليات مباشرةً في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — وندير البثّات للعملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'What platform do you stream to?', a: 'We support YouTube, Vimeo, and custom RTMP embeds — we configure the platform that reaches your audience best.' },
      { q: 'Can you handle large audience streams?', a: 'Yes — we use professional encoding and CDN distribution to handle concurrent audiences of thousands without degradation.' },
      { q: 'Do you offer hybrid in-person and streaming events?', a: 'Yes — we regularly produce events that have an in-person audience and a simultaneous live stream, with separate crew and production for each.' },
    ],
    faqAr: [
      { q: 'إلى أي منصة تبثّون؟', a: 'ندعم يوتيوب وVimeo وRTMP مخصص — نُعدّ المنصة التي تصل بجمهورك بأفضل شكل.' },
      { q: 'هل تتعاملون مع جماهير كبيرة؟', a: 'نعم — نستخدم ترميزاً احترافياً وتوزيع CDN للتعامل مع آلاف المشاهدين المتزامنين دون تدهور.' },
      { q: 'هل تقدّمون فعاليات هجينة حضورية وبثاً مباشراً؟', a: 'نعم — ننتج بانتظام فعاليات لها جمهور حاضر وبث مباشر متزامن، مع طاقم وإنتاج منفصل لكل منهما.' },
    ],
    ctaMessageEn: 'I\'d like to discuss live streaming for an upcoming event.',
    ctaMessageAr: 'أرغب في مناقشة بث مباشر لفعالية قادمة.',
    relatedSlugs: ['event-coverage-saudi-arabia', 'corporate-video-production-saudi-arabia', 'commercial-film-production-saudi-arabia'],
  },

  // ── DIGITAL EXPERIENCES ───────────────────────────────────────────────────
  {
    slug: 'business-website-development-saudi-arabia',
    shortName: 'business-website',
    nameEn: 'Business Website Development in Saudi Arabia',
    nameAr: 'بناء مواقع الأعمال في السعودية',
    heroImage: SB + 'business-website.jpg',
    valuePropEn: 'Business websites engineered to perform — fast, bilingual, and connected to the systems that run your operations. Built by a team that understands both design and development.',
    valuePropAr: 'مواقع أعمال مصمّمة للأداء — سريعة وثنائية اللغة ومتصلة بالأنظمة التي تشغّل عملك. يبنيها فريق يفهم التصميم والتطوير معاً.',
    whatWeDeliverEn: [
      'Custom design and front-end development',
      'Bilingual Arabic and English builds',
      'CMS integration for in-house teams',
      'SEO foundations built into the structure',
      'Ongoing maintenance and support',
    ],
    whatWeDeliverAr: [
      'تصميم مخصص وتطوير الواجهة الأمامية',
      'بناء ثنائي اللغة العربية والإنجليزية',
      'تكامل نظام إدارة المحتوى للفرق الداخلية',
      'أساسيات تحسين محركات البحث مبنية في الهيكل',
      'صيانة ودعم مستمر',
    ],
    howWeWorkEn: [
      { step: 'Discovery', desc: 'We map your audience, define site structure, and plan the journey from discovery to conversion.' },
      { step: 'Design', desc: 'Responsive, on-brand design developed with conversion in mind from the first wireframe.' },
      { step: 'Build', desc: 'Clean, maintainable code. Fast loading, accessible, and ready for your team to manage after launch.' },
      { step: 'Launch', desc: 'QA, performance testing, and deployment — with training for your content team if needed.' },
    ],
    howWeWorkAr: [
      { step: 'الاكتشاف', desc: 'نرسم خريطة جمهورك ونحدد بنية الموقع ونخطط رحلة الزائر من الاكتشاف إلى التحويل.' },
      { step: 'التصميم', desc: 'تصميم متجاوب ومطابق للعلامة ومصمم بتحويل الزوار في الاعتبار من أول Wireframe.' },
      { step: 'البناء', desc: 'كود نظيف وقابل للصيانة. سريع التحميل ومتاح وجاهز لفريقك للإدارة بعد الإطلاق.' },
      { step: 'الإطلاق', desc: 'اختبار الجودة والأداء والنشر — مع تدريب فريق المحتوى إذا لزم.' },
    ],
    whereWeWorkEn: 'We build business websites for clients across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve organisations throughout the Gulf.',
    whereWeWorkAr: 'نبني مواقع أعمال للعملاء في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم المنظمات في مختلف دول الخليج.',
    faqEn: [
      { q: 'How long does a business website take to build?', a: 'Most business websites are typically delivered within 1–2 weeks from brief to launch.' },
      { q: 'Do you build bilingual Arabic and English websites?', a: 'Yes — bilingual builds are standard for us. We handle RTL, Arabic typography, and proper language versioning as part of every project.' },
      { q: 'Can you migrate our existing website?', a: 'Yes — we manage the full migration process including DNS, content transfer, and redirect mapping to preserve existing search visibility.' },
    ],
    faqAr: [
      { q: 'كم يستغرق بناء موقع عمل؟', a: 'نسلّم معظم مواقع الأعمال خلال أسبوع إلى أسبوعين من الملخص إلى الإطلاق عادةً.' },
      { q: 'هل تبون مواقع ثنائية اللغة عربية وإنجليزية؟', a: 'نعم — البناء الثنائي اللغة معيار أساسي لدينا. نتعامل مع RTL والخط العربي وإصدار اللغة كجزء من كل مشروع.' },
      { q: 'هل يمكنكم نقل موقعنا القائم؟', a: 'نعم — ندير عملية النقل الكاملة بما في ذلك DNS ونقل المحتوى وتخطيط الـ Redirect للحفاظ على ظهور البحث.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a business website project.',
    ctaMessageAr: 'أرغب في مناقشة مشروع موقع عمل.',
    relatedSlugs: ['landing-page-design-saudi-arabia', 'business-software-development-saudi-arabia', 'website-maintenance-saudi-arabia'],
  },
  {
    slug: 'business-software-development-saudi-arabia',
    shortName: 'business-software',
    nameEn: 'Business Software Development in Saudi Arabia',
    nameAr: 'بناء البرمجيات المؤسسية في السعودية',
    heroImage: SB + 'business-software.jpg',
    valuePropEn: 'Custom software built for your specific operations — not adapted from a template, but engineered around how your business actually works.',
    valuePropAr: 'برمجيات مخصصة تُبنى لعملياتك المحددة — ليست معدّلة من قالب، بل مصمّمة حول طريقة عمل عملك فعلاً.',
    whatWeDeliverEn: [
      'Requirements and technical specification',
      'Custom web and mobile application development',
      'Database design and API development',
      'Integration with existing business tools',
      'Testing, deployment, and documentation',
    ],
    whatWeDeliverAr: [
      'تحليل المتطلبات والمواصفات التقنية',
      'تطوير تطبيقات الويب والهاتف المخصصة',
      'تصميم قواعد البيانات وتطوير واجهات برمجة',
      'التكامل مع أدوات العمل القائمة',
      'الاختبار والنشر والتوثيق',
    ],
    howWeWorkEn: [
      { step: 'Analysis', desc: 'We map your current workflows, identify inefficiencies, and define what the software needs to achieve.' },
      { step: 'Architecture', desc: 'Technical specification covering database design, API structure, and how the system connects to your existing stack.' },
      { step: 'Build', desc: 'Iterative development with regular demos — you see progress and can direct the build throughout.' },
      { step: 'Deploy', desc: 'Testing, documentation, training, and handover — we stay involved until your team is confident with the system.' },
    ],
    howWeWorkAr: [
      { step: 'التحليل', desc: 'نرسم خريطة سير العمل الحالي ونحدد أوجه القصور ونحدد ما يجب أن تحققه البرمجيات.' },
      { step: 'التصميم', desc: 'مواصفات تقنية تشمل تصميم قاعدة البيانات وهيكل API وكيف يتصل النظام بمكدسك القائم.' },
      { step: 'البناء', desc: 'تطوير تكراري مع عروض توضيحية منتظمة — ترى التقدم وتوجّه البناء طوال الوقت.' },
      { step: 'النشر', desc: 'الاختبار والتوثيق والتدريب والتسليم — نبقى مشاركين حتى يصبح فريقك واثقاً بالنظام.' },
    ],
    whereWeWorkEn: 'We develop custom business software for organisations across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and deliver to clients throughout the Gulf.',
    whereWeWorkAr: 'نطوّر برمجيات أعمال مخصصة للمنظمات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونسلّم للعملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'What technologies do you use?', a: 'We select the right stack per project from modern, maintainable options — including Python, Node.js, React, and cloud infrastructure on AWS or Azure.' },
      { q: 'Can you integrate with our existing systems?', a: 'Yes — API integration is part of most enterprise software projects. We map your existing tools and build the connections before we write any new code.' },
      { q: 'How do you handle data security?', a: 'Security is built into our architecture from the start — including role-based access, encrypted storage, and compliance with relevant data protection standards.' },
    ],
    faqAr: [
      { q: 'ما التقنيات التي تستخدمونها؟', a: 'نختار المكدس المناسب لكل مشروع من الخيارات الحديثة والقابلة للصيانة — بما في ذلك Python وNode.js وReact والبنية السحابية على AWS أو Azure.' },
      { q: 'هل يمكنكم التكامل مع أنظمتنا القائمة؟', a: 'نعم — التكامل عبر API هو جزء من معظم مشاريع البرمجيات المؤسسية. نرسم خريطة أدواتك القائمة ونبني الاتصالات قبل كتابة أي كود جديد.' },
      { q: 'كيف تتعاملون مع أمان البيانات؟', a: 'الأمان يُبنى في هندستنا من البداية — بما في ذلك الوصول المستند إلى الأدوار والتشفير والامتثال لمعايير حماية البيانات ذات الصلة.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a business software project.',
    ctaMessageAr: 'أرغب في مناقشة مشروع برمجيات أعمال.',
    relatedSlugs: ['business-website-development-saudi-arabia', 'business-platform-development-saudi-arabia', 'ai-assistants-automation-saudi-arabia'],
  },
  {
    slug: 'landing-page-design-saudi-arabia',
    shortName: 'landing-page',
    nameEn: 'Landing Page Design in Saudi Arabia',
    nameAr: 'تصميم صفحات الهبوط في السعودية',
    heroImage: SB + 'landing-page.jpg',
    valuePropEn: 'Landing pages designed to do one thing — convert the visitors you drive to them into leads or customers. Built fast, tested, and optimised around your campaign goals.',
    valuePropAr: 'صفحات هبوط مصممة لهدف واحد — تحويل الزوار الذين يصلون إليها إلى عملاء محتملين أو عملاء. تُبنى بسرعة وتُختبر وتُحسَّن حول أهداف حملتك.',
    whatWeDeliverEn: [
      'Conversion-focused page design',
      'A/B variant development',
      'Form and CRM integration',
      'Performance monitoring setup',
      'Copywriting and creative direction',
    ],
    whatWeDeliverAr: [
      'تصميم صفحة مركز على التحويل',
      'تطوير نسخ A/B',
      'تكامل النماذج وCRM',
      'إعداد مراقبة الأداء',
      'كتابة النصوص والتوجيه الإبداعي',
    ],
    howWeWorkEn: [
      { step: 'Goal', desc: 'We define the conversion action — what a successful page visit looks like for your campaign.' },
      { step: 'Build', desc: 'Fast to load, clear hierarchy, compelling copy — designed to guide the visitor toward that action.' },
      { step: 'Test', desc: 'We set up A/B testing where relevant and configure conversion tracking so you can see what is working.' },
    ],
    howWeWorkAr: [
      { step: 'الهدف', desc: 'نحدد إجراء التحويل — ماذا تعني زيارة الصفحة الناجحة لحملتك.' },
      { step: 'البناء', desc: 'سريعة التحميل، تسلسل واضح، نصوص مقنعة — مصممة لتوجيه الزائر نحو ذلك الإجراء.' },
      { step: 'الاختبار', desc: 'نُعدّ اختبارات A/B عند الملاءمة ونُعدّ تتبع التحويل حتى ترى ما يعمل.' },
    ],
    whereWeWorkEn: 'We design and build landing pages for campaigns serving audiences across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and for clients throughout the Gulf.',
    whereWeWorkAr: 'نصمّم ونبني صفحات هبوط للحملات التي تخدم جماهير في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ولعملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'How long does a landing page take to build?', a: 'Landing pages are typically delivered within 1–3 business days.' },
      { q: 'Do you handle the copy as well as the design?', a: 'Yes — we write and design landing pages as a complete deliverable. Copy is developed around your campaign brief and tested for clarity.' },
      { q: 'Can you integrate with our CRM or marketing tools?', a: 'Yes — standard integrations include HubSpot, Salesforce, Mailchimp, and custom webhook connections to your existing tools.' },
    ],
    faqAr: [
      { q: 'كم يستغرق بناء صفحة هبوط؟', a: 'نسلّم صفحات الهبوط خلال يوم إلى ثلاثة أيام عمل عادةً.' },
      { q: 'هل تتولون النصوص بالإضافة إلى التصميم؟', a: 'نعم — نكتب ونصمّم صفحات الهبوط كحزمة تسليم كاملة. تُطوّر النصوص حول ملخص حملتك وتُختبر من حيث الوضوح.' },
      { q: 'هل يمكنكم التكامل مع CRM أو أدوات التسويق لدينا؟', a: 'نعم — التكاملات المعيارية تشمل HubSpot وSalesforce وMailchimp وروابط Webhook مخصصة لأدواتك القائمة.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a landing page for an upcoming campaign.',
    ctaMessageAr: 'أرغب في مناقشة صفحة هبوط لحملة قادمة.',
    relatedSlugs: ['business-website-development-saudi-arabia', 'business-software-development-saudi-arabia', 'ai-assistants-automation-saudi-arabia'],
  },
  {
    slug: 'booking-system-development-saudi-arabia',
    shortName: 'booking-system',
    nameEn: 'Booking System Development in Saudi Arabia',
    nameAr: 'بناء أنظمة الحجز في السعودية',
    heroImage: SB + 'booking-system.jpg',
    valuePropEn: 'Booking and reservation systems that your customers actually use — designed around your operation, integrated with your calendar, and built to reduce no-shows and administrative overhead.',
    valuePropAr: 'أنظمة حجز ومواعيد يستخدمها عملاؤك فعلاً — مصممة حول عملياتك ومتصلّة ببياناتك ومبنية لتقليل عدم الحضور والضغط الإداري.',
    whatWeDeliverEn: [
      'Custom booking flow design and development',
      'Calendar and resource management integration',
      'Automated confirmations and reminders',
      'Payment and deposit processing',
      'Admin dashboard and reporting',
    ],
    whatWeDeliverAr: [
      'تصميم وتطوير تدفق حجز مخصص',
      'تكامل إدارة التقويم والموارد',
      'تأكيدات وتذكيرات آلية',
      'معالجة الدفعات وشارات الحجز',
      'لوحة تحكم إدارية وتقارير',
    ],
    howWeWorkEn: [
      { step: 'Map', desc: 'We understand your booking process — the resources, staff, and steps involved — before we design a single screen.' },
      { step: 'Design', desc: 'A booking experience built for your customers — simple, clear, and available on mobile as standard.' },
      { step: 'Build', desc: 'Custom development with your existing tools integrated — calendar, payment, SMS, and CRM connections.' },
      { step: 'Launch', desc: 'Testing with real bookings before go-live, and training for your team.' },
    ],
    howWeWorkAr: [
      { step: 'الخرائط', desc: 'نفهم عملية الحجز لديك — الموارد والموظفين والخطوات involved — قبل تصميم أي شاشة.' },
      { step: 'التصميم', desc: 'تجربة حجز مبنية لعملائك — بسيطة وواضحة ومتاحة على الهاتف كأساس.' },
      { step: 'البناء', desc: 'تطوير مخصص مع تكامل أدواتك القائمة — التقويم والدفع والرسائل وCRM.' },
      { step: 'الإطلاق', desc: 'اختبار بحجوزات حقيقية قبل التشغيل، وتدريب لفريقك.' },
    ],
    whereWeWorkEn: 'We build booking systems for businesses in Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve clients throughout the Gulf.',
    whereWeWorkAr: 'نبني أنظمة حجز للأعمال في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم العملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'Can your booking system handle multiple locations?', a: 'Yes — multi-location support is standard. We configure resources, staff, and availability per location based on your operational setup.' },
      { q: 'Does it support Arabic and English?', a: 'Yes — bilingual interfaces are built in as standard, with RTL support and Arabic character handling throughout.' },
      { q: 'Can it handle deposits and payments?', a: 'Yes — we integrate with payment providers that operate in Saudi Arabia and the Gulf, including support for SADAD and card processing.' },
    ],
    faqAr: [
      { q: 'هل يمكن لنظام الحجز التعامل مع مواقع متعددة؟', a: 'نعم — دعم المواقع المتعددة أساسي. نُعدّ الموارد والموظفين والتوفر لكل موقع بناءً على إعداد عملياتك.' },
      { q: 'هل يدعم العربية والإنجليزية؟', a: 'نعم — واجهات ثنائية اللغة مبنية كأساس، مع دعم RTL ومعالجة الأحرف العربية طوال الوقت.' },
      { q: 'هل يتعامل مع الدفعات وشارات الحجز؟', a: 'نعم — نتكامل مع مزودي الدفع الذين يعملون في السعودية والخليج، بما في ذلك دعم SADAD ومعالجة البطاقات.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a booking system for our business.',
    ctaMessageAr: 'أرغب في مناقشة نظام حجز لعمالنا.',
    relatedSlugs: ['business-software-development-saudi-arabia', 'business-platform-development-saudi-arabia', 'client-portal-development-saudi-arabia'],
  },
  {
    slug: 'business-platform-development-saudi-arabia',
    shortName: 'business-platform',
    nameEn: 'Business Platform Development in Saudi Arabia',
    nameAr: 'بناء منصات الأعمال في السعودية',
    heroImage: SB + 'business-platform.jpg',
    valuePropEn: 'Full-scale business platforms — the kind that run operations, serve customers, or create new revenue channels. Built with the architecture that scales with your ambitions.',
    valuePropAr: 'منصات أعمال كاملة النطاق — النوع الذي يشغّل العمليات ويخدم العملاء أو يخلق قنوات إيرادات جديدة. تُبنى بالهندسة التي تنمو مع طموحاتك.',
    whatWeDeliverEn: [
      'Platform architecture and technical specification',
      'Full-stack web application development',
      'User authentication and role-based access',
      'Third-party API integrations',
      'Scalable cloud deployment',
    ],
    whatWeDeliverAr: [
      'هندسة المنصة والمواصفات التقنية',
      'تطوير تطبيقات الويب full-stack',
      'مصادقة المستخدمين والوصول المستند إلى الأدوار',
      'تكاملات واجهات برمجة الطرف الثالث',
      'نشر سحابي قابل للتوسع',
    ],
    howWeWorkEn: [
      { step: 'Scope', desc: 'We define what the platform needs to do, who uses it, and how it connects to your existing business systems.' },
      { step: 'Architecture', desc: 'Technical design covering database, API, security model, and infrastructure — built for scale from day one.' },
      { step: 'Build', desc: 'Iterative development with milestone deliveries, so you see progress and can validate direction throughout.' },
      { step: 'Scale', desc: 'Deployment to cloud infrastructure with monitoring, and a handover process that leaves your team confident.' },
    ],
    howWeWorkAr: [
      { step: 'النطاق', desc: 'نحدد ما يجب أن تفعله المنصة ومن يستخدمها وكيف تتصل بأنظمة عملك القائمة.' },
      { step: 'الهندسة', desc: 'تصميم تقني يشمل قاعدة البيانات وAPI ونموذج الأمان والبنية التحتية — مبني للتوسع من اليوم الأول.' },
      { step: 'البناء', desc: 'تطوير تكراري مع تسليمات بارزة، حتى ترى التقدم وتتحقق من الاتجاه طوال الوقت.' },
      { step: 'التوسع', desc: 'النشر على البنية التحتية السحابية مع المراقبة، وعملية تسليم تترك فريقك واثقاً.' },
    ],
    whereWeWorkEn: 'We build business platforms for organisations across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve clients throughout the Gulf.',
    whereWeWorkAr: 'نبني منصات أعمال للمنظمات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم العملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'What kind of platforms do you build?', a: 'We build any kind of web-based platform — from e-commerce and marketplace models to operational tools, SaaS products, and customer-facing portals.' },
      { q: 'Can you work with our existing design team?', a: 'Yes — we frequently collaborate with in-house or agency design teams, handling the engineering while you control the creative direction.' },
      { q: 'How do you handle security on a business platform?', a: 'Security architecture is designed upfront — covering authentication, data protection, access controls, and compliance requirements relevant to Saudi and Gulf markets.' },
    ],
    faqAr: [
      { q: 'ما نوع المنصات التي تبونها؟', a: 'نبني أي نوع من منصات الويب — من نماذج التجارة الإلكترونية والسوق إلى أدوات التشغيل ومنتجات SaaS وبوابات العملاء.' },
      { q: 'هل يمكنكم العمل مع فريق التصميم لدينا؟', a: 'نعم — نتعاون غالباً مع فرق التصميم الداخلية أو Agencies، نتولى الهندسة بينما تتحكم في الاتجاه الإبداعي.' },
      { q: 'كيف تتعاملون مع أمان منصة الأعمال؟', a: 'هندسة الأمان تُصمّم مسبقاً — تشمل المصادقة وحماية البيانات وضوابط الوصول ومتطلبات الامتثال ذات الصلة بأسواق السعودية والخليج.' },
    ],
    ctaMessageEn: 'I\'d like to discuss building a business platform.',
    ctaMessageAr: 'أرغب في مناقشة بناء منصة أعمال.',
    relatedSlugs: ['business-software-development-saudi-arabia', 'business-website-development-saudi-arabia', 'booking-system-development-saudi-arabia'],
  },
  {
    slug: 'client-portal-development-saudi-arabia',
    shortName: 'client-portal',
    nameEn: 'Client Portal Development in Saudi Arabia',
    nameAr: 'بناء بوابات العملاء في السعودية',
    heroImage: SB + 'client-portal.jpg',
    valuePropEn: 'Client portals that replace the WhatsApp chains and email threads — a single place for your clients to access their projects, documents, and communications with your team.',
    valuePropAr: 'بوابات عملاء تحل محل سلاسل واتساب ومواضيع البريد — مكان واحد لعملائك للوصول إلى مشاريعهم ومستنداتهم والتواصل مع فريقك.',
    whatWeDeliverEn: [
      'Secure client-facing portal design and development',
      'Project and document sharing',
      'Invoicing and payment tracking',
      'Real-time messaging or ticketing',
      'White-label options for agency use',
    ],
    whatWeDeliverAr: [
      'تصميم وتطوير بوابة عملاء آمنة',
      'مشاركة المشاريع والمستندات',
      'الفوترة وتتبع الدفع',
      'الرسائل الفورية أو نظام التذاكر',
      'خيارات الـ White-label للاستخدام Agencies',
    ],
    howWeWorkEn: [
      { step: 'Define', desc: 'We identify what your clients need to access, what they need to do in the portal, and what communication flows need to be digitised.' },
      { step: 'Design', desc: 'Clean, professional portal design that reflects your brand and is easy for non-technical clients to navigate.' },
      { step: 'Build', desc: 'Secure development with role-based access — your clients see only what they should see.' },
      { step: 'Launch', desc: 'Staged rollout with your team, then onboarding support for your first clients.' },
    ],
    howWeWorkAr: [
      { step: 'التحديد', desc: 'نحدد ما يحتاج عملاؤك للوصول إليه وما يحتاجون لفعله في البوابة وما تدفقات الاتصال التي تحتاج إلى رقمنة.' },
      { step: 'التصميم', desc: 'تصميم بوابة نظيف واحترافي يعكس علامتك وسهل لعملاء غير تقنيين.' },
      { step: 'البناء', desc: 'تطوير آمن مع وصول مستند إلى الأدوار — عملاؤك يرون فقط ما يجب أن يروه.' },
      { step: 'الإطلاق', desc: 'إطلاق مرحلي مع فريقك، ثم دعم استيعاب أول عملاء.' },
    ],
    whereWeWorkEn: 'We build client portals for businesses and agencies across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve clients throughout the Gulf.',
    whereWeWorkAr: 'نبني بوابات عملاء للمؤسسات والوكالات في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم العملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'Can the portal handle multiple client accounts?', a: 'Yes — multi-client architecture is standard. Each client sees their own data, projects, and communications with no cross-access.' },
      { q: 'Is the portal available in Arabic?', a: 'Yes — bilingual Arabic and English interfaces are standard, with full RTL support and Arabic character handling.' },
      { q: 'How secure is the client portal?', a: 'Security is a core part of every portal we build — including encrypted data transmission, secure authentication, and role-based access controls configured per client.' },
    ],
    faqAr: [
      { q: 'هل يمكن للبوابة التعامل مع حسابات عملاء متعددة؟', a: 'نعم — هندسة العملاء المتعددين أساسية. كل عميل يرى بياناته ومشاريعه واتصالاته فقط.' },
      { q: 'هل البوابة متاحة بالعربية؟', a: 'نعم — واجهات ثنائية اللغة العربية والإنجليزية أساسية، مع دعم كامل للـ RTL ومعالجة الأحرف العربية.' },
      { q: 'ما مستوى أمان بوابة العملاء؟', a: 'الأمان جزء أساسي من كل بوابة نبنيها — يشمل نقل البيانات المشفر والمصادقة الآمنة وضوابط الوصول المستند إلى الأدوار المُعدّة لكل عميل.' },
    ],
    ctaMessageEn: 'I\'d like to discuss a client portal for our business.',
    ctaMessageAr: 'أرغب في مناقشة بوابة عملاء لعمالنا.',
    relatedSlugs: ['business-software-development-saudi-arabia', 'business-platform-development-saudi-arabia', 'booking-system-development-saudi-arabia'],
  },
  {
    slug: 'ai-assistants-automation-saudi-arabia',
    shortName: 'ai-assistants',
    nameEn: 'AI Assistants and Automation in Saudi Arabia',
    nameAr: 'المساعدون الأذكياء والأتمتة في السعودية',
    heroImage: SB + 'ai-assistants.jpg',
    valuePropEn: 'AI assistants and automation systems that handle the repetitive work — answering questions, qualifying leads, and following up — so your team focuses on what actually requires a person.',
    valuePropAr: 'مساعدون ذكيون وأنظمة أتمتة تتعامل مع العمل المتكرر — الإجابة على الأسئلة وتصنيف العملاء المحتملين والمتابعة — حتى يركز فريقك على ما يحتاج شخص فعلاً.',
    whatWeDeliverEn: [
      'Custom-trained AI assistants for your business',
      'WhatsApp and web chat integration',
      'Lead qualification and CRM automation',
      'Internal knowledge base and support chatbots',
      'Workflow automation for repetitive tasks',
    ],
    whatWeDeliverAr: [
      'مساعدون ذكيون مُدرَّبون مخصصاً على عملك',
      'تكامل واتساب ودردشة الويب',
      'تصنيف العملاء المحتملين وأتمتة CRM',
      'قاعدة معرفية داخلية وروبوتات دعم',
      'أتمتة سير العمل للمهام المتكررة',
    ],
    howWeWorkEn: [
      { step: 'Audit', desc: 'We identify where automation saves time — the repeat tasks, the common questions, and the follow-up sequences that currently consume your team\'s day.' },
      { step: 'Build', desc: 'AI trained on your business, configured to handle the identified use cases, and integrated with your existing tools.' },
      { step: 'Test', desc: 'We test extensively before launch, and monitor early conversations to correct and improve the assistant\'s responses.' },
      { step: 'Improve', desc: 'Ongoing review and refinement — AI assistants improve over time as they handle more conversations.' },
    ],
    howWeWorkAr: [
      { step: 'المراجعة', desc: 'نحدد أين توفر الأتمتة الوقت — المهام المتكررة والأسئلة الشائعة وتسلسلات المتابعة التي تستهلك يوم فريقك حالياً.' },
      { step: 'البناء', desc: 'ذكاء اصطناعي مُدرَّب على عملك ومُعدّ للتعامل مع حالات الاستخدام المحددة ومتكامل مع أدواتك القائمة.' },
      { step: 'الاختبار', desc: 'نختبر على نطاق واسع قبل الإطلاق، ونراقب المحادثات المبكرة لتصحيح وتحسين ردود المساعد.' },
      { step: 'التحسين', desc: 'مراجعة وتحسين مستمر — مساعدو الذكاء الاصطناعي يتحسنون مع الوقت مع معالجة المزيد من المحادثات.' },
    ],
    whereWeWorkEn: 'We deploy AI assistants and automation for businesses across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve clients throughout the Gulf.',
    whereWeWorkAr: 'ننشر المساعدين الأذكياء والأتمتة للأعمال في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم العملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'What makes an AI assistant work for our business specifically?', a: 'We train it on your business — your services, your processes, your FAQ content. The more specific the training, the more useful the assistant.' },
      { q: 'Can it handle Arabic and English conversations?', a: 'Yes — bilingual conversation handling is standard. We configure the assistant to switch between languages as needed.' },
      { q: 'How long does it take to deploy?', a: 'Standard AI assistant deployment is four to six weeks from brief to live, with ongoing refinement in the weeks following launch.' },
    ],
    faqAr: [
      { q: 'ما الذي يجعل المساعد الذكي يعمل لعمالنا تحديداً؟', a: 'نُدرّبه على عملك — خدماتك وعملياتك ومحتوى الأسئلة الشائعة. كلما كان التدريب أكثر تحديداً، كان المساعد أكثر فائدة.' },
      { q: 'هل يمكنه التعامل مع المحادثات بالعربية والإنجليزية؟', a: 'نعم — التعامل ثنائي اللغة معيار أساسي. نُعدّ المساعد للتبديل بين اللغتين حسب الحاجة.' },
      { q: 'كم يستغرق النشر؟', a: 'نشر مساعد ذكي معياري يستغرق أربعة إلى ستة أسابيع من المراجعة إلى التشغيل، مع تحسين مستمر في الأسابيع التي تعقب الإطلاق.' },
    ],
    ctaMessageEn: 'I\'d like to discuss AI assistants and automation for our business.',
    ctaMessageAr: 'أرغب في مناقشة مساعدين أذكياء وأتمتة لعمالنا.',
    relatedSlugs: ['business-software-development-saudi-arabia', 'business-website-development-saudi-arabia', 'landing-page-design-saudi-arabia'],
  },
  {
    slug: 'website-maintenance-saudi-arabia',
    shortName: 'website-maintenance',
    nameEn: 'Website Maintenance in Saudi Arabia',
    nameAr: 'صيانة المواقع في السعودية',
    heroImage: SB + 'website-maintenance.jpg',
    valuePropEn: 'We maintain the websites we build — ongoing updates, security, and improvements for platforms developed by our team. If we built it, we know it.',
    valuePropAr: 'نصون المواقع التي نبنيها — تحديثات مستمرة وأمان وتحسينات للمنصات التي طوّرها فريقنا. إذا بناه فريقنا، نعرفه.',
    whatWeDeliverEn: [
      'Core platform and plugin updates',
      'Security monitoring and incident response',
      'Performance optimisation',
      'Content updates for your team',
      'Hosting management and uptime monitoring',
    ],
    whatWeDeliverAr: [
      'تحديثات المنصة الأساسية والإضافات',
      'مراقبة الأمان والاستجابة للحوادث',
      'تحسين الأداء',
      'تحديثات المحتوى لفريقك',
      'إدارة الاستضافة ومراقبة وقت التشغيل',
    ],
    howWeWorkEn: [
      { step: 'Audit', desc: 'We review your current website — its stack, its security posture, and its performance — before setting up ongoing maintenance.' },
      { step: 'Setup', desc: 'We configure monitoring, set update schedules, and establish the process for content updates your team needs to request.' },
      { step: 'Ongoing', desc: 'Regular updates, security checks, and performance reviews — on a schedule that keeps your site current and secure.' },
    ],
    howWeWorkAr: [
      { step: 'المراجعة', desc: 'نراجع موقعك الحالي — مكدسه وحالته الأمنية وأدائه — قبل إعداد الصيانة المستمرة.' },
      { step: 'الإعداد', desc: 'نُعدّ المراقبة ونضع جداول التحديث ونؤسس عملية طلب تحديثات المحتوى التي يحتاجها فريقك.' },
      { step: 'المستمر', desc: 'تحديثات منتظمة وفحوصات أمان ومراجعات أداء — على جدول يبقي موقعك محدّثاً وآمناً.' },
    ],
    whereWeWorkEn: 'We maintain websites for businesses across Saudi Arabia — in Riyadh, Jeddah, Khobar, Dammam, and Jubail — and serve clients throughout the Gulf.',
    whereWeWorkAr: 'نصون المواقع للأعمال في أرجاء السعودية — في الرياض وجدة والخبر والدمام والجبيل — ونخدم العملاء في مختلف دول الخليج.',
    faqEn: [
      { q: 'Do you only maintain websites you built?', a: 'We primarily maintain platforms we have built — this allows us to work efficiently and know the codebase. For sites built elsewhere, we assess on a case-by-case basis.' },
      { q: 'What happens if there is a security incident?', a: 'We respond to security incidents as part of the maintenance contract — identifying and closing the vulnerability, restoring any affected data, and implementing preventive measures.' },
      { q: 'Can we request content updates as part of the contract?', a: 'Yes — maintenance contracts include a defined number of content update hours per month, with additional hours available as needed.' },
    ],
    faqAr: [
      { q: 'هل تصونّون فقط المواقع التي بنيتموها؟', a: 'نصونّ أساساً المنصات التي بنيناها — مما позволяет нам العمل بكفاءة ومعرفة قاعدة الكود. للمواقع المبنية في مكان آخر، نقيّم كل حالة على حدة.' },
      { q: 'ماذا يحدث في حال حدوث حادث أمني؟', a: 'نستجيب لحوادث الأمان كجزء من عقد الصيانة — تحديد الثغرة وإغلاقها واستعادة أي بيانات متأثرة وتنفيذ إجراءات وقائية.' },
      { q: 'هل يمكننا طلب تحديثات محتوى كجزء من العقد؟', a: 'نعم — عقود الصيانة تشمل عدداً محدداً من ساعات تحديث المحتوى شهرياً، مع ساعات إضافية حسب الحاجة.' },
    ],
    ctaMessageEn: 'I\'d like to discuss website maintenance for our platform.',
    ctaMessageAr: 'أرغب في مناقشة صيانة الموقع ل منصتنا.',
    relatedSlugs: ['business-website-development-saudi-arabia', 'business-software-development-saudi-arabia', 'landing-page-design-saudi-arabia'],
  },
]

export const SERVICES_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
) as Record<ServiceSlug, ServicePage>

export const ALL_SLUGS = SERVICES.map((s) => s.slug)
