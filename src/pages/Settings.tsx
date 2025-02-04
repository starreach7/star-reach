import React, { useState } from 'react';
import { useAuth } from '../store/authStore';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import ProfileImageUpload from '../components/accountSettings/ProfileImageUpload';
import ProfileForm from '../components/accountSettings/ProfileForm';
import SecuritySection from '../components/accountSettings/SecuritySection';
import userService from '../services/api/user.service';
import { showSuccessToast } from '../utils/toast';


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name is too short')
    .max(50, 'First name is too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name is too short')
    .max(50, 'Last name is too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  userName: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .required('Username is required'),
  gender: Yup.string()
    .required('Gender is required'),
  dateOfBirth: Yup.date()
    .nullable()
    .required('Date of birth is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .notRequired(), // Optional unless provided
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});


const Settings = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProfile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        profile, // Include the Base64 string
      };
      console.log('Form submitted:', payload);

      setLoading(true);
      await userService.updateUser(payload);
      showSuccessToast('User updated successfully!');
      // Here you would typically update the user's profile
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error updating User:', error);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
            <Formik
              initialValues={{
                firstName: user?.firstName || '',
                lastName: user?.lastName || '',
                email: user?.email || '',
                userName: user?.username || '',
                gender: user?.gender || '',
                dateOfBirth: user?.dateOfBirth || '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <ProfileImageUpload
                    profileImage={profileImage}
                    userImage={user?.profileImage}
                    onImageChange={handleImageChange}
                  />

                  <ProfileForm errors={errors} touched={touched} />

                  <SecuritySection errors={errors} touched={touched} />

                  {/* Save Button */}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Delete Account */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={handleDeleteAccount}
                className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;