"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { ratingFilters, ratingFiltersEn  , cities, citiesEn ,  tourTypes, tourTypesEn , sortOptions } from './reviews';



export function FilterBar({ onFiltersChange, totalResults , isAr }) {
  const [isSticky, setIsSticky] = useState(false);
  const [rating, setRating] = useState('all');
  const [city, setCity] = useState('all');
  const [tourType, setTourType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    onFiltersChange({ rating, city, tourType, sortBy });
  }, [rating, city, tourType, sortBy, onFiltersChange]);

  const handleReset = () => {
    setRating('all');
    setCity('all');
    setTourType('all');
    setSortBy('newest');
  };

  return (
    <div
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isSticky ? 'bg-white shadow-md' : 'bg-[#f5f2ed]'
      }`}
     
    >
      <div className="container mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg text-[#718096]">
            <span className="text-[#3C6652]">{totalResults}</span>  {isAr ? 'نتيجة' : 'Results'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Rating Filter */}
          <div className="relative">
            <label className="mb-2 block text-base text-[#4a5568]" >{isAr ? 'التقييم' : 'Rating'}</label>
            <div className="relative">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-lg text-[#3C6652] transition-all focus:border-[#3C6652] focus:outline-none"
              >
                {(isAr ? ratingFilters : ratingFiltersEn).map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 h-5 w-5 -translate-y-1/2 text-[#718096]`} />
            </div>
          </div>

          {/* City Filter */}
          <div className="relative">
            <label className="mb-2 block text-base text-[#4a5568]" >{isAr ? 'المدينة' : 'City'}</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-lg text-[#3C6652] transition-all focus:border-[#3C6652] focus:outline-none"
              >
                { (isAr ? cities : citiesEn).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 h-5 w-5 -translate-y-1/2 text-[#718096]`} />
            </div>
          </div>

          {/* Tour Type Filter */}
          <div className="relative">
            <label className="mb-2 block text-base text-[#4a5568]" >{isAr ? 'نوع الجولة' : 'Tour Type'}</label>
            <div className="relative">
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-base text-[#3C6652] transition-all focus:border-[#3C6652] focus:outline-none"
              >
                { (isAr ? tourTypes : tourTypesEn).map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 h-5 w-5 -translate-y-1/2 text-[#718096]`} />
            </div>
          </div>

          {/* Sort By */}
          {/* <div className="relative">
            <label className="mb-2 block text-base text-[#4a5568]" >{isAr ? 'ترتيب حسب' : 'Sort By'}</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border-2 border-[#e2e8f0] bg-white px-4 py-3 pr-10 text-lg text-[#3C6652] transition-all focus:border-[#3C6652] focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 h-5 w-5 -translate-y-1/2 text-[#718096]`} />
            </div>
          </div> */}

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#3C6652] bg-transparent px-4 py-3 text-lg text-[#3C6652] transition-all hover:bg-[#3C6652] hover:text-white"
            >
              <RotateCcw className="h-5 w-5" />
              <span>{isAr ? 'إعادة التصفية' : 'Reset Filters'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
