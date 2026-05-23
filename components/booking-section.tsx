"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Send, MessageCircle, Calendar, User, Phone, Sparkles, Upload, Heart, Camera, Info } from "lucide-react"
import Image from "next/image"

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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  })
  const [handPhoto, setHandPhoto] = useState<string | null>(null)
  const [dreamPhoto, setDreamPhoto] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create WhatsApp message
    const message = `✨ *NEW CUSTOM DESIGN ORDER* ✨\n\n*Name:* ${formData.name}\n*WhatsApp:* ${formData.phone}\n*Desired Style:* ${formData.service}\n*Description:* ${formData.message}\n\n${handPhoto ? "✅ _Hand sizing photo attached_" : "❌ _No hand sizing photo_"}\n${dreamPhoto ? "✅ _Dreamy design reference photo attached_" : "❌ _No dream design photo_"}`
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
              className="p-8 bg-card rounded-3xl shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground">Place Your Order</h3>
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="What should we call you?"
                      className="w-full pl-12 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your WhatsApp number"
                      className="w-full pl-12 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Service */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What Style Do You Want?
                  </label>
                  <div className="relative">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground appearance-none cursor-pointer"
                    >
                      <option value="">Select a style</option>
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload Hand Photo (with coin)
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
                      className="flex items-center justify-center gap-3 w-full py-4 bg-input rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all group"
                    >
                      {handPhoto ? (
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <img src={handPhoto} alt="Hand photo" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">Photo uploaded!</p>
                            <p className="text-xs text-muted-foreground">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-muted-foreground group-hover:text-primary transition-colors">
                            Click to upload your hand photo
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Place a coin next to your nails for size reference
                  </p>
                </div>

                {/* Dreamy Design Photo Upload */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload Your Dreamy Nail Design Inspo
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
                      className="flex items-center justify-center gap-3 w-full py-4 bg-input rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all group"
                    >
                      {dreamPhoto ? (
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <img src={dreamPhoto} alt="Dream design" className="w-full h-full object-cover" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">Inspo uploaded! 💖</p>
                            <p className="text-xs text-muted-foreground">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-muted-foreground group-hover:text-primary transition-colors">
                            Click to upload dream design photo
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-primary fill-primary" />
                    Any reference design you want Dhriti to match
                  </p>
                </div>

                {/* Message */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tell Us About Your Dream Nails
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your dream design, share inspo links, or ask questions..."
                    className="w-full px-4 py-3 bg-input rounded-xl border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground font-medium tracking-wide rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                >
                  <Send className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
