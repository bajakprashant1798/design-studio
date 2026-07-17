import { getCustomerSession, logoutCustomer } from "@/lib/actions/customer"
import AccountLoginForm from "./login-form"
import { medusa } from "@/lib/medusa"
import { formatAmount } from "@/lib/prices"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AccountPage() {
  const session = await getCustomerSession()

  if (!session) {
    return <AccountLoginForm />
  }

  let orders: any[] = []
  let errorMsg = ""

  try {
    // Fetch orders matching customer email from Medusa core
    const response = await medusa.store.order.list({
      // We wrap the email query in filters
      // Note: Medusa v2 lists orders matching email or customer
      // If we don't have custom query filters, it returns list
    })
    
    // Filter matching email on server side for simple session linkage
    const allOrders = response.orders || []
    orders = allOrders.filter((ord: any) => ord.email?.toLowerCase() === session.email.toLowerCase())
  } catch (err: any) {
    console.error("Failed to query customer orders:", err)
    errorMsg = err.message || "Failed to load order history."
  }

  // Handle logout submission in action handler
  const handleLogout = async () => {
    "use server"
    await logoutCustomer()
  }

  return (
    <div className="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8 space-y-16">
      
      {/* Account Dashboard Header */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-4 border-b border-zinc-150 pb-8 dark:border-zinc-800">
        <div className="space-y-2">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-zinc-400 uppercase">
            MEMBER AREA
          </span>
          <h1 className="font-serif text-3xl tracking-tight text-black dark:text-white">
            Hello, {session.name}
          </h1>
          <p className="text-xs text-zinc-500 font-light">{session.email}</p>
        </div>
        
        {/* Logout Form Trigger */}
        <form action={handleLogout}>
          <button
            type="submit"
            className="border border-zinc-300 dark:border-zinc-800 text-[10px] font-semibold tracking-widest uppercase px-6 py-2.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-150"
          >
            Logout
          </button>
        </form>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Previous Orders log */}
        <section className="lg:col-span-8 space-y-6">
          <h2 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
            Order History ({orders.length})
          </h2>

          {errorMsg ? (
            <p className="text-xs text-zinc-450 font-light">{errorMsg}</p>
          ) : orders.length === 0 ? (
            <div className="border border-dashed border-zinc-200 p-8 text-center text-xs text-zinc-400 font-light dark:border-zinc-850">
              No orders found linked to this account. Place your first purchase to generate logs.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const currencyCode = order.currency_code || "eur"
                return (
                  <div
                    key={order.id}
                    className="border border-zinc-200 p-6 dark:border-zinc-850 space-y-4 text-xs font-light text-zinc-500 dark:text-zinc-400"
                  >
                    <div className="flex flex-col sm:flex-row justify-between border-b border-zinc-100 dark:border-zinc-850 pb-3 gap-y-1.5">
                      <div>
                        <span className="font-semibold text-black dark:text-white block">
                          Order ID: {order.id}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                          {formatAmount({ amount: order.total, currencyCode })}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">
                          Captured
                        </span>
                      </div>
                    </div>

                    {/* Order items count */}
                    <div className="flex justify-between items-center pt-1">
                      <span>Items: {order.items?.length || 0} items purchased</span>
                      <Link
                        href={`/orders/${order.id}`}
                        className="underline font-semibold hover:text-black dark:hover:text-white text-[10px]"
                      >
                        View Receipt
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Member Details sidebar */}
        <aside className="lg:col-span-4 border border-zinc-200 p-6 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-6">
          <h2 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
            Profile Details
          </h2>
          <div className="space-y-4 text-xs font-light text-zinc-500 dark:text-zinc-450">
            <div>
              <span className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase block">
                Primary Contact
              </span>
              <p className="font-medium text-black dark:text-white mt-1">{session.name}</p>
              <p className="mt-0.5">{session.email}</p>
            </div>
            <div>
              <span className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase block">
                Shipping Addresses
              </span>
              <p className="mt-1">No saved addresses. Set up during checkout.</p>
            </div>
          </div>
        </aside>

      </div>

    </div>
  )
}
