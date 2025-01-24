import React from 'react';
import { Star } from 'lucide-react';
import { Celebrity } from '../types';
import { Link } from 'react-router-dom';

interface CelebrityCardProps {
  celebrity: Celebrity;
}

const CelebrityCard = ({ celebrity }: CelebrityCardProps) => {
  return (
    <Link to={`/celebrity/${celebrity.id}`} className="block">
      <div className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
        <img src={celebrity.image} alt={celebrity.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold">{celebrity.name}</h3>
            <span className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 fill-current mr-1" />
              {celebrity.rating}
            </span>
          </div>
          <p className="text-gray-400 mb-4">{celebrity.category}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-emerald-400">${celebrity.price}</span>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition duration-200">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CelebrityCard;