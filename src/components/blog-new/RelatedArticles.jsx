import { Clock, ArrowLeft } from 'lucide-react';
import { articles } from '@/components/blogs/articles';

export function RelatedArticles({ isAr }) {



  const relatedArticles = articles.slice(1, 4);

  const getImageUrl = (imageName) => {
    const imageMap = {
      'medina-mosque': 'https://images.unsplash.com/photo-1692566123227-0f68f1b9dac6?w=800',
      'umrah-guide': 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?w=800',
      'hira-cave': 'https://images.unsplash.com/photo-1674313505558-206662f3de03?w=800',
    };
    return imageMap[imageName] || 'https://images.unsplash.com/photo-1720549973451-018d3623b55a?w=800';
  };

  return (
    <section className="bg-[#f5f2ed] py-16 md:py-24" >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
           {isAr ? "مقالات ذات صلة" : "Related Articles"}
          </h2>
          <p className="text-xl text-[#718096]">
           {isAr ? "استمر في رحلتك المعرفية" : "Continue your knowledge journey"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {relatedArticles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={getImageUrl(article.image)}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-[#3C6652] px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-4 line-clamp-2 text-2xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
                  {article.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-base text-[#718096]">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} {isAr ? "دقائق" : "minutes"}</span>
                  </div>
                  <button className="flex items-center gap-2 text-lg text-[#3C6652] transition-colors hover:text-[#867957]">
                    <span>{isAr ? "اقرأ المقال" : "Read Article"}</span>
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
