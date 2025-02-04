import api from './axios';
import AuthService from './auth.service';
import { useAuth } from '../../store/authStore';
import NotificationService from './firebase/notification.service';
class UserService {
    async uploadFile(file: File): Promise<string> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/common/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async updateUser(data: any): Promise<void> {
        try {
            // Get FCM token
            const fcmToken = await NotificationService.getFCMToken();

            if (data.profile instanceof File) {
                const videoUrl = await this.uploadFile(data.profile);
                data.profile = videoUrl;
            }

            const formData = new FormData();

            // Append form fields to FormData
            formData.append('profileImage', data.profile.data ? data.profile.data : data.profile || '');
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('email', data.email);
            formData.append('username', data.userName);
            formData.append('gender', data.gender);
            formData.append('dateOfBirth', data.dateOfBirth);
            
            // Append FCM token if available
            if (fcmToken) {
                formData.append('fcmToken', fcmToken);
            }

            await api.put('/user', formData);
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

export default new UserService();