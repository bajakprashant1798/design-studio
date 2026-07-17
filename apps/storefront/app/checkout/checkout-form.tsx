'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeCartAction } from '@/lib/actions/cart'
import { formatAmount } from '@/lib/prices'

interface CheckoutFormProps {
  cart: any
}

export default function CheckoutForm({ cart }: CheckoutFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    country_code: 'dk', // default region country ISO
  })

  const [checkoutError, setCheckoutError] = useState('')

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      return completeCartAction(formData)
    },
    onSuccess: (res) => {
      // Invalidate the cart cache so the Header count is reset
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      // Redirect to orders page
      router.push(`/orders/${res.orderId}`)
    },
    onError: (err: any) => {
      setCheckoutError(err.message || 'Failed to process order.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    checkoutMutation.mutate()
  }

  const currencyCode = cart.currency_code || 'eur'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Shipping Address Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
        <h2 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
          Shipping Information
        </h2>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
            Street Address
          </label>
          <input
            type="text"
            name="address_1"
            required
            value={formData.address_1}
            onChange={handleChange}
            className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
              City
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
              Country
            </label>
            <select
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
              className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white uppercase font-light"
            >
              <option value="dk">Denmark</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="gb">United Kingdom</option>
            </select>
          </div>
        </div>

        {checkoutError && <p className="text-xs text-red-500 font-light">{checkoutError}</p>}

        <button
          type="submit"
          disabled={checkoutMutation.isPending}
          className="w-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase py-4 border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all duration-200"
        >
          {checkoutMutation.isPending ? 'Processing Order...' : 'Place Order'}
        </button>
      </form>

      {/* Cart Summary Panel */}
      <div className="lg:col-span-5 border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
        <h2 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
          Order Summary
        </h2>

        {/* List of items */}
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-850">
          {cart.items?.map((item: any) => {
            const itemPrice = formatAmount({
              amount: item.unit_price * item.quantity,
              currencyCode,
            })
            return (
              <li
                key={item.id}
                className="flex justify-between items-center py-4 first:pt-0 last:pb-0 text-xs"
              >
                <div>
                  <span className="font-medium text-black dark:text-white">{item.title}</span>
                  <span className="text-zinc-400 font-light ml-2">x {item.quantity}</span>
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{itemPrice}</span>
              </li>
            )
          })}
        </ul>

        {/* Cart Totals */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs font-light text-zinc-500 dark:text-zinc-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatAmount({ amount: cart.subtotal || 0, currencyCode })}</span>
          </div>
          {cart.discount_total > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-{formatAmount({ amount: cart.discount_total, currencyCode })}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-black dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span>Total</span>
            <span>{formatAmount({ amount: cart.total || 0, currencyCode })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
