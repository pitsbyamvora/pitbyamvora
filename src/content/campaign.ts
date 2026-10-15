export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  quote?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
  tagline: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    badge: "PITS 2027 • 60-DAY PROOF-OF-WORK CHALLENGE",
    title: "Don't Give Us 60 Days to Promise.",
    highlight: "Give Us 60 Days to Prove.",
    subtitle:
      "Action versus campaign promises. 60 Days. 5 Tests. Real Results. We are testing the waters of discounting based on the daily amenities needed for every Nigerian to sustain themselves.",
    quote: "“The undermined is unstoppable.”",
    primaryCtaText: "Track Proof-of-Work",
    primaryCtaLink: "/campaigns/60-day-proof-of-work",
    secondaryCtaText: "Join Movement",
    secondaryCtaLink: "/volunteer",
    // Replace with your ImageKit or Cloudinary URL when ready
    image: "https://ik.imagekit.io/pha2ibrpir/IMG_0822.jpeg?updatedAt=1791913122926",
    tagline: "Supported by Amvora Light Foundation",
  },
  {
    id: "slide-2",
    badge: "THE FIVE 60-DAY TESTS • SURVIVAL PILLARS",
    title: "Show Nigerians What",
    highlight: "Leadership Can Do.",
    subtitle:
      "A genuine public-policy experiment targeting 5 critical survival amenities: The Rice Test, PITS Connect, PITS Move transit discounts, PITS Food bulk savings, and Community action teams.",
    quote: "“Instead of giving a one-time bag of rice and calling it empowerment, we are building the chain.”",
    primaryCtaText: "Explore The 5 Tests",
    primaryCtaLink: "/campaigns/60-day-proof-of-work",
    secondaryCtaText: "Report Local Issue",
    secondaryCtaLink: "/report",
    // Replace with your ImageKit or Cloudinary URL when ready
    image: "https://ik.imagekit.io/pha2ibrpir/charity.jpg",
    tagline: "Action versus campaign promises",
  },
  {
    id: "slide-3",
    badge: "HIGHER STANDARD OF EVIDENCE • PUBLIC AUDIT",
    title: "Transparent Public-Service Pilot:",
    highlight: "Measure, Deliver, Prove.",
    subtitle:
      "Every PITS pilot runs on a strict measurement ledger: Baseline costs, clear parameters, 30-day initial data, 60-day final results, and an open public scorecard. If something fails, we publish the failure.",
    quote: "“Did we deliver? What did it cost? And how much did the average consumer save?”",
    primaryCtaText: "View Public Scorecard",
    primaryCtaLink: "/campaigns/60-day-proof-of-work",
    secondaryCtaText: "Sign Petitions",
    secondaryCtaLink: "/petitions",
    // Replace with your ImageKit or Cloudinary URL when ready
    image: "https://ik.imagekit.io/pha2ibrpir/WhatsApp%20Image%202026-10-13%20at%2018.36.47.jpeg",
    tagline: "Moving from underestimated to unstoppable",
  },
  {
    id: "slide-4",
    badge: "POWER IN THE STREET • COMMUNITY MOBILIZATION",
    title: "The Real Power Is In The Streets.",
    highlight: "Organized Grassroots Action.",
    subtitle:
      "Connecting citizens directly with manufacturers, farmers, and local traders. Building an organized community database and rapid support cells across Nigerian wards and cities.",
    quote: "“Work with me, I want to work with you.”",
    primaryCtaText: "Mobilize as Volunteer",
    primaryCtaLink: "/volunteer",
    secondaryCtaText: "Community Issues",
    secondaryCtaLink: "/issues",
    // Replace with your ImageKit or Cloudinary URL when ready
    image: "https://ik.imagekit.io/pha2ibrpir/c0fde81e-5d91-4c55-ad86-2c6cee67b221.jpeg?updatedAt=1791591399064",
    tagline: "PITS — Power in the Street",
  },
];

