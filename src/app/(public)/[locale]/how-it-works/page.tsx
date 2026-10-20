import type { Metadata } from "next";
import { getDict } from "../../i18n";
import HowItWorksClient from "../components/HowItWorksClient";
import type { Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "How It Works | Premiera Live",
    description: "From assessment to AI running in your office in days. No internet required.",
    alternates: { canonical: "/how-it-works", languages: { en: "/en/how-it-works", ar: "/ar/how-it-works" } },
    openGraph: { title: "How It Works | Premiera Live", description: "From assessment to AI running in your office in days." },
  };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDict(locale);
  return <HowItWorksClient locale={locale} dict={dict} />;
}
