import { ArrowRight, Star, Users, DollarSign, Clock, Shield, Video, Trophy, Heart, TrendingUp, Sparkles } from 'lucide-react';
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Actress",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      quote: "Joining StarReach was a game-changer. I've connected with amazing fans and built a thriving community.",
      earnings: "$5,000+/month"
    },
    {
      name: "Michael Chen",
      role: "Musician",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      quote: "The platform is incredibly user-friendly and the support team is amazing. Best decision ever!",
      earnings: "$3,500+/month"
    },
    {
      name: "Emma Rodriguez",
      role: "Influencer",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      quote: "StarReach has helped me monetize my influence while creating genuine connections.",
      earnings: "$7,000+/month"
    }
  ];

  const stats = [
    { number: "500K+", label: "Active Fans", icon: Users },
    { number: "$2M+", label: "Creator Earnings", icon: DollarSign },
    { number: "98%", label: "Satisfaction Rate", icon: Heart },
    { number: "24h", label: "Avg. Response Time", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Video Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTIxIDEyYzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6IiBzdHJva2U9IiMwZjE2MmIiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-emerald-900/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-emerald-400 font-medium">Join 50,000+ creators earning with StarReach</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Turn Your Influence Into Income
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the leading platform for personalized video messages and live interactions. Start monetizing your influence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/talent-onboarding"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition duration-200 transform hover:scale-105"
              >
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 border border-emerald-600 text-lg font-medium rounded-lg text-emerald-400 hover:bg-emerald-600 hover:text-white transition duration-200"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-900/30 rounded-xl mb-4">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Create With Us?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our platform and start monetizing your influence while making your fans' dreams come true
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-emerald-500"
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

      {/* Testimonials */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Creator Success Stories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear from creators who are already making an impact on our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-emerald-500 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-emerald-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-emerald-400 font-semibold">{testimonial.earnings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join our growing community of creators and start earning by doing what you love
          </p>
          <Link
            to="/talent-onboarding"
            className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="mt-4 text-gray-400">
            No application fee • Get started in minutes • 24/7 support
          </p>
        </div>
      </section>
    </div>
  );
};

export default BecomeCreator;