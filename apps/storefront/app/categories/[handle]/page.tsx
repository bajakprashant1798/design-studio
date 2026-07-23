'use client'

import { useMemo, useState, useEffect, use } from 'react'
import { ProductCard } from '@/components/commerce/ProductCard'
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from '@/components/commerce/FilterSidebar'
import { getStoreProducts, getProductCategories } from '@/lib/medusa'

interface PageProps {
  params: Promise<{ handle: string }>
}

export default function CategoryDetailPage({ params }: PageProps) {
  const { handle } = use(params)
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [products, setProducts] = useState<any[]>([])
  const [categoryName, setCategoryName] = useState(handle)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const categories = await getProductCategories()
      const currentCat = categories.find(
        (c: any) => c.handle?.toLowerCase() === handle.toLowerCase()
      )

      if (currentCat) {
        setCategoryName(currentCat.name)
        const catProducts = await getStoreProducts({
          category_id: [currentCat.id],
          limit: 50,
        })
        setProducts(catProducts)
      } else {
        const allProducts = await getStoreProducts({ limit: 50 })
        const filtered = allProducts.filter((p: any) =>
          p.categories?.some((c: any) => c.handle?.toLowerCase() === handle.toLowerCase())
        )
        setProducts(filtered)
      }
      setLoading(false)
    }
    loadData()
  }, [handle])

  const filteredList = useMemo(() => {
    let list = products

    // Price filter
    list = list.filter((p: any) => {
      const calcAmount =
        p.variants?.[0]?.calculated_price?.calculated_amount ??
        (p.variants?.[0]?.prices?.[0]?.amount ? p.variants[0].prices[0].amount / 100 : 0)
      return calcAmount >= filters.price[0] && calcAmount <= filters.price[1]
    })

    // Sort
    if (filters.sort === 'price-asc') {
      list = [...list].sort((a, b) => {
        const pA = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0
        const pB = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0
        return pA - pB
      })
    } else if (filters.sort === 'price-desc') {
      list = [...list].sort((a, b) => {
        const pA = a.variants?.[0]?.calculated_price?.calculated_amount ?? 0
        const pB = b.variants?.[0]?.calculated_price?.calculated_amount ?? 0
        return pB - pA
      })
    }

    return list
  }, [products, filters])

  return (
    <div className="px-4 md:px-8 py-12">
      <header className="mb-12">
        <div className="eyebrow text-muted-foreground mb-4">Category</div>
        <h1 className="font-serif text-5xl md:text-7xl capitalize">{categoryName}</h1>
      </header>
      <div className="grid gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <FilterSidebar filters={filters} setFilters={setFilters} lockCategory />
        <div>
          <div className="mb-6 text-sm text-muted-foreground">
            {loading ? 'Loading category pieces...' : `${filteredList.length} pieces available`}
          </div>
          {filteredList.length === 0 && !loading ? (
            <div className="p-12 text-center text-muted-foreground text-sm border border-dashed border-border">
              No products found in category “{categoryName}”.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {filteredList.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
