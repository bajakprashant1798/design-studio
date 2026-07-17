import Link from "next/link"
import { medusa } from "@/lib/medusa"

export const dynamic = "force-dynamic"

export default async function CollectionsPage() {
  let collections: any[] = []

  try {
    const response = await medusa.store.collection.list()
    collections = response.collections || []
  } catch (err) {
    console.error("Failed to query collections:", err)
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      <header className="space-y-4 border-b border-zinc-150 pb-8 dark:border-zinc-800">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          CURATED ARCHIVE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-black dark:text-white">
          Collections
        </h1>
      </header>

      {collections.length === 0 ? (
        <div className="py-16 text-center space-y-6 max-w-sm mx-auto">
          <p className="text-xs text-zinc-500 font-light leading-relaxed">
            We are currently refining our seasonal lookbooks. In the meantime, explore our functional categories for high-quality everyday essentials.
          </p>
          <Link
            href="/categories"
            className="inline-block bg-black text-white text-xs font-semibold tracking-widest uppercase px-6 py-2.5 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors duration-150"
          >
            Browse Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col) => (
            <Link key={col.id} href={`/collections/${col.handle}`} className="group relative block aspect-[3/2] overflow-hidden bg-zinc-100">
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="font-serif text-xl tracking-tight">{col.title}</h3>
                <p className="text-[10px] tracking-widest uppercase mt-1">Explore</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
