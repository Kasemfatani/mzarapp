import { Share2, Link2, Bookmark, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function ShareSave({ isAr }) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent( isAr ? 'اقرأ هذا المقال الرائع من مزار' : 'Read this amazing article from Mzar');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  return (
    <section className="bg-[#f5f2ed] py-12 md:py-16" >
      <div className="container mx-auto max-w-3xl px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-md">
          <div className="mb-6 text-center">
            <h3 className="text-2xl text-[#3C6652]">
               {isAr ? "شارك المقال أو احفظه" : "Share or Save the Article"}
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Share Button */}
            <button className="group flex items-center gap-3 rounded-full bg-[#e8f2ed] px-6 py-3 transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-lg">
              <Share2 className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-lg">{isAr ? "مشاركة" : "Share"}</span>
            </button>

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="group flex items-center gap-3 rounded-full bg-[#e8f2ed] px-6 py-3 transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-lg"
            >
              <Link2 className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-lg">
                 {copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الرابط' : 'Copy Link')}
              </span>
            </button>

            {/* Save Button */}
            {/* <button
              onClick={handleSave}
              className={`group flex items-center gap-3 rounded-full px-6 py-3 transition-all hover:shadow-lg ${
                saved
                  ? 'bg-[#3C6652] text-white'
                  : 'bg-[#e8f2ed] text-[#3C6652] hover:bg-[#3C6652] hover:text-white'
              }`}
            >
              <Bookmark
                className="h-5 w-5"
                strokeWidth={2.5}
                fill={saved ? 'currentColor' : 'none'}
              />
              <span className="text-lg">
                  {saved ? (isAr ? 'تم الحفظ' : 'Saved') : (isAr ? 'حفظ للقراءة لاحقاً' : 'Save for Later')}
              </span>
            </button> */}

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppShare}
              className="group flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-white transition-all hover:bg-[#1da851] hover:shadow-lg"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-lg">{isAr ? "واتساب" : "WhatsApp"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
