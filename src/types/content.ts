export interface Initiative {
  id: string;
  slug: string;
  title: string;
  category: "Food Affordability" | "Civic Transparency" | "Community Organizing" | "Youth Development";
  tagline: string;
  description: string;
  status: "Active" | "Planned" | "Completed";
  progressLabel?: string;
  targetMetric?: string;
}

export interface CampaignMilestone {
  dayNumber: number;
  phaseTitle: string;
  summary: string;
  status: "completed" | "in_progress" | "upcoming";
  dateRange: string;
}

export interface NewsStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  readTime: string;
}
