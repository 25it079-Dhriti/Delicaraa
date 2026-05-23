"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, User, Mail, Phone, Heart, Sparkles, Eye, EyeOff, Instagram } from "lucide-react"
import { useStore } from "@/lib/store"

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useStore()
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({
      name: formData.name || formData.email.split("@")[0],
      email: formData.email,
      phone: formData.phone,
      instagram: formData.instagram,
    })
    setFormData({ name: "", email: "", phone: "", instagram: "", password: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!showLoginModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
        onClick={() => setShowLoginModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header decoration */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-3">
                <Heart className="w-6 h-6 text-primary fill-primary" />
                <span className="text-2xl font-serif font-semibold text-foreground">Delicaraa</span>
              </div>
              <p className="text-xs text-muted-foreground">by dhriti</p>
              <h2 className="text-xl font-semibold text-foreground mt-4">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isSignUp ? "Join our nail-loving community" : "Sign in to continue shopping"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={isSignUp}
                    placeholder="Your name"
                    className="w-full pl-12 pr-4 py-3.5 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full pl-12 pr-4 py-3.5 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {isSignUp && (
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="WhatsApp number (optional)"
                    className="w-full pl-12 pr-4 py-3.5 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}

              {isSignUp && (
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram username (optional)"
                    className="w-full pl-12 pr-4 py-3.5 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              )}

              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3.5 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {!isSignUp && (
                <div className="text-right">
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-wide rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social login */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  login({
                    name: "Google Guest",
                    email: "guest@gmail.com",
                    phone: "",
                  })
                  setShowLoginModal(false)
                }}
                className="flex-1 py-3 border border-border rounded-xl hover:bg-input transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <a
                href="https://instagram.com/delicaraa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-border rounded-xl hover:bg-input transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
                Instagram
              </a>
            </div>

            {/* Toggle */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignUp ? "Already have an account?" : "New to Delicaraa?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-medium hover:underline"
              >
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
