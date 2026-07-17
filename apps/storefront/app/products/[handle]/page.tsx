import { notFound } from 'next/navigation'
import Gallery from '@/components/product/gallery'
import VariantSelector from '@/components/product/variant-selector'
import ProductCard from '@/components/product/product-card'
import ReviewsSection from '@/components/product/reviews-section'
import { medusa } from '@/lib/medusa'

interface PageProps {
  params: Promise<{ handle: string }>
}

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params

  let product: any = null
  let relatedProducts: any[] = []
  let errorMsg = ''

  try {
    // 1. Fetch product list by handle
    const response = await medusa.store.product.list({
      handle: handle,
      region_id: 'reg_01KXPHZG8SZD8BZV5TZ8MQBRG6',
      fields: '*variants.calculated_price',
      limit: 1,
    })

    product = response.products[0]
    if (!product) {
      return notFound()
    }

    // 2. Fetch related products from the same category
    const catId = product.categories?.[0]?.id
    const relatedResponse = await medusa.store.product.list({
      category_id: catId ? [catId] : undefined,
      region_id: 'reg_01KXPHZG8SZD8BZV5TZ8MQBRG6',
      fields: '*variants.calculated_price',
      limit: 5,
    })

    // Exclude the current active product from recommendations
    relatedProducts = (relatedResponse.products || [])
      .filter((p) => p.id !== product.id)
      .slice(0, 4)
  } catch (err: any) {
    console.error('Failed to load product page details:', err)
    errorMsg = err.message || 'Failed to load product details.'
  }

  if (errorMsg) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-xs text-zinc-400 tracking-wider">
        {errorMsg}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
      {/* Product Split Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left: Interactive Image Gallery */}
        <Gallery images={product.images || []} thumbnail={product.thumbnail} />

        {/* Right: Info & Variant selections */}
        <VariantSelector product={product} />
      </div>

      {/* Specifications & Accordions */}
      <div className="border-t border-zinc-150 pt-16 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
        <div className="space-y-3">
          <h3 className="font-semibold text-black dark:text-white uppercase tracking-wider text-[10px]">
            Shipping & Return Policy
          </h3>
          <p>
            Complimentary shipping and free return collections on all orders within the EU. Standard
            delivery within 2-4 business days.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-black dark:text-white uppercase tracking-wider text-[10px]">
            Sizing & Fit
          </h3>
          <p>
            Silhouettes are cut for a contemporary, slightly oversized fit. We recommend ordering
            your standard size. Refer to our size guide table.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold text-black dark:text-white uppercase tracking-wider text-[10px]">
            Care Guidelines
          </h3>
          <p>
            Dry clean only or machine wash cold on a delicate cycle using mild detergent. Lay flat
            to dry out of direct sunlight.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection productId={product.id} />

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-zinc-150 pt-16 dark:border-zinc-800 space-y-10">
          <h2 className="font-serif text-xl tracking-tight text-black dark:text-white">
            Related Items
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
