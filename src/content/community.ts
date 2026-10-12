export interface CommunityIssue {
  id: string;
  trackingId: string;
  title: string;
  category: "Infrastructure" | "Food Affordability" | "Power & Light" | "Water & Sanitation" | "Healthcare" | "Security";
  state: string;
  lga: string;
  location: string;
  description: string;
  reportedDate: string;
  status: "Investigating" | "Field Verified" | "In Progress" | "Resolved";
  confirmations: number;
  imageUrl?: string;
}

export interface Petition {
  id: string;
  trackingNumber: string;
  title: string;
  category: "Economic Justice" | "Food Security" | "Infrastructure" | "Public Governance";
  targetAuthority: string;
  summary: string;
  fullText: string;
  signaturesCount: number;
  goalCount: number;
  deadline: string;
  isUrgent: boolean;
  status: "Active" | "Under Review" | "Delivered";
}

export const INITIAL_ISSUES: CommunityIssue[] = [
  {
    id: "iss-001",
    trackingId: "PITS-ISS-9041",
    title: "Collapsed Culvert & Flooded Access Road in Ojodu Berger",
    category: "Infrastructure",
    state: "Lagos",
    lga: "Ikeja",
    location: "Ojodu Berger Underpass Corridor",
    description: "Heavy rains destroyed the main culvert connecting local market stalls to the transit bus stop. Commuters are stranded and local traders are suffering daily stock losses.",
    reportedDate: "2026-03-28",
    status: "Field Verified",
    confirmations: 142,
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "iss-002",
    trackingId: "PITS-ISS-9042",
    title: "Excessive Middleman Price Gouging on Local Rice Paddy",
    category: "Food Affordability",
    state: "Kebbi",
    lga: "Argungu",
    location: "Central Grain Market, Argungu",
    description: "Grain cartels are hoarding newly harvested rice paddy and inflating sack prices by 65% above farm gate. Need PITS direct producer-to-consumer linkage pilot intervention.",
    reportedDate: "2026-03-29",
    status: "In Progress",
    confirmations: 289,
    imageUrl: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "iss-003",
    trackingId: "PITS-ISS-9043",
    title: "Abandoned Transformer Leaving 4 Communities in Total Blackout",
    category: "Power & Light",
    state: "Oyo",
    lga: "Ibadan North",
    location: "Bodija / Agbowo Border Settlement",
    description: "Distribution company disconnected the 500kVA transformer 8 months ago without replacement. Welders, barbers, and cold-room operators have lost livelihoods.",
    reportedDate: "2026-04-02",
    status: "Investigating",
    confirmations: 198,
  },
  {
    id: "iss-004",
    trackingId: "PITS-ISS-9044",
    title: "Dry Season Borehole Contamination at Primary Health Center",
    category: "Water & Sanitation",
    state: "Kaduna",
    lga: "Zaria",
    location: "Tudun Wada Health Post",
    description: "The sole public motorized borehole serving maternity ward and adjacent primary school broke down, forcing patients to fetch untreated stream water.",
    reportedDate: "2026-04-05",
    status: "Field Verified",
    confirmations: 167,
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "iss-005",
    trackingId: "PITS-ISS-9045",
    title: "Illegal Toll Checkpoints Imposed on Food Transit Trucks",
    category: "Food Affordability",
    state: "Benue",
    lga: "Makurdi",
    location: "Katsina-Ala Transit Bridge",
    description: "Non-state extortionists demanding illegal N40,000 levies per food haulage lorry, driving up yam and cassava retail prices across southern distribution hubs.",
    reportedDate: "2026-04-08",
    status: "In Progress",
    confirmations: 312,
  },
  {
    id: "iss-006",
    trackingId: "PITS-ISS-9046",
    title: "Primary Health Center Lacks Emergency Antivenom & Antibiotics",
    category: "Healthcare",
    state: "Plateau",
    lga: "Barkin Ladi",
    location: "Heipang Health Dispensary",
    description: "Rural farmers traveling 35km to Jos for basic snakebite treatment and malaria diagnostics due to zero medical supply replenishment since January.",
    reportedDate: "2026-04-10",
    status: "Investigating",
    confirmations: 85,
  },
];

export const INITIAL_PETITIONS: Petition[] = [
  {
    id: "pet-001",
    trackingNumber: "PITS-PET-2027-01",
    title: "Emergency Elimination of Illegal State Tolls on Interstate Food Haulage",
    category: "Food Security",
    targetAuthority: "Federal Ministry of Agriculture & Nigeria Police Force",
    summary: "Dismantle illegal revenue checkpoints that inflate food commodity costs between northern agricultural states and urban retail centers by over 30%.",
    fullText: "We, the undersigned citizens and community traders of Nigeria, demand the immediate enforcement of the Presidential Executive Order prohibiting non-statutory road blocks and extortion points on interstate food freight. Every truck of yam, grains, and perishables delayed on transit adds direct hunger penalties to struggling working families.",
    signaturesCount: 16420,
    goalCount: 20000,
    deadline: "May 30, 2026",
    isUrgent: true,
    status: "Active",
  },
  {
    id: "pet-002",
    trackingNumber: "PITS-PET-2027-02",
    title: "Public Audit of Inactive Neighborhood Electrical Transformers",
    category: "Infrastructure",
    targetAuthority: "Nigerian Electricity Regulatory Commission (NERC)",
    summary: "Mandate power distribution companies to replace broken community transformers within 14 working days or waive estimated billing for affected wards.",
    fullText: "Communities across Nigeria are subjected to extortionate community self-taxation to purchase and repair public distribution transformers that Disco operators own and profit from. We petition NERC to enforce strict service-level agreements and criminalize billing in darkened neighborhoods.",
    signaturesCount: 12150,
    goalCount: 15000,
    deadline: "June 15, 2026",
    isUrgent: true,
    status: "Active",
  },
  {
    id: "pet-003",
    trackingNumber: "PITS-PET-2027-03",
    title: "Direct Allocation of Paddy Rice from National Grain Reserves to Local Cooperatives",
    category: "Economic Justice",
    targetAuthority: "Strategic Grain Reserve Department",
    summary: "Bypass speculative wholesale cartels by delivering reserve grain directly to vetted grassroots market women cooperatives at subsidized baseline cost.",
    fullText: "Food palliative schemes have repeatedly failed because grains are handed to political brokers who repackage and resell at exorbitant black market rates. This petition demands direct ward-level cooperative distribution verified by grassroots civil society oversight.",
    signaturesCount: 21840,
    goalCount: 25000,
    deadline: "April 30, 2026",
    isUrgent: false,
    status: "Active",
  },
];
