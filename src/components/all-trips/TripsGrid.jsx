"use client";

import { MapPin, Users, Clock, Star } from 'lucide-react';

import { Pagination } from './Pagination';



export function TripsGrid({ lang }) {
  const isAr = lang === "ar";

  const trips = [
  {
    id: '1',
    title: isAr ? 'جولة الحرم المكي الشريف مع مرشد معتمد' : 'Mecca Haram Tour with Certified Guide',
    description: isAr ? 'استكشف المسجد الحرام مع مرشد متخصص يروي لك تاريخ المكان المقدس' : 'Explore the Grand Mosque with a specialized guide narrating the history of the holy site',
    image: 'https://images.unsplash.com/photo-1676200928665-8b97df7ab979?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWNjYSUyMHBpbGdyaW1hZ2V8ZW58MXx8fHwxNzY0NzU0MTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    badge: isAr ? 'الأكثر طلبًا' : 'Most Popular',
    capacity: 12,
    duration: 7,
    rating: 4.9,
    reviewCount: 512,
    price: 249,
  },
  {
    id: '2',
    title:  isAr ? 'جولة المسجد النبوي والمعالم التاريخية' : 'Medina Mosque and Historical Sites Tour',
    description: isAr ? 'زيارة شاملة للمسجد النبوي مع جولة في المواقع التاريخية الإسلامية' : 'Comprehensive visit to the Prophet\'s Mosque with a tour of Islamic historical sites',
    image: 'https://images.unsplash.com/photo-1667454872134-c25973237138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWRpbmElMjBtb3NxdWV8ZW58MXx8fHwxNzY0NzU0MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 15,
    duration: 6,
    rating: 4.8,
    reviewCount: 387,
    price: 299,
  },
  {
    id: '3',
    title:  isAr ? 'رحلة الصحراء والواحات' : 'Desert and Oasis Trip',
    description: isAr ? 'تجربة فريدة لاستكشاف جمال الصحراء العربية مع مرشد محلي' : 'A unique experience to explore the beauty of the Arabian desert with a local guide',
    image: 'https://images.unsplash.com/photo-1547235001-d703406d3f17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY0Njk4ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'الطائف' : 'Taif',
    capacity: 8,
    duration: 5,
    rating: 4.7,
    reviewCount: 234,
    price: 189,
  },
  {
    id: '4',
    title: isAr ? 'جولة المدينة القديمة والأسواق التراثية' : 'Old City and Heritage Markets Tour',
    description: isAr ? 'اكتشف تاريخ المدينة العريق والأسواق التقليدية مع تذوق الأطعمة المحلية' : 'Discover the rich history of the city and traditional markets with local food tasting',
    image: 'https://images.unsplash.com/photo-1575379972263-2f15a5c78236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMGNpdHklMjB0b3VyfGVufDF8fHx8MTc2NDc1NDE4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'جدة' : 'Jeddah',
    badge: isAr ? 'الأكثر طلبًا' : 'Most Popular',
    capacity: 20,
    duration: 4,
    rating: 4.9,
    reviewCount: 678,
    price: 159,
  },
  {
    id: '5',
    title: isAr ? 'رحلة جماعية إلى المعالم الدينية' : 'Group Trip to Religious Sites',
    description: isAr ? 'جولة منظمة لزيارة أهم المعالم الدينية مع مجموعة من الزوار' : 'Organized tour to visit the most important religious sites with a group of visitors',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRyYXZlbHxlbnwxfHx8fDE3NjQ3NTQxODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'مكة المكرمة' : 'Mecca',
    capacity: 25,
    duration: 8,
    rating: 4.6,
    reviewCount: 445,
    price: 199,
  },
  {
    id: '6',
    title:  isAr ? 'جولة التراث الثقافي والفنون' : 'Cultural Heritage and Arts Tour',
    description: isAr ? 'استكشف الفن والثقافة المحلية مع زيارة للمتاحف والمعارض التراثية' : 'Explore local art and culture with visits to museums and heritage galleries',
    image: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc2NDc1NDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    city: isAr ? 'المدينة المنورة' : 'Medina',
    badge: isAr ? 'متاح هذا الأسبوع' : 'Available This Week',
    capacity: 10,
    duration: 5,
    rating: 4.8,
    reviewCount: 289,
    price: 229,
  },
];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} isAr={isAr} />
          ))}
        </div>
        <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} isAr={isAr} />
      </div>
    </section>
  );
}

function TripCard({ trip, isAr }) {
  return (
    <div className="group bg-white rounded-[20px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* City Badge - Top Left */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
          <span className="text-sm text-[#3C6652]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            {trip.city}
          </span>
          <MapPin className="w-3.5 h-3.5 text-[#867957]" />
        </div>

        {/* Optional Badge - Top Right */}
        {trip.badge && (
          <div className="absolute top-4 right-4 bg-[#867957] text-white px-3 py-1.5 rounded-full shadow-lg animate-fade-in">
            <span className="text-xs" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              {trip.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 
          className="text-lg text-[#0F172A] mb-2  line-clamp-2 min-h-[3.5rem] leading-relaxed"
          style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 700 }}
        >
          {trip.title}
        </h3>

        {/* Description */}
        <p 
          className="text-sm text-[#475569] mb-4  line-clamp-2 leading-relaxed"
          style={{ fontFamily: 'Tajawal, sans-serif' }}
        >
          {trip.description}
        </p>

        {/* Icons Row */}
        <div className="flex items-center  gap-4 mb-4 text-sm text-[#475569]">
          {/* People */}
          <div className="flex items-center gap-1.5">
            <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{trip.capacity}  {isAr ? 'شخص' : 'people'}</span>
            <Users className="w-4 h-4 text-[#867957]" />
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{trip.duration}  {isAr ? 'ساعات' : 'hours'}</span>
            <Clock className="w-4 h-4 text-[#867957]" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#475569]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              ({trip.reviewCount})
            </span>
            <span className="text-[#0F172A]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              {trip.rating}
            </span>
            <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
          </div>
        </div>

        {/* Spacer to push content below to bottom */}
        <div className="flex-1" />

        {/* Bottom Section - Price and Buttons */}
        <div className="mt-auto">
          {/* Divider */}
          <div className="border-t border-gray-100 mb-4" />

          {/* Price Section */}
          <div className="mb-4 ">
            <div className="text-xs text-[#867957] mb-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              {isAr ? 'ابتداءً من' : 'Starting from'}
            </div>
            <div 
              className="text-2xl text-[#3C6652]" 
              style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 700 }}
            >
              {trip.price}  {isAr ? 'ريال' : 'SAR'}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Primary Button */}
            <button 
              className="flex-1 px-4 py-2.5 bg-[#3C6652] text-white rounded-xl hover:bg-[#2d4d3d] transition-all duration-300 shadow-sm hover:shadow-md"
              style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
            >
              {isAr ? 'شاهد التفاصيل' : 'View Details'}
            </button>

            {/* Secondary Button */}
            <button 
              className="flex-1 px-4 py-2.5 border-2 border-[#E7D3AF] text-[#3C6652] rounded-xl hover:bg-[#E7D3AF] hover:border-[#E7D3AF] transition-all duration-300"
              style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
            >
              {isAr ? 'احجز الآن' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}