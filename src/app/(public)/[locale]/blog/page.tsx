import type { Metadata } from "next";
import { getDict } from "../../i18n";
import BlogClient from "../components/BlogClient";
import type { Locale } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Premiera Live",
    description: "Articles on private AI, data privacy, and local AI deployment in the Middle East.",
    alternates: { canonical: "/blog", languages: { en: "/en/blog", ar: "/ar/blog" } },
    openGraph: { title: "Blog | Premiera Live", description: "Articles on private AI for businesses." },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDict(locale);
  return <BlogClient locale={locale} dict={dict} />;
}
