import { create } from 'zustand';
import CategoryService from '../services/api/category.service';
import { Category } from '../types';
import { showErrorToast } from '../utils/toast';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  clearError: () => void;
}

export const useCategories = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await CategoryService.getCategories();
      set({ categories, loading: false });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ error: errorMessage, loading: false });
      showErrorToast(errorMessage);
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));