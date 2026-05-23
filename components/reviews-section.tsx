"use client"

import { useState, useEffect } from "react"
import { Star, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface Review {
  name: string
  review?: string
  comment?: string // from API
  rating: number
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load reviews from API to show to everyone
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews)
        } else {
          const savedReviews = localStorage.getItem("delicaraa_reviews")
          if (savedReviews) {
            setReviews(JSON.parse(savedReviews))
          }
        }
      })
      .catch(() => {
        const savedReviews = localStorage.getItem("delicaraa_reviews")
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews))
        }
      })
  }, [])

  // Submit review to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      name,
      comment: review,
      rating,
      design: "Nail Set", // API requires design field
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      
      if (data.success && data.review) {
        const updatedReviews = [data.review, ...reviews]
        setReviews(updatedReviews)
        localStorage.setItem("delicaraa_reviews", JSON.stringify(updatedReviews))
        toast.success("Review submitted! Everyone can see it now ✨")
        
        setName("")
        setReview("")
        setRating(5)
      } else {
        toast.error("Failed to submit review. Try again later.")
      }
    } catch (err) {
      // Local fallback
      const newReview = { name, review, rating, comment: review }
      const updatedReviews = [newReview, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem("delicaraa_reviews", JSON.stringify(updatedReviews))
      toast.success("Review saved locally! ✨")
      
      setName("")
      setReview("")
      setRating(5)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-5">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">
              Customer Reviews
            </span>
          </div>

          <h2 className="text-4xl font-serif font-semibold text-foreground">
            Loved by Nail Girls ✨
          </h2>
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border/50 rounded-3xl p-8 mb-14 space-y-5"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-input border border-border/50 outline-none"
          />

          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-input border border-border/50 outline-none resize-none"
          />

          {/* Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review ✨"}
          </button>
        </form>

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                "{item.comment || item.review}"
              </p>

              <h4 className="font-semibold text-foreground">
                — {item.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
