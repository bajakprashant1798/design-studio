export function getProductPrice(product: any) {
  if (!product.variants || product.variants.length === 0) return null

  // Find the cheapest variant or just default to the first variant
  const variant = product.variants[0]
  if (!variant.calculated_price) return null

  return {
    amount: variant.calculated_price.calculated_amount,
    currencyCode: variant.calculated_price.currency_code,
  }
}

export function formatAmount({
  amount,
  currencyCode,
  locale = 'en-US',
}: {
  amount: number
  currencyCode: string
  locale?: string
}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}
