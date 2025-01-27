import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import CelebrityCard from '../components/CelebrityCard';
import { useFilters } from '../hooks/useFilters';
import FilterSidebar from '../commonComponents/FilterSidebar';
import { useQuery } from '@tanstack/react-query';
import CelebrityService from '../services/api/celebrity.service';
import ReactPaginate from 'react-paginate';
import { ApiCelebrity } from '../types';

const Explore = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['celebrities', currentPage + 1],
    queryFn: () => CelebrityService.getAllCelebrities(currentPage + 1),
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const filterCelebrities = (celebrities: ApiCelebrity[]) => {
    return celebrities.filter(celebrity => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        celebrity.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebrity.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPriceRange = selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some(range => {
          const [min, max] = range.split('-').map(n => n === 'plus' ? Infinity : Number(n));
          const price = parseFloat(celebrity.price);
          return price >= min && price <= max;
        });

      // Rating filter
      const matchesRating = selectedRatings.length === 0 ||
        selectedRatings.some(rating => celebrity.averageRating >= rating);

      return matchesSearch && matchesPriceRange && matchesRating;
    });
  };

  const filteredCelebrities = data?.data ? filterCelebrities(data.data) : [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load celebrities</p>
          <p className="text-gray-400 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="w-full md:w-2/3 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search celebrities..."
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
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-800 rounded-xl h-96"></div>
                  </div>
                ))}
              </div>
            ) : filteredCelebrities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No celebrities found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCelebrities.map((celebrity) => (
                    <CelebrityCard
                      key={celebrity.celebrityId}
                      celebrity={{
                        id: parseInt(celebrity.celebrityId),
                        name: celebrity.fullName,
                        image: celebrity.profileImage,
                        category: celebrity.categoryName,
                        price: parseFloat(celebrity.price),
                        rating: celebrity.averageRating,
                        reviews: 0,
                        bookings: 0,
                        stats: {
                          completed: '0',
                          avgResponse: 'N/A',
                          joinedDate: 'Recently'
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8">
                  <ReactPaginate
                  forcePage={currentPage}
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={2} // You might want to get this from the API response
                    onPageChange={handlePageChange}
                    containerClassName="flex justify-center items-center space-x-2"
                    previousClassName="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    nextClassName="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    pageClassName="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    breakClassName="px-4 py-2"
                    activeClassName="!bg-emerald-600 hover:!bg-emerald-700"
                    disabledClassName="opacity-50 cursor-not-allowed hover:bg-gray-800"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;