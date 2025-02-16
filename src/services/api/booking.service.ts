import api from './axios';

export interface PersonalBookingRequest {
  celebrityId: string;
  recipientName: string;
  message: string;
}

export interface BusinessBookingRequest {
  celebrityId: string;
  businessName: string;
  businessEmail: string;
  message: string;
}

export interface MeetingBookingRequest {
  celebrityId: string;
  date: string;
  timeSlot: string;
  message: string;
}

export interface BookingResponse {
  bookingId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  createdAt: string;
}

class BookingService {
  // Personal Video Booking
  async createPersonalBooking(data: PersonalBookingRequest): Promise<BookingResponse> {
    try {
      // In a real implementation, this would be:
      // const response = await api.post('/bookings/personal', data);
      // return response.data;

      // Placeholder implementation
      return {
        bookingId: Math.random().toString(36).substring(7),
        status: 'pending',
        amount: 50,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Business Video Booking
  async createBusinessBooking(data: BusinessBookingRequest): Promise<BookingResponse> {
    try {
      // In a real implementation, this would be:
      // const response = await api.post('/bookings/business', data);
      // return response.data;

      // Placeholder implementation
      return {
        bookingId: Math.random().toString(36).substring(7),
        status: 'pending',
        amount: 150,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Meeting Booking
  async createMeetingBooking(data: MeetingBookingRequest): Promise<BookingResponse> {
    try {
      // In a real implementation, this would be:
      // const response = await api.post('/bookings/meeting', data);
      // return response.data;

      // Placeholder implementation
      return {
        bookingId: Math.random().toString(36).substring(7),
        status: 'pending',
        amount: 200,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get Booking Status
  async getBookingStatus(bookingId: string): Promise<BookingResponse> {
    try {
      // In a real implementation, this would be:
      // const response = await api.get(`/bookings/${bookingId}`);
      // return response.data;

      // Placeholder implementation
      return {
        bookingId,
        status: 'pending',
        amount: 100,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(error.message || 'An error occurred');
    }
  }
}

export default new BookingService();