import { lookbook } from '@/data/lookbook'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lookbook AW26 — Design Studio',
  description:
    'The AW26 editorial: silent form, concrete tailoring, and the architecture of shadow.',
}

export default function LookbookPage() {
  return (
    <div className="px-4 md:px-8 py-16">
      <header className="max-w-3xl mb-16">
        <div className="eyebrow text-muted-foreground mb-4">AW26 · Editorial</div>
        <h1 className="font-serif text-5xl md:text-8xl leading-[0.95]">Silent Form</h1>
        <p className="mt-6 text-muted-foreground max-w-xl">
          Six chapters. One vocabulary of light, weight, and line. Photographed in concrete rooms
          and empty warehouses across Paris and Milan.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lookbook.map((l, i) => (
          <figure
            key={l.id}
            className={`relative overflow-hidden bg-muted group ${
              l.tall ? 'md:row-span-2 aspect-[3/4] md:aspect-[3/6]' : 'aspect-[3/4]'
            } ${i === 0 ? 'md:col-span-2 md:row-span-2 md:aspect-[6/6]' : ''}`}
          >
            <img
              src={l.image}
              alt={l.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
              <div className="eyebrow opacity-80">{l.chapter}</div>
              <div className="font-serif text-2xl md:text-3xl mt-1">{l.title}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
