import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { allCelebrities, categories } from '../data/mockData';
import CelebrityCard from '../components/CelebrityCard';
import { useFilters } from '../hooks/useFilters';
import FilterSidebar from '../commonComponents/FilterSidebar';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const category = categories.find(c => c.id === Number(categoryId));

  const categoryCelebrities = allCelebrities.filter(celeb => celeb.category === category?.name);

  const {
    searchQuery,
    setSearchQuery,
    selectedPriceRanges,
    selectedRatings,
    handlePriceRangeChange,
    handleRatingChange,
    filterCelebrities
  } = useFilters(categoryCelebrities);

  const filteredCelebrities = filterCelebrities(categoryCelebrities);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-gray-400">{category.description}</p>
        </div>

        {/* Search and Filter Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border-none rounded-lg py-3 pl-12 pr-4 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar
              selectedPriceRanges={selectedPriceRanges}
              selectedRatings={selectedRatings}
              onPriceRangeChange={handlePriceRangeChange}
              onRatingChange={handleRatingChange}
            />
          </div>

          {/* Celebrity Grid */}
          <div className="lg:w-3/4">
            {filteredCelebrities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No celebrities found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCelebrities.map((celebrity) => (
                  <CelebrityCard key={celebrity.id} celebrity={celebrity} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;