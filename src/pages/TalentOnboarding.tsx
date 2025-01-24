import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BasicInfoForm from '../components/onboarding/BasicInfoForm';
import VerificationForm from '../components/onboarding/VerificationForm';
import ProfileSetupForm from '../components/onboarding/ProfileSetupForm';
import PricingForm from '../components/onboarding/PricingForm';
import OnboardingProgress from '../components/onboarding/OnboardingProgress';
import { useCelebrityOnboarding } from '../hooks/useCelebrityOnboarding';
import { useNavigate } from 'react-router-dom';


const steps = [
  {
    id: 1,
    title: 'Basic Info',
    description: 'Personal details'
  },
  {
    id: 2,
    title: 'Verification',
    description: 'Identity check'
  },
  {
    id: 3,
    title: 'Profile Setup',
    description: 'Professional info'
  },
  {
    id: 4,
    title: 'Pricing',
    description: 'Set your rates'
  }
];

const basicInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  // phone: Yup.string()
  //   .required('Phone number is required'),
  location: Yup.string()
    .required('Location is required'),
  profileImage: Yup.mixed()
    .nullable()
});

const verificationSchema = Yup.object().shape({
  idType: Yup.string()
    .required('ID type is required'),
  idDocument: Yup.mixed()
    .required('ID document is required'),
  socialProof: Yup.string()
    .url('Invalid URL')
    .required('Social media verification is required')
});

const profileSetupSchema = Yup.object().shape({
  category: Yup.string()
    .required('Category is required'),
  bio: Yup.string(),
  tags: Yup.array(),
});

const pricingSchema = Yup.object().shape({
  services: Yup.array()
    .min(1, 'At least one service must be selected')
    .required('Services are required'),
  personalVideoPrice: Yup.number()
    .min(1, 'Price must be greater than 0')
    .when('services', {
      is: (services: string[]) => services.includes('personalVideoPrice'),
      then: (schema) => schema.required('Personal video price is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  businessVideoPrice: Yup.number()
    .min(1, 'Price must be greater than 0')
    .when('services', {
      is: (services: string[]) => services.includes('businessVideoPrice'),
      then: (schema) => schema.required('Business video price is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  meetingPrice: Yup.number()
    .min(1, 'Price must be greater than 0')
    .when('services', {
      is: (services: string[]) => services.includes('meetingPrice'),
      then: (schema) => schema.required('Meeting price is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  responseTime: Yup.string().required('Response time is required'),
  // availability: Yup.array().when('services', {
  //   is: (services: string[]) => services.includes('meetingPrice'),
  //   then: Yup.array().min(1, 'Add at least one availability slot')
  // })
});


const TalentOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitApplication, loading, error, success } = useCelebrityOnboarding();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      await submitApplication(values);
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const renderStep = (formik: any) => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoForm
            formik={formik}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <VerificationForm
            formik={formik}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <ProfileSetupForm
            formik={formik}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        );
      case 4:
        return (
          <PricingForm
            formik={formik}
            onBack={() => setCurrentStep(3)}
            onSubmit={formik.handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  const getValidationSchema = (step: number) => {
    switch (step) {
      case 1:
        return basicInfoSchema;
      case 2:
        return verificationSchema;
      case 3:
        return profileSetupSchema;
      case 4:
        return pricingSchema;
      default:
        return basicInfoSchema;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Join StarReach as a Creator
          </h1>
          <p className="mt-2 text-gray-400">
            Complete your profile and start connecting with fans
          </p>
        </div>

        <OnboardingProgress currentStep={currentStep} steps={steps} />

        <div className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phone: '',
              location: '',
              website: '',
              profileImage: null,
              idType: '',
              idDocument: null,
              socialProof: '',
              category: '',
              bio: '',
              tags: [],
              personalVideoPrice: '',
              businessVideoPrice: '',
              meetingPrice: '',
              responseTime: '',
              availability: [] 
            }}
            validationSchema={getValidationSchema(currentStep)}
            validateOnMount={true}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {(formik) => renderStep(formik)}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TalentOnboarding;