export const BRAND_INFO = {
  name: "PITS",
  movement: "Power in the Street",
  foundation: "Supported by Amvora Light Foundation",
  motto: "The undermined is unstoppable",
  slogan: "Don't give us 60 days to promise. Give us 60 days to prove.",
  coreArchitecture: "60 Days. 5 Tests. Real Results.",
  domain: "https://amvora.com.ng",
  founder: {
    name: "Adeyinka Honey.A (Dabiraoluwa)",
    title: "Founder & Visionary",
    epithet: "The Face Behind The Plan",
  },
  contact: {
    phone: "+234 816 885 0257",
    altPhone: "+234 816 645 8786",
    email: "moremillionvoices@gmail.com",
  },
  socials: {
    facebook: "https://www.facebook.com/share/1Dw37Vy9HP/",
    youtube: "https://www.youtube.com/@MoremillionVoices",
    instagram: "https://www.instagram.com/moremillionvoices",
    tiktok: "https://www.tiktok.com/@moremillionvoices",
    twitter: "https://twitter.com/MoreMillionVoices",
  },
  fiveTests: [
    {
      name: "The Rice Test",
      focus: "Transparent production-to-consumer tracking system.",
    },
    {
      name: "PITS Connect",
      focus: "Affordable digital access without giveaways.",
    },
    {
      name: "PITS Move",
      focus: "Controlled discounted transit subsidies.",
    },
    {
      name: "PITS Food",
      focus: "Technology and bulk distribution savings.",
    },
    {
      name: "Community",
      focus: "Community-led problem-solving teams.",
    },
  ],
  executionPhases: [
    { phase: "The Promise", duration: "Days 1–7", focus: "Launch challenge and publish parameters." },
    { phase: "The Build", duration: "Days 8–20", focus: "Activate partners and operational pilots." },
    { phase: "First Results", duration: "Days 21–30", focus: "Publish 30-day public scorecard." },
    { phase: "The Scale", duration: "Days 31–55", focus: "Expand credible models under pressure." },
    { phase: "The Verdict", duration: "Days 56–60", focus: "Compile final 60-Day Proof Report." },
  ],
  declaration:
    "We are here to launch a new kind of political movement. For decades, people have promised and failed. PITS has not come as a movement to make promises; we are here to test the waters for 60 days. Don’t give us 60 days to promise. Give us 60 days to prove.",
  historicalContext:
    "PITS played a major role in the historic 10:20:2020 movement, popularly known as #EndSARS and #EndBadGovernment — a peaceful protest against police brutality that united millions of Nigerians across the nation.",
};

export const CORE_PROGRAMS = [
  {
    id: "prog-rice",
    title: "The Rice Test (Food Production)",
    category: "Food Affordability",
    summary: "Transparent production-to-consumer tracking system. Moving from one-time bags of rice to a reliable, consistent community production chain.",
    status: "60-Day Test 1",
    actionLink: "/campaigns/60-day-proof-of-work",
  },
  {
    id: "prog-connect",
    title: "PITS Connect (Digital Access)",
    category: "Connectivity",
    summary: "Affordable digital and data access without giveaways. Enabling students and local businesses to stay connected at real discounted rates.",
    status: "60-Day Test 2",
    actionLink: "/campaigns/60-day-proof-of-work",
  },
  {
    id: "prog-move",
    title: "PITS Move (Transit Subsidies)",
    category: "Mobility",
    summary: "Controlled discounted transit subsidies for daily commuters and workers on critical urban corridors.",
    status: "60-Day Test 3",
    actionLink: "/campaigns/60-day-proof-of-work",
  },
  {
    id: "prog-food",
    title: "PITS Food (Bulk Savings)",
    category: "Affordability",
    summary: "Technology and bulk distribution savings connecting local markets directly to farmers and manufacturers.",
    status: "60-Day Test 4",
    actionLink: "/campaigns/60-day-proof-of-work",
  },
  {
    id: "prog-community",
    title: "Community Problem-Solving Teams",
    category: "Opportunity",
    summary: "Community-led problem-solving teams addressing water boreholes, local power, and urgent neighborhood challenges.",
    status: "60-Day Test 5",
    actionLink: "/campaigns/60-day-proof-of-work",
  },
];
