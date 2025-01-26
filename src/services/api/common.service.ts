import api from './axios';

class CommonService {
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
          return response.data.fileUrl;
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

export default new CommonService();
