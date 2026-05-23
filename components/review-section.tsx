"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Star, Heart, Send, Camera, Sparkles, MessageCircle, User, Award } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  design: string
  image?: string // Base64 or URL
  date: string
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Priya S.",
    rating: 5,
    comment: "Absolutely in love with my press-ons! The sizing prep kit was free and perfect. They look salon-made and have lasted 2 weeks already! 🌸",
    design: "Luxury Art Set",
    date: "May 18, 2026",
  },
  {
    id: "rev-2",
    name: "Ananya M.",
    rating: 5,
    comment: "The 3D details and hand-painted flowers are so gorgeous! Got so many compliments at my bestie's wedding. Will order again!",
    design: "3D & Floral Mix",
    date: "May 20, 2026",
  },
  {
    id: "rev-3",
    name: "Riya K.",
    rating: 5,
    comment: "Excellent quality and reusable. Sizing was exact. Ordering via WhatsApp was super easy and Dhriti was so sweet! 💕",
    design: "Minimal French Tips",
    date: "May 22, 2026",
  },
]

export function ReviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [reviews, setReviews] = useState<Review[]>([])
  
  // Form states
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState("")
  const [design, setDesign] = useState("")
  const [comment, setComment] = useState("")
  const [photoBase64, setPhotoBase64] = useState<string | undefined>(undefined)

  // Load reviews from shared server DB + fallback on mount
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews)
        } else {
          // Fallback to local storage
          const saved = localStorage.getItem("delicaraa_customer_reviews")
          if (saved) {
            setReviews(JSON.parse(saved))
          } else {
            setReviews(DEFAULT_REVIEWS)
            localStorage.setItem("delicaraa_customer_reviews", JSON.stringify(DEFAULT_REVIEWS))
          }
        }
      })
      .catch((err) => {
        console.warn("Server reviews fetch failed, loading fallback:", err)
        const saved = localStorage.getItem("delicaraa_customer_reviews")
        if (saved) {
          setReviews(JSON.parse(saved))
        } else {
          setReviews(DEFAULT_REVIEWS)
        }
      })
  }, [])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Basic image size safety: limit to ~1.5MB for storage stability
      if (file.size > 1500000) {
        toast.error("Photo is too large! Please select an image under 1.5MB 🌸")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !design.trim() || !comment.trim()) {
      toast.error("Please fill out all required fields! 🌸")
      return
    }

    const newReviewPayload = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      design: design.trim(),
      image: photoBase64,
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewPayload),
      })
      const data = await res.json()
      if (data.success && data.review) {
        const updated = [data.review, ...reviews]
        setReviews(updated)
        localStorage.setItem("delicaraa_customer_reviews", JSON.stringify(updated))
        toast.success("Review published! Everyone can see it now, and Dhriti was notified by email! 💖")
      } else {
        toast.error(`Failed to publish: ${data.error || "Please try again"}`)
      }
    } catch (err) {
      toast.error("Network error submitting review. Storing locally instead! 🌸")
      // Local fallback
      const localReview: Review = {
        id: `rev-${Date.now()}`,
        ...newReviewPayload,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }
      const updated = [localReview, ...reviews]
      setReviews(updated)
      localStorage.setItem("delicaraa_customer_reviews", JSON.stringify(updated))
    }

    // Reset Form
    setName("")
    setDesign("")
    setComment("")
    setRating(5)
    setPhotoBase64(undefined)
    setShowForm(false)
  }

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-secondary/20 border-t border-b border-pink-100/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium tracking-wide text-primary">Customer Diaries</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Real Customer
            <span className="text-primary italic"> Reviews</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            See photos and reviews shared by our wonderful nail girlies! Every set is handcrafted to absolute perfection.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/95 transition-all shadow-md shadow-primary/20 flex items-center gap-2 mx-auto text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {showForm ? "Cancel Review" : "Write a Review"}
          </button>
        </motion.div>

        {/* Submit Review Form Slider */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto overflow-hidden mb-16"
            >
              <form
                onSubmit={handleSubmit}
                className="p-8 bg-card rounded-3xl shadow-lg border border-primary/10 space-y-5 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-serif font-semibold text-foreground">Share Your Experience</h3>
                </div>

                {/* Star rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-2">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Nail Set Name</label>
                    <input
                      type="text"
                      required
                      value={design}
                      onChange={(e) => setDesign(e.target.value)}
                      placeholder="e.g. Velvet Rose"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>
                </div>

                {/* Upload photo box (with or without) */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    Upload Nail Photo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="review-image-upload"
                  />
                  <label
                    htmlFor="review-image-upload"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-input rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all group"
                  >
                    {photoBase64 ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={photoBase64}
                          alt="Review thumbnail"
                          className="w-10 h-10 object-cover rounded-lg border"
                        />
                        <div className="text-left">
                          <p className="text-xs font-semibold text-foreground">Photo Attached! 🌸</p>
                          <p className="text-[10px] text-muted-foreground">Click to change photo</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          Add a pretty picture of your nails
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Comment box */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Review</label>
                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Tell us what you loved about your press-ons! Sizing, fit, paint details..."
                    className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 text-sm"
                >
                  <Send className="w-4 h-4 fill-current" />
                  Publish Review
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
            >
              {/* Optional Photo Section */}
              {review.image ? (
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <img
                    src={review.image}
                    alt={review.design}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/90 rounded-full text-[10px] font-semibold text-primary uppercase tracking-wider shadow-sm border border-primary/10">
                    {review.design}
                  </div>
                </div>
              ) : (
                // Text-only top filler to keep design consistent
                <div className="p-5 pb-0 flex items-center justify-between">
                  <div className="px-2.5 py-1 bg-primary/10 rounded-full text-[10px] font-semibold text-primary uppercase tracking-wider border border-primary/20">
                    {review.design}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{review.date}</span>
                </div>
              )}

              {/* Review Text */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/20"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/10">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{review.name}</h4>
                      <p className="text-[9px] text-muted-foreground font-semibold flex items-center gap-0.5">
                        <Award className="w-2.5 h-2.5 text-primary" /> Verified Buyer
                      </p>
                    </div>
                  </div>
                  {review.image && (
                    <span className="text-[10px] text-muted-foreground">{review.date}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
