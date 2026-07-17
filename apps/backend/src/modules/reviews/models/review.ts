import { model } from "@medusajs/framework/utils"

export const Review = model.define("review", {
  id: model.id().primaryKey(),
  product_id: model.text().index(),
  customer_name: model.text(),
  rating: model.number(),
  comment: model.text(),
})
