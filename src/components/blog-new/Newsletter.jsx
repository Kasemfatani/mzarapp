"use client";

import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export function Newsletter({ isAr }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="bg-[#f5f2ed] py-16 md:py-24" >
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#3C6652] to-[#2d4d3d] shadow-2xl">
          <div className="px-10 py-12 text-center md:px-16 md:py-16">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#867957]">
              <Mail className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h2 className="mb-4 text-3xl text-white md:text-4xl">
              {isAr ? "اشترك ليصلك كل جديد من مزار" : "Subscribe to get the latest from Mzar"}
            </h2>

            {/* Subtitle */}
            <p className="mb-10 text-xl leading-relaxed text-white/90">
              {isAr ? "مقالات، قصص، وعروض حصرية مرتبطة بالجولات — كل أسبوع في بريدك" : "Articles, stories, and exclusive offers related to trips — every week in your inbox"}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <Mail className="h-5 w-5 text-[#718096]" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                    className="w-full rounded-full border-2 border-transparent bg-white py-4 pr-12 pl-6 text-lg text-[#3C6652] placeholder:text-[#718096] focus:border-[#867957] focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 rounded-full bg-[#867957] px-8 py-4 text-xl text-white transition-all hover:bg-[#E7D3AF] hover:text-[#3C6652] hover:shadow-xl"
                >
                  <span>{isAr ? "اشترك الآن" : "Subscribe Now"}</span>
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Privacy Note */}
              <p className="mt-6 text-base text-white/70">
                🔒 {isAr ? "بدون إزعاج — يمكنك الإلغاء في أي وقت • نحترم خصوصيتك" : "No spam — you can unsubscribe at any time • We respect your privacy"}
              </p>
            </form>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 border-t border-white/20 pt-8">
              <div className="text-center">
                <p className="mb-1 text-3xl text-[#867957]">5,000+</p>
                <p className="text-base text-white/80" >{isAr ? "مشترك نشط" : "Active Subscribers"}</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-3xl text-[#867957]">98%</p>
                <p className="text-base text-white/80">{isAr ? "معدل الرضا" : "Satisfaction Rate"}</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-3xl text-[#867957]">{isAr ? "أسبوعية" : "Weekly"}</p>
                <p className="text-base text-white/80">{isAr ? "رسالة واحدة" : "One Message"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
