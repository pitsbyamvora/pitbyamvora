export interface MarketplaceProduct {
  id: string;
  title: string;
  category: "Grains & Rice" | "Tubers & Staples" | "Cooking Oils" | "Civic Connectivity";
  openMarketPrice: number; // What open cartels charge (e.g. ₦85,000)
  cooperativePrice: number; // PITS baseline farm-gate price (e.g. ₦52,000)
  unit: string;
  origin: string;
  imageUrl: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  pickupHubs: string[];
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
  applicableCategory?: string;
}

export const VERIFIED_PROMO_CODES: Record<string, PromoCode> = {
  PITS2027: {
    code: "PITS2027",
    discountPercentage: 45,
    description: "Citizen Solidarity Voucher (45% off cooperative price)",
  },
  RICETEST: {
    code: "RICETEST",
    discountPercentage: 50,
    description: "60-Day Rice Test Direct Subsidy (50% off all grains)",
    applicableCategory: "Grains & Rice",
  },
  CITIZEN60: {
    code: "CITIZEN60",
    discountPercentage: 35,
    description: "Proof-of-Work Community Pass (35% off any order)",
  },
  WARDFOOD: {
    code: "WARDFOOD",
    discountPercentage: 40,
    description: "Ward Mobilizer Food Security Subsidy (40% off)",
  },
};

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: "prod-rice-50kg",
    title: "50kg Premium Stone-Free Locally Milled Rice",
    category: "Grains & Rice",
    openMarketPrice: 88000,
    cooperativePrice: 52000,
    unit: "50kg Bag",
    origin: "Argungu Rice Paddies, Kebbi State",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 420,
    description: "Direct-from-farm single-origin polished rice. Clean, stone-free, zero middleman cartels markup. Directly tracked through The Rice Test pilot ledger.",
    pickupHubs: ["Lagos (Ojodu)", "Abuja (Wuse)", "Kano (Dawanau)", "Ibadan (Bodija)", "Kebbi (Argungu)"],
  },
  {
    id: "prod-garri-25kg",
    title: "25kg White Cassava Garri (Ijebu Special)",
    category: "Tubers & Staples",
    openMarketPrice: 38000,
    cooperativePrice: 22000,
    unit: "25kg Bag",
    origin: "Ijebu Farmers Cooperative, Ogun State",
    imageUrl: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 650,
    description: "Crispy, dry, well-fermented white garri processed by local cassava farmer clusters. Direct packaging without open market inflation.",
    pickupHubs: ["Lagos (Ojodu)", "Ibadan (Bodija)", "Abeokuta (Kuto)", "Benin (Ring Road)"],
  },
  {
    id: "prod-yam-bundle",
    title: "Bundle of 5 Jumbo Benue Yam Tubers",
    category: "Tubers & Staples",
    openMarketPrice: 24000,
    cooperativePrice: 13500,
    unit: "Bundle (5 Large Tubers)",
    origin: "Zaki Biam Yam Market, Benue State",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 310,
    description: "Freshly harvested premium Benue yams sourced directly from Zaki Biam farmers with zero illegal road haulage tolls added.",
    pickupHubs: ["Lagos (Ojodu)", "Abuja (Wuse)", "Makurdi (North Bank)", "Enugu (Ogbete)"],
  },
  {
    id: "prod-oil-25l",
    title: "25 Litres Pure Refined Vegetable Cooking Oil",
    category: "Cooking Oils",
    openMarketPrice: 62000,
    cooperativePrice: 38500,
    unit: "25L Keg",
    origin: "Direct Manufacturer Cluster, Edo State",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 190,
    description: "Cholesterol-free, factory-sealed pure vegetable cooking oil distributed directly through PITS Food community wholesale networks.",
    pickupHubs: ["Lagos (Ojodu)", "Abuja (Wuse)", "Ibadan (Bodija)", "Port Harcourt (Mile 1)"],
  },
  {
    id: "prod-data-connect",
    title: "PITS Connect 25GB Monthly Community Data Voucher",
    category: "Civic Connectivity",
    openMarketPrice: 14000,
    cooperativePrice: 7500,
    unit: "Digital Code / eSIM",
    origin: "PITS Civic Mesh Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 1200,
    description: "Subsidized broadband data voucher enabling students, jobseekers, and small shop owners to stay connected at wholesale network pricing.",
    pickupHubs: ["Instant Digital SMS / Email Dispatch (Nationwide)"],
  },
  {
    id: "prod-beans-50kg",
    title: "50kg White Honey Beans (Oloyin)",
    category: "Grains & Rice",
    openMarketPrice: 95000,
    cooperativePrice: 58000,
    unit: "50kg Bag",
    origin: "Maiduguri & Gombe Agricultural Hubs",
    imageUrl: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 280,
    description: "Weevil-free, naturally dried sweet honey beans sourced straight from northern farm clusters to beat artificial scarcity markups.",
    pickupHubs: ["Lagos (Ojodu)", "Abuja (Wuse)", "Kano (Dawanau)", "Jos (Terminus)"],
  },
];
