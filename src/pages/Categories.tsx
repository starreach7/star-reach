import React from 'react';
import { categories } from '../data/mockData';
import { Clapperboard, Music, Trophy, TrendingUp, Laugh, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: { [key: string]: any } = {
  clapperboard: Clapperboard,
  music: Music,
  trophy: Trophy,
  'trending-up': TrendingUp,
  laugh: Laugh,
  tv: Tv,
};

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Browse Categories</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover talented celebrities across different categories and book personalized videos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <div
                key={category.id}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-900/30 rounded-xl">
                    <IconComponent className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-gray-400 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.celebrityCount} celebrities
                      </span>
                      <Link to={`${category.id}`} className="text-emerald-400 hover:text-emerald-300 font-medium" >
                        Browse All →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;