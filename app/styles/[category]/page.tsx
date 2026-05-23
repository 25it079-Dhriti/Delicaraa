"use client"

import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState, use } from "react"
import { ArrowLeft, Heart, ShoppingBag, Sparkles, MessageCircle, Info, CheckCircle2, ChevronRight } from "lucide-react"
import { useStore, NailDesign } from "@/lib/store"
import { galleryItems } from "@/components/gallery-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { WishlistDrawer } from "@/components/wishlist-drawer"
import { ProfileDrawer } from "@/components/profile-drawer"

const stylesMapping: Record<string, { title: string; description: string; priceRange: string; longDescription: string }> = {
  "classic-glam": {
    title: "Classic Glam",
    priceRange: "₹399 - ₹499",
    description: "Timeless solid colors with glossy or matte finish. Perfect for everyday elegance.",
    longDescription: "Our Classic Glam collection is designed for the modern girl who loves timeless simplicity. Featuring premium solid colors, smooth gradients, and immaculate glossy or velvet matte finishes, these sets are perfect for everyday chic, business meetings, or elegant dinners.",
  },
  "french-tips": {
    title: "French Tips",
    priceRange: "₹499 - ₹649",
    description: "Classic French manicure with a twist - colored tips, glitter lines, and more!",
    longDescription: "French Tips are a staple, but at Delicaraa, we give them a dreamy, modern twist. Explore sets with heart-shaped tips, colorful pastel borders, subtle chrome detailing, and glittering contours. Reusable, strong, and stunningly hand-painted.",
  },
  "chrome-mirror": {
    title: "Chrome & Mirror",
    priceRange: "₹549 - ₹699",
    description: "Stunning metallic and chrome finishes that catch light from every angle.",
    longDescription: "Make heads turn with our high-shine Chrome & Mirror collection. From iridescent pearl glazes to liquid silver chrome and deep metallic hues, these nails reflect light spectacularly. Perfect for adding a futuristic or high-luxury glow to your look.",
  },
  "minimal-art": {
    title: "Minimal Art",
    priceRange: "₹499 - ₹599",
    description: "Subtle designs, thin lines, dots, and delicate patterns for understated beauty.",
    longDescription: "Understated elegance at its finest. Our Minimal Art collection features crisp fine lines, geometric accents, dainty celestial designs, and abstract dots on premium sheer nude bases. Simple, clean, and highly artistic.",
  },
  "floral-dreams": {
    title: "Floral Dreams",
    priceRange: "₹649 - ₹899",
    description: "Hand-painted flowers, roses, and botanical designs for the romantic soul.",
    longDescription: "Designed for the ultimate romantic, our Floral Dreams collection is a garden of handcrafted nail art. Each petal, leaf, and stem is hand-painted with micro-fine brushes. Combined with soft milk baths, realistic outlines, and pastel vibes.",
  },
  "luxury-art": {
    title: "Luxury Art",
    priceRange: "₹799 - ₹1099",
    description: "Intricate hand-painted designs with crystals and gold foil accents.",
    longDescription: "Pure luxury at your fingertips. Our Luxury Art sets feature extremely detailed hand-painted designs, premium rhinestone clusters, gold foil inlays, and pearl embellishments. Handcrafted to turn your hands into a work of authentic luxury.",
  },
  "3d-embellishments": {
    title: "3D Embellishments",
    priceRange: "₹899 - ₹1299",
    description: "Sculptured 3D flowers, bows, hearts, and charms that pop!",
    longDescription: "Step into the extraordinary with our 3D Embellishments. Using premium structural nail gels, we sculpt gorgeous 3D bows, blooming water droplets, flowers, and metallic borders that physically rise off the nail, adding a luxurious textural feel.",
  },
  "themed-sets": {
    title: "Themed Sets",
    priceRange: "₹599 - ₹999",
    description: "Seasonal, festival, and occasion-specific designs - Diwali, Christmas, etc.",
    longDescription: "Celebrate in style with our curated Themed Sets. Whether you're dressing up for a festive celebration like Diwali, readying for holiday cheer, or matching a specific aesthetic, these sets provide instant glamour tailored for the occasion.",
  },
  "custom-design": {
    title: "Custom Design",
    priceRange: "Starting ₹799",
    description: "Your imagination, our creation! Share your inspo and we'll make it happen.",
    longDescription: "Have a dream set in mind? Let us make it a reality! Share your reference images, select your custom shapes, and our nail artists will handcraft a one-of-a-kind press-on set designed exclusively for you. Order through WhatsApp now.",
  },
}

