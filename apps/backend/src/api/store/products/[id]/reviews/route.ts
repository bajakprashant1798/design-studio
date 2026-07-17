import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import ReviewModuleService from '../../../../../modules/reviews/service'

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const reviewsModuleService: ReviewModuleService = req.scope.resolve('reviews')
  const productId = req.params.id

  try {
    const reviews = await reviewsModuleService.listReviews({ product_id: productId })
    res.status(200).json({ reviews })
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to list reviews.' })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const reviewsModuleService: ReviewModuleService = req.scope.resolve('reviews')
  const productId = req.params.id

  const { customer_name, rating, comment } = req.body as {
    customer_name: string
    rating: number
    comment: string
  }

  if (!customer_name || rating === undefined) {
    return res.status(400).json({ message: 'Customer name and rating score are required.' })
  }

  try {
    const review = await reviewsModuleService.createReviews({
      product_id: productId,
      customer_name,
      rating: Number(rating),
      comment: comment || '',
    })

    res.status(201).json({ review })
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to create review.' })
  }
}
