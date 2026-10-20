import type { MetadataRoute } from "next";
import { BRAND } from "@/content/brand";

const PUBLIC_PATHS = [
  // Home (with trailing slash for locale routes)
  "/",
  "/ar/",
  // Static pages
  "/pricing",
  "/ar/pricing",
  "/how-it-works",
  "/ar/how-it-works",
  "/about",
  "/ar/about",
  "/contact",
  "/ar/contact",
  "/faq",
  "/ar/faq",
  "/blog",
  "/ar/blog",
];

// Vertical pages
const VERTICALS = [
  "law-firms",
  "clinics",
  "schools",
  "real-estate",
  "accounting-consulting",
  "trading-companies",
  "government-contractors",
];

// City pages
const CITIES = {
  bahrain: [
    "manama",
    "riffa",
    "muharraq",
    "isa-town",
    "hamad-town",
    "aali",
    "saar",
  ],
  "saudi-arabia": [
    "riyadh",
    "jeddah",
    "dammam",
    "al-khobar",
    "dhahran",
    "jubail",
    "mecca",
    "medina",
    "tabuk",
    "abha",
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.domain;
  const entries: MetadataRoute.Sitemap = [];

  // Home + static pages
  for (const path of PUBLIC_PATHS) {
    const isArabic = path.startsWith("/ar");
    const canonical = isArabic ? path : path;
    const altEn = isArabic ? path.replace("/ar", "") : path;
    const altAr = isArabic ? path : `/ar${path}`;
    entries.push({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: altEn,
          ar: altAr,
          "x-default": altEn,
        },
      },
    });
  }

  // Vertical pages
  for (const slug of VERTICALS) {
    entries.push({
      url: `${base}/for/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `/for/${slug}`,
          ar: `/ar/for/${slug}`,
          "x-default": `/for/${slug}`,
        },
      },
    });
    entries.push({
      url: `${base}/ar/for/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `/for/${slug}`,
          ar: `/ar/for/${slug}`,
          "x-default": `/for/${slug}`,
        },
      },
    });
  }

  // City pages
  for (const [country, cities] of Object.entries(CITIES)) {
    for (const city of cities) {
      const path = `/${country}/${city}`;
      entries.push({
        url: `${base}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            en: path,
            ar: `/ar${path}`,
            "x-default": path,
          },
        },
      });
      entries.push({
        url: `${base}/ar${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: {
            en: path,
            ar: `/ar${path}`,
            "x-default": path,
          },
        },
      });
    }
  }

  return entries;
}