export default function StylePage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = params.category as string
  const styleInfo = stylesMapping[categorySlug] || {
    title: "Nail Designs",
    priceRange: "Premium Quality",
    description: "Explore our handcrafted custom press-on collections.",
    longDescription: "Discover beautiful, handcrafted press-on nails built with salon-quality gel materials. Fully reusable, strong, and customized to fit you perfectly.",
  }

  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useStore()

  const [selectedImage, setSelectedImage] = useState<NailDesign | null>(null)
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

  // Filter products by category title
  const categoryTitle = styleInfo.title
  const designs = galleryItems.filter(
    (item) => item.category.toLowerCase() === categoryTitle.toLowerCase()
  )

  const handleWhatsAppCustomOrder = () => {
    const text = `Hi Dhriti! I am interested in placing a Custom Order for the *${styleInfo.title}* style category. Can you please share the design process and sizing chart?`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/919999999999?text=${encoded}`, "_blank")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-transparent border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,180,184,0.15),transparent)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button 
            onClick={() => router.push("/#services")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Styles
          </button>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/15 text-primary text-xs font-semibold tracking-wider uppercase rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Style
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight">
                {styleInfo.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {styleInfo.longDescription}
              </p>
              
              {/* Sizing Promo Info */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Custom Handcrafted Sizing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>100% Reusable Gel Set</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Includes Sizing Kit</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border/50 shadow-xl space-y-6">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Price Range</span>
                <span className="text-3xl font-bold text-primary font-serif">{styleInfo.priceRange}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Includes full application prep kit (nail glue, tabs, buffer, cuticle stick, and prep pads) and a beautiful display storage box.
              </p>
              <button 
                onClick={handleWhatsAppCustomOrder}
                className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Consult via WhatsApp
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Designs Grid Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold">
              The {styleInfo.title} Gallery
            </h2>
            <p className="text-muted-foreground mt-1">
              Showing our authentic, physical sets handcrafted in this specific aesthetic.
            </p>
          </div>
          <div className="text-sm bg-muted/50 border border-border/40 px-4 py-2 rounded-xl text-muted-foreground">
            Total Designs: <strong className="text-foreground">{designs.length} Sets</strong>
          </div>
        </div>

        {designs.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border/40 p-8 max-w-xl mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <Info className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold font-serif">Aesthetic Collection Launching Soon!</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                We are currently crafting fresh, exclusive press-on sets in this exact style. Share your reference photo via WhatsApp to create your custom design today!
              </p>
            </div>
            <button 
              onClick={handleWhatsAppCustomOrder}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/95 transition-all shadow-md shadow-primary/25"
            >
              Order Custom Design
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => router.push(`/styles/${categorySlug}/${item.id}`)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-lg bg-card border border-border/50 flex flex-col h-full hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button
                          onClick={(e) => toggleWishlist(item, e)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isInWishlist(item.id)
                              ? "bg-primary text-primary-foreground"
                              : "bg-white/90 text-foreground hover:bg-primary hover:text-primary-foreground"
                          }`}
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
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-foreground text-xs font-semibold tracking-wider rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <span className="text-xl font-bold text-primary">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Premium Acrylic Gel</span>
                      <span className="text-primary hover:underline font-semibold flex items-center gap-0.5">
                        Details <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox / Zoom-in Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/95 transition-all z-10 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Left Side: Product Zoom Image */}
                <div className="relative aspect-square md:h-full bg-muted">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 text-foreground text-xs font-semibold tracking-wider rounded-full shadow-sm">
                    {selectedImage.category}
                  </span>
                </div>

                {/* Right Side: Product Details */}
                <div className="p-8 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      {selectedImage.name}
                    </h2>
                    <div className="text-2xl font-bold text-primary font-serif">
                      ₹{selectedImage.price}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {selectedImage.description}
                    </p>

                    <div className="pt-4 border-t border-border/40 space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's in the Box?</h4>
                      <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>10 Custom Nails</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Nail Prep Glue</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>24 Jelly Sticky Tabs</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>Cuticle Stick & Buffer</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-border/40">
                    <button
                      onClick={(e) => {
                        handleCartClick(selectedImage, e)
                      }}
                      className="flex-1 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      {isInCart(selectedImage.id) ? "Remove from Cart" : "Add to Cart"}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        toggleWishlist(selectedImage, e)
                      }}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors shadow-sm border ${
                        isInWishlist(selectedImage.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isInWishlist(selectedImage.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* Global Modals & Side Drawers */}
      <LoginModal />
      <CartDrawer />
      <WishlistDrawer />
      <ProfileDrawer />
    </main>
  )
}

function X(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
