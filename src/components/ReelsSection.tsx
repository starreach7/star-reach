import React from 'react';
import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';

const ReelsSection = () => {
  const reels = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      title: 'Birthday Wish for Sarah',
      views: '12.5K',
      likes: '2.3K',
      comments: 156,
      duration: '0:45',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      title: 'Corporate Message',
      views: '8.2K',
      likes: '1.8K',
      comments: 98,
      duration: '1:20',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      title: 'Wedding Anniversary',
      views: '15.1K',
      likes: '3.2K',
      comments: 234,
      duration: '0:55',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      title: 'Birthday Celebration',
      views: '9.8K',
      likes: '2.1K',
      comments: 167,
      duration: '1:10',
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Recent Videos</h2>
        <button className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm">
          View all
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reels.map((reel) => (
          <div 
            key={reel.id} 
            className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 group hover:border-emerald-500 transition-all"
          >
            <div className="relative aspect-[9/16]">
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent">
                <div className="absolute top-2 right-2 bg-gray-900/80 text-white px-1.5 py-0.5 rounded text-xs">
                  {reel.duration}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                  <button className="bg-emerald-500/90 hover:bg-emerald-500 text-white p-2.5 rounded-full transform group-hover:scale-110 transition-all duration-300 mx-auto flex items-center justify-center">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                  <h3 className="text-white text-sm font-medium text-center line-clamp-1">{reel.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{reel.views}</span>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                        <Heart className="h-3 w-3" />
                        <span>{reel.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                        <MessageCircle className="h-3 w-3" />
                        <span>{reel.comments}</span>
                      </button>
                      <button className="hover:text-emerald-400 transition-colors">
                        <Share2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsSection;