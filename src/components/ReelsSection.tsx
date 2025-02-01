// ReelsSection.tsx
import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share2, Video, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ReelsSectionProps {
  videos?: string[];
}

const ReelsSection: React.FC<ReelsSectionProps> = ({ videos = [] }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const getThumbnailUrl = (videoUrl: string) => {
    try {
      const url = new URL(videoUrl);
      const playbackId = url.pathname.split('/').pop()?.split('.')[0];
      return `https://image.mux.com/${playbackId}/thumbnail.jpg`;
    } catch {
      return 'https://via.placeholder.com/300x500.png?text=No+Thumbnail';
    }
  };

  if (videos.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Videos</h2>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-600">
          <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No Videos Yet</h3>
          <p className="text-gray-400">This celebrity hasn't posted any videos recently. Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Recent Videos</h2>
        <button className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm">
          View all
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((videoUrl, index) => (
          <div 
            key={index} 
            className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 group hover:border-emerald-500 transition-all"
          >
            <div className="relative aspect-[9/16]">
              <img
                src={getThumbnailUrl(videoUrl)}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                  <button 
                    onClick={() => setSelectedVideoIndex(index)}
                    className="bg-emerald-500/90 hover:bg-emerald-500 text-white p-2.5 rounded-full transform group-hover:scale-110 transition-all duration-300 mx-auto flex items-center justify-center"
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>Video {index + 1}</span>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                        <Heart className="h-3 w-3" />
                      </button>
                      <button className="flex items-center space-x-1 hover:text-emerald-400 transition-colors">
                        <MessageCircle className="h-3 w-3" />
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

      {selectedVideoIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelectedVideoIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-emerald-400 transition-colors z-50"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full max-w-4xl h-full max-h-[90vh]">
            <video
              src={videos[selectedVideoIndex]}
              className="w-full h-full object-contain"
              controls
              autoPlay
            />
            
            {selectedVideoIndex > 0 && (
              <button
                onClick={() => setSelectedVideoIndex(prev => prev! - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/50 p-3 rounded-full text-white hover:text-emerald-400 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {selectedVideoIndex < videos.length - 1 && (
              <button
                onClick={() => setSelectedVideoIndex(prev => prev! + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/50 p-3 rounded-full text-white hover:text-emerald-400 transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelsSection;