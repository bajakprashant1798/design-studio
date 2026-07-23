'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  return (
    <footer className="mt-24 border-t border-border/40 bg-background">
      <div className="grid gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="font-serif text-2xl tracking-[0.24em]">DESIGN STUDIO</div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            An editorial house of quiet, uncompromising ready-to-wear. Powered by Medusa v2.
          </p>
          <form
            className="mt-8 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              if (!email) return
              toast.success('Welcome to the studio.')
              setEmail('')
            }}
          >
            <Input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none border-foreground/30 bg-transparent"
            />
            <Button type="submit" className="rounded-none">
              Subscribe
            </Button>
          </form>
        </div>
        <FooterCol
          title="Shop"
          links={[
            ['All Pieces', '/categories'],
            ['Sweatshirts', '/categories/sweatshirts'],
            ['Shirts', '/categories/shirts'],
            ['Pants', '/categories/pants'],
            ['Merch', '/categories/merch'],
          ]}
        />
        <FooterCol
          title="Studio"
          links={[
            ['Lookbook', '/lookbook'],
            ['About Us', '/about'],
          ]}
        />
        <FooterCol title="Services" links={[['Client Care', '/about']]} />
      </div>
      <div className="flex flex-col justify-between gap-4 border-t border-border/40 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Design Studio. All rights reserved.</p>
        <p className="uppercase tracking-[0.2em]">Paris · Milan · New York</p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
