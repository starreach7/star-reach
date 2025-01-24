import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { Clapperboard, Music, Trophy, TrendingUp, Laugh, Tv } from 'lucide-react';

interface CategoryShowcaseProps {
  categories: Category[];
}

const iconMap: { [key: string]: any } = {
  clapperboard: Clapperboard,
  music: Music,
  trophy: Trophy,
  'trending-up': TrendingUp,
  laugh: Laugh,
  tv: Tv,
};

const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover talented creators across different categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-gray-800 p-6 text-center hover:bg-gray-750 transition duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mx-auto mb-4 w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.celebrityCount} creators</p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium"
          >
            View All Categories
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;