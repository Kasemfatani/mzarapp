import { ShieldCheck, Award, Headphones } from 'lucide-react';



export function TrustReinforcement({isAr}) {

  const trustPoints = [
  {
    icon: ShieldCheck,
    title:  isAr ? 'حجز آمن 100%' : '100% Secure Booking',
    description: isAr ? 'جميع البيانات محمية وفق أعلى معايير الأمان والخصوصية.' : 'All data is protected according to the highest security and privacy standards.',
  },
  {
    icon: Award,
    title: isAr ? 'مرشدون معتمدون' : 'Certified Guides',
    description: isAr ? 'نخبة من المرشدين المتخصصين وذوي الاعتماد الرسمي.' : 'A team of specialized and officially certified guides.',
  },
  {
    icon: Headphones,
    title: isAr ? 'دعم متواصل' : 'Continuous Support',
    description: isAr ? 'فريق الدعم متاح على مدار الساعة لمساعدتك في كل ما تحتاجه. ' : 'Support team available 24/7 to assist you with everything you need.',
  },
];

  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-2xl leading-relaxed text-[#4a5568]">
           {isAr ? 'نحرص على أن تكون تجربتك مريحة وآمنة منذ لحظة الحجز وحتى نهاية الرحلة.' : 'We ensure that your experience is comfortable and secure from the moment of booking until the end of the trip.'}
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
