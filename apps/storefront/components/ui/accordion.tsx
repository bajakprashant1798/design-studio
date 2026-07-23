'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Accordion({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  type?: string
  defaultValue?: string[]
}) {
  return <div className={cn('divide-y divide-border', className)}>{children}</div>
}

export function AccordionItem({ children }: { value: string; children: React.ReactNode }) {
  return <div className="border-b border-border py-1">{children}</div>
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(true)
  return (
    <button
      type="button"
      onClick={(e) => {
        const target = e.currentTarget
        setOpen((prev) => {
          const nextState = !prev
          const content = target.nextElementSibling as HTMLElement
          if (content) content.style.display = nextState ? 'block' : 'none'
          return nextState
        })
      }}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left w-full',
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
          open && 'rotate-180'
        )}
      />
    </button>
  )
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('pb-4 pt-0 text-sm text-muted-foreground leading-relaxed', className)}>
      {children}
    </div>
  )
}
