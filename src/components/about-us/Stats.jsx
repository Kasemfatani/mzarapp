"use client";

import { useEffect, useState } from 'react';
import { Users, MapIcon, Award, Star } from 'lucide-react';



function AnimatedCounter({ value, isRating = false , isAr = false}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{isRating ? count.toFixed(1) :  Math.floor(count).toLocaleString(isAr ? 'ar-SA' : 'en-US')}</>;
}

export function Stats({lang}) {

  const isAr = lang === 'ar';

  const stats = [
  {
    icon: Users,
    value: 15000,
    label:  isAr ? 'عميل ' : 'Customers',
    prefix: '+',
  },
  {
    icon: MapIcon,
    value: 1300,
    label: isAr ? 'جولة' : 'Tours',
    prefix: '+',
  },
  {
    icon: Award,
    value: 50,
    label: isAr ? 'جنسية' : 'Nationalities',
    prefix: '+',
  },
  {
    icon: Star,
    value: 4.9,
    label: isAr ? 'تقييم المستخدمين' : 'User Ratings',
    prefix: '',
    isRating: true,
  },
];

  return (
    <section className="bg-[#f8f5f0] py-20 md:py-28" >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-3xl bg-white p-10 shadow-md"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d5940]">
                  <Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <div className="mb-2 text-5xl text-[#0d5940]">
                  <AnimatedCounter value={stat.value} isRating={stat.isRating} isAr={isAr} />
                  {stat.prefix}
                  {stat.isRating && <Star className="mb-1 mr-1 inline h-6 w-6 fill-[#c9a961] text-[#c9a961]" />}
                </div>
                <p className="text-center text-lg text-[#718096]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
