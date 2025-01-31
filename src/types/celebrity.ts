export interface TimeSlot {
  start: string;
  end: string;
}

export interface DateAvailability {
  date: string;
  timeSlots: TimeSlot[];
}

export interface CelebrityOnboardingData {
  // Basic Info
  fullName: string;
  email: string;
  // phone: string;
  location: string;
  profileImage: File | null;

  // Verification
  idType: string;
  idDocument: File | null;
  socialProof: string;
  largestFollowingPlatform: string;
  largestFollowingHandle: string;
  largestFollowingCount: string;

  // Profile Setup
  category: string;
  bio: string;
  tags: string[];

  // Pricing
  services: string[];
  personalVideoPrice?: string;
  businessVideoPrice?: string;
  meetingPrice?: string;
  responseTime: string;
  availability?: DateAvailability[];
}

export interface OnboardingResponse {
  message: string;
  celebrityId: string;
}

export interface CelebrityProfile {
  id: string;
  userId: string;
  categoryName: string;
  fullName: string;
  profileImage: string;
  isCurrentUserCelebrity: boolean;
  bio?: string | null;
  tags?: string[] | null;
  averageRating: number;
  totalReviews: number;
  responeTime: string;
  services: string[] | null;
  personalVideoPrice?: number | null;
  businessVideoPrice?: number | null;
  meetingPrice?: number | null;
  promotionalVideo: string;
  reviews: Ratings;
  videos: string[];
  recentVideos: string[];
  meetingSchedules: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  ordersCompleted: number;
  joinedDate: string;
}

export interface Ratings {
  username: string;
  profileImage: string;
  rating: string;
  review: number;
  createdAt: string;
}