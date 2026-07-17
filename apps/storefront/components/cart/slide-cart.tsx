"use client"

import { useStore } from "@/context/store-context"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  getCart,
  updateCartItemAction,
  removeFromCartAction,
  applyPromoCodeAction,
} from "@/lib/actions/cart"
import { formatAmount } from "@/lib/prices"

export default function SlideCart() {
  const { cartOpen, setCartOpen } = useStore()
  const queryClient = useQueryClient()
  const [promoCode, setPromoCode] = useState("")
  const [promoError, setPromoError] = useState("")

  // Fetch cart data dynamically on client side
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    enabled: cartOpen,
  })

  // Mutations
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return updateCartItemAction(id, quantity)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })

  const removeLineItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return removeFromCartAction(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })

  const applyPromoMutation = useMutation({
    mutationFn: async (code: string) => {
      return applyPromoCodeAction(code)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      setPromoCode("")
      setPromoError("")
    },
    onError: (err: any) => {
      setPromoError(err.message || "Invalid coupon code.")
    },
  })

  const handleUpdateQuantity = (id: string, currentQty: number, change: number) => {
    const nextQty = currentQty + change
    if (nextQty <= 0) {
      removeLineItemMutation.mutate(id)
    } else {
      updateQuantityMutation.mutate({ id, quantity: nextQty })
    }
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoCode.trim()) return
    applyPromoMutation.mutate(promoCode)
  }

  if (!cartOpen) return null

  const items = cart?.items || []
  const currencyCode = cart?.currency_code || "eur"

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md transform bg-white shadow-xl dark:bg-black transition-transform duration-300 ease-in-out">
          <div className="flex h-full flex-col overflow-y-scroll py-6 bg-white dark:bg-black">
            
            {/* Drawer Header */}
            <div className="px-4 sm:px-6 flex items-center justify-between border-b border-zinc-150 pb-4 dark:border-zinc-800">
              <h2 className="text-sm font-medium tracking-widest text-black dark:text-white flex items-center gap-x-2">
                <ShoppingBag className="h-4 w-4" /> SHOPPING BAG
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-150"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-xs text-zinc-400 tracking-wider">
                  Loading bag...
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <ShoppingBag className="h-10 w-10 text-zinc-300 dark:text-zinc-700 stroke-[1.2]" />
                  <p className="text-xs tracking-wider text-zinc-500 uppercase">Your bag is empty</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="inline-block border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black transition-all duration-150"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart Items List */}
                  <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {items.map((item: any) => {
                      const formattedLinePrice = formatAmount({
                        amount: item.unit_price * item.quantity,
                        currencyCode,
                      })
                      return (
                        <li key={item.id} className="flex py-6 first:pt-0 last:pb-0 gap-x-4">
                          {/* Image */}
                          <div className="relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800">
                            {item.thumbnail ? (
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                sizes="80px"
                                className="object-cover object-center"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[9px] text-zinc-400">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex flex-1 flex-col justify-between text-xs">
                            <div className="space-y-1">
                              <h3 className="font-medium text-black dark:text-white uppercase tracking-wider text-[11px]">
                                {item.product_title || item.title}
                              </h3>
                              {item.variant && (
                                <p className="text-[10px] text-zinc-450 dark:text-zinc-500 font-light">
                                  Size: {item.variant.title}
                                </p>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center border border-zinc-200 dark:border-zinc-800">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                  className="p-1.5 hover:text-black dark:hover:text-white text-zinc-400"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                  className="p-1.5 hover:text-black dark:hover:text-white text-zinc-400"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeLineItemMutation.mutate(item.id)}
                                className="text-zinc-400 hover:text-red-500 transition-colors duration-150"
                              >
                                <Trash2 className="h-4 w-4 stroke-[1.5]" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-xs text-right font-medium text-zinc-900 dark:text-zinc-100 pl-2">
                            {formattedLinePrice}
                          </div>
                        </li>
                      )
                    })}
                  </ul>

                  {/* Promo Code Form */}
                  <form
                    onSubmit={handleApplyPromo}
                    className="border-t border-zinc-100 pt-6 dark:border-zinc-800 space-y-2"
                  >
                    <span className="text-[9px] font-semibold tracking-widest text-zinc-400 uppercase">
                      PROMOTIONAL CODE
                    </span>
                    <div className="flex gap-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="w-full border-b border-zinc-300 bg-transparent px-2 py-1.5 text-xs tracking-wider placeholder-zinc-400 focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
                      />
                      <button
                        type="submit"
                        disabled={applyPromoMutation.isPending}
                        className="border border-black dark:border-white text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-150"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="text-[10px] text-red-500 font-light">{promoError}</p>}
                  </form>
                </div>
              )}
            </div>

            {/* Drawer Footer / Checkout summary */}
            {items.length > 0 && (
              <div className="border-t border-zinc-150 px-4 pt-6 sm:px-6 dark:border-zinc-800 space-y-6 bg-zinc-50 dark:bg-zinc-950 p-4">
                <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-light">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-black dark:text-white">
                      {formatAmount({ amount: cart?.subtotal || 0, currencyCode })}
                    </span>
                  </div>
                  {cart && cart.discount_total !== undefined && cart.discount_total > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-{formatAmount({ amount: cart.discount_total, currencyCode })}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping estimate</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-black dark:text-white border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-3">
                    <span>Total</span>
                    <span>{formatAmount({ amount: cart?.total || 0, currencyCode })}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="flex w-full items-center justify-center bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase py-4 border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all duration-200"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
