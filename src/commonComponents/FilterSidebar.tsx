import React from 'react';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
  selectedPriceRange: { min: string; max: string };
  selectedRatings: number[];
  selectedSort: string;
  onPriceRangeChange: (range: { min: string; max: string }) => void;
  onRatingChange: (rating: number) => void;
  onSortChange: (sort: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedPriceRange,
  selectedRatings,
  selectedSort,
  onPriceRangeChange,
  onRatingChange,
  onSortChange
}) => {
  const ratings = [4, 3, 2, 1];
  const sortOptions = [
    { value: 'FEATURED', label: 'Featured' },
    { value: 'PRICE_HIGH_TO_LOW', label: 'Price: High - Low' },
    { value: 'PRICE_LOW_TO_HIGH', label: 'Price: Low - High' },
    { value: 'NEWEST', label: 'Newest' },
    { value: 'ALPHABETICAL', label: 'Alphabetical' }
  ];

  return (
    <div className="space-y-6">
      {/* Sort Options */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Sort by</h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={selectedSort === option.value}
                onChange={() => onSortChange(option.value)}
                className="rounded-full border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Min</label>
            <input
              type="number"
              value={selectedPriceRange.min}
              onChange={(e) => onPriceRangeChange({ ...selectedPriceRange, min: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Min"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Max</label>
            <input
              type="number"
              value={selectedPriceRange.max}
              onChange={(e) => onPriceRangeChange({ ...selectedPriceRange, max: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => onRatingChange(rating)}
                className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="flex items-center text-gray-300">
                {rating}+ <Star className="w-4 h-4 ml-1 text-yellow-400" />
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;