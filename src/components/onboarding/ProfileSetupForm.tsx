import React, { useEffect } from 'react';
import { Tag } from 'lucide-react';
import { FormikProps } from 'formik';
import { useCategories } from '../../store/categoryStore';

interface ProfileSetupFormProps {
  formik: FormikProps<{
    category: string;
    bio: string;
    tags: string[];
  }>;
  onBack: () => void;
  onNext: () => void;
}

const ProfileSetupForm: React.FC<ProfileSetupFormProps> = ({ formik, onBack, onNext }) => {
  
  const { categories, fetchCategories} = useCategories();

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !formik.values.tags.includes(newTag)) {
        formik.setFieldValue('tags', [...formik.values.tags, newTag]);
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    formik.setFieldValue(
      'tags',
      formik.values.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const isFormValid = () => {
    return !!formik.values.category && formik.isValid;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        >
          <option value="">Select your category</option>
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.category}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          placeholder="Tell us about yourself..."
        />
        <p className="mt-2 text-sm text-gray-400">
          {formik.values.bio.length}/500 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tags
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Tag className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            onKeyDown={handleTagInput}
            onBlur={formik.handleBlur}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Add tags and press Enter"
          />
        </div>
        {formik.values.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formik.values.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-900/30 text-emerald-400 border border-emerald-500/30"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 focus:outline-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-300 hover:text-white px-8 py-3 rounded-lg transition duration-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
           disabled={!isFormValid()}
          className={`bg-emerald-600 text-white px-8 py-3 rounded-lg transition duration-200 ${
            !isFormValid()
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-emerald-700'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ProfileSetupForm;
