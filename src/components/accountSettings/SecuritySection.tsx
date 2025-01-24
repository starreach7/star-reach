import React from 'react';
import { Lock } from 'lucide-react';
import { Field } from 'formik';

interface SecuritySectionProps {
  errors: any;
  touched: any;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ errors, touched }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Lock className="w-5 h-5 text-emerald-400 mr-2" />
        <h3 className="text-lg font-medium text-white">Change Password</h3>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          New Password
        </label>
        <Field
          name="newPassword"
          type="password"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Leave empty to keep current"
        />
        {errors.newPassword && touched.newPassword && (
          <div className="mt-1 text-sm text-red-500">{errors.newPassword}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Confirm New Password
        </label>
        <Field
          name="confirmPassword"
          type="password"
          className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Leave empty to keep current"
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="mt-1 text-sm text-red-500">{errors.confirmPassword}</div>
        )}
      </div>

      <div className="flex items-center justify-between py-4 border-t border-gray-700">
        <div>
          <h3 className="text-sm font-medium text-white">Two-Step Authentication</h3>
          <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
        </div>
        <Field
          type="checkbox"
          name="twoFactorEnabled"
          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
};

export default SecuritySection;