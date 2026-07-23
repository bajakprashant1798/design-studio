'use client'

import Link from 'next/link'
import { formatMedusaPrice, getProductImage } from '@/lib/medusa'

export function ProductCard({ product }: { product: any }) {
  if (!product) return null

  const title = product.title || product.name || 'Untitled Piece'
  const handle = product.handle || product.slug || product.id
  const category =
    product.categories?.[0]?.name || product.collection?.title || product.category || ''

  const variant = product.variants?.[0]
  let priceDisplay = ''
  if (variant) {
    priceDisplay = formatMedusaPrice(variant)
  } else if (typeof product.price === 'number') {
    priceDisplay = `$${product.price}`
  }

  const primaryImage = getProductImage(product)
  const secondaryImage =
    Array.isArray(product.images) && product.images.length > 1
      ? typeof product.images[1] === 'string'
        ? product.images[1]
        : product.images[1]?.url
      : primaryImage

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <img
          src={primaryImage}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        {secondaryImage && secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {category && (
          <span className="eyebrow text-[10px] text-muted-foreground capitalize">{category}</span>
        )}
        <div className="flex items-baseline justify-between text-sm font-medium">
          <span className="truncate pr-2 font-serif text-base tracking-wide">{title}</span>
          <span className="shrink-0 font-sans text-xs tabular-nums text-foreground/90">
            {priceDisplay}
          </span>
        </div>
      </div>
    </Link>
  )
}
