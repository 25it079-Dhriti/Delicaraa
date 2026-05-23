"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState, use } from "react"
import { ArrowLeft, Heart, ShoppingBag, Sparkles, MessageCircle, Info, CheckCircle2, ChevronRight, Ruler, Trash2, Camera, Upload } from "lucide-react"
import { useStore, NailDesign } from "@/lib/store"
import { galleryItems } from "@/components/gallery-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginModal } from "@/components/login-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { WishlistDrawer } from "@/components/wishlist-drawer"
import { ProfileDrawer } from "@/components/profile-drawer"
import Image from "next/image"

const stylesMapping: Record<string, { title: string }> = {
  "classic-glam": { title: "Classic Glam" },
  "french-tips": { title: "French Tips" },
  "chrome-mirror": { title: "Chrome & Mirror" },
  "minimal-art": { title: "Minimal Art" },
  "floral-dreams": { title: "Floral Dreams" },
  "luxury-art": { title: "Luxury Art" },
  "3d-embellishments": { title: "3D Embellishments" },
  "themed-sets": { title: "Themed Sets" },
  "custom-design": { title: "Custom Design" },
}

export default function DesignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const categorySlug = params.category as string
  const designId = params.id as string

  const styleInfo = stylesMapping[categorySlug] || { title: "Nail Designs" }

  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    wishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist,
    user,
    setShowProfile
  } = useStore()

  const isInCart = (id: string) => cart.some(i => i.id === id)

  // Find design details
  const design = galleryItems.find(item => item.id === designId)

  const handleWhatsAppConsultation = () => {
    if (!design) return
    const text = `Hi Dhriti! I am interested in custom styling for the *${design.name}* set (₹${design.price}) from the ${design.category} collection. Can you help me finalize my sizing?`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/919999999999?text=${encoded}`, "_blank")
  }

  if (!design) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="py-32 max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center text-destructive mx-auto">
            <Info className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold">Design Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't locate this specific press-on set. It may have been archived or moved to a different collection.
          </p>
          <button 
            onClick={() => router.push(`/styles/${categorySlug}`)}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/95 transition-all shadow-md"
          >
            Return to Collection
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => router.push(`/styles/${categorySlug}`)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to {styleInfo.title} Collection
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Glassmorphic Photo Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card/60 backdrop-blur-md p-3">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted">
                <img 
                  src={design.src} 
                  alt={design.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Prep Kit Contents */}
            <div className="p-6 bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's included in Dhriti's luxury set?</h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>10 Handcrafted Reusable Nails</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>24 High-Hold Jelly Sticky Tabs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Premium Long-Lasting Nail Glue</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Cuticle Stick & Mini-Buffer</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Order Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Title & Price */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                Dhriti's Design Signature
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
                {design.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif font-bold text-primary">₹{design.price}</span>
                <span className="text-xs text-muted-foreground">All taxes included</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {design.description}
              </p>
            </div>

            {/* Sizing & Custom Metric Previews */}
            <div className="p-6 bg-card/60 backdrop-blur-md rounded-3xl border border-border/50 space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="text-sm font-semibold">Your Sizing Details</h4>
                    <p className="text-[10px] text-muted-foreground">Persisted in your local account profile</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfile(true)}
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
                >
                  Configure Sizing <span>→</span>
                </button>
              </div>

              {/* Sizing Summary Blocks */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-input/40 p-3.5 rounded-xl border border-border/30">
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">Preferred Shape</span>
                  <span className="font-semibold text-foreground">{user?.sizing?.shape || "Almond (Standard)"}</span>
                </div>
                <div className="bg-input/40 p-3.5 rounded-xl border border-border/30">
                  <span className="text-[10px] text-muted-foreground uppercase block mb-1">Standard Size</span>
                  <span className="font-semibold text-foreground">{user?.sizing?.standardSize || "Small (S)"}</span>
                </div>

                {user?.sizing?.standardSize === "Custom" && (
                  <div className="col-span-2 space-y-2 bg-input/40 p-3.5 rounded-xl border border-border/30">
                    <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Millimeter charts:</span>
                    <div className="grid grid-cols-2 gap-3 text-[10px] text-muted-foreground">
                      <div>
                        <strong className="text-primary text-[9px] uppercase block">Left Hand:</strong>
                        <span>Th:{user.sizing.leftThumb || "15"}, In:${user.sizing.leftIndex || "12"}, Mi:${user.sizing.leftMiddle || "13"}, Ri:${user.sizing.leftRing || "11"}, Pi:${user.sizing.leftPinky || "9"}</span>
                      </div>
                      <div>
                        <strong className="text-primary text-[9px] uppercase block">Right Hand:</strong>
                        <span>Th:${user.sizing.rightThumb || "15"}, In:${user.sizing.rightIndex || "12"}, Mi:${user.sizing.rightMiddle || "13"}, Ri:${user.sizing.rightRing || "11"}, Pi:${user.sizing.rightPinky || "9"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions Row */}
              <div className="pt-4 border-t border-border/40 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Info className="w-4.5 h-4.5 text-primary" />
                  <span>How to measure? Hand Photo Guide:</span>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md border border-border/50 shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.05.14%20PM%20%283%29-F50kHIz7paJxPErRgqkvM361AobH4L.jpeg"
                      alt="Reference - full hand photo with coin"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-background/95 rounded-full text-[8px] font-medium text-foreground">
                      Full Hand
                    </div>
                  </div>
                  <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md border border-border/50 shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.05.14%20PM%20%282%29-rCKEVYeYv94gTP6Qnco55IbELeNLf8.jpeg"
                      alt="Reference - single nail with coin"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-background/95 rounded-full text-[8px] font-medium text-foreground">
                      With Coin
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={(e) => {
                  if (isInCart(design.id)) {
                    removeFromCart(design.id)
                  } else {
                    addToCart(design)
                  }
                }}
                className="flex-1 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-5 h-5" />
                {isInCart(design.id) ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  if (wishlist.some(i => i.id === design.id)) {
                    removeFromWishlist(design.id)
                  } else {
                    addToWishlist(design)
                  }
                }}
                className={`px-6 py-4 rounded-xl flex items-center justify-center transition-colors shadow-sm border ${
                  wishlist.some(i => i.id === design.id)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-muted"
                }`}
              >
                <Heart className={`w-6 h-6 ${wishlist.some(i => i.id === design.id) ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleWhatsAppConsultation}
                className="py-4 px-6 bg-green-500/10 border border-green-500/20 text-green-600 font-semibold rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                WhatsApp Consult
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Global Panels */}
      <LoginModal />
      <CartDrawer />
      <WishlistDrawer />
      <ProfileDrawer />
    </main>
  )
}
