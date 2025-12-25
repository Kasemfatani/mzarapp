"use client";

import { useEffect, useState } from 'react';


export function CategoryTabs({ categories, activeCategory, onCategoryChange , isAr }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        isSticky ? 'sticky top-0 z-40 bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="scrollbar-hide overflow-x-auto">
          <div className="flex gap-1 border-b-2 border-[#e2e8f0] py-2">
            {categories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`relative whitespace-nowrap px-6 py-4 text-lg transition-colors ${
                    isActive
                      ? 'text-[#0d5940]'
                      : 'text-[#718096] hover:text-[#0d5940]'
                  }`}
                >
                  {category.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-[#0d5940]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
