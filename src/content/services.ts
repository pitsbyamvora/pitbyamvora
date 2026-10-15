export interface QuickServiceCategory {
  id: string;
  name: string;
  categoryFilter: string;
  iconName: "ShoppingBag" | "UtensilsCrossed" | "Smartphone" | "Zap" | "Car" | "Plane";
  image: string;
  tagline: string;
  isPopular?: boolean;
}

export const QUICK_SERVICE_CATEGORIES: QuickServiceCategory[] = [
  {
    id: "essentials",
    name: "Shop Essentials",
    categoryFilter: "Grains & Rice",
    iconName: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    tagline: "Rice, garri, beans & bulk staples at wholesale farm gate prices",
    isPopular: true,
  },
  {
    id: "meals",
    name: "Order a Meal",
    categoryFilter: "Tubers & Staples",
    iconName: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    tagline: "Community food hubs, local cookeries & bulk meal deliveries",
  },
  {
    id: "airtime-data",
    name: "Buy Airtime or Data",
    categoryFilter: "Civic Connectivity",
    iconName: "Smartphone",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=600&q=80",
    tagline: "PITS Connect subsidized internet vouchers & mobile bundles",
  },
  {
    id: "electricity",
    name: "Pay Electricity Bills",
    categoryFilter: "Civic Connectivity",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    tagline: "Zero-fee prepaid meter token generation & community energy hubs",
  },
  {
    id: "rides",
    name: "Request a Ride",
    categoryFilter: "Mobility",
    iconName: "Car",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80",
    tagline: "PITS Move transit corridor bus passes & discounted commuter shuttles",
  },
  {
    id: "travels",
    name: "Book Flights & Travels",
    categoryFilter: "Mobility",
    iconName: "Plane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    tagline: "Interstate road express & travel connections for member delegates",
  },
];
