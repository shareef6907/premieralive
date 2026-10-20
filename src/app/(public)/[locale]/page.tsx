import type { Metadata } from "next";
import { BRAND } from "@/content/brand";
import { getDict } from "../i18n";
import type { Locale } from "@/i18n";
import HomePage from "./HomePage";
import HeroSection from "./HeroSection";
import ScrollRevealProvider from "./ScrollRevealProvider";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const description = isAr
    ? "تركيب ذكاء اصطناعي محلي خاص — بدون إنترنت، بدون سحابة، بدون اشتراكات. للقطاع الخاص والحكومي في البحرين والسعودية."
    : "Private offline AI installation — no internet, no cloud, no subscriptions. For businesses and government offices in Bahrain and Saudi Arabia.";
  return {
    title: `${BRAND.nameEn} — ${BRAND.taglineEn}`,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: isAr ? "en_US" : "ar_SA",
      siteName: BRAND.nameEn,
      title: `${BRAND.nameEn} — ${BRAND.taglineEn}`,
      description,
    },
    twitter: { card: "summary", title: `${BRAND.nameEn} — ${BRAND.taglineEn}`, description },
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePageRoute({ params }: Props) {
  const { locale } = await params;
  const dict = getDict(locale as Locale);
  return (
    <>
      <ScrollRevealProvider />
      <HeroSection locale={locale as Locale} dict={dict} />
      <HomePage locale={locale as Locale} dict={dict} />
    </>
  );
}
