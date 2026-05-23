"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-secondary/40" />
      
      {/* Floating Hearts */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 right-16 sm:right-32"
      >
        <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-primary/30 fill-primary/20" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-48 left-16 sm:left-24"
      >
        <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 text-primary/40" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 right-24 sm:right-40"
      >
        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary/25 fill-primary/15" />
      </motion.div>

      {/* Soft Blurred Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 sm:right-20 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 left-10 sm:left-20 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-accent/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium tracking-wide text-primary">Handcrafted with Love</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight text-foreground mb-6"
            >
              <span className="block">Nails</span>
              <span className="block text-primary italic">Best Accessory</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Discover the magic of wearable art. Each press-on set is a tiny masterpiece, 
              handcrafted to make your fingertips sparkle with personality and charm.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="#gallery"
                className="group px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded-full hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
              >
                <Heart className="w-4 h-4" />
                Shop Collection
              </Link>
              <Link
                href="#booking"
                className="px-8 py-4 border-2 border-primary/30 text-foreground text-sm font-medium tracking-wide rounded-full hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 inline-flex items-center justify-center"
              >
                Custom Order
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              {/* Main Image */}
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM-L8grJmHMcXt5Mx7ZZGI2wfAQJTgEGC.jpeg"
                  alt="Beautiful handcrafted nail art featuring koi fish and floral designs"
                  width={600}
                  height={750}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              {/* Decorative Frame */}
              <motion.div
                animate={{
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-3 border-2 border-dashed border-primary/30 rounded-[2.5rem] -z-0"
              />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -bottom-4 -left-4 sm:left-auto sm:-right-4 glass p-4 rounded-2xl shadow-lg border border-primary/20"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary fill-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Follow for more</p>
                    <p className="text-sm font-semibold text-foreground">@delicaraa</p>
                    <p className="text-[10px] text-muted-foreground">by dhriti</p>
                  </div>
                </div>
              </motion.div>

              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-4 right-8 glass px-4 py-2 rounded-full shadow-lg border border-primary/20"
              >
                <span className="text-xs font-medium text-primary">100% Reusable</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
            <motion.div className="w-1.5 h-3 bg-primary/60 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
