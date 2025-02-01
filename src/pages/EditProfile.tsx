import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useCategories } from '../store/categoryStore';
import { useEffect, useState } from 'react';
import { useAuth } from '../store/authStore';
import CelebrityService from '../services/api/celebrity.service';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const validationSchema = Yup.object().shape({
  promotionalVideo: Yup.mixed(),
  categoryId: Yup.string().required('Category is required'),
  bio: Yup.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(300, 'Bio cannot exceed 300 characters')
    .required('Bio is required'),
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Add at least one tag')
    .max(5, 'Cannot add more than 5 tags'),
  responseTime: Yup.string().required('Response time is required'),
});

const EditProfile = () => {
  const { categories, loading: categoriesLoading, error: categoriesError, fetchCategories } = useCategories();
  const { user } = useAuth();

  console.log(user, "userss");
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const initialValues = {
    promotionalVideo: user?.celebrity?.promotionalVideo || '',
    categoryId: user?.celebrity?.categoryId || '',
    bio: user?.celebrity?.bio || '',
    tags: user?.celebrity?.tags || [],
    responseTime: user?.celebrity?.responseTime || '',
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsUploading(true);
      await CelebrityService.updateProfile({
        ...values,
        promotionalVideo: values.promotionalVideo, // File object or existing URL
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      showSuccessToast('Profile updated successfully');
    } catch (error) {
      showErrorToast((error as Error).message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  

  const responseTimes = ['TwentyFourHours', 'FortyEightHours', 'ThreeDays', 'OneWeek'];

if (categoriesLoading || !user?.celebrity) {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      {/* Mobile-friendly header skeleton */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
            <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
            <div className="w-12" />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700 space-y-8">
            {/* Promotional Video Skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
              <div className="h-48 bg-gray-700 rounded-lg animate-pulse" />
            </div>

            {/* Category Skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
            </div>

            {/* Bio Skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
              <div className="h-32 bg-gray-700 rounded-lg animate-pulse" />
            </div>

            {/* Tags Skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-gray-700 rounded-full animate-pulse" />
                ))}
              </div>
              <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
            </div>

            {/* Response Time Skeleton */}
            <div className="space-y-4">
              <div className="h-5 w-40 bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
            </div>

            {/* Submit Button Skeleton */}
            <div className="pt-6">
              <div className="h-12 w-full sm:w-48 bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

if (categoriesError) {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-red-500">Failed to load categories</p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile-friendly header */}
      
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/profile"
              className="flex items-center text-gray-400 hover:text-white group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
            <h1 className="text-lg font-semibold text-white">Profile Settings</h1>
            <div className="w-12"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, errors, touched, setFieldValue, handleChange }) => (
                <Form className="space-y-6">
                  {/* Promotional Video Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Promotional Video
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-primary-500 transition-colors">
                      <div className="space-y-1 text-center">
                        {values.promotionalVideo ? (
                          <div className="relative">
                            <video
                              src={typeof values.promotionalVideo === 'string' ? values.promotionalVideo : URL.createObjectURL(values.promotionalVideo)}
                              className="max-w-full h-48 rounded"
                              controls
                            />
                            <button
                              type="button"
                              onClick={() => setFieldValue('promotionalVideo', '')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-400">
                              <label className="relative cursor-pointer rounded-md font-medium text-primary-500 hover:text-primary-400">
                                <span>Upload a video</span>
                                <input
                                  type="file"
                                  name="promotionalVideo"
                                  accept="video/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setFieldValue('promotionalVideo', file);
                                  }}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">MP4, MOV up to 50MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    {isUploading && (
                      <div className="mt-2">
                        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Uploading: {uploadProgress}%</p>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      name="categoryId"
                      value={values.categoryId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {touched.categoryId && errors.categoryId && (
                      <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                      placeholder="Tell us about yourself..."
                    />
                    <p className="mt-1 text-sm text-gray-400">
                      {values.bio.length}/300 characters
                    </p>
                    {touched.bio && errors.bio && (
                      <p className="mt-1 text-sm text-red-500">{errors.bio}</p>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {values.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-500/20 text-primary-400 border border-primary-500/30"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => {
                              const newTags = values.tags.filter((_, i) => i !== index);
                              setFieldValue('tags', newTags);
                            }}
                            className="ml-2 hover:text-primary-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a tag and press Enter"
                      className="mt-2 w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          const newTag = input.value.trim();
                          if (newTag && values.tags.length < 5) {
                            setFieldValue('tags', [...values.tags, newTag]);
                            input.value = '';
                          }
                        }
                      }}
                    />
                    {touched.tags && errors.tags && (
                      <p className="mt-1 text-sm text-red-500">{errors.tags}</p>
                    )}
                  </div>

                  {/* Response Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Response Time
                    </label>
                    <select
                      name="responseTime"
                      value={values.responseTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Select response time</option>
                      {responseTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {touched.responseTime && errors.responseTime && (
                      <p className="mt-1 text-sm text-red-500">{errors.responseTime}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-700">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;