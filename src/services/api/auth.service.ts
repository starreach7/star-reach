import api from './axios';
import { LoginCredentials, RegisterData, AuthResponse, UserResponse, User } from '../../types/auth';

class AuthService {
  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<UserResponse>('/user');
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async login(credentials: LoginCredentials): Promise<{ tokens: AuthResponse; user: User }> {
    try {
      const response = await api.post<{ data: AuthResponse }>('/auth/login', credentials);
      this.setTokens(response.data.data);
      
      // Fetch user data after successful login
      const user = await this.getCurrentUser();
      return {
        tokens: response.data.data,
        user
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(data: RegisterData): Promise<{ tokens: AuthResponse; user: User }> {
    try {
      const response = await api.post<{ data: AuthResponse }>('/auth/register', data);
      this.setTokens(response.data.data);
      
      // Fetch user data after successful registration
      const user = await this.getCurrentUser();
      return {
        tokens: response.data.data,
        user
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      // const refreshToken = localStorage.getItem('refreshToken');
      // await api.post('/auth/logout', { refreshToken });
      
      this.clearTokens();
      
    } catch (error) {
      this.clearTokens();
      throw this.handleError(error);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/send-email', { email });
    } catch (error) {
      throw this.handleError(error);
    }
  }


  async resetPassword(sessionToken: string, password: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { sessionToken, password });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      await api.post('/auth/verify-email', { token });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post<{ data: AuthResponse }>('/auth/refresh-token', {
        refreshToken,
      });
      this.setTokens(response.data.data);
      return response.data.data;
    } catch (error) {
      this.clearTokens();
      throw this.handleError(error);
    }
  }

  private setTokens(data: AuthResponse): void {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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

export default new AuthService();
