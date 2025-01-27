export interface Celebrity {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  description?: string;
  responseTime?: string;
  languages?: string[];
  tags?: string[];
  reviews?: number;
  bookings: number;
  stats: {
    completed: string;
    avgResponse: string;
    joinedDate: string;
  };
}

export interface ApiCelebrity {
  celebrityId: string;
  userId: string;
  profileImage: string;
  fullName: string;
  averageRating: number;
  price: string;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  celebrityCount: number;
}