'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useStore, formatPrice } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Check } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, clearCart } = useStore()
  const [placed, setPlaced] = useState(false)
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = 0
  const total = subtotal + shipping

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="mx-auto h-14 w-14 rounded-full border border-foreground flex items-center justify-center">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="mt-8 font-serif text-4xl md:text-5xl">Thank you.</h1>
        <p className="mt-4 text-muted-foreground">
          Your order has been received. A confirmation is on its way to your inbox.
        </p>
        <Link
          href="/"
          className="eyebrow inline-block mt-10 border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition"
        >
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 py-12">
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Checkout</h1>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault()
            clearCart()
            setPlaced(true)
          }}
        >
          <section>
            <div className="eyebrow text-muted-foreground mb-4">01 · Contact</div>
            <div className="grid gap-4">
              <Field id="email" label="Email" type="email" />
            </div>
          </section>
          <section>
            <div className="eyebrow text-muted-foreground mb-4">02 · Shipping Address</div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="first" label="First name" />
              <Field id="last" label="Last name" />
              <Field id="addr" label="Address" className="md:col-span-2" />
              <Field id="apt" label="Apt / Suite" className="md:col-span-2" required={false} />
              <Field id="city" label="City" />
              <Field id="zip" label="Postal code" />
              <Field id="country" label="Country" className="md:col-span-2" />
            </div>
          </section>
          <section>
            <div className="eyebrow text-muted-foreground mb-4">03 · Payment</div>
            <div className="grid gap-4">
              <Field id="card" label="Card number" placeholder="1234 5678 9012 3456" />
              <div className="grid grid-cols-2 gap-4">
                <Field id="exp" label="MM / YY" />
                <Field id="cvc" label="CVC" />
              </div>
            </div>
          </section>
          <button
            type="submit"
            className="w-full h-14 bg-foreground text-background eyebrow hover:opacity-90"
            disabled={cart.length === 0}
          >
            Place Order · {formatPrice(total)}
          </button>
        </form>

        <aside className="lg:sticky lg:top-24 self-start">
          <div className="border border-border p-6 space-y-6">
            <div className="eyebrow">Order Summary</div>
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            ) : (
              <ul className="divide-y divide-border -mx-6">
                {cart.map((i) => (
                  <li key={`${i.id}-${i.size}-${i.color}`} className="px-6 py-4 flex gap-4">
                    <img src={i.image} alt={i.name} className="h-20 w-16 object-cover" />
                    <div className="flex-1 text-sm">
                      <div>{i.name}</div>
                      <div className="eyebrow text-muted-foreground mt-1">
                        {i.color} · {i.size} · Qty {i.qty}
                      </div>
                    </div>
                    <div className="text-sm tabular-nums">{formatPrice(i.price * i.qty)}</div>
                  </li>
                ))}
              </ul>
            )}
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value="Complimentary" />
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="eyebrow">Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  type = 'text',
  className = '',
  required = true,
  placeholder,
}: {
  id: string
  label: string
  type?: string
  className?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="eyebrow text-muted-foreground block mb-2">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-none border-foreground/30 bg-transparent h-11"
      />
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  )
}
