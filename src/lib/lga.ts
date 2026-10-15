/**
 * Lagos State Local Government Areas
 * All 20 LGAs with slugs, wards count, and region groupings
 */

export interface LGA {
  name: string;
  slug: string;
  region: "Island" | "Mainland" | "Suburban";
  wards: number;
}

export const LAGOS_LGAS: LGA[] = [
  { name: "Agege", slug: "agege", region: "Mainland", wards: 10 },
  { name: "Ajeromi-Ifelodun", slug: "ajeromi-ifelodun", region: "Mainland", wards: 10 },
  { name: "Alimosho", slug: "alimosho", region: "Suburban", wards: 10 },
  { name: "Amuwo-Odofin", slug: "amuwo-odofin", region: "Mainland", wards: 10 },
  { name: "Apapa", slug: "apapa", region: "Island", wards: 10 },
  { name: "Badagry", slug: "badagry", region: "Suburban", wards: 10 },
  { name: "Epe", slug: "epe", region: "Suburban", wards: 10 },
  { name: "Eti-Osa", slug: "eti-osa", region: "Island", wards: 10 },
  { name: "Ibeju-Lekki", slug: "ibeju-lekki", region: "Suburban", wards: 10 },
  { name: "Ifako-Ijaye", slug: "ifako-ijaye", region: "Mainland", wards: 10 },
  { name: "Ikeja", slug: "ikeja", region: "Mainland", wards: 10 },
  { name: "Ikorodu", slug: "ikorodu", region: "Suburban", wards: 10 },
  { name: "Kosofe", slug: "kosofe", region: "Mainland", wards: 10 },
  { name: "Lagos Island", slug: "lagos-island", region: "Island", wards: 10 },
  { name: "Lagos Mainland", slug: "lagos-mainland", region: "Mainland", wards: 10 },
  { name: "Mushin", slug: "mushin", region: "Mainland", wards: 10 },
  { name: "Ojo", slug: "ojo", region: "Mainland", wards: 10 },
  { name: "Oshodi-Isolo", slug: "oshodi-isolo", region: "Mainland", wards: 10 },
  { name: "Somolu", slug: "somolu", region: "Mainland", wards: 10 },
  { name: "Surulere", slug: "surulere", region: "Mainland", wards: 10 },
];

export const PRIMARY_NEEDS = [
  "Food & Affordability",
  "Transport & Mobility",
  "Jobs & Employment",
  "Health & Medical",
  "Education & Scholarships",
  "Legal Aid & Rights",
  "Housing & Elderly Care",
  "Business & Cooperative Support",
  "Other",
] as const;

export type PrimaryNeed = (typeof PRIMARY_NEEDS)[number];

export function getLGABySlug(slug: string): LGA | undefined {
  return LAGOS_LGAS.find((l) => l.slug === slug);
}
