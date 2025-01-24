import { useState } from 'react';
import CelebrityService from '../services/api/celebrity.service';
import { CelebrityOnboardingData } from '../types/celebrity';
import { showErrorToast, showSuccessToast } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

export const useCelebrityOnboarding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitApplication = async (data: CelebrityOnboardingData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await CelebrityService.onboard(data);
      setSuccess(true);
      showSuccessToast('Your application has been submitted successfully!');
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
    submitApplication,
    loading,
    error,
    success,
    clearError,
  };
};