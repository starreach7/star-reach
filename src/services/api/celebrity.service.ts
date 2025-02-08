import api from './axios';
import AuthService from './auth.service';
import { CelebrityOnboardingData } from '../../types/celebrity';
import { useAuth } from '../../store/authStore';

interface GetCelebritiesParams {
  page: number;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  ratings?: number[];
  sortBy?: string;
  categoryId?: string;
}

class CelebrityService {
  async onboard(data: CelebrityOnboardingData): Promise<void> {
    try {
      const formData = new FormData();
      
      // Append basic info
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('location', data.location);
      
      // Append profile image if exists
      if (data.profileImage) {
        formData.append('profileImage', data.profileImage);
      }
      
      // Append verification documents
      if (data.idDocument) {
        formData.append('idDocument', data.idDocument);
      }
      formData.append('idType', data.idType);
      formData.append('socialPlatformLink', data.socialProof);
      formData.append('largestFollowingPlatform', data.largestFollowingPlatform);
      formData.append('largestFollowingUsername', data.largestFollowingHandle);
      formData.append('largestFollowingCount', data.largestFollowingCount);
      
      // Append profile setup data
      formData.append('categoryId', data.category);
      formData.append('bio', data.bio);

      data.tags.forEach((tag: string) => {
        formData.append('tags', tag);
      });      

      // Append pricing data
      data.services.forEach((service: string) => {
        formData.append('services', service);
      });

      if (data.personalVideoPrice) {
        formData.append('personalVideoPrice', data.personalVideoPrice.toString());
      }
      if (data.businessVideoPrice) {
        formData.append('businessVideoPrice', data.businessVideoPrice.toString());
      }
      if (data.meetingPrice) {
        formData.append('meetingPrice', data.meetingPrice.toString());
      }
      formData.append('responseTime', data.responseTime);
      
      // Append availability if exists
      if (data.availability) {
        formData.append('availability', JSON.stringify(data.availability));
      }
      await api.post('/user/celebrity-onboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async uploadFile(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await api.post('/common/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Assuming the API returns the file as a string in `data.fileUrl`
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAllCelebrities(params: GetCelebritiesParams) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', params.page.toString());
      
      if (params.search) {
        queryParams.append('search', params.search);
      }
      
      if (params.minPrice) {
        queryParams.append('minPrice', params.minPrice);
      }
      
      if (params.maxPrice) {
        queryParams.append('maxPrice', params.maxPrice);
      }
      
      if (params.ratings && params.ratings.length > 0) {
        queryParams.append('ratings', params.ratings.join(','));
      }
      
      if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
      }

        // Add categoryId to query params if provided
        if (params.categoryId) {
          queryParams.append('category', params.categoryId);
        }

      const response = await api.get(`/user/celebrities?${queryParams.toString()}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCelebrityProfile(id: string) {
    try {
      const response = await api.get(`/user/celebrity/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateProfile(data: any): Promise<{ user: any }> {
    try {  
      if (data.promotionalVideo instanceof File) {
        const videoUrl = await this.uploadFile(data.promotionalVideo);        
        data.promotionalVideo = videoUrl; // Update with the returned URL
      }
  
      const formData = new FormData();
      formData.append('promotionalVideo', data.promotionalVideo.data ? data.promotionalVideo.data : data.promotionalVideo || ''); // Use string or fallback to empty
      formData.append('categoryId', data.categoryId);
      formData.append('bio', data.bio);
  
      data.tags.forEach((tag: string) => {
        formData.append('tags', tag);
      });
  
      formData.append('responseTime', data.responseTime);
  
      await api.put('/celebrity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: data.onUploadProgress,
      });
  
      // Fetch the updated user profile
      const user = await AuthService.getCurrentUser();   
      
      useAuth.getState().updateUser(user);

      return { user };
    } catch (error) {
      throw this.handleError(error);
    }
  }
  

  async updatePricing(data: any): Promise<void> {
    try {
      await api.put('/celebrity', data);
      const user = await AuthService.getCurrentUser();   
      
      useAuth.getState().updateUser(user);

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

export default new CelebrityService();