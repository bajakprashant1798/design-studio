import { MetadataRoute } from "next"
import { medusa } from "@/lib/medusa"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/collections",
    "/categories",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  // Dynamic Category routes
  try {
    const { product_categories } = await medusa.store.category.list()
    const categoryRoutes = (product_categories || []).map((cat: any) => ({
      url: `${baseUrl}/categories/${cat.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
    routes.push(...categoryRoutes)
  } catch (err) {
    console.error("Failed to query categories for sitemap:", err)
  }

  // Dynamic Product routes
  try {
    const { products } = await medusa.store.product.list({ limit: 100 })
    const productRoutes = (products || []).map((prod: any) => ({
      url: `${baseUrl}/products/${prod.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
    routes.push(...productRoutes)
  } catch (err) {
    console.error("Failed to query products for sitemap:", err)
  }

  return routes
}
