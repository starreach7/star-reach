import { useState } from 'react';
import AuthService from '../services/api/auth.service';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (sessionToken: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await AuthService.resetPassword(sessionToken, password);
      setSuccess(true);
      showSuccessToast('Your password has been reset successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      showErrorToast(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    resetPassword,
    loading,
    error,
    success,
    clearError,
  };
};