// Booking Types
export interface Booking {
    id: string;
    type: 'personal' | 'business' | 'meeting';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    amount: number;
    createdAt: string;
    updatedAt: string;
    
    // Common fields
    celebrityId: string;
    userId: string;
    message: string;
  
    // Personal booking specific fields
    recipientName?: string;
  
    // Business booking specific fields
    businessName?: string;
    businessEmail?: string;
  
    // Meeting booking specific fields
    meetingDate?: string;
    meetingTime?: string;
    meetingDuration?: number; // in minutes
    meetingLink?: string;
  }
  
  // API Response Types
  export interface BookingResponse {
    data: Booking;
    message: string;
  }
  
  export interface BookingsListResponse {
    data: Booking[];
    total: number;
    page: number;
    totalPages: number;
  }