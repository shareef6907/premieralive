import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BAHRAIN_CITIES, CITIES } from "@/content/cities";
import { getDict } from "../../../i18n";
import CityPageComponent from "../../components/CityPage";
import type { Locale } from "@/i18n";

export async function generateStaticParams() {
  return BAHRAIN_CITIES.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; city: string }> }): Promise<Metadata> {
  const { locale, city } = await params;
  const isAr = locale === "ar";
  const data = CITIES[city];
  if (!data) return {};
  const title = isAr ? `${data.nameAr} | بريمييرا لايف` : `${data.name} | Premiera Live`;
  const desc = isAr ? `ذكاء اصطناعي خاص وآمن في ${data.nameAr}. بدون اتصال إنترنت.` : `Private AI in ${data.name}. Works offline.`;
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/bahrain/${city}`,
      languages: { en: `/en/bahrain/${city}`, ar: `/ar/bahrain/${city}` },
    },
    openGraph: { title, description: desc, locale: locale === "ar" ? "ar_SA" : "en_US", type: "website" },
  };
}

export default async function BahrainCityPage({ params }: { params: Promise<{ locale: Locale; city: string }> }) {
  const { locale, city } = await params;
  if (!CITIES[city]) notFound();
  const dict = await getDict(locale);
  const cityData = CITIES[city];
  return <CityPageComponent locale={locale} dict={dict} citySlug={city} country="bahrain" cityData={cityData} />;
}
