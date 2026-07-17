import ProductCard from "@/components/product/product-card"
import { medusa } from "@/lib/medusa"
import { Search } from "lucide-react"

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export const dynamic = "force-dynamic"

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: query = "" } = await searchParams

  let products: any[] = []
  let errorMsg = ""

  try {
    if (query.trim()) {
      const response = await medusa.store.product.list({
        q: query,
        region_id: "reg_01KXPHZG8SZD8BZV5TZ8MQBRG6",
        fields: "*variants.calculated_price",
        limit: 20,
      })
      products = response.products || []
    }
  } catch (err: any) {
    console.error("Search query failed:", err)
    errorMsg = err.message || "Failed to execute search."
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Search Bar section */}
      <header className="space-y-6 max-w-md border-b border-zinc-150 pb-8 dark:border-zinc-800">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          SEARCH LOG
        </span>
        <form className="relative flex items-center" method="GET" action="/search">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search collections, shirts, pants..."
            className="w-full border-b border-zinc-300 bg-transparent py-3 pl-2 pr-10 text-sm tracking-wide focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white font-light"
          />
          <button type="submit" className="absolute right-2 text-zinc-400 hover:text-black dark:hover:text-white">
            <Search className="h-5 w-5" />
          </button>
        </form>
      </header>

      {/* Results Section */}
      <div className="space-y-8">
        {query ? (
          <h2 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
            Search Results for &ldquo;{query}&rdquo; ({products.length})
          </h2>
        ) : (
          <h2 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
            Enter a search term above
          </h2>
        )}

        {errorMsg ? (
          <p className="text-xs text-zinc-400 tracking-wider text-center py-12">{errorMsg}</p>
        ) : query && products.length === 0 ? (
          <p className="text-xs text-zinc-400 tracking-wider text-center py-12">
            No products found matching &ldquo;{query}&rdquo;.
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
