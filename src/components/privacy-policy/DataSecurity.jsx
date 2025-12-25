import { Lock, Server, Shield, Eye } from 'lucide-react';



export function DataSecurity({ isAr }) {

  const securityFeatures = [
  {
    icon: Lock,
    title: isAr ? 'تشفير متقدم' : 'Advanced Encryption',
    description: isAr ? 'جميع بياناتك محمية بتشفير SSL/TLS' : 'All your data is protected with SSL/TLS encryption',
  },
  {
    icon: Server,
    title: isAr ? 'خوادم آمنة' : 'Secure Servers',
    description: isAr ? 'نستخدم خوادم سحابية عالمية معتمدة' : 'We use certified global cloud servers',
  },
  {
    icon: Shield,
    title: isAr ? 'حماية متعددة الطبقات' : 'Multi-layered Protection',
    description: isAr ? 'أنظمة دفاع متطورة ضد الاختراقات' : 'Advanced defense systems against breaches',
  },
  {
    icon: Eye,
    title: isAr ? 'مراقبة مستمرة' : 'Continuous Monitoring',
    description: isAr ? 'فريق أمن سيبراني يعمل على مدار الساعة' : 'A cybersecurity team works around the clock',
  },
];

  return (
    <section className="bg-white py-20 md:py-32" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Trust Box */}
        <div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d5940] to-[#116149] p-12 text-center shadow-2xl md:p-16">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#c9a961] shadow-xl">
            <Lock className="h-12 w-12 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="mb-6 text-4xl text-white md:text-5xl">
             {isAr ? 'أمان بياناتك أولويتنا' : 'Your Data Security is Our Priority'}
          </h2>
          <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95">
            {isAr ? 'نستخدم تقنيات تشفير وحماية عالية المستوى لضمان أمان بياناتك وحمايتها من أي وصول غير مصرح.' : 'We use high-level encryption and protection technologies to ensure the security of your data and protect it from any unauthorized access.'}
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
            {isAr ? '✓ متوافق مع المعايير الدولية لحماية البيانات والخصوصية' : '✓ Compliant with international data protection and privacy standards'}
          </p>
        </div>
      </div>
    </section>
  );
}
