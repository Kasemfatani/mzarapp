"use client";

import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';



export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  onLoadMore,
  isLoading = false ,
  isAr = false,
}) {
  const [hoveredPage, setHoveredPage] = useState(null);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Pagination */}
        <div className="hidden md:flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-[14px] border-2 transition-all duration-300
              ${currentPage === 1
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-[#E7D3AF] text-[#3C6652] hover:bg-[#E7D3AF] hover:shadow-md hover:-translate-y-0.5'
              }
            `}
            style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
          >
            <span>{isAr ? < ChevronRight  className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}</span>
            <span>{isAr ? 'السابق' : 'Previous'}</span>
            
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {pageNumbers.map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span className="px-3 text-[#867957]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => handlePageClick(page)}
                    onMouseEnter={() => setHoveredPage(page)}
                    onMouseLeave={() => setHoveredPage(null)}
                    className={`
                      w-11 h-11 rounded-[12px] transition-all duration-300
                      ${currentPage === page
                        ? 'bg-[#3C6652] text-white shadow-lg scale-105'
                        : hoveredPage === page
                        ? 'bg-[#E7D3AF] text-[#3C6652] shadow-md -translate-y-0.5'
                        : 'bg-white border-2 border-gray-200 text-[#475569] hover:border-[#867957]'
                      }
                    `}
                    style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: currentPage === page ? 700 : 500 }}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-[14px] border-2 transition-all duration-300
              ${currentPage === totalPages
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-[#E7D3AF] text-[#3C6652] hover:bg-[#E7D3AF] hover:shadow-md hover:-translate-y-0.5'
              }
            `}
            style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
          >
            <span>{isAr ? 'التالي' : 'Next'}</span>
            <span>{isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}</span>
          </button>
        </div>

        {/* Mobile Pagination - Simplified */}
        <div className="md:hidden">
          {/* Current Page Indicator */}
          <div className="text-center mb-6">
            <span className="text-sm text-[#475569]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {isAr ? 'صفحة' : 'Page'}  <span className="text-[#3C6652] font-semibold">{currentPage}</span> {isAr ? 'من' : 'of'}  {totalPages}
            </span>
          </div>

          {/* Compact Page Navigation */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {/* Previous */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${currentPage === 1
                  ? 'border-gray-200 text-gray-400'
                  : 'border-[#3C6652] text-[#3C6652] active:bg-[#3C6652] active:text-white'
                }
              `}
            >
              <span>{isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}</span>
            </button>

            {/* First 3 pages or current page neighbors */}
            <div className="flex items-center gap-2">
              {Array.from(new Set([
                Math.max(1, currentPage - 1),
                currentPage,
                Math.min(totalPages, currentPage + 1)
              ])).map((page) => (
                <button
                  key={`mobile-page-${page}`}
                  onClick={() => handlePageClick(page)}
                  className={`
                    w-10 h-10 rounded-full transition-all duration-300
                    ${currentPage === page
                      ? 'bg-[#3C6652] text-white shadow-md scale-110'
                      : 'bg-white border-2 border-gray-200 text-[#475569] active:bg-[#E7D3AF]'
                    }
                  `}
                  style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: currentPage === page ? 700 : 500 }}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${currentPage === totalPages
                  ? 'border-gray-200 text-gray-400'
                  : 'border-[#3C6652] text-[#3C6652] active:bg-[#3C6652] active:text-white'
                }
              `}
            >
              <span>{isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight  className="w-5 h-5" />}</span>
            </button>
          </div>

          {/* Load More Button - Mobile Primary Action */}
          {currentPage < totalPages && onLoadMore && (
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="w-full px-6 py-4 bg-[#867957] text-white rounded-[16px] hover:bg-[#6d5e45] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <>
                  <span>عرض المزيد من الرحلات</span>
                  <span className="text-xs opacity-75">({totalPages - currentPage} صفحات متبقية)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Desktop Load More Alternative */}
        {/* {currentPage < totalPages && onLoadMore && (
          <div className="hidden md:block mt-8 text-center">
            <button
              onClick={onLoadMore}
              disabled={isLoading}
              className="px-8 py-3 bg-white border-2 border-[#867957] text-[#867957] rounded-[14px] hover:bg-[#867957] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
              style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <span>أو عرض جميع الرحلات في صفحة واحدة</span>
              )}
            </button>
          </div>
        )} */}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
