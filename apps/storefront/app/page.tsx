import Hero from '@/components/home/hero'
import Editorial from '@/components/home/editorial'
import Newsletter from '@/components/home/newsletter'
import Instagram from '@/components/home/instagram'
import ProductCard from '@/components/product/product-card'
import { medusa, getDefaultRegionId } from '@/lib/medusa'

// Force dynamic rendering to query backend state on demand
export const dynamic = 'force-dynamic'

export default async function Home() {
  let products: any[] = []
  let errorMsg = ''

  try {
    const regionId = await getDefaultRegionId()
    const response = await medusa.store.product.list({
      region_id: regionId,
      fields: '*variants.calculated_price',
      limit: 8,
    })
    products = response.products || []
  } catch (err: any) {
    console.error('Failed to fetch homepage products:', err)
    errorMsg = err.message || 'Unable to connect to the store database.'
  }

  // Slice products for categories (mocking segmentation from seeded dataset)
  const featuredProducts = products.slice(0, 4)
  const bestSellers = products.slice(2, 6)
  const newArrivals = products.slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Campaign */}
      <Hero />

      {/* 2. Featured Collection */}
      <section className="mx-auto max-w-7xl w-full px-4 py-20 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 border-b border-zinc-150 pb-4 dark:border-zinc-800">
          <h2 className="font-serif text-2xl tracking-tight text-black dark:text-white">
            Featured Collection
          </h2>
          <span className="text-[10px] tracking-widest text-zinc-400 font-medium uppercase">
            VOLUME I / 01
          </span>
        </div>

        {errorMsg ? (
          <div className="py-12 text-center text-xs text-zinc-400 tracking-wider">
            {errorMsg}. Please ensure PostgreSQL and Medusa Backend are running.
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center text-xs text-zinc-400 tracking-wider">
            No products seeded in database.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Editorial Spotlight */}
      <Editorial />

      {/* 4. Best Sellers */}
      {!errorMsg && bestSellers.length > 0 && (
        <section className="mx-auto max-w-7xl w-full px-4 py-20 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-zinc-150 pb-4 dark:border-zinc-800">
            <h2 className="font-serif text-2xl tracking-tight text-black dark:text-white">
              Best Sellers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 5. Instagram Grid Curation */}
      <Instagram />

      {/* 6. Newsletter Subscription */}
      <Newsletter />
    </div>
  )
}
