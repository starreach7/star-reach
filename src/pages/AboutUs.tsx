import { Globe, Users, Star, TrendingUp, Heart, Gift } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '500K+', label: 'Happy Customers', icon: Users },
    { number: '50K+', label: 'Talented Creators', icon: Star },
    { number: '180+', label: 'Countries Reached', icon: Globe },
    { number: '1M+', label: 'Moments Created', icon: Heart }
  ];

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We build meaningful connections between creators and their biggest fans'
    },
    {
      icon: Star,
      title: 'Quality Experience',
      description: 'Every interaction on our platform is designed to be memorable and special'
    },
    {
      icon: Gift,
      title: 'Unique Moments',
      description: 'We enable personal, one-of-a-kind experiences that last a lifetime'
    },
    {
      icon: TrendingUp,
      title: 'Creator Success',
      description: 'We empower creators to build sustainable careers doing what they love'
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
              Connecting Fans with Their Favorite Stars
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              We're building the most personal creator economy platform, where authentic connections happen every day
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-900/30 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg mb-6">
                We believe in creating authentic connections between creators and their biggest fans. Our platform enables meaningful interactions that turn into lifelong memories.
              </p>
              <p className="text-gray-300 text-lg">
                By empowering creators to monetize their talent and connect with their audience in a personal way, we're building the future of the creator economy.
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
                alt="Happy customer"
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
              The principles that guide everything we do
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

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate individuals working together to create magical moments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="text-center">
                <img
                  src={`https://images.unsplash.com/photo-${index + 1}?w=300&h=300&fit=crop`}
                  alt={`Team member ${index + 1}`}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-emerald-400 mb-2">Product Lead</p>
                <p className="text-gray-400 text-sm">
                  Passionate about creating meaningful connections
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">In the Press</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What others are saying about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="text-emerald-400 text-lg font-semibold mb-4">TechCrunch</div>
              <p className="text-gray-300 mb-4">
                "Revolutionizing how fans connect with their favorite creators"
              </p>
              <p className="text-gray-400">January 2024</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="text-emerald-400 text-lg font-semibold mb-4">Forbes</div>
              <p className="text-gray-300 mb-4">
                "The future of personalized celebrity interactions"
              </p>
              <p className="text-gray-400">December 2023</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="text-emerald-400 text-lg font-semibold mb-4">The Verge</div>
              <p className="text-gray-300 mb-4">
                "Setting new standards in the creator economy"
              </p>
              <p className="text-gray-400">November 2023</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;