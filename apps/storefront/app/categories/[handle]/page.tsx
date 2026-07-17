import Link from "next/link"
import { notFound } from "next/navigation"
import ProductCard from "@/components/product/product-card"
import { medusa } from "@/lib/medusa"

interface PageProps {
  params: Promise<{ handle: string }>
}

export const dynamic = "force-dynamic"

export default async function CategoryPage({ params }: PageProps) {
  const { handle } = await params

  let category: any = null
  let products: any[] = []
  let categories: any[] = []
  let errorMsg = ""

  try {
    // 1. Fetch categories to list options and locate selected category
    const catResponse = await medusa.store.category.list()
    categories = catResponse.product_categories || []

    category = categories.find((c) => c.handle === handle)
    if (!category) {
      return notFound()
    }

    // 2. Fetch products under this category
    const prodResponse = await medusa.store.product.list({
      category_id: [category.id],
      region_id: "reg_01KXPHZG8SZD8BZV5TZ8MQBRG6",
      fields: "*variants.calculated_price",
      limit: 20,
    })
    products = prodResponse.products || []
  } catch (err: any) {
    console.error("Failed to query category products:", err)
    errorMsg = err.message || "Failed to load category products."
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Category Header */}
      <header className="space-y-4 border-b border-zinc-150 pb-8 dark:border-zinc-800">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          CATEGORY / {category?.name}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-black dark:text-white">
          {category?.name}
        </h1>
        {category?.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light max-w-md">
            {category.description}
          </p>
        )}
      </header>

      {/* Category Selector Shortcuts */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/categories"
          className="border border-zinc-200 px-5 py-2 text-xs font-medium tracking-wider uppercase hover:bg-black hover:text-white dark:border-zinc-850 dark:hover:bg-white dark:hover:text-black transition-all duration-200"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.handle}`}
            className={`border px-5 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
              cat.handle === handle
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "border-zinc-200 hover:bg-black hover:text-white dark:border-zinc-850 dark:hover:bg-white dark:hover:text-black"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product List Grid */}
      <div className="space-y-8">
        <h2 className="text-sm font-semibold tracking-widest text-zinc-450 uppercase">
          Apparel Listings ({products.length})
        </h2>

        {errorMsg ? (
          <p className="text-xs text-zinc-400 tracking-wider text-center py-12">{errorMsg}</p>
        ) : products.length === 0 ? (
          <p className="text-xs text-zinc-400 tracking-wider text-center py-12">
            No products found under this category.
          </p>
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
