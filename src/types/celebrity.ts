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