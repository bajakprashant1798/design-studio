'use client'

import Link from 'next/link'
import { getStoreProducts, getProductImage, formatMedusaPrice } from '@/lib/medusa'
import { useState, useEffect } from 'react'

export function LookbookPreview() {
  const [spotlightProducts, setSpotlightProducts] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const prods = await getStoreProducts({ limit: 4 })
      setSpotlightProducts(prods)
    }
    load()
  }, [])

  if (spotlightProducts.length === 0) return null

  return (
    <section className="px-4 py-24 md:px-8 bg-secondary/20">
      <div className="mb-12 flex items-end justify-between border-b border-border/40 pb-6">
        <div>
          <div className="eyebrow mb-2 text-muted-foreground">Medusa Spotlight</div>
          <h2 className="font-serif text-4xl md:text-5xl">Atelier Curation</h2>
        </div>
        <Link href="/categories" className="eyebrow underline-offset-4 hover:underline">
          View all pieces →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {spotlightProducts.map((p, i) => {
          const image = getProductImage(p)
          const price = formatMedusaPrice(p.variants?.[0])
          const category = p.categories?.[0]?.name || 'Collection'

          return (
            <Link
              key={p.id}
              href={`/products/${p.handle}`}
              className={`group relative block overflow-hidden bg-background border border-border/40 ${
                i === 0 ? 'aspect-[3/4] md:aspect-[3/5]' : 'aspect-[3/4]'
              }`}
            >
              <img
                src={image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover p-6 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex items-end justify-between">
                <div>
                  <div className="eyebrow text-[10px] opacity-75">{category}</div>
                  <div className="font-serif text-2xl mt-1">{p.title}</div>
                </div>
                <div className="font-sans text-xs font-medium tabular-nums opacity-90">{price}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function NewsletterCard() {
  return (
    <section className="px-4 py-24 md:px-8">
      <div className="glass-card max-w-4xl mx-auto px-8 py-16 text-center md:px-16 md:py-20 border border-border/40">
        <div className="eyebrow mb-4 text-muted-foreground">The Studio Journal</div>
        <h2 className="font-serif text-4xl md:text-5xl mb-4">Private updates, delivered.</h2>
        <p className="max-w-lg mx-auto text-sm text-muted-foreground">
          Receive direct notifications on collection releases, inventory restocks, and private store
          access.
        </p>
        <form
          className="mt-8 flex max-w-md mx-auto flex-col sm:flex-row gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent border border-foreground/30 px-4 py-3 text-sm outline-none focus:border-foreground"
          />
          <button className="eyebrow bg-foreground text-background px-6 py-3 hover:opacity-90 transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
