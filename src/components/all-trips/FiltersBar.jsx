"use client";

import { useState, useEffect } from 'react';
import { MapPin, Ticket, Clock, Calendar, Users, SlidersHorizontal, RotateCcw, ChevronDown, X, Star, Search } from 'lucide-react';



export function FiltersBar({ totalResults , lang }) {

  const isAr = lang === "ar";

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    city: '',
    tourType: '',
    priceRange: [50, 500],
    duration: '',
    rating: null,
    date: '',
    guests: 1,
  });

  // Sticky scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasActiveFilters = () => {
    return (
      activeFilters.city ||
      activeFilters.tourType ||
      activeFilters.priceRange[0] !== 50 ||
      activeFilters.priceRange[1] !== 500 ||
      activeFilters.duration ||
      activeFilters.rating ||
      activeFilters.date ||
      activeFilters.guests !== 1
    );
  };

  const resetFilters = () => {
    setActiveFilters({
      city: '',
      tourType: '',
      priceRange: [50, 500],
      duration: '',
      rating: null,
      date: '',
      guests: 1,
    });
    setSearchQuery('');
  };

  const clearFilter = (filterName) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: filterName === 'priceRange' ? [50, 500] : filterName === 'guests' ? 1 : filterName === 'rating' ? null : '',
    }));
  };

  return (
    <div className="bg-white border-b border-[#E2E8F0]">
      {/* Search Bar Section */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <div className="relative ">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder= {isAr ? "ابحث عن رحلة..." : "Search for a trip..."}
            className="w-full h-[50px] bg-white border border-[#E2E8F0] rounded-[28px] px-6 pl-14 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0097A7] focus:border-transparent transition-all shadow-md"
            
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-5 h-5 text-[#0097A7]" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Filters Bar Section */}
      <div
        className={`sticky top-0 z-40 bg-white transition-all duration-300 `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Main Filters Grid */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter 1 - City */}
            <FilterDropdown
              label= {isAr ? "المدينة" : "City"}
              icon={<MapPin className="w-4 h-4" />}
              options={isAr ? ['مكة المكرمة', 'المدينة المنورة', 'الطائف', 'جدة', 'أخرى'] : ['Mecca', 'Medina', 'Taif', 'Jeddah', 'Other']}
              value={activeFilters.city}
              onChange={(value) => setActiveFilters({ ...activeFilters, city: value })}
              onClear={() => clearFilter('city')}
            />

            {/* Filter 2 - Tour Type */}
            <FilterDropdown
              label={isAr ? "نوع الجولة" : "Tour Type"}
              icon={<Ticket className="w-4 h-4" />}
              options={ isAr ? [
                'جولات الحرمين',
                'جولات تاريخية',
                'الباص السياحي',
                'تجارب الواقع المعزز AR',
                'جولات عائلية',
                'جولات خاصة VIP',
              ] : [
                'Haram Tours',
                'Historical Tours',
                'Tourist Bus',
                'Augmented Reality (AR) Experiences',
                'Family Tours',
                'VIP Private Tours',
              ]}
              value={activeFilters.tourType}
              onChange={(value) => setActiveFilters({ ...activeFilters, tourType: value })}
              onClear={() => clearFilter('tourType')}
            />

            {/* Filter 3 - Price Range */}
            <PriceFilter
              value={activeFilters.priceRange}
              onChange={(value) => setActiveFilters({ ...activeFilters, priceRange: value })}
              onClear={() => clearFilter('priceRange')} isAr={isAr}
            />

            {/* Filter 4 - Duration */}
            <FilterDropdown
              label={isAr ? "المدة" : "Duration"}
              icon={<Clock className="w-4 h-4" />}
              options={isAr ? ['3 ساعات', '6 ساعات', 'يوم كامل'] : ['3 hours', '6 hours', 'Full day']}
              value={activeFilters.duration}
              onChange={(value) => setActiveFilters({ ...activeFilters, duration: value })}
              onClear={() => clearFilter('duration')}
            />

            {/* Filter 5 - Rating */}
            <RatingFilter
              value={activeFilters.rating}
              onChange={(value) => setActiveFilters({ ...activeFilters, rating: value })}
              onClear={() => clearFilter('rating')} isAr={isAr}
            />

            {/* Filter 6 - Date */}
            <DateFilter
              value={activeFilters.date}
              onChange={(value) => setActiveFilters({ ...activeFilters, date: value })}
              onClear={() => clearFilter('date')}
            />

            {/* Filter 7 - Guests */}
            <GuestsFilter
              value={activeFilters.guests}
              onChange={(value) => setActiveFilters({ ...activeFilters, guests: value })}
              onClear={() => clearFilter('guests')} isAr={isAr}
            />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action Buttons */}
            <button className="px-4 py-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-[14px] flex items-center gap-2 hover:bg-[#E2E8F0] transition-colors whitespace-nowrap">
              <span className="text-sm text-[#0F172A]" >
                {isAr ? "تصفية متقدمة" : "Advanced Filters"}
              </span>
              <SlidersHorizontal className="w-4 h-4 text-[#006064]" />
            </button>

            {hasActiveFilters() && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 flex items-center gap-2 text-[#0097A7] hover:bg-[#F1F5F9] rounded-[14px] transition-colors whitespace-nowrap"
              >
                <span className="text-sm" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {isAr ? "إعادة التعيين" : "Reset"}
                </span>
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter - Below Filters */}
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="inline-flex items-center bg-[#E0F7FA] rounded-[18px] px-4 py-1.5">
            <span className="text-sm text-[#006064]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              {isAr ? "عدد النتائج: " : "Results Count: "}<span className="font-semibold">{totalResults} {isAr ? "رحلة" : "Trips"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Dropdown Component
function FilterDropdown({ label, icon, options, value, onChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = !!value;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#006064] text-white border-[#006064]'
            : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]'
        }`}
      >
        <span className="text-sm" >
          {value || label}
        </span>
        <div className={isActive ? 'text-white' : 'text-[#006064]'}>
          {isActive ? <X className="w-4 h-4" onClick={(e) => { e.stopPropagation(); onClear(); }} /> : icon}
        </div>
        {!isActive && <ChevronDown className="w-4 h-4 text-[#475569]" />}
      </button>

      {isOpen && !isActive && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-20">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2  hover:bg-[#F1F5F9] transition-colors text-sm text-[#0F172A]"
                
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Price Filter Component
function PriceFilter({ value, onChange, onClear , isAr }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState(value);
  const isActive = value[0] !== 50 || value[1] !== 500;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#006064] text-white border-[#006064]'
            : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]'
        }`}
      >
        <span className="text-sm" >
          {isActive ? `${value[0]} - ${value[1]}  ${isAr ? "ريال" : "SAR"}` : isAr ? 'السعر' : 'Price'}
        </span>
        {isActive ? (
          <X className="w-4 h-4" onClick={(e) => { e.stopPropagation(); onClear(); }} />
        ) : (
          <>
            <ChevronDown className="w-4 h-4 text-[#475569]" />
          </>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-6 z-20">
            <div className="text-center mb-4 text-sm text-[#006064]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              {isAr ? "من" : "from"} {tempRange[0]} {isAr ? "إلى" : "to"} {tempRange[1]}  {isAr ? "ريال" : "SAR"}
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={tempRange[1]}
              onChange={(e) => setTempRange([tempRange[0], parseInt(e.target.value)])}
              className="w-full accent-[#0097A7]"
            />
            <div className="flex justify-between text-xs text-[#475569] mt-2">
              <span>500</span>
              <span>50</span>
            </div>
            <button
              onClick={() => {
                onChange(tempRange);
                setIsOpen(false);
              }}
              className="w-full mt-4 px-4 py-2 bg-[#006064] text-white rounded-lg hover:bg-[#004d50] transition-colors"
              
            >
             {isAr ? "تطبيق" : "Apply"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Rating Filter Component
function RatingFilter({ value, onChange, onClear , isAr }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = value !== null;
  const options = [4, 4.5, 5];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#006064] text-white border-[#006064]'
            : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]'
        }`}
      >
        <span className="text-sm" >
          {isActive ? `${value}+ ⭐` : isAr ? 'التقييم' : 'Rating'}
        </span>
        {isActive ? (
          <X className="w-4 h-4" onClick={(e) => { e.stopPropagation(); onClear(); }} />
        ) : (
          <>
            <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
            <ChevronDown className="w-4 h-4 text-[#475569]" />
          </>
        )}
      </button>

      {isOpen && !isActive && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-20">
            {options.map((rating) => (
              <button
                key={rating}
                onClick={() => {
                  onChange(rating);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2  hover:bg-[#F1F5F9] transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-sm text-[#0F172A]" >
                  {rating}+
                </span>
                <Star className="w-4 h-4 text-[#FFC107] fill-[#FFC107]" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Date Filter Component
function DateFilter({ value, onChange, onClear , isAr }) {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = !!value;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#006064] text-white border-[#006064]'
            : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]'
        }`}
      >
        <span className="text-sm" >
          {value ||  (isAr ? 'التاريخ' : 'Date')}
        </span>
        <div className={isActive ? 'text-white' : 'text-[#0097A7]'}>
          {isActive ? <X className="w-4 h-4" onClick={(e) => { e.stopPropagation(); onClear(); }} /> : <Calendar className="w-4 h-4" />}
        </div>
        {!isActive && <ChevronDown className="w-4 h-4 text-[#475569]" />}
      </button>

      {isOpen && !isActive && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 z-20">
            <input
              type="date"
              onChange={(e) => {
                onChange(e.target.value);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent"
              
            />
          </div>
        </>
      )}
    </div>
  );
}

// Guests Filter Component
function GuestsFilter({ value, onChange, onClear , isAr }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const isActive = value !== 1;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[16px] border transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#006064] text-white border-[#006064]'
            : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-[#0097A7]'
        }`}
      >
        <span className="text-sm" >
          {isActive ? `${value} ${isAr ? 'أشخاص' : 'people'}` :  (isAr ? 'عدد الأشخاص' : 'Number of Guests')}
        </span>
        <div className={isActive ? 'text-white' : 'text-[#006064]'}>
          {isActive ? <X className="w-4 h-4" onClick={(e) => { e.stopPropagation(); onClear(); }} /> : <Users className="w-4 h-4" />}
        </div>
        {!isActive && <ChevronDown className="w-4 h-4 text-[#475569]" />}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E2E8F0] p-4 z-20">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setTempValue(Math.max(1, tempValue - 1))}
                className="w-8 h-8 bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#006064] hover:bg-[#E2E8F0]"
              >
                −
              </button>
              <span className="text-lg" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                {tempValue}
              </span>
              <button
                onClick={() => setTempValue(Math.min(10, tempValue + 1))}
                className="w-8 h-8 bg-[#F1F5F9] rounded-full flex items-center justify-center text-[#006064] hover:bg-[#E2E8F0]"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                onChange(tempValue);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 bg-[#006064] text-white rounded-lg hover:bg-[#004d50] transition-colors"
              
            >
              {isAr ? "تطبيق" : "Apply"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}