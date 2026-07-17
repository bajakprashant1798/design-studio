'use client'

import { useState } from 'react'
import { formatAmount } from '@/lib/prices'
import { useStore } from '@/context/store-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCartAction } from '@/lib/actions/cart'

interface VariantSelectorProps {
  product: any
}

export default function VariantSelector({ product }: VariantSelectorProps) {
  const { setCartOpen } = useStore()
  const queryClient = useQueryClient()

  // Initialize default options selection (first value of each option)
  const initialOptions: Record<string, string> = {}
  product.options?.forEach((opt: any) => {
    if (opt.values && opt.values.length > 0) {
      initialOptions[opt.title] = opt.values[0].value
    }
  })

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions)

  // Find the variant matching all selected options
  const activeVariant = product.variants?.find((variant: any) => {
    return variant.options?.every((opt: any) => {
      return selectedOptions[opt.option.title] === opt.value
    })
  })

  // Format pricing of active variant
  const activePrice = activeVariant?.calculated_price
    ? formatAmount({
        amount: activeVariant.calculated_price.calculated_amount,
        currencyCode: activeVariant.calculated_price.currency_code,
      })
    : null

  // Cart addition mutation
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!activeVariant) return
      return addToCartAction(activeVariant.id, 1)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      setCartOpen(true)
    },
  })

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }))
  }

  const handleAddToBag = () => {
    addToCartMutation.mutate()
  }

  const addingToBag = addToCartMutation.isPending

  return (
    <div className="space-y-8">
      {/* Pricing Header */}
      <div className="border-b border-zinc-150 pb-4 dark:border-zinc-800">
        <h1 className="font-serif text-2xl tracking-tight text-black dark:text-white">
          {product.title}
        </h1>
        <p className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100 mt-2">
          {activePrice || 'Select variations'}
        </p>
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Dynamic Option Selectors */}
      <div className="space-y-6">
        {product.options?.map((option: any) => (
          <div key={option.id} className="space-y-2">
            <span className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">
              {option.title}
            </span>
            <div className="flex flex-wrap gap-2">
              {option.values?.map((val: any) => {
                const isSelected = selectedOptions[option.title] === val.value
                return (
                  <button
                    key={val.id}
                    onClick={() => handleOptionChange(option.title, val.value)}
                    className={`border px-4 py-1.5 text-xs font-medium uppercase transition-all duration-150 ${
                      isSelected
                        ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                        : 'border-zinc-200 hover:border-black dark:border-zinc-800 dark:hover:border-white'
                    }`}
                  >
                    {val.value}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Stock status indicator */}
      {activeVariant && (
        <div className="flex items-center gap-x-2 text-[10px] tracking-wide text-zinc-500 font-light">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {activeVariant.manage_inventory && activeVariant.inventory_quantity <= 0
            ? 'Pre-order active / crafted to order'
            : 'Available to ship in 1-2 business days'}
        </div>
      )}

      {/* Actions */}
      <div className="pt-4">
        <button
          onClick={handleAddToBag}
          disabled={!activeVariant || addingToBag}
          className="w-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase py-4 border border-black dark:border-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
        >
          {addingToBag ? 'Adding to Bag...' : activeVariant ? 'Add to Bag' : 'Select Options'}
        </button>
      </div>
    </div>
  )
}
