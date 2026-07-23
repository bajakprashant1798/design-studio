'use client'

import { useMemo, useState, useEffect } from 'react'
import { ProductCard } from '@/components/commerce/ProductCard'
import { FilterSidebar, DEFAULT_FILTERS, type Filters } from '@/components/commerce/FilterSidebar'
import { getStoreProducts } from '@/lib/medusa'

export default function CategoriesPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const data = await getStoreProducts({ limit: 100 })
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const filteredList = useMemo(() => {
    let list = products

    // Category filter
    if (filters.categories.length > 0) {
      list = list.filter((p: any) =>
        p.categories?.some((c: any) => filters.categories.includes(c.id))
      )
    }

    // Price filter (only filter if custom range specified)
    if (filters.price[0] > 0 || filters.price[1] < 1000) {
      list = list.filter((p: any) => {
        let calcAmount = p.variants?.[0]?.calculated_price?.calculated_amount
        if (calcAmount === undefined || calcAmount === null) {
          const rawPrice = p.variants?.[0]?.prices?.[0]?.amount
          calcAmount = rawPrice ? rawPrice / 100 : 0
        }
        if (calcAmount === 0) return true
        return calcAmount >= filters.price[0] && calcAmount <= filters.price[1]
      })
    }

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
        <div className="eyebrow text-muted-foreground mb-4">Medusa Collection · Catalog</div>
        <h1 className="font-serif text-5xl md:text-7xl">All Pieces</h1>
      </header>
      <div className="grid gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div>
          <div className="mb-6 text-sm text-muted-foreground">
            {loading ? 'Loading pieces...' : `${filteredList.length} pieces available`}
          </div>
          {filteredList.length === 0 && !loading ? (
            <div className="p-12 text-center text-muted-foreground text-sm border border-dashed border-border">
              No products found in backend matching current criteria.
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
