'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type CartItem = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  size: string
  color: string
  qty: number
}

type Ctx = {
  cart: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void
  removeItem: (key: string) => void
  updateQty: (key: string, qty: number) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
  hydrated: boolean
}

const StoreCtx = createContext<Ctx | null>(null)

export const itemKey = (i: Pick<CartItem, 'id' | 'size' | 'color'>) =>
  `${i.id}::${i.size}::${i.color}`

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ds-cart')
      if (raw) setCart(JSON.parse(raw))
      const t = localStorage.getItem('ds-theme') as 'dark' | 'light' | null
      if (t) setTheme(t)
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('ds-cart', JSON.stringify(cart))
  }, [cart, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('ds-theme', theme)
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme, hydrated])

  const addItem: Ctx['addItem'] = (item) => {
    const key = itemKey(item)
    setCart((prev) => {
      const idx = prev.findIndex((p) => itemKey(p) === key)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (item.qty ?? 1) }
        return copy
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }]
    })
    setCartOpen(true)
  }

  const removeItem = (key: string) => setCart((prev) => prev.filter((p) => itemKey(p) !== key))
  const updateQty = (key: string, qty: number) =>
    setCart((prev) => prev.map((p) => (itemKey(p) === key ? { ...p, qty: Math.max(1, qty) } : p)))
  const clearCart = () => setCart([])
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const Provider = StoreCtx.Provider as any

  return (
    <Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        cartOpen,
        setCartOpen,
        searchOpen,
        setSearchOpen,
        theme,
        toggleTheme,
        hydrated,
      }}
    >
      {children}
    </Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreCtx)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
