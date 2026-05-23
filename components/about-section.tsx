"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Heart, Star, Gem } from "lucide-react"

const nailFeatures = [
  {
    icon: Sparkles,
    title: "Handcrafted Quality",
    description: "Each nail is meticulously crafted by hand with premium materials for a flawless finish that lasts.",
  },
  {
    icon: Heart,
    title: "Reusable Design",
    description: "Our press-ons can be worn multiple times with proper care. Eco-friendly and wallet-friendly!",
  },
  {
    icon: Star,
    title: "Unique Artistry",
    description: "From 3D flowers to chrome finishes, every set features one-of-a-kind designs you won&apos;t find anywhere else.",
  },
  {
    icon: Gem,
    title: "Premium Embellishments",
    description: "Genuine crystals, gold foils, and hand-sculpted 3D elements that make your nails truly special.",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 sm:py-32 bg-secondary/40">
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
            <span className="text-sm font-medium tracking-wide text-primary">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Nails That Tell <span className="text-primary italic">Your Story</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every set of Delicaraa press-ons is more than just nails - they&apos;re tiny canvases 
            of self-expression, crafted to match your unique vibe and style.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {nailFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div className="h-full p-6 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 font-serif">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Image Gallery with Details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg group"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.58%20PM-FY7ahxfclq4vgWjfPtnjPlgxpGI4f9.jpeg"
                  alt="Velvet Rose Collection - Pink nails with gold 3D roses"
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-lg mt-8 group"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.20.00%20PM-ha6Xq1FG6KHOjl2fkpMAsEk91FTbAx.jpeg"
                  alt="Autumn Elegance - Nude and brown French tips with gold leaf"
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
            
            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, type: "spring" }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-xs opacity-90">Happy Girls</p>
                </div>
                <div className="w-px h-10 bg-primary-foreground/30" />
                <div className="text-center">
                  <p className="text-2xl font-bold">100+</p>
                  <p className="text-xs opacity-90">Unique Designs</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">
              What Makes Our Press-Ons Special?
            </h3>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <span className="text-primary font-semibold">Premium Materials:</span> We use only the highest quality 
                nail tips, gels, and embellishments. Our crystals are hand-placed, and our 3D elements 
                are sculpted with care.
              </p>
              <p>
                <span className="text-primary font-semibold">Perfect Fit:</span> Each set includes 10 nails in various 
                sizes to ensure you get the perfect fit. Plus, we include application tips and nail prep 
                essentials!
              </p>
              <p>
                <span className="text-primary font-semibold">Long-Lasting:</span> With proper application, our press-ons 
                can last 1-2 weeks. And because they&apos;re reusable, you can rock your favorite designs 
                again and again!
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Salon Quality", "No Damage", "Easy Apply", "Customizable"].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
