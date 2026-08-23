"use client";

import { useState, useEffect } from "react";
import styles from "./HomeBlogInsightsSection.module.css";
import { Clock, Eye, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_URL } from "@/lib/apiConfig";

const extractArticles = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.blogs) && data.blogs.length > 0) return data.blogs;
  if (Array.isArray(data.featured) && data.featured.length > 0) return data.featured;
  return [];
};

export default function HomeBlogInsightsSection({ lang = "ar", initialBlogs = null }) {
  const isAr = lang === "ar";
  const initialList = extractArticles(initialBlogs);
  const [blogs, setBlogs] = useState(initialList.length > 0 ? initialList.slice(0, 3) : []);
  const [loading, setLoading] = useState(initialList.length === 0);

  const fallbackArticles = [
    {
      id: 1,
      slug: "mecca-landmarks",
      title: isAr
        ? "أهم معالم مكة المكرمة التاريخية والدينية"
        : "Most Important Historical and Religious Landmarks of Makkah",
      subtitle: isAr
        ? "دليل شامل لأبرز المعالم التي يمكنك زيارتها خلال رحلتك إلى مكة المكرمة."
        : "A comprehensive guide to the prominent landmarks to explore during your Makkah trip.",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
      readTime: 5,
      views: 1200,
    },
    {
      id: 2,
      slug: "hira-cave-trail",
      title: isAr
        ? "مسار غار حراء وجبل النور: قصة بداية الوحي"
        : "Cave of Hira & Jabal Al-Nour Trail: The Dawn of Revelation",
      subtitle: isAr
        ? "تعرف على تاريخ غار حراء ونصائح عملية لصعود جبل النور واستكشاف مرافقه الحديثة."
        : "Discover the history of Cave Hira with practical tips for visiting Jabal Al-Nour.",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
      readTime: 4,
      views: 950,
    },
    {
      id: 3,
      slug: "smart-audio-guide",
      title: isAr
        ? "كيف يثري المرشد الصوتي الذكي زيارتك للمشاعر المقدسة؟"
        : "How the Smart Audio Guide Enriches Your Holy Sites Visit",
      subtitle: isAr
        ? "استكشف كيف تجعل التقنيات الحديثة واللغات المتعددة من رحلتك تجربة تفاعلية ملهمة."
        : "Explore how location-aware audio technology and multiple languages transform your pilgrimage.",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80",
      readTime: 6,
      views: 1420,
    },
  ];

  useEffect(() => {
    const list = extractArticles(initialBlogs);
    if (list.length > 0) {
      setBlogs(list.slice(0, 3));
      setLoading(false);
      return;
    }

    async function fetchBlogs() {
      try {
        const res = await fetch(`${BLOG_URL}/api/blogs`, {
          headers: { lang },
        });
        if (res.ok) {
          const json = await res.json();
          const items = extractArticles(json?.data);
          if (items.length > 0) {
            setBlogs(items.slice(0, 3));
          } else {
            setBlogs(fallbackArticles);
          }
        } else {
          setBlogs(fallbackArticles);
        }
      } catch (e) {
        setBlogs(fallbackArticles);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [lang, initialBlogs]);

  const displayArticles = blogs && blogs.length > 0 ? blogs : fallbackArticles;

  const getArticleImage = (article) => {
    if (article.featuredImage) {
      return article.featuredImage.startsWith("http")
        ? article.featuredImage
        : `${BLOG_URL}${article.featuredImage}`;
    }
    if (article.image && article.image.startsWith("http")) {
      return article.image;
    }
    return fallbackArticles[0].image;
  };

  const formatViews = (views) => {
    if (!views) return "0";
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return String(views);
  };

  return (
    <section className={styles.insightsSection} id="insights">
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>
            {isAr ? "دليل الزائر" : "Visitor Guide"}
          </span>
          <h2 className={styles.title}>
            {isAr ? "محتوى يساعدك قبل الرحلة" : "Helpful Guides Before Your Trip"}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? "إجابات عملية ومسارات مقترحة لتخطيط زيارة أكثر سهولة ووعيًا."
              : "Practical insights and recommended routes to plan a smoother and more meaningful journey."}
          </p>
        </div>

        {/* Dynamic 3 Articles Grid */}
        <div className={styles.articlesGrid}>
          {displayArticles.map((article, idx) => (
            <article key={article.slug || article.id || idx} className={styles.articleCard}>
              <div className={styles.imageWrapper}>
                <a href={`/blog/${article.slug || ""}`} className="absolute inset-0 z-10" />
                <img
                  src={getArticleImage(article)}
                  alt={article.title}
                  className={styles.articleImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay} />
              </div>

              <div className={styles.cardContent}>
                <a href={`/blog/${article.slug || ""}`}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                </a>
                <p className={styles.articleSubtitle}>{article.subtitle || article.excerpt}</p>

                <div className={styles.cardFooter}>
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <Clock className="w-4 h-4 text-[#aa9256]" />
                      <span>
                        {article.readTime || 5} {isAr ? "دقائق" : "mins"}
                      </span>
                    </div>
                    <div className={styles.metaItem}>
                      <Eye className="w-4 h-4 text-[#aa9256]" />
                      <span>{formatViews(article.views || 850)}</span>
                    </div>
                  </div>

                  <a href={`/blog/${article.slug || ""}`} className={styles.readMoreLink}>
                    <span>{isAr ? "اقرأ المقال" : "Read Article"}</span>
                    {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Link below the cards to /blogs page */}
        <div className={styles.blogsAction}>
          <a href="/blogs" className={styles.btnViewAll}>
            <BookOpen className="w-5 h-5" />
            <span>{isAr ? "عرض جميع المقالات" : "View All Articles"}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
        </div>
      </div>
    </section>
  );
}
