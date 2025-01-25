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
  bookings:number
  stats:{
    completed: string,
      avgResponse: string,
      joinedDate: string,
  }
}

export interface Category {
  id: number;
  name: string;
  // icon: string;
  description: string;
  celebrityCount: number;
}