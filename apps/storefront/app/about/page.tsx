import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us — Design Studio',
  description:
    'Learn about our philosophy of quiet luxury, Italian craftsmanship, and modern uniform tailoring.',
}

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 py-16 max-w-5xl mx-auto">
      <header className="mb-16 border-b border-border/40 pb-12">
        <div className="eyebrow text-muted-foreground mb-4">Our Philosophy</div>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight">
          Quiet form.
          <br />
          Uncompromising line.
        </h1>
      </header>

      <div className="grid gap-12 md:grid-cols-2 text-muted-foreground leading-relaxed text-base mb-16">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-foreground">The Atelier</h2>
          <p>
            Founded with a singular commitment to slow, deliberate craftsmanship, Design Studio
            constructs modern ready-to-wear designed for longevity. Every piece in our collection is
            conceived in our Paris design atelier and brought to life in small family-owned mills
            across Northern Italy.
          </p>
          <p>
            We reject seasonal trends in favor of architectural silhouettes, uncompromised material
            sourcing, and tactile precision.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-foreground">Materiality & Process</h2>
          <p>
            From heavy organic cotton knits to extra-fine Italian virgin wool, our textiles are
            selected for their weight, drape, and enduring feel. Every seam, hem, and button option
            is stress-tested to ensure daily utility without losing form.
          </p>
          <p>
            Our e-commerce store is built on Medusa v2 infrastructure to deliver real-time inventory
            precision, transparent pricing, and instant global fulfillment.
          </p>
        </div>
      </div>

      <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted mb-16">
        <img
          src="/assets/hero.jpg"
          alt="Studio atelier process"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="text-center py-12 border-t border-border/40">
        <h3 className="font-serif text-3xl mb-4">Explore The Collection</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
          Discover our latest releases in Shirts, Sweatshirts, Pants, and Merch available straight
          from our warehouse.
        </p>
        <Link
          href="/categories"
          className="eyebrow bg-foreground text-background px-8 py-4 inline-block hover:opacity-90 transition"
        >
          View All Pieces →
        </Link>
      </div>
    </div>
  )
}
