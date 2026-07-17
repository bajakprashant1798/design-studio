import { Module } from "@medusajs/framework/utils"
import ReviewModuleService from "./service"

export default Module("reviews", {
  service: ReviewModuleService,
})
