'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <img
        src="/assets/hero.jpg"
        alt="AW26 editorial campaign"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
      <div className="relative z-10 flex h-full flex-col justify-end px-4 md:px-12 pb-16 md:pb-24 text-white">
        <div className="eyebrow opacity-80 mb-6">Autumn — Winter 26 · The New Collection</div>
        <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] max-w-4xl">
          Silent Form.
          <br />
          Uncompromising Line.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/categories"
            className="eyebrow bg-white text-black px-8 py-4 hover:bg-white/90 transition"
          >
            Shop Collection
          </Link>
          <Link
            href="/lookbook"
            className="eyebrow border border-white/60 text-white px-8 py-4 hover:bg-white/10 transition"
          >
            Explore Lookbook
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = [
    'Complimentary shipping worldwide',
    'New arrivals — AW26',
    'Made in Italy',
    'Client atelier · Paris',
  ]
  return (
    <div className="border-y border-border overflow-hidden">
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite] py-3">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="eyebrow mx-8 text-foreground/70">
            {t} <span className="mx-8 opacity-40">◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  )
}
