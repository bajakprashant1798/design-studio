'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { formatMedusaPrice, getStoreProducts, getProductImage } from '@/lib/medusa'
import { useStore } from '@/lib/store'
import { ProductGallery } from '@/components/commerce/ProductGallery'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reviews } from '@/components/commerce/Reviews'
import { RelatedCarousel } from '@/components/commerce/RelatedCarousel'
import { Minus, Plus, Star } from 'lucide-react'
import { toast } from 'sonner'

interface PageProps {
  params: Promise<{ handle: string }>
}

export default function ProductDetailPage({ params }: PageProps) {
  const { handle } = use(params)
  const { addItem } = useStore()

  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      const products = await getStoreProducts({ handle, limit: 1 })
      if (products && products.length > 0) {
        const prod = products[0]
        setProduct(prod)

        // Set default selected options from first variant
        if (prod.options && prod.options.length > 0) {
          const initialOpts: Record<string, string> = {}
          prod.options.forEach((opt: any) => {
            if (opt.values && opt.values.length > 0) {
              initialOpts[opt.title || opt.id] = opt.values[0].value
            }
          })
          setSelectedOptions(initialOpts)
        }

        if (prod.variants && prod.variants.length > 0) {
          setSelectedVariant(prod.variants[0])
        }

        // Load related products
        const allProds = await getStoreProducts({ limit: 8 })
        setRelated(allProds.filter((p: any) => p.id !== prod.id))
      }
      setLoading(false)
    }
    loadProduct()
  }, [handle])

  if (loading) {
    return (
      <div className="px-4 md:px-8 py-24 text-center">
        <p className="text-muted-foreground">Fetching piece details from Medusa...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="px-4 md:px-8 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Piece Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The requested product does not exist in backend.
        </p>
        <Link href="/categories" className="eyebrow underline">
          Back to collection
        </Link>
      </div>
    )
  }

  const title = product.title || 'Untitled Piece'
  const category = product.categories?.[0]?.name || 'Collection'
  const description = product.description || 'An architectural silhouette cut from premium fabrics.'

  // Extract images
  const images: string[] = []
  if (Array.isArray(product.images) && product.images.length > 0) {
    product.images.forEach((img: any) => {
      const url = typeof img === 'string' ? img : img.url
      if (url && !images.includes(url)) images.push(url)
    })
  }
  if (product.thumbnail && !images.includes(product.thumbnail)) {
    images.unshift(product.thumbnail)
  }
  if (images.length === 0) {
    images.push(getProductImage(product))
  }

  const priceDisplay = formatMedusaPrice(selectedVariant || product.variants?.[0])

  return (
    <div className="px-4 md:px-8 py-12">
      <nav className="eyebrow text-muted-foreground mb-8">
        <Link href="/categories" className="hover:text-foreground">
          Catalog
        </Link>
        <span className="mx-2 opacity-40">/</span>
        <Link
          href={`/categories/${category.toLowerCase()}`}
          className="hover:text-foreground capitalize"
        >
          {category}
        </Link>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <ProductGallery images={images} name={title} />
        <div className="md:sticky md:top-24 self-start">
          <div className="eyebrow text-muted-foreground mb-3 capitalize">{category}</div>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.05]">{title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="tabular-nums text-lg font-sans font-medium">{priceDisplay}</span>
            <span className="text-muted-foreground">·</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Star className="h-3 w-3 fill-foreground text-foreground" />
              4.9 (42 client reviews)
            </span>
          </div>

          {/* Product Options dynamically rendered from Medusa */}
          {product.options &&
            product.options.map((opt: any) => (
              <div key={opt.id} className="mt-8">
                <div className="eyebrow mb-3">
                  {opt.title} ·{' '}
                  <span className="text-muted-foreground">{selectedOptions[opt.title] || ''}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opt.values &&
                    opt.values.map((v: any) => {
                      const valStr = typeof v === 'string' ? v : v.value
                      const active = selectedOptions[opt.title] === valStr
                      return (
                        <button
                          key={v.id || valStr}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [opt.title]: valStr }))
                          }
                          className={`h-11 min-w-14 border px-3 text-sm ${
                            active
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground/50'
                          }`}
                        >
                          {valStr}
                        </button>
                      )
                    })}
                </div>
              </div>
            ))}

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center border border-border h-12">
              <button
                className="px-3 h-full"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
              <button
                className="px-3 h-full"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => {
                const variantToCart = selectedVariant || product.variants?.[0]
                addItem({
                  id: variantToCart?.id || product.id,
                  slug: handle,
                  name: title,
                  price: variantToCart?.calculated_price?.calculated_amount ?? 10,
                  image: images[0],
                  size: selectedOptions['Size'] || 'Default',
                  color: selectedOptions['Color'] || 'Standard',
                  qty,
                })
                toast.success(`Added ${title} to bag.`)
              }}
              className="flex-1 h-12 bg-foreground text-background eyebrow hover:opacity-90"
            >
              Add to Bag · {priceDisplay}
            </button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Complimentary shipping worldwide. Express delivery within 3–5 business days.
          </p>

          <div className="mt-10">
            <Accordion type="multiple" defaultValue={['desc']} className="w-full">
              <AccordionItem value="desc">
                <AccordionTrigger className="eyebrow">Description</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="eyebrow">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Complimentary worldwide shipping on all orders. 30-day returns on unworn pieces
                  with original packaging.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <Reviews rating={4.9} count={42} />
      {related.length > 0 && <RelatedCarousel products={related} />}
    </div>
  )
}
