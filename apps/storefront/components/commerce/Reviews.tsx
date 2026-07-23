'use client'

import { Star } from 'lucide-react'
import { reviews } from '@/data/reviews'

export function Reviews({ rating = 4.9, count = 128 }: { rating?: number; count?: number }) {
  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h2 className="font-serif text-3xl md:text-4xl">Client Reviews</h2>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`h-4 w-4 ${n <= Math.round(rating) ? 'fill-foreground text-foreground' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
          <span className="tabular-nums">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">· {count} reviews</span>
        </div>
      </div>
      <ul className="grid gap-8 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.id} className="border-t border-border pt-6">
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-3 w-3 ${n <= r.rating ? 'fill-foreground text-foreground' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <div className="font-serif text-xl mb-2">{r.title}</div>
            <p className="text-sm text-muted-foreground">{r.body}</p>
            <div className="eyebrow text-muted-foreground mt-4">
              {r.author} · {r.date}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
