"use client";

import { useState, useRef } from "react";
import styles from "./CustomerStoriesSection.module.css";
import { 
  Check, 
  MessageCircle, 
  ArrowLeft, 
  ArrowRight,
  Star,
  Users,
  Globe,
  Heart
} from "lucide-react";

export default function CustomerStoriesSection({ lang = "ar" }) {
  const isAr = lang === "ar";
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const featuredStoryRef = useRef(null);

  const handleSelectStory = (originalIndex) => {
    setActiveStoryIndex(originalIndex);
    if (featuredStoryRef.current) {
      featuredStoryRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const WHATSAPP_NUMBER = "966580121025";
  const whatsappShareUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    isAr
      ? "مرحبًا مزار، أرغب في مشاركة تجربتي معكم"
      : "Hello Mzar, I would like to share my experience with you"
  )}`;

  const filters = [
    { id: "all", label: isAr ? "جميع القصص" : "All Stories" },
    { id: "umrah", label: isAr ? "باقات العمرة" : "Umrah Packages" },
    { id: "tours", label: isAr ? "جولات الحرمين" : "Two Holy Mosques" },
    { id: "family", label: isAr ? "العائلات" : "Families" },
    { id: "international", label: isAr ? "الزوار الدوليون" : "International" },
    { id: "transport", label: isAr ? "النقل" : "Transportation" },
  ];

  const PLACEHOLDER_YOUTUBE_URL = "https://www.youtube.com/embed/frw4Z53HxGc";

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const storiesData = [
    {
      id: "ahmed",
      categories: ["tours", "family"],
      name: isAr ? "أحمد وعائلته" : "Ahmed & Family",
      origin: isAr ? "السعودية · أغسطس 2026" : "Saudi Arabia · Aug 2026",
      avatar: isAr ? "أح" : "AH",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=86",
      youtubeUrl: PLACEHOLDER_YOUTUBE_URL,
      quote: isAr
        ? "“كانت الجولة مع مزار مختلفة تمامًا. أبنائي استمعوا إلى القصص أثناء المشي، وشعرنا جميعًا بقيمة كل مكان زرناه.”"
        : "“The tour with Mzar was truly exceptional. My children listened to the stories while walking, and we all felt the deep value of every holy site.”",
      tags: isAr
        ? ["عائلة من 5 ضيوف", "اللغة العربية", "مكة المكرمة"]
        : ["Family of 5", "Arabic Language", "Makkah"],
      experienceName: isAr ? "تجربة زيارة المشاعر المقدسة" : "Holy Sites Visit Experience",
      experienceLink: "/trip-detail/45",
    },
    {
      id: "fatima",
      categories: ["tours", "international"],
      name: isAr ? "فاطمة وعائلتها" : "Fatima & Family",
      origin: isAr ? "ماليزيا · يوليو 2026" : "Malaysia · Jul 2026",
      avatar: isAr ? "فا" : "FA",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=86",
      youtubeUrl: PLACEHOLDER_YOUTUBE_URL,
      quote: isAr
        ? "“استخدمت والدتي المرشد الصوتي بالملايو، بينما استمعت أنا بالإنجليزية. أكملنا الجولة معًا دون أن يفوتنا أي تفصيل تاريخي.”"
        : "“My mother used the Malay audio guide while I listened in English. We completed the tour together without missing any historical detail.”",
      tags: isAr
        ? ["عائلة من 4 ضيوف", "الملايو والإنجليزية", "الحرم المكي"]
        : ["Family of 4", "Malay & English", "Masjid Al-Haram"],
      experienceName: isAr ? "جولة المسجد الحرام الإثرائية" : "Masjid Al-Haram Enriching Tour",
      experienceLink: "/holy-sanctuaries-tours",
    },
    {
      id: "yousef",
      categories: ["umrah", "family"],
      name: isAr ? "يوسف ووالداه" : "Yousef & Parents",
      origin: isAr ? "الإمارات · يونيو 2026" : "UAE · Jun 2026",
      avatar: isAr ? "يو" : "YO",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=86",
      youtubeUrl: PLACEHOLDER_YOUTUBE_URL,
      quote: isAr
        ? "“كان برنامج العمرة منظمًا من الاستقبال حتى نهاية الرحلة، وناسب والديّ دون إرهاق أو انتظار طويل.”"
        : "“The Umrah program was well-organized from airport pickup to departure, perfectly suitable for my elderly parents without fatigue.”",
      tags: isAr
        ? ["3 ضيوف", "باقة متكاملة", "مكة والمدينة"]
        : ["3 Guests", "Full Package", "Makkah & Madinah"],
      experienceName: isAr ? "باقة عمرة السيرة" : "Seerah Umrah Package",
      experienceLink: "/umrah-packages",
    },
    {
      id: "omar",
      categories: ["transport", "international"],
      name: isAr ? "عمر خان" : "Omar Khan",
      origin: isAr ? "باكستان · مايو 2026" : "Pakistan · May 2026",
      avatar: isAr ? "عم" : "OK",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=86",
      youtubeUrl: PLACEHOLDER_YOUTUBE_URL,
      quote: isAr
        ? "“وصل السائق في الوقت المحدد، وكانت المركبة مناسبة للعائلة والأمتعة. انتقلنا بين مكة والمدينة براحة كاملة.”"
        : "“The driver arrived right on time, vehicle was immaculate and spacious for our luggage. Smooth, comfortable intercity transfer.”",
      tags: isAr
        ? ["عائلة من 6 ضيوف", "اللغة الأردية", "نقل بين المدن"]
        : ["Family of 6", "Urdu Language", "Intercity Transfer"],
      experienceName: isAr ? "النقل الخاص بين الحرمين" : "Private Intercity Transfer",
      experienceLink: "/transportation",
    },
  ];

  const currentStory = storiesData[activeStoryIndex] || storiesData[0];

  const filteredReviews = storiesData.slice(1).filter((item) => {
    if (selectedFilter === "all") return true;
    return item.categories.includes(selectedFilter);
  });

  const guestPhotos = [
    {
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=950&q=84",
      title: isAr ? "لحظة الوصول إلى الحرم" : "Arrival at the Holy Mosque",
      author: isAr ? "بعدسة أحمد" : "By Ahmed",
    },
    {
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=84",
      title: isAr ? "جولة المساء الإثرائية" : "Evening Tour",
      author: isAr ? "بعدسة فاطمة" : "By Fatima",
    },
    {
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=84",
      title: isAr ? "على طريق المسار التاريخي" : "On the Historical Trail",
      author: isAr ? "بعدسة يوسف" : "By Yousef",
    },
    {
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=84",
      title: isAr ? "رحلة العائلة بين الحرمين" : "Family Journey",
      author: isAr ? "بعدسة عمر" : "By Omar",
    },
  ];

  return (
    <section className={styles.storiesSection} id="stories">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "تجارب موثقة" : "Verified Stories"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "قصص حقيقية من ضيوف مزار" : "Real Stories from Mzar Guests"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "شاهد كيف عاش زوارنا تجاربهم في مكة والمدينة، بلغاتهم ومن وجهات نظرهم."
              : "See how our visitors experienced Makkah and Madinah, in their own words and languages."}
          </p>
        </div>

        {/* Stories Summary Strip */}
        <div className={styles.storiesSummary}>
          <div className={styles.summaryRating}>
            <strong>4.9</strong>
            <div>
              <div className={styles.starsRow}>★★★★★</div>
              <b>{isAr ? "متوسط تقييم الضيوف" : "Average Guest Rating"}</b>
              <small>{isAr ? "بناءً على تجارب موثقة" : "Based on verified reviews"}</small>
            </div>
          </div>
          <div className={styles.storyMetric}>
            <strong>+10,000</strong>
            <span>{isAr ? "زائر خاض التجربة" : "Visitors Experienced"}</span>
          </div>
          <div className={styles.storyMetric}>
            <strong>96%</strong>
            <span>{isAr ? "يوصون بمزار" : "Recommend Mzar"}</span>
          </div>
          <div className={styles.storyMetric}>
            <strong>7</strong>
            <span>{isAr ? "لغات استخدمها ضيوفنا" : "Languages Used"}</span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className={styles.storyFilters} aria-label={isAr ? "فئات القصص" : "Story Categories"}>
          {filters.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                className={`${styles.storyFilter} ${isActive ? styles.storyFilterActive : ""}`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Featured Story Card */}
        <article ref={featuredStoryRef} className={styles.featuredStory}>
          <div className={styles.storyMedia}>
            {currentStory.youtubeUrl ? (
              <iframe
                title={currentStory.name}
                src={getYouTubeEmbedUrl(currentStory.youtubeUrl)}
                className={styles.storyVideoIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <div 
                className={styles.storyFallbackImage}
                style={{ backgroundImage: `url('${currentStory.image}')` }}
              >
                <div className={styles.storyMediaOverlay} />
                <div className={styles.storyVideoLabel}>
                  {isAr ? "قصة الزائر · 01:15" : "Visitor Story · 01:15"}
                </div>
              </div>
            )}
          </div>

          <div className={styles.storyDetails}>
            <div>
              <span className={styles.verifiedBadge}>
                {isAr ? "✓ حجز موثّق عبر مزار" : "✓ Verified Mzar Booking"}
              </span>

              <div className={styles.storyProfile}>
                <span className={styles.storyAvatar}>{currentStory.avatar}</span>
                <div>
                  <strong>{currentStory.name}</strong>
                  <small>{currentStory.origin}</small>
                </div>
              </div>

              <blockquote className={styles.storyQuote}>
                {currentStory.quote}
              </blockquote>

              <div className={styles.storyTags}>
                {currentStory.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.storyBooking}>
              <div className={styles.bookingInfo}>
                <small>{isAr ? "التجربة التي اختارها الضيف" : "Selected Experience"}</small>
                <strong>{currentStory.experienceName}</strong>
              </div>
              <a className={styles.btnPrimary} href={currentStory.experienceLink}>
                <span>{isAr ? "استكشف التجربة" : "Explore Experience"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
            </div>
          </div>
        </article>

        {/* Review Cards Grid */}
        <div className={styles.reviewGrid}>
          {filteredReviews.map((story, index) => {
            const originalIndex = storiesData.findIndex((s) => s.id === story.id);
            const isActive = activeStoryIndex === originalIndex;
            return (
              <div
                key={story.id}
                className={`${styles.reviewCard} ${isActive ? styles.reviewCardActive : ""}`}
                onClick={() => handleSelectStory(originalIndex)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.reviewTop}>
                  <span className={styles.verifiedBadge}>
                    {isAr ? "✓ موثّق" : "✓ Verified"}
                  </span>
                  <span className={styles.reviewStars}>★★★★★</span>
                </div>
                <blockquote>{story.quote}</blockquote>
                <div className={styles.reviewPerson}>
                  <span className={styles.reviewAvatar}>{story.avatar}</span>
                  <div>
                    <strong>{story.name}</strong>
                    <small>{story.experienceName}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guest Photo Gallery */}
        <div className={styles.guestGallery}>
          <div className={styles.guestGalleryHeading}>
            <h3>{isAr ? "بعدسة ضيوف مزار" : "Captured by Mzar Guests"}</h3>
            <p>
              {isAr
                ? "لحظات التقطها زوارنا أثناء الجولات والمسارات."
                : "Moments captured by our guests during tours and trails."}
            </p>
            {/* 'عرض جميع الصور' link is omitted for now as requested */}
          </div>

          <div className={styles.guestPhotos}>
            {guestPhotos.map((photo, i) => (
              <div
                key={i}
                className={styles.guestPhoto}
                style={{ backgroundImage: `url('${photo.image}')` }}
              >
                <div className={styles.guestPhotoOverlay} />
                <div className={styles.guestCaption}>
                  <strong>{photo.title}</strong>
                  <small>{photo.author}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stories Bottom Action Buttons */}
        <div className={styles.storiesActions}>
          <a className={styles.btnPrimary} href="#featured-tours">
            <span>
              {isAr
                ? "استكشف التجارب التي اختارها ضيوفنا"
                : "Explore Experiences Chosen by Our Guests"}
            </span>
          </a>
          <a
            className={styles.btnOutline}
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{isAr ? "شارك تجربتك" : "Share Your Story"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
