export type Category = string

export type Product = {
  id: string
  slug: string
  name: string
  category: Category
  price: number
  colors: { name: string; hex: string }[]
  sizes: string[]
  images: string[]
  description: string
  fabric: string
  care: string
  rating: number
  reviewCount: number
  isNew?: boolean
}

export const products: Product[] = []
export const featuredProducts = () => []
export const productBySlug = (slug: string) => undefined
export const productsByCategory = (c: Category) => []
