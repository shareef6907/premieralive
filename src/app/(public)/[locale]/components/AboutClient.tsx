"use client";
import Link from "next/link";
import type { Locale } from "@/i18n";
import type { FullDict } from "../../i18n";
import { BRAND } from "@/content/brand";

interface Props { locale: Locale; dict: FullDict; }

export default function AboutClient({ locale, dict }: Props) {
  const isAr = locale === "ar";
  const langPrefix = isAr ? "/ar" : "";
  const d = dict.about;

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      <div style={{ borderBottom: "1px solid var(--border)", padding: "16px 0" }}>
        <div className="container">
          <nav className="breadcrumb">
            <Link href={`${langPrefix}/`}>{isAr ? "الرئيسية" : "Home"}</Link>
            <span className="breadcrumb-sep">/</span>
            <span>{isAr ? "من نحن" : "About"}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="grid-bg" />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(54,226,180,0.08) 0%, transparent 70%)" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
            <span className="section-eyebrow">{d.eyebrow}</span>
            <h1 className="text-display" style={{ marginBottom: "20px" }}>{d.headline}</h1>
            <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: 1.7 }}>
              {isAr
                ? "نؤمن بأن الذكاء الاصطناعي يجب أن يعمل لصالح عملك — وليس ضد خصوصيتك."
                : "We believe AI should work for your business — not against your privacy."}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section" data-reveal>
        <div className="container">
          <div className="grid-2" style={{ maxWidth: "900px", margin: "0 auto", alignItems: "center" }}>
            <div>
              <span className="section-eyebrow">{isAr ? "مهمتنا" : "Our Mission"}</span>
              <h2 className="text-heading" style={{ marginBottom: "24px" }}>{isAr ? "خصوصية البيانات أولاً" : "Data privacy first"}</h2>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.85, marginBottom: "16px" }}>
                {isAr
                  ? "كل يوم، ملايين الشركات في الشرق الأوسط تتجنب استخدام أدوات الذكاء الاصطناعي لأنها لا تثق بمصادر بيانات第三方. الذكاء الاصطناعي السحابي يعني التخلي عن التحكم في بياناتك. بريمييرا لايف يحل هذه المشكلة جذرياً: نأتي إلى مكتبك، نركّب الذكاء الاصطناعي على أجهزتك، ونغادر. بياناتك تظل في مكتبك."
                  : "Every day, millions of businesses in the Middle East avoid AI tools because they don't trust third-party data handling. Cloud AI means surrendering control of your data. Premiera Live solves this fundamentally: we come to your office, install AI on your hardware, and leave. Your data stays in your office."}
              </p>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.85 }}>
                {isAr
                  ? "مهمتنا هي توفير قوة الذكاء الاصطناعي لكل شركة — بغض النظر عن حجمها أو ميزانيتها — مع حماية خصوصية بيانات عملائها وموظفيها."
                  : "Our mission is to make AI power available to every business — regardless of size or budget — while protecting the privacy of their clients and staff."}
              </p>
            </div>
            <div style={{ textAlign: isAr ? "left" : "right" }}>
              <div style={{ display: "inline-block", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "40px", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤝</div>
                <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.7 }}>
                  {isAr
                    ? "لا نرى أنفسنا كمزود تقنية. نحن شريك في خصوصية بياناتك."
                    : "We don't see ourselves as a tech provider. We're a partner in your data privacy."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="grid-2" style={{ maxWidth: "900px", margin: "0 auto", alignItems: "center", gap: "64px" }}>
            <div style={{ textAlign: isAr ? "right" : "left", order: isAr ? 2 : 1 }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
                <span style={{ fontSize: "36px", fontWeight: 800, color: "white", fontFamily: "var(--font-display)" }}>SA</span>
              </div>
              <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px", fontFamily: "var(--font-display)" }}>{BRAND.founder}</h2>
              <p style={{ fontSize: "14px", color: "var(--accent)", marginBottom: "20px", fontWeight: 600 }}>{isAr ? "المؤسس والرئيس التنفيذي" : "Founder & CEO"}</p>
              <p style={{ fontSize: "15px", color: "var(--muted)", lineHeight: 1.85 }}>
                {isAr
                  ? "بدأ شريف علي رحلته في مجال التكنولوجيا ببناء مواقع ويب وحلول رقمية للشركات في البحرين والخليج. لاحظ نمطاً متكرراً: الشركات التي تحتاج بشدة إلى أدوات الذكاء الاصطناعي كانت ترفضها بسبب مخاوف الخصوصية. في عام 2024، قرر معالجة هذه الفجوة بشكل مباشر. بريمييرا لايف هي النتيجة."
                  : "Shareef Ali began his journey in technology building websites and digital solutions for businesses across Bahrain and the Gulf. He noticed a recurring pattern: businesses that needed AI tools most were rejecting them over privacy concerns. In 2024, he decided to address this gap directly. Premiera Live is the result."}
              </p>
            </div>
            <div style={{ order: isAr ? 1 : 2 }}>
              <span className="section-eyebrow">{isAr ? "المؤسس" : "The Founder"}</span>
              <h2 className="text-heading" style={{ marginBottom: "24px" }}>{isAr ? "من شريف" : "From Shareef"}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  isAr ? "بناء مشاريع رقمية في الخليج منذ 2018" : "Building digital projects in the Gulf since 2018",
                  isAr ? "مؤسس BahrainNights.com و EventsBahrain.com" : "Founder of BahrainNights.com and EventsBahrain.com",
                  isAr ? "خبرة عميقة في احتياجات الخصوصية الخليجية" : "Deep experience with Gulf privacy requirements",
                  isAr ? "سجل حافل في حلول الويب والتطبيقات" : "Track record in web and app solutions",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", fontSize: "14px", color: "var(--muted)", alignItems: "flex-start" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Entities */}
      <section className="section" data-reveal>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "الكيانات التشغيلية" : "Operating Entities"}</span>
            <h2 className="text-heading">{isAr ? "الكيانات القانونية" : "Legal Entities"}</h2>
          </div>
          <div className="grid-2" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <a href="https://bahrainnights.com" target="_blank" rel="noopener noreferrer" className="card" style={{ display: "block", textDecoration: "none" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "20px" }}>🇧🇭</div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                Bahrain Nights W.L.L.
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>{isAr ? "الكيان التشغيلي المسجل في البحرين" : "Registered operating entity in Bahrain"}</p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                {isAr ? "شركة ذات مسؤولية محدودة مسجلة في مملكة البحرين. تدير عمليات التركيب والخدمات في البحرين." : "A limited liability company registered in the Kingdom of Bahrain. Manages installation operations and services in Bahrain."}
              </p>
            </a>
            <a href="https://premieralive.com" target="_blank" rel="noopener noreferrer" className="card" style={{ display: "block", textDecoration: "none" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(54,226,180,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", fontSize: "20px" }}>🇸🇦</div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                Premiera Live Saudi
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>{isAr ? "المقر الرئيسي التشغيلي في السعودية" : "Saudi Arabia operating headquarters"}</p>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>
                {isAr ? "يدير عمليات التركيب والخدمات في المملكة العربية السعودية من مقره في الخبر، الكورنيش 5." : "Manages installation operations and services in Saudi Arabia from its headquarters at Spaces Ajdan Walk, Corniche 5, Al Khobar."}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" data-reveal style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">{isAr ? "قيمنا" : "Our Values"}</span>
            <h2 className="text-heading">{isAr ? "ما نؤمن به" : "What we believe"}</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: "🔒", title: isAr ? "الخصوصية ليست ميزة" : "Privacy is not a feature", desc: isAr ? "الخصوصية ليست خياراً إضافياً نبيعه. إنها الأساس الذي نبني عليه كل شيء." : "Privacy is not an add-on we sell. It's the foundation everything else is built on." },
              { icon: "🤝", title: isAr ? "الشفافية في كل شيء" : "Transparency in everything", desc: isAr ? "لا رسوم خفية، لا وعود مبالغ فيها، لا تكاليف شهرية مفاجئة." : "No hidden fees, no overpromised claims, no surprise monthly costs." },
              { icon: "⚡", title: isAr ? "البساطة أولاً" : "Simplicity first", desc: isAr ? "لا نريد أن يكون الذكاء الاصطناعي معقداً. يجب أن يكون بسيطاً مثل فتح تطبيق." : "We don't want AI to be complicated. It should be as simple as opening an app." },
              { icon: "🌍", title: isAr ? "محلي أولاً" : "Local first", desc: isAr ? "كلما أمكن، المعالجة والبيانات تبقى في المكان الذي تنتمي إليه." : "Whenever possible, processing and data stay in the place they belong." },
              { icon: "📈", title: isAr ? "نتائج قابلة للقياس" : "Measurable results", desc: isAr ? "لا نبيع وعوداً. نُظهر لك نتائج حقيقية من اليوم الأول." : "We don't sell promises. We show you real results from day one." },
              { icon: "💬", title: isAr ? "دعم بشري حقيقي" : "Real human support", desc: isAr ? "تحدث إلى شخص حقيقي يعرف عملك — وليس روبوت دردشة." : "Talk to a real person who knows your business — not a chatbot." },
            ].map((v, i) => (
              <div key={i} className="card">
                <span style={{ fontSize: "28px", display: "block", marginBottom: "12px" }}>{v.icon}</span>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", fontFamily: "var(--font-display)" }}>{v.title}</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" data-reveal>
        <div className="container">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <h2 className="text-heading" style={{ marginBottom: "16px" }}>{isAr ? "هل لديك سؤال؟" : "Have a question?"}</h2>
            <p style={{ color: "var(--muted)", fontSize: "16px", marginBottom: "32px" }}>
              {isAr ? "تواصل معنا وسنرد عليك خلال ساعات." : "Get in touch and we'll respond within hours."}
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ fontSize: "15px", padding: "14px 32px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
              <Link href={`${langPrefix}/contact`} className="btn btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                {isAr ? "تواصل معنا" : "Contact us"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
