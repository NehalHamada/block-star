export function FeatureSection({ cards }) {
  return (
    <section className="max-w-7xl mx-auto py-5 px-4 font-cairo">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {cards?.map((feature, index) => (
          <FeatureItem
            key={feature.id ?? index}
            {...feature}
            imageUp={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
export function FeatureItem({
  title,
  description,
  image_url,
  imageUp = false,
}) {
  return (
    <div className="flex flex-col items-center gap-7 ">
      {/* Text */}
      <div
        className={`flex flex-col items-center text-center max-w-md px-4 lg:px-0 lg:w-1/2
          order-1
          ${imageUp ? "md:order-2" : "md:order-1"}
        `}
      >
        <p className="text-xl md:text-2xl font-semibold mb-4">{title}</p>
        <p className="leading-relaxed text-dark-gray">{description}</p>
      </div>

      {/* Image */}
      <div
        className={`order-2
          ${imageUp ? "md:order-1" : "md:order-2"}
        `}
      >
        <div className="relative w-72 h-72 rounded-full overflow-hidden border-b-[6px] border-r-[6px] border-l-[6px] border-secondary/60">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </div>
  );
}
