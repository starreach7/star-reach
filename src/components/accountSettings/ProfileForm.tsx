import React from 'react';
import { Field } from 'formik';
import { Globe } from 'lucide-react';

interface ProfileFormProps {
  errors: any;
  touched: any;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ errors, touched }) => {
  return (
    <>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <Field
          name="name"
          type="text"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        {errors.name && touched.name && (
          <div className="mt-1 text-sm text-red-500">{errors.name}</div>
        )}
      </div>

      {/* Email - Disabled */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <Field
          name="email"
          type="email"
          disabled
          className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
        />
        <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Country
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <Field
            as="select"
            name="country"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select your country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </Field>
        </div>
        {errors.country && touched.country && (
          <div className="mt-1 text-sm text-red-500">{errors.country}</div>
        )}
      </div>
    </>
  );
};

export default ProfileForm;