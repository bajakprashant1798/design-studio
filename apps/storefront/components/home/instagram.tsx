import Image from 'next/image'

export default function Instagram() {
  const images = [
    { src: '/hero_fashion_editorial.png', alt: 'Editorial lookbook model' },
    { src: '/instagram_curation_1.png', alt: 'Minimal leather bag detail' },
    { src: '/editorial_lookbook.png', alt: 'Scandinavian interior sweaters texture' },
    { src: '/instagram_curation_2.png', alt: 'Charcoal wool coat pocket detail' },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          CURATED STYLES
        </span>
        <h2 className="font-serif text-2xl tracking-tight text-black dark:text-white">
          Shared Curation
        </h2>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs font-light text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-150"
        >
          @designstudio
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/5 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </section>
  )
}
