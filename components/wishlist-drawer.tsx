"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { useStore } from "@/lib/store"

export function WishlistDrawer() {
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart, 
    showWishlist, 
    setShowWishlist 
  } = useStore()

  if (!showWishlist) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
        onClick={() => setShowWishlist(false)}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-2xl border-l border-border/50 flex flex-col z-[101]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary animate-float-heart" />
              <h2 className="text-xl font-serif font-semibold text-foreground">My Wishlist</h2>
            </div>
            <button
              onClick={() => setShowWishlist(false)}
              className="p-2 rounded-full hover:bg-input text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-1">Your wishlist is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our collections and save your favorite handcrafted designs for later!
                  </p>
                </div>
                <button
                  onClick={() => setShowWishlist(false)}
                  className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20"
                >
                  Browse Designs
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex gap-4 p-3 bg-input rounded-2xl border border-border/30 hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-semibold text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                    </div>
                    <div className="text-sm font-bold text-primary">₹{item.price}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(item)
                        removeFromWishlist(item.id)
                      }}
                      className="p-2 bg-primary hover:bg-primary/95 text-primary-foreground rounded-full shadow-sm hover:scale-105 transition-all"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-border/50 bg-gradient-to-t from-primary/5 to-transparent">
              <button
                onClick={() => {
                  wishlist.forEach((item) => addToCart(item))
                  // Remove all from wishlist
                  wishlist.forEach((item) => removeFromWishlist(item.id))
                  setShowWishlist(false)
                }}
                className="w-full py-3.5 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add All to Shopping Cart
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
