import Link from "next/link"
import ProductCard from "@/components/product/product-card"
import { medusa } from "@/lib/medusa"

export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
  let categories: any[] = []
  let products: any[] = []
  let errorMsg = ""

  try {
    const catResponse = await medusa.store.category.list()
    categories = catResponse.product_categories || []

    const prodResponse = await medusa.store.product.list({
      region_id: "reg_01KXPHZG8SZD8BZV5TZ8MQBRG6",
      fields: "*variants.calculated_price",
      limit: 20,
    })
    products = prodResponse.products || []
  } catch (err: any) {
    console.error("Failed to load catalog data:", err)
    errorMsg = err.message || "Unable to fetch storefront catalog."
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <header className="space-y-4 border-b border-zinc-150 pb-8 dark:border-zinc-800">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          CATALOGUE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-black dark:text-white">
          All Apparel
        </h1>
      </header>

      {/* Category Shortcuts */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.handle}`}
            className="border border-zinc-200 px-5 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black hover:text-white dark:border-zinc-850 dark:hover:bg-white dark:hover:text-black transition-all duration-200"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="space-y-8">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-450 uppercase">
          All Products ({products.length})
        </h2>

        {errorMsg ? (
          <p className="text-xs text-zinc-400 tracking-wider text-center py-12">{errorMsg}</p>
        ) : products.length === 0 ? (
          <p className="text-xs text-zinc-400 tracking-wider text-center py-12">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
