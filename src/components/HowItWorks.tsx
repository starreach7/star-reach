import React from 'react';
import { Search, Video, Clock, Heart } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Find Your Star",
    description: "Browse through our diverse collection of celebrities and choose your favorite"
  },
  {
    icon: Video,
    title: "Request a Video",
    description: "Tell them what you want them to say and who it's for"
  },
  {
    icon: Clock,
    title: "Quick Delivery",
    description: "Get your personalized video message within 24 hours"
  },
  {
    icon: Heart,
    title: "Share the Love",
    description: "Download and share your special moment with friends and family"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Zuromi Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting a personalized celebrity video is easy. Follow these simple steps to make someone's day special.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center p-6">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 right-0 w-full h-0.5 bg-emerald-600/20" style={{ transform: 'translateX(50%)' }} />
              )}
              <div className="relative">
                <div className="w-16 h-16 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;