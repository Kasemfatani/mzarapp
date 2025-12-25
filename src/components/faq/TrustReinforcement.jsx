import { ShieldCheck, Award, Headphones } from 'lucide-react';



export function TrustReinforcement({isAr}) {

  const trustPoints = [
  {
    icon: ShieldCheck,
    title:  isAr ? 'حجز آمن 100%' : '100% Secure Booking',
    description: isAr ? 'جميع معاملاتك محمية بأعلى معايير الأمان' : 'All your transactions are protected with the highest security standards',
  },
  {
    icon: Award,
    title: isAr ? 'مرشدون معتمدون' : 'Certified Guides',
    description: isAr ? 'فريق من المرشدين ذوي الخبرة والاعتماد الرسمي' : 'A team of experienced and officially certified guides',
  },
  {
    icon: Headphones,
    title: isAr ? 'دعم متواصل' : 'Continuous Support',
    description: isAr ? 'فريق الدعم متاح لمساعدتك على مدار الساعة' : 'Support team available to assist you around the clock',
  },
];

  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-2xl leading-relaxed text-[#4a5568]">
           {isAr ? 'نحرص على تقديم تجربة موثوقة من بداية الحجز حتى نهاية الرحلة.' : 'We are committed to providing a reliable experience from booking to the end of the trip.'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="rounded-3xl bg-white p-10 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0d5940]">
                  <Icon className="h-10 w-10 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 text-2xl text-[#0d5940]">
                  {point.title}
                </h3>
                <p className="text-lg leading-relaxed text-[#718096]">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
