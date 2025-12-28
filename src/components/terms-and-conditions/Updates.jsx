import { Bell, Calendar, Mail } from 'lucide-react';

export function Updates( { isAr }) {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
            تحديثات الشروط
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            كيف نُبقيك على اطلاع بأي تغييرات
          </p>
        </div>

        {/* Main Notice Box */}
        <div className="overflow-hidden rounded-3xl border-2 border-[#c9a961] bg-gradient-to-br from-[#e8f4f0] to-white shadow-xl">
          <div className="bg-gradient-to-r from-[#0d5940] to-[#116149] px-10 py-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a961]">
                <Bell className="h-8 w-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl text-white">
                إشعار مهم
              </h3>
            </div>
          </div>

          <div className="p-10">
            <p className="mb-8 text-2xl leading-relaxed text-[#0d5940]">
              قد يتم تحديث شروط الاستخدام من وقت لآخر لتحسين الخدمة أو الامتثال للتشريعات الجديدة. <strong>سيتم إشعارك بأي تغييرات جوهرية.</strong>
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-[#f5f2ed] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-[#c9a961]" strokeWidth={2.5} />
                  <h4 className="text-xl text-[#0d5940]">
                    فترة الإشعار
                  </h4>
                </div>
                <p className="text-lg leading-relaxed text-[#4a5568]">
                  سيتم إشعارك قبل <strong>30 يومًا</strong> على الأقل من دخول التغييرات حيز التنفيذ
                </p>
              </div>

              <div className="rounded-2xl bg-[#f5f2ed] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-[#c9a961]" strokeWidth={2.5} />
                  <h4 className="text-xl text-[#0d5940]">
                    طريقة الإشعار
                  </h4>
                </div>
                <p className="text-lg leading-relaxed text-[#4a5568]">
                  سيتم إرسال إشعار إلى بريدك الإلكتروني المسجل وعرض تنبيه في المنصة
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#e8f4f0] p-6">
              <p className="text-lg leading-relaxed text-[#0d5940]">
                ✓ <strong>استمرارك في استخدام المنصة</strong> بعد التحديثات يعني موافقتك على الشروط الجديدة
              </p>
            </div>
          </div>
        </div>

        {/* Version History */}
        <div className="mt-12 rounded-3xl bg-[#f5f2ed] p-8 text-center">
          <p className="text-xl text-[#4a5568]">
            📋 يمكنك الاطلاع على سجل التحديثات السابقة وتواريخ التعديلات في أي وقت
          </p>
        </div>
      </div>
    </section>
  );
}
