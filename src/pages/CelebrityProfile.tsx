import React, { useState, useEffect } from 'react';
import { Star, Clock, Tag, MessageCircle, Video , X} from 'lucide-react';
import BookingForm from '../components/BookingForm';
import ReelsSection from '../components/ReelsSection';
import ReviewSection from '../components/ReviewSection';
import StatsCard from '../components/StatsCard';
import { useParams } from 'react-router-dom';
import ProfileActions from '../components/celebrityProfile/ProfileActionButtons';
import { useQuery } from '@tanstack/react-query';
import CelebrityService from '../services/api/celebrity.service';
import { useAuth } from '../store/authStore';

interface TimeSlot {
  morning: string[];
  afternoon: string[];
}

interface AvailableSlots {
  [key: string]: TimeSlot;
}

const CelebrityProfile = () => {
  const { id } = useParams();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [bookingType, setBookingType] = useState<'personal' | 'business' | 'meeting'>('personal');
  const { user } = useAuth();
  const [availableSlots, setAvailableSlots] = useState<AvailableSlots>({});

  const { data: celebrityData, isLoading, error } = useQuery({
    queryKey: ['celebrity', id],
    queryFn: () => CelebrityService.getCelebrityProfile(id!),
    enabled: !!id,
  });

  const celebrity = celebrityData?.data;

  const transformMeetingSchedules = (schedules: string[]): AvailableSlots => {
    const slots: AvailableSlots = {};
    
    schedules.forEach(schedule => {
      const date = new Date(schedule);
      
      // Format the date key (YYYY-MM-DD)
      const dateKey = date.toISOString().split('T')[0];
      
      // Format time (HH:MM AM/PM)
      const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
      
      // Initialize the date entry if it doesn't exist
      if (!slots[dateKey]) {
        slots[dateKey] = {
          morning: [],
          afternoon: []
        };
      }
      
      // Determine if it's morning or afternoon
      const hour = date.getHours();
      if (hour < 12) {
        slots[dateKey].morning.push(timeString);
      } else {
        slots[dateKey].afternoon.push(timeString);
      }
      
      // Sort the times
      slots[dateKey].morning.sort();
      slots[dateKey].afternoon.sort();
    });
    
    return slots;
  };

  useEffect(() => {
    if (celebrity?.meetingSchedules) {
      const transformedSlots = transformMeetingSchedules(celebrity.meetingSchedules);
      setAvailableSlots(transformedSlots);
    }
  }, [celebrity?.meetingSchedules]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 pb-12">
        {/* Video Modal */}
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            {/* Profile Image Skeleton */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                <div className="w-full h-full rounded-full bg-gray-800 animate-pulse"></div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 animate-pulse rounded-full"></div>
              </div>
            </div>
  
            {/* Profile Info Skeleton */}
            <div className="lg:col-span-9 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="h-10 w-64 bg-gray-800 animate-pulse rounded-lg mb-4"></div>
                <div className="h-10 w-48 bg-gray-800 animate-pulse rounded-lg"></div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="h-6 w-32 bg-gray-800 animate-pulse rounded-lg"></div>
              </div>
              <div className="h-20 w-full max-w-2xl bg-gray-800 animate-pulse rounded-lg mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-w-2xl">
                <div className="h-10 bg-gray-800 animate-pulse rounded-lg"></div>
                <div className="h-10 bg-gray-800 animate-pulse rounded-lg"></div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-24 bg-gray-800 animate-pulse rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Section Skeleton */}
              <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="h-40 bg-gray-700 rounded-lg"></div>
                  <div className="h-12 bg-gray-700 rounded-lg"></div>
                </div>
              </div>
  
              {/* Videos Section Skeleton */}
              <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-8 w-48 bg-gray-700 rounded-lg mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-[9/16] bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>
  
              {/* Reviews Section Skeleton */}
              <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-8 w-48 bg-gray-700 rounded-lg mb-6"></div>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
                        <div className="ml-4 space-y-2">
                          <div className="h-4 w-32 bg-gray-600 rounded"></div>
                          <div className="h-4 w-24 bg-gray-600 rounded"></div>
                        </div>
                      </div>
                      <div className="h-16 bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                <div className="h-8 w-32 bg-gray-700 rounded-lg mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-gray-700 rounded-lg">
                      <div className="h-6 w-24 bg-gray-600 rounded mb-2"></div>
                      <div className="h-8 w-32 bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !celebrity) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">
            Failed to load celebrity profile
          </div>
        </div>
      </div>
    );
  }

  const isOwnProfile = user?.id === celebrity.userId;

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-12">
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-8 right-0 text-white hover:text-emerald-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <video 
              controls
              autoPlay
              className="w-full aspect-video rounded-lg"
              src={celebrity.promotionalVideo}
            />
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Profile Image */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 cursor-pointer" onClick={() => setShowVideoModal(true)}>
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-pulse"></div>
              <img
                src={celebrity.profileImage}
                alt={celebrity.fullName}
                className="w-full h-full rounded-full object-cover border-2 border-emerald-500 shadow-lg shadow-emerald-500/20"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3 py-0.5 rounded-full text-sm font-medium cursor-pointer hover:bg-emerald-600 transition-colors">
                {celebrity.categoryName}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-9 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{celebrity.fullName}</h1>
              {isOwnProfile && (
                <div className="flex justify-center lg:justify-start">
                  <ProfileActions />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-3 text-emerald-400 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(celebrity.averageRating) ? 'fill-current' : 'fill-transparent stroke-yellow-400'}`}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="ml-1 font-bold text-yellow-400">{celebrity.averageRating}</span>
                <span className="ml-1 text-gray-300">({celebrity.reviews?.length || 0} reviews)</span>
              </div>
            </div>

            <p className="text-gray-300 text-base mb-6 max-w-2xl mx-auto lg:mx-0">{celebrity.bio}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 bg-gray-800/50 rounded-lg p-2 text-sm">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{celebrity.responseTime}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300 bg-gray-800/50 rounded-lg p-2 text-sm">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{celebrity.reviews?.length || 0} Reviews</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {celebrity.tags?.map((tag: string, index: number) => (
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
                  className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    bookingType === 'personal'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Personal</span>
                </button>
                <button
                  onClick={() => setBookingType('business')}
                  className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    bookingType === 'business'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Tag className="w-4 h-4" />
                  <span>Business</span>
                </button>
                <button
                  onClick={() => setBookingType('meeting')}
                  className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    bookingType === 'meeting'
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
                  name: celebrity.fullName,
                  prices: {
                    personal: Number(celebrity.personalVideoPrice) || 0,
                    business: Number(celebrity.businessVideoPrice) || 0,
                    meeting: Number(celebrity.meetingPrice) || 0,
                  },
                }}
                availableSlots={availableSlots}
              />
            </div>

            <ReelsSection videos={celebrity.recentVideos} />
            <ReviewSection reviews={celebrity.reviews} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <StatsCard
              stats={{
                completed: celebrity.reviews?.length.toString() || '0',
                avgResponse: celebrity.responseTime,
                joinedDate: new Date(celebrity.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityProfile;