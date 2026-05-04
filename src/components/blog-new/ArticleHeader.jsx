import { Clock, Calendar, Eye } from 'lucide-react';



export function ArticleHeader({
  
  title,
  subtitle,
  readTime,
  publishDate,
  views, 
  isAr,
}) {
  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <header className="bg-gradient-to-b from-[#f5f2ed] to-white py-16 md:py-24" >
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        {/* Category Badge */}
        {/* <div className="mb-8 flex justify-center">
          <span className="rounded-full bg-[#3C6652] px-6 py-2 text-lg text-white">
            {category}
          </span>
        </div> */}

        {/* Title */}
        <h1 className="mb-6 text-center text-4xl leading-tight text-[#3C6652] md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mb-10 text-center text-xl leading-relaxed text-[#718096] md:text-2xl">
            {subtitle}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-[#718096]">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#867957]" strokeWidth={2.5} />
            <span>{readTime}  {isAr ? "دقائق قراءة" : "minutes read"}</span>
          </div>
          {/* <span className="h-1 w-1 rounded-full bg-[#718096]" /> */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#867957]" strokeWidth={2.5} />
            <span>{publishDate}</span>
          </div>
          {/* <span className="h-1 w-1 rounded-full bg-[#718096]" /> */}
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-[#867957]" strokeWidth={2.5} />
            <span>{formatViews(views)} {isAr ? "مشاهدة" : "view"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
