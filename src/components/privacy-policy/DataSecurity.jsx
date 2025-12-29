import { Lock, Server, Shield, Eye } from 'lucide-react';



export function DataSecurity({ isAr }) {

  const securityFeatures = [
  {
    icon: Lock,
    title: isAr ? 'تشفير متقدم' : 'Advanced Encryption',
    description: isAr ? 'جميع بياناتك الشخصية والمعاملات المالية مشفّرة بتقنيات SSL/TLS المعتمدة عالمياً لضمان انتقال آمن بينك وبين أنظمتنا. ' : 'All your personal data and financial transactions are encrypted with globally recognized SSL/TLS technologies to ensure secure transmission between you and our systems.',
  },
  {
    icon: Server,
    title: isAr ? 'خوادم آمنة' : 'Secure Servers',
    description: isAr ? 'خزَّن معلوماتك في خوادم سحابية معتمدة وموثوقة ضمن مراكز بيانات مؤمنة تلتزم بالمعايير الدولية للأمن السيبراني. ' : 'We use certified global cloud servers located in secure data centers that comply with international cybersecurity standards.',
  },
  {
    icon: Shield,
    title: isAr ? 'حماية متعددة الطبقات' : 'Multi-layered Protection',
    description: isAr ? 'نطبّق أنظمة دفاع متطورة ضد الاختراقات والهجمات الإلكترونية، تشمل جدران حماية، ونظام مراقبة حركة البيانات في الوقت الفعلي. ' : 'We implement advanced defense systems against breaches and cyber attacks, including firewalls and real-time data traffic monitoring systems.',
  },
  {
    icon: Eye,
    title: isAr ? 'مراقبة مستمرة' : 'Continuous Monitoring',
    description: isAr ? 'يعمل فريق أمن سيبراني متخصص على مدار الساعة لمراقبة الأنظمة واكتشاف أي نشاط غير اعتيادي قبل أن يؤثر على المستخدمين. ' : 'A dedicated cybersecurity team works around the clock to monitor systems and detect any unusual activity before it affects users.',
  },
];

  return (
    <section className="bg-white py-12 " >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Trust Box */}
        <div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d5940] to-[#116149] p-12 text-center shadow-2xl md:p-16">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#c9a961] shadow-xl">
            <Lock className="h-12 w-12 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="mb-6 text-4xl text-white md:text-5xl">
             {isAr ? 'أمان بياناتك أولويتنا' : 'Your Data Security is Our Priority'}
          </h2>
          <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95 mb-4">
            {isAr ? 'نحرص في مزار على تطبيق أعلى معايير الأمان والخصوصية لحماية بيانات مستخدمينا، باستخدام تقنيات تشفير متقدمة وأنظمة حماية متعددة المستويات، لضمان حفظ معلوماتك من أي وصول غير مصرح به.' : 'We at Mzar are committed to implementing the highest standards of security and privacy to protect our users\' data, using advanced encryption technologies and multi-layered protection systems to ensure your information is safeguarded from any unauthorized access.'}
          </p>
          <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95">
            {isAr ? 'نستخدم أحدث أنظمة الأمان الرقمية المعتمدة دولياً لضمان أن تكون تجربتك معنا آمنة في كل خطوة ــ من تصفح الموقع وحتى إتمام الحجز.' : 'We utilize the latest internationally certified digital security systems to ensure that your experience with us is safe at every step — from browsing the site to completing your booking.'}
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-3xl bg-[#f5f2ed] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d5940]">
                  <Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 text-xl text-[#0d5940]">
                  {feature.title}
                </h3>
                <p className="text-lg leading-relaxed text-[#718096]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Compliance Badge */}
        <div className="mt-16 rounded-3xl border-2 border-[#c9a961] bg-[#e8f4f0] p-8 text-center">
          <p className="text-xl text-[#0d5940]">
            {isAr ? '✓ متوافق مع المعايير الدولية لحماية البيانات' : '✓ Compliant with International Data Protection Standards'}
          </p>
        </div>
      </div>
    </section>
  );
}
