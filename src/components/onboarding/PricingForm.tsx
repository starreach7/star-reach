import React, { useState } from 'react';
import { DollarSign, Clock, Info } from 'lucide-react'; // Add the Info icon
import { FormikProps } from 'formik';
import DateTimeSelector from './DateTimeSelector';

interface TimeSlot {
  start: string;
  end: string;
}

interface DateAvailability {
  date: string;
  timeSlots: TimeSlot[];
}

interface PricingFormValues {
  personalVideoPrice: string;
  businessVideoPrice: string;
  meetingPrice: string;
  responseTime: string;
  services: string[];
  availability?: DateAvailability[];
}

interface PricingFormProps {
  formik: FormikProps<PricingFormValues>;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean
}

const PricingForm: React.FC<PricingFormProps> = ({ formik, onBack, onSubmit, loading }) => {

  console.log({
    values: formik.values,
    errors: formik.errors,
    isValid: formik.isValid,
    touched: formik.touched,
  });

  const [showAvailability, setShowAvailability] = useState(false);

  const services = [
    { label: 'Personal Videos', value: 'personalVideoPrice', info: 'Create personalized video messages for your fans.' },
    { label: 'Business Videos', value: 'businessVideoPrice', info: 'Deliver professional video content for businesses.' },
    { label: 'One-on-One Meetings', value: 'meetingPrice', info: 'Schedule private meetings to interact directly.' },
  ];
  const toggleService = (service: string) => {
    const currentServices = formik.values.services || [];
    if (currentServices.includes(service)) {
      formik.setFieldValue(
        'services',
        currentServices.filter((s) => s !== service)
      );
      if (service === 'meetingPrice') {
        setShowAvailability(false);
        formik.setFieldValue('availability', []);
      }
    } else {
      formik.setFieldValue('services', [...currentServices, service]);
      if (service === 'meetingPrice') {
        setShowAvailability(true);
      }
    }
  };

  const responseTimes = ['TwentyFourHours', 'FortyEightHours', 'ThreeDays', 'OneWeek'];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Define your pricing for different types of content</h3>
        <p className="text-gray-400">Set competitive prices for your services</p>
      </div>

      {/* Services Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Services You Offer <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.value}
              type="button"
              onClick={() => toggleService(service.value)}
              className={`flex items-center justify-center p-3 rounded-lg border ${
                formik.values.services?.includes(service.value)
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'border-gray-600 text-gray-400 hover:border-emerald-500'
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>
        {formik.touched.services && formik.errors.services && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.services}</div>
        )}
      </div>

      {/* Dynamic Pricing Inputs */}
      {formik.values.services?.map((service) => {
        const serviceData = services.find((s) => s.value === service);
        if (!serviceData) return null;

        return (
          <div key={service} className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {serviceData.label} Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name={service}
                value={(formik.values as any)[service] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="0.00"
              />
            </div>
            {formik.touched[service as keyof typeof formik.touched] &&
              formik.errors[service as keyof typeof formik.errors] && (
                <div className="mt-1 text-sm text-red-500">
                  {(formik.errors as any)[service]}
                </div>
              )}
          </div>
        );
      })}

      {/* Response Time */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Response Time <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="responseTime"
            value={formik.values.responseTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Select response time</option>
            {responseTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        {formik.touched.responseTime && formik.errors.responseTime && (
          <div className="mt-1 text-sm text-red-500">{formik.errors.responseTime}</div>
        )}
      </div>

      {/* Meeting Availability */}
      {showAvailability && (
        <DateTimeSelector
        setFieldValue={(field: string, value: any) => {
          formik.setFieldValue(field, value);
        }}
        />
      )}

      {/* Navigation Buttons */}
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
          onClick={onSubmit}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Submiting Application...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
};

export default PricingForm;