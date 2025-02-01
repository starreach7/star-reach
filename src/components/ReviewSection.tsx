import React from 'react';
import { Star,MessageCircle  } from 'lucide-react';

interface Review {
  id: string;
  username: string;
  profileImage: string;
  rating: number;
  review: string;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Reviews</h2>
        <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-600">
          <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No Reviews Yet</h3>
          <p className="text-gray-400">Be the first to leave a review for this celebrity!</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recent Reviews</h2>
        <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
          View all
        </button>
      </div>
      
      <div className="grid gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={review.profileImage}
                  alt={review.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div className="ml-3">
                  <h3 className="text-white font-medium">{review.username}</h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;