import { ArrowRight, Star, Users, DollarSign, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const BecomeCreator = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Set Your Own Rates",
      description: "You're in control. Choose your pricing and keep 75% of your earnings."
    },
    {
      icon: Users,
      title: "Connect With Fans",
      description: "Build meaningful connections with your audience through personalized videos."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Create content on your own time, wherever you are."
    },
    {
      icon: Shield,
      title: "Safe Platform",
      description: "Our secure platform protects both creators and fans."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTIxIDEyYzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6IiBzdHJva2U9IiMwZjE2MmIiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Share Your Talent With The World
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of creators earning by connecting with fans through personalized videos
            </p>

            <Link
              to="/talent-onboarding"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center transition duration-200"
            >
              Start Creating
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Create With Us?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our platform and start monetizing your influence while making your fans' dreams come true
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Creator Success Stories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from creators who are already making an impact on our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={`https://images.unsplash.com/photo-${index + 1}?w=150&h=150&fit=crop`}
                    alt={`Creator ${index + 1}`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-400">
                  "Joining this platform was one of the best decisions I've made. I've connected with amazing fans and created unforgettable moments."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How to Get Started</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our community in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gray-900 rounded-xl p-6 h-full">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-400">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete Application</h3>
                <p className="text-gray-400">
                  Fill out our simple application form with your details and social media presence
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 w-1/3 h-0.5 bg-emerald-600/20 transform translate-x-full"></div>
            </div>
            <div className="relative">
              <div className="bg-gray-900 rounded-xl p-6 h-full">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-400">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Profile Review</h3>
                <p className="text-gray-400">
                  Our team will review your application and verify your credentials
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 w-1/3 h-0.5 bg-emerald-600/20 transform translate-x-full"></div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 h-full">
              <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-emerald-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Creating</h3>
              <p className="text-gray-400">
                Set up your profile, pricing, and start accepting video requests
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join our growing community of creators and start earning by doing what you love
          </p>
          <Link
            to="/talent-onboarding"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center transition duration-200"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BecomeCreator;