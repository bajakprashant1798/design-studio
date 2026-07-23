'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getProductCategories } from '@/lib/medusa'

export type Filters = {
  categories: string[]
  price: [number, number]
  sort: 'newest' | 'price-asc' | 'price-desc'
}

export const DEFAULT_FILTERS: Filters = {
  categories: [],
  price: [0, 500],
  sort: 'newest',
}

export function FilterSidebar({
  filters,
  setFilters,
  lockCategory,
}: {
  filters: Filters
  setFilters: (f: Filters) => void
  lockCategory?: boolean
}) {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const cats = await getProductCategories()
      setCategories(cats)
    }
    load()
  }, [])

  const toggleCategory = (catId: string) => {
    const list = filters.categories.includes(catId)
      ? filters.categories.filter((x) => x !== catId)
      : [...filters.categories, catId]
    setFilters({ ...filters, categories: list })
  }

  return (
    <aside className="space-y-8 text-sm">
      <div>
        <div className="eyebrow mb-3">Sort</div>
        <Select
          value={filters.sort}
          onValueChange={(v: any) => setFilters({ ...filters, sort: v as Filters['sort'] })}
        >
          <SelectTrigger className="rounded-none border-foreground/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {!lockCategory && categories.length > 0 && (
        <div>
          <div className="eyebrow mb-3">Categories</div>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center gap-3">
                <Checkbox
                  id={`cat-${c.id}`}
                  checked={filters.categories.includes(c.id)}
                  onCheckedChange={() => toggleCategory(c.id)}
                />
                <label htmlFor={`cat-${c.id}`} className="capitalize cursor-pointer">
                  {c.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <div className="eyebrow mb-3">Price Range</div>
        <Slider
          value={filters.price}
          min={0}
          max={500}
          step={5}
          onValueChange={(v: any) =>
            setFilters({ ...filters, price: [v[0], v[1]] as [number, number] })
          }
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>€{filters.price[0]}</span>
          <span>€{filters.price[1]}</span>
        </div>
      </div>
    </aside>
  )
}
