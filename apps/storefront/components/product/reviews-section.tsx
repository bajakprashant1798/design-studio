"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Star } from "lucide-react"

interface Review {
  id: string
  customer_name: string
  rating: number
  comment: string
  created_at: string
}

interface ReviewsSectionProps {
  productId: string
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const queryClient = useQueryClient()
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [submitError, setSubmitError] = useState("")

  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

  // Fetch reviews via React Query
  const { data, isLoading } = useQuery<{ reviews: Review[] }>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/store/products/${productId}/reviews`, {
        headers: {
          "x-publishable-api-key": publishableKey,
        },
      })
      if (!res.ok) {
        throw new Error("Failed to load reviews.")
      }
      return res.json()
    },
  })

  // Submit review mutation
  const submitMutation = useMutation({
    mutationFn: async (payload: { customer_name: string; rating: number; comment: string }) => {
      const res = await fetch(`${backendUrl}/store/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": publishableKey,
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.message || "Failed to submit review.")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] })
      setName("")
      setRating(5)
      setComment("")
      setSubmitError("")
    },
    onError: (err: any) => {
      setSubmitError(err.message || "Something went wrong.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    submitMutation.mutate({ customer_name: name, rating, comment })
  }

  const reviews = data?.reviews || []
  
  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  return (
    <section className="border-t border-zinc-150 pt-16 dark:border-zinc-800 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Reviews List & Average Header */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-x-4">
            <h2 className="font-serif text-xl tracking-tight text-black dark:text-white">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-x-1.5 text-xs text-zinc-550 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1 border border-zinc-150 dark:border-zinc-850">
              <Star className="h-3.5 w-3.5 fill-black stroke-black dark:fill-white dark:stroke-white" />
              <span className="font-semibold text-black dark:text-white">{avgRating}</span>
              <span className="text-zinc-400">({reviews.length})</span>
            </div>
          </div>

          {isLoading ? (
            <p className="text-xs text-zinc-400 tracking-wider">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-xs text-zinc-450 font-light italic">
              No reviews yet. Share your experience with this item.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-850">
              {reviews.map((rev) => (
                <li key={rev.id} className="py-6 first:pt-0 last:pb-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-black dark:text-white">{rev.customer_name}</span>
                    <span className="text-zinc-400 font-light">
                      {new Date(rev.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  
                  {/* Rating Stars list */}
                  <div className="flex gap-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < rev.rating
                            ? "fill-black stroke-black dark:fill-white dark:stroke-white"
                            : "text-zinc-200 dark:text-zinc-800"
                        }`}
                      />
                    ))}
                  </div>

                  {rev.comment && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                      {rev.comment}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Submit Review Form */}
        <div className="lg:col-span-5 border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950 space-y-6">
          <h3 className="text-xs font-semibold tracking-widest text-zinc-450 uppercase">
            Write a Review
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Rating selector stars buttons */}
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
                Overall Rating
              </span>
              <div className="flex gap-x-1.5 pt-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const val = i + 1
                  const isActive = val <= rating
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(val)}
                      className="text-zinc-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          isActive
                            ? "fill-black stroke-black dark:fill-white dark:stroke-white"
                            : "text-zinc-200 dark:text-zinc-800"
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
                Customer Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Charlotte Rampling"
                className="border-b border-zinc-300 bg-transparent py-2 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase">
                Review Comments
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details of the fit, fabric, and texture."
                className="border border-zinc-300 bg-transparent p-3 text-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:focus:border-white text-black dark:text-white resize-none"
              />
            </div>

            {submitError && <p className="text-[10px] text-red-500 font-light">{submitError}</p>}

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold tracking-widest uppercase py-3 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
