import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Clock, Info, Video, MessageCircle, Building2 } from 'lucide-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DateTimeSelector from '../components/onboarding/DateTimeSelector';

const validationSchema = Yup.object().shape({
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
});

const EditPricing = () => {
  const [showAvailability, setShowAvailability] = useState(false);

  const initialValues = {
    services: ['personalVideoPrice'],
    personalVideoPrice: 50,
    businessVideoPrice: '',
    meetingPrice: '',
    responseTime: '24 hours',
    availability: []
  };

  const responseTimes = ['1 hour', '2 hours', '6 hours', '12 hours', '24 hours', '48 hours'];

  const services = [
    {
      id: 'personalVideoPrice',
      title: 'Personal Videos',
      icon: MessageCircle,
      description: 'Create personalized video messages for fans',
      basePrice: '$50'
    },
    {
      id: 'businessVideoPrice',
      title: 'Business Videos',
      icon: Building2,
      description: 'Professional videos for business use',
      basePrice: '$150'
    },
    {
      id: 'meetingPrice',
      title: 'One-on-One Meetings',
      icon: Video,
      description: '15-minute private video calls',
      basePrice: '$200'
    }
  ];

  const handleSubmit = (values: any) => {
    console.log('Pricing updated:', values);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-900/95 border-b border-gray-800 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/profile/edit"
              className="flex items-center text-gray-400 hover:text-white group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
            <h1 className="text-lg font-semibold text-white">Pricing Settings</h1>
            <div className="w-12"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-6 sm:p-8 border border-gray-700">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue, handleChange }) => (
                <Form className="space-y-8">
                  {/* Services Selection */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Your Services</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                      {services.map((service) => {
                        const isSelected = values.services.includes(service.id);
                        return (
                          <div
                            key={service.id}
                            onClick={() => {
                              const newServices = isSelected
                                ? values.services.filter(s => s !== service.id)
                                : [...values.services, service.id];
                              setFieldValue('services', newServices);
                              if (service.id === 'meetingPrice') {
                                setShowAvailability(!isSelected);
                              }
                            }}
                            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-900/20'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            <div className="flex flex-col h-full">
                              <div className="flex items-center mb-4">
                                <div className={`p-2 rounded-lg ${
                                  isSelected ? 'bg-emerald-900/30' : 'bg-gray-700/30'
                                }`}>
                                  <service.icon className={`w-5 h-5 ${
                                    isSelected ? 'text-emerald-400' : 'text-gray-400'
                                  }`} />
                                </div>
                              </div>
                              <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                              <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                              <div className="mt-auto">
                                <p className="text-sm text-gray-500">Starting from</p>
                                <p className="text-lg font-semibold text-emerald-400">{service.basePrice}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.services && touched.services && (
                      <p className="mt-2 text-sm text-red-500">{errors.services}</p>
                    )}
                  </div>

                  {/* Price Inputs */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Set Your Prices</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {values.services.map((serviceId) => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service) return null;

                        return (
                          <div key={serviceId} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                              {service.title} Price
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="number"
                                name={serviceId}
                                value={values[serviceId as keyof typeof values] || ''}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                placeholder="0.00"
                              />
                            </div>
                            {touched[serviceId as keyof typeof touched] && errors[serviceId as keyof typeof errors] && (
                              <p className="text-sm text-red-500">{errors[serviceId as keyof typeof errors]}</p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Response Time */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Response Time</h2>
                    <div className="max-w-md">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          name="responseTime"
                          value={values.responseTime}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        >
                          {responseTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                      {touched.responseTime && errors.responseTime && (
                        <p className="mt-2 text-sm text-red-500">{errors.responseTime}</p>
                      )}
                    </div>
                  </div>

                  {/* Meeting Availability */}
                  {showAvailability && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Meeting Availability</h2>
                      <DateTimeSelector
                        setFieldValue={(field: string, value: any) => {
                          setFieldValue(field, value);
                        }}
                      />
                    </div>
                  )}

                  {/* Info Box */}
                  <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <Info className="w-5 h-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-emerald-400 mb-1">Pricing Tips</h3>
                        <p className="text-sm text-gray-300">
                          Set competitive prices based on your experience and market demand. Consider offering package deals for multiple bookings.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Save Changes
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

export default EditPricing;