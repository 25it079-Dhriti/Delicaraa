"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ServicesSection } from "@/components/services-section"
import { InstagramSection } from "@/components/instagram-section"
import { BookingSection } from "@/components/booking-section"
import { ReviewSection } from "@/components/review-section"
import { Footer } from "@/components/footer"

// Modals and Drawers
import { LoginModal } from "@/components/login-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { WishlistDrawer } from "@/components/wishlist-drawer"
import { ProfileDrawer } from "@/components/profile-drawer"
import { PromoModal } from "@/components/promo-modal"

export default function Home() {
  const { isLoggedIn, setShowLoginModal } = useStore()

  useEffect(() => {
    // Automatically trigger the login modal after 6.5 seconds on first load if user is a guest
    const hasPrompted = sessionStorage.getItem("delicaraa_login_prompted")
    
    if (!isLoggedIn && !hasPrompted) {
      const timer = setTimeout(() => {
        setShowLoginModal(true)
        sessionStorage.setItem("delicaraa_login_prompted", "true")
      }, 6500)
      
      return () => clearTimeout(timer)
    }
  }, [isLoggedIn, setShowLoginModal])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <InstagramSection />
      <BookingSection />
      <ReviewSection />
      <Footer />

      {/* Global Modals & Side Drawers */}
      <LoginModal />
      <CartDrawer />
      <WishlistDrawer />
      <ProfileDrawer />
      <PromoModal />
    </main>
  )
}
