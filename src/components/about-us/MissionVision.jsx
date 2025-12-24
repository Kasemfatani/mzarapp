import { Target, Compass } from 'lucide-react';

export function MissionVision( { lang } ) {
  const isAr = lang === 'ar';
  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <div className="group rounded-3xl bg-white p-10 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d5940]">
              <Target className="h-9 w-9 text-[#c9a961]" strokeWidth={2.5} />
            </div>
            <h3 className="mb-4 text-3xl text-[#0d5940] md:text-4xl">
             {isAr ? 'رسالتنا' : 'Our Mission'}
            </h3>
            <p className="text-xl leading-relaxed text-[#4a5568]">
              {isAr ? 'تقديم تجربة سياحية دينية منظمة، واضحة، وآمنة، مع أعلى معايير الخدمة.' : 'Providing an organized, clear, and safe religious tourism experience with the highest service standards.'}
            </p>
          </div>

          {/* Vision Card */}
          <div className="group rounded-3xl bg-white p-10 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c9a961]">
              <Compass className="h-9 w-9 text-[#0d5940]" strokeWidth={2.5} />
            </div>
            <h3 className="mb-4 text-3xl text-[#0d5940] md:text-4xl">
              {isAr ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="text-xl leading-relaxed text-[#4a5568]">
              {isAr ? 'أن نكون الوجهة الأولى لحجز الجولات الدينية والثقافية في المملكة.' : 'To be the premier destination for booking religious and cultural tours in the Kingdom.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
