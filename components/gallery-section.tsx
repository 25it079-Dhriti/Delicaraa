"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { X, Heart, ShoppingBag, Sparkles, SearchX } from "lucide-react"
import { useStore, NailDesign } from "@/lib/store"

export const galleryItems: NailDesign[] = [
  {
    id: "midnight-glamour",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM%20%282%29-iI7UYpSt5FDqpE1DVReyNrOMsugHP5.jpeg",
    name: "Midnight Glamour",
    description: "Mauve & pink with silver chrome, crystals, and 3D embellishments",
    price: 899,
    category: "Luxury Art",
  },
  {
    id: "black-heart",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.20.00%20PM%20%281%29-2hATBcMZpgPMHg4ajbVuYCmRIBsV8k.jpeg",
    name: "Black Heart",
    description: "Glossy black almond with nude accents and rhinestone hearts",
    price: 649,
    category: "Classic Glam",
  },
  {
    id: "koi-pond-dreams",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM-L8grJmHMcXt5Mx7ZZGI2wfAQJTgEGC.jpeg",
    name: "Koi Pond Dreams",
    description: "Hand-painted koi fish, lily pads, and 3D butterfly art",
    price: 1299,
    category: "3D Embellishments",
  },
  {
    id: "autumn-elegance",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.20.00%20PM-ha6Xq1FG6KHOjl2fkpMAsEk91FTbAx.jpeg",
    name: "Autumn Elegance",
    description: "Nude base with brown French tips and gold leaf accents",
    price: 749,
    category: "French Tips",
  },
  {
    id: "velvet-rose",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.58%20PM-FY7ahxfclq4vgWjfPtnjPlgxpGI4f9.jpeg",
    name: "Velvet Rose",
    description: "Dusty pink velvet finish with gold 3D roses and leaves",
    price: 999,
    category: "Luxury Art",
  },
  {
    id: "starry-giraffe",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.19.59%20PM%20%281%29-7L025vMSZNF0Hk9lHg4EM05wVV6fTI.jpeg",
    name: "Starry Giraffe",
    description: "Pastel yellow & pink with star designs and cow print tips",
    price: 599,
    category: "Minimal Art",
  },
  {
    id: "retro-pastel",
    src: "/images/retro-pastel.jpg",
    name: "Retro Pastel Flowers",
    description: "Pastel retro nail art featuring hand-painted retro flowers, blue/white stripes, red polka dots, and cute stars",
    price: 699,
    category: "Floral Dreams",
  },
  {
    id: "chrome-coke",
    src: "/images/chrome-coke.jpg",
    name: "Diet Coke Chrome",
    description: "Sleek almond nails featuring black and white checkerboard tips, silver metallic chrome details, and burgundy details",
    price: 899,
    category: "Chrome & Mirror",
  },
  {
    id: "jelly-droplet",
    src: "/images/jelly-droplet.jpg",
    name: "3D Pink Jelly Droplets",
    description: "Delicate pink jelly gradient nails with realistic 3D water droplets, a sculptured 3D pink flower, and tiny gold beads",
    price: 1199,
    category: "3D Embellishments",
  },
  {
    id: "tulip-meadow",
    src: "/images/tulip-meadow.jpg",
    name: "Tulip Meadow Press-Ons",
    description: "Premium press-on sets in sage green and soft pink with hand-painted tulips, gold borders, and pearls in a display box",
    price: 999,
    category: "Luxury Art",
  },
  {
    id: "burgundy-leaves",
    src: "/images/burgundy-leaves.jpg",
    name: "Burgundy Leaves",
    description: "Elegant almond shaped nails colored in glossy deep burgundy wine red and light pink with hand-painted delicate red leaves",
    price: 749,
    category: "Classic Glam",
  },
  {
    id: "silver-chrome-bows",
    src: "/images/silver-chrome-bows.jpg",
    name: "Silver Chrome Bows",
    description: "Extremely premium silver cat-eye glitter base with handcrafted 3D gold frames, ribbons/bows, pearls, and gold leaf accents",
    price: 999,
    category: "3D Embellishments",
  },
  {
    id: "blue-floral-waves",
    src: "/images/blue-floral-waves.jpg",
    name: "Blue Floral Waves & Rhinestones",
    description: "Beautiful hand-painted blue flowers with blue/white striped accent nails, gold lining, and clusters of sparkling crystals",
    price: 799,
    category: "Floral Dreams",
  },
  {
    id: "red-glitter-hearts",
    src: "/images/red-glitter-hearts.jpg",
    name: "Glitter Red Heart Tips",
    description: "Chic nude almond base with glittery red heart-shaped French tips, handcrafted and reusable",
    price: 599,
    category: "French Tips",
  },
  {
    id: "indigo-mandala",
    src: "/images/indigo-mandala.jpg",
    name: "Indigo Traditional Mandala",
    description: "Dark indigo blue cat-eye base with intricate white mandala hand-painting, pearls, mirror attachments, and dangling chain connections",
    price: 1099,
    category: "Luxury Art",
  },
  {
    id: "grunge-8ball-stars",
    src: "/images/grunge-8ball-stars.jpg",
    name: "Grunge Retro 8-Ball",
    description: "Cool stiletto/almond shape with zebra print French tips, polka dots, chrome 8-ball accent, purple velvet star, and metal spikes",
    price: 899,
    category: "Minimal Art",
  },
  {
    id: "chrome-wavy-lines",
    src: "/images/chrome-wavy-lines.jpg",
    name: "Silver Chrome Wavy Lines",
    description: "Nude sheer almond gel base with elegant, hand-sculpted metallic silver wavy 3D lines.",
    price: 699,
    category: "Chrome & Mirror",
  },
  {
    id: "cat-eye-roses",
    src: "/images/cat-eye-roses.jpg",
    name: "Cat-Eye Velvet Roses",
    description: "Luxurious pink magnetic cat-eye base featuring hand-painted detailed roses and golden borders.",
    price: 899,
    category: "Luxury Art",
  },
  {
    id: "pastel-vibe-playful",
    src: "/images/pastel-vibe-playful.jpg",
    name: "Pastel Vibe Playfuls",
    description: "Cute mix of hand-painted cherry prints, retro waves, delicate blue leaves, and star art.",
    price: 649,
    category: "Minimal Art",
  },
  {
    id: "holo-fantasy-butterfly",
    src: "/images/holo-fantasy-butterfly.jpg",
    name: "Holo Fantasy Butterflies",
    description: "Extravagant set with butterfly wing structures, chrome borders, holographic shine, and pearls.",
    price: 1199,
    category: "3D Embellishments",
  },
  {
    id: "starry-aura-french",
    src: "/images/starry-aura-french.jpg",
    name: "Aura Star French Tips",
    description: "Chic soft blushing pink aura base accented with gold sunburst stars and gold chrome French tips.",
    price: 999,
    category: "French Tips",
  },
]

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<NailDesign | null>(null)

  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    searchQuery,
    setSearchQuery
  } = useStore()

  const isInCart = (id: string) => cart.some(i => i.id === id)

  const toggleWishlist = (item: NailDesign, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  const handleCartClick = (item: NailDesign, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInCart(item.id)) {
      removeFromCart(item.id)
    } else {
      addToCart(item)
    }
  }

  // Filter items based on the search query
  const filteredItems = galleryItems.filter((item) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase().trim()
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    )
  })

  return (
    <section id="gallery" className="py-24 sm:py-32">
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
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium tracking-wide text-primary">Shop the Collection</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-4">
            Find Your <span className="text-primary italic">Perfect Set</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our handcrafted press-on nail sets. Each design is unique, reusable, 
            and made with love just for you!
          </p>

          {/* Search Indicator */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border/50 text-foreground text-sm rounded-full"
            >
              <span>Showing results for &quot;<strong>{searchQuery}</strong>&quot;</span>
              <button 
                onClick={() => setSearchQuery("")}
                className="ml-1 text-primary hover:text-primary-foreground font-semibold px-2 py-0.5 rounded-full hover:bg-primary transition-colors text-xs"
              >
                Clear
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto p-12 bg-input rounded-3xl border border-border/50 shadow-sm text-center space-y-6"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                <SearchX className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  No designs match your search
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We couldn&apos;t find any nail sets containing &quot;{searchQuery}&quot;. Try typing another keyword, category, or clear the search.
                </p>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/95 transition-all duration-300 shadow-md shadow-primary/25"
              >
                Reset Search Bar
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg bg-card border border-border/50 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Quick Actions Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <button
                            onClick={(e) => toggleWishlist(item, e)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isInWishlist(item.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-white/90 text-foreground hover:bg-primary hover:text-primary-foreground"
                            }`}
                            aria-label={isInWishlist(item.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart className={`w-5 h-5 ${isInWishlist(item.id) ? "fill-current" : ""}`} />
                          </button>
                          <button
                            onClick={(e) => handleCartClick(item, e)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isInCart(item.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-white/90 text-foreground hover:bg-primary hover:text-primary-foreground"
                            }`}
                            aria-label={isInCart(item.id) ? "Remove from cart" : "Add to cart"}
                          >
                            <ShoppingBag className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 text-foreground text-xs font-medium tracking-wider rounded-full shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground font-serif group-hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="text-lg font-bold text-primary whitespace-nowrap">
                            ₹{item.price}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-5">
                        <button
                          onClick={(e) => toggleWishlist(item, e)}
                          className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            isInWishlist(item.id)
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(item.id) ? "fill-current" : ""}`} />
                          {isInWishlist(item.id) ? "Saved" : "Save"}
                        </button>
                        <button
                          onClick={(e) => handleCartClick(item, e)}
                          className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            isInCart(item.id)
                              ? "bg-primary text-primary-foreground"
                              : "bg-foreground text-background hover:bg-foreground/90"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          {isInCart(item.id) ? "Added" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com/delicaraa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary/30 text-foreground text-sm font-medium tracking-wide rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
          >
            View More on Instagram
            <Heart className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                        {selectedImage.category}
                      </span>
                      <h3 className="text-2xl font-serif font-semibold text-foreground">
                        {selectedImage.name}
                      </h3>
                    </div>
                    <span className="text-2xl font-bold text-primary">₹{selectedImage.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-5">{selectedImage.description}</p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => toggleWishlist(selectedImage, e)}
                      className={`flex-1 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isInWishlist(selectedImage.id)
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "border border-border hover:border-primary/50"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(selectedImage.id) ? "fill-current" : ""}`} />
                      {isInWishlist(selectedImage.id) ? "Saved" : "Save to Wishlist"}
                    </button>
                    <button
                      onClick={(e) => handleCartClick(selectedImage, e)}
                      className={`flex-1 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isInCart(selectedImage.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      {isInCart(selectedImage.id) ? "In Cart (Remove)" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
