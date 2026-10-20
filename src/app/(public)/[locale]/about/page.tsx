import type { Metadata } from "next";
import { getDict } from "../../i18n";
import AboutClient from "../components/AboutClient";
import ScrollRevealProvider from "../ScrollRevealProvider";
import type { Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Premiera Live",
    description: "Founded by Shareef Ali. We install private AI systems on-site across Bahrain and Saudi Arabia.",
    alternates: { canonical: "/about", languages: { en: "/en/about", ar: "/ar/about" } },
    openGraph: { title: "About | Premiera Live", description: "Founded by Shareef Ali." },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDict(locale);
  return (
    <>
      <ScrollRevealProvider />
      <AboutClient locale={locale} dict={dict} />
    </>
  );
}
