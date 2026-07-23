'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useStore, formatPrice, itemKey } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Minus, Plus, X } from 'lucide-react'
import Link from 'next/link'

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeItem } = useStore()
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="eyebrow text-left">
            Shopping Bag ({cart.reduce((n, i) => n + i.qty, 0)})
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Your bag is empty.</div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((item) => {
                const key = itemKey(item)
                return (
                  <li key={key} className="p-6 flex gap-4">
                    <img src={item.image} alt={item.name} className="h-28 w-24 object-cover" />
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-2">
                        <div className="text-sm">{item.name}</div>
                        <button onClick={() => removeItem(key)} aria-label="Remove">
                          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                      </div>
                      <div className="eyebrow text-muted-foreground mt-1">
                        {item.color} · {item.size}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            className="p-2"
                            onClick={() => updateQty(key, item.qty - 1)}
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                          <button
                            className="p-2"
                            onClick={() => updateQty(key, item.qty + 1)}
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-sm tabular-nums">
                          {formatPrice(item.price * item.qty)}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-border p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="eyebrow">Subtotal</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shipping and taxes calculated at checkout.
          </p>
          <Button asChild className="w-full rounded-none h-12" disabled={cart.length === 0}>
            <Link href="/checkout" onClick={() => setCartOpen(false)}>
              Checkout
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
