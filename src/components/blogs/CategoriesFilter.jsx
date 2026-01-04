import { useState, useEffect } from 'react';
import { categories } from './articles';



export function CategoriesFilter({ activeCategory, onCategoryChange , isAr }) {
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isSticky ? 'bg-white shadow-md' : 'bg-[#f5f2ed]'
      }`}
      dir="rtl"
    >
      <div className="container mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="relative">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex-shrink-0 rounded-full px-6 py-3 text-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-[#3C6652] text-white shadow-lg'
                      : 'bg-white text-[#3C6652] hover:bg-[#e8f2ed] hover:shadow-md'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Gradient Fade on Right */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-l from-transparent to-white" />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
