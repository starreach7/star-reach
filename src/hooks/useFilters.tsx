import { useState, useCallback } from 'react';
import { Celebrity } from '../types';

export const useFilters = (initialCelebrities: Celebrity[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const handlePriceRangeChange = useCallback((range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  }, []);

  const handleRatingChange = useCallback((rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  }, []);

  const filterCelebrities = useCallback((celebrities: Celebrity[]) => {
    return celebrities.filter(celebrity => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        celebrity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        celebrity.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Price range filter
      const matchesPriceRange = selectedPriceRanges.length === 0 || 
        selectedPriceRanges.some(range => {
          const [min, max] = range.split('-').map(n => n === 'plus' ? Infinity : Number(n));
          return celebrity.price >= min && celebrity.price <= max;
        });

      // Rating filter
      const matchesRating = selectedRatings.length === 0 ||
        selectedRatings.some(rating => celebrity.rating >= rating);

      return matchesSearch && matchesPriceRange && matchesRating;
    });
  }, [searchQuery, selectedPriceRanges, selectedRatings]);

  return {
    searchQuery,
    setSearchQuery,
    selectedPriceRanges,
    selectedRatings,
    handlePriceRangeChange,
    handleRatingChange,
    filterCelebrities
  };
};

export type UseFiltersReturn = ReturnType<typeof useFilters>;