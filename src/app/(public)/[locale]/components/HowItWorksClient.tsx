"use client";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";
import { BRAND } from "@/content/brand";

interface Props { locale: Locale; dict: FullDict; }

export default function HowItWorksClient({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = dict.how;

  const steps = [
    {
      n: "01",
      title: isAr ? "مكالمة تقييم مجانية" : "Free Assessment Call",
      desc: isAr
        ? "نبدأ بمكالمة قصيرة — عادة 30 دقيقة — لفهم عملك. نتحدث عن أنواع المستندات التي تتعامل معها، عدد الموظفين، وحجم مكتبة الملفات. لا يوجد نموذج تقييم نموذجي. كل مكتب مختلف. نسأل عن أجهزتك الحالية، وإن كان لديك ملفات جاهزة للتحميل، وإذا كنت تعمل بشكل أساسي بالعربية أو الإنجليزية أو كليهما. هذه المكالمة مجانية ولا تُلزمك بأي شيء."
        : "We start with a short call — usually 30 minutes — to understand your business. We discuss the types of documents you handle, how many staff you have, and your file library size. There is no standard assessment form. Every office is different. We ask about your current hardware, whether you have files ready to load, and whether you work primarily in Arabic, English, or both. This call is free and carries no obligation.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
    },
    {
      n: "02",
      title: isAr ? "اختيار الباقة والتوصيات" : "Choose Package & Get Recommendations",
      desc: isAr
        ? "بناءً على التقييم، نُوصيك بأفضل باقة. إذا كانت أجهزتك الحالية كافية، نقول ذلك — لا نُوصي بترقية إلا إذا كانت مفيدة فعلاً. إذا كنت بحاجة لجهاز جديد، نُوصي بخيارات محددة بأسعار محددة. نتحدث عن جدول زمني واقعي — معظم التركيبات تُجدوَل خلال 5-14 يوم عمل حسب موقعك."
        : "Based on the assessment, we recommend the best package. If your current hardware is sufficient, we say so — we don't recommend an upgrade unless it's genuinely useful. If you need a new machine, we specify options at specific prices. We discuss a realistic timeline — most installations are scheduled within 5-14 business days depending on your location.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    },
    {
      n: "03",
      title: isAr ? "تركيب ميداني" : "On-site Installation",
      desc: isAr
        ? "نحضر إلى مكتبك في الموعد المُجدوَل. التركيب النموذجي لجهاز واحد يستغرق 3-4 ساعات. نُعدّ نظام الذكاء الاصطناعي على جهازك — لا يوجد خادم سحابي، لا اتصال بالإنترنت مطلوب أثناء التركيب. نتحقق من جميع الإعدادات ونُجري اختبارات الأداء. أثناء التركيب، نبدأ بتحميل مستنداتك في قاعدة المعرفة إذا كانت جاهزة."
        : "We arrive at your office on the scheduled date. A typical single-machine installation takes 3-4 hours. We set up the AI system on your machine — no cloud server, no internet connection required during installation. We verify all settings and run performance checks. During installation, we start loading your documents into the knowledge base if they are ready.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    },
    {
      n: "04",
      title: isAr ? "تحميل المستندات والتكوين" : "Load Your Documents & Configure",
      desc: isAr
        ? "نعمل معك لتحديد المستندات التي يجب تحميلها في قاعدة المعرفة. أنت تختار ما يدخل — لا نفترض أو نحمل ملفات دون إذنك. نُعدّ معلمات الاسترجاع (chunk size، عدد المقاطع المُسترجَعة، etc.) حسب طبيعة ملفاتك. للعيادات، نُعدّ قوالب للأسئلة الشائعة. للمكاتب القانونية، نُعدّ أنماط الإجابة القانونية."
        : "We work with you to decide which documents should be loaded into the knowledge base. You choose what goes in — we don't assume or load files without your permission. We configure retrieval parameters (chunk size, number of retrieved chunks, etc.) based on your file types. For clinics, we configure templates for common questions. For law firms, we configure legal answer patterns.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    },
    {
      n: "05",
      title: isAr ? "تدريب فريقك + متابعة" : "Train Your Team & Follow-up",
      desc: isAr
        ? "جلسة تدريب لفريقك — عادة ساعة واحدة. نُغطي: كيفية طرح الأسئلة، فهم إجابات الذكاء الاصطناعي، متى تسأل المتابعة، وكيفية الإبلاغ عن مشاكل. نُترك لك دليلاً مطبوعاً يبقى في المكتب. بعد أسبوع، نتواصل للتأكد من أن كل شيء يعمل كما erwartet. إذا كانت هناك أسئلة، نُجيب."
        : "A training session for your team — usually one hour. We cover: how to phrase questions, understanding AI answers, when to ask follow-ups, and how to report issues. We leave you a printed guide that stays in the office. After one week, we check in to make sure everything is working as expected. If there are questions, we answer them.",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    },
  ];

  const trustPoints = [
    { icon: "🏆", text: isAr ? "مقرون بالنتائج — لا يوجد تركيب حتى تكون راضياً" : "Results-linked — no installation until you are satisfied" },
    { icon: "📞", text: isAr ? "متابعة بعد أسبوع لكل تركيب" : "One-week follow-up after every installation" },
    { icon: "📋", text: isAr ? "دليل مطبوع مع كل تركيب" : "Printed guide with every installation" },
    { icon: "🔧", text: isAr ? "دعم فني متواصل بعد التركيب" : "Ongoing technical support after installation" },
  ];

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{isAr ? "كيف يعمل" : "How It Works"}</span>
          </nav>
        </div>
      </div>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,226,180,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-eyebrow">{d.eyebrow}</span>
            <h1 className="text-display" style={{ marginBottom: "20px" }}>{d.headline}</h1>
            <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.7, marginBottom: "32px" }}>
              {isAr
                ? "من التقييم إلى تشغيل الذكاء الاصطناعي في مكتبك خلال أيام. بدون إنترنت مطلوب."
                : "From assessment to AI running in your office in days. No internet required."}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {d.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "32px", marginBottom: i < steps.length - 1 ? "48px" : 0, paddingBottom: i < steps.length - 1 ? "48px" : 0, borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(54,226,180,0.08)", border: "1px solid rgba(54,226,180,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", marginBottom: "16px" }}>
                    {step.icon}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 800, color: "var(--accent)", opacity: 0.25, lineHeight: 1 }}>{step.n}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "16px", fontFamily: "var(--font-display)" }}>{step.title}</h2>
                  <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.85 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "ما يميّزنا" : "What sets us apart"}</span>
            <h2 className="text-heading">{isAr ? "ما يميّز بريمييرا لايف" : "What sets Premiera Live apart"}</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: "800px", margin: "0 auto" }}>
            {trustPoints.map((tp, i) => (
              <div key={i} className="card" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "24px", flexShrink: 0 }}>{tp.icon}</span>
                <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{tp.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cloud vs Local */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "لماذا محلي؟" : "Why local?"}</span>
            <h2 className="text-heading">
              {isAr ? "بريمييرا لايف مقابل الذكاء الاصطناعي السحابي" : "Premiera Live vs Cloud AI"}
            </h2>
          </div>
          <div className="grid-2" style={{ maxWidth: "800px", margin: "0 auto", gap: "24px" }}>
            <div className="card" style={{ borderColor: "rgba(54,226,180,0.3)", background: "linear-gradient(135deg, rgba(54,226,180,0.04) 0%, var(--surface) 60%)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", fontFamily: "var(--font-display)", color: "var(--accent)" }}>
                {isAr ? "✅ بريمييرا لايف (محلي)" : "✅ Premiera Live (Local)"}
              </h3>
              {[
                isAr ? "البيانات لا تغادر مكتبك أبداً" : "Data never leaves your office",
                isAr ? "يعمل بدون اتصال إنترنت" : "Works without internet connection",
                isAr ? "لا رسوم شهرية — دفعة واحدة" : "No monthly fees — one-time payment",
                isAr ? "إعداد سريع (3-4 ساعات)" : "Quick setup (3-4 hours)",
                isAr ? "دعم فني مباشر ومألوف" : "Direct, familiar technical support",
                isAr ? "متعدد اللغات (عربي + إنجليزي)" : "Bilingual (Arabic + English)",
                isAr ? "مُعدّ خصيصاً لعملك" : "Configured specifically for your business",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", fontSize: "14px", color: "var(--muted)", alignItems: "flex-start" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", fontFamily: "var(--font-display)", color: "var(--muted)" }}>
                {isAr ? "⚠️ الذكاء الاصطناعي السحابي" : "⚠️ Cloud AI"}
              </h3>
              {[
                isAr ? "بياناتك تُرسَل إلى خوادم طرف ثالث" : "Your data sent to third-party servers",
                isAr ? "يتطلب اتصال إنترنت مستمر" : "Requires constant internet connection",
                isAr ? "تكاليف شهرية متكررة مدى الحياة" : "Recurring monthly costs for life",
                isAr ? "قد يستغرق التنفيذ weeks" : "Implementation can take weeks",
                isAr ? "دعم عبر الدردشة أو التذاكر" : "Support via chat or tickets",
                isAr ? "دعم عربي محدود أو غير موجود" : "Limited or no Arabic support",
                isAr ? "إعداد عام — ليس مخصصاً لعملك" : "Generic setup — not specific to your business",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", fontSize: "14px", color: "var(--muted)", alignItems: "flex-start" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="text-heading" style={{ marginBottom: "16px" }}>{isAr ? "مستعد للبدء؟" : "Ready to get started?"}</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "32px" }}>
              {isAr ? "ابدأ بمكالمة تقييم مجانية. بدون التزام." : "Start with a free assessment call. No commitment."}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "15px", padding: "14px 32px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {d.cta}
              </a>
              <Link href={`${langPrefix}/pricing`} className="btn btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                {dict.pricing.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
