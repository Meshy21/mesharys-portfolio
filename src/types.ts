export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  challenges: string;
  learnings: string;
  image: string;
  imageHint: string;
  gallery: { url: string; hint: string }[];
  videos?: string[];
  tags: string[];
  github: string | null;
  live: string | null;
}

export interface Skill {
  name: string;
  description: string;
  iconName: string;
}

export interface HeroData {
  headline: string;
  tagline: string;
  bio: string;
  image: string;
}

export interface ContactData {
  location: string;
  email: string;
  linkedin: string;
  phone: string;
  cvLink: string;
}

export interface PortfolioData {
  hero: HeroData;
  skills: Skill[];
  projects: Project[];
  contact: ContactData;
}

export interface Critique {
  category: string;
  title: string;
  status: 'Critical' | 'Improvement' | 'Good';
  reason: string;
  options: string[];
  cmsFiles: string[];
}

export interface StyleReviewResult {
  layoutScore: number;
  typographyScore: number;
  contrastScore: number;
  overallSummary: string;
  critiques: Critique[];
}

export interface ContactFormMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
