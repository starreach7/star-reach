import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, LoginCredentials, RegisterData } from '../types/auth';
import AuthService from '../services/api/auth.service';
import { showErrorToast, showSuccessToast } from '../utils/toast';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: User) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const { tokens, user } = await AuthService.login(credentials);
          set({ 
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
            loading: false 
          });
          showSuccessToast('Successfully logged in!');
        } catch (error) {
          const errorMessage = (error as Error).message;
          set({ error: errorMessage, loading: false });
          showErrorToast(errorMessage);
          throw error;
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const { tokens, user } = await AuthService.register(data);
          set({ 
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
            loading: false 
          });
          showSuccessToast('Account created successfully!');
        } catch (error) {
          const errorMessage = (error as Error).message;
          set({ error: errorMessage, loading: false });
          showErrorToast(errorMessage);
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await AuthService.logout();
          set({ 
            accessToken: null,
            refreshToken: null,
            user: null,
            loading: false 
          });
          showSuccessToast('Successfully logged out!');
        } catch (error) {
          const errorMessage = (error as Error).message;
          set({ error: errorMessage, loading: false });
          showErrorToast(errorMessage);
          throw error;
        }
      },

      updateUser: (userData) => {
        set({ user: userData });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user
      }),
    }
  )
);