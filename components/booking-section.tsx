"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Send, MessageCircle, Calendar, User, Phone, Sparkles, Upload, Heart, Camera, Info, Mail, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

const services = [
  "Classic Glam",
  "French Tips",
  "Chrome & Mirror",
  "Minimal Art",
  "Floral Dreams",
  "Luxury Art",
  "3D Embellishments",
  "Themed Sets",
  "Custom Design",
]

export function BookingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { user, isLoggedIn, setShowLoginModal } = useStore()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const [handPhoto, setHandPhoto] = useState<string | null>(null)
  const [dreamPhoto, setDreamPhoto] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Auto-fill logged-in customer info
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "",
      }))
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      setShowLoginModal(true)
      toast.error("Please login or create an account first to place an order! ✨")
      return
    }

    setIsSubmitting(true)

    const orderId =
      "DLC-" + Math.floor(Math.random() * 100000)

    const payload = {
      access_key: "67c30f3a-6b75-4daf-a02f-bb31fa8b229b",

      subject: `New Delicaraa Order - ${orderId} ✨`,

      from_name: "Delicaraa",

      name: formData.name,

      email: formData.email,

      phone: formData.phone,

      nailset: formData.service,

      notes: formData.message,

      hand_photo_attached: handPhoto ? "Yes" : "No",

      dream_inspo_attached: dreamPhoto ? "Yes" : "No",

      hand_photo_preview:
        handPhoto || "No Hand Image uploaded",

      dream_photo_preview:
        dreamPhoto || "No Inspo Image uploaded",

      autoresponse: `
Hi ${formData.name} ✨

Thank you for ordering from Delicaraa 💅

━━━━━━━━━━━━━━━
ORDER INVOICE
━━━━━━━━━━━━━━━

Order ID:
${orderId}

Selected Nail Set:
${formData.service}

Phone:
${formData.phone}

Custom Notes:
${formData.message}

━━━━━━━━━━━━━━━

Your custom nail request has been received successfully 🌸

We’ll contact you shortly regarding payment and delivery.

Thank you for choosing Delicaraa ✨
`,
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setIsSubmitting(false)
      if (data.success) {
        setSuccess(true)
        toast.success("Nail design request sent successfully to Dhriti! 🌸")
        setFormData({ name: "", email: "", phone: "", service: "", message: "" })
        setHandPhoto(null)
        setDreamPhoto(null)
      } else {
        toast.error(`Submission failed: ${data.message || "Please try again later"}`)
      }
    } catch (err) {
      setIsSubmitting(false)
      toast.error("Network error submitting request. Please try again! 🌸")
      console.error("Web3Forms error:", err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1500000) {
        toast.error("Hand photo is too large! Please upload under 1.5MB 🌸")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setHandPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDreamPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1500000) {
        toast.error("Design photo is too large! Please upload under 1.5MB 🌸")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setDreamPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section id="booking" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium tracking-wide text-primary">Order Now</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold leading-tight text-foreground mb-6">
              Get Your
              <span className="block text-primary italic">Dream Nails</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ready to slay? Fill out the form or DM us directly! For custom sizes,
              please upload a photo of your hand with a coin for reference - this helps
              us create the perfect fit just for you!
            </p>

            {/* Contact Methods */}
            <div className="space-y-4 mb-10">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Quick response guaranteed!</p>
                </div>
              </a>

              <a
                href="https://instagram.com/delicaraa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Instagram DM</p>
                  <p className="text-sm text-muted-foreground">@delicaraa</p>
                </div>
              </a>
            </div>

            {/* Reference Photo Example */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 bg-card rounded-2xl border border-border/50"
            >
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">How to Take Your Hand Photo</h4>
              </div>

              <div className="flex gap-4 justify-center mb-4">
                <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md border-2 border-dashed border-primary/30 shrink-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.05.14%20PM%20%283%29-F50kHIz7paJxPErRgqkvM361AobH4L.jpeg"
                    alt="Reference - full hand photo with coin"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-background/90 rounded-full text-[9px] font-medium text-foreground">
                    Full Hand
                  </div>
                </div>
                <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md border-2 border-dashed border-primary/30 shrink-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-20%20at%209.05.14%20PM%20%282%29-rCKEVYeYv94gTP6Qnco55IbELeNLf8.jpeg"
                    alt="Reference - single nail with coin"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-background/90 rounded-full text-[9px] font-medium text-foreground">
                    With Coin
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">1</span>
                  Place a <span className="text-primary font-medium">₹5 coin</span> next to your fingers
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">2</span>
                  Spread your fingers naturally on a flat surface
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">3</span>
                  Take a clear, well-lit photo from above
                </p>
                <p className="text-xs mt-3 text-primary/80 bg-primary/10 px-3 py-2 rounded-lg">
                  This helps us determine your exact nail size for the perfect fit!
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-card rounded-3xl shadow-lg border border-border/50 relative overflow-hidden"
            >
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-foreground">Order Request Sent! 🌸</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed px-4">
                      Dhriti has received your dreamy custom nail request via Web3Forms! An email copy was dispatched to you as well.
                    </p>
                    <p className="text-xs text-primary font-semibold leading-relaxed">
                      We will review your uploaded photos and get in touch with you shortly. ✨
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-primary/10 text-primary font-semibold text-xs rounded-full hover:bg-primary/20 transition-all"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground">Place Custom Order</h3>
                  </div>

                  <div className="space-y-5">
                    {/* Name */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="What should we call you?"
                          className="w-full pl-11 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Your email address"
                          className="w-full pl-11 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        WhatsApp Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="Your WhatsApp mobile number"
                          className="w-full pl-11 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Service / Style Select */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Desired Nail Set Style
                      </label>
                      <div className="relative">
                        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full pl-11 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground appearance-none cursor-pointer"
                        >
                          <option value="">Select a style set</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Hand Photo Upload */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Upload Sizing Photo (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="hand-photo"
                        />
                        <label
                          htmlFor="hand-photo"
                          className="flex items-center justify-center gap-3 w-full py-3.5 bg-input rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all group"
                        >
                          {handPhoto ? (
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden border">
                                <img src={handPhoto} alt="Hand sizing" className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-semibold text-foreground">Sizing photo uploaded! 🌸</p>
                                <p className="text-[10px] text-muted-foreground">Click to change photo</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Camera className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                Add full hand with ₹5 coin reference
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Dream Inspo Photo Upload */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Upload Reference Inspo Photo (Optional)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDreamPhotoUpload}
                          className="hidden"
                          id="dream-photo"
                        />
                        <label
                          htmlFor="dream-photo"
                          className="flex items-center justify-center gap-3 w-full py-3.5 bg-input rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all group"
                        >
                          {dreamPhoto ? (
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden border">
                                <img src={dreamPhoto} alt="Dream design" className="w-full h-full object-cover" />
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-semibold text-foreground">Reference inspo uploaded! 💖</p>
                                <p className="text-[10px] text-muted-foreground">Click to change photo</p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                                Upload reference design screenshot
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Notes Message */}
                    <div className="relative">
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                        Nail length, custom notes or design description
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Describe your design specifications (length, modifications) or custom sizing kit requests here..."
                        className="w-full px-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground placeholder:text-muted-foreground resize-none font-sans"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-primary-foreground font-semibold tracking-wide rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Submitting Custom Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Place Order ✨
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
