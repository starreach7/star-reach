import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../store/categoryStore';
import { getCategoryIcon } from '../utils/categoryIcons';

const Categories = () => {
  const { categories, loading, error, fetchCategories } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mx-auto"></div>
            <div className="h-4 w-64 bg-gray-800 rounded animate-pulse mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">Failed to load categories</p>
        </div>
      </div>
    );
  }

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
            const IconComponent = getCategoryIcon(category.name);
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
                      <Link 
                        to={`${category.name}`} 
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
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