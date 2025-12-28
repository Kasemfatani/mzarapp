import { Calendar, DollarSign, CheckSquare, CreditCard, Clock, Receipt } from 'lucide-react';



export function BookingsPayments( { isAr }) {

  const paymentRules = [
  {
    icon: Calendar,
    title: 'توفر الرحلات',
    description: 'جميع الحجوزات تخضع لتوفر الرحلة وقد لا تكون متاحة في بعض الأوقات',
  },
  {
    icon: DollarSign,
    title: 'الأسعار والضرائب',
    description: 'الأسعار المعروضة تشمل ضريبة القيمة المضافة وأي رسوم إضافية إن وُجدت',
  },
  {
    icon: CheckSquare,
    title: 'تأكيد الحجز',
    description: 'يتم تأكيد حجزك تلقائياً بعد إتمام عملية الدفع بنجاح',
  },
  {
    icon: CreditCard,
    title: 'وسائل الدفع',
    description: 'نقبل جميع طرق الدفع الإلكتروني الآمنة والمعتمدة في المملكة',
  },
  {
    icon: Clock,
    title: 'وقت المعالجة',
    description: 'يتم معالجة الدفع فورياً وإرسال تأكيد الحجز إلى بريدك الإلكتروني',
  },
  {
    icon: Receipt,
    title: 'الفواتير',
    description: 'سيتم إرسال الفاتورة التفصيلية إلى بريدك الإلكتروني بعد كل عملية دفع',
  },
];

  return (
    <section className="bg-white py-20 md:py-32" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
            الحجوزات والمدفوعات
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            قواعد واضحة لضمان عملية حجز سلسة وآمنة
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paymentRules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <div
                key={index}
                className="rounded-3xl bg-[#f5f2ed] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c9a961]">
                  <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 text-2xl text-[#0d5940]">
                  {rule.title}
                </h3>
                <p className="text-lg leading-relaxed text-[#4a5568]">
                  {rule.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-[#e8f4f0] to-[#f5f2ed] p-8">
            <h3 className="mb-4 text-2xl text-[#0d5940]">
              💳 الأمان المالي
            </h3>
            <p className="text-lg leading-relaxed text-[#4a5568]">
              جميع المعاملات المالية تتم عبر بوابات دفع آمنة ومشفرة. لا نحتفظ بمعلومات بطاقتك الائتمانية على خوادمنا.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#e8f4f0] to-[#f5f2ed] p-8">
            <h3 className="mb-4 text-2xl text-[#0d5940]">
              📧 التواصل الفوري
            </h3>
            <p className="text-lg leading-relaxed text-[#4a5568]">
              ستصلك جميع التحديثات المتعلقة بحجزك عبر البريد الإلكتروني والرسائل النصية فور حدوثها.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
