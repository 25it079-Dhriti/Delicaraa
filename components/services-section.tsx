"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Gem, Crown, Heart, Palette, Star, Flower2, Moon, Zap } from "lucide-react"
import Link from "next/link"

const pressOnCategories = [
  {
    icon: Sparkles,
    title: "Classic Glam",
    slug: "classic-glam",
    description: "Timeless solid colors with glossy or matte finish. Perfect for everyday elegance.",
    priceRange: "₹399 - ₹499",
    popular: false,
  },
  {
    icon: Palette,
    title: "French Tips",
    slug: "french-tips",
    description: "Classic French manicure with a twist - colored tips, glitter lines, and more!",
    priceRange: "₹499 - ₹649",
    popular: false,
  },
  {
    icon: Gem,
    title: "Chrome & Mirror",
    slug: "chrome-mirror",
    description: "Stunning metallic and chrome finishes that catch light from every angle.",
    priceRange: "₹549 - ₹699",
    popular: true,
  },
  {
    icon: Star,
    title: "Minimal Art",
    slug: "minimal-art",
    description: "Subtle designs, thin lines, dots, and delicate patterns for understated beauty.",
    priceRange: "₹499 - ₹599",
    popular: false,
  },
  {
    icon: Flower2,
    title: "Floral Dreams",
    slug: "floral-dreams",
    description: "Hand-painted flowers, roses, and botanical designs for the romantic soul.",
    priceRange: "₹649 - ₹899",
    popular: true,
  },
  {
    icon: Crown,
    title: "Luxury Art",
    slug: "luxury-art",
    description: "Intricate hand-painted designs with crystals and gold foil accents.",
    priceRange: "₹799 - ₹1099",
    popular: true,
  },
  {
    icon: Heart,
    title: "3D Embellishments",
    slug: "3d-embellishments",
    description: "Sculptured 3D flowers, bows, hearts, and charms that pop!",
    priceRange: "₹899 - ₹1299",
    popular: true,
  },
  {
    icon: Moon,
    title: "Themed Sets",
    slug: "themed-sets",
    description: "Seasonal, festival, and occasion-specific designs - Diwali, Christmas, etc.",
    priceRange: "₹599 - ₹999",
    popular: false,
  },
  {
    icon: Zap,
    title: "Custom Design",
    slug: "custom-design",
    description: "Your imagination, our creation! Share your inspo and we&apos;ll make it happen.",
    priceRange: "Starting ₹799",
    popular: false,
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary/40">
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
            <span className="text-sm font-medium tracking-wide text-primary">Press-On Styles</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Choose Your <span className="text-primary italic">Nail Vibe</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From subtle and chic to bold and extra - we have press-on sets for every mood, 
            every occasion, and every girl! All handcrafted with love.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressOnCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="group"
              >
                <div className="relative h-full p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  {/* Popular Badge */}
                  {category.popular && (
                    <span className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </span>
                  )}

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-primary font-semibold">{category.priceRange}</span>
                    <Link
                      href={`/styles/${category.slug}`}
                      className="text-xs text-muted-foreground uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-1 font-medium"
                    >
                      View Designs
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 p-8 bg-card rounded-3xl border border-border/50 shadow-sm"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Every Set Includes
            </h3>
            <p className="text-muted-foreground">
              We make sure you have everything for a perfect application!
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💅", title: "10 Press-On Nails", desc: "Various sizes for perfect fit" },
              { icon: "✨", title: "Nail Prep Kit", desc: "File, buffer & alcohol pad" },
              { icon: "💖", title: "Nail Glue", desc: "Strong hold adhesive included" },
              { icon: "📖", title: "Application Guide", desc: "Easy step-by-step tips" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Can&apos;t find what you&apos;re looking for? Let&apos;s create something custom!
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            <Heart className="w-4 h-4" />
            Request Custom Design
          </a>
        </motion.div>
      </div>
    </section>
  )
}
