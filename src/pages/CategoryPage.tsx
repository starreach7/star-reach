import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, Users, Clock } from 'lucide-react';
import CelebrityCard from '../components/CelebrityCard';
import FilterSidebar from '../commonComponents/FilterSidebar';
import { useCategories } from '../store/categoryStore';
import { useQuery } from '@tanstack/react-query';
import CelebrityService from '../services/api/celebrity.service';
import ReactPaginate from 'react-paginate';
import { ApiCelebrity } from '../types';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: '', max: '' });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSort, setSelectedSort] = useState('');
  
  const { categories, loading: categoriesLoading, error: categoriesError, fetchCategories } = useCategories();
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['celebrities', categoryId, currentPage + 1, searchQuery, selectedPriceRange, selectedRatings, selectedSort],
    queryFn: () => CelebrityService.getAllCelebrities({
      page: currentPage + 1,
      search: searchQuery || undefined,
      minPrice: selectedPriceRange.min || undefined,
      maxPrice: selectedPriceRange.max || undefined,
      ratings: selectedRatings.length > 0 ? selectedRatings : undefined,
      sortBy: selectedSort || undefined,
      categoryId: categoryId
    }),
  });

  const category = categories.find(c => c.name.toLowerCase() === categoryId?.toLowerCase());

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

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Header Skeleton */}
          <div className="mb-12">
            <div className="h-12 w-64 bg-gray-800 rounded-lg animate-pulse mb-4"></div>
            <div className="h-4 w-96 bg-gray-800 rounded animate-pulse"></div>
          </div>

          {/* Search and Filter Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="w-full md:w-2/3 mb-4 md:mb-0">
              <div className="h-12 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-10 w-28 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar Skeleton */}
            <div className="lg:w-1/4 space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 animate-pulse space-y-4">
                <div className="h-6 w-32 bg-gray-700 rounded"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 animate-pulse space-y-4">
                <div className="h-6 w-32 bg-gray-700 rounded"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>

            {/* Celebrity Grid Skeleton */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-800 rounded-xl overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
                      <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-20 bg-gray-700 rounded"></div>
                        <div className="h-10 w-24 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (categoriesError || !category) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-red-500">Category not found</p>
        </div>
      </div>
    );
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
                onChange={handleSearch}
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
              selectedPriceRange={selectedPriceRange}
              selectedRatings={selectedRatings}
              selectedSort={selectedSort}
              onPriceRangeChange={handlePriceRangeChange}
              onRatingChange={handleRatingChange}
              onSortChange={handleSortChange}
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
            ) : data?.data.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No celebrities found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    pageCount={data?.totalPages || 2}
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

export default CategoryPage;