'use client'

import { useState } from 'react'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0)
  const displayImages = images.length > 0 ? images : ['/assets/hero.jpg']

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 md:gap-6">
      <div className="flex flex-col gap-3">
        {displayImages.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`aspect-[3/4] w-full overflow-hidden bg-muted border ${
              i === idx ? 'border-foreground' : 'border-transparent hover:border-foreground/40'
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={displayImages[i] || displayImages[0]}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
