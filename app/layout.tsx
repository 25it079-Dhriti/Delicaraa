import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Delicaraa | Handcrafted Press-On Nails',
  description: 'Where your nails become art. Premium handcrafted press-on nail sets designed with love. Shop unique, reusable nail art from Delicaraa.',
  keywords: ['press-on nails', 'nail art', 'handcrafted nails', 'reusable nails', 'luxury nails', 'custom nails'],
  openGraph: {
    title: 'Delicaraa | Handcrafted Press-On Nails',
    description: 'Where your nails become art. Premium handcrafted press-on nail sets designed with love.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#e8b4b8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${playfair.variable} ${poppins.variable} font-sans antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
