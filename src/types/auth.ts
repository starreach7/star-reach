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
  profileImage:string
  // The interface can be extended as the user object grows
}

export interface UserResponse {
  data: User;
}

// const { updateUser } = useAuth();
// updateUser(newUserData);