"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, Mail, Phone, Calendar, MapPin, Sparkles, Upload, Check, Trash2, Heart, Award, Ruler, Instagram } from "lucide-react"
import { useState, useEffect } from "react"
import { useStore, User as StoreUser, UserSizing } from "@/lib/store"

export function ProfileDrawer() {
  const { showProfile, setShowProfile, user, updateProfile } = useStore()
  const [formData, setFormData] = useState<Partial<StoreUser>>({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    birthdate: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    sizing: {
      standardSize: "S",
      shape: "Almond",
      leftThumb: "15",
      leftIndex: "12",
      leftMiddle: "13",
      leftRing: "11",
      leftPinky: "9",
      rightThumb: "15",
      rightIndex: "12",
      rightMiddle: "13",
      rightRing: "11",
      rightPinky: "9",
    },
    dreamDesign: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        instagram: user.instagram || "",
        birthdate: user.birthdate || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        sizing: user.sizing || {
          standardSize: "S",
          shape: "Almond",
          leftThumb: "15",
          leftIndex: "12",
          leftMiddle: "13",
          leftRing: "11",
          leftPinky: "9",
          rightThumb: "15",
          rightIndex: "12",
          rightMiddle: "13",
          rightRing: "11",
          rightPinky: "9",
        },
        dreamDesign: user.dreamDesign || "",
      })
    }
  }, [user, showProfile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSizingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      sizing: {
        ...formData.sizing,
        [e.target.name]: e.target.value,
      },
    })
  }

  const handleDreamDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, dreamDesign: reader.result as string })
      };
      reader.readAsDataURL(file)
    }
  }

  const removeDreamDesign = () => {
    setFormData({ ...formData, dreamDesign: "" })
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setShowProfile(false)
  }

  if (!showProfile) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[105] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
          onClick={() => setShowProfile(false)}
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-screen max-w-lg bg-card border-l border-border/50 shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-semibold text-foreground">My Profile</h2>
                  <p className="text-xs text-muted-foreground">Manage details & custom sizing</p>
                </div>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Profile Card Summary */}
              <div className="relative p-6 bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent rounded-3xl border border-primary/20 overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -mr-4 -mt-4 pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-serif font-semibold text-2xl flex items-center justify-center shadow-md">
                    {formData.name ? formData.name.substring(0, 2).toUpperCase() : "G"}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif font-bold text-lg text-foreground">{formData.name || "Guest Collector"}</h3>
                      <Award className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">{formData.email || "No email provided"}</p>
                    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 bg-primary/15 text-primary text-[10px] font-medium tracking-wide uppercase rounded-full">
                      <Sparkles className="w-3 h-3" /> Custom Vibe Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 relative">
                    <label className="block text-xs text-muted-foreground mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>

                  <div className="col-span-2 relative">
                    <label className="block text-xs text-muted-foreground mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs text-muted-foreground mb-1.5">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 99999"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs text-muted-foreground mb-1.5">Birthdate</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground text-left"
                    />
                  </div>

                  <div className="col-span-2 relative">
                    <label className="block text-xs text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-pink-500" />
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@username"
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Shipping Address
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Street Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Apartment, suite, unit, building, street..."
                      className="w-full px-4 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-sm text-foreground resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className="w-full px-3 py-2 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="MH"
                        className="w-full px-3 py-2 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1.5">Pin Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="400001"
                        className="w-full px-3 py-2 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sizing Profile */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  Nail Sizing & Shapes
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Nail Shape Preference</label>
                    <select
                      name="shape"
                      value={formData.sizing?.shape}
                      onChange={handleSizingChange}
                      className="w-full px-3 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground cursor-pointer"
                    >
                      <option value="Almond">Almond 💅</option>
                      <option value="Coffin">Coffin 💅</option>
                      <option value="Stiletto">Stiletto 💅</option>
                      <option value="Oval">Oval 💅</option>
                      <option value="Square">Square 💅</option>
                      <option value="Round">Round 💅</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Standard Vibe Size</label>
                    <select
                      name="standardSize"
                      value={formData.sizing?.standardSize}
                      onChange={handleSizingChange}
                      className="w-full px-3 py-2.5 bg-input rounded-xl border border-border/50 focus:border-primary outline-none transition-all text-xs text-foreground cursor-pointer"
                    >
                      <option value="XS">XS (Extra Small)</option>
                      <option value="S">S (Small)</option>
                      <option value="M">M (Medium)</option>
                      <option value="L">L (Large)</option>
                      <option value="Custom">Custom Sizing (Set below)</option>
                    </select>
                  </div>
                </div>

                {/* Sizing Details Table */}
                <div className="p-4 bg-muted/40 border border-border/40 rounded-2xl space-y-4">
                  <span className="text-xs font-semibold text-foreground block">Millimeters (mm) per finger</span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Left Hand */}
                    <div className="space-y-2 border-r border-border/40 pr-2">
                      <span className="text-[10px] uppercase font-bold text-primary block mb-2">Left Hand</span>
                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Th</span>
                          <input
                            type="text"
                            name="leftThumb"
                            value={formData.sizing?.leftThumb}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">In</span>
                          <input
                            type="text"
                            name="leftIndex"
                            value={formData.sizing?.leftIndex}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Mi</span>
                          <input
                            type="text"
                            name="leftMiddle"
                            value={formData.sizing?.leftMiddle}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Ri</span>
                          <input
                            type="text"
                            name="leftRing"
                            value={formData.sizing?.leftRing}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Pi</span>
                          <input
                            type="text"
                            name="leftPinky"
                            value={formData.sizing?.leftPinky}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Hand */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-primary block mb-2">Right Hand</span>
                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Th</span>
                          <input
                            type="text"
                            name="rightThumb"
                            value={formData.sizing?.rightThumb}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">In</span>
                          <input
                            type="text"
                            name="rightIndex"
                            value={formData.sizing?.rightIndex}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Mi</span>
                          <input
                            type="text"
                            name="rightMiddle"
                            value={formData.sizing?.rightMiddle}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Ri</span>
                          <input
                            type="text"
                            name="rightRing"
                            value={formData.sizing?.rightRing}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground block">Pi</span>
                          <input
                            type="text"
                            name="rightPinky"
                            value={formData.sizing?.rightPinky}
                            onChange={handleSizingChange}
                            className="w-full py-1 text-center bg-input border border-border/50 rounded text-xs text-foreground focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dreamy Custom Design Upload */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Your Dreamy Nail Design
                </h4>
                
                {formData.dreamDesign ? (
                  <div className="relative border border-border rounded-2xl overflow-hidden p-4 flex gap-4 items-center bg-input/40 group">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm border shrink-0">
                      <img src={formData.dreamDesign} alt="Dream design" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs font-semibold text-foreground">Attached Design Reference</p>
                      <p className="text-[10px] text-muted-foreground">Will automatically append to WhatsApp checkouts! 💖</p>
                      <button
                        type="button"
                        onClick={removeDreamDesign}
                        className="text-[10px] text-destructive hover:underline flex items-center gap-1 mt-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDreamDesignUpload}
                      className="hidden"
                      id="dream-design-upload"
                    />
                    <label
                      htmlFor="dream-design-upload"
                      className="flex flex-col items-center justify-center py-6 bg-input rounded-2xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-all text-center p-4 group"
                    >
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        Click to upload your dreamy design
                      </span>
                      <span className="text-[10px] text-muted-foreground mt-1">
                        Any design inspo you want us to match (JPEG/PNG)
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit Save Button */}
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Sizing & Profile
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
