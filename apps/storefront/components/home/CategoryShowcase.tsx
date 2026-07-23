'use client'

import Link from 'next/link'
import { getProductCategories, getStoreProducts, getProductImage } from '@/lib/medusa'
import { useState, useEffect } from 'react'

export function CategoryShowcase() {
  const [categoriesWithImages, setCategoriesWithImages] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const cats = await getProductCategories()
      if (!cats || cats.length === 0) return

      // Fetch sample product image for each category directly from Medusa database
      const items = await Promise.all(
        cats.map(async (c: any) => {
          const prods = await getStoreProducts({ category_id: [c.id], limit: 1 })
          const image = prods.length > 0 ? getProductImage(prods[0]) : ''
          const itemCount = prods.length
          return {
            ...c,
            image,
            itemCount,
          }
        })
      )
      setCategoriesWithImages(items)
    }
    load()
  }, [])

  if (categoriesWithImages.length === 0) return null

  return (
    <section className="px-4 py-20 md:px-8">
      <div className="mb-10 flex items-end justify-between border-b border-border/40 pb-6">
        <div>
          <div className="eyebrow mb-2 text-muted-foreground">Medusa Categories</div>
          <h2 className="font-serif text-4xl md:text-5xl">The Wardrobe</h2>
        </div>
        <Link href="/categories" className="eyebrow underline-offset-4 hover:underline">
          Explore all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {categoriesWithImages.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.handle}`}
            className="group relative block aspect-[3/4] overflow-hidden bg-muted/30 border border-border/40"
          >
            {c.image ? (
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover p-4 transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-xs text-muted-foreground">
                {c.name}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
              <div>
                <div className="eyebrow text-[10px] opacity-75">{c.name}</div>
                <div className="font-serif text-2xl md:text-3xl mt-1">{c.name}</div>
              </div>
              <div className="eyebrow text-xs opacity-90 transition-all group-hover:translate-x-1">
                Shop →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
