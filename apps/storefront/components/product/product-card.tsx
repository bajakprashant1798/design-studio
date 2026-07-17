import Link from "next/link"
import Image from "next/image"
import { getProductPrice, formatAmount } from "@/lib/prices"

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getProductPrice(product)

  return (
    <Link href={`/products/${product.handle}`} className="group flex flex-col space-y-3">
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400 text-xs tracking-wider uppercase">
            No Image
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="flex flex-col space-y-1">
        <h3 className="text-xs font-medium tracking-wide text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors duration-150">
          {product.title}
        </h3>
        {price ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            {formatAmount({ amount: price.amount, currencyCode: price.currencyCode })}
          </p>
        ) : (
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-light">Price unavailable</p>
        )}
      </div>
    </Link>
  )
}
