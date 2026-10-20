export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(val: string): val is Locale {
  return val === "en" || val === "ar";
}
