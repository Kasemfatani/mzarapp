

export function FeaturedImage({ image, caption , BLOG_URL }) {
  

  return (
    <section className="bg-white pb-8 md:pb-12" >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
       <img
            src={`${BLOG_URL}${image}`}
            alt="Featured article image"
            className="h-auto w-full md:w-[500px] object-cover mx-auto " 
          />
        {caption && (
          <p className="mt-4 text-center text-lg text-[#718096]">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
