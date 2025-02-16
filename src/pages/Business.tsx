import React from 'react';
import { Building2, Video, Users, TrendingUp, DollarSign, Star, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Business = () => {
  const benefits = [
    {
      icon: Video,
      title: "Professional Video Content",
      description: "Get custom video content from creators for your marketing campaigns, events, and more"
    },
    {
      icon: Users,
      title: "Influencer Partnerships",
      description: "Connect with creators who align with your brand values and message"
    },
    {
      icon: TrendingUp,
      title: "Brand Awareness",
      description: "Increase your brand visibility through authentic creator collaborations"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Professional contracts and secure payment processing for business transactions"
    }
  ];

  const useCases = [
    {
      title: "Product Launches",
      description: "Get creators to announce and promote your new products",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&fit=crop"
    },
    {
      title: "Corporate Events",
      description: "Book creators for virtual appearances at your company events",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&fit=crop"
    },
    {
      title: "Social Media Marketing",
      description: "Create engaging content for your social media campaigns",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTIxIDEyYzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6IiBzdHJva2U9IiMwZjE2MmIiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-900/30 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-emerald-400 font-medium">StarReach for Business</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Elevate Your Brand with Creator Content
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with our growing network of creators to produce authentic content that resonates with your audience
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition duration-200 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose StarReach</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to create impactful creator-driven content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500 transition-all duration-300"
              >
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

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Businesses Use StarReach</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover the various ways businesses are leveraging creator content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500 transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-400">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800 to-emerald-900/20 rounded-2xl p-8 md:p-12 border border-gray-700">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                We're working on exciting new features for businesses, including analytics dashboard, campaign management tools, and more. Join our waitlist to be the first to know when these features launch.
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your business email"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;