import { Clock, ArrowLeft } from 'lucide-react';


export function FeaturedArticles({ isAr , articles }) {

  const featuredArticles = articles.filter((article) => article.featured);
  const mainFeatured = featuredArticles[0];
  const secondaryFeatured = featuredArticles.slice(1, 3);

  const getImageUrl = (imageName) => {
    const imageMap = {
      'mecca-landmarks': 'https://images.unsplash.com/photo-1720549973451-018d3623b55a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNjYSUyMGthYWJhJTIwbW9zcXVlfGVufDF8fHx8MTc2NTk1ODE5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'medina-mosque': 'https://images.unsplash.com/photo-1692566123227-0f68f1b9dac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpbmElMjBwcm9waGV0JTIwbW9zcXVlfGVufDF8fHx8MTc2NTk4Njk0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'umrah-guide': 'https://images.unsplash.com/photo-1571909552531-1601eaec8f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcGlsZ3JpbWFnZSUyMHVtcmFofGVufDF8fHx8MTc2NTk4Njk0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    };
    return imageMap[imageName] || imageMap['mecca-landmarks'];
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
            {isAr ? "مقالات مميزة" : "Featured Articles"}
          </h2>
          <p className="text-xl text-[#718096]">
            {isAr ? "أبرز المقالات الشاملة لتعميق معرفتك" : "Top comprehensive articles to deepen your knowledge"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Featured Article */}
          {mainFeatured && (
            <div className="group lg:col-span-2">
              <article className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-80 overflow-hidden lg:h-96">
                  <img
                    src={getImageUrl(mainFeatured.image)}
                    alt={mainFeatured.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute right-6 top-6">
                    <span className="rounded-full bg-[#3C6652] px-5 py-2 text-sm text-white backdrop-blur-sm">
                      {mainFeatured.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="mb-4 text-3xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
                    {mainFeatured.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-xl leading-relaxed text-[#4a5568]">
                    {mainFeatured.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-lg text-[#718096]">
                      <Clock className="h-5 w-5" />
                      <span>{mainFeatured.readTime} {isAr ? "دقائق قراءة" : "min read"}</span>
                    </div>
                    <button className="group/btn flex items-center gap-2 text-xl text-[#3C6652] transition-colors hover:text-[#867957]">
                      <span>{isAr ? "اقرأ المقال" : "Read Article"}</span>
                      <ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Secondary Featured Articles */}
          <div className="space-y-8">
            {secondaryFeatured.map((article) => (
              <article
                key={article.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(article.image)}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-[#3C6652] px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 line-clamp-2 text-xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-base text-[#718096]">
                      <Clock className="h-4 w-4" />
                      <span>{article.readTime} {isAr ? "دقائق" : "min"}</span>
                    </div>
                    <button className="text-lg text-[#3C6652] transition-colors hover:text-[#867957]">
                      {isAr ? "اقرأ ←" : "Read →"} 
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
