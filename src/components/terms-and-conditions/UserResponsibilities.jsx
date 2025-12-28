import { CheckCircle2, UserCheck, Shield, Users, AlertCircle, Clock } from 'lucide-react';



export function UserResponsibilities( { isAr }) {

  const responsibilities = [
  {
    icon: UserCheck,
    title: 'إدخال بيانات صحيحة',
    description: 'يجب تسجيل معلومات دقيقة وصحيحة عند إنشاء الحساب أو إجراء أي حجز، لتفادي أي خطأ في عملية التواصل أو التأكيد. ',
  },
  {
    icon: CheckCircle2,
    title: 'الالتزام بتعليمات الجولة',
    description: 'اتباع جميع التعليمات والإرشادات المقدمة من المرشد أو منظم الرحلة',
  },
  {
    icon: Users,
    title: 'احترام المرشدين والمنظمين',
    description: 'التعامل بأدب واحترام مع جميع الموظفين ومقدمي الخدمات',
  },
  {
    icon: Shield,
    title: 'المحافظة على السلامة',
    description: 'الالتزام بإجراءات السلامة واحترام قواعد الأماكن المزارة',
  },
  {
    icon: Clock,
    title: 'الالتزام بالمواعيد',
    description: 'الحضور في الوقت المحدد وعدم التأخر عن موعد الرحلة',
  },
  {
    icon: AlertCircle,
    title: 'الإبلاغ عن المشاكل',
    description: 'إبلاغنا فوراً بأي مشكلة أو طارئ خلال الرحلة',
  },
];


  return (
    <section className="bg-[#f5f2ed] py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
            مسؤوليات المستخدم
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            التزامات بسيطة لضمان تجربة ممتعة وآمنة للجميع
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {responsibilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[#e8f4f0]">
                    <Icon className="h-7 w-7 text-[#0d5940]" strokeWidth={2.5} />
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 text-2xl text-[#0d5940]">
                  {item.title}
                </h3>
                <p className="text-lg leading-relaxed text-[#4a5568]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Important Note */}
        <div className="mt-12 rounded-3xl border-2 border-[#c9a961] bg-white p-8 text-center">
          <p className="text-xl leading-relaxed text-[#0d5940]">
            ⚠️ <strong>تنبيه:</strong> عدم الالتزام بهذه المسؤوليات قد يؤدي إلى إلغاء الحجز أو منع الاستخدام المستقبلي للمنصة
          </p>
        </div>
      </div>
    </section>
  );
}
