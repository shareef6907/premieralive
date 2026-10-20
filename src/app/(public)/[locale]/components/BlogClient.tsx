"use client";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";

interface Props { locale: Locale; dict: FullDict; }

export default function BlogClient({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";

  const articles = [
    { slug: "why-cloud-ai-is-a-privacy-risk", title: isAr ? "لماذا الذكاء الاصطناعي السحابي مخاطر خصوصية" : "Why Cloud AI Is a Privacy Risk", date: "2024-11-15", excerpt: isAr ? "البيانات التي ترسلها إلى خدمات الذكاء الاصطناعي السحابي قد تُستخدم لتدريب نماذج مستقبلية — حتى لو حذفت حسابك." : "Data you send to cloud AI services may be used to train future models — even if you delete your account." },
    { slug: "local-ai-vs-cloud-ai-gcc", title: isAr ? "الذكاء الاصطناعي المحلي مقابل السحابي: دليل الخليج" : "Local AI vs Cloud AI: A Gulf Guide", date: "2024-11-22", excerpt: isAr ? "نظرة متعمقة على المقارنة بين الذكاء الاصطناعي المحلي والسحابي في سياق الخليج العربي." : "An in-depth look at the comparison between local and cloud AI in the Gulf context." },
    { slug: "ai-for-law-firms-confidentiality", title: isAr ? "الذكاء الاصطناعي لمكاتب المحاماة: الحفاظ على السرية" : "AI for Law Firms: Maintaining Client Confidentiality", date: "2024-12-01", excerpt: isAr ? "كيف يمكن لمكاتب المحاماة في الخليج استخدام الذكاء الاصطناعي مع حماية سرية العملاء." : "How law firms in the Gulf can use AI while protecting client confidentiality." },
    { slug: "rag-explained-simple", title: isAr ? "نظام RAG شرح مبسّط" : "RAG Systems Explained Simply", date: "2024-12-08", excerpt: isAr ? "ما هو نظام استرجاع المحتوى المعزز (RAG) وكيف يعمل." : "What is Retrieval-Augmented Generation and how it works." },
    { slug: "ai-hardware-requirements-gcc", title: isAr ? "متطلبات أجهزة الذكاء الاصطناعي في الخليج" : "AI Hardware Requirements in the Gulf", date: "2024-12-15", excerpt: isAr ? "ما الذي تحتاجه لتشغيل الذكاء الاصطناعي محليًا — حتى في الظروف الخليجية." : "What you need to run AI locally — even in Gulf conditions." },
    { slug: "data-localization-middle-east", title: isAr ? "توطين البيانات في الشرق الأوسط" : "Data Localization in the Middle East", date: "2025-01-10", excerpt: isAr ? "لماذا تتطلب الحكومات والشركات في المنطقة بيانات محلية." : "Why Middle Eastern governments and businesses require local data." },
    { slug: "ai-for-healthcare-gcc", title: isAr ? "الذكاء الاصطناعي في الرعاية الصحية الخليجية" : "AI in Gulf Healthcare", date: "2025-01-20", excerpt: isAr ? "كيف يمكن للمستشفيات والعيادات استخدام الذكاء الاصطناعي مع حماية بيانات المرضى." : "How hospitals and clinics can use AI while protecting patient data." },
    { slug: "bahrain-saudi-ai-adoption", title: isAr ? "تبني الذكاء الاصطناعي في البحرين والسعودية" : "AI Adoption in Bahrain and Saudi Arabia", date: "2025-02-01", excerpt: isAr ? "حالة تبني الذكاء الاصطناعي في البحرين والسعودية." : "The state of AI adoption in Bahrain and Saudi Arabia." },
    { slug: "ai-for-schools-student-privacy", title: isAr ? "الذكاء الاصطناعي للمدارس: حماية خصوصية الطلاب" : "AI for Schools: Protecting Student Privacy", date: "2025-02-15", excerpt: isAr ? "كيف يمكن للمدارس استخدام الذكاء الاصطناعي بأمان للطلاب." : "How schools can use AI safely for students." },
    { slug: "roi-local-ai-gcc-businesses", title: isAr ? "العائد على الاستثمار للذكاء الاصطناعي المحلي" : "ROI of Local AI for Gulf Businesses", date: "2025-03-01", excerpt: isAr ? "حساب العائد على الاستثمار عند الانتقال من الذكاء الاصطناعي السحابي إلى المحلي." : "Calculating ROI when switching from cloud AI to local AI." },
    { slug: "ai-arabic-language-models", title: isAr ? "نماذج اللغة العربية في الذكاء الاصطناعي المحلي" : "Arabic Language Models in Local AI", date: "2025-03-15", excerpt: isAr ? "لماذا النماذج المحلية تتفوق على السحابية في الدعم العربي." : "Why local models outperform cloud models in Arabic support." },
    { slug: "getting-started-local-ai", title: isAr ? "البدء مع الذكاء الاصطناعي المحلي" : "Getting Started with Local AI", date: "2025-04-01", excerpt: isAr ? "دليل خطوة بخطوة للشركات الخليجية للبدء مع الذكاء الاصطناعي المحلي." : "A step-by-step guide for Gulf businesses to get started with local AI." },
  ];

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{dict.blog.eyebrow}</span>
          </nav>
        </div>
      </div>

      <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,226,180,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-eyebrow">{dict.blog.eyebrow}</span>
            <h1 className="text-display" style={{ marginBottom: "20px" }}>{dict.blog.headline}</h1>
            <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.7 }}>
              {dict.blog.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {articles.map((article, i) => (
              <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: "32px", marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600, background: "rgba(54,226,180,0.08)", padding: "3px 10px", borderRadius: "100px" }}>{dict.blog.comingSoon}</span>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>{article.date}</span>
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px", fontFamily: "var(--font-display)" }}>{article.title}</h2>
                <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7 }}>{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
