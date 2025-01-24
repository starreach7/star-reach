import { useState } from 'react';
import AuthService from '../services/api/auth.service';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const requestReset = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await AuthService.forgotPassword(email);
      setSuccess(true);
      showSuccessToast('Password reset instructions have been sent to your email.');
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
    requestReset,
    loading,
    error,
    success,
    clearError,
  };
};