export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  dateOfBirth?: string;
  gender?: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Celebrity {
  id: string;
  bio: string;
  categoryId: string;
  createdAt: string;
  currency: string;
  email: string;
  fullName: string;
  idDocument: string;
  idType: string;
  largestFollowingCount: string;
  largestFollowingPlatform: string;
  largestFollowingUsername: string;
  location: string;
  profileImage: string;
  promotionalVideo: string | null;
  responseTime: string;
  services: string[];
  personalVideoPrice:string;
  businessVideoPrice:string;
  meetingPrice:string;
  socialPlatformLink: string;
  status: string;
  tags: string[];
  updatedAt: string;
  userId: string;
  availability: { date: string; timeSlots: any[] }[];
}

export interface User {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  categories: any[];
  profileImage: string;
  celebrity?: Celebrity; // Optional property for celebrity details
}


export interface UserResponse {
  data: User;
}

// const { updateUser } = useAuth();
// updateUser(newUserData);