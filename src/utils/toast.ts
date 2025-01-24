import toast from 'react-hot-toast';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    className: 'bg-gray-800 text-white border border-gray-700',
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    className: 'bg-gray-800 text-white border border-gray-700',
  });
};