import { Mail, MessageCircle, FileText } from 'lucide-react';

export function ContactCTA({ isAr }) {

  return (
    <section className="bg-gradient-to-br from-[#0d5940] to-[#116149] py-20 md:py-32">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="mb-8">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#c9a961]">
            <MessageCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="mb-6 text-4xl text-white md:text-5xl">
          {isAr ? 'هل لديك استفسار بخصوص الخصوصية؟' : 'Do you have a privacy-related inquiry?'}
        </h2>

        <p className="mb-12 text-2xl leading-relaxed text-white/90">
         {isAr ? 'فريقنا جاهز للإجابة على جميع أسئلتك بشفافية كاملة' : 'Our team is ready to answer all your questions with full transparency'}
        </p>

        <div className="mb-12 flex flex-col justify-center gap-5 sm:flex-row">
          <button className="group flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-xl text-[#0d5940] transition-all duration-300 hover:bg-[#c9a961] hover:text-white hover:shadow-2xl">
            <span>{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
            <Mail className="h-6 w-6 transition-transform group-hover:scale-110" />
          </button>

          <a href="/faq" className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-transparent px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-white hover:text-[#0d5940] hover:shadow-2xl">
            <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
            <FileText className="h-6 w-6" />
          </a>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6 border-t border-white/20 pt-12 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-lg text-white/70">{isAr ? 'البريد الإلكتروني' : 'Email'}</p>
            <p className="text-xl text-white">privacy@mazah.sa</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-lg text-white/70">{isAr ? 'وقت الاستجابة' : 'Response Time'}</p>
            <p className="text-xl text-white">{isAr ? 'خلال 24-48 ساعة' : 'Within 24-48 hours'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
