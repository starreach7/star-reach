import React from 'react';
import { User, Mail,  MapPin, Globe, Camera } from 'lucide-react';
import { Form, Field, FormikProps } from 'formik';

interface BasicInfoFormProps {
  formik: FormikProps<{
    fullName: string;
    email: string;
    // phone: string;
    location: string;
    profileImage: File | null;
  }>;
  onNext: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formik, onNext }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue('profileImage', e.target.files[0]);
    }
  };

  const isFormValid = () => {
    return formik.isValid && Object.keys(formik.touched).length > 0;
  };

  return (
    <Form className="space-y-6" onSubmit={formik.handleSubmit}>
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            {formik.values.profileImage ? (
              <img 
                src={URL.createObjectURL(formik.values.profileImage)} 
                alt="Profile preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
            <span className="text-white text-sm">Change Photo</span>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Field
              type="text"
              name="fullName"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="Your full name"
              disabled
            />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.fullName}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Field
              type="email"
              name="email"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="your@email.com"
              disabled
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
          )}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <Field
              type="tel"
              name="phone"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.phone}</div>
          )}
        </div> */}

        

        
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <Field
              type="text"
              name="location"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="City, Country"
            />
          </div>
          {formik.touched.location && formik.errors.location && (
            <div className="mt-1 text-sm text-red-500">{formik.errors.location}</div>
          )}
        </div>
      <div className="flex justify-end">
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
    </Form>
  );
};

export default BasicInfoForm;