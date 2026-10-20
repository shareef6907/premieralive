export interface VerticalUseCase {
  title: string;
  prompt: string;
  benefit: string;
}

export interface VerticalObjection {
  q: string;
  qAr?: string;
  a: string;
  aAr?: string;
}

export interface VerticalContent {
  headline: string;
  intro: string;
  useCasesTitle: string;
  useCases: VerticalUseCase[];
  confidentiality: string;
  recommendedPackage: string;
  hardwareNote: string;
  objectionsTitle: string;
  objections: VerticalObjection[];
  cta: string;
}

export interface VerticalData {
  cities: string[];
  en: VerticalContent;
  ar: VerticalContent;
}

export const VERTICAL_SLUGS = [
  "law-firms",
  "clinics",
  "schools",
  "real-estate",
  "accounting-consulting",
  "trading-companies",
  "government-contractors",
] as const;

export type VerticalSlug = typeof VERTICAL_SLUGS[number];

import { lawFirms } from "./law-firms";
import { clinics } from "./clinics";
import { schools } from "./schools";
import { realEstate } from "./real-estate";
import { accountingConsulting } from "./accounting-consulting";
import { tradingCompanies } from "./trading-companies";
import { governmentContractors } from "./government-contractors";

export const VERTICALS: Record<VerticalSlug, VerticalData> = {
  "law-firms": lawFirms,
  "clinics": clinics,
  "schools": schools,
  "real-estate": realEstate,
  "accounting-consulting": accountingConsulting,
  "trading-companies": tradingCompanies,
  "government-contractors": governmentContractors,
};
