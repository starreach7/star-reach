import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    user: 'John D.',
    rating: 5,
    date: '2 days ago',
    comment: 'Amazing experience! Emma was so genuine and delivered exactly what I wanted. The video made my sister\'s birthday truly special.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  },
  {
    user: 'Sarah M.',
    rating: 5,
    date: '1 week ago',
    comment: 'Exceeded all expectations! The turnaround time was incredibly fast, and the video quality was outstanding.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
  }
];

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