import api from './axios';
import { CelebrityOnboardingData } from '../../types/celebrity';

class CelebrityService {
  async onboard(data: CelebrityOnboardingData): Promise<void> {
    try {
      const formData = new FormData();
      
      // Append basic info
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      // formData.append('phone', data.phone);
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
      // formData.append('categoryId', data.category);
      formData.append('categoryId', "17a0b1cf-0880-4f02-bb8c-126e53856ae5");

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