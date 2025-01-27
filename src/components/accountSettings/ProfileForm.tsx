import React from 'react';
import { Field } from 'formik';
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
          First Name
        </label>
        <Field
          name="firstName"
          type="text"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        {errors.firstName && touched.firstName && (
          <div className="mt-1 text-sm text-red-500">{errors.firstName}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Last Name
        </label>
        <Field
          name="lastName"
          type="text"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        {errors.lastName && touched.lastName && (
          <div className="mt-1 text-sm text-red-500">{errors.lastName}</div>
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

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          User Name
        </label>
        <Field
          name="userName"
          type="text"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        {errors.userName && touched.userName && (
          <div className="mt-1 text-sm text-red-500">{errors.userName}</div>
        )}
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">
          Gender
        </label>
        <Field
          as="select"
          id="gender"
          name="gender"
          className="block w-full pl-3 pr-10 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </Field>
        {errors.gender && touched.gender && (
          <div className="mt-1 text-sm text-red-500">{errors.gender}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Date of Birth
        </label>
        <Field
          name="dateOfBirth"
          type="date"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        {errors.dateOfBirth && touched.dateOfBirth && (
          <div className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</div>
        )}
      </div>
    </>
  );
};

export default ProfileForm;