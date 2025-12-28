import { Clock, Eye, ArrowLeft } from 'lucide-react';
// import { Article } from '../../data/articles';


export function ArticlesGrid({ articles , isAr }) {
  const getImageUrl = (imageName) => {
    const imageMap = {
      'mecca-landmarks': 'https://images.unsplash.com/photo-1720549973451-018d3623b55a?w=800',
      'medina-mosque': 'https://images.unsplash.com/photo-1692566123227-0f68f1b9dac6?w=800',
      'umrah-guide': 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?w=800',
      'hira-cave': 'https://images.unsplash.com/photo-1674313505558-206662f3de03?w=800',
      'visitor-tips': 'https://images.unsplash.com/photo-1600383963284-91ef78fc9b6d?w=800',
      'quba-mosque': 'https://images.unsplash.com/photo-1600383963284-91ef78fc9b6d?w=800',
      'tawaf-experience': 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?w=800',
      'hijra-path': 'https://images.unsplash.com/photo-1615380098674-d28bf1a87cd3?w=800',
      'rawdah': 'https://images.unsplash.com/photo-1765892272462-bad4a8ba0fb9?w=800',
      'uhud-mountain': 'https://images.unsplash.com/photo-1674313505558-206662f3de03?w=800',
      'spiritual-preparation': 'https://images.unsplash.com/photo-1665627394215-36d931bb8db7?w=800',
      'baqi-cemetery': 'https://images.unsplash.com/photo-1600383963284-91ef78fc9b6d?w=800',
    };
    return imageMap[imageName] || imageMap['mecca-landmarks'];
  };

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <section className="bg-[#f5f2ed] py-16 md:py-24" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
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
                  loading="lazy"
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
                <h3 className="mb-3 line-clamp-2 text-2xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
                  {article.title}
                </h3>

                <p className="mb-6 line-clamp-2 text-lg leading-relaxed text-[#4a5568]">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-4">
                  <div className="flex items-center gap-4 text-base text-[#718096]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime}  {isAr ? "دقائق" : "minutes"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(article.views)}</span>
                    </div>
                  </div>

                  <button className="group/link flex items-center gap-2 text-lg text-[#3C6652] transition-colors hover:text-[#867957]">
                    <span className="relative after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-0 after:bg-[#867957] after:transition-all after:duration-300 group-hover/link:after:w-full">
                      {isAr ? "اقرأ المزيد" : "Read More"}
                    </span>
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover/link:-translate-x-1" />
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
