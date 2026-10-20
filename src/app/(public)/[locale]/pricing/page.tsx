import type { Metadata } from "next";
import { getDict } from "../../i18n";
import PricingPageClient from "../components/PricingPageClient";
import ScrollRevealProvider from "../ScrollRevealProvider";
import type { Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing | Premiera Live",
    description: "Three clear packages. No hidden fees. No monthly subscriptions.",
    alternates: { canonical: "/pricing", languages: { en: "/en/pricing", ar: "/ar/pricing" } },
    openGraph: { title: "Pricing | Premiera Live", description: "Three clear packages. No hidden fees. No monthly subscriptions." },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDict(locale);
  return (
    <>
      <ScrollRevealProvider />
      <PricingPageClient locale={locale} dict={dict} />
    </>
  );
}
