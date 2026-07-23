import Medusa from '@medusajs/js-sdk'

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

export async function getDefaultRegionId(): Promise<string> {
  try {
    const { regions } = await medusa.store.region.list()
    return regions[0]?.id || ''
  } catch (err) {
    console.error('Failed to fetch default region ID:', err)
    return ''
  }
}

export async function getProductCategories() {
  try {
    const response = await medusa.store.category.list()
    return response.product_categories || []
  } catch (err) {
    console.error('Failed to fetch product categories:', err)
    return []
  }
}

export async function getStoreProducts(params?: {
  category_id?: string[]
  handle?: string
  q?: string
  limit?: number
  offset?: number
  region_id?: string
}) {
  try {
    const regionId = params?.region_id || (await getDefaultRegionId())
    const queryParams: any = {
      fields: '*variants.calculated_price,*categories,*images,*options.values',
      limit: params?.limit || 50,
      offset: params?.offset || 0,
    }
    if (regionId) queryParams.region_id = regionId
    if (params?.category_id && params.category_id.length > 0) {
      queryParams.category_id = params.category_id
    }
    if (params?.handle) queryParams.handle = params.handle
    if (params?.q) queryParams.q = params.q

    const response = await medusa.store.product.list(queryParams)
    return response.products || []
  } catch (err) {
    console.error('Failed to fetch store products:', err)
    return []
  }
}

export function formatMedusaPrice(variant?: any, defaultCurrency: string = 'EUR'): string {
  if (!variant) return ''
  const amount =
    variant.calculated_price?.calculated_amount ??
    (variant.prices?.[0]?.amount ? variant.prices[0].amount / 100 : 0)
  const currency = (
    variant.calculated_price?.currency_code ||
    variant.prices?.[0]?.currency_code ||
    defaultCurrency
  ).toUpperCase()

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getProductImage(product: any): string {
  if (!product) return '/assets/hero.jpg'
  if (product.thumbnail) return product.thumbnail
  if (Array.isArray(product.images) && product.images.length > 0) {
    const img = product.images[0]
    return typeof img === 'string' ? img : img.url || '/assets/hero.jpg'
  }
  return '/assets/hero.jpg'
}
