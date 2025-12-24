import { BadgeCheck, FileCheck, CreditCard } from 'lucide-react';



export function TrustCompliance({ lang }) {

  const isAr = lang === 'ar';

  const trustBadges = [
  {
    icon: BadgeCheck,
    label: isAr ? 'مرخص من الجهات الرسمية' : 'Licensed by Official Authorities',
  },
  {
    icon: FileCheck,
    label: isAr ? 'ملتزم بمعايير السياحة السعودية' : 'Compliant with Saudi Tourism Standards',
  },
  {
    icon: CreditCard,
    label: isAr ? 'دفع إلكتروني آمن 100%' : '100% Secure Electronic Payment',
  },
];


  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0d5940] to-[#116149] p-10 shadow-xl md:p-14">
          {/* Title */}
          <h2 className="mb-10 text-center text-3xl text-white md:text-4xl">
            {isAr ? 'الثقة والامتثال' : 'Trust and Compliance'}
          </h2>

          {/* Trust Badges */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#c9a961]">
                    <Icon className="h-7 w-7 text-[#0d5940]" strokeWidth={2.5} />
                  </div>
                  <p className="text-center text-lg text-white">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* License Number */}
          <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm">
            <p className="text-lg text-white/90">
               {isAr ? 'رقم الترخيص:' : 'License Number:'} <span className="text-[#c9a961]">SA-TOURISM-2024-XXXX</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
