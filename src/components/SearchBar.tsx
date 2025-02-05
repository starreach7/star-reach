import React, { useState, useRef } from 'react';
import { Search, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CelebrityService from '../services/api/celebrity.service';
import useOnClickOutside from '../hooks/useOnClickOutside';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['celebritySearch', searchQuery],
    queryFn: () => CelebrityService.getAllCelebrities({
      page: 1,
      search: searchQuery
    }),
    enabled: searchQuery.length > 2,
  });

  useOnClickOutside(searchRef, () => setIsOpen(false));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  const handleCelebrityClick = (celebrityId: string) => {
    navigate(`/celebrity/${celebrityId}`);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      {/* Enhanced Search Bar */}
      <div className="group flex items-center bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 ring-1 ring-gray-700 transition-all duration-300 focus-within:ring-emerald-500/50 focus-within:ring-2 focus-within:bg-gray-800">
        <Search className="w-6 h-6 text-gray-400 ml-2 group-focus-within:text-emerald-400 transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for your favorite celebrity..."
          className="w-full bg-transparent border-none text-gray-100 placeholder-gray-400 px-4 py-2 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Enhanced Search Results Dropdown */}
      {isOpen && searchQuery.length > 2 && (
        <div className="absolute z-50 w-full mt-4 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 max-h-[32rem] overflow-y-auto divide-y divide-gray-700/50">
          {/* Search Header */}
          <div className="px-4 py-3 bg-emerald-900/20 border-b border-emerald-800/30">
            <div className="flex items-center justify-between">
              <p className="text-sm text-emerald-400 font-medium">Search Results</p>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Results Content */}
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Searching for celebrities...</p>
            </div>
          ) : searchResults?.data.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No celebrities found matching your search</p>
            </div>
          ) : (
            <div className="py-2">
              {searchResults?.data.map((celebrity: any) => (
                <button
                  key={celebrity.celebrityId}
                  onClick={() => handleCelebrityClick(celebrity.celebrityId)}
                  className="w-full px-4 py-4 flex items-center space-x-4 hover:bg-emerald-900/20 transition-colors group"
                >
                  {/* Profile Image with Ring */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-700 group-hover:ring-emerald-500 transition-colors">
                      <img
                        src={celebrity.profileImage}
                        alt={celebrity.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-xs font-bold text-white px-2 py-0.5 rounded-full">
                      {celebrity.categoryName}
                    </div>
                  </div>

                  {/* Celebrity Info */}
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                      {celebrity.fullName}
                    </h4>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{celebrity.averageRating}</span>
                      </div>
                      <span className="mx-2 text-gray-600">•</span>
                      <span className="text-sm text-gray-400">${celebrity.price} per video</span>
                    </div>
                  </div>

                  {/* Arrow indicator on hover */}
                  <div className="w-6 h-6 text-emerald-400 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    →
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;