

export function FeaturedImage({ image, caption }) {
  const imageMap = {
    'mecca-landmarks': 'https://images.unsplash.com/photo-1617182195886-21a605900f11?w=1600',
  };

  const imageUrl = imageMap[image] || imageMap['mecca-landmarks'];

  return (
    <section className="bg-white pb-8 md:pb-12" >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <img
            src={imageUrl}
            alt="Featured article image"
            className="h-auto w-full object-cover"
          />
        </div>
        {caption && (
          <p className="mt-4 text-center text-lg text-[#718096]">
            {caption}
          </p>
        )}
      </div>
    </section>
  );
}
