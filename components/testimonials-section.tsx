"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Star, Quote, Heart, Sparkles } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Regular Customer",
    image: "PS",
    rating: 5,
    text: "OMG these press-ons are literally the best! The quality is amazing and they lasted me 2 weeks without any issues. Already ordered my third set!",
  },
  {
    name: "Ananya Patel",
    role: "First Purchase",
    image: "AP",
    rating: 5,
    text: "Found Delicaraa on Insta and I&apos;m obsessed! The 3D flower set is SO pretty. Everyone keeps asking where I got my nails done. Bestie approved!",
  },
  {
    name: "Riya Khanna",
    role: "Bridal Order",
    image: "RK",
    rating: 5,
    text: "Got custom bridal nails for my wedding and they were PERFECT. The attention to detail was insane. Thank you for making my nails the star of my Mehendi!",
  },
  {
    name: "Simran Kaur",
    role: "Regular Customer",
    image: "SK",
    rating: 5,
    text: "These are SO much better than salon nails tbh. Reusable, cute designs, and no damage to my natural nails. Plus the customer service is super sweet!",
  },
]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-secondary/40">
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
            <span className="text-sm font-medium tracking-wide text-primary">Happy Customers</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Girls Are <span className="text-primary italic">Loving It</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it! Here&apos;s what our nail babes 
            have to say about their Delicaraa experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="h-full p-8 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300 relative">
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground leading-relaxed mb-6">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.image}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-sm border border-border/50">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              5.0 rating
            </span>
            <span className="text-primary">|</span>
            <span className="text-sm text-foreground font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-primary" />
              500+ happy girls
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
