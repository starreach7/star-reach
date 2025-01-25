import React, { useState } from 'react';
import { useAuth } from '../store/authStore';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import ProfileImageUpload from '../components/accountSettings/ProfileImageUpload';
import ProfileForm from '../components/accountSettings/ProfileForm';
import SecuritySection from '../components/accountSettings/SecuritySection';


const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
    lastName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  twoFactorEnabled: Yup.boolean()
});

const Settings = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
      console.log('Form submitted:', values);
      // Here you would typically update the user's profile
    } catch (error) {
      console.error('Error updating profile:', error);
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
                newPassword: '',
                confirmPassword: '',
                twoFactorEnabled: false
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
                      className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                    >
                      Save changes
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