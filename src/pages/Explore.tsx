import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import CelebrityCard from '../components/CelebrityCard';
import FilterSidebar from '../commonComponents/FilterSidebar';
import { useQuery } from '@tanstack/react-query';
import CelebrityService from '../services/api/celebrity.service';
import ReactPaginate from 'react-paginate';
import { ApiCelebrity } from '../types';

const Explore = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: '', max: '' });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['celebrities', currentPage + 1, searchQuery, selectedPriceRange, selectedRatings, selectedSort],
    queryFn: () => CelebrityService.getAllCelebrities({
      page: currentPage + 1,
      search: searchQuery || undefined,
      minPrice: selectedPriceRange.min || undefined,
      maxPrice: selectedPriceRange.max || undefined,
      ratings: selectedRatings.length > 0 ? selectedRatings : undefined,
      sortBy: selectedSort || undefined
    }),
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handlePriceRangeChange = (range: { min: string; max: string }) => {
    setSelectedPriceRange(range);
    setCurrentPage(0);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
    setCurrentPage(0);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort === selectedSort ? '' : sort);
    setCurrentPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

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
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Explore Creators</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search celebrities..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-gray-800 border-none rounded-lg py-3 pl-12 pr-4 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Modal */}
          <div className="lg:hidden">
            {showFilters && (
              <div className="fixed inset-0 z-50">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
                <div className="absolute right-0 top-0 h-full w-[300px] bg-gray-900 p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-white">Filters</h2>
                    <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <FilterSidebar
                    selectedPriceRange={selectedPriceRange}
                    selectedRatings={selectedRatings}
                    selectedSort={selectedSort}
                    onPriceRangeChange={handlePriceRangeChange}
                    onRatingChange={handleRatingChange}
                    onSortChange={handleSortChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Filters Sidebar */}
          {showFilters && (
            <div className="hidden lg:block w-[300px] space-y-6">
              <FilterSidebar
                selectedPriceRange={selectedPriceRange}
                selectedRatings={selectedRatings}
                selectedSort={selectedSort}
                onPriceRangeChange={handlePriceRangeChange}
                onRatingChange={handleRatingChange}
                onSortChange={handleSortChange}
              />
            </div>
          )}

          {/* Celebrity Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-800 rounded-xl h-96"></div>
                  </div>
                ))}
              </div>
            ) : data?.data.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No celebrities found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.data.map((celebrity: ApiCelebrity) => (
                    <CelebrityCard
                      key={celebrity.celebrityId}
                      celebrity={{
                        fullName: celebrity.fullName,
                        profileImage: celebrity.profileImage,
                        categoryName: celebrity.categoryName,
                        price: celebrity.price,
                        averageRating: celebrity.averageRating,
                        celebrityId: celebrity.celebrityId,
                        userId: celebrity.userId,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8">
                  <ReactPaginate
                    forcePage={currentPage}
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageCount={data?.totalPage}
                    onPageChange={handlePageChange}
                    containerClassName="flex flex-wrap justify-center items-center gap-2"
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