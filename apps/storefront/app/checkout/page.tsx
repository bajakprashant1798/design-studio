import { getCart } from '@/lib/actions/cart'
import { redirect } from 'next/navigation'
import CheckoutForm from './checkout-form'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage() {
  const cart = await getCart()

  // Redirect to home page if cart is empty or doesn't exist
  if (!cart || !cart.items || cart.items.length === 0) {
    redirect('/')
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <header className="space-y-4 border-b border-zinc-150 pb-8 dark:border-zinc-800">
        <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
          SECURE TRANSACTIONS
        </span>
        <h1 className="font-serif text-3xl tracking-tight text-black dark:text-white">Checkout</h1>
      </header>

      {/* Renders interactive form layout */}
      <CheckoutForm cart={cart} />
    </div>
  )
}
