import { Hero, Marquee } from '@/components/home/Hero'
import { FeaturedCollection } from '@/components/home/FeaturedCollection'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { LookbookPreview, NewsletterCard } from '@/components/home/LookbookPreview'
import { medusa, getDefaultRegionId } from '@/lib/medusa'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let products: any[] = []

  try {
    const regionId = await getDefaultRegionId()
    const response = await medusa.store.product.list({
      region_id: regionId,
      fields: '*variants.calculated_price',
      limit: 8,
    })
    products = response.products || []
  } catch (err) {
    console.error('Failed to fetch home products from Medusa:', err)
  }

  return (
    <div>
      <Hero />
      <Marquee />
      <FeaturedCollection products={products} />
      <CategoryShowcase />
      <LookbookPreview />
      <NewsletterCard />
    </div>
  )
}
