import { Star } from 'lucide-react';
import { ApiCelebrity } from '../types';
import { Link } from 'react-router-dom';

interface CelebrityCardProps {
  celebrity: ApiCelebrity;
}

const CelebrityCard = ({ celebrity }: CelebrityCardProps) => {
  return (
    <Link to={`/celebrity/${celebrity.celebrityId}`} className="block bg-gray-800 rounded-xl overflow-hidden">
      <div className="relative overflow-hidden group">
        <img 
          src={celebrity.profileImage} 
          alt={celebrity.fullName} 
          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
          <div className="absolute inset-0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-white">{celebrity.fullName}</h3>
          <span className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 fill-current mr-1" />
            {celebrity.averageRating}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{celebrity.categoryName}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-emerald-400">${celebrity.price}</span>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition duration-200">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CelebrityCard;