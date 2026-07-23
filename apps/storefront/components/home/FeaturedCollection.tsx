'use client'

import Link from 'next/link'
import { ProductCard } from '@/components/commerce/ProductCard'
import { getStoreProducts } from '@/lib/medusa'
import { useState, useEffect } from 'react'

interface FeaturedCollectionProps {
  products?: any[]
}

export function FeaturedCollection({ products: initialProducts }: FeaturedCollectionProps) {
  const [items, setItems] = useState<any[]>(initialProducts || [])

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setItems(initialProducts)
      return
    }
    async function load() {
      const fetched = await getStoreProducts({ limit: 4 })
      setItems(fetched)
    }
    load()
  }, [initialProducts])

  if (items.length === 0) return null

  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="eyebrow mb-3 text-muted-foreground">Medusa Collection · Featured</div>
          <h2 className="font-serif text-4xl md:text-5xl">Selected Pieces</h2>
        </div>
        <Link
          href="/categories"
          className="eyebrow hidden underline-offset-4 hover:underline md:block"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id || p.handle} product={p} />
        ))}
      </div>
    </section>
  )
}
