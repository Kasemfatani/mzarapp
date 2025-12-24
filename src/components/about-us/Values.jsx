import { Shield, Lock, Heart, Award, Smile } from 'lucide-react';


export function Values({ lang }) {

  const isAr = lang === 'ar';

  const values = [
  {
    icon: Shield,
    label:  isAr ? 'المصداقية' : 'Integrity',
  },
  {
    icon: Lock,
    label: isAr ? 'الخصوصية' : 'Privacy',
  },
  {
    icon: Heart,
    label: isAr ? 'الاحترام' : 'Respect',
  },
  {
    icon: Award,
    label: isAr ? 'الاحترافية' : 'Professionalism',
  },
  {
    icon: Smile,
    label: isAr ? 'تجربة المستخدم أولاً' : 'User Experience First',
  },
];


  return (
    <section className="bg-white py-20 md:py-28" dir="rtl">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <h2 className="mb-16 text-center text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'قيمنا' : 'Our Values'}
        </h2>

        {/* Values List */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-3xl border-2 border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:border-[#c9a961]"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f2ed]">
                  <Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <p className="text-center text-xl text-[#0d5940]">
                  {value.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
