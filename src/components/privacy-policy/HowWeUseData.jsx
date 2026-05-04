import { CheckCircle2, Users, MessageSquare, Gift } from 'lucide-react';


export function HowWeUseData({ isAr }) {

  const usageCards = [
  {
    icon: CheckCircle2,
    title:  isAr ? 'تنفيذ الحجوزات' : 'Booking Execution',
    description: isAr ? 'نستخدم بياناتك لإتمام حجوزاتك وإرسال التأكيدات والتذاكر' : 'We use your data to complete your bookings and send confirmations and tickets',
    color: 'from-[#0d5940] to-[#116149]',
  },
  {
    icon: Users,
    title: isAr ? 'تحسين تجربة المستخدم' : 'Improving User Experience',
    description: isAr ? 'نحلل البيانات لتطوير خدماتنا وتقديم تجربة أفضل لك' : 'We analyze data to improve our services and provide a better experience for you',
    color: 'from-[#c9a961] to-[#e5d4a8]',
  },
  {
    icon: MessageSquare,
    title: isAr ? 'التواصل بخصوص الرحلات' : 'Communication About Trips',
    description: isAr ? 'نرسل لك تحديثات مهمة عن رحلاتك والمواعيد والتغييرات' : 'We send you important updates about your trips, schedules, and changes',
    color: 'from-[#0d5940] to-[#116149]',
  },
  {
    icon: Gift,
    title: isAr ? 'إرسال العروض (اختياري)' : 'Sending Offers (Optional)',
    description: isAr ? 'يمكنك الاشتراك لتلقي عروض وخصومات خاصة في أي وقت' : 'You can subscribe to receive special offers and discounts at any time',
    color: 'from-[#c9a961] to-[#e5d4a8]',
  },
];


  return (
    <section className="bg-[#f5f2ed] py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
            {isAr ? 'كيف نستخدم بياناتك؟' : 'How We Use Your Data'}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            {isAr ? 'نستخدم معلوماتك فقط لتحسين تجربتك وخدمتك بشكل أفضل' : 'We only use your information to improve your experience and service.'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {usageCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${card.color} p-8`}>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl text-white">
                    {card.title}
                  </h3>
                </div>
                <div className="p-8">
                  <p className="text-lg leading-relaxed text-[#4a5568]">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
