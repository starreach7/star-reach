import api from './axios';
import { Category } from '../../types';

class CategoryService {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get('/user/categories');
      return response.data.data;
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

export default new CategoryService();