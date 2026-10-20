import type { Metadata } from "next";
import { getDict } from "../../i18n";
import ContactClient from "../components/ContactClient";
import type { Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Premiera Live",
    description: "Get in touch with Premiera Live. WhatsApp, email, or our contact form.",
    alternates: { canonical: "/contact", languages: { en: "/en/contact", ar: "/ar/contact" } },
    openGraph: { title: "Contact | Premiera Live", description: "Get in touch with Premiera Live." },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDict(locale);
  return <ContactClient locale={locale} dict={dict} />;
}
