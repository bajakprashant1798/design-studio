'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useStore } from '@/lib/store'
import { getStoreProducts, formatMedusaPrice, getProductImage } from '@/lib/medusa'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!q.trim()) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      const products = await getStoreProducts({ q: q.trim(), limit: 8 })
      setResults(products)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [q])

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="max-w-none w-screen h-screen p-0 border-0 rounded-none bg-background sm:rounded-none left-0 top-0 translate-x-0 translate-y-0 [&>button]:hidden flex flex-col">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <div className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 flex items-center gap-4">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products in backend..."
              className="flex-1 bg-transparent outline-none font-serif text-2xl md:text-3xl placeholder:text-muted-foreground"
            />
            <button onClick={() => setSearchOpen(false)} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            {loading ? (
              <p className="text-muted-foreground text-sm">Searching Medusa database...</p>
            ) : q.trim() === '' ? (
              <div>
                <div className="eyebrow text-muted-foreground mb-4">Suggested searches</div>
                <div className="flex flex-wrap gap-2">
                  {['Shirt', 'Sweatshirt', 'Pants', 'Shorts'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setQ(t)}
                      className="border border-border px-4 py-2 text-sm hover:bg-accent"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-muted-foreground text-sm">No products found matching “{q}”.</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {results.map((p) => {
                  const image = getProductImage(p)
                  const price = formatMedusaPrice(p.variants?.[0])
                  return (
                    <li key={p.id}>
                      <Link
                        href={`/products/${p.handle}`}
                        onClick={() => setSearchOpen(false)}
                        className="group block"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-muted">
                          <img
                            src={image}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="mt-3 flex justify-between text-sm">
                          <span className="font-serif truncate pr-2">{p.title}</span>
                          <span className="tabular-nums text-xs">{price}</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
