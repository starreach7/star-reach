import { Celebrity, Category } from '../types';

export const allCelebrities: Celebrity[] = [
  {
    id: 1,
    name: 'Emma Thompson',
    category: 'Actor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.9,
    reviews: 2453,
    responseTime: '24h',
    price: 150,
    description: 'Award-winning actress known for dramatic and comedic roles. I love connecting with fans and creating special moments through personalized videos.',
    languages: ['English', 'French'],
    tags: ['Movies', 'TV Shows', 'Theater', 'Comedy', 'Drama'],
    bookings: 220,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 2,
    name: "John Blake",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Musicians",
    price: 299,
    rating: 4.8,
    description: "Grammy-nominated singer-songwriter",
    responseTime: "24 hours",
    languages: ["English", "Spanish"],
    tags: ["Pop", "Rock", "Live Music"],
    reviews: 251,
    bookings: 320,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 3,
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    category: "Influencers",
    price: 199,
    rating: 4.7,
    description: "Digital creator with 5M+ followers",
    responseTime: "12 hours",
    languages: ["English", "Mandarin"],
    tags: ["Lifestyle", "Fashion", "Beauty"],
    reviews: 428,
    bookings: 220,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 4,
    name: "Mark Reynolds",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop",
    category: "Athletes",
    price: 399,
    rating: 4.6,
    description: "Olympic gold medalist in swimming",
    responseTime: "36 hours",
    languages: ["English"],
    tags: ["Sports", "Olympics", "Motivation"],
    reviews: 178,
    bookings: 185,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 5,
    name: "Lilly Hart",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "Comedians",
    price: 150,
    rating: 4.5,
    description: "Stand-up comedian known for viral skits",
    responseTime: "48 hours",
    languages: ["English"],
    tags: ["Comedy", "Stand-up", "Entertainment"],
    reviews: 342,
    bookings: 190,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 6,
    name: "Carlos Diaz",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    category: "Actors",
    price: 425,
    rating: 4.7,
    description: "Award-winning actor known for action movies",
    responseTime: "24 hours",
    languages: ["English", "Spanish"],
    tags: ["Action", "Movies", "Hollywood"],
    reviews: 192,
    bookings: 198,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 7,
    name: "Mira Kapoor",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    category: "Influencers",
    price: 350,
    rating: 4.8,
    description: "Top beauty influencer with global reach",
    responseTime: "18 hours",
    languages: ["English", "Hindi"],
    tags: ["Beauty", "Fashion", "Lifestyle"],
    reviews: 402,
    bookings: 410,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 8,
    name: "James Smith",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop",
    category: "Reality TV",
    price: 250,
    rating: 4.4,
    description: "Popular reality TV star from 'Survivor Island'",
    responseTime: "30 hours",
    languages: ["English"],
    tags: ["Reality TV", "Adventure", "Travel"],
    reviews: 276,
    bookings: 280,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 9,
    name: "Angela Davis",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    category: "Comedians",
    price: 400,
    rating: 3.6,
    description: "Known for her humorous takes on modern life",
    responseTime: "20 hours",
    languages: ["English"],
    tags: ["Comedy", "Stand-up", "Improv"],
    reviews: 300,
    bookings: 295,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  },
  {
    id: 10,
    name: "Tom Yu",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
    category: "Athletes",
    price: 375,
    rating: 4.9,
    description: "World champion table tennis player",
    responseTime: "12 hours",
    languages: ["English", "Chinese"],
    tags: ["Sports", "Table Tennis", "Championship"],
    reviews: 412,
    bookings: 415,
    stats: {
      completed: '2.4K',
      avgResponse: '16 hours',
      joinedDate: 'Sep 2023',
    }
  }
];

export const featuredCelebrities: Celebrity[] = [
  allCelebrities[0],
  allCelebrities[1],
  allCelebrities[2]
];

export const trendingCelebrities: Celebrity[] = [
  allCelebrities[0],
  allCelebrities[1],
  allCelebrities[3],
  allCelebrities[4]
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Actors",
    icon: "clapperboard",
    description: "Book personalized videos from your favorite movie and TV stars",
    celebrityCount: 156,
  },
  {
    id: 2,
    name: "Musicians",
    icon: "music",
    description: "Get shoutouts from top artists and bands",
    celebrityCount: 98,
  },
  {
    id: 3,
    name: "Athletes",
    icon: "trophy",
    description: "Connect with sports legends and current stars",
    celebrityCount: 124,
  },
  {
    id: 4,
    name: "Influencers",
    icon: "trending-up",
    description: "Book content creators and social media stars",
    celebrityCount: 203,
  },
  {
    id: 5,
    name: "Comedians",
    icon: "laugh",
    description: "Get funny personalized messages from top comedians",
    celebrityCount: 67,
  },
  {
    id: 6,
    name: "Reality TV",
    icon: "tv",
    description: "Book your favorite reality TV personalities",
    celebrityCount: 89,
  }
];
