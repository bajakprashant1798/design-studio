'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryProps {
  images: { id: string; url: string }[]
  thumbnail?: string
}

export default function Gallery({ images, thumbnail }: GalleryProps) {
  const displayImages =
    images && images.length > 0 ? images : thumbnail ? [{ id: 'thumbnail', url: thumbnail }] : []

  const [activeIdx, setActiveIdx] = useState(0)
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({})

  if (displayImages.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs uppercase tracking-widest">
        No Image Available
      </div>
    )
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.5)',
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    })
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Sidebar */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-[3/4] w-16 flex-shrink-0 overflow-hidden border transition-all duration-150 ${
                idx === activeIdx
                  ? 'border-black dark:border-white'
                  : 'border-zinc-150 dark:border-zinc-800'
              }`}
            >
              <Image
                src={img.url}
                alt="Product thumbnail"
                fill
                sizes="64px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Viewport with Zoom capability */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={displayImages[activeIdx].url}
          alt="Product details spotlight"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-300 ease-out"
          style={zoomStyle}
        />
      </div>
    </div>
  )
}
