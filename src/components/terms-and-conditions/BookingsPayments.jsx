import { Calendar, DollarSign, CheckSquare, CreditCard, Clock, Receipt , BellRing , ShieldCheck } from 'lucide-react';



export function BookingsPayments( { isAr }) {

  const paymentRules = [
    {
    icon: CheckSquare,
    title: isAr ? 'تأكيد الحجز' : 'Booking Confirmation',
    description: isAr ? 'يتم تأكيد الحجز تلقائياً فور إتمام عملية الدفع بنجاح، وسيصلك إشعار تأكيد عبر البريد الإلكتروني والرسائل النصية. ' : 'Booking is automatically confirmed upon successful payment, and you will receive a confirmation notification via email and SMS.',
  },
  {
    icon: DollarSign,
    title: isAr ? 'الأسعار والضرائب' : 'Prices and Taxes',
    description: isAr ? 'تتضمن جميع الأسعار ضريبة القيمة المضافة وأي رسوم إضافية مطبّقة حسب الأنظمة في المملكة العربية السعودية. ' : 'All prices include VAT and any additional fees applicable according to regulations in the Kingdom of Saudi Arabia.',
  },
  {
    icon: Calendar,
    title: isAr ? 'توفر الرحلات' : 'Trip Availability',
    description: isAr ? 'تخضع جميع الحجوزات لتوفر الرحلة الفعلي، وقد تختلف المواعيد أو تتغير بحسب الإقبال أو الظروف التشغيلية. ' : 'All bookings are subject to actual trip availability, and schedules may vary or change based on demand or operational conditions.',
  },
  {
    icon: Receipt,
    title: isAr ? 'الفواتير' : 'Invoices',
    description: isAr ? 'يتم إرسال فاتورة تفصيلية إلى بريدك الإلكتروني بعد إتمام عملية الدفع مباشرة، متضمنة تفاصيل الخدمة والمبلغ المدفوع. ' : 'A detailed invoice is sent to your email immediately after payment, including service details and the amount paid.',
  },
  {
    icon: Clock,
    title: isAr ? 'وقت المعالجة' : 'Processing Time',
    description: isAr ? 'تُعالَج عمليات الدفع فوراً، ويتم إرسال تأكيد الحجز إلى بريدك الإلكتروني بعد ثوانٍ من إتمام العملية. ' : 'Payments are processed instantly, and booking confirmation is sent to your email within seconds of completing the transaction.',
  },
  {
    icon: CreditCard,
    title: isAr ? 'وسائل الدفع' : 'Payment Methods',
    description: isAr ? 'يدعم مزار جميع وسائل الدفع الإلكتروني الآمنة والمعتمدة داخل المملكة، لضمان تجربة دفع مريحة وسريعة. ' : 'Mzar supports all secure and approved electronic payment methods within the Kingdom, ensuring a comfortable and fast payment experience.',
  },
//   {
//   icon: BellRing,
//   title: isAr ? "التواصل الفوري" : "Instant Communication",
//   description: isAr 
//     ? "ستصلك جميع التحديثات المتعلقة بحجزك فوراً عبر البريد الإلكتروني أو الرسائل النصية، بما في ذلك تأكيد الرحلة أو أي تعديل." 
//     : "You will receive all updates regarding your booking instantly via email or SMS, including trip confirmations or any modifications.",
// },
// {
//   icon: ShieldCheck,
//   title: isAr ? "الأمان المالي" : "Financial Security",
//   description: isAr 
//     ? "تتم جميع المعاملات المالية عبر بوابات دفع معتمدة وآمنة لضمان حماية بياناتك المصرفية." 
//     : "All financial transactions are conducted through certified and secure payment gateways to ensure the protection of your banking data.",
// },
  
];

  return (
    <section className="bg-white py-20 md:py-32" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
             {isAr ? "الحجوزات والمدفوعات" : "Bookings and Payments"}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            {isAr ? "قواعد واضحة لضمان عملية حجز سلسة وآمنة" : "Clear rules to ensure a smooth and secure booking process"}
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
              💳 {isAr ? "الأمان المالي" : "Financial Security"}
            </h3>
            <p className="text-lg leading-relaxed text-[#4a5568]">
             {isAr ? "تتم جميع المعاملات المالية عبر بوابات دفع معتمدة وآمنة. لا يحتفظ مزار بأي بيانات تخص بطاقتك الائتمانية على خوادمه." : "All financial transactions are conducted through certified and secure payment gateways. Mzar does not store any data related to your credit card on its servers."}
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#e8f4f0] to-[#f5f2ed] p-8">
            <h3 className="mb-4 text-2xl text-[#0d5940]">
              📧 {isAr ? "التواصل الفوري" : "Instant Communication"}
            </h3>
            <p className="text-lg leading-relaxed text-[#4a5568]">
              {isAr ? "ستصلك جميع التحديثات المتعلقة بحجزك فوراً عبر البريد الإلكتروني أو الرسائل النصية، بما في ذلك تأكيد الرحلة أو أي تعديل." : "You will receive all updates regarding your booking instantly via email or SMS, including trip confirmations or any modifications."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
