"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Heart, Sparkles, MessageCircle } from "lucide-react"

const footerLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Shop" },
  { href: "#services", label: "Styles" },
  { href: "#reviews", label: "Reviews" },
  { href: "#booking", label: "Order" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col items-start mb-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <h3 className="text-2xl font-serif font-semibold tracking-wide">Delicaraa</h3>
              </div>
              <span className="text-xs text-background/50 tracking-wider ml-7">by dhriti</span>
            </div>
            <p className="text-background/70 leading-relaxed mb-6">
              Handcrafted press-on nails made with love. Where your nails become art. 
              Reusable, gorgeous, and uniquely YOU.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/delicaraa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-green-500 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-medium tracking-[0.2em] uppercase mb-6 text-background/50 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-medium tracking-[0.2em] uppercase mb-6 text-background/50 flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              Let&apos;s Connect
            </h4>
            <div className="space-y-4">
              <p className="text-background/70">
                DM us on Instagram or WhatsApp for orders, custom designs, and any questions!
              </p>
              <Link
                href="#booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wide rounded-full hover:bg-primary/90 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Order Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/50">
              &copy; {new Date().getFullYear()} Delicaraa by dhriti. All rights reserved.
            </p>
            <p className="text-sm text-background/50 flex items-center gap-2">
              Made with 
              <Heart className="w-4 h-4 fill-primary text-primary animate-pulse" /> 
              for all the nail girlies
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
