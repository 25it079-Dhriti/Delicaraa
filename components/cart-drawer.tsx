"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Trash2, Plus, Minus, Send, AlertCircle } from "lucide-react"
import { useStore } from "@/lib/store"

export function CartDrawer() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    decrementCartItem, 
    clearCart, 
    cartTotal, 
    showCart, 
    setShowCart,
    user
  } = useStore()

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return

    // Pre-filled WhatsApp message
    const orderItemsText = cart
      .map(
        (item) =>
          `🌸 *${item.name}* (${item.category})\n   Qty: ${item.quantity} x ₹${item.price} = *₹${item.price * item.quantity}*`
      )
      .join("\n\n")

    let userDetails = ""
    if (user) {
      userDetails = `\n\n👤 *Customer Details:*\n- Name: ${user.name}\n- WhatsApp: ${user.phone || "Not provided"}`
      if (user.instagram) {
        userDetails += `\n- Instagram: @${user.instagram.replace(/^@/, "")}`
      }
      if (user.sizing) {
        userDetails += `\n\n📏 *Sizing Profile:*`
        userDetails += `\n- Shape: ${user.sizing.shape || "Almond"}`
        userDetails += `\n- Standard Size: ${user.sizing.standardSize || "S"}`
        if (user.sizing.standardSize === "Custom") {
          userDetails += `\n- Left Hand (mm): Th:${user.sizing.leftThumb || "15"}, In:${user.sizing.leftIndex || "12"}, Mi:${user.sizing.leftMiddle || "13"}, Ri:${user.sizing.leftRing || "11"}, Pi:${user.sizing.leftPinky || "9"}`
          userDetails += `\n- Right Hand (mm): Th:${user.sizing.rightThumb || "15"}, In:${user.sizing.rightIndex || "12"}, Mi:${user.sizing.rightMiddle || "13"}, Ri:${user.sizing.rightRing || "11"}, Pi:${user.sizing.rightPinky || "9"}`
        }
      }
      if (user.address) {
        userDetails += `\n\n📍 *Shipping Address:*\n- Address: ${user.address}\n- City: ${user.city || ""}, State: ${user.state || ""}, Pincode: ${user.pincode || ""}`
      }
      if (user.dreamDesign) {
        userDetails += `\n\n🎨 _Dreamy design reference photo uploaded in user profile drawer!_`
      }
    }

    const fullMessage = `✨ *NEW ORDER FROM DELICARAA* ✨\n\nHello Dhriti! I would like to order the following custom press-on nail sets:\n\n${orderItemsText}${userDetails}\n\n🌟 *Subtotal: ₹${cartTotal}*\n\nThank you! Please let me know how to proceed with sizing and payment. 💖`

    const encodedMessage = encodeURIComponent(fullMessage)
    // WhatsApp number for Dhriti's nails business - standard Indian code 91
    const phoneNumber = "919999999999" // Editable placeholder 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  if (!showCart) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm"
        onClick={() => setShowCart(false)}
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
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-semibold text-foreground">Shopping Cart</h2>
            </div>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 rounded-full hover:bg-input text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-1">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Add beautiful handcrafted nail sets to your cart and style them with love!
                  </p>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/20"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b border-border/20">
                  <span className="text-sm text-muted-foreground font-medium">{cart.length} unique sets</span>
                  <button 
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 p-3 bg-input rounded-2xl border border-border/30 hover:border-primary/20 transition-all"
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
                        <div className="text-sm font-bold text-primary">₹{item.price * item.quantity}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center bg-card border border-border/50 rounded-full px-1 py-0.5 shadow-sm">
                          <button
                            onClick={() => decrementCartItem(item.id)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-foreground min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-border/50 bg-gradient-to-t from-primary/5 to-transparent space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Estimated Subtotal</span>
                <span className="text-2xl font-serif font-bold text-primary">₹{cartTotal}</span>
              </div>

              {/* Sizing Info Alert */}
              <div className="p-3 bg-primary/10 rounded-2xl flex items-start gap-2 border border-primary/20 text-xs text-foreground">
                <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  After clicking, your order will be sent to Dhriti on WhatsApp. Sizing kits and measurement details will be requested in the chat.
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-current" />
                Order via WhatsApp
              </button>

              <button
                onClick={() => setShowCart(false)}
                className="w-full text-center py-2 text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
