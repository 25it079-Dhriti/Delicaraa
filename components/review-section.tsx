"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Star, Heart, Send, Camera, Sparkles, MessageCircle } from "lucide-react"
import Image from "next/image"

const existingReviews = [
  {
    name: "Priya S.",
    rating: 5,
    comment: "Absolutely in love with my nails! The quality is amazing and they lasted 2 weeks. Will definitely order again!",
    design: "Velvet Rose",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.58%20PM-FY7ahxfclq4vgWjfPtnjPlgxpGI4f9.jpeg",
  },
  {
    name: "Ananya M.",
    rating: 5,
    comment: "The 3D details are so pretty! Everyone keeps asking where I got my nails done. Thank you Dhriti!",
    design: "Koi Pond Dreams",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM-L8grJmHMcXt5Mx7ZZGI2wfAQJTgEGC.jpeg",
  },
  {
    name: "Riya K.",
    rating: 5,
    comment: "Perfect fit! The sizing guide with coin really helped. These are salon quality at home prices!",
    design: "Autumn Elegance",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.20.00%20PM-ha6Xq1FG6KHOjl2fkpMAsEk91FTbAx.jpeg",
  },
]

export function ReviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewData, setReviewData] = useState({
    name: "",
    comment: "",
    design: "",
  })
  const [reviewPhoto, setReviewPhoto] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create WhatsApp message with review
    const message = `New Review for Delicaraa!\n\nName: ${reviewData.name}\nRating: ${"★".repeat(rating)}${"☆".repeat(5-rating)}\nDesign: ${reviewData.design}\nReview: ${reviewData.comment}\n\n${reviewPhoto ? "(Photo attached separately)" : ""}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setReviewPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium tracking-wide text-primary">Share Your Love</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Leave a
            <span className="text-primary italic"> Review</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Got your nails? We would love to hear about your experience! 
            Share your photos and help other nail girlies find their perfect set.
          </p>
        </motion.div>

        {/* Existing Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {existingReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={review.image}
                  alt={review.design}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 px-2 py-1 bg-background/90 rounded-full text-xs font-medium text-foreground">
                  {review.design}
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {`"${review.comment}"`}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">{review.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Submit Review Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="text-center p-12 bg-card rounded-3xl shadow-lg border border-border/50">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-green-600 fill-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                Thank You for Your Review!
              </h3>
              <p className="text-muted-foreground mb-6">
                Your feedback means the world to us. It will be added to our page soon!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Write Another Review
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-card rounded-3xl shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">Write Your Review</h3>
              </div>

              <div className="space-y-5">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-3 text-sm text-muted-foreground">
                        {rating === 5 ? "Perfect!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Okay" : "Could be better"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={reviewData.name}
                    onChange={handleChange}
                    required
                    placeholder="How should we call you?"
                    className="w-full px-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Design Ordered */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Which Design Did You Get?
                  </label>
                  <input
                    type="text"
                    name="design"
                    value={reviewData.design}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Velvet Rose, Koi Pond Dreams..."
                    className="w-full px-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Share a Photo of Your Nails
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="review-photo"
                  />
                  <label
                    htmlFor="review-photo"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-input rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all group"
                  >
                    {reviewPhoto ? (
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                          <img src={reviewPhoto} alt="Review photo" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">Photo added!</p>
                          <p className="text-xs text-muted-foreground">Click to change</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Camera className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          Add a photo of your gorgeous nails
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Review
                  </label>
                  <textarea
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your experience! How was the quality? Did they fit perfectly? Would you recommend to your besties?"
                    className="w-full px-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={rating === 0}
                  className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-wide rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
