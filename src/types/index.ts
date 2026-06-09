export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular: boolean;
  category: string; // e.g. "BASIC ACCESS", "FULL EXPERIENCE", "VIP STATUS"
}

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  specialization: string[];
  bio: string;
  longBio?: string;
  experience: number; // years
  certifications: string[];
  imageUrl: string;
  instagramUrl?: string;
  rating: number;
  isFeatured?: boolean;
  quote?: string;
  schedule?: {
    days: string;
    hours: string;
  }[];
}

export type ClassType = "YOGA" | "HIIT" | "CROSSFIT" | "ZUMBA" | "BOXING" | "CYCLING" | "STRENGTH";

export interface GymClass {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ClassType;
  trainerId: string;
  trainerName: string;
  dayOfWeek: number; // 0=Sun, 1=Mon ... 6=Sat
  startTime: string; // e.g. "06:00"
  duration: number; // minutes
  capacity: number;
  slotsLeft: number;
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatarUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  imageUrl: string;
  author: {
    name: string;
    imageUrl: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "EQUIPMENT" | "CLASSES" | "EVENTS" | "TRANSFORMATIONS";
  imageUrl: string;
  alt: string;
}

export interface ClassBooking {
  id: string;
  classId: string;
  className: string;
  classDate: string; // e.g., "OCT 14"
  startTime: string;
  trainerName: string;
  status: "CONFIRMED" | "CANCELLED" | "ATTENDED" | "NO_SHOW";
}

export interface BillingHistoryItem {
  id: string;
  description: string;
  date: string; // e.g., "Sep 28, 2024"
  amount: number;
  receiptUrl?: string;
}
