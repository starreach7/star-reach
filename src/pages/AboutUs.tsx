import { Globe, Users, Star, TrendingUp, Heart, Gift, Shield, Sparkles, Video, DollarSign, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a platform where creators and fans can connect authentically'
    },
    {
      icon: Star,
      title: 'Quality Experience',
      description: 'Every interaction is designed to create memorable moments'
    },
    {
      icon: Gift,
      title: 'Unique Moments',
      description: 'Enabling personal, one-of-a-kind experiences that last a lifetime'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Ensuring secure and reliable interactions for everyone'
    }
  ];

  const features = [
    {
      icon: Video,
      title: 'Personalized Videos',
      description: 'Custom video messages from creators to their fans'
    },
    {
      icon: Users,
      title: 'Live Meetings',
      description: '1-on-1 video calls with your favorite creators'
    },
    {
      icon: Building2,
      title: 'Business Solutions',
      description: 'Professional content for marketing and events'
    },
    {
      icon: Heart,
      title: 'Fan Engagement',
      description: 'Meaningful interactions that go beyond social media'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTIxIDEyYzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6IiBzdHJva2U9IiMwZjE2MmIiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
              Reimagining Creator-Fan Connections
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're a passionate startup on a mission to transform how creators connect with their audience through personalized video experiences
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-emerald-900/30 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="text-emerald-400 font-medium">Our Story</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">Building the Future of Creator Economy</h2>
              <p className="text-gray-300 text-lg mb-6">
                StarReach was born from a simple observation: fans want more meaningful connections with their favorite creators, and creators want better ways to engage with their true supporters.
              </p>
              <p className="text-gray-300 text-lg">
                We're building a platform that makes these authentic connections possible through personalized video messages, live interactions, and unique experiences that bring creators and fans closer together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
                alt="Creative work"
                className="rounded-xl mt-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide us as we build and grow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Innovative ways to create and share memorable moments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Be Part of Our Journey</h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you're a creator looking to connect with fans or a fan wanting to support your favorite creators, join us in building something special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/become-creator"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition duration-200"
            >
              Become a Creator
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center px-8 py-3 border border-emerald-600 text-base font-medium rounded-md text-emerald-400 hover:bg-emerald-600 hover:text-white transition duration-200"
            >
              Explore Creators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;