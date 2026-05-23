"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, Send, Copy, Check } from "lucide-react"

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [isClaimed, setIsClaimed] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Show modal automatically after 3.5 seconds on first visit
    const claimed = localStorage.getItem("delicaraa_promo_claimed")
    const dismissed = sessionStorage.getItem("delicaraa_promo_dismissed")
    
    if (!claimed && !dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsOpen(false)
    sessionStorage.setItem("delicaraa_promo_dismissed", "true")
  }

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || phone.trim().length < 10) return
    
    setIsClaimed(true)
    localStorage.setItem("delicaraa_promo_claimed", "true")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText("DELI011")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
        onClick={handleDismiss}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl border border-border/50 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top pink color accent ribbon */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-pink-400/20 via-pink-300/10 to-transparent" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-background/80 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-105 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative p-8 pt-10 text-center space-y-6">
            {!isClaimed ? (
              <>
                {/* Visual Header */}
                <div className="mx-auto w-16 h-16 bg-pink-100 dark:bg-pink-950/40 rounded-3xl flex items-center justify-center text-pink-500 shadow-sm">
                  <Gift className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-serif font-bold text-foreground leading-tight">
                    Treat Yourself to <span className="text-pink-500 italic block sm:inline">10% OFF</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-foreground">Your First Order</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Drop your WhatsApp number & unlock 10% OFF your first Delicaraa nail set. Limited-time offer!
                  </p>
                </div>

                <form onSubmit={handleClaim} className="space-y-4">
                  {/* Phone input with India country code prefix */}
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 px-3 bg-input rounded-xl border border-border/50 text-xs font-semibold text-foreground">
                      <span>+91</span>
                      <span className="text-[10px] text-muted-foreground">▼</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").substring(0, 10))}
                      placeholder="Mobile Number"
                      className="flex-1 px-4 py-3 bg-input rounded-xl border border-border/50 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 outline-none transition-all text-sm text-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-400/25 hover:shadow-pink-500/35 transition-all duration-300 transform active:scale-[0.98]"
                  >
                    Claim Your Code
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6 py-4"
              >
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-950/40 rounded-3xl flex items-center justify-center text-green-500 shadow-sm animate-bounce">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-foreground">Discount Unlocked! 💖</h2>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Your exclusive first-time order code is ready! Copy it and use it during checkout on WhatsApp.
                  </p>
                </div>

                {/* Promo Code Visual */}
                <div className="flex items-center justify-between p-4 bg-pink-100/60 dark:bg-pink-950/20 rounded-2xl border-2 border-dashed border-pink-300">
                  <span className="font-mono text-2xl font-bold tracking-wider text-pink-500">DELI011</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-4 py-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition-colors text-xs font-semibold shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleDismiss}
                  className="w-full py-3 bg-muted text-muted-foreground text-sm font-semibold rounded-xl hover:text-foreground hover:bg-input transition-colors"
                >
                  Start Designing Now
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
