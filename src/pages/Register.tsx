import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Calendar } from 'lucide-react';
import { useAuth } from '../store/authStore';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { RegisterData } from '../types/auth';

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
  gender: Yup.string()
    .required('Gender is required'),
});

const Register = () => {
  const { register, error, loading, clearError } = useAuth();
  const navigate = useNavigate();

  const initialValues: RegisterData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    gender: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      clearError();
      const registerData  = values;
      await register(registerData);
      navigate('/');
    } catch (err) {
      // Error is handled by the auth store
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-400">
            Join our community and connect with your favorite creators
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
          <SocialLoginButtons mode="register" />

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ errors: formErrors, touched }) => (
              <Form className="mt-6 space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter first name"
                      />
                    </div>
                    {formErrors.firstName && touched.firstName && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.firstName}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter last name"
                      />
                    </div>
                    {formErrors.lastName && touched.lastName && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    {formErrors.email && touched.email && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.email}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Choose a username"
                      />
                    </div>
                    {formErrors.username && touched.username && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.username}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Create a password"
                      />
                    </div>
                    {formErrors.password && touched.password && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.password}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Confirm your password"
                      />
                    </div>
                    {formErrors.confirmPassword && touched.confirmPassword && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700/50 text-gray-100 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    {formErrors.dateOfBirth && touched.dateOfBirth && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.dateOfBirth}</div>
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
                    {formErrors.gender && touched.gender && (
                      <div className="mt-1 text-sm text-red-500">{formErrors.gender}</div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <div className="text-center">
                  <span className="text-gray-400">Already have an account?</span>
                  {' '}
                  <Link
                    to="/login"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;