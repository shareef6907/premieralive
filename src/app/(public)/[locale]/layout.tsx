import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n";
import { isLocale } from "@/i18n";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { getDict } from "../i18n";
import { BRAND } from "@/content/brand";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Premiera Local AI",
  url: "https://premieralive.co",
  logo: "https://premieralive.co/favicon.ico",
  founder: {
    "@type": "Person",
    name: "Shareef Ali",
    jobTitle: "Founder & CEO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+973-3900-7750",
    contactType: "sales",
    availableLanguage: ["English", "Arabic"],
    url: "https://wa.me/97339007750",
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Al Khobar",
      addressRegion: "Eastern Province",
      addressCountry: "SA",
      streetAddress: "Spaces Ajdan Walk, Corniche 5",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Manama",
      addressCountry: "BH",
    },
  ],
  sameAs: ["https://www.instagram.com/premieralive", "https://www.linkedin.com/company/premieralive"],
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isAr = locale === "ar";

  const description = isAr
    ? "تركيب ذكاء اصطناعي محلي خاص — بدون إنترنت، بدون سحابة، بدون اشتراكات. للقطاع الخاص والحكومي في البحرين والسعودية."
    : "Private offline AI installation — no internet, no cloud, no subscriptions. For businesses and government offices in Bahrain and Saudi Arabia.";

  return {
    title: {
      default: `${BRAND.nameEn} — ${BRAND.taglineEn}`,
      template: `%s | ${BRAND.nameEn}`,
    },
    description,
    keywords: [
      "local AI",
      "offline AI",
      "private AI",
      "AI installation Bahrain",
      "AI installation Saudi Arabia",
      "Ollama",
      "RAG",
      "private AI Gulf",
      "ذكاء اصطناعي محلي",
      "ذكاء اصطناعي خاص",
    ],
    authors: [{ name: BRAND.founder }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      siteName: BRAND.nameEn,
      title: `${BRAND.nameEn} — ${BRAND.taglineEn}`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${BRAND.nameEn} — ${BRAND.taglineEn}`,
      description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDict(locale);
  const isAr = locale === "ar";

  const headerLabels = {
    getQuote: dict.nav.getQuote,
    callUs: dict.nav.callUs,
    menu: dict.nav.menu,
    close: dict.nav.close,
  };

  const footerLabels = {
    tagline: dict.footer.tagline,
    industries: dict.footer.industries,
    cities: dict.footer.cities,
    company: dict.footer.company,
    legal: isAr ? "قانوني" : "Legal",
    privacy: isAr ? "الخصوصية" : "Privacy",
    terms: isAr ? "الشروط" : "Terms",
    allCities: dict.footer.allCities,
    allIndustries: dict.footer.allIndustries,
    bahrainCr: BRAND.crBahrain,
    saudiCr: BRAND.crSaudi,
    addressSaudi: BRAND.addressSaudi,
    addressBahrain: BRAND.addressBahrain,
  };

  return (
    <html lang={locale} dir={isAr ? "rtl" : "ltr"}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#070A12" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {isAr ? "تخطي إلى المحتوى" : "Skip to content"}
        </a>

        <Header locale={locale} labels={headerLabels} />

        <main id="main-content">
          {children}
        </main>

        {/* Mobile sticky CTA bar */}
        <div className="mobile-sticky-bar" aria-label="Contact actions">
          <a
            href={BRAND.whatsappLink}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            {isAr ? "واتساب" : "WhatsApp"}
          </a>
          <a href="tel:+97339007750" className="btn btn-call">
            {isAr ? "اتصال" : "Call"}
          </a>
        </div>

        <Footer locale={locale} labels={footerLabels} />
      </body>
    </html>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
