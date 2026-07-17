import { notFound } from 'next/navigation'
import { medusa } from '@/lib/medusa'
import { formatAmount } from '@/lib/prices'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function OrderSuccessPage({ params }: PageProps) {
  const { id } = await params

  let order: any = null
  let errorMsg = ''

  try {
    const response = await medusa.store.order.retrieve(id, {
      fields:
        '+items.thumbnail,+items.title,+items.variant,+shipping_address.first_name,+shipping_address.last_name,+shipping_address.address_1,+shipping_address.city',
    })
    order = response.order || (response as any).document
  } catch (err: any) {
    console.error('Failed to query order:', err)
    errorMsg = err.message || 'Failed to load order receipt.'
  }

  if (errorMsg || !order) {
    return notFound()
  }

  const currencyCode = order.currency_code || 'eur'

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8 space-y-12">
      {/* Confirmation Greeting */}
      <header className="space-y-4 text-center">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          PURCHASE COMPLETE
        </span>
        <h1 className="font-serif text-3xl tracking-tight text-black dark:text-white">
          Thank you for your order
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
          Your order has been captured. Receipt and shipping details have been sent to your email.
        </p>
      </header>

      {/* Order Details Grid */}
      <div className="border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-zinc-400 font-light uppercase text-[9px] tracking-wider block">
              Order ID
            </span>
            <span className="font-semibold text-black dark:text-white">{order.id}</span>
          </div>
          <div>
            <span className="text-zinc-400 font-light uppercase text-[9px] tracking-wider block">
              Placed on
            </span>
            <span className="font-semibold text-black dark:text-white">
              {new Date(order.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Items */}
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-850">
          {order.items?.map((item: any) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-4 first:pt-0 last:pb-0 text-xs"
            >
              <div>
                <span className="font-medium text-black dark:text-white">{item.title}</span>
                <span className="text-zinc-400 font-light ml-2">x {item.quantity}</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatAmount({ amount: item.unit_price * item.quantity, currencyCode })}
              </span>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs font-light text-zinc-500 dark:text-zinc-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatAmount({ amount: order.subtotal || 0, currencyCode })}</span>
          </div>
          {order.discount_total > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-{formatAmount({ amount: order.discount_total, currencyCode })}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-semibold text-black dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span>Total</span>
            <span>{formatAmount({ amount: order.total || 0, currencyCode })}</span>
          </div>
        </div>
      </div>

      {/* Customer Return Button */}
      <div className="text-center pt-4">
        <Link
          href="/categories"
          className="inline-block bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase px-8 py-3.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors duration-150"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
