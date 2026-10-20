import { en } from "./en/en";
import { ar } from "./ar/ar";
import type { Locale } from "@/i18n";

export type FullDict = typeof en;

export function getDict(locale: Locale): FullDict {
  return locale === "ar" ? (ar as unknown as FullDict) : (en as unknown as FullDict);
}

