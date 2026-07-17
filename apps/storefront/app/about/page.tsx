export default function AboutPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 space-y-12">
      <header className="space-y-4 text-center">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          OUR MISSION
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-black dark:text-white">
          Slow Fashion. Conscious Curation.
        </h1>
      </header>

      <section className="text-xs leading-relaxed text-zinc-650 dark:text-zinc-350 space-y-6 font-light">
        <p>
          DESIGN STUDIO was founded with a singular focus: to create a contemporary uniform that
          balances architectural simplicity with everyday utility. We reject the rapid cycles of
          fast fashion, choosing instead to design and refine garments that endure.
        </p>
        <p>
          Each collection is produced in limited volumes, utilizing organic cotton, heavy-weight
          linen, and recycled cashmere sourced from ethical mills. Our manufacturing partners are
          vetted for fair labor practices and shared environmental values.
        </p>
        <p>
          By embracing neutral monochromatic palettes, subtle tailored proportions, and removing
          visible branding, we design clothes that integrate seamlessly with your wardrobe. This is
          clothing as structural canvas, curated to outlast trend cycles.
        </p>
      </section>

      <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800 text-center">
        <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
          DESIGNED IN COPENHAGEN / BUILT TO ENDURE
        </p>
      </div>
    </article>
  )
}
