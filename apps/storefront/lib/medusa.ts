import Medusa from '@medusajs/js-sdk'

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

export async function getDefaultRegionId(): Promise<string> {
  try {
    const { regions } = await medusa.store.region.list()
    return regions[0]?.id || ''
  } catch (err) {
    console.error('Failed to fetch default region ID:', err)
    return ''
  }
}
