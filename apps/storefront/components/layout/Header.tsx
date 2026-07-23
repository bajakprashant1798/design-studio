'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, User, Moon, Sun, Menu, ChevronDown, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getProductCategories } from '@/lib/medusa'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function Header() {
  const { cart, setCartOpen, setSearchOpen, theme, toggleTheme, hydrated } = useStore()
  const pathname = usePathname()
  const [mobile, setMobile] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [shopMenuOpen, setShopMenuOpen] = useState(false)

  useEffect(() => {
    async function loadCats() {
      const cats = await getProductCategories()
      setCategories(cats)
    }
    loadCats()
  }, [])

  const count = hydrated ? cart.reduce((n, i) => n + i.qty, 0) : 0

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
      <div className="relative flex h-20 items-center justify-between px-4 md:px-10">
        {/* Left Navigation */}
        <div className="flex items-center gap-8">
          <button
            className="-ml-2 p-2 lg:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {/* Shop Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setShopMenuOpen(true)}
              onMouseLeave={() => setShopMenuOpen(false)}
            >
              <Link
                href="/categories"
                className={cn(
                  'eyebrow flex items-center gap-1 text-foreground/75 transition-colors hover:text-foreground',
                  pathname?.startsWith('/categories') && 'text-foreground font-semibold'
                )}
              >
                Shop <ChevronDown className="h-3 w-3 opacity-60" />
              </Link>

              {shopMenuOpen && (
                <div className="absolute left-0 top-full min-w-[200px] border border-border/60 bg-background/95 p-4 shadow-xl backdrop-blur-xl">
                  <div className="eyebrow mb-2 text-[10px] text-muted-foreground">
                    Medusa Categories
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/categories"
                        className="block py-1 text-foreground/80 hover:text-foreground"
                        onClick={() => setShopMenuOpen(false)}
                      >
                        All Pieces
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/categories/${c.handle}`}
                          className="block py-1 capitalize text-foreground/80 hover:text-foreground"
                          onClick={() => setShopMenuOpen(false)}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/lookbook"
              className={cn(
                'eyebrow text-foreground/75 transition-colors hover:text-foreground',
                pathname === '/lookbook' && 'text-foreground font-semibold'
              )}
            >
              Lookbook
            </Link>

            <Link
              href="/about"
              className={cn(
                'eyebrow text-foreground/75 transition-colors hover:text-foreground',
                pathname === '/about' && 'text-foreground font-semibold'
              )}
            >
              About Us
            </Link>
          </nav>
        </div>

        {/* Center Logo */}
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.32em] md:text-2xl transition-opacity hover:opacity-80 absolute left-1/2 -translate-x-1/2"
        >
          DESIGN STUDIO
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-foreground/80 hover:text-foreground transition-opacity"
            aria-label="Search"
          >
            <Search className="h-[19px] w-[19px]" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-foreground/80 hover:text-foreground transition-opacity"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-[19px] w-[19px]" />
            ) : (
              <Moon className="h-[19px] w-[19px]" />
            )}
          </button>

          <Link
            href="/checkout"
            className="hidden p-2 text-foreground/80 hover:text-foreground transition-opacity sm:block"
            aria-label="Account / Checkout"
          >
            <User className="h-[19px] w-[19px]" />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-foreground/80 hover:text-foreground transition-opacity"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[19px] w-[19px]" />
            {count > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-foreground px-1 text-[10px] text-background font-mono font-bold">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobile && (
        <nav className="flex flex-col gap-4 border-t border-border/40 bg-background px-6 py-6 lg:hidden">
          <div className="eyebrow text-muted-foreground text-[10px]">Navigation</div>
          <Link href="/categories" onClick={() => setMobile(false)} className="eyebrow text-base">
            All Pieces
          </Link>

          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.handle}`}
              onClick={() => setMobile(false)}
              className="eyebrow text-base pl-3 text-muted-foreground capitalize"
            >
              • {c.name}
            </Link>
          ))}

          <Link
            href="/lookbook"
            onClick={() => setMobile(false)}
            className="eyebrow text-base pt-2 border-t border-border/40"
          >
            Lookbook
          </Link>

          <Link href="/about" onClick={() => setMobile(false)} className="eyebrow text-base">
            About Us
          </Link>
        </nav>
      )}
    </header>
  )
}
