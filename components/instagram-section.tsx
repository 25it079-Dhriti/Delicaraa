"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram, Heart, Sparkles } from "lucide-react"

const instagramPosts = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM%20%282%29-iI7UYpSt5FDqpE1DVReyNrOMsugHP5.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.20.00%20PM%20%281%29-2hATBcMZpgPMHg4ajbVuYCmRIBsV8k.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM-L8grJmHMcXt5Mx7ZZGI2wfAQJTgEGC.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.20.00%20PM-ha6Xq1FG6KHOjl2fkpMAsEk91FTbAx.jpeg",
]

export function InstagramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium tracking-wide text-primary">Follow the Aesthetic</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Join the <span className="text-primary italic">@delicaraa</span> Fam
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay inspired with our latest nail creations! Follow us for daily inspo, 
            new drops, behind-the-scenes, and exclusive offers.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {instagramPosts.map((post, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/delicaraa"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-primary-foreground">
                  <Heart className="w-6 h-6 fill-current" />
                  <Instagram className="w-6 h-6" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/delicaraa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            <Instagram className="w-5 h-5" />
            Follow @delicaraa
            <Heart className="w-4 h-4 fill-current" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
