/**
 * Brand constants — single source of truth for Premiera Local AI.
 * All UI, OG images, schema, and metadata import from here.
 */

export const BRAND = {
  nameEn: "Premiera Local AI",
  nameAr: "بريمييرا لايف — الذكاء الاصطناعي المحلي",
  taglineEn: "Private AI. Inside your office. No internet required.",
  taglineAr: "ذكاء اصطناعي خاص. داخل مكتبك. بدون إنترنت.",
  parentName: "Premiera Live",
  founder: "Shareef Ali",
  whatsapp: "+97339007750",
  whatsappLink: "https://wa.me/97339007750",
  email: "ceo@premieralive.com",
  phone: "+973 3900 7750",
  domain: "https://premieralive.co",
  /** Saudi operating entity */
  crSaudi: "CR 7054807941",
  addressSaudi: "Spaces Ajdan Walk, Corniche 5, Al Khobar, Saudi Arabia",
  /** Bahrain operating entity */
  crBahrain: "CR 113587-1",
  addressBahrain: "A'ali, Bahrain",
} as const;

export const SEO = {
  domain: "https://premieralive.co",
  siteName: "Premiera Local AI",
  twitterHandle: "@premieralive",
  locale: {
    default: "en",
    alternate: "ar",
    xDefault: "en",
  },
} as const;
