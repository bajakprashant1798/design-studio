import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative h-[90vh] w-full bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero_fashion_editorial.png"
          alt="High-end editorial fashion model in sand trench coat"
          fill
          priority
          className="object-cover object-center brightness-[0.95] dark:brightness-[0.7]"
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/25 flex flex-col justify-end p-8 sm:p-16 lg:p-24">
        <div className="max-w-xl text-white space-y-6">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-zinc-200">
            NEW CAMPAIGN / VOLUME I
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            The Modern Uniform.
          </h1>
          <p className="text-sm tracking-wide text-zinc-150 leading-relaxed font-light">
            A study in form, proportion, and monochrome textures. Premium essential silhouettes designed to transcend seasons.
          </p>
          <div className="pt-2">
            <Link
              href="/categories"
              className="inline-block bg-white text-black text-xs font-medium tracking-widest uppercase px-8 py-3.5 hover:bg-black hover:text-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black border border-white transition-all duration-300"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
