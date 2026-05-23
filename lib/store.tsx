"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface NailDesign {
  id: string
  src: string
  name: string
  description: string
  price: number
  category: string
}

interface CartItem extends NailDesign {
  quantity: number
}

export interface UserSizing {
  shape?: string
  leftThumb?: string
  leftIndex?: string
  leftMiddle?: string
  leftRing?: string
  leftPinky?: string
  rightThumb?: string
  rightIndex?: string
  rightMiddle?: string
  rightRing?: string
  rightPinky?: string
  standardSize?: string // "XS" | "S" | "M" | "L" | "Custom"
}

export interface User {
  name: string
  email: string
  phone: string
  instagram?: string
  birthdate?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  sizing?: UserSizing
  dreamDesign?: string // Base64 image
}

interface StoreContextType {
  // Auth
  user: User | null
  isLoggedIn: boolean
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
  login: (user: User) => void
  logout: () => void
  updateProfile: (updatedData: Partial<User>) => void
  showProfile: boolean
  setShowProfile: (show: boolean) => void
  
  // Cart
  cart: CartItem[]
  addToCart: (item: NailDesign) => void
  removeFromCart: (id: string) => void
  decrementCartItem: (id: string) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  
  // Wishlist
  wishlist: NailDesign[]
  addToWishlist: (item: NailDesign) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Show pages
  showCart: boolean
  setShowCart: (show: boolean) => void
  showWishlist: boolean
  setShowWishlist: (show: boolean) => void
  
  // Notification
  notification: string | null
  showNotification: (message: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<NailDesign[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showCart, setShowCart] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("delicaraa_user")
    const savedCart = localStorage.getItem("delicaraa_cart")
    const savedWishlist = localStorage.getItem("delicaraa_wishlist")
    
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (user) localStorage.setItem("delicaraa_user", JSON.stringify(user))
    else localStorage.removeItem("delicaraa_user")
  }, [user])

  useEffect(() => {
    localStorage.setItem("delicaraa_cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("delicaraa_wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const updateProfile = (updatedData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null
      return {
        ...prev,
        ...updatedData,
        sizing: {
          ...prev.sizing,
          ...updatedData.sizing
        }
      }
    })
    showNotificationMessage("Profile updated! ✨")
  }

  const login = (userData: User) => {
    setUser(userData)
    setShowLoginModal(false)
    showNotificationMessage("Welcome back, " + userData.name + "!")
  }

  const logout = () => {
    setUser(null)
    showNotificationMessage("See you soon!")
  }

  const addToCart = (item: NailDesign) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    showNotificationMessage("Added to cart!")
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
    showNotificationMessage("Removed from cart")
  }

  const decrementCartItem = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) {
        if (existing.quantity <= 1) {
          return prev.filter(i => i.id !== id)
        }
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      }
      return prev
    })
    showNotificationMessage("Updated cart")
  }

  const clearCart = () => {
    setCart([])
  }

  const addToWishlist = (item: NailDesign) => {
    if (!wishlist.find(i => i.id === item.id)) {
      setWishlist(prev => [...prev, item])
      showNotificationMessage("Added to wishlist!")
    }
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(i => i.id !== id))
    showNotificationMessage("Removed from wishlist")
  }

  const isInWishlist = (id: string) => wishlist.some(i => i.id === id)

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const showNotificationMessage = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 2500)
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        showLoginModal,
        setShowLoginModal,
        login,
        logout,
        updateProfile,
        showProfile,
        setShowProfile,
        cart,
        addToCart,
        removeFromCart,
        decrementCartItem,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        showCart,
        setShowCart,
        showWishlist,
        setShowWishlist,
        notification,
        showNotification: showNotificationMessage,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
