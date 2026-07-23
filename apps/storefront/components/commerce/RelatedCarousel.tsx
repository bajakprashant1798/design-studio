'use client'

import { ProductCard } from './ProductCard'

export function RelatedCarousel({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null
  return (
    <section className="mt-20">
      <h2 className="font-serif text-3xl md:text-4xl mb-8">You May Also Like</h2>
      <div className="-mx-4 md:-mx-8 px-4 md:px-8 overflow-x-auto">
        <div className="flex gap-6 md:gap-8 snap-x snap-mandatory">
          {products.map((p) => (
            <div key={p.id || p.handle} className="min-w-[260px] md:min-w-[300px] snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
