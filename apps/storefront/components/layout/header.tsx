"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { useState } from "react"
import { useStore } from "@/context/store-context"
import { useQuery } from "@tanstack/react-query"
import { getCart } from "@/lib/actions/cart"

export default function Header() {
  const pathname = usePathname()
  const { setCartOpen } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Fetch cart data on client side
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  })

  const cartItemsCount = cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0

  const navLinks = [
    { name: "Collections", href: "/collections" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const isLinkActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Icon */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-1 lg:flex-none">
          <Link href="/" className="font-serif text-xl font-medium tracking-widest text-black dark:text-white">
            DESIGN STUDIO
          </Link>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-150 hover:text-black dark:hover:text-white ${
                isLinkActive(link.href)
                  ? "text-black dark:text-white border-b border-black dark:border-white pb-1"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-x-4">
          <Link
            href="/search"
            className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/account"
            className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-medium text-white dark:bg-white dark:text-black">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-black">
          <div className="flex flex-col space-y-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium tracking-wider ${
                  isLinkActive(link.href)
                    ? "text-black dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
