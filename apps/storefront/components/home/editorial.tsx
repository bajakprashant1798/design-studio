import Link from 'next/link'
import Image from 'next/image'

export default function Editorial() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800">
          <Image
            src="/editorial_lookbook.png"
            alt="Premium folded knit sweaters lookbook"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right: Copy Container */}
        <div className="flex flex-col space-y-8 lg:max-w-md">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
            DESIGN STUDY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-black dark:text-white leading-[1.2]">
            Quiet luxury. Tailored for comfort.
          </h2>
          <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 font-light space-y-4">
            Our aesthetic is anchored in warm minimalism. By eliminating unnecessary hardware and
            prioritizing structural silhouettes, we curate garments that stand as functional art.
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-block border-b border-black pb-1.5 text-xs font-semibold tracking-widest uppercase text-black hover:text-zinc-500 dark:border-white dark:text-white dark:hover:text-zinc-400 transition-colors duration-150"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
