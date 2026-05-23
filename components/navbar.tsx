"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram, Heart, ShoppingBag, Search, User, LogOut } from "lucide-react"
import { useStore } from "@/lib/store"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Shop" },
  { href: "#services", label: "Styles" },
  { href: "#booking", label: "Order" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  
  const { 
    user, 
    isLoggedIn, 
    setShowLoginModal, 
    logout,
    cartCount,
    wishlist,
    setShowCart,
    setShowWishlist,
    searchQuery,
    setSearchQuery,
    setShowProfile
  } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const gallerySection = document.getElementById("gallery")
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: "smooth" })
      }
    }
    setShowSearch(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-sm border-b border-primary/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="group flex flex-col items-start">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="text-xl sm:text-2xl font-serif font-semibold tracking-wide text-foreground">
                Delicaraa
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground tracking-wider ml-7">by dhriti</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearch}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search designs..."
                    autoFocus
                    className="w-full pl-4 pr-10 py-2 text-sm bg-input border border-border/50 rounded-full focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearch(false)
                      setSearchQuery("")
                    }}
                    className="absolute right-3 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setShowWishlist(true)}
              className="relative p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            {isLoggedIn ? (
              <div className="relative group">
                <button 
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-card rounded-xl shadow-lg border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 border-b border-border/50">
                    <p className="font-medium text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => setShowProfile(true)}
                    className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 flex items-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/5 flex items-center gap-2 border-t border-border/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            <Link
              href="https://instagram.com/delicaraa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setShowWishlist(true)}
              className="relative p-2 text-muted-foreground"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-muted-foreground"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-primary/20"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search nail designs..."
                  className="w-full pl-12 pr-4 py-3 bg-input border border-border/50 rounded-xl focus:outline-none focus:border-primary text-foreground"
                />
              </form>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-medium text-foreground py-2 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-4 space-y-3"
              >
                {isLoggedIn ? (
                  <div className="flex items-center justify-between p-4 bg-input rounded-xl border border-primary/10">
                    <button 
                      onClick={() => {
                        setShowProfile(true)
                        setIsOpen(false)
                      }} 
                      className="text-left flex-1"
                    >
                      <p className="font-semibold text-foreground flex items-center gap-1.5">
                        {user?.name}
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
                      </p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </button>
                    <button 
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }} 
                      className="text-destructive hover:scale-105 transition-transform p-1"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true)
                      setIsOpen(false)
                    }}
                    className="block w-full text-center px-5 py-3 border border-primary/30 text-foreground text-sm font-medium tracking-wide rounded-full flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sign In / Create Account
                  </button>
                )}
                
                <Link
                  href="#gallery"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded-full flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop Collection
                </Link>
                
                <a
                  href="https://instagram.com/delicaraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-5 py-3 border border-primary/30 text-foreground text-sm font-medium tracking-wide rounded-full flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  Follow @delicaraa
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
