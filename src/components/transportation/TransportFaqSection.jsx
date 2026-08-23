"use client";

import styles from "./TransportFaqSection.module.css";
import { ChevronDown } from "lucide-react";

export default function TransportFaqSection({ lang = "ar" }) {
  const isAr = lang === "ar";

  const faqs = [
    {
      q: isAr
        ? "ماذا يحدث عند تأخر وصول الطائرة عن الموعد المحدد؟"
        : "What happens if our flight arrival is delayed?",
      a: isAr
        ? "يتابع فريق العمليات رحلتكم بدقة عبر نظام تتبع الرحلات المباشر، ويتم تحديث وقت حضور السائق تلقائيًا ليتطابق مع موعد هبوط الطائرة الفعلي دون أي قلق."
        : "Our operations team monitors your flight live and adjusts the driver's pickup schedule automatically according to your actual touchdown time.",
    },
    {
      q: isAr
        ? "أين وكيف ألتقي بالسائق عند الخروج من صالة المطار؟"
        : "Where and how do I meet the driver at the airport?",
      a: isAr
        ? "تصلك رسالة عبر واتساب مسبقًا تتضمن اسم ورقم هاتف السائق ورقم لوحة المركبة بالإضافة إلى تحديد دقيق لنقطة الالتقاء داخل صالة الوصول أو عند البوابة المحددة."
        : "You will receive a WhatsApp notification in advance with the driver's contact, vehicle details, and the designated meeting point inside the arrival hall.",
    },
    {
      q: isAr
        ? "هل تتوفر لديكم مركبات تتسع للمجموعات الكبيرة وحملات العمرة؟"
        : "Are there vehicles suitable for large groups and Umrah campaigns?",
      a: isAr
        ? "نعم، يتضمن أسطول مزار حافلات صغيرة تتسع لـ 18 راكبًا وحافلات سياحية VIP تتسع لـ 49 راكبًا مجهزة بمساحات تخزين سفلية واسعة لتلبية احتياجات كافة المجموعات."
        : "Yes, our fleet includes 18-passenger minibuses and 49-seater VIP luxury coaches equipped with ample luggage compartments.",
    },
    {
      q: isAr
        ? "هل يمكن طلب تجهيزات خاصة مثل كراسي الأطفال أو كراسي ذوي الإعاقة؟"
        : "Can we request special amenities like child seats or wheelchairs?",
      a: isAr
        ? "بكل تأكيد، يمكنكم طلب كراسي الأطفال، كراسي كبار السن وذوي الإعاقة، أو لوحات الاستقبال الخاصة عند التواصل مع فريق الدعم أثناء ترتيب الحجز."
        : "Certainly, child safety seats, wheelchair assistance, or personalized signboards can be easily arranged upon request during booking.",
    },
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "أسئلة عن الخدمة" : "Frequently Asked Questions"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "كل ما تحتاج معرفته عن التنقل" : "Everything You Need to Know"}
          </h2>
        </div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <details key={index} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 ${styles.chevronIcon}`} />
              </summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
