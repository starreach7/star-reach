import React from 'react';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
  selectedPriceRanges: string[];
  selectedRatings: number[];
  onPriceRangeChange: (range: string) => void;
  onRatingChange: (rating: number) => void;
}

const FilterSidebar = ({
  selectedPriceRanges,
  selectedRatings,
  onPriceRangeChange,
  onRatingChange
}: FilterSidebarProps) => {
  const priceRanges = [
    { label: 'Under $100', value: '0-100' },
    { label: '$100-$300', value: '100-300' },
    { label: '$300-$500', value: '300-500' },
    { label: '$500+', value: '500-plus' }
  ];

  const ratings = [4, 3, 2, 1];

  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.value)}
                onChange={() => onPriceRangeChange(range.value)}
                className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-gray-300">{range.label}</span>
            </label>
          ))}
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