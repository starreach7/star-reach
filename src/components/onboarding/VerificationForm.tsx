import React from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { FormikProps } from 'formik';

interface VerificationFormProps {
  formik: FormikProps<{
    idType: string;
    idDocument: File | null;
    socialProof: string;
    largestFollowingPlatform: string;
    largestFollowingHandle: string;
    largestFollowingCount: string;
  }>;
  onBack: () => void;
  onNext: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ formik, onBack, onNext }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue('idDocument', e.target.files[0]);
    }
  };

  const isFormValid = () => {
    const {
      idType,
      idDocument,
      socialProof,
      largestFollowingPlatform,
      largestFollowingHandle,
      largestFollowingCount,
    } = formik.values;

    return (
      formik.isValid &&
      (formik.touched.idType || !!idType) &&
      (formik.touched.idDocument || !!idDocument) &&
      (formik.touched.socialProof || !!socialProof) &&
      (formik.touched.largestFollowingPlatform || !!largestFollowingPlatform) &&
      (formik.touched.largestFollowingHandle || !!largestFollowingHandle) &&
      (formik.touched.largestFollowingCount || !!largestFollowingCount)
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            To ensure the authenticity of our platform, we require basic verification. 
            Your information is securely stored and never shared without your consent.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ID Type <span className="text-red-500">*</span>
          </label>
          <select
            name="idType"
            value={formik.values.idType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select ID type</option>
            <option value="passport">Passport</option>
            <option value="driving_license">Driving License</option>
            <option value="national_id">National ID</option>
          </select>
          {formik.touched.idType && formik.errors.idType && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.idType}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload ID Document <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-emerald-500/50 transition-colors">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-emerald-400 hover:text-emerald-300 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                    name="idDocument"
                    accept="image/*,.pdf"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, PDF up to 10MB
              </p>
            </div>
          </div>
          {formik.values.idDocument && (
            <p className="mt-2 text-sm text-emerald-400">
              ✓ File uploaded: {formik.values.idDocument.name}
            </p>
          )}
          {formik.touched.idDocument && formik.errors.idDocument && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.idDocument}</div>
          )}
        </div>

        {/* Largest Following Platform */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Where is your largest following? <span className="text-red-500">*</span>
          </label>
          <select
            name="largestFollowingPlatform"
            value={formik.values.largestFollowingPlatform}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select platform</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
          </select>
          {formik.touched.largestFollowingPlatform && formik.errors.largestFollowingPlatform && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.largestFollowingPlatform}</div>
          )}
        </div>

        {/* Username Field */}
        {formik.values.largestFollowingPlatform && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {formik.values.largestFollowingPlatform.charAt(0).toUpperCase() +
                formik.values.largestFollowingPlatform.slice(1)}{' '}
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="largestFollowingHandle"
              value={formik.values.largestFollowingHandle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder={`@handle`}
            />
            {formik.touched.largestFollowingHandle && formik.errors.largestFollowingHandle && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.largestFollowingHandle}</div>
            )}
          </div>
        )}

        {/* Largest Following Count */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What is your largest following? <span className="text-red-500">*</span>
          </label>
          <select
            name="largestFollowingCount"
            value={formik.values.largestFollowingCount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select range</option>
            <option value="less_than_10k">&lt;10k</option>
            <option value="from_10k_to_30k">10k - 30k</option>
            <option value="from_30k_to_100k">30k - 100k</option>
            <option value="from_100k_to_300k">100k - 300k</option>
            <option value="from_300k_to_1M">300k - 1M</option>
            <option value="from_1M_to_3M">1M - 3M</option>
          </select>
          {formik.touched.largestFollowingCount && formik.errors.largestFollowingCount && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.largestFollowingCount}</div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Social Media Verification <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="url"
              name="socialProof"
              value={formik.values.socialProof}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="Link to your verified social media profile"
            />
          </div>
          {formik.touched.socialProof && formik.errors.socialProof && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.socialProof}</div>
          )}
          <p className="mt-2 text-sm text-gray-400">
            Please provide a link to your verified social media profile (Twitter, Instagram, etc.)
          </p>
        </div>
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

export default VerificationForm;