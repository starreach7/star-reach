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
            let fcmToken = null;
            
            // Try to get FCM token, but don't block if it fails
            try {
                fcmToken = await NotificationService.getFCMToken();
            } catch (err) {
                console.warn('Failed to get FCM token:', err);
            }

            const formData = new FormData();

            // Only upload new profile image if it's a File object
            if (data.profile instanceof File) {
                const videoUrl = await this.uploadFile(data.profile);
                formData.append('profileImage', videoUrl.data);
            } else if (data.profile) {
                // If it's a URL string, just pass it along
                formData.append('profileImage', data.profile);
            }

            // Append other form fields to FormData
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