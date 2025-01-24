import React, { useState } from 'react';
import { Star, Clock, Globe, Tag, MessageCircle, Video, Calendar } from 'lucide-react';
import { allCelebrities } from '../data/mockData';
import BookingForm from '../components/BookingForm';
import ReelsSection from '../components/ReelsSection';
import ReviewSection from '../components/ReviewSection';
import StatsCard from '../components/StatsCard';
import { useParams } from 'react-router-dom';
import ProfileActions from '../components/celebrityProfile/ProfileActionButtons';

const CelebrityProfile = () => {
  const { id } = useParams();
  const [bookingType, setBookingType] = useState<'personal' | 'business' | 'meeting'>('personal');
  const celebrity = allCelebrities.find(c => c.id === Number(id));
  const isOwnProfile = true; // In real app, check if logged-in user is the celebrity

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Profile Image */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse"></div>
              <img
                src={celebrity?.image}
                alt={celebrity?.name}
                className="w-full h-full rounded-full object-cover border-2 border-emerald-500 shadow-lg shadow-emerald-500/20"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-0.5 rounded-full text-sm font-medium">
                {celebrity?.category}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-9 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{celebrity?.name}</h1>
              {isOwnProfile && (
                <div className="flex justify-center lg:justify-start">
                  <ProfileActions />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-emerald-400 mb-4">
              <div className="flex items-center text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="ml-1 font-bold">{celebrity?.rating}</span>
                <span className="ml-1 text-gray-300">({celebrity?.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-300 text-base mb-6 max-w-2xl mx-auto lg:mx-0">{celebrity?.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 bg-gray-800/50 rounded-lg p-2 text-sm">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{celebrity?.responseTime}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 bg-gray-800/50 rounded-lg p-2 text-sm">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{celebrity?.reviews} Reviews</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {celebrity?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setBookingType('personal')}
                  className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${bookingType === 'personal'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Personal</span>
                </button>
                <button
                  onClick={() => setBookingType('business')}
                  className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${bookingType === 'business'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>Business</span>
                </button>
                <button
                  onClick={() => setBookingType('meeting')}
                  className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${bookingType === 'meeting'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Meeting</span>
                </button>
              </div>

              <BookingForm
                type={bookingType}
                celebrity={{
                  name: celebrity?.name ?? '', // Fallback to an empty string if undefined
                  prices: {
                    personal: celebrity?.price ?? 0, // Fallback to 0 if undefined
                    business: (celebrity?.price ?? 0) * 2,
                    meeting: (celebrity?.price ?? 0) * 3,
                  },
                }}
              />
            </div>

            <ReelsSection />
            <ReviewSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <StatsCard celebrity={celebrity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityProfile;