"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Trash2, Plus, Minus, Send, AlertCircle, ArrowLeft, CheckCircle2, CreditCard, Landmark, Truck } from "lucide-react"
import { useStore } from "@/lib/store"
import { useState, useEffect } from "react"

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

  // Checkout flow state: "cart" | "address" | "invoice" | "payment"
  const [step, setStep] = useState<"cart" | "address" | "invoice" | "payment">("cart")
  
  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [couponCode, setCouponCode] = useState("")
  const [isCouponApplied, setIsCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "COD">("UPI")

  // Auto-fill address details if the user has a profile saved
  useEffect(() => {
    if (user && showCart) {
      setAddressData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      })
    }
  }, [user, showCart])

  // Reset steps when drawer opens or closes
  useEffect(() => {
    if (!showCart) {
      setStep("cart")
      setIsCouponApplied(false)
      setCouponCode("")
      setCouponError(false)
    }
  }, [showCart])

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value })
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "DELI011") {
      setIsCouponApplied(true)
      setCouponError(false)
    } else {
      setCouponError(true)
      setIsCouponApplied(false)
    }
  }

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return

    // Finalized bill calculation
    const discount = isCouponApplied ? Math.round(cartTotal * 0.1) : 0
    const finalTotal = cartTotal - discount

    const orderItemsText = cart
      .map(
        (item) =>
          `🌸 *${item.name}* (${item.category})\n   Qty: ${item.quantity} x ₹${item.price} = *₹${item.price * item.quantity}*`
      )
      .join("\n\n")

    let userDetails = `\n\n👤 *Customer Details:*`
    userDetails += `\n- Name: ${addressData.name}`
    userDetails += `\n- WhatsApp: ${addressData.phone}`
    if (user?.instagram) {
      userDetails += `\n- Instagram: @${user.instagram.replace(/^@/, "")}`
    }

    if (user?.sizing) {
      userDetails += `\n\n📏 *Sizing Profile:*`
      userDetails += `\n- Shape: ${user.sizing.shape || "Almond"}`
      userDetails += `\n- Size: ${user.sizing.standardSize || "S"}`
      if (user.sizing.standardSize === "Custom") {
        userDetails += `\n- Left Hand (mm): Th:${user.sizing.leftThumb || "15"}, In:${user.sizing.leftIndex || "12"}, Mi:${user.sizing.leftMiddle || "13"}, Ri:${user.sizing.leftRing || "11"}, Pi:${user.sizing.leftPinky || "9"}`
        userDetails += `\n- Right Hand (mm): Th:${user.sizing.rightThumb || "15"}, In:${user.sizing.rightIndex || "12"}, Mi:${user.sizing.rightMiddle || "13"}, Ri:${user.sizing.rightRing || "11"}, Pi:${user.sizing.rightPinky || "9"}`
      }
    }

    userDetails += `\n\n📍 *Shipping Address:*`
    userDetails += `\n- Address: ${addressData.address}`
    userDetails += `\n- City: ${addressData.city}, State: ${addressData.state}, Pincode: ${addressData.pincode}`

    userDetails += `\n\n💳 *Payment & Invoice:*`
    userDetails += `\n- Subtotal: ₹${cartTotal}`
    if (isCouponApplied) {
      userDetails += `\n- Promo Applied: DELI011 (-10% OFF)`
      userDetails += `\n- Discount Amount: -₹${discount}`
    }
    userDetails += `\n- Final Payable Sum: *₹${finalTotal}*`
    userDetails += `\n- Selected Method: *${paymentMethod}*`
    if (paymentMethod === "UPI") {
      userDetails += `\n   (_Instructions: pay directly to delicaraa@upi_)`
    }

    if (user?.dreamDesign) {
      userDetails += `\n\n🎨 _Dreamy design reference photo attached in profile drawer!_`
    }

    const fullMessage = `✨ *FINALIZED ORDER FROM DELICARAA* ✨\n\nHello Dhriti! I have completed checkout details on the website. I would like to place my order:\n\n${orderItemsText}${userDetails}\n\nThank you! Please let me know how to proceed with payment and production. 💖`

    const encodedMessage = encodeURIComponent(fullMessage)
    // WhatsApp number for Dhriti's nails business - standard Indian code 91
    const phoneNumber = "919999999999" // Editable placeholder 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    clearCart()
    setShowCart(false)
  }

  // Invoice calculations
  const discountAmount = isCouponApplied ? Math.round(cartTotal * 0.1) : 0
  const finalPayableTotal = cartTotal - discountAmount

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
              {step !== "cart" && (
                <button 
                  onClick={() => {
                    if (step === "address") setStep("cart")
                    else if (step === "invoice") setStep("address")
                    else if (step === "payment") setStep("invoice")
                  }}
                  className="p-1 rounded-full hover:bg-input text-muted-foreground hover:text-foreground transition-colors mr-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-semibold text-foreground">
                {step === "cart" && "Shopping Cart"}
                {step === "address" && "Shipping Address"}
                {step === "invoice" && "Review Bill Invoice"}
                {step === "payment" && "Choose Payment"}
              </h2>
            </div>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 rounded-full hover:bg-input text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress bar */}
          {step !== "cart" && (
            <div className="flex w-full h-1 bg-border/50">
              <div className={`h-full transition-all duration-300 ${
                step === "address" ? "w-1/3 bg-primary" :
                step === "invoice" ? "w-2/3 bg-primary" : "w-full bg-primary"
              }`} />
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
            
            {/* STEP 1: CART LISTING */}
            {step === "cart" && (
              <>
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
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
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted border">
                            <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif font-semibold text-foreground truncate">{item.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                            </div>
                            <div className="text-sm font-bold text-primary">₹{item.price * item.quantity}</div>
                          </div>

                          <div className="flex flex-col justify-between items-end">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            
                            <div className="flex items-center bg-card border border-border/50 rounded-full px-1 py-0.5 shadow-sm">
                              <button
                                onClick={() => decrementCartItem(item.id)}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-semibold text-foreground min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => addToCart(item)}
                                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
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
              </>
            )}

            {/* STEP 2: SHIPPING ADDRESS FORM */}
            {step === "address" && (
              <form onSubmit={(e) => { e.preventDefault(); setStep("invoice"); }} className="space-y-4 pt-2">
                <div className="space-y-4 p-4 bg-muted/30 border rounded-2xl">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Recipient Name</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={addressData.name}
                      onChange={handleAddressChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">WhatsApp Mobile Number</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={addressData.phone}
                      onChange={handleAddressChange}
                      placeholder="+91 99999 99999"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Street Address</label>
                    <textarea
                      required
                      name="address"
                      value={addressData.address}
                      onChange={handleAddressChange}
                      rows={3}
                      placeholder="House/Flat number, building name, street address..."
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-muted-foreground mb-1">City</label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={addressData.city}
                        onChange={handleAddressChange}
                        placeholder="Mumbai"
                        className="w-full px-3 py-2 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-muted-foreground mb-1">State</label>
                      <input
                        type="text"
                        required
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        placeholder="MH"
                        className="w-full px-3 py-2 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        name="pincode"
                        value={addressData.pincode}
                        onChange={handleAddressChange}
                        placeholder="400001"
                        className="w-full px-3 py-2 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5"
                >
                  Proceed to Invoice
                </button>
              </form>
            )}

            {/* STEP 3: REVIEW BILL INVOICE & PROMO */}
            {step === "invoice" && (
              <div className="space-y-5 pt-2">
                {/* Promo Code Input */}
                <div className="p-4 bg-pink-100/10 border border-pink-400/20 rounded-2xl space-y-3">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-pink-500" /> Apply Discount Coupon
                  </span>
                  
                  {isCouponApplied ? (
                    <div className="p-2 bg-pink-500/10 text-pink-600 rounded-xl text-xs font-semibold flex items-center justify-between border border-pink-500/20">
                      <span>DELI011 Applied! (10% OFF flat) 🎉</span>
                      <button 
                        onClick={() => setIsCouponApplied(false)} 
                        className="text-pink-700 underline text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(false); }}
                        placeholder="Enter Promo Code (e.g. DELI011)"
                        className="flex-1 px-3.5 py-2 bg-input rounded-xl border border-border/50 text-xs uppercase outline-none focus:border-pink-400"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-pink-400 text-white rounded-xl text-xs font-semibold hover:bg-pink-500 transition-colors shadow-sm"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-destructive font-semibold">
                      Invalid coupon code. Try code "DELI011" on your first purchase!
                    </p>
                  )}
                </div>

                {/* Professional Bill Receipt */}
                <div className="p-5 bg-card border rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                  
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border/40 pb-2">
                    Itemized Bill Details
                  </span>

                  <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="text-foreground font-medium truncate max-w-[200px]">
                          {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-foreground">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/40 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Items Subtotal</span>
                      <span>₹{cartTotal}</span>
                    </div>

                    {isCouponApplied && (
                      <div className="flex justify-between text-pink-500 font-semibold">
                        <span>DELI011 Discount (10%)</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-muted-foreground">
                      <span>Nail Sizing & Prep Kit</span>
                      <span className="text-primary font-semibold">FREE 🌸</span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping Delivery</span>
                      <span className="text-primary font-semibold">FREE 🌸</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-bold border-t border-border/40 pt-3 text-foreground">
                      <span className="font-serif">Total Bill Payable</span>
                      <span className="text-primary text-base">₹{finalPayableTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="p-3 bg-muted/40 rounded-xl flex items-start gap-2 border text-[11px] text-muted-foreground leading-relaxed">
                  <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Your sets will be hand-painted and shipped to: <strong>{addressData.city}, {addressData.pincode}</strong>. Sizing kits will be sent first.
                  </span>
                </div>

                <button 
                  onClick={() => setStep("payment")}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-1.5"
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {/* STEP 4: CHOOSE PAYMENT METHOD & SUBMIT */}
            {step === "payment" && (
              <div className="space-y-5 pt-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-1">
                  Select payment method
                </span>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <label className={`flex items-start gap-4 p-4 bg-input rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "UPI" ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "UPI"}
                      onChange={() => setPaymentMethod("UPI")}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">UPI Payment (GPay/PhonePe)</span>
                        {paymentMethod === "UPI" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Pay directly to UPI: <strong className="text-primary">delicaraa@upi</strong>. Send payment screenshot in WhatsApp chat.
                      </p>
                    </div>
                  </label>

                  {/* Cash On Delivery Option */}
                  <label className={`flex items-start gap-4 p-4 bg-input rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === "COD" ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">Cash on Delivery (COD)</span>
                        {paymentMethod === "COD" && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Pay at delivery. COD orders require standard size confirmation via the physical sizing kit.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-xs text-foreground flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Confirming this order compiles the address, invoice bill, and payment method details into a checkout message to Dhriti on WhatsApp.
                  </span>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 fill-current" />
                  Confirm & Order via WhatsApp
                </button>
              </div>
            )}
            
          </div>

          {/* Footer Subtotal Panel for Step 1 */}
          {step === "cart" && cart.length > 0 && (
            <div className="p-6 border-t border-border/50 bg-gradient-to-t from-primary/5 to-transparent space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Estimated Subtotal</span>
                <span className="text-2xl font-serif font-bold text-primary">₹{cartTotal}</span>
              </div>

              <div className="p-3 bg-primary/10 rounded-2xl flex items-start gap-2 border border-primary/20 text-xs text-foreground">
                <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Prep kits and sizing tools are included free. Proceed to checkout to add your shipping address and payment method!
                </span>
              </div>

              <button
                onClick={() => setStep("address")}
                className="w-full py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
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
