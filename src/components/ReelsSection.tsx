// src/components/ReelsSection.tsx

import React from 'react';
import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';

interface ReelsSectionProps {
  videos?: string[];
}

const ReelsSection: React.FC<ReelsSectionProps> = ({ videos = [] }) => {

  console.log(videos);

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
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                poster={`https://image.mux.com/${videoUrl}/thumbnail.jpg`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                  <button 
                    onClick={() => {
                      // Handle play video
                      const video = document.createElement('video');
                      video.src = videoUrl;
                      video.controls = true;
                      video.className = 'fixed inset-0 w-full h-full object-contain z-50 bg-black';
                      video.onclick = () => video.remove();
                      document.body.appendChild(video);
                      video.play();
                    }}
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
    </div>
  );
};

export default ReelsSection;
