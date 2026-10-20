import type { Metadata } from "next";
import { getDict } from "../../i18n";
import FaqClient from "../components/FaqClient";
import type { Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQ | Premiera Live",
    description: "Frequently asked questions about Premiera Local AI installation, pricing, and privacy.",
    alternates: { canonical: "/faq", languages: { en: "/en/faq", ar: "/ar/faq" } },
    openGraph: { title: "FAQ | Premiera Live", description: "Frequently asked questions." },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDict(locale);
  return <FaqClient locale={locale} dict={dict} />;
}
