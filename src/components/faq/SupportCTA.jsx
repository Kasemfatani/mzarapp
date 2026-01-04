import { MessageCircle, Mail } from 'lucide-react';

export function SupportCTA({isAr}) {

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-6 text-4xl text-[#0d5940] md:text-5xl">
           {isAr ? "لم تجد إجابتك؟" : "Didn't find your answer?"}
        </h2>

        <p className="mb-12 text-2xl leading-relaxed text-[#4a5568]">
          {isAr ? "فريقنا جاهز لمساعدتك في أي وقت." : "Our team is ready to assist you at any time."}
        </p>

        <div className="flex flex-col justify-center gap-5 sm:flex-row">
          <a href="/contact-us#contact-us-form" className="group flex items-center justify-center gap-3 rounded-full bg-[#0d5940] px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-[#116149] hover:shadow-xl">
            <span>{isAr ? "تواصل معنا" : "Contact Us"}</span>
            <Mail className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </a>

          <a href="https://wa.me/+966580121025" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-full border-2 border-[#0d5940] bg-transparent px-10 py-5 text-xl text-[#0d5940] transition-all duration-300 hover:bg-[#0d5940] hover:text-white hover:shadow-xl">
            <span>{isAr ? "الدردشة المباشرة" : "Live Chat"}</span>
            <MessageCircle className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
