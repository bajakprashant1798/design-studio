'use server'

import { cookies } from 'next/headers'
import { medusa } from '@/lib/medusa'

export async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies()
  let cartId = cookieStore.get('cart_id')?.value

  if (!cartId) {
    try {
      const { cart } = await medusa.store.cart.create({
        region_id: 'reg_01KXPHZG8SZD8BZV5TZ8MQBRG6',
      })
      cartId = cart.id
      cookieStore.set('cart_id', cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    } catch (err) {
      console.error('Failed to create cart session in Medusa:', err)
      throw new Error('Unable to initialize shopping cart session.')
    }
  }

  return cartId
}

export async function getCart() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) return null

  try {
    const { cart } = await medusa.store.cart.retrieve(cartId, {
      fields: '+items.thumbnail,+items.title,+items.variant',
    })
    return cart
  } catch (err) {
    console.error('Failed to retrieve cart details:', err)
    // Clear invalid/stale cart cookie in case it was deleted on the server
    cookieStore.delete('cart_id')
    return null
  }
}

export async function addToCartAction(variantId: string, quantity: number) {
  const cartId = await getOrCreateCartId()
  const { cart } = await medusa.store.cart.createLineItem(cartId, {
    variant_id: variantId,
    quantity,
  })
  return cart
}

export async function updateCartItemAction(lineItemId: string, quantity: number) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) throw new Error('No active shopping cart session.')

  const { cart } = await medusa.store.cart.updateLineItem(cartId, lineItemId, {
    quantity,
  })
  return cart
}

export async function removeFromCartAction(lineItemId: string) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) throw new Error('No active shopping cart session.')

  const response = await medusa.store.cart.deleteLineItem(cartId, lineItemId)
  return response.parent
}

export async function applyPromoCodeAction(code: string) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) throw new Error('No active shopping cart session.')

  const { cart } = await medusa.store.cart.update(cartId, {
    promo_codes: [code],
  })
  return cart
}

export async function completeCartAction(shippingAddress: {
  email: string
  first_name: string
  last_name: string
  address_1: string
  city: string
  country_code?: string
}) {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cart_id')?.value
  if (!cartId) throw new Error('No active shopping cart session.')

  try {
    // 1. Update cart shipping details
    await medusa.store.cart.update(cartId, {
      email: shippingAddress.email,
      shipping_address: {
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        address_1: shippingAddress.address_1,
        city: shippingAddress.city,
        country_code: shippingAddress.country_code || 'dk',
      },
    })

    // 2. Resolve shipping options and select the first active option
    const { shipping_options } = await medusa.store.fulfillment.listCartOptions({
      cart_id: cartId,
    })
    if (shipping_options && shipping_options.length > 0) {
      await medusa.store.cart.addShippingMethod(cartId, {
        option_id: shipping_options[0].id,
      })
    }

    // 3. Complete the cart transactions
    const result = await medusa.store.cart.complete(cartId)

    // Clear cart cookie session upon order completion
    cookieStore.delete('cart_id')

    if (result.type === 'order') {
      return {
        success: true,
        orderId: result.order.id,
      }
    } else {
      throw new Error(result.error?.message || 'Checkout transaction completion failed.')
    }
  } catch (err: any) {
    console.error('Cart checkout completion failed:', err)
    throw new Error(err.message || 'Failed to complete checkout transaction.')
  }
}
