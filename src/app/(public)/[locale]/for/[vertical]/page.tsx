import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { VERTICAL_SLUGS } from "@/content/verticals/index";
import { getDict } from "@/app/(public)/i18n";
import VerticalPageComponent from "../../components/VerticalPage";
import type { Locale } from "@/i18n";
import type { VerticalSlug } from "@/content/verticals/index";

const VERTICAL_NAMES: Record<VerticalSlug, { en: string; ar: string }> = {
  "law-firms": { en: "Law Firms", ar: "مكاتب المحاماة" },
  "clinics": { en: "Clinics & Medical Centres", ar: "العيادات والمراكز الطبية" },
  "schools": { en: "Schools (K-12)", ar: "المدارس" },
  "real-estate": { en: "Real Estate Companies", ar: "شركات العقار" },
  "accounting-consulting": { en: "Accounting & Consulting", ar: "المكاتب المحاسبة والاستشارات" },
  "trading-companies": { en: "Trading & Distribution", ar: "الشركات التجارية والتوزيع" },
  "government-contractors": { en: "Government Contractors", ar: "مقاولو الجهات الحكومية" },
};

export async function generateStaticParams() {
  return VERTICAL_SLUGS.map((slug) => ({ vertical: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; vertical: string }> }): Promise<Metadata> {
  const { locale, vertical } = await params;
  const isAr = locale === "ar";
  const name = VERTICAL_NAMES[vertical as VerticalSlug];
  if (!name) return {};
  const title = isAr ? `${name.ar} | بريمييرا لايف` : `${name.en} | Premiera Live`;
  const desc = isAr ? `ذكاء اصطناعي خاص وآمن لـ ${name.ar}. بدون اتصال إنترنت، بدون رسوم شهرية.` : `Private AI for ${name.en}. Works offline, no monthly fees.`;
  return {
    title,
    description: desc,
    alternates: {
      canonical: `/${locale}/for/${vertical}`,
      languages: { en: `/en/for/${vertical}`, ar: `/ar/for/${vertical}` },
    },
    openGraph: { title, description: desc, locale: locale === "ar" ? "ar_SA" : "en_US", type: "website" },
  };
}

export default async function VerticalPage({ params }: { params: Promise<{ locale: Locale; vertical: string }> }) {
  const { locale, vertical } = await params;
  if (!VERTICAL_SLUGS.includes(vertical as VerticalSlug)) notFound();
  const dict = await getDict(locale);
  return <VerticalPageComponent locale={locale} dict={dict} slug={vertical as VerticalSlug} />;
}